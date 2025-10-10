/**
 * Postiz Social Media Plugin Types
 * 371 OS Integration - Revolutionary cognitive-aware social media management
 */

import type { Plugin } from '@elizaos/core';

/**
 * Social media platforms supported by Postiz
 */
export enum SocialPlatform {
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  THREADS = 'threads',
  MASTODON = 'mastodon',
  BLUESKY = 'bluesky',
}

/**
 * Post content structure
 */
export interface PostContent {
  /** Post text content */
  text: string;
  /** Target platforms for this post */
  platforms: SocialPlatform[];
  /** Media files to attach */
  media?: MediaFile[];
  /** Scheduled publish time (ISO 8601) */
  scheduledTime?: string;
  /** Post metadata */
  metadata?: PostMetadata;
  /** AI generation parameters */
  aiGeneration?: AIGenerationConfig;
}

/**
 * Media file structure
 */
export interface MediaFile {
  /** File URL or base64 data */
  url: string;
  /** Media type */
  type: 'image' | 'video' | 'gif';
  /** Alt text for accessibility */
  altText?: string;
  /** Thumbnail URL for videos */
  thumbnail?: string;
}

/**
 * Post metadata
 */
export interface PostMetadata {
  /** Campaign identifier */
  campaignId?: string;
  /** Post tags */
  tags?: string[];
  /** Target audience segments */
  audience?: string[];
  /** Content category */
  category?: string;
  /** Custom fields */
  customFields?: Record<string, unknown>;
}

/**
 * AI content generation configuration
 */
export interface AIGenerationConfig {
  /** Generation prompt */
  prompt: string;
  /** Tone of voice */
  tone?: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'playful';
  /** Target audience description */
  targetAudience?: string;
  /** Keywords to include */
  keywords?: string[];
  /** Maximum length */
  maxLength?: number;
  /** Use 371 OS cognitive engine */
  useCognitiveEngine?: boolean;
}

/**
 * Scheduled post structure
 */
export interface ScheduledPost {
  /** Post ID */
  id: string;
  /** Post content */
  content: PostContent;
  /** Schedule status */
  status: 'scheduled' | 'published' | 'failed' | 'draft';
  /** Created timestamp */
  createdAt: string;
  /** Updated timestamp */
  updatedAt: string;
  /** Published timestamp */
  publishedAt?: string;
  /** Error message if failed */
  error?: string;
}

/**
 * Engagement metrics
 */
export interface EngagementMetrics {
  /** Platform */
  platform: SocialPlatform;
  /** Post ID */
  postId: string;
  /** Number of likes/reactions */
  likes: number;
  /** Number of shares/retweets */
  shares: number;
  /** Number of comments/replies */
  comments: number;
  /** Number of impressions */
  impressions: number;
  /** Number of clicks */
  clicks: number;
  /** Engagement rate (percentage) */
  engagementRate: number;
  /** Retrieved timestamp */
  timestamp: string;
}

/**
 * Analytics data for spatial visualization
 */
export interface SpatialAnalytics {
  /** Time period */
  period: {
    start: string;
    end: string;
  };
  /** Platform-specific metrics */
  platformMetrics: Map<SocialPlatform, PlatformMetrics>;
  /** Top performing posts */
  topPosts: ScheduledPost[];
  /** Audience demographics */
  demographics?: AudienceDemographics;
  /** Growth trends */
  trends?: GrowthTrends;
}

/**
 * Platform-specific metrics
 */
export interface PlatformMetrics {
  /** Platform name */
  platform: SocialPlatform;
  /** Total posts */
  totalPosts: number;
  /** Total engagement */
  totalEngagement: number;
  /** Average engagement rate */
  avgEngagementRate: number;
  /** Follower count */
  followers: number;
  /** Follower growth */
  followerGrowth: number;
  /** Best posting times */
  bestPostingTimes: string[];
}

/**
 * Audience demographics
 */
export interface AudienceDemographics {
  /** Age distribution */
  ageGroups: Record<string, number>;
  /** Gender distribution */
  gender: Record<string, number>;
  /** Geographic distribution */
  locations: Record<string, number>;
  /** Interest categories */
  interests: Record<string, number>;
}

/**
 * Growth trends
 */
export interface GrowthTrends {
  /** Daily growth data */
  daily: TrendDataPoint[];
  /** Weekly growth data */
  weekly: TrendDataPoint[];
  /** Monthly growth data */
  monthly: TrendDataPoint[];
  /** Predicted trends */
  predictions?: TrendDataPoint[];
}

/**
 * Trend data point
 */
export interface TrendDataPoint {
  /** Date/time */
  timestamp: string;
  /** Metric value */
  value: number;
  /** Metric name */
  metric: string;
}

/**
 * Content strategy configuration
 */
export interface ContentStrategy {
  /** Strategy name */
  name: string;
  /** Target platforms */
  platforms: SocialPlatform[];
  /** Posting frequency */
  frequency: PostingFrequency;
  /** Content themes */
  themes: string[];
  /** AI generation enabled */
  aiEnabled: boolean;
  /** Target audience */
  targetAudience: string;
  /** Goals and KPIs */
  goals: StrategyGoal[];
}

/**
 * Posting frequency configuration
 */
export interface PostingFrequency {
  /** Posts per day */
  postsPerDay?: number;
  /** Posts per week */
  postsPerWeek?: number;
  /** Specific posting times */
  postingTimes?: string[];
  /** Best times optimization */
  optimizeTiming?: boolean;
}

/**
 * Strategy goal
 */
export interface StrategyGoal {
  /** Goal metric */
  metric: 'engagement' | 'followers' | 'reach' | 'conversions';
  /** Target value */
  target: number;
  /** Current value */
  current: number;
  /** Deadline */
  deadline?: string;
}

/**
 * Postiz plugin configuration
 */
export interface PostizPluginConfig {
  /** Postiz API endpoint */
  apiEndpoint: string;
  /** API key */
  apiKey: string;
  /** Enable spatial interface */
  enableSpatialInterface?: boolean;
  /** Enable cognitive engine */
  enableCognitiveEngine?: boolean;
  /** Default platforms */
  defaultPlatforms?: SocialPlatform[];
  /** Auto-optimization */
  autoOptimize?: boolean;
}

/**
 * Postiz plugin interface
 */
export interface PostizPlugin extends Plugin {
  /** Plugin name */
  name: 'postiz-social';
  /** Plugin description */
  description: 'Social media management and scheduling with AI generation';
  /** Plugin configuration */
  config: PostizPluginConfig;
}

/**
 * Spatial coordinates for 3D visualization
 */
export interface SpatialCoordinates {
  x: number;
  y: number;
  z: number;
}

/**
 * Spatial visualization data
 */
export interface SpatialVisualization {
  /** Platform nodes */
  platforms: SpatialPlatformNode[];
  /** Engagement connections */
  connections: SpatialConnection[];
  /** Content clusters */
  clusters: ContentCluster[];
}

/**
 * Spatial platform node
 */
export interface SpatialPlatformNode {
  /** Platform */
  platform: SocialPlatform;
  /** Position in 3D space */
  position: SpatialCoordinates;
  /** Node size (based on engagement) */
  size: number;
  /** Color */
  color: string;
  /** Metrics */
  metrics: PlatformMetrics;
}

/**
 * Spatial connection between content
 */
export interface SpatialConnection {
  /** Source post ID */
  source: string;
  /** Target post ID */
  target: string;
  /** Connection strength */
  strength: number;
  /** Connection type */
  type: 'similar-content' | 'cross-platform' | 'engagement-flow';
}

/**
 * Content cluster in spatial view
 */
export interface ContentCluster {
  /** Cluster ID */
  id: string;
  /** Cluster center position */
  center: SpatialCoordinates;
  /** Posts in cluster */
  posts: ScheduledPost[];
  /** Cluster theme */
  theme: string;
  /** Average engagement */
  avgEngagement: number;
}
