/**
 * Postiz API Provider
 * Handles communication with Postiz API for social media management
 */

import {
  PostContent,
  ScheduledPost,
  EngagementMetrics,
  SpatialAnalytics,
  PlatformMetrics,
  SocialPlatform,
  PostizPluginConfig,
  AIGenerationConfig,
} from './types.js';
import axios, { type AxiosInstance } from 'axios';

/**
 * Postiz API Provider class
 */
export class PostizProvider {
  private client: AxiosInstance;
  private config: PostizPluginConfig;

  constructor(config: PostizPluginConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.apiEndpoint,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  /**
   * Schedule a post across multiple platforms
   */
  async schedulePost(content: PostContent): Promise<ScheduledPost> {
    try {
      const response = await this.client.post('/posts', {
        text: content.text,
        platforms: content.platforms,
        media: content.media,
        scheduledTime: content.scheduledTime,
        metadata: content.metadata,
      });

      return {
        id: response.data.id,
        content,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error scheduling post:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to schedule post: ${message}`);
    }
  }

  /**
   * Publish a post immediately
   */
  async publishPost(content: PostContent): Promise<ScheduledPost> {
    try {
      const response = await this.client.post('/posts/publish', {
        text: content.text,
        platforms: content.platforms,
        media: content.media,
        metadata: content.metadata,
      });

      return {
        id: response.data.id,
        content,
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error publishing post:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to publish post: ${message}`);
    }
  }

  /**
   * Get engagement metrics for a post
   */
  async getEngagementMetrics(postId: string): Promise<EngagementMetrics[]> {
    try {
      const response = await this.client.get(`/posts/${postId}/metrics`);
      return response.data.metrics.map((m: any) => ({
        platform: m.platform,
        postId,
        likes: m.likes || 0,
        shares: m.shares || 0,
        comments: m.comments || 0,
        impressions: m.impressions || 0,
        clicks: m.clicks || 0,
        engagementRate: m.engagementRate || 0,
        timestamp: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching engagement metrics:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch metrics: ${message}`);
    }
  }

  /**
   * Get platform-specific metrics
   */
  async getPlatformMetrics(platform: SocialPlatform): Promise<PlatformMetrics> {
    try {
      const response = await this.client.get(`/analytics/platform/${platform}`);
      return {
        platform,
        totalPosts: response.data.totalPosts || 0,
        totalEngagement: response.data.totalEngagement || 0,
        avgEngagementRate: response.data.avgEngagementRate || 0,
        followers: response.data.followers || 0,
        followerGrowth: response.data.followerGrowth || 0,
        bestPostingTimes: response.data.bestPostingTimes || [],
      };
    } catch (error) {
      console.error('Error fetching platform metrics:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch platform metrics: ${message}`);
    }
  }

  /**
   * Generate content using AI
   * Integrates with 371 OS cognitive engine if enabled
   */
  async generateContent(config: AIGenerationConfig): Promise<string> {
    try {
      // If cognitive engine is enabled, use 371 OS advanced AI
      if (this.config.enableCognitiveEngine && config.useCognitiveEngine) {
        return await this.generateWithCognitiveEngine(config);
      }

      // Otherwise use Postiz AI
      const response = await this.client.post('/ai/generate', {
        prompt: config.prompt,
        tone: config.tone || 'professional',
        targetAudience: config.targetAudience,
        keywords: config.keywords,
        maxLength: config.maxLength || 280,
      });

      return response.data.generatedText;
    } catch (error) {
      console.error('Error generating content:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to generate content: ${message}`);
    }
  }

  /**
   * Generate content using 371 OS cognitive engine
   * Provides superior AI-powered content generation
   */
  private async generateWithCognitiveEngine(config: AIGenerationConfig): Promise<string> {
    // TODO: Integrate with 371 OS cognitive engine
    // For now, fallback to standard AI generation
    console.log('Cognitive engine integration pending - using standard AI');
    
    const prompt = this.buildCognitivePrompt(config);
    const response = await this.client.post('/ai/generate', {
      prompt,
      tone: config.tone || 'professional',
      maxLength: config.maxLength || 280,
    });

    return response.data.generatedText;
  }

  /**
   * Build enhanced prompt for cognitive engine
   */
  private buildCognitivePrompt(config: AIGenerationConfig): string {
    let prompt = config.prompt;

    if (config.targetAudience) {
      prompt += `\n\nTarget Audience: ${config.targetAudience}`;
    }

    if (config.keywords && config.keywords.length > 0) {
      prompt += `\n\nKeywords to include: ${config.keywords.join(', ')}`;
    }

    if (config.tone) {
      prompt += `\n\nTone: ${config.tone}`;
    }

    return prompt;
  }

  /**
   * Get spatial analytics data for CEO's Orrery visualization
   */
  async getSpatialAnalytics(startDate: string, endDate: string): Promise<SpatialAnalytics> {
    try {
      const response = await this.client.get('/analytics/spatial', {
        params: { startDate, endDate },
      });

      const platformMetrics = new Map<SocialPlatform, PlatformMetrics>();
      
      for (const platform of Object.values(SocialPlatform)) {
        try {
          const metrics = await this.getPlatformMetrics(platform);
          platformMetrics.set(platform, metrics);
        } catch (error) {
          console.warn(`Failed to fetch metrics for ${platform}:`, error);
        }
      }

      return {
        period: { start: startDate, end: endDate },
        platformMetrics,
        topPosts: response.data.topPosts || [],
        demographics: response.data.demographics,
        trends: response.data.trends,
      };
    } catch (error) {
      console.error('Error fetching spatial analytics:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch spatial analytics: ${message}`);
    }
  }

  /**
   * Delete a scheduled post
   */
  async deletePost(postId: string): Promise<void> {
    try {
      await this.client.delete(`/posts/${postId}`);
    } catch (error) {
      console.error('Error deleting post:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete post: ${message}`);
    }
  }

  /**
   * Update a scheduled post
   */
  async updatePost(postId: string, content: Partial<PostContent>): Promise<ScheduledPost> {
    try {
      const response = await this.client.patch(`/posts/${postId}`, content);
      return {
        id: postId,
        content: response.data.content,
        status: response.data.status,
        createdAt: response.data.createdAt,
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error updating post:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update post: ${message}`);
    }
  }

  /**
   * Get scheduled posts
   */
  async getScheduledPosts(options?: {
    platform?: SocialPlatform;
    status?: string;
    limit?: number;
  }): Promise<ScheduledPost[]> {
    try {
      const response = await this.client.get('/posts', {
        params: options,
      });
      return response.data.posts;
    } catch (error) {
      console.error('Error fetching scheduled posts:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch scheduled posts: ${message}`);
    }
  }

  /**
   * Analyze optimal posting time for a platform
   */
  async analyzeOptimalPostingTime(platform: SocialPlatform): Promise<string[]> {
    try {
      const metrics = await this.getPlatformMetrics(platform);
      return metrics.bestPostingTimes;
    } catch (error) {
      console.error('Error analyzing optimal posting time:', error);
      return [];
    }
  }

  /**
   * Get content recommendations based on performance
   */
  async getContentRecommendations(platform: SocialPlatform): Promise<{
    themes: string[];
    hashtags: string[];
    optimalLength: number;
  }> {
    try {
      const response = await this.client.get(`/ai/recommendations/${platform}`);
      return {
        themes: response.data.themes || [],
        hashtags: response.data.hashtags || [],
        optimalLength: response.data.optimalLength || 280,
      };
    } catch (error) {
      console.error('Error fetching content recommendations:', error);
      return { themes: [], hashtags: [], optimalLength: 280 };
    }
  }
}
