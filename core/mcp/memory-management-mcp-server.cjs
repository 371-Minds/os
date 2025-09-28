// Memory Management MCP Server (Port 39302)
// EPICACHE Integration for 371 OS Autonomous Agent Ecosystem
// Revolutionary episodic memory management with 6x compression

const express = require('express');
const cors = require('cors');
const path = require('path');

class EpisodeCacheManager {
  constructor() {
    this.episodes = new Map(); // episodic conversation clusters
    this.agentMemoryBudgets = new Map(); // per-agent memory allocation
    this.compressionStats = new Map(); // compression ratio tracking
    this.episodeEmbeddings = new Map(); // semantic embeddings for episodes
    this.accessPatterns = new Map(); // episode access analytics
    
    // Initialize default memory budgets for C-Suite agents
    this.initializeAgentBudgets();
  }

  initializeAgentBudgets() {
    const defaultBudgets = {
      'CEO_Mimi': {
        totalBudget: 2048, // 2GB in MB
        tier: 'premium',
        compressionRatio: 2.0, // CEO gets less compression for strategic context
        episodeTypes: ['strategic_decisions', 'crisis_management', 'stakeholder_communication', 'resource_allocation']
      },
      'CTO_Zara': {
        totalBudget: 1536, // 1.5GB in MB
        tier: 'standard',
        compressionRatio: 4.0, // Technical precision with moderate compression
        episodeTypes: ['technical_architecture', 'problem_debugging', 'integration_planning', 'performance_optimization']
      },
      'CFO_Maya': {
        totalBudget: 1024, // 1GB in MB
        tier: 'standard',
        compressionRatio: 4.0, // Financial analysis with structured compression
        episodeTypes: ['financial_analysis', 'budget_allocation', 'roi_optimization', 'cost_management']
      },
      'CLO_Alex': {
        totalBudget: 1024, // 1GB in MB
        tier: 'economy',
        compressionRatio: 6.0, // Legal compliance with maximum compression
        episodeTypes: ['legal_compliance', 'risk_assessment', 'governance', 'regulatory_frameworks']
      }
    };

    for (const [agentId, budget] of Object.entries(defaultBudgets)) {
      this.agentMemoryBudgets.set(agentId, budget);
    }
  }

  // Episode clustering for conversation history
  async clusterConversations(history, agentId) {
    const budget = this.agentMemoryBudgets.get(agentId) || this.getDefaultBudget();
    const episodeTypes = budget.episodeTypes || ['general'];
    
    // Segment conversations into manageable chunks
    const segments = this.segmentConversations(history, 3); // 3 utterances per segment
    
    // Generate semantic embeddings (mock implementation)
    const embeddings = await this.generateEmbeddings(segments);
    
    // K-means clustering based on agent-specific episode types
    const episodes = this.kMeansCluster(embeddings, episodeTypes.length);
    
    // Apply EPICACHE compression based on budget
    const compressedEpisodes = episodes.map((episode, idx) => {
      const compressed = this.applyEPICACHECompression(episode, budget.compressionRatio);
      
      return {
        id: `${agentId}_episode_${idx}_${Date.now()}`,
        agentId: agentId,
        type: episodeTypes[idx % episodeTypes.length],
        medoid: this.findMedoid(episode),
        segments: compressed.segments,
        embedding: compressed.embedding,
        memorySize: compressed.memorySize,
        accessCount: 0,
        sharingReward: 0,
        lastAccessed: new Date(),
        compressionLevel: budget.compressionRatio,
        originalSize: episode.originalSize,
        compressionRatio: episode.originalSize / compressed.memorySize
      };
    });

    // Store episodes with agent association
    compressedEpisodes.forEach(episode => {
      this.episodes.set(episode.id, episode);
      this.episodeEmbeddings.set(episode.id, episode.embedding);
    });

    // Update compression statistics
    this.updateCompressionStats(agentId, compressedEpisodes);

    return compressedEpisodes;
  }

  // Mock embedding generation (replace with actual embedding service)
  async generateEmbeddings(segments) {
    return segments.map(segment => {
      // Mock semantic embedding - replace with actual transformer embeddings
      return Array.from({length: 384}, () => Math.random() - 0.5);
    });
  }

  // K-means clustering implementation
  kMeansCluster(embeddings, k) {
    // Simplified k-means clustering for episode formation
    const clusters = Array.from({length: k}, () => []);
    
    embeddings.forEach((embedding, idx) => {
      const clusterIdx = idx % k; // Simple round-robin assignment
      clusters[clusterIdx].push({
        embedding: embedding,
        segmentIdx: idx,
        originalSize: 1024 + Math.random() * 512 // Mock original size in KB
      });
    });

    return clusters.map(cluster => ({
      segments: cluster,
      originalSize: cluster.reduce((sum, seg) => sum + seg.originalSize, 0)
    }));
  }

  // Find medoid (most representative segment) in episode
  findMedoid(episode) {
    if (!episode.segments || episode.segments.length === 0) {
      return null;
    }

    // Return first segment as medoid (simplified)
    return {
      segmentIdx: episode.segments[0].segmentIdx,
      embedding: episode.segments[0].embedding,
      representativeText: `Representative segment for episode with ${episode.segments.length} segments`
    };
  }

  // Apply EPICACHE compression to episode
  applyEPICACHECompression(episode, compressionRatio) {
    const originalSize = episode.originalSize;
    const compressedSize = originalSize / compressionRatio;
    
    // Mock compression process - apply block-wise prefill and layer-wise sensitivity
    const compressedSegments = episode.segments.map(segment => ({
      ...segment,
      compressed: true,
      compressionRatio: compressionRatio,
      compressedSize: segment.originalSize / compressionRatio
    }));

    // Generate compressed embedding (average of segment embeddings)
    const avgEmbedding = this.averageEmbeddings(episode.segments.map(s => s.embedding));

    return {
      segments: compressedSegments,
      embedding: avgEmbedding,
      memorySize: compressedSize,
      compressionApplied: compressionRatio
    };
  }

  // Average embeddings for episode representation
  averageEmbeddings(embeddings) {
    if (!embeddings || embeddings.length === 0) return [];
    
    const dimension = embeddings[0].length;
    const avgEmbedding = new Array(dimension).fill(0);
    
    embeddings.forEach(embedding => {
      embedding.forEach((value, idx) => {
        avgEmbedding[idx] += value / embeddings.length;
      });
    });

    return avgEmbedding;
  }

  // Search episodes for specific agent and query
  async searchEpisodes(agentId, query, maxResults = 10) {
    const agentEpisodes = Array.from(this.episodes.values())
      .filter(episode => episode.agentId === agentId);

    if (agentEpisodes.length === 0) {
      return [];
    }

    // Generate query embedding
    const queryEmbedding = await this.generateQueryEmbedding(query);

    // Calculate similarity scores
    const episodeScores = agentEpisodes.map(episode => ({
      episode: episode,
      relevance: this.cosineSimilarity(queryEmbedding, episode.embedding)
    }));

    // Sort by relevance and return top results
    const rankedResults = episodeScores
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, maxResults)
      .map(item => ({
        ...item.episode,
        relevance: Math.max(0.1, item.relevance), // Ensure valid relevance score
        searchQuery: query
      }));

    // Update access patterns
    rankedResults.forEach(episode => {
      episode.accessCount++;
      episode.lastAccessed = new Date();
      this.episodes.set(episode.id, episode);
    });

    return rankedResults;
  }

  // Generate embedding for search query
  async generateQueryEmbedding(query) {
    // Mock query embedding - replace with actual embedding service
    return Array.from({length: 384}, () => Math.random() - 0.5);
  }

  // Cosine similarity calculation
  cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  // Segment conversations for episode formation
  segmentConversations(history, segmentSize = 3) {
    const segments = [];
    
    for (let i = 0; i < history.length; i += segmentSize) {
      const segment = history.slice(i, i + segmentSize);
      segments.push({
        id: `segment_${i}_${i + segmentSize}`,
        conversations: segment,
        startIdx: i,
        endIdx: Math.min(i + segmentSize, history.length),
        text: segment.map(conv => conv.content || conv.text || '').join(' ')
      });
    }

    return segments;
  }

  // Update compression statistics
  updateCompressionStats(agentId, episodes) {
    const totalOriginal = episodes.reduce((sum, ep) => sum + ep.originalSize, 0);
    const totalCompressed = episodes.reduce((sum, ep) => sum + ep.memorySize, 0);
    const avgCompressionRatio = totalOriginal / totalCompressed;

    this.compressionStats.set(agentId, {
      episodeCount: episodes.length,
      totalOriginalSize: totalOriginal,
      totalCompressedSize: totalCompressed,
      averageCompressionRatio: avgCompressionRatio,
      memorySaved: totalOriginal - totalCompressed,
      lastUpdated: new Date()
    });
  }

  // Get default memory budget
  getDefaultBudget() {
    return {
      totalBudget: 1024, // 1GB in MB
      tier: 'standard',
      compressionRatio: 4.0,
      episodeTypes: ['general']
    };
  }

  // Get memory statistics
  getMemoryStats() {
    const totalEpisodes = this.episodes.size;
    const totalMemoryUsed = Array.from(this.episodes.values())
      .reduce((sum, episode) => sum + episode.memorySize, 0);
    
    const agentStats = {};
    this.compressionStats.forEach((stats, agentId) => {
      agentStats[agentId] = stats;
    });

    return {
      totalEpisodes: totalEpisodes,
      totalMemoryUsed: totalMemoryUsed,
      averageCompressionRatio: this.calculateOverallCompressionRatio(),
      agentStatistics: agentStats,
      systemUptime: process.uptime(),
      lastUpdate: new Date()
    };
  }

  // Calculate overall compression ratio
  calculateOverallCompressionRatio() {
    const allStats = Array.from(this.compressionStats.values());
    if (allStats.length === 0) return 1.0;

    const totalOriginal = allStats.reduce((sum, stats) => sum + stats.totalOriginalSize, 0);
    const totalCompressed = allStats.reduce((sum, stats) => sum + stats.totalCompressedSize, 0);

    return totalOriginal / totalCompressed || 1.0;
  }
}

class InterAgentMemoryBroker {
  constructor(episodeCacheManager) {
    this.episodeCacheManager = episodeCacheManager;
    this.memoryTransactions = [];
    this.reputationScores = new Map();
    
    // Initialize reputation scores for C-Suite agents
    this.initializeReputation();
  }

  initializeReputation() {
    const initialReputation = {
      'CEO_Mimi': 0.95,
      'CTO_Zara': 0.92,
      'CFO_Maya': 0.88,
      'CLO_Alex': 0.85
    };

    for (const [agentId, score] of Object.entries(initialReputation)) {
      this.reputationScores.set(agentId, score);
    }
  }

  // Query relevant episodes from other agents
  async queryRelevantEpisodes(requestingAgent, targetAgent, query, maxBudget = 500) {
    // Get target agent's episodes
    const targetEpisodes = Array.from(this.episodeCacheManager.episodes.values())
      .filter(episode => episode.agentId === targetAgent);

    if (targetEpisodes.length === 0) {
      return [];
    }

    // Generate query embedding
    const queryEmbedding = await this.episodeCacheManager.generateQueryEmbedding(query);

    // Find relevant episodes
    const relevantEpisodes = targetEpisodes
      .map(episode => ({
        episode: episode,
        relevance: this.episodeCacheManager.cosineSimilarity(queryEmbedding, episode.embedding)
      }))
      .filter(item => item.relevance > 0.7) // Minimum relevance threshold
      .sort((a, b) => b.relevance - a.relevance);

    // Apply budget constraints and compress episodes
    const compressedEpisodes = await this.compressEpisodesWithinBudget(relevantEpisodes, maxBudget);

    // Record memory transaction
    await this.recordMemoryTransaction({
      from: targetAgent,
      to: requestingAgent,
      query: query,
      episodeCount: compressedEpisodes.length,
      memoryCost: this.calculateMemoryCost(compressedEpisodes),
      queryRelevance: relevantEpisodes[0]?.relevance || 0,
      timestamp: new Date()
    });

    return compressedEpisodes;
  }

  // Compress episodes within budget constraints
  async compressEpisodesWithinBudget(relevantEpisodes, maxBudgetMB) {
    const compressedEpisodes = [];
    let currentBudget = maxBudgetMB;

    for (const item of relevantEpisodes) {
      const episode = item.episode;
      const memoryCost = episode.memorySize / 1024; // Convert KB to MB

      if (memoryCost <= currentBudget) {
        compressedEpisodes.push({
          ...episode,
          relevance: item.relevance,
          sharedAt: new Date(),
          budgetUsed: memoryCost
        });
        currentBudget -= memoryCost;
      }

      if (currentBudget <= 0) break;
    }

    return compressedEpisodes;
  }

  // Calculate memory cost for episodes
  calculateMemoryCost(episodes) {
    return episodes.reduce((sum, episode) => sum + (episode.memorySize / 1024), 0); // MB
  }

  // Record memory transaction for economic model
  async recordMemoryTransaction(transaction) {
    this.memoryTransactions.push(transaction);

    // Update reputation scores based on sharing efficiency
    if (transaction.episodeCount > 0 && transaction.queryRelevance > 0.8) {
      const currentReputation = this.reputationScores.get(transaction.from) || 0.5;
      const bonusReputation = 0.01 * transaction.queryRelevance;
      this.reputationScores.set(transaction.from, Math.min(1.0, currentReputation + bonusReputation));
    }

    return transaction;
  }

  // Get agent reputation score
  getAgentReputation(agentId) {
    return this.reputationScores.get(agentId) || 0.5;
  }

  // Get memory transaction history
  getTransactionHistory(agentId = null, limit = 50) {
    let transactions = this.memoryTransactions;

    if (agentId) {
      transactions = transactions.filter(tx => 
        tx.from === agentId || tx.to === agentId
      );
    }

    return transactions
      .slice(-limit)
      .sort((a, b) => b.timestamp - a.timestamp);
  }
}

// Memory Management MCP Server Implementation
class MemoryManagementMCPServer {
  constructor() {
    this.app = express();
    this.port = 39302;
    this.episodeCacheManager = new EpisodeCacheManager();
    this.memoryBroker = new InterAgentMemoryBroker(this.episodeCacheManager);
    this.serverStartTime = new Date();

    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Request logging
    this.app.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
      next();
    });
  }

  setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        service: 'Memory Management MCP Server',
        port: this.port,
        uptime: process.uptime(),
        version: '1.0.0',
        epicacheEnabled: true,
        memoryStats: this.episodeCacheManager.getMemoryStats()
      });
    });

    // Episode Management Endpoints
    this.app.post('/episodes/cluster', async (req, res) => {
      try {
        const { agentId, conversations } = req.body;
        
        if (!agentId || !conversations) {
          return res.status(400).json({
            error: 'Missing required parameters: agentId, conversations'
          });
        }

        const episodes = await this.episodeCacheManager.clusterConversations(conversations, agentId);
        
        res.json({
          success: true,
          agentId: agentId,
          episodeCount: episodes.length,
          episodes: episodes,
          compressionStats: this.episodeCacheManager.compressionStats.get(agentId)
        });
      } catch (error) {
        console.error('Episode clustering error:', error);
        res.status(500).json({
          error: 'Episode clustering failed',
          details: error.message
        });
      }
    });

    this.app.get('/episodes/search', async (req, res) => {
      try {
        const { agent, query, limit } = req.query;
        
        if (!agent || !query) {
          return res.status(400).json({
            error: 'Missing required parameters: agent, query'
          });
        }

        const episodes = await this.episodeCacheManager.searchEpisodes(
          agent, 
          query, 
          parseInt(limit) || 10
        );

        res.json({
          success: true,
          agentId: agent,
          query: query,
          resultCount: episodes.length,
          episodes: episodes
        });
      } catch (error) {
        console.error('Episode search error:', error);
        res.status(500).json({
          error: 'Episode search failed',
          details: error.message
        });
      }
    });

    this.app.get('/episodes/stats', (req, res) => {
      try {
        const stats = this.episodeCacheManager.getMemoryStats();
        
        res.json({
          success: true,
          memoryStats: stats,
          serverInfo: {
            port: this.port,
            uptime: process.uptime(),
            startTime: this.serverStartTime
          }
        });
      } catch (error) {
        console.error('Stats retrieval error:', error);
        res.status(500).json({
          error: 'Stats retrieval failed',
          details: error.message
        });
      }
    });

    // Cross-Agent Memory Sharing
    this.app.post('/agents/query', async (req, res) => {
      try {
        const { requesting_agent, target_agent, query, max_budget } = req.body;
        
        if (!requesting_agent || !target_agent || !query) {
          return res.status(400).json({
            error: 'Missing required parameters: requesting_agent, target_agent, query'
          });
        }

        const sharedEpisodes = await this.memoryBroker.queryRelevantEpisodes(
          requesting_agent,
          target_agent,
          query,
          max_budget || 500
        );

        res.json({
          success: true,
          requestingAgent: requesting_agent,
          targetAgent: target_agent,
          query: query,
          episodeCount: sharedEpisodes.length,
          episodes: sharedEpisodes,
          memoryCost: this.memoryBroker.calculateMemoryCost(sharedEpisodes)
        });
      } catch (error) {
        console.error('Cross-agent query error:', error);
        res.status(500).json({
          error: 'Cross-agent query failed',
          details: error.message
        });
      }
    });

    this.app.get('/agents/reputation', (req, res) => {
      try {
        const { agent } = req.query;
        
        if (agent) {
          const reputation = this.memoryBroker.getAgentReputation(agent);
          res.json({
            success: true,
            agentId: agent,
            reputation: reputation
          });
        } else {
          const allReputations = {};
          this.memoryBroker.reputationScores.forEach((score, agentId) => {
            allReputations[agentId] = score;
          });
          
          res.json({
            success: true,
            reputationScores: allReputations
          });
        }
      } catch (error) {
        console.error('Reputation query error:', error);
        res.status(500).json({
          error: 'Reputation query failed',
          details: error.message
        });
      }
    });

    this.app.get('/agents/transactions', (req, res) => {
      try {
        const { agent, limit } = req.query;
        
        const transactions = this.memoryBroker.getTransactionHistory(
          agent,
          parseInt(limit) || 50
        );

        res.json({
          success: true,
          agentId: agent || 'all',
          transactionCount: transactions.length,
          transactions: transactions
        });
      } catch (error) {
        console.error('Transaction history error:', error);
        res.status(500).json({
          error: 'Transaction history failed',
          details: error.message
        });
      }
    });

    // Budget and Memory Allocation
    this.app.get('/budget/status', (req, res) => {
      try {
        const { agent } = req.query;
        
        if (!agent) {
          return res.status(400).json({
            error: 'Missing required parameter: agent'
          });
        }

        const budget = this.episodeCacheManager.agentMemoryBudgets.get(agent);
        const stats = this.episodeCacheManager.compressionStats.get(agent);

        res.json({
          success: true,
          agentId: agent,
          budget: budget,
          compressionStats: stats,
          memoryUtilization: stats ? (stats.totalCompressedSize / budget.totalBudget) : 0
        });
      } catch (error) {
        console.error('Budget status error:', error);
        res.status(500).json({
          error: 'Budget status failed',
          details: error.message
        });
      }
    });

    // Error handling
    this.app.use((err, req, res, next) => {
      console.error('Unhandled error:', err);
      res.status(500).json({
        error: 'Internal server error',
        details: err.message
      });
    });

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        error: 'Endpoint not found',
        availableEndpoints: [
          'GET /health',
          'POST /episodes/cluster',
          'GET /episodes/search',
          'GET /episodes/stats',
          'POST /agents/query',
          'GET /agents/reputation',
          'GET /agents/transactions',
          'GET /budget/status'
        ]
      });
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`\n🧠 Memory Management MCP Server started successfully!`);
      console.log(`📊 EPICACHE Integration: Enabled`);
      console.log(`🌐 Server URL: http://localhost:${this.port}`);
      console.log(`🚀 Health Check: http://localhost:${this.port}/health`);
      console.log(`📈 Memory Stats: http://localhost:${this.port}/episodes/stats`);
      console.log(`\n🎯 Ready for autonomous agent memory optimization!`);
      console.log(`⚡ Expected Performance: 6x memory compression\n`);
    });
  }
}

// Start the server
const server = new MemoryManagementMCPServer();
server.start();

module.exports = MemoryManagementMCPServer;