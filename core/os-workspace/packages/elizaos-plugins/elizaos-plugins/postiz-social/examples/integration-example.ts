/**
 * Postiz Integration Example
 * Demonstrates how to use Postiz plugin in 371 OS
 */

import {
  PostizPlugin,
  SocialPlatform,
  type ContentStrategy,
} from '@elizaos/plugin-postiz-social';

/**
 * Example 1: Basic Setup and Publishing
 */
async function basicExample() {
  console.log('='.repeat(60));
  console.log('Example 1: Basic Setup and Publishing');
  console.log('='.repeat(60));

  // Initialize plugin with your Postiz API credentials
  const plugin = new PostizPlugin({
    apiEndpoint: process.env.POSTIZ_API_ENDPOINT || 'https://api.postiz.com',
    apiKey: process.env.POSTIZ_API_KEY || 'your-api-key-here',
    enableSpatialInterface: true,
    enableCognitiveEngine: true,
    defaultPlatforms: [SocialPlatform.TWITTER, SocialPlatform.LINKEDIN],
    autoOptimize: true,
  });

  const actions = plugin.getActions();

  // Example: Schedule a post
  console.log('\nScheduling a post...');
  const scheduleResult = await actions.schedulePost({
    text: '🚀 Excited to share our latest innovation in AI-powered social media management! #AI #Innovation',
    platforms: [SocialPlatform.TWITTER, SocialPlatform.LINKEDIN],
    scheduledTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    metadata: {
      campaignId: 'product-launch-2025',
      tags: ['ai', 'innovation', 'socialmedia'],
      category: 'Product Updates',
    },
  });

  console.log('Result:', scheduleResult.message);
}

/**
 * Example 2: AI Content Generation
 */
async function aiContentExample() {
  console.log('\n' + '='.repeat(60));
  console.log('Example 2: AI Content Generation');
  console.log('='.repeat(60));

  const plugin = new PostizPlugin({
    apiEndpoint: process.env.POSTIZ_API_ENDPOINT || 'https://api.postiz.com',
    apiKey: process.env.POSTIZ_API_KEY || 'your-api-key-here',
    enableCognitiveEngine: true,
  });

  const actions = plugin.getActions();

  // Generate content with AI
  console.log('\nGenerating AI content...');
  const contentResult = await actions.generateContent({
    prompt: 'Write an engaging post about the benefits of autonomous AI agents in business operations',
    tone: 'professional',
    targetAudience: 'Business executives and CTOs',
    keywords: ['AI', 'automation', 'ROI', 'efficiency'],
    maxLength: 280,
    useCognitiveEngine: true,
  });

  if (contentResult.success) {
    console.log('\n✓ Generated content:');
    console.log((contentResult.data as any).generatedText);
  }
}

/**
 * Example 3: Autonomous Social Media Agent
 */
async function autonomousAgentExample() {
  console.log('\n' + '='.repeat(60));
  console.log('Example 3: Autonomous Social Media Agent');
  console.log('='.repeat(60));

  const plugin = new PostizPlugin({
    apiEndpoint: process.env.POSTIZ_API_ENDPOINT || 'https://api.postiz.com',
    apiKey: process.env.POSTIZ_API_KEY || 'your-api-key-here',
    enableCognitiveEngine: true,
  });

  // Define content strategy
  const strategy: ContentStrategy = {
    name: 'Q1-2025-Growth-Strategy',
    platforms: [
      SocialPlatform.TWITTER,
      SocialPlatform.LINKEDIN,
      SocialPlatform.FACEBOOK,
    ],
    frequency: {
      postsPerDay: 3,
      optimizeTiming: true,
    },
    themes: [
      'AI Innovation',
      'Product Updates',
      'Industry Insights',
      'Customer Success Stories',
      'Tech Tips',
    ],
    aiEnabled: true,
    targetAudience: 'Tech professionals, CTOs, and business decision makers',
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

  // Create CMO agent
  console.log('\nCreating CMO agent...');
  const agent = plugin.createAgent('cmo-agent', {
    role: 'CMO',
    defaultStrategy: strategy,
    autoPublish: false, // Review before publishing
    useAI: true,
  });

  // Generate content calendar
  console.log('\nGenerating 7-day content calendar...');
  const calendar = await agent.generateContentCalendar(7);

  console.log(`\n✓ Generated ${calendar.calendar.length} posts`);
  console.log('\nSample posts:');
  calendar.calendar.slice(0, 3).forEach((item, index) => {
    console.log(`\n${index + 1}. ${item.date} - ${item.platform}`);
    console.log(`   ${item.content.text.substring(0, 100)}...`);
  });

  // Monitor campaigns
  console.log('\nMonitoring campaign performance...');
  const monitoring = await agent.monitorCampaigns();

  console.log('\n✓ Platform Performance:');
  monitoring.performance.forEach((rate, platform) => {
    console.log(`   ${platform}: ${rate.toFixed(2)}% engagement`);
  });

  if (monitoring.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    monitoring.recommendations.forEach(rec => {
      console.log(`   - ${rec}`);
    });
  }
}

/**
 * Example 4: Spatial Analytics for CEO's Orrery
 */
async function spatialAnalyticsExample() {
  console.log('\n' + '='.repeat(60));
  console.log('Example 4: Spatial Analytics for CEO\'s Orrery');
  console.log('='.repeat(60));

  const plugin = new PostizPlugin({
    apiEndpoint: process.env.POSTIZ_API_ENDPOINT || 'https://api.postiz.com',
    apiKey: process.env.POSTIZ_API_KEY || 'your-api-key-here',
    enableSpatialInterface: true,
  });

  // Get spatial visualization data
  console.log('\nGenerating spatial visualization...');
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30); // Last 30 days

  const spatialData = await plugin.getSpatialVisualization(
    startDate.toISOString(),
    new Date().toISOString()
  );

  console.log('\n✓ Spatial Visualization Data:');
  console.log(`   Platform Nodes: ${spatialData.nodes.length}`);
  console.log(`   Connections: ${spatialData.edges.length}`);
  console.log(`   Content Clusters: ${spatialData.clusters.length}`);

  console.log('\n📊 Platform Nodes (3D Positions):');
  spatialData.nodes.forEach((node: any) => {
    console.log(`   ${node.label}:`);
    console.log(`      Position: (${node.x.toFixed(1)}, ${node.y.toFixed(1)}, ${node.z.toFixed(1)})`);
    console.log(`      Size: ${node.size.toFixed(1)}`);
    console.log(`      Color: ${node.color}`);
  });

  if (spatialData.clusters.length > 0) {
    console.log('\n🎯 Content Clusters:');
    spatialData.clusters.forEach((cluster: any) => {
      console.log(`   ${cluster.label}: ${cluster.size} posts, avg engagement: ${cluster.engagement}`);
    });
  }
}

/**
 * Example 5: Multi-Brand Management
 */
async function multiBrandExample() {
  console.log('\n' + '='.repeat(60));
  console.log('Example 5: Multi-Brand Management');
  console.log('='.repeat(60));

  const plugin = new PostizPlugin({
    apiEndpoint: process.env.POSTIZ_API_ENDPOINT || 'https://api.postiz.com',
    apiKey: process.env.POSTIZ_API_KEY || 'your-api-key-here',
    enableCognitiveEngine: true,
  });

  // Create agents for different brands
  const brands = [
    { id: '371-os', name: '371 OS', tone: 'professional' },
    { id: 'lyriclines', name: 'LyricLines', tone: 'creative' },
    { id: 'vision2results', name: 'Vision2Results', tone: 'motivational' },
  ];

  console.log('\nCreating brand agents...');
  for (const brand of brands) {
    const agent = plugin.createAgent(`${brand.id}-agent`, {
      role: 'Content Creator',
      useAI: true,
      autoPublish: false,
    });
    console.log(`✓ Created agent for ${brand.name}`);
  }

  const allAgents = plugin.getAllAgents();
  console.log(`\nTotal active agents: ${allAgents.size}`);
  console.log('Agent IDs:', Array.from(allAgents.keys()));
}

/**
 * Run all examples
 */
async function runExamples() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║   Postiz Integration Examples - 371 OS                  ║');
  console.log('║   Revolutionary Social Media Management                 ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('\n');

  try {
    await basicExample();
    await aiContentExample();
    await autonomousAgentExample();
    await spatialAnalyticsExample();
    await multiBrandExample();

    console.log('\n' + '='.repeat(60));
    console.log('✓ All examples completed successfully!');
    console.log('='.repeat(60));
    console.log('\n🎉 Postiz integration is ready for production use!');
    console.log('\n💡 Next steps:');
    console.log('   1. Set up your Postiz API credentials');
    console.log('   2. Configure your content strategy');
    console.log('   3. Create and deploy your agents');
    console.log('   4. Monitor performance in CEO\'s Orrery');
    console.log('\n');
  } catch (error) {
    console.error('\n✗ Error running examples:', error);
  }
}

// Run examples if executed directly
if (import.meta.main) {
  runExamples().catch(console.error);
}

export {
  basicExample,
  aiContentExample,
  autonomousAgentExample,
  spatialAnalyticsExample,
  multiBrandExample,
};
