/**
 * MongoDB Connection Test for 371 OS
 *
 * Tests MongoDB connectivity for both local and Akash deployments.
 */

import dotenv from 'dotenv';
import { mongodb371 } from '../packages/elizaos-plugins/mongodb-integration/src/mongodb-service.js';

// Load environment variables
dotenv.config();

async function testMongoDBConnection() {
  console.log('🧪 371 OS - MongoDB Connection Test');
  console.log('===================================');

  try {
    // Test local connection first
    console.log('\n📍 Testing Local MongoDB Connection...');
    const localConnected = await mongodb371.connect(false);

    if (localConnected) {
      console.log('✅ Local MongoDB connection successful!');

      // Test health check
      const health = await mongodb371.healthCheck();
      console.log('📊 Database Health:', health);

      // Test basic operations
      console.log('\n🔧 Testing basic operations...');

      // Test agent data
      const testAgent = {
        agentId: 'test-connection-agent',
        type: 'TestAgent',
        status: 'active',
        lastActivity: new Date(),
        metrics: {
          tasksCompleted: 1,
          coordinationEvents: 0,
          uptime: 100,
        },
      };

      const saveResult = await mongodb371.saveAgentData(testAgent);
      console.log(
        '💾 Save agent data:',
        saveResult ? '✅ Success' : '❌ Failed',
      );

      const retrievedAgent = await mongodb371.getAgentData(testAgent.agentId);
      console.log(
        '📖 Retrieve agent data:',
        retrievedAgent ? '✅ Success' : '❌ Failed',
      );

      // Test business intelligence
      const testBI = {
        timestamp: new Date(),
        agentId: testAgent.agentId,
        eventType: 'data_collection',
        data: { test: 'connection_test', value: 42 },
        insights: ['Connection test successful'],
        confidence: 0.95,
      };

      const biResult = await mongodb371.saveBusinessIntelligence(testBI);
      console.log(
        '📈 Save business intelligence:',
        biResult ? '✅ Success' : '❌ Failed',
      );

      // Test communication events
      const testEvent = {
        eventId: 'test-connection-event-' + Date.now(),
        timestamp: new Date(),
        type: 'system_alert',
        agentId: testAgent.agentId,
        data: { message: 'MongoDB connection test' },
        status: 'sent',
      };

      const eventResult = await mongodb371.saveCommunicationEvent(testEvent);
      console.log(
        '📧 Save communication event:',
        eventResult ? '✅ Success' : '❌ Failed',
      );

      // Get database stats
      console.log('\n📊 Database Statistics:');
      const stats = await mongodb371.getDatabaseStats();
      if (stats) {
        console.log(`   Database: ${stats.db}`);
        console.log(`   Collections: ${stats.collections}`);
        console.log(
          `   Data Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`,
        );
        console.log(
          `   Index Size: ${(stats.indexSize / 1024 / 1024).toFixed(2)} MB`,
        );
      }

      await mongodb371.disconnect();
      console.log('✅ Local MongoDB test completed successfully!');
    } else {
      console.log('❌ Local MongoDB connection failed');
    }

    // Test Akash connection if URI is available
    if (process.env.MONGODB_AKASH_URI) {
      console.log('\n🌐 Testing Akash MongoDB Connection...');
      const akashConnected = await mongodb371.connect(true);

      if (akashConnected) {
        console.log('✅ Akash MongoDB connection successful!');

        const akashHealth = await mongodb371.healthCheck();
        console.log('📊 Akash Database Health:', akashHealth);

        await mongodb371.disconnect();
        console.log('✅ Akash MongoDB test completed successfully!');
      } else {
        console.log('❌ Akash MongoDB connection failed');
      }
    } else {
      console.log('\n⚠️  Akash MongoDB URI not configured (MONGODB_AKASH_URI)');
      console.log('   Deploy MongoDB to Akash: bun run mongodb:deploy-akash');
    }

    console.log('\n🎉 MongoDB Connection Tests Complete!');
    console.log('=====================================');

    // Connection summary
    console.log('\n📋 Connection Summary:');
    console.log(
      `   Local URI: ${process.env.MONGODB_LOCAL_URI || 'mongodb://localhost:27017/os371'}`,
    );
    console.log(
      `   Akash URI: ${process.env.MONGODB_AKASH_URI || 'Not configured'}`,
    );
    console.log(`   Database: ${process.env.MONGODB_DATABASE || 'os371'}`);

    console.log('\n📚 Next Steps:');
    console.log('   1. Start full system: bun run system:full-start');
    console.log('   2. Run test agent: bun run start:test-agent');
    console.log('   3. Monitor system: bun run health-check');
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⚠️  Shutting down connection test...');
  await mongodb371.disconnect();
  process.exit(0);
});

// Run the test
testMongoDBConnection();
