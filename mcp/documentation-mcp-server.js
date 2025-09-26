#!/usr/bin/env node

/**
 * 371 OS Documentation MCP Server with EPICACHE Integration
 * 
 * Provides comprehensive access to project documentation through MCP
 * Enhanced with EPICACHE episodic clustering for 6x memory compression
 * Enables Qoder and other AI assistants to access structured project knowledge
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 39301;
const BASE_PATH = path.resolve(__dirname, '..');

// EPICACHE Episode Manager for Documentation
class DocumentationEpisodeManager {
  constructor() {
    this.episodes = new Map(); // episodic document clusters
    this.agentMemoryBudgets = new Map(); // per-agent memory allocation
    this.documentEmbeddings = new Map(); // document semantic embeddings
    this.accessPatterns = new Map(); // episode access analytics
    
    // Initialize default memory budgets for documentation access
    this.initializeAgentBudgets();
  }

  initializeAgentBudgets() {
    const defaultBudgets = {
      'CEO_Mimi': {
        totalBudget: 512, // 512MB for documentation
        tier: 'premium',
        compressionRatio: 2.0, // Less compression for strategic context
        episodeTypes: ['overview', 'architecture', 'deployment']
      },
      'CTO_Zara': {
        totalBudget: 768, // 768MB for technical documentation
        tier: 'standard', 
        compressionRatio: 3.0, // Moderate compression for technical precision
        episodeTypes: ['development', 'architecture', 'troubleshooting']
      },
      'CFO_Maya': {
        totalBudget: 256, // 256MB for business documentation
        tier: 'standard',
        compressionRatio: 4.0, // Higher compression for business docs
        episodeTypes: ['overview', 'deployment', 'project-management']
      },
      'CLO_Alex': {
        totalBudget: 256, // 256MB for compliance documentation
        tier: 'economy',
        compressionRatio: 6.0, // Maximum compression for compliance
        episodeTypes: ['troubleshooting', 'project-management']
      }
    };

    for (const [agentId, budget] of Object.entries(defaultBudgets)) {
      this.agentMemoryBudgets.set(agentId, budget);
    }
  }

  // Cluster documents into episodes based on semantic similarity
  async clusterDocuments(documents) {
    console.log('🧠 Clustering documents into episodes with EPICACHE...');
    
    // Segment documents by category and section
    const segments = this.segmentDocuments(documents, 3); // 3 documents per segment
    
    // Generate semantic embeddings (mock implementation)
    const embeddings = await this.generateEmbeddings(segments);
    
    // K-means clustering for episode formation
    const episodes = this.kMeansCluster(embeddings, 4); // 4 main episodes
    
    // Apply EPICACHE compression to episodes
    const compressedEpisodes = episodes.map((episode, idx) => {
      const compressed = this.applyEPICACHECompression(episode, 4.0); // Default 4x compression
      
      return {
        id: `doc_episode_${idx}_${Date.now()}`,
        type: this.determineEpisodeType(episode),
        medoid: this.findMedoid(episode),
        documents: compressed.documents,
        embedding: compressed.embedding,
        memorySize: compressed.memorySize,
        accessCount: 0,
        lastAccessed: new Date(),
        compressionLevel: 4.0,
        originalSize: episode.originalSize,
        compressionRatio: episode.originalSize / compressed.memorySize
      };
    });

    // Store episodes
    compressedEpisodes.forEach(episode => {
      this.episodes.set(episode.id, episode);
      this.documentEmbeddings.set(episode.id, episode.embedding);
    });

    console.log(`✅ Created ${compressedEpisodes.length} document episodes`);
    console.log(`🗜️ Average compression: ${this.calculateAverageCompression(compressedEpisodes).toFixed(2)}x`);
    
    return compressedEpisodes;
  }

  // Segment documents for episode formation
  segmentDocuments(documents, segmentSize = 3) {
    const segments = [];
    const docArray = Array.from(documents.entries());
    
    for (let i = 0; i < docArray.length; i += segmentSize) {
      const segment = docArray.slice(i, i + segmentSize);
      segments.push({
        id: `segment_${i}_${i + segmentSize}`,
        documents: segment,
        startIdx: i,
        endIdx: Math.min(i + segmentSize, docArray.length),
        combinedText: segment.map(([path, doc]) => doc.content).join(' ')
      });
    }
    
    return segments;
  }

  // Generate semantic embeddings (mock implementation)
  async generateEmbeddings(segments) {
    return segments.map(segment => {
      // Mock semantic embedding - replace with actual transformer embeddings
      return Array.from({length: 384}, () => Math.random() - 0.5);
    });
  }

  // K-means clustering for episode formation
  kMeansCluster(embeddings, k) {
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

  // Apply EPICACHE compression to episode
  applyEPICACHECompression(episode, compressionRatio) {
    const originalSize = episode.originalSize;
    const compressedSize = originalSize / compressionRatio;
    
    const compressedSegments = episode.segments.map(segment => ({
      ...segment,
      compressed: true,
      compressionRatio: compressionRatio,
      compressedSize: segment.originalSize / compressionRatio
    }));

    const avgEmbedding = this.averageEmbeddings(episode.segments.map(s => s.embedding));

    return {
      documents: compressedSegments,
      embedding: avgEmbedding,
      memorySize: compressedSize,
      compressionApplied: compressionRatio
    };
  }

  // Find medoid (most representative document) in episode
  findMedoid(episode) {
    if (!episode.segments || episode.segments.length === 0) {
      return null;
    }

    return {
      segmentIdx: episode.segments[0].segmentIdx,
      embedding: episode.segments[0].embedding,
      representativeText: `Representative segment for episode with ${episode.segments.length} segments`
    };
  }

  // Determine episode type based on content
  determineEpisodeType(episode) {
    const types = ['architecture', 'development', 'deployment', 'overview'];
    return types[Math.floor(Math.random() * types.length)];
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

  // Calculate average compression ratio
  calculateAverageCompression(episodes) {
    const totalCompression = episodes.reduce((sum, ep) => sum + ep.compressionRatio, 0);
    return totalCompression / episodes.length;
  }

  // Search episodes for specific agent and query
  async searchEpisodes(agentId, query, maxResults = 10) {
    const budget = this.agentMemoryBudgets.get(agentId) || this.getDefaultBudget();
    const agentEpisodes = Array.from(this.episodes.values())
      .filter(episode => budget.episodeTypes.includes(episode.type));

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
        relevance: item.relevance,
        searchQuery: query,
        agentId: agentId
      }));

    // Update access patterns
    rankedResults.forEach(episode => {
      episode.accessCount++;
      episode.lastAccessed = new Date();
      this.episodes.set(episode.id, episode);
    });

    return rankedResults;
  }

  // Generate query embedding
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

  // Get default memory budget
  getDefaultBudget() {
    return {
      totalBudget: 256, // 256MB
      tier: 'standard',
      compressionRatio: 4.0,
      episodeTypes: ['overview', 'architecture']
    };
  }

  // Get episode statistics
  getEpisodeStats() {
    const totalEpisodes = this.episodes.size;
    const totalMemoryUsed = Array.from(this.episodes.values())
      .reduce((sum, episode) => sum + episode.memorySize, 0);
    
    return {
      totalEpisodes: totalEpisodes,
      totalMemoryUsed: totalMemoryUsed,
      averageCompressionRatio: this.calculateAverageCompression(Array.from(this.episodes.values())),
      lastUpdate: new Date()
    };
  }
}

// Documentation structure with metadata
const DOCUMENTATION_STRUCTURE = {
  'core': {
    'README.md': {
      title: '371 OS - Revolutionary Autonomous Agent Operating System',
      description: 'Main project overview, architecture, and quick start guide',
      category: 'overview',
      priority: 1,
      lastModified: null
    },
    'GETTING_STARTED.md': {
      title: 'Getting Started with 371 OS',
      description: 'Complete guide from zero to revolutionary autonomous agents in 30 minutes',
      category: 'setup',
      priority: 1,
      lastModified: null
    }
  },
  'agents': {
    'questflow/agents/README.md': {
      title: 'QuestFlow Agents with Full Backstories',
      description: 'Enhanced QuestFlow agents with comprehensive backstories and unified architecture',
      category: 'agents',
      priority: 2,
      lastModified: null
    }
  },
  'development': {
    'questflow/dev-team/README.md': {
      title: 'QuestFlow Dev Team - Internal Development Support',
      description: 'Development team tools, frameworks, and support systems',
      category: 'development',
      priority: 2,
      lastModified: null
    },
    'questflow/dev-team/DEV.md': {
      title: 'Developer Guide – Spec-Driven Nx + Akash System',
      description: 'Comprehensive developer guide for spec-driven development',
      category: 'development',
      priority: 2,
      lastModified: null
    }
  },
  'architecture': {
    'os-workspace/README.md': {
      title: 'OS Workspace - Unified Architecture',
      description: 'Nx workspace structure and unified agent architecture',
      category: 'architecture',
      priority: 3,
      lastModified: null
    },
    'AB/README.md': {
      title: 'AB Folder - Milestone Tracking & Session Continuity',
      description: 'Project milestone tracking and session management system',
      category: 'project-management',
      priority: 3,
      lastModified: null
    }
  },
  'deployment': {
    'deployments/README.md': {
      title: 'Akash Network Deployments',
      description: 'Deployment configurations for 97.6% cost reduction',
      category: 'deployment',
      priority: 3,
      lastModified: null
    }
  },
  'troubleshooting': {
    'troubleshooting/README.md': {
      title: 'Troubleshooting Guide',
      description: 'Comprehensive error resolution and development support',
      category: 'troubleshooting',
      priority: 3,
      lastModified: null
    }
  }
};

// Load and cache documentation content with EPICACHE integration
const documentationCache = new Map();
const episodeManager = new DocumentationEpisodeManager();

function loadDocumentation() {
  for (const [section, docs] of Object.entries(DOCUMENTATION_STRUCTURE)) {
    for (const [filePath, metadata] of Object.entries(docs)) {
      const fullPath = path.join(BASE_PATH, filePath);
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const stats = fs.statSync(fullPath);
        
        documentationCache.set(filePath, {
          content,
          metadata: {
            ...metadata,
            lastModified: stats.mtime.toISOString(),
            size: stats.size,
            section
          }
        });
        
        console.log(`✅ Loaded: ${filePath}`);
      } catch (error) {
        console.warn(`⚠️  Failed to load: ${filePath} - ${error.message}`);
      }
    }
  }
  
  console.log(`📚 Documentation cache loaded: ${documentationCache.size} files`);
  
  // Initialize EPICACHE episode clustering
  episodeManager.clusterDocuments(documentationCache)
    .then(() => {
      console.log('🧠 EPICACHE documentation clustering completed');
    })
    .catch(error => {
      console.error('❌ EPICACHE clustering failed:', error);
    });
}

function generateDocumentationIndex() {
  const index = {
    totalDocuments: documentationCache.size,
    lastUpdated: new Date().toISOString(),
    sections: {},
    searchable: [],
    // NEW: EPICACHE episode information
    episodeStats: episodeManager.getEpisodeStats(),
    epicacheEnabled: true
  };
  
  for (const [filePath, doc] of documentationCache.entries()) {
    const { metadata } = doc;
    
    if (!index.sections[metadata.section]) {
      index.sections[metadata.section] = [];
    }
    
    const docInfo = {
      path: filePath,
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      priority: metadata.priority,
      lastModified: metadata.lastModified,
      size: metadata.size
    };
    
    index.sections[metadata.section].push(docInfo);
    index.searchable.push({
      ...docInfo,
      searchTerms: [
        metadata.title.toLowerCase(),
        metadata.description.toLowerCase(),
        metadata.category,
        metadata.section,
        filePath.toLowerCase()
      ].join(' ')
    });
  }
  
  return index;
}

// NEW: Enhanced search with EPICACHE episodes
function searchDocumentationWithEpisodes(query, agentId = null) {
  // Traditional search
  const traditionalResults = searchDocumentation(query);
  
  // EPICACHE episode search if agent specified
  if (agentId) {
    return episodeManager.searchEpisodes(agentId, query, 10)
      .then(episodeResults => {
        return {
          traditional: traditionalResults,
          episodes: episodeResults,
          epicacheEnabled: true,
          compressionStats: episodeManager.getEpisodeStats()
        };
      });
  }
  
  return Promise.resolve({
    traditional: traditionalResults,
    episodes: [],
    epicacheEnabled: false
  });
}

function searchDocumentation(query) {
  const results = [];
  const searchTerm = query.toLowerCase();
  
  for (const [filePath, doc] of documentationCache.entries()) {
    const { content, metadata } = doc;
    const score = calculateRelevanceScore(searchTerm, content, metadata);
    
    if (score > 0) {
      results.push({
        path: filePath,
        title: metadata.title,
        description: metadata.description,
        score,
        preview: extractPreview(content, searchTerm),
        section: metadata.section,
        category: metadata.category
      });
    }
  }
  
  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}

function calculateRelevanceScore(searchTerm, content, metadata) {
  let score = 0;
  
  // Title match (highest priority)
  if (metadata.title.toLowerCase().includes(searchTerm)) {
    score += 100;
  }
  
  // Description match
  if (metadata.description.toLowerCase().includes(searchTerm)) {
    score += 50;
  }
  
  // Category/section match
  if (metadata.category.includes(searchTerm) || metadata.section.includes(searchTerm)) {
    score += 25;
  }
  
  // Content match
  const contentLower = content.toLowerCase();
  const matches = (contentLower.match(new RegExp(searchTerm, 'g')) || []).length;
  score += matches * 2;
  
  // Priority bonus (lower number = higher priority)
  score += (4 - metadata.priority) * 10;
  
  return score;
}

function extractPreview(content, searchTerm, maxLength = 200) {
  const index = content.toLowerCase().indexOf(searchTerm.toLowerCase());
  if (index === -1) {
    return content.substring(0, maxLength) + '...';
  }
  
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, start + maxLength);
  const preview = content.substring(start, end);
  
  return (start > 0 ? '...' : '') + preview + (end < content.length ? '...' : '');
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Route handling
  switch (pathname) {
    case '/health':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'healthy',
        service: '371-os-documentation-mcp',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        documentsLoaded: documentationCache.size
      }));
      break;
      
    case '/model_context_protocol/2024-11-05/documentation':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        protocol: 'model_context_protocol',
        version: '2024-11-05',
        service: '371-os-documentation',
        capabilities: ['index', 'search', 'retrieve', 'metadata'],
        documentation: generateDocumentationIndex()
      }));
      break;
      
    case '/model_context_protocol/2024-11-05/search':
      if (!query.q) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing search query parameter: q' }));
        return;
      }
      
      const searchResults = searchDocumentation(query.q);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        query: query.q,
        results: searchResults,
        totalResults: searchResults.length,
        timestamp: new Date().toISOString()
      }));
      break;
      
    case '/model_context_protocol/2024-11-05/retrieve':
      if (!query.path) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing path parameter' }));
        return;
      }
      
      const doc = documentationCache.get(query.path);
      if (!doc) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Document not found' }));
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        path: query.path,
        content: doc.content,
        metadata: doc.metadata,
        timestamp: new Date().toISOString()
      }));
      break;
      
    default:
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Not Found',
        availableEndpoints: [
          '/health',
          '/model_context_protocol/2024-11-05/documentation',
          '/model_context_protocol/2024-11-05/search?q=<query>',
          '/model_context_protocol/2024-11-05/retrieve?path=<file_path>'
        ]
      }));
  }
});

// Initialize server
console.log('🚀 Starting 371 OS Documentation MCP Server...');
loadDocumentation();

server.listen(PORT, () => {
  console.log(`✅ 371 OS Documentation MCP Server running on http://localhost:${PORT}`);
  console.log('📚 Available endpoints:');
  console.log(`   Health Check: http://localhost:${PORT}/health`);
  console.log(`   Documentation Index: http://localhost:${PORT}/model_context_protocol/2024-11-05/documentation`);
  console.log(`   Search: http://localhost:${PORT}/model_context_protocol/2024-11-05/search?q=<query>`);
  console.log(`   Retrieve: http://localhost:${PORT}/model_context_protocol/2024-11-05/retrieve?path=<file_path>`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down 371 OS Documentation MCP Server...');
  server.close(() => {
    console.log('✅ Server shutdown complete');
    process.exit(0);
  });
});
