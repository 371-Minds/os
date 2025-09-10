/**
 * PostHogService.ts - PostHog Integration for 371 OS
 *
 * Provides comprehensive user behavior tracking and analytics integration
 * with PostHog for the cognitive-aware interface system.
 */

import { PostHog } from 'posthog-node';
import { getValidatedPostHogConfig, type PostHogConfig } from './posthog-config';

export interface PostHogConfig {
  apiKey: string;
  host?: string;
  flushAt?: number;
  flushInterval?: number;
  enable?: boolean;
}

export interface PostHogEvent {
  event: string;
  distinctId: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

export interface PostHogUser {
  distinctId: string;
  properties?: Record<string, any>;
}

class PostHogService {
  private client: PostHog | null = null;
  private config: PostHogConfig | null = null;
  private isInitialized = false;

  /**
   * Initialize PostHog client with configuration
   * @param config PostHog configuration
   * @returns boolean indicating success
   */
  async initialize(config?: PostHogConfig): Promise<boolean> {
    try {
      // If no config provided, get from environment
      const postHogConfig = config || getValidatedPostHogConfig() || {
        apiKey: '',
        enable: false,
      };

      // Check if already initialized
      if (this.isInitialized && this.client) {
        console.log('PostHog service already initialized');
        return true;
      }

      // Check if enabled
      if (postHogConfig.enable === false) {
        console.log('PostHog service disabled by configuration');
        return true;
      }

      // Validate API key
      if (!postHogConfig.apiKey) {
        console.warn(
          'PostHog API key not provided, service will run in mock mode',
        );
        return true;
      }

      // Create PostHog client
      this.client = new PostHog(postHogConfig.apiKey, {
        host: postHogConfig.host || 'https://app.posthog.com',
        flushAt: postHogConfig.flushAt || 20,
        flushInterval: postHogConfig.flushInterval || 10000,
      });

      this.config = postHogConfig;
      this.isInitialized = true;

      console.log('PostHog service initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize PostHog service:', error);
      return false;
    }
  }

  /**
   * Capture an event in PostHog
   * @param event PostHog event data
   * @returns boolean indicating success
   */
  async capture(event: PostHogEvent): Promise<boolean> {
    try {
      // Check if service is initialized
      if (!this.isInitialized || !this.client) {
        console.warn(
          'PostHog service not initialized, event not captured:',
          event.event,
        );
        return false;
      }

      // Check if enabled
      if (this.config?.enable === false) {
        return true; // Silent success
      }

      // Capture event
      this.client.capture({
        distinctId: event.distinctId,
        event: event.event,
        properties: event.properties,
        timestamp: event.timestamp,
      });

      return true;
    } catch (error) {
      console.error('Failed to capture PostHog event:', error);
      return false;
    }
  }

  /**
   * Identify a user in PostHog
   * @param user User identification data
   * @returns boolean indicating success
   */
  async identify(user: PostHogUser): Promise<boolean> {
    try {
      // Check if service is initialized
      if (!this.isInitialized || !this.client) {
        console.warn(
          'PostHog service not initialized, user not identified:',
          user.distinctId,
        );
        return false;
      }

      // Check if enabled
      if (this.config?.enable === false) {
        return true; // Silent success
      }

      // Identify user
      this.client.identify({
        distinctId: user.distinctId,
        properties: user.properties,
      });

      return true;
    } catch (error) {
      console.error('Failed to identify PostHog user:', error);
      return false;
    }
  }

  /**
   * Alias a user in PostHog
   * @param distinctId Current distinct ID
   * @param alias New alias
   * @returns boolean indicating success
   */
  async alias(distinctId: string, alias: string): Promise<boolean> {
    try {
      // Check if service is initialized
      if (!this.isInitialized || !this.client) {
        console.warn(
          'PostHog service not initialized, alias not created:',
          distinctId,
          alias,
        );
        return false;
      }

      // Check if enabled
      if (this.config?.enable === false) {
        return true; // Silent success
      }

      // Create alias
      this.client.alias({
        distinctId,
        alias,
      });

      return true;
    } catch (error) {
      console.error('Failed to create PostHog alias:', error);
      return false;
    }
  }

  /**
   * Flush all pending events to PostHog
   * @returns boolean indicating success
   */
  async flush(): Promise<boolean> {
    try {
      // Check if service is initialized
      if (!this.isInitialized || !this.client) {
        console.warn('PostHog service not initialized, flush not performed');
        return false;
      }

      // Check if enabled
      if (this.config?.enable === false) {
        return true; // Silent success
      }

      // Flush events
      await this.client.flush();

      return true;
    } catch (error) {
      console.error('Failed to flush PostHog events:', error);
      return false;
    }
  }

  /**
   * Shutdown PostHog client gracefully
   * @returns boolean indicating success
   */
  async shutdown(): Promise<boolean> {
    try {
      // Check if service is initialized
      if (!this.isInitialized || !this.client) {
        console.log('PostHog service not initialized, shutdown not required');
        return true;
      }

      // Shutdown client
      await this.client.shutdown();

      this.client = null;
      this.isInitialized = false;

      console.log('PostHog service shutdown successfully');
      return true;
    } catch (error) {
      console.error('Failed to shutdown PostHog service:', error);
      return false;
    }
  }

  /**
   * Check if PostHog service is initialized and ready
   * @returns boolean indicating if service is ready
   */
  isReady(): boolean {
    return this.isInitialized && !!this.client;
  }

  /**
   * Get the PostHog client instance
   * @returns PostHog client or null if not initialized
   */
  getClient(): PostHog | null {
    return this.client;
  }
}

// Export singleton instance
export const posthogService = new PostHogService();
export default PostHogService;
