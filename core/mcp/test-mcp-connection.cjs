#!/usr/bin/env node

// MCP Connection Test Script
// Tests the Model Context Protocol connections for 371 OS

const https = require('https');
const http = require('http');

const servers = [
  {
    name: 'Cognition MCP',
    url: 'http://localhost:39300/model_context_protocol/2024-11-05/sse',
    health: 'http://localhost:39300/health'
  },
  {
    name: 'Documentation MCP',
    url: 'http://localhost:39301/model_context_protocol/2024-11-05/sse',
    health: 'http://localhost:39301/health'
  },
  {
    name: 'Memory MCP',
    url: 'http://localhost:39302/model_context_protocol/2024-11-05/sse',
    health: 'http://localhost:39302/health'
  }
];

async function testServer(server) {
  console.log(`\n🧪 Testing ${server.name}...`);
  
  // Test health endpoint
  try {
    const healthResponse = await new Promise((resolve, reject) => {
      const req = http.get(server.health, { timeout: 5000 }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, data }));
      });
      req.on('error', reject);
      req.on('timeout', () => reject(new Error('Health check timeout')));
    });
    
    if (healthResponse.status === 200) {
      console.log(`  ✅ Health check: OK`);
    } else {
      console.log(`  ⚠️  Health check: Status ${healthResponse.status}`);
    }
  } catch (error) {
    console.log(`  ❌ Health check: ${error.message}`);
  }
  
  // Test SSE endpoint
  try {
    const sseResponse = await new Promise((resolve, reject) => {
      const req = http.get(server.url, { 
        timeout: 5000,
        headers: {
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache'
        }
      }, (res) => {
        if (res.statusCode === 200) {
          let dataReceived = false;
          res.on('data', (chunk) => {
            if (!dataReceived) {
              dataReceived = true;
              resolve({ status: res.statusCode, hasData: true });
            }
          });
          
          setTimeout(() => {
            if (!dataReceived) {
              resolve({ status: res.statusCode, hasData: false });
            }
          }, 2000);
        } else {
          resolve({ status: res.statusCode, hasData: false });
        }
      });
      req.on('error', reject);
      req.on('timeout', () => reject(new Error('SSE connection timeout')));
    });
    
    if (sseResponse.status === 200 && sseResponse.hasData) {
      console.log(`  ✅ SSE endpoint: Connected and streaming`);
    } else if (sseResponse.status === 200) {
      console.log(`  ⚠️  SSE endpoint: Connected but no data received`);
    } else {
      console.log(`  ❌ SSE endpoint: Status ${sseResponse.status}`);
    }
  } catch (error) {
    console.log(`  ❌ SSE endpoint: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 371 OS MCP Connection Test');
  console.log('==============================');
  
  for (const server of servers) {
    await testServer(server);
  }
  
  console.log('\n📊 Test Summary:');
  console.log('================');
  console.log('✅ = Working correctly');
  console.log('⚠️  = Connected but with issues');
  console.log('❌ = Not working');
  
  console.log('\n💡 Next Steps:');
  console.log('- All servers should show ✅ for both health and SSE endpoints');
  console.log('- If you see ❌, check if the server is running and restart if needed');
  console.log('- Use: powershell -ExecutionPolicy Bypass -File f:/os-main/core/mcp/simple-restart-mcp.ps1');
  
  console.log('\n🎯 MCP Integration:');
  console.log('- Update your IDE MCP configuration to use the URLs above');
  console.log('- Cognition URL: http://localhost:39300/model_context_protocol/2024-11-05/sse');
  console.log('- Documentation URL: http://localhost:39301/model_context_protocol/2024-11-05/sse');
  console.log('- Memory URL: http://localhost:39302/model_context_protocol/2024-11-05/sse');
}

main().catch(console.error);