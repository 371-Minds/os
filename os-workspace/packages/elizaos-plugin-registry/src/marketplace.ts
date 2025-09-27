import { EventEmitter } from 'eventemitter3';
import type { PluginRegistryEntry, PluginMetadata } from './types.js';

/**
 * Blockchain plugin entry with marketplace-specific metadata
 */
export interface BlockchainPluginEntry {
  id: string;
  metadata: PluginMetadata;
  blockchain: {
    contractAddress: string;
    tokenId?: string;
    price: string; // in wei
    currency: 'ETH' | 'USDC' | 'DAI';
    royalties: number; // percentage
  };
  marketplace: {
    listed: boolean;
    featured: boolean;
    downloads: number;
    rating: number;
    reviews: number;
    tags: string[];
  };
  seller: {
    address: string;
    verified: boolean;
    reputation: number;
  };
}

/**
 * Marketplace events
 */
export interface MarketplaceEvents {
  'plugin:listed': (entry: BlockchainPluginEntry) => void;
  'plugin:unlisted': (pluginId: string) => void;
  'plugin:purchased': (pluginId: string, buyer: string, price: string) => void;
  'plugin:reviewed': (pluginId: string, rating: number, review: string) => void;
  'marketplace:synced': (count: number) => void;
  'marketplace:error': (error: Error) => void;
}

/**
 * Marketplace configuration
 */
export interface MarketplaceConfig {
  enabled: boolean;
  contractAddress?: string;
  network: 'mainnet' | 'testnet' | 'localhost';
  ipfsGateway: string;
  apiEndpoint?: string;
  enablePurchases: boolean;
  enableReviews: boolean;
  enableAnalytics: boolean;
}

/**
 * Plugin publishing options
 */
export interface PublishOptions {
  price: string; // in wei
  currency: 'ETH' | 'USDC' | 'DAI';
  royalties: number; // percentage
  featured: boolean;
  tags: string[];
  description?: string;
  screenshots?: string[];
}

/**
 * Plugin purchase options
 */
export interface PurchaseOptions {
  pluginId: string;
  maxPrice: string; // in wei
  installAfterPurchase: boolean;
  skipConfirmation: boolean;
}

/**
 * Plugin rating and review
 */
export interface PluginRating {
  pluginId: string;
  userId: string;
  rating: number; // 1-5
  review?: string;
  verified: boolean;
  timestamp: Date;
}

/**
 * Plugin Marketplace
 * 
 * Blockchain-based marketplace for plugin distribution and monetization
 */
export class PluginMarketplace extends EventEmitter<MarketplaceEvents> {
  private config: MarketplaceConfig;
  private listings = new Map<string, BlockchainPluginEntry>();
  private purchases = new Map<string, Set<string>>(); // pluginId -> set of buyer addresses
  private ratings = new Map<string, PluginRating[]>(); // pluginId -> ratings

  constructor(config?: Partial<MarketplaceConfig>) {
    super();
    
    this.config = {
      enabled: true,
      network: 'testnet',
      ipfsGateway: 'https://gateway.pinata.cloud/ipfs',
      enablePurchases: true,
      enableReviews: true,
      enableAnalytics: true,
      ...config,
    };
  }

  /**
   * List a plugin on the marketplace
   */
  async listPlugin(entry: PluginRegistryEntry, options: PublishOptions): Promise<void> {
    if (!this.config.enabled) {
      throw new Error('Marketplace is disabled');
    }

    const blockchainEntry: BlockchainPluginEntry = {
      id: entry.id,
      metadata: entry.metadata,
      blockchain: {
        contractAddress: this.config.contractAddress || '0x1234567890abcdef',
        price: options.price,
        currency: options.currency,
        royalties: options.royalties,
      },
      marketplace: {
        listed: true,
        featured: options.featured,
        downloads: 0,
        rating: 0,
        reviews: 0,
        tags: options.tags,
      },
      seller: {
        address: '0xseller', // Mock seller address
        verified: true,
        reputation: 85,
      },
    };

    this.listings.set(entry.id, blockchainEntry);
    this.emit('plugin:listed', blockchainEntry);
  }

  /**
   * Unlist a plugin from the marketplace
   */
  async unlistPlugin(pluginId: string): Promise<void> {
    const listing = this.listings.get(pluginId);
    if (!listing) {
      throw new Error(`Plugin not listed: ${pluginId}`);
    }

    listing.marketplace.listed = false;
    this.emit('plugin:unlisted', pluginId);
  }

  /**
   * Purchase a plugin
   */
  async purchasePlugin(options: PurchaseOptions, buyerAddress: string): Promise<void> {
    if (!this.config.enablePurchases) {
      throw new Error('Purchases are disabled');
    }

    const listing = this.listings.get(options.pluginId);
    if (!listing) {
      throw new Error(`Plugin not found: ${options.pluginId}`);
    }

    if (!listing.marketplace.listed) {
      throw new Error(`Plugin not available for purchase: ${options.pluginId}`);
    }

    // Check price
    const price = BigInt(listing.blockchain.price);
    const maxPrice = BigInt(options.maxPrice);
    if (price > maxPrice) {
      throw new Error(`Price exceeds maximum: ${price} > ${maxPrice}`);
    }

    // Mock purchase transaction
    if (!this.purchases.has(options.pluginId)) {
      this.purchases.set(options.pluginId, new Set());
    }
    this.purchases.get(options.pluginId)!.add(buyerAddress);

    // Update download count
    listing.marketplace.downloads++;

    this.emit('plugin:purchased', options.pluginId, buyerAddress, listing.blockchain.price);
  }

  /**
   * Add a rating/review for a plugin
   */
  async ratePlugin(pluginId: string, userId: string, rating: number, review?: string): Promise<void> {
    if (!this.config.enableReviews) {
      throw new Error('Reviews are disabled');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const pluginRating: PluginRating = {
      pluginId,
      userId,
      rating,
      review,
      verified: true, // Mock verification
      timestamp: new Date(),
    };

    if (!this.ratings.has(pluginId)) {
      this.ratings.set(pluginId, []);
    }
    this.ratings.get(pluginId)!.push(pluginRating);

    // Update listing rating
    const listing = this.listings.get(pluginId);
    if (listing) {
      const ratings = this.ratings.get(pluginId)!;
      const average = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
      listing.marketplace.rating = Math.round(average * 10) / 10;
      listing.marketplace.reviews = ratings.length;
    }

    this.emit('plugin:reviewed', pluginId, rating, review || '');
  }

  /**
   * Get marketplace listings
   */
  getListings(filters?: { featured?: boolean; minRating?: number }): BlockchainPluginEntry[] {
    let listings = Array.from(this.listings.values()).filter(l => l.marketplace.listed);

    if (filters) {
      if (filters.featured !== undefined) {
        listings = listings.filter(l => l.marketplace.featured === filters.featured);
      }
      if (filters.minRating !== undefined) {
        listings = listings.filter(l => l.marketplace.rating >= filters.minRating!);
      }
    }

    return listings.sort((a, b) => {
      // Sort by featured first, then by rating
      if (a.marketplace.featured && !b.marketplace.featured) return -1;
      if (!a.marketplace.featured && b.marketplace.featured) return 1;
      return b.marketplace.rating - a.marketplace.rating;
    });
  }

  /**
   * Check if user has purchased a plugin
   */
  hasPurchased(pluginId: string, userAddress: string): boolean {
    const buyers = this.purchases.get(pluginId);
    return buyers ? buyers.has(userAddress) : false;
  }

  /**
   * Get ratings for a plugin
   */
  getRatings(pluginId: string): PluginRating[] {
    return this.ratings.get(pluginId) || [];
  }

  /**
   * Sync with blockchain
   */
  async sync(): Promise<void> {
    if (!this.config.enabled) {
      return;
    }

    // Mock blockchain sync
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.emit('marketplace:synced', this.listings.size);
  }

  /**
   * Cleanup marketplace resources
   */
  destroy(): void {
    this.listings.clear();
    this.purchases.clear();
    this.ratings.clear();
    this.removeAllListeners();
  }
}