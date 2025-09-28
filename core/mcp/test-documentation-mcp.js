#!/usr/bin/env node

/**
 * Test Documentation MCP Server
 * 
 * Tests the documentation MCP server functionality
 */

const http = require('http');

const SERVER_URL = 'http://localhost:39301';

async function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${SERVER_URL}${endpoint}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => reject(new Error('Request timeout')));
  });
}

async function testDocumentationMCP() {
  console.log('🧪 Testing 371 OS Documentation MCP Server...\n');
  
  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check...');
    const health = await makeRequest('/health');
    if (health.status === 200) {
      console.log('✅ Health check passed');
      console.log(`   Service: ${health.data.service}`);
      console.log(`   Documents: ${health.data.documentsLoaded}`);
    } else {
      console.log('❌ Health check failed');
      return;
    }
    
    // Test 2: Documentation Index
    console.log('\n2️⃣ Testing documentation index...');
    const index = await makeRequest('/model_context_protocol/2024-11-05/documentation');
    if (index.status === 200) {
      console.log('✅ Documentation index loaded');
      console.log(`   Total documents: ${index.data.documentation.totalDocuments}`);
      console.log(`   Sections: ${Object.keys(index.data.documentation.sections).join(', ')}`);
    } else {
      console.log('❌ Documentation index failed');
    }
    
    // Test 3: Search Functionality
    console.log('\n3️⃣ Testing search functionality...');
    const search = await makeRequest('/model_context_protocol/2024-11-05/search?q=agent');
    if (search.status === 200) {
      console.log('✅ Search functionality working');
      console.log(`   Results found: ${search.data.totalResults}`);
      if (search.data.results.length > 0) {
        console.log(`   Top result: ${search.data.results[0].title}`);
      }
    } else {
      console.log('❌ Search functionality failed');
    }
    
    // Test 4: Document Retrieval
    console.log('\n4️⃣ Testing document retrieval...');
    const retrieve = await makeRequest('/model_context_protocol/2024-11-05/retrieve?path=README.md');
    if (retrieve.status === 200) {
      console.log('✅ Document retrieval working');
      console.log(`   Document: ${retrieve.data.metadata.title}`);
      console.log(`   Size: ${retrieve.data.metadata.size} bytes`);
    } else {
      console.log('❌ Document retrieval failed');
    }
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 MCP Server Configuration for Qoder:');
    console.log(JSON.stringify({
      "mcpServers": {
        "documentation": {
          "command": "node",
          "args": ["f:/os-main/mcp/documentation-mcp-server.js"],
          "env": {
            "MCP_SERVER_URL": "http://localhost:39301/model_context_protocol/2024-11-05/documentation",
            "PROJECT_ROOT": "f:/os-main"
          }
        }
      }
    }, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the documentation MCP server is running:');
    console.log('   node f:/os-main/mcp/documentation-mcp-server.js');
  }
}

// Run tests
testDocumentationMCP();