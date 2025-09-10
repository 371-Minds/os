/**
 * PostHogConfig.ts - PostHog Configuration Service for 371 OS
 *
 * Provides configuration management for PostHog integration,
 * handling environment variables and default values.
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface PostHogConfig {
  apiKey: string;
  host?: string;
  flushAt?: number;
  flushInterval?: number;
  enable?: boolean;
}

/**
 * Get PostHog configuration from environment variables
 * @returns PostHogConfig object with configuration values
 */
export function getPostHogConfig(): PostHogConfig {
  // Check if PostHog is enabled (default: true)
  const enable = process.env.POSTHOG_ENABLE !== 'false';
  
  // Get API key (required if enabled)
  const apiKey = process.env.POSTHOG_API_KEY || '';
  
  // Get host (optional, defaults to PostHog cloud)
  const host = process.env.POSTHOG_HOST || undefined;
  
  // Get flush settings (optional)
  const flushAt = process.env.POSTHOG_FLUSH_AT 
    ? parseInt(process.env.POSTHOG_FLUSH_AT, 10) 
    : undefined;
    
  const flushInterval = process.env.POSTHOG_FLUSH_INTERVAL 
    ? parseInt(process.env.POSTHOG_FLUSH_INTERVAL, 10) 
    : undefined;

  return {
    apiKey,
    host,
    flushAt,
    flushInterval,
    enable,
  };
}

/**
 * Validate PostHog configuration
 * @param config PostHog configuration to validate
 * @returns boolean indicating if configuration is valid
 */
export function validatePostHogConfig(config: PostHogConfig): boolean {
  // If disabled, configuration is always valid
  if (config.enable === false) {
    return true;
  }

  // If enabled, API key is required
  if (!config.apiKey || config.apiKey.trim() === '') {
    console.warn('PostHog is enabled but POSTHOG_API_KEY is not set');
    return false;
  }

  return true;
}

/**
 * Get PostHog configuration with validation
 * @returns Validated PostHogConfig or null if invalid
 */
export function getValidatedPostHogConfig(): PostHogConfig | null {
  const config = getPostHogConfig();
  
  if (validatePostHogConfig(config)) {
    return config;
  }
  
  return null;
}

export default {
  getPostHogConfig,
  validatePostHogConfig,
  getValidatedPostHogConfig,
};