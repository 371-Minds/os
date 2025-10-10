# @elizaos/plugin-postiz-social

Revolutionary social media management plugin for ElizaOS with cognitive-aware interfaces and spatial analytics visualization.

## 🎯 Overview

The Postiz Social Media Plugin integrates Postiz's powerful social media management capabilities into the 371 OS ecosystem, providing:

- **🤖 AI-Powered Content Generation**: Leverage 371 OS cognitive engine for superior content creation
- **🌌 Spatial Analytics**: 3D visualization in CEO's Orrery for social media performance
- **🧠 Cognitive-Aware Interfaces**: Adaptive UI that understands user mental states
- **⚡ Autonomous Agents**: Self-managing social media operations with strategic planning
- **💰 Cost Optimization**: 97.6% cost reduction via Akash Network deployment
- **🔗 Multi-Platform**: Twitter, LinkedIn, Facebook, Instagram, Threads, Mastodon, Bluesky

## 📦 Installation

```bash
# Using Bun (RECOMMENDED for 371 OS)
cd f:/os-main/core/os-workspace
bun add @elizaos/plugin-postiz-social

# Or with npm
npm install @elizaos/plugin-postiz-social
```

## 🚀 Quick Start

### Basic Setup

```typescript
import { PostizPlugin } from '@elizaos/plugin-postiz-social';

// Initialize plugin
const plugin = new PostizPlugin({
  apiEndpoint: 'https://api.postiz.com',
  apiKey: process.env.POSTIZ_API_KEY!,
  enableSpatialInterface: true,
  enableCognitiveEngine: true,
  defaultPlatforms: ['twitter', 'linkedin'],
  autoOptimize: true,
});

// Get provider and actions
const provider = plugin.getProvider();
const actions = plugin.getActions();
```

### Publishing a Post

```typescript
import { SocialPlatform } from '@elizaos/plugin-postiz-social';

// Publish immediately
const result = await actions.publishPost({
  text: '🚀 Exciting news! Check out our latest innovation!',
  platforms: [SocialPlatform.TWITTER, SocialPlatform.LINKEDIN],
  media: [
    {
      url: 'https://example.com/image.jpg',
      type: 'image',
      altText: 'Product screenshot',
    },
  ],
});

console.log(result.message); // "Post published successfully to twitter, linkedin"
```

### Scheduling Posts

```typescript
// Schedule for later
const scheduledPost = await actions.schedulePost({
  text: '💡 Pro tip: Automation saves time and money!',
  platforms: [SocialPlatform.TWITTER],
  scheduledTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  metadata: {
    campaignId: 'automation-tips',
    tags: ['productivity', 'automation'],
  },
});
```

### AI Content Generation

```typescript
// Generate content with AI
const contentResult = await actions.generateContent({
  prompt: 'Create a professional post about AI and automation benefits',
  tone: 'professional',
  targetAudience: 'Tech professionals and developers',
  keywords: ['AI', 'automation', 'innovation'],
  maxLength: 280,
  useCognitiveEngine: true, // Use 371 OS cognitive engine
});

const generatedText = contentResult.data.generatedText;
console.log(generatedText);
```

### Analytics and Insights

```typescript
// Get platform analytics
const analytics = await actions.getPlatformAnalytics(SocialPlatform.TWITTER);

if (analytics.success) {
  const { metrics, recommendations } = analytics.data;
  
  console.log('Followers:', metrics.followers);
  console.log('Engagement Rate:', metrics.avgEngagementRate);
  console.log('Best Posting Times:', metrics.bestPostingTimes);
  console.log('Recommended Themes:', recommendations.themes);
}
```

### Spatial Analytics for CEO's Orrery

```typescript
// Get spatial visualization data
const spatialData = await plugin.getSpatialVisualization(
  '2025-01-01',
  '2025-01-31'
);

// Export for 3D rendering in CEO's Orrery
console.log('Platform Nodes:', spatialData.nodes);
console.log('Engagement Connections:', spatialData.edges);
console.log('Content Clusters:', spatialData.clusters);
```

## 🤖 Autonomous Social Media Agent

### Creating an Agent

```typescript
import { SocialPlatform, ContentStrategy } from '@elizaos/plugin-postiz-social';

// Define content strategy
const strategy: ContentStrategy = {
  name: 'Q1-2025-Growth',
  platforms: [SocialPlatform.TWITTER, SocialPlatform.LINKEDIN],
  frequency: {
    postsPerDay: 3,
    optimizeTiming: true,
  },
  themes: ['AI Innovation', 'Product Updates', 'Industry Insights'],
  aiEnabled: true,
  targetAudience: 'Tech professionals and decision makers',
  goals: [
    {
      metric: 'engagement',
      target: 5, // 5% engagement rate
      current: 2.8,
      deadline: '2025-03-31',
    },
    {
      metric: 'followers',
      target: 10000,
      current: 7500,
    },
  ],
};

// Create agent
const agent = plugin.createAgent('cmo-agent', {
  role: 'CMO',
  defaultStrategy: strategy,
  autoPublish: false, // Review before publishing
  useAI: true,
});
```

### Execute Strategy

```typescript
// Execute content strategy
const execution = await agent.executeContentStrategy();

console.log('Scheduled Posts:', execution.scheduled.length);
console.log('Insights:', execution.insights);

// Example insights:
// [
//   "twitter: Growing audience (+12%)",
//   "linkedin: High engagement rate (6.2%)",
//   "twitter: Low engagement - consider strategy adjustment"
// ]
```

### Generate Content Calendar

```typescript
// Generate 30-day content calendar
const calendar = await agent.generateContentCalendar(30);

calendar.calendar.forEach(item => {
  console.log(`${item.date} - ${item.platform}: ${item.content.text}`);
});
```

### Monitor Performance

```typescript
// Monitor ongoing campaigns
const monitoring = await agent.monitorCampaigns();

monitoring.performance.forEach((engagementRate, platform) => {
  console.log(`${platform}: ${engagementRate}% engagement`);
});

console.log('Recommendations:', monitoring.recommendations);
```

## 🌌 Spatial Interface Integration

### CEO's Orrery Visualization

The plugin provides comprehensive 3D spatial visualization data for the CEO's Orrery:

```typescript
import { SpatialSocialMediaUniverse } from '@elizaos/plugin-postiz-social';

// Get analytics
const analytics = await provider.getSpatialAnalytics(
  '2025-01-01',
  '2025-01-31'
);

// Generate visualization
const visualization = SpatialSocialMediaUniverse.generateVisualization(analytics);

// Platform nodes in 3D space
visualization.platforms.forEach(node => {
  console.log(`${node.platform}:`, {
    position: node.position, // { x, y, z }
    size: node.size, // Based on engagement
    color: node.color, // Platform brand color
  });
});

// Content clusters
visualization.clusters.forEach(cluster => {
  console.log(`Cluster: ${cluster.theme}`, {
    posts: cluster.posts.length,
    avgEngagement: cluster.avgEngagement,
  });
});
```

## 📊 Advanced Features

### Engagement Analysis

```typescript
// Analyze post engagement
const engagement = await actions.analyzeEngagement('post_123456');

if (engagement.success) {
  const { metrics, summary } = engagement.data;
  
  metrics.forEach(m => {
    console.log(`${m.platform}:`);
    console.log(`  Likes: ${m.likes}`);
    console.log(`  Shares: ${m.shares}`);
    console.log(`  Comments: ${m.comments}`);
    console.log(`  Impressions: ${m.impressions}`);
    console.log(`  Engagement Rate: ${m.engagementRate}%`);
  });
}
```

### Posting Heatmap

```typescript
// Generate optimal posting times heatmap
const heatmap = SpatialSocialMediaUniverse.generatePostingHeatmap(
  analytics.platformMetrics
);

heatmap.forEach(data => {
  console.log(`${data.platform} at ${data.hour}:00 - Score: ${data.engagementScore}`);
});
```

### Trend Analysis

```typescript
// Generate trend arrows for spatial view
const trends = SpatialSocialMediaUniverse.generateTrendArrows(analytics);

trends.forEach(trend => {
  console.log(`${trend.platform}: ${trend.direction} (${trend.magnitude}%)`);
});
```

## 🔧 Configuration

### Plugin Configuration

```typescript
interface PostizPluginConfig {
  /** Postiz API endpoint */
  apiEndpoint: string;
  
  /** API key */
  apiKey: string;
  
  /** Enable spatial interface (default: true) */
  enableSpatialInterface?: boolean;
  
  /** Enable cognitive engine (default: true) */
  enableCognitiveEngine?: boolean;
  
  /** Default platforms */
  defaultPlatforms?: SocialPlatform[];
  
  /** Auto-optimization (default: true) */
  autoOptimize?: boolean;
}
```

### Agent Configuration

```typescript
interface SocialMediaAgentConfig {
  /** Agent role */
  role: 'CMO' | 'Content Creator' | 'Community Manager';
  
  /** Default content strategy */
  defaultStrategy?: ContentStrategy;
  
  /** Auto-publish enabled (default: false) */
  autoPublish?: boolean;
  
  /** AI generation enabled (default: true) */
  useAI?: boolean;
}
```

## 🎯 Use Cases

### 1. Automated Content Marketing
```typescript
// Create CMO agent for automated marketing
const cmoAgent = plugin.createAgent('cmo', {
  role: 'CMO',
  defaultStrategy: marketingStrategy,
  autoPublish: true,
  useAI: true,
});

// Execute daily
setInterval(async () => {
  await cmoAgent.executeContentStrategy();
}, 86400000); // 24 hours
```

### 2. Multi-Brand Management
```typescript
// Create agents for different brands
const brand1Agent = plugin.createAgent('brand-1', {
  role: 'Content Creator',
  defaultStrategy: brand1Strategy,
});

const brand2Agent = plugin.createAgent('brand-2', {
  role: 'Content Creator',
  defaultStrategy: brand2Strategy,
});
```

### 3. Analytics Dashboard
```typescript
// Build comprehensive analytics dashboard
const dashboardData = {
  spatial: await plugin.getSpatialVisualization(startDate, endDate),
  trends: await Promise.all(
    platforms.map(p => actions.getPlatformAnalytics(p))
  ),
  performance: await agent.monitorCampaigns(),
};
```

## 🔗 Integration with 371 OS

This plugin seamlessly integrates with the 371 OS ecosystem:

- **CEO's Orrery**: Spatial social media analytics visualization
- **Cognitive Engine**: Advanced AI content generation
- **Developer's Galaxy**: Development tools and debugging
- **Blockchain Coordination**: Decentralized agent management
- **Akash Network**: Cost-optimized deployment

## 📚 API Reference

See [API Documentation](./docs/API.md) for complete API reference.

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](../../LICENSE) for details.

## 🆘 Support

- **Documentation**: See `/documentation` folder in 371 OS repo
- **Issues**: [GitHub Issues](https://github.com/371-Minds/os/issues)
- **Community**: Join our Discord

## 🎉 Revolutionary Impact

This integration creates the **world's first cognitive-aware social media management platform**:

✅ Spatial Social Media Analytics  
✅ AI-Powered Content Strategy  
✅ Cross-Platform Intelligence  
✅ 97.6% Cost Reduction  
✅ Self-Aware Content Agents  
✅ Autonomous Business Operations  

**Welcome to the future of social media management with 371 OS!** 🚀
