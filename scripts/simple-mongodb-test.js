/**
 * Simple MongoDB Connection Test for 371 OS
 * 
 * Tests MongoDB connectivity with proper authentication.
 */

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testMongoDBConnection() {
    console.log('🧪 371 OS - Simple MongoDB Connection Test');
    console.log('==========================================');
    
    try {
        // Try local connection with authentication
        const localUri = process.env.MONGODB_LOCAL_URI || 'mongodb://root:rootpassword371@localhost:27017/os371?authSource=admin';
        console.log(`\n📍 Testing Local MongoDB Connection: ${localUri}`);
        
        const client = new MongoClient(localUri);
        await client.connect();
        
        console.log('✅ Local MongoDB connection successful!');
        
        // Test basic operations
        const db = client.db('os371');
        
        // Test health check
        await db.admin().ping();
        console.log('📊 Database ping successful!');
        
        // Test basic write operation
        const testCollection = db.collection('test_connection');
        const testDoc = {
            timestamp: new Date(),
            test: 'connection_test',
            status: 'success'
        };
        
        const result = await testCollection.insertOne(testDoc);
        console.log(`💾 Test document inserted with ID: ${result.insertedId}`);
        
        // Test read operation
        const retrievedDoc = await testCollection.findOne({ _id: result.insertedId });
        console.log(`📖 Test document retrieved: ${retrievedDoc ? '✅ Success' : '❌ Failed'}`);
        
        // Clean up
        await testCollection.deleteOne({ _id: result.insertedId });
        console.log('🧹 Test document cleaned up');
        
        await client.close();
        console.log('✅ Local MongoDB test completed successfully!');
        
        console.log('\n🎉 MongoDB Connection Test Complete!');
        console.log('=====================================');
        console.log(`📍 Connection URI: ${localUri}`);
        console.log('📚 Database: os371');
        console.log('📊 Status: Connected and Operational');
        
    } catch (error) {
        console.error('❌ MongoDB connection test failed:', error);
        process.exit(1);
    }
}

// Run the test
testMongoDBConnection();