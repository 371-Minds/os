const http = require('http');
const url = require('url');

// Mock Cognition MCP Server
const port = 39300;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  console.log(`Received request: ${req.method} ${req.url}`);
  
  // Handle SSE endpoint for cognition layer
  if (parsedUrl.pathname === '/model_context_protocol/2024-11-05/sse') {
    // Set headers for Server-Sent Events
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    });
    
    console.log('✅ SSE connection established');
    
    // Send initial connection event
    res.write('event: connected\n');
    res.write('data: {"status": "connected", "server": "cognition-layer-mcp", "timestamp": "' + new Date().toISOString() + '"}\n\n');
    
    // Send periodic cognitive state updates
    const interval = setInterval(() => {
      const cognitiveState = {
        mode: ['Executive', 'Technical', 'Creative'][Math.floor(Math.random() * 3)],
        focus_level: Math.random() * 100,
        cognitive_load: Math.random() * 100,
        timestamp: new Date().toISOString(),
        agents_active: ['CEO-Mimi', 'CTO-Alex', 'CFO-Maya'][Math.floor(Math.random() * 3)]
      };
      
      res.write('event: cognitive_update\n');
      res.write(`data: ${JSON.stringify(cognitiveState)}\n\n`);
      
      console.log('📡 Sent cognitive update:', cognitiveState.mode, 'mode');
    }, 3000);
    
    // Clean up on client disconnect
    req.on('close', () => {
      console.log('❌ Client disconnected');
      clearInterval(interval);
    });
    
    req.on('end', () => {
      console.log('🔚 Request ended');
      clearInterval(interval);
    });
    
  } else if (parsedUrl.pathname === '/health') {
    // Health check endpoint
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'cognition-layer-mcp',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }));
    
  } else {
    // 404 for other endpoints
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(port, hostname, () => {
  console.log('🧠 Cognition Layer MCP Server running at http://' + hostname + ':' + port + '/');
  console.log('📡 SSE endpoint: http://' + hostname + ':' + port + '/model_context_protocol/2024-11-05/sse');
  console.log('🏥 Health check: http://' + hostname + ':' + port + '/health');
  console.log('');
  console.log('Ready to provide cognitive state awareness to 371 OS agents! 🚀');
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n🔄 Shutting down Cognition Layer MCP Server...');
  server.close(() => {
    console.log('✅ Server shut down successfully');
    process.exit(0);
  });
});