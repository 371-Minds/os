const http = require('http');
const url = require('url');

// Enhanced Cognition MCP Server with EPICACHE Episodic Memory State Tracking
const port = 39300;
const hostname = 'localhost';

class EpisodicCognitionServer {
  constructor() {
    this.cognitiveState = {
      mode: 'Executive',
      focus_level: 85,
      cognitive_load: 45,
      active_agents: ['CEO_Mimi', 'CTO_Zara'],
      // NEW: Episode-aware memory state
      episodeCache: {
        current_episode: 'strategic_planning_q4',
        memory_usage: '2.3GB',
        compression_ratio: '5.2x',
        cache_hits: 0.87,
        inter_agent_queries: 23,
        active_episodes: [
          {
            id: 'strategic_planning_q4',
            agent: 'CEO_Mimi',
            type: 'strategic_decisions',
            memory_size: '456MB',
            last_accessed: new Date().toISOString()
          },
          {
            id: 'technical_architecture_review',
            agent: 'CTO_Zara', 
            type: 'technical_architecture',
            memory_size: '324MB',
            last_accessed: new Date().toISOString()
          }
        ]
      },
      // Memory allocation market state
      memoryMarket: {
        current_auction: {
          active: true,
          participants: ['CEO_Mimi', 'CTO_Zara', 'CFO_Maya'],
          premium_tier_price: 1.2,
          standard_tier_price: 0.6,
          economy_tier_price: 0.18
        },
        allocation_events: []
      }
    };
    
    this.sseClients = new Set();
    this.memoryEventHistory = [];
    this.episodeAccessLog = [];
    
    // Start periodic memory market simulation
    this.startMemoryMarketSimulation();
  }

  // Simulate memory allocation events
  startMemoryMarketSimulation() {
    setInterval(() => {
      this.simulateMemoryAllocationEvent();
    }, 5000); // Every 5 seconds
    
    setInterval(() => {
      this.simulateEpisodeAccessEvent();
    }, 3000); // Every 3 seconds
  }

  simulateMemoryAllocationEvent() {
    const agents = ['CEO_Mimi', 'CTO_Zara', 'CFO_Maya', 'CLO_Alex'];
    const tiers = ['premium', 'standard', 'economy'];
    const actions = ['bid_for_memory', 'release_memory', 'share_episode', 'compress_episode'];
    
    const memoryEvent = {
      timestamp: Date.now(),
      event_type: 'memory_allocation',
      agent: agents[Math.floor(Math.random() * agents.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      tier: tiers[Math.floor(Math.random() * tiers.length)],
      budget_requested: `${(Math.random() * 2 + 0.5).toFixed(1)}GB`,
      episode: `episode_${Math.floor(Math.random() * 1000)}`,
      priority_score: Math.random(),
      reputation_impact: (Math.random() - 0.5) * 0.1
    };
    
    this.memoryEventHistory.push(memoryEvent);
    if (this.memoryEventHistory.length > 100) {
      this.memoryEventHistory.shift(); // Keep only last 100 events
    }
    
    // Update memory market state
    this.updateMemoryMarketState(memoryEvent);
    
    // Stream to connected clients
    this.streamMemoryEvents(memoryEvent);
  }

  simulateEpisodeAccessEvent() {
    const agents = ['CEO_Mimi', 'CTO_Zara', 'CFO_Maya', 'CLO_Alex'];
    const episodeTypes = ['strategic_decisions', 'technical_architecture', 'financial_analysis', 'legal_compliance'];
    
    const accessEvent = {
      timestamp: Date.now(),
      event_type: 'episode_access',
      agent: agents[Math.floor(Math.random() * agents.length)],
      episode_type: episodeTypes[Math.floor(Math.random() * episodeTypes.length)],
      query: this.generateRandomQuery(),
      relevance_score: Math.random(),
      compression_ratio: 2 + Math.random() * 4, // 2x to 6x compression
      memory_saved: `${(Math.random() * 500 + 100).toFixed(0)}MB`,
      cache_hit: Math.random() > 0.3 // 70% cache hit rate
    };
    
    this.episodeAccessLog.push(accessEvent);
    if (this.episodeAccessLog.length > 50) {
      this.episodeAccessLog.shift();
    }
    
    // Update episode cache statistics
    this.updateEpisodeCacheStats(accessEvent);
    
    // Stream to connected clients
    this.streamEpisodeEvents(accessEvent);
  }

  generateRandomQuery() {
    const queries = [
      'strategic planning for Q4',
      'technical architecture review',
      'budget allocation optimization',
      'legal compliance requirements',
      'performance optimization strategy',
      'crisis management protocol',
      'market expansion analysis',
      'risk assessment framework'
    ];
    return queries[Math.floor(Math.random() * queries.length)];
  }

  updateMemoryMarketState(event) {
    // Update market pricing based on demand
    const demand = this.memoryEventHistory.filter(e => 
      e.action === 'bid_for_memory' && Date.now() - e.timestamp < 30000
    ).length;
    
    const demandMultiplier = 1 + (demand * 0.1);
    
    this.cognitiveState.memoryMarket.premium_tier_price = 1.0 * demandMultiplier;
    this.cognitiveState.memoryMarket.standard_tier_price = 0.5 * demandMultiplier;
    this.cognitiveState.memoryMarket.economy_tier_price = 0.15 * demandMultiplier;
    
    // Add to allocation events
    this.cognitiveState.memoryMarket.allocation_events.push({
      timestamp: Date.now(),
      agent: event.agent,
      action: event.action,
      tier: event.tier,
      budget: event.budget_requested
    });
    
    // Keep only last 10 allocation events
    if (this.cognitiveState.memoryMarket.allocation_events.length > 10) {
      this.cognitiveState.memoryMarket.allocation_events.shift();
    }
  }

  updateEpisodeCacheStats(event) {
    // Update cache hit rate
    const recentAccesses = this.episodeAccessLog.filter(e => 
      Date.now() - e.timestamp < 60000
    );
    
    const cacheHits = recentAccesses.filter(e => e.cache_hit).length;
    this.cognitiveState.episodeCache.cache_hits = recentAccesses.length > 0 ? 
      cacheHits / recentAccesses.length : 0.87;
    
    // Update compression ratio
    const avgCompression = recentAccesses.reduce((sum, e) => 
      sum + e.compression_ratio, 0) / Math.max(recentAccesses.length, 1);
    this.cognitiveState.episodeCache.compression_ratio = `${avgCompression.toFixed(1)}x`;
    
    // Update inter-agent queries count
    this.cognitiveState.episodeCache.inter_agent_queries = recentAccesses.length;
    
    // Update memory usage
    const totalMemory = recentAccesses.reduce((sum, e) => {
      const memoryMB = parseFloat(e.memory_saved.replace('MB', ''));
      return sum + memoryMB;
    }, 0);
    this.cognitiveState.episodeCache.memory_usage = `${(totalMemory / 1024).toFixed(1)}GB`;
  }

  // Stream memory allocation events to connected clients
  streamMemoryEvents(memoryEvent) {
    this.sseClients.forEach(client => {
      try {
        client.write(`event: memory_allocation\n`);
        client.write(`data: ${JSON.stringify(memoryEvent)}\n\n`);
      } catch (error) {
        console.error('Error streaming memory event:', error);
        this.sseClients.delete(client);
      }
    });
  }

  // Stream episode access events to connected clients  
  streamEpisodeEvents(episodeEvent) {
    this.sseClients.forEach(client => {
      try {
        client.write(`event: episode_access\n`);
        client.write(`data: ${JSON.stringify(episodeEvent)}\n\n`);
      } catch (error) {
        console.error('Error streaming episode event:', error);
        this.sseClients.delete(client);
      }
    });
  }

  // Get current cognitive state with memory information
  getCognitiveState() {
    return {
      ...this.cognitiveState,
      timestamp: new Date().toISOString(),
      memory_optimization: {
        epicache_enabled: true,
        total_episodes: this.cognitiveState.episodeCache.active_episodes.length,
        memory_saved_percentage: 85,
        average_compression: this.cognitiveState.episodeCache.compression_ratio
      }
    };
  }

  // Add SSE client
  addSSEClient(client) {
    this.sseClients.add(client);
    
    // Send initial cognitive state
    client.write(`event: cognitive_state\n`);
    client.write(`data: ${JSON.stringify(this.getCognitiveState())}\n\n`);
  }

  // Remove SSE client
  removeSSEClient(client) {
    this.sseClients.delete(client);
  }

  // Update cognitive mode and related memory state
  updateCognitiveMode() {
    const modes = ['Executive', 'Technical', 'Creative'];
    this.cognitiveState.mode = modes[Math.floor(Math.random() * modes.length)];
    this.cognitiveState.focus_level = Math.random() * 100;
    this.cognitiveState.cognitive_load = Math.random() * 100;
    
    // Update active agents based on mode
    if (this.cognitiveState.mode === 'Executive') {
      this.cognitiveState.active_agents = ['CEO_Mimi', 'CFO_Maya'];
      this.cognitiveState.episodeCache.current_episode = 'strategic_planning_q4';
    } else if (this.cognitiveState.mode === 'Technical') {
      this.cognitiveState.active_agents = ['CTO_Zara'];
      this.cognitiveState.episodeCache.current_episode = 'technical_architecture_review';
    } else {
      this.cognitiveState.active_agents = ['CMO_Anova'];
      this.cognitiveState.episodeCache.current_episode = 'creative_campaign_development';
    }
    
    // Stream updated state
    this.sseClients.forEach(client => {
      try {
        client.write(`event: cognitive_update\n`);
        client.write(`data: ${JSON.stringify(this.getCognitiveState())}\n\n`);
      } catch (error) {
        console.error('Error streaming cognitive update:', error);
        this.sseClients.delete(client);
      }
    });
  }
}

// Initialize the episodic cognition server
const episodicCognitionServer = new EpisodicCognitionServer();

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  console.log(`Received request: ${req.method} ${req.url}`);
  
  // Handle SSE endpoint for cognition layer with episodic memory
  if (parsedUrl.pathname === '/model_context_protocol/2024-11-05/sse') {
    // Set headers for Server-Sent Events
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    });
    
    console.log('✅ SSE connection established with EPICACHE support');
    
    // Add client to episodic cognition server
    episodicCognitionServer.addSSEClient(res);
    
    // Send initial connection event
    res.write('event: connected\n');
    res.write('data: {"status": "connected", "server": "episodic-cognition-mcp", "epicache": true, "timestamp": "' + new Date().toISOString() + '"}\n\n');
    
    // Send periodic cognitive state updates with memory information
    const interval = setInterval(() => {
      episodicCognitionServer.updateCognitiveMode();
    }, 4000);
    
    // Clean up on client disconnect
    req.on('close', () => {
      console.log('❌ Client disconnected');
      episodicCognitionServer.removeSSEClient(res);
      clearInterval(interval);
    });
    
    req.on('end', () => {
      console.log('🔚 Request ended');
      episodicCognitionServer.removeSSEClient(res);
      clearInterval(interval);
    });
    
  } else if (parsedUrl.pathname === '/health') {
    // Health check endpoint with EPICACHE status
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'episodic-cognition-mcp',
      version: '1.1.0',
      timestamp: new Date().toISOString(),
      epicache_enabled: true,
      memory_optimization: true,
      cognitive_state: episodicCognitionServer.getCognitiveState()
    }));
    
  } else if (parsedUrl.pathname === '/memory/stats') {
    // Memory statistics endpoint
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      memory_events: episodicCognitionServer.memoryEventHistory.slice(-20),
      episode_access: episodicCognitionServer.episodeAccessLog.slice(-20),
      current_state: episodicCognitionServer.getCognitiveState(),
      statistics: {
        total_memory_events: episodicCognitionServer.memoryEventHistory.length,
        total_episode_accesses: episodicCognitionServer.episodeAccessLog.length,
        cache_hit_rate: episodicCognitionServer.cognitiveState.episodeCache.cache_hits,
        compression_ratio: episodicCognitionServer.cognitiveState.episodeCache.compression_ratio
      }
    }));
    
  } else if (parsedUrl.pathname === '/memory/market') {
    // Memory market status endpoint
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      market_state: episodicCognitionServer.cognitiveState.memoryMarket,
      pricing: {
        premium: episodicCognitionServer.cognitiveState.memoryMarket.premium_tier_price,
        standard: episodicCognitionServer.cognitiveState.memoryMarket.standard_tier_price,
        economy: episodicCognitionServer.cognitiveState.memoryMarket.economy_tier_price
      },
      recent_allocations: episodicCognitionServer.cognitiveState.memoryMarket.allocation_events
    }));
    
  } else {
    // 404 for other endpoints
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      error: 'Endpoint not found',
      available_endpoints: [
        'GET /health',
        'GET /model_context_protocol/2024-11-05/sse',
        'GET /memory/stats',
        'GET /memory/market'
      ]
    }));
  }
});

server.listen(port, hostname, () => {
  console.log('🧠 Enhanced Episodic Cognition MCP Server running at http://' + hostname + ':' + port + '/');
  console.log('📡 SSE endpoint: http://' + hostname + ':' + port + '/model_context_protocol/2024-11-05/sse');
  console.log('🏥 Health check: http://' + hostname + ':' + port + '/health');
  console.log('📊 Memory stats: http://' + hostname + ':' + port + '/memory/stats');
  console.log('💰 Memory market: http://' + hostname + ':' + port + '/memory/market');
  console.log('');
  console.log('🎯 Ready to provide EPICACHE episodic memory awareness to 371 OS agents! 🚀');
  console.log('⚡ Features: Cognitive state tracking, memory optimization, episode management');
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n🔄 Shutting down Cognition Layer MCP Server...');
  server.close(() => {
    console.log('✅ Server shut down successfully');
    process.exit(0);
  });
});    
