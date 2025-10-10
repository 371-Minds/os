import { ethers } from 'ethers';
import type { Address } from './types.js';
import type { 
  CommunityConfig, 
  CommunityDAO, 
  StatusNetworkConfig,
  AgentPerformanceMetrics,
  GaslessTransaction 
} from './types.js';
import { logger } from './utils/logger.js';

export class StatusNetworkCommunityManager {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private sntToken: ethers.Contract;
  private daoFactory: ethers.Contract;
  private config: StatusNetworkConfig;

  // Status Network L2 ABI snippets
  private static readonly SNT_TOKEN_ABI = [
    "function transfer(address to, uint256 amount) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)"
  ];

  private static readonly DAO_FACTORY_ABI = [
    "function createDAO(string name, address token, tuple(uint256 votingDelay, uint256 votingPeriod, uint256 proposalThreshold, uint256 quorum, uint256 timelock) params) returns (address)",
    "function getDAO(string name) view returns (address)",
    "function isValidDAO(address dao) view returns (bool)"
  ];

  constructor(config: StatusNetworkConfig, privateKey: string) {
    this.config = config;
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
    
    this.sntToken = new ethers.Contract(
      config.sntTokenAddress,
      StatusNetworkCommunityManager.SNT_TOKEN_ABI,
      this.signer
    );
    
    this.daoFactory = new ethers.Contract(
      config.daoFactoryAddress,
      StatusNetworkCommunityManager.DAO_FACTORY_ABI,
      this.signer
    );

    logger.info('Status Network Community Manager initialized', {
      chainId: config.chainId,
      sntToken: config.sntTokenAddress,
      daoFactory: config.daoFactoryAddress
    });
  }

  /**
   * Create a new community DAO on Status Network
   */
  async createCommunity(config: CommunityConfig): Promise<CommunityDAO> {
    try {
      logger.info('Creating community DAO', { name: config.communityName });

      // Check if community already exists
      const existingDAO = await this.daoFactory.getDAO(config.communityName);
      if (existingDAO !== ethers.ZeroAddress) {
        throw new Error(`Community ${config.communityName} already exists`);
      }

      // Approve SNT tokens for initial funding
      const approveTx = await this.sntToken.approve(
        this.config.daoFactoryAddress,
        config.initialFunding
      );
      await approveTx.wait();

      // Create DAO with governance parameters
      const createTx = await this.daoFactory.createDAO(
        config.communityName,
        this.config.sntTokenAddress,
        [
          config.governanceParams.votingDelay,
          config.governanceParams.votingPeriod,
          config.governanceParams.proposalThreshold,
          config.governanceParams.quorum,
          config.governanceParams.timelock
        ]
      );

      const receipt = await createTx.wait();
      const daoAddress = await this.daoFactory.getDAO(config.communityName);

      // Initialize gasless transaction system
      await this.initializeGaslessSystem(daoAddress);

      const communityDAO: CommunityDAO = {
        id: config.communityName,
        address: daoAddress,
        name: config.communityName,
        memberCount: 1, // Creator
        treasuryBalance: config.initialFunding,
        governanceToken: this.config.sntTokenAddress,
        createdAt: new Date(),
        active: true
      };

      logger.info('Community DAO created successfully', {
        name: config.communityName,
        address: daoAddress,
        txHash: receipt?.hash
      });

      return communityDAO;
    } catch (error) {
      logger.error('Failed to create community DAO', {
        name: config.communityName,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Manage autonomous agent compensation using SNT tokens
   */
  async manageAgentCompensation(
    agentId: string,
    performance: AgentPerformanceMetrics
  ): Promise<void> {
    try {
      const compensation = this.calculateCompensation(performance);
      
      if (compensation > BigInt(0)) {
        // Transfer SNT tokens to agent
        const transferTx = await this.sntToken.transfer(agentId, compensation);
        await transferTx.wait();

        logger.info('Agent compensation paid', {
          agentId,
          amount: ethers.formatEther(compensation),
          performance: performance.successRate,
          txHash: transferTx.hash
        });
      }
    } catch (error) {
      logger.error('Failed to pay agent compensation', {
        agentId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Initialize gasless transaction system for community
   */
  private async initializeGaslessSystem(daoAddress: Address): Promise<void> {
    try {
      // Register DAO with gasless relay service
      const relayRegistration = await fetch(`${this.config.gaslessRelayUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          daoAddress,
          chainId: this.config.chainId,
          sponsorAddress: this.signer.address
        })
      });

      if (!relayRegistration.ok) {
        throw new Error('Failed to register with gasless relay');
      }

      logger.info('Gasless system initialized', { daoAddress });
    } catch (error) {
      logger.warn('Gasless system initialization failed', {
        daoAddress,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      // Non-critical error, continue without gasless support
    }
  }

  /**
   * Execute gasless transaction for community members
   */
  async executeGaslessTransaction(
    userAddress: Address,
    transaction: GaslessTransaction
  ): Promise<string> {
    try {
      const relayResponse = await fetch(`${this.config.gaslessRelayUrl}/relay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: userAddress,
          to: transaction.to,
          data: transaction.data,
          value: transaction.value.toString(),
          signature: transaction.signature,
          nonce: transaction.nonce
        })
      });

      if (!relayResponse.ok) {
        throw new Error('Gasless transaction failed');
      }

      const result = await relayResponse.json();
      logger.info('Gasless transaction executed', {
        userAddress,
        txHash: result.transactionHash
      });

      return result.transactionHash;
    } catch (error) {
      logger.error('Gasless transaction execution failed', {
        userAddress,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Calculate agent compensation based on performance metrics
   */
  private calculateCompensation(performance: AgentPerformanceMetrics): bigint {
    // Base compensation: 100 SNT per completed task
    const baseCompensation = BigInt(performance.tasksCompleted) * ethers.parseEther('100');
    
    // Success rate multiplier (0.5x to 2x)
    const successMultiplier = Math.max(0.5, Math.min(2.0, performance.successRate * 2));
    
    // Community rating bonus (up to 50% bonus for high ratings)
    const ratingBonus = Math.max(0, (performance.communityRating - 3) * 0.125); // 12.5% per rating point above 3
    
    // Calculate final compensation
    const finalCompensation = baseCompensation * BigInt(Math.floor((successMultiplier + ratingBonus) * 100)) / BigInt(100);
    
    return finalCompensation;
  }

  /**
   * Get community DAO information
   */
  async getCommunity(communityName: string): Promise<CommunityDAO | null> {
    try {
      const daoAddress = await this.daoFactory.getDAO(communityName);
      
      if (daoAddress === ethers.ZeroAddress) {
        return null;
      }

      // Get treasury balance
      const treasuryBalance = await this.sntToken.balanceOf(daoAddress);

      return {
        id: communityName,
        address: daoAddress,
        name: communityName,
        memberCount: 0, // TODO: Implement member counting
        treasuryBalance,
        governanceToken: this.config.sntTokenAddress,
        createdAt: new Date(), // TODO: Get actual creation date
        active: true
      };
    } catch (error) {
      logger.error('Failed to get community info', {
        communityName,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return null;
    }
  }

  /**
   * Get SNT token balance for address
   */
  async getTokenBalance(address: Address): Promise<bigint> {
    return await this.sntToken.balanceOf(address);
  }

  /**
   * Transfer SNT tokens between addresses
   */
  async transferTokens(to: Address, amount: bigint): Promise<string> {
    const tx = await this.sntToken.transfer(to, amount);
    const receipt = await tx.wait();
    return receipt?.hash || '';
  }
}