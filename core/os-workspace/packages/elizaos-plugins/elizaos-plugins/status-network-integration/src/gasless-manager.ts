import { ethers } from 'ethers';
import type { Address } from './types.js';
import type { GaslessTransaction, StatusNetworkConfig } from './types.js';
import { logger } from './utils/logger.js';

export interface ContractCall {
  to: Address;
  data: string;
  value: bigint;
}

/**
 * Gasless Transaction Manager for community interactions
 * Leverages Status Network's gasless infrastructure for frictionless UX
 */
export class GaslessTransactionManager {
  private config: StatusNetworkConfig;
  private provider: ethers.JsonRpcProvider;
  private relayUrl: string;

  constructor(config: StatusNetworkConfig) {
    this.config = config;
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
    this.relayUrl = config.gaslessRelayUrl;

    logger.info('Gasless Transaction Manager initialized', {
      relayUrl: this.relayUrl,
      chainId: config.chainId
    });
  }

  /**
   * Execute a gasless transaction for a user
   */
  async executeGaslessTransaction(
    userAddress: string,
    contractCall: ContractCall,
    communityId: string
  ): Promise<string> {
    try {
      logger.info('Creating gasless transaction', {
        userAddress,
        communityId,
        to: contractCall.to
      });

      // Create meta transaction
      const metaTx = await this.createMetaTransaction(contractCall, userAddress);
      
      // Submit via Status Network relay
      const txHash = await this.submitToRelay(metaTx);
      
      // Track community activity
      await this.recordCommunityActivity(communityId, txHash);
      
      logger.info('Gasless transaction executed successfully', {
        userAddress,
        communityId,
        txHash
      });

      return txHash;
    } catch (error) {
      logger.error('Gasless transaction failed', {
        userAddress,
        communityId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Create a meta transaction for gasless execution
   */
  private async createMetaTransaction(
    contractCall: ContractCall,
    userAddress: string
  ): Promise<GaslessTransaction> {
    // Get current nonce for user
    const nonce = await this.provider.getTransactionCount(userAddress);

    // Create EIP-712 typed data for signature
    const domain = {
      name: '371 OS Community',
      version: '1',
      chainId: this.config.chainId,
      verifyingContract: contractCall.to
    };

    const types = {
      ForwardRequest: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'gas', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'data', type: 'bytes' }
      ]
    };

    const value = {
      from: userAddress,
      to: contractCall.to,
      value: contractCall.value.toString(),
      gas: 200000,
      nonce,
      data: contractCall.data
    };

    // For now, create a placeholder signature
    // In production, this would be signed by the user's wallet
    const signature = '0x' + '0'.repeat(130); // Placeholder signature

    return {
      to: contractCall.to,
      data: contractCall.data,
      value: contractCall.value,
      signature,
      nonce,
      relayerFee: BigInt(0) // No fee for gasless transactions
    };
  }

  /**
   * Submit meta transaction to Status Network relay
   */
  private async submitToRelay(metaTx: GaslessTransaction): Promise<string> {
    try {
      const response = await fetch(`${this.relayUrl}/relay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Chain-Id': this.config.chainId.toString()
        },
        body: JSON.stringify({
          to: metaTx.to,
          data: metaTx.data,
          value: metaTx.value.toString(),
          signature: metaTx.signature,
          nonce: metaTx.nonce
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Relay submission failed: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      return result.transactionHash;
    } catch (error) {
      logger.error('Failed to submit to relay', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Record community activity for analytics
   */
  private async recordCommunityActivity(
    communityId: string,
    txHash: string
  ): Promise<void> {
    // This would integrate with analytics/tracking system
    logger.info('Recording community activity', {
      communityId,
      txHash,
      timestamp: new Date().toISOString()
    });

    // TODO: Implement analytics recording
    // Could use PostHog, custom analytics, or on-chain events
  }

  /**
   * Batch execute multiple gasless transactions
   */
  async batchExecuteGasless(
    transactions: Array<{
      userAddress: string;
      contractCall: ContractCall;
      communityId: string;
    }>
  ): Promise<string[]> {
    logger.info('Batch executing gasless transactions', {
      count: transactions.length
    });

    const txHashes = await Promise.all(
      transactions.map(tx => 
        this.executeGaslessTransaction(
          tx.userAddress,
          tx.contractCall,
          tx.communityId
        )
      )
    );

    logger.info('Batch execution completed', {
      count: txHashes.length,
      txHashes
    });

    return txHashes;
  }

  /**
   * Check if gasless transactions are supported for a community
   */
  async isGaslessSupported(communityId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.relayUrl}/supported/${communityId}`);
      const result = await response.json();
      return result.supported === true;
    } catch (error) {
      logger.warn('Failed to check gasless support', {
        communityId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return false;
    }
  }

  /**
   * Get estimated relay fee (should be 0 for true gasless)
   */
  async getRelayFee(contractCall: ContractCall): Promise<bigint> {
    try {
      const response = await fetch(`${this.relayUrl}/fee-estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: contractCall.to,
          data: contractCall.data,
          value: contractCall.value.toString()
        })
      });

      const result = await response.json();
      return BigInt(result.fee || '0');
    } catch (error) {
      logger.warn('Failed to get relay fee estimate', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return BigInt(0); // Default to no fee
    }
  }
}
