#!/usr/bin/env node

/**
 * 371 OS Documentation MCP Server
 * 
 * Provides comprehensive access to project documentation through MCP
 * Enables Qoder and other AI assistants to access structured project knowledge
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 39301;
const BASE_PATH = path.resolve(__dirname, '..');

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

// Load and cache documentation content
const documentationCache = new Map();

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
}

function generateDocumentationIndex() {
  const index = {
    totalDocuments: documentationCache.size,
    lastUpdated: new Date().toISOString(),
    sections: {},
    searchable: []
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