/**
 * PostHogInit.ts - PostHog Initialization for 371 OS
 *
 * Initializes PostHog service during application startup
 */

import { posthogService } from './posthog-service';
import { getValidatedPostHogConfig } from './posthog-config';

/**
 * Initialize PostHog service during application startup
 * @returns Promise that resolves when initialization is complete
 */
export async function initializePostHog(): Promise<boolean> {
  try {
    console.log('Initializing PostHog service...');
    
    // Get validated configuration
    const config = getValidatedPostHogConfig();
    
    if (!config) {
      console.log('PostHog configuration not found or invalid, skipping initialization');
      return true;
    }
    
    // Initialize PostHog service
    const initialized = await posthogService.initialize(config);
    
    if (initialized) {
      console.log('✅ PostHog service initialized successfully');
    } else {
      console.log('⚠️ PostHog service initialization failed');
    }
    
    return initialized;
  } catch (error) {
    console.error('Failed to initialize PostHog service:', error);
    return false;
  }
}

/**
 * Shutdown PostHog service gracefully
 * @returns Promise that resolves when shutdown is complete
 */
export async function shutdownPostHog(): Promise<boolean> {
  try {
    console.log('Shutting down PostHog service...');
    const shutdown = await posthogService.shutdown();
    
    if (shutdown) {
      console.log('✅ PostHog service shutdown successfully');
    } else {
      console.log('⚠️ PostHog service shutdown failed');
    }
    
    return shutdown;
  } catch (error) {
    console.error('Failed to shutdown PostHog service:', error);
    return false;
  }
}

export default {
  initializePostHog,
  shutdownPostHog,
};