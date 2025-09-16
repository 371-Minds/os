const http = require('http');

// Configuration for the cognition layer MCP
const MCP_URL = 'http://localhost:39300/model_context_protocol/2024-11-05/sse';

console.log('Testing connection to Cognition Layer MCP Server...');
console.log('Target URL:', MCP_URL);

// Parse the URL to extract host and port
const url = new URL(MCP_URL);
const options = {
  hostname: url.hostname,
  port: url.port,
  path: url.pathname,
  method: 'GET',
  headers: {
    'Accept': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  }
};

// Create a request to test the connection
const req = http.request(options, (res) => {
  console.log('Response Status Code:', res.statusCode);
  console.log('Response Headers:', res.headers);
  
  // Check if the server is responding
  if (res.statusCode === 200) {
    console.log('✅ Successfully connected to Cognition Layer MCP Server');
    
    // Listen for data events
    res.on('data', (chunk) => {
      console.log('Received data chunk:', chunk.toString().substring(0, 100) + '...');
    });
    
    // Set a timeout to close the connection after 5 seconds
    setTimeout(() => {
      console.log('Closing connection after 5 seconds');
      res.destroy();
      process.exit(0);
    }, 5000);
  } else {
    console.log('❌ Failed to connect to Cognition Layer MCP Server');
    console.log('Status Code:', res.statusCode);
    process.exit(1);
  }
});

// Handle connection errors
req.on('error', (e) => {
  console.log('❌ Error connecting to Cognition Layer MCP Server:', e.message);
  console.log('Please ensure the cognition layer service is running on http://localhost:39300');
  process.exit(1);
});

// Set a timeout for the request
req.setTimeout(10000, () => {
  console.log('❌ Request timeout - server did not respond within 10 seconds');
  req.destroy();
  process.exit(1);
});

// End the request
req.end();