/**
 * Spatial Interface Components for CEO's Orrery
 * 3D visualization of social media analytics
 */

import {
  SpatialAnalytics,
  SpatialVisualization,
  SpatialPlatformNode,
  SpatialConnection,
  ContentCluster,
  SpatialCoordinates,
  PlatformMetrics,
  SocialPlatform,
  ScheduledPost,
} from './types.js';

/**
 * Spatial Social Media Universe Generator
 * Creates 3D visualization data for CEO's Orrery
 */
export class SpatialSocialMediaUniverse {
  /**
   * Generate spatial visualization from analytics data
   */
  static generateVisualization(analytics: SpatialAnalytics): SpatialVisualization {
    const platforms = this.generatePlatformNodes(analytics.platformMetrics);
    const connections = this.generateConnections(analytics.topPosts);
    const clusters = this.generateContentClusters(analytics.topPosts);

    return {
      platforms,
      connections,
      clusters,
    };
  }

  /**
   * Generate platform nodes in 3D space
   * Positions platforms in circular orbit pattern
   */
  private static generatePlatformNodes(
    platformMetrics: Map<SocialPlatform, PlatformMetrics>
  ): SpatialPlatformNode[] {
    const nodes: SpatialPlatformNode[] = [];
    const platforms = Array.from(platformMetrics.entries());
    const angleStep = (2 * Math.PI) / platforms.length;

    platforms.forEach(([platform, metrics], index) => {
      const angle = index * angleStep;
      const radius = 100; // Base radius
      
      // Position in circular orbit
      const position: SpatialCoordinates = {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        z: 0,
      };

      // Size based on engagement
      const maxEngagement = Math.max(...platforms.map(([, m]) => m.totalEngagement));
      const size = 10 + (metrics.totalEngagement / maxEngagement) * 40;

      // Platform-specific colors
      const color = this.getPlatformColor(platform);

      nodes.push({
        platform,
        position,
        size,
        color,
        metrics,
      });
    });

    return nodes;
  }

  /**
   * Generate connections between related content
   */
  private static generateConnections(posts: ScheduledPost[]): SpatialConnection[] {
    const connections: SpatialConnection[] = [];

    // Cross-platform connections
    for (let i = 0; i < posts.length; i++) {
      for (let j = i + 1; j < posts.length; j++) {
        const post1 = posts[i];
        const post2 = posts[j];

        // Check if posts share platforms
        const sharedPlatforms = post1.content.platforms.filter(p =>
          post2.content.platforms.includes(p)
        );

        if (sharedPlatforms.length > 0) {
          connections.push({
            source: post1.id,
            target: post2.id,
            strength: sharedPlatforms.length / Math.max(post1.content.platforms.length, post2.content.platforms.length),
            type: 'cross-platform',
          });
        }

        // Check for similar content (based on tags)
        const tags1 = post1.content.metadata?.tags || [];
        const tags2 = post2.content.metadata?.tags || [];
        const sharedTags = tags1.filter(t => tags2.includes(t));

        if (sharedTags.length > 0) {
          connections.push({
            source: post1.id,
            target: post2.id,
            strength: sharedTags.length / Math.max(tags1.length, tags2.length),
            type: 'similar-content',
          });
        }
      }
    }

    return connections;
  }

  /**
   * Generate content clusters based on themes
   */
  private static generateContentClusters(posts: ScheduledPost[]): ContentCluster[] {
    const clusters: ContentCluster[] = [];
    const clusterMap = new Map<string, ScheduledPost[]>();

    // Group posts by category
    for (const post of posts) {
      const category = post.content.metadata?.category || 'uncategorized';
      if (!clusterMap.has(category)) {
        clusterMap.set(category, []);
      }
      clusterMap.get(category)!.push(post);
    }

    // Create cluster objects
    let clusterIndex = 0;
    for (const [theme, clusterPosts] of clusterMap.entries()) {
      if (clusterPosts.length < 2) continue; // Minimum 2 posts for a cluster

      // Position clusters in a spiral pattern
      const angle = clusterIndex * 0.618 * 2 * Math.PI; // Golden angle
      const radius = 50 + clusterIndex * 20;

      const center: SpatialCoordinates = {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        z: clusterIndex * 10,
      };

      // Calculate average engagement (mock calculation)
      const avgEngagement = clusterPosts.length * 100; // Simplified

      clusters.push({
        id: `cluster-${theme}`,
        center,
        posts: clusterPosts,
        theme,
        avgEngagement,
      });

      clusterIndex++;
    }

    return clusters;
  }

  /**
   * Get platform-specific color
   */
  private static getPlatformColor(platform: SocialPlatform): string {
    const colors: Record<SocialPlatform, string> = {
      [SocialPlatform.TWITTER]: '#1DA1F2',
      [SocialPlatform.LINKEDIN]: '#0A66C2',
      [SocialPlatform.FACEBOOK]: '#1877F2',
      [SocialPlatform.INSTAGRAM]: '#E4405F',
      [SocialPlatform.THREADS]: '#000000',
      [SocialPlatform.MASTODON]: '#6364FF',
      [SocialPlatform.BLUESKY]: '#0085FF',
    };

    return colors[platform] || '#888888';
  }

  /**
   * Calculate engagement velocity (rate of change)
   */
  static calculateEngagementVelocity(
    platform: PlatformMetrics,
    previousMetrics?: PlatformMetrics
  ): number {
    if (!previousMetrics) return 0;

    const currentEngagement = platform.totalEngagement;
    const previousEngagement = previousMetrics.totalEngagement;

    return ((currentEngagement - previousEngagement) / previousEngagement) * 100;
  }

  /**
   * Generate heat map data for posting times
   */
  static generatePostingHeatmap(platforms: Map<SocialPlatform, PlatformMetrics>): {
    platform: SocialPlatform;
    hour: number;
    engagementScore: number;
  }[] {
    const heatmapData: {
      platform: SocialPlatform;
      hour: number;
      engagementScore: number;
    }[] = [];

    for (const [platform, metrics] of platforms.entries()) {
      // Parse best posting times and create heatmap
      for (const timeStr of metrics.bestPostingTimes) {
        try {
          const hour = new Date(timeStr).getHours();
          // Mock engagement score based on position in best times list
          const score = 100 - (metrics.bestPostingTimes.indexOf(timeStr) * 10);

          heatmapData.push({
            platform,
            hour,
            engagementScore: Math.max(0, score),
          });
        } catch (error) {
          console.warn(`Failed to parse posting time: ${timeStr}`);
        }
      }
    }

    return heatmapData;
  }

  /**
   * Generate trend arrows for spatial view
   */
  static generateTrendArrows(analytics: SpatialAnalytics): {
    platform: SocialPlatform;
    direction: 'up' | 'down' | 'stable';
    magnitude: number;
  }[] {
    const arrows: {
      platform: SocialPlatform;
      direction: 'up' | 'down' | 'stable';
      magnitude: number;
    }[] = [];

    for (const [platform, metrics] of analytics.platformMetrics.entries()) {
      const growth = metrics.followerGrowth;
      
      let direction: 'up' | 'down' | 'stable';
      if (growth > 5) direction = 'up';
      else if (growth < -5) direction = 'down';
      else direction = 'stable';

      arrows.push({
        platform,
        direction,
        magnitude: Math.abs(growth),
      });
    }

    return arrows;
  }

  /**
   * Export visualization data for CEO's Orrery renderer
   */
  static exportForOrrery(visualization: SpatialVisualization): {
    nodes: unknown[];
    edges: unknown[];
    clusters: unknown[];
    metadata: {
      generated: string;
      platformCount: number;
      contentCount: number;
      clusterCount: number;
    };
  } {
    return {
      nodes: visualization.platforms.map(node => ({
        id: node.platform,
        label: node.platform.toUpperCase(),
        x: node.position.x,
        y: node.position.y,
        z: node.position.z,
        size: node.size,
        color: node.color,
        data: node.metrics,
      })),
      edges: visualization.connections.map((conn, index) => ({
        id: `edge-${index}`,
        source: conn.source,
        target: conn.target,
        weight: conn.strength,
        type: conn.type,
      })),
      clusters: visualization.clusters.map(cluster => ({
        id: cluster.id,
        label: cluster.theme,
        centerX: cluster.center.x,
        centerY: cluster.center.y,
        centerZ: cluster.center.z,
        size: cluster.posts.length,
        engagement: cluster.avgEngagement,
      })),
      metadata: {
        generated: new Date().toISOString(),
        platformCount: visualization.platforms.length,
        contentCount: visualization.connections.length,
        clusterCount: visualization.clusters.length,
      },
    };
  }
}
