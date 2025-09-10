/**
 * Blockchain Registry Provider - Decentralized Agent-Tool Discovery
 *
 * Implements the blockchain-based Universal Tool Server registry that enables
 * trustless agent discovery, reputation management, and economic coordination
 * without centralized authorities.
 */

import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import {
  type AgentCapability,
  type AgentRegistryEntry,
  type DeploymentInfo,
  ReputationScore,
  VerifiableCredential,
} from './types';

export class BlockchainRegistryProvider {
  private provider: ethers.Provider;
  private contract: ethers.Contract;
  private ipfs: any;
  private registryAddress: string;

  constructor(providerUrl?: string, registryAddress?: string) {
    // Use Akash Network RPC or fallback to public providers
    this.provider = new ethers.JsonRpcProvider(
      providerUrl ||
        process.env.AKASH_RPC_URL ||
        'https://rpc.akash.forbole.com:443',
    );

    this.registryAddress =
      registryAddress ||
      process.env.REGISTRY_CONTRACT_ADDRESS ||
      '0x371Minds000000000000000000000000000000000'; // Placeholder

    // Universal Agent Registry ABI (simplified)
    const registryABI = [
      'function registerAgent(bytes32 agentId, string ipfsHash, uint256 stake) external',
      'function updateReputation(bytes32 agentId, uint8 rating, bytes32 evidence) external',
      'function getAgent(bytes32 agentId) external view returns (string, uint256, uint256)',
      'function discoverByCapability(bytes32 capabilityHash) external view returns (bytes32[])',
      'function slashAgent(bytes32 agentId, uint256 amount, string reason) external',
      'event AgentRegistered(bytes32 indexed agentId, string ipfsHash, uint256 timestamp)',
      'event ReputationUpdated(bytes32 indexed agentId, uint8 rating, address rater)',
      'event AgentSlashed(bytes32 indexed agentId, uint256 amount, string reason)',
    ];

    this.contract = new ethers.Contract(
      this.registryAddress,
      registryABI,
      this.provider,
    );

    // Initialize IPFS client for metadata storage
    this.ipfs = create({
      host: process.env.IPFS_HOST || 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: process.env.IPFS_AUTH || '',
      },
    });
  }

  /**
   * Register Agent in Blockchain Registry
   *
   * Stores agent metadata on IPFS and registers the hash on-chain
   * with cryptographic verification and staking requirements.
   */
  async registerAgent(entry: AgentRegistryEntry): Promise<string> {
    try {
      // Store complete agent metadata on IPFS
      const metadataBuffer = Buffer.from(JSON.stringify(entry));
      const ipfsResult = await this.ipfs.add(metadataBuffer);
      const ipfsHash = ipfsResult.cid.toString();

      // Create agent ID hash
      const agentIdBytes = ethers.id(entry.agentId);

      // Calculate required stake based on capabilities
      const stakeAmount = this.calculateStakeRequirement(entry.capabilities);

      // Get wallet for transaction signing
      const wallet = new ethers.Wallet(
        process.env.AGENT_PRIVATE_KEY ||
          ethers.Wallet.createRandom().privateKey,
        this.provider,
      );

      const contractWithSigner = this.contract.connect(wallet);

      // Submit registration transaction
      const tx = await contractWithSigner.registerAgent(
        agentIdBytes,
        ipfsHash,
        ethers.parseEther(stakeAmount.toString()),
      );

      await tx.wait();

      console.log(
        `Agent ${entry.agentId} registered with IPFS hash: ${ipfsHash}`,
      );
      return tx.hash;
    } catch (error) {
      console.error('Blockchain registration failed:', error);
      throw new Error(`Failed to register agent: ${error.message}`);
    }
  }

  /**
   * Discover Tools by Capability
   *
   * Searches the blockchain registry for agents that match required
   * capabilities, filtering by reputation and economic constraints.
   */
  async discoverTools(criteria: {
    capabilities: string[];
    minReputation?: number;
    maxCost?: number;
    preferredProviders?: string[];
    excludedProviders?: string[];
  }): Promise<AgentRegistryEntry[]> {
    try {
      const results: AgentRegistryEntry[] = [];

      // Search by each capability
      for (const capability of criteria.capabilities) {
        const capabilityHash = ethers.id(capability);
        const agentIds =
          await this.contract.discoverByCapability(capabilityHash);

        for (const agentIdBytes of agentIds) {
          try {
            // Get agent metadata from chain
            const [ipfsHash, reputation, stake] =
              await this.contract.getAgent(agentIdBytes);

            // Retrieve full metadata from IPFS
            const chunks = [];
            for await (const chunk of this.ipfs.cat(ipfsHash)) {
              chunks.push(chunk);
            }
            const metadata = JSON.parse(Buffer.concat(chunks).toString());

            // Apply filters
            if (
              criteria.minReputation &&
              metadata.reputation.overall < criteria.minReputation
            ) {
              continue;
            }

            if (
              criteria.maxCost &&
              metadata.economicTerms.basePrice > criteria.maxCost
            ) {
              continue;
            }

            if (criteria.excludedProviders?.includes(metadata.agentId)) {
              continue;
            }

            // Add blockchain verification data
            metadata.blockchainVerification = {
              onChainReputation: Number(reputation),
              stakeAmount: ethers.formatEther(stake),
              verified: true,
            };

            results.push(metadata);
          } catch (error) {
            console.warn(`Failed to retrieve agent metadata: ${error.message}`);
          }
        }
      }

      // Remove duplicates and sort by reputation
      const uniqueResults = results.filter(
        (entry, index, self) =>
          index === self.findIndex((e) => e.agentId === entry.agentId),
      );

      return uniqueResults.sort(
        (a, b) =>
          b.reputation.overall +
          b.blockchainVerification.onChainReputation -
          (a.reputation.overall + a.blockchainVerification.onChainReputation),
      );
    } catch (error) {
      console.error('Tool discovery failed:', error);
      throw new Error(`Failed to discover tools: ${error.message}`);
    }
  }

  /**
   * Update Agent Reputation
   *
   * Submits reputation update to blockchain with cryptographic proof
   * and evidence linking to verifiable execution results.
   */
  async updateReputation(update: {
    agentId: string;
    raterDid: string;
    rating: number;
    category: string;
    evidence: string[];
    executionId?: string;
    timestamp: string;
  }): Promise<string> {
    try {
      const agentIdBytes = ethers.id(update.agentId);

      // Create evidence hash for on-chain storage
      const evidenceHash = ethers.id(
        JSON.stringify({
          executionId: update.executionId,
          evidence: update.evidence,
          rater: update.raterDid,
          timestamp: update.timestamp,
        }),
      );

      // Convert rating to uint8 (0-100)
      const rating = Math.min(
        100,
        Math.max(0, Math.round(update.rating * 100)),
      );

      const wallet = new ethers.Wallet(
        process.env.AGENT_PRIVATE_KEY ||
          ethers.Wallet.createRandom().privateKey,
        this.provider,
      );

      const contractWithSigner = this.contract.connect(wallet);

      const tx = await contractWithSigner.updateReputation(
        agentIdBytes,
        rating,
        evidenceHash,
      );

      await tx.wait();

      console.log(
        `Reputation updated for agent ${update.agentId}: ${rating}/100`,
      );
      return tx.hash;
    } catch (error) {
      console.error('Reputation update failed:', error);
      throw new Error(`Failed to update reputation: ${error.message}`);
    }
  }

  /**
   * Update Deployment Information
   *
   * Updates agent's deployment information in the registry,
   * including Akash Network deployment details and endpoints.
   */
  async updateDeployment(
    agentId: string,
    deploymentInfo: Partial<DeploymentInfo>,
  ): Promise<void> {
    try {
      // Get current agent metadata
      const agentIdBytes = ethers.id(agentId);
      const [ipfsHash] = await this.contract.getAgent(agentIdBytes);

      // Retrieve and update metadata
      const chunks = [];
      for await (const chunk of this.ipfs.cat(ipfsHash)) {
        chunks.push(chunk);
      }
      const metadata = JSON.parse(Buffer.concat(chunks).toString());

      // Update deployment info
      metadata.deploymentInfo = {
        ...metadata.deploymentInfo,
        ...deploymentInfo,
        lastUpdated: new Date().toISOString(),
      };

      // Store updated metadata on IPFS
      const updatedBuffer = Buffer.from(JSON.stringify(metadata));
      const newIpfsResult = await this.ipfs.add(updatedBuffer);
      const newIpfsHash = newIpfsResult.cid.toString();

      // Update reference on blockchain (would require additional contract method)
      console.log(
        `Deployment info updated for ${agentId}. New IPFS hash: ${newIpfsHash}`,
      );
    } catch (error) {
      console.error('Deployment update failed:', error);
      throw new Error(`Failed to update deployment: ${error.message}`);
    }
  }

  /**
   * Get Network Performance Metrics
   *
   * Analyzes blockchain data to provide network-wide performance metrics,
   * reputation trends, and ecosystem health indicators.
   */
  async getNetworkMetrics(timeWindow = '24h'): Promise<any> {
    try {
      const currentBlock = await this.provider.getBlockNumber();
      const blocksBack = this.parseTimeWindow(timeWindow);
      const fromBlock = Math.max(0, currentBlock - blocksBack);

      // Get registration events
      const registrationFilter = this.contract.filters.AgentRegistered();
      const registrationEvents = await this.contract.queryFilter(
        registrationFilter,
        fromBlock,
        currentBlock,
      );

      // Get reputation update events
      const reputationFilter = this.contract.filters.ReputationUpdated();
      const reputationEvents = await this.contract.queryFilter(
        reputationFilter,
        fromBlock,
        currentBlock,
      );

      // Get slashing events
      const slashingFilter = this.contract.filters.AgentSlashed();
      const slashingEvents = await this.contract.queryFilter(
        slashingFilter,
        fromBlock,
        currentBlock,
      );

      // Calculate metrics
      const metrics = {
        totalAgents: registrationEvents.length,
        newAgents: registrationEvents.filter((e) => e.blockNumber >= fromBlock)
          .length,
        totalInteractions: reputationEvents.length,
        slashingIncidents: slashingEvents.length,
        averageLatency: this.calculateAverageLatency(reputationEvents),
        successRate: this.calculateSuccessRate(
          reputationEvents,
          slashingEvents,
        ),
        networkUptime: this.calculateNetworkUptime(timeWindow),
        costTrend: 'stable', // Would be calculated from economic data
        performanceTrend: this.calculatePerformanceTrend(reputationEvents),
        alerts: this.generateNetworkAlerts(slashingEvents, reputationEvents),
      };

      return metrics;
    } catch (error) {
      console.error('Failed to get network metrics:', error);
      throw new Error(`Failed to retrieve network metrics: ${error.message}`);
    }
  }

  // Helper Methods
  private calculateStakeRequirement(capabilities: AgentCapability[]): number {
    // Base stake + additional for each high-value capability
    const baseStake = 10; // AKT
    const capabilityStake = capabilities.length * 2; // 2 AKT per capability
    const complexityMultiplier = capabilities.some(
      (cap) => cap.name.includes('financial') || cap.name.includes('crypto'),
    )
      ? 2
      : 1;

    return baseStake + capabilityStake * complexityMultiplier;
  }

  private parseTimeWindow(timeWindow: string): number {
    const unit = timeWindow.slice(-1);
    const value = Number.parseInt(timeWindow.slice(0, -1));

    switch (unit) {
      case 'h':
        return value * 300; // ~300 blocks per hour
      case 'd':
        return value * 7200; // ~7200 blocks per day
      case 'w':
        return value * 50400; // ~50400 blocks per week
      default:
        return 7200; // Default to 1 day
    }
  }

  private calculateAverageLatency(events: any[]): number {
    // Simplified - would need more sophisticated timing data
    return 1500 + Math.random() * 1000; // Mock: 1.5-2.5s average
  }

  private calculateSuccessRate(
    reputationEvents: any[],
    slashingEvents: any[],
  ): number {
    if (reputationEvents.length === 0) return 1.0;

    const negativeEvents = slashingEvents.length;
    const totalEvents = reputationEvents.length + negativeEvents;

    return Math.max(0, (totalEvents - negativeEvents) / totalEvents);
  }

  private calculateNetworkUptime(timeWindow: string): number {
    // Would be calculated from node availability data
    return 0.999; // Mock 99.9% uptime
  }

  private calculatePerformanceTrend(
    events: any[],
  ): 'improving' | 'stable' | 'degrading' {
    if (events.length < 10) return 'stable';

    // Simple trend analysis based on event frequency
    const recent = events.slice(-5).length;
    const previous = events.slice(-10, -5).length;

    if (recent > previous * 1.2) return 'improving';
    if (recent < previous * 0.8) return 'degrading';
    return 'stable';
  }

  private generateNetworkAlerts(
    slashingEvents: any[],
    reputationEvents: any[],
  ): string[] {
    const alerts = [];

    if (slashingEvents.length > 0) {
      alerts.push(
        `${slashingEvents.length} slashing events in the current period`,
      );
    }

    if (reputationEvents.length === 0) {
      alerts.push('No recent agent interactions detected');
    }

    return alerts;
  }
}
