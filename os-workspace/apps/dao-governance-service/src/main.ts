/**
 * DAO Governance Service Main Application
 * 
 * Phase 6: Complete DAO Proposal & Voting System
 * Provides comprehensive governance capabilities for the 371 DAO ecosystem.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { GovernanceApiRoutes } from './api-routes.js';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🔍 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize governance API routes
const governanceRoutes = new GovernanceApiRoutes();
app.use('/api/governance', governanceRoutes.getRouter());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      service: 'DAO Governance Service',
      version: '1.0.0',
      description: 'Phase 6: Complete DAO Proposal & Voting System',
      features: [
        'Proposal Creation & Management',
        'Multi-Type Voting Mechanisms', 
        'Stake-Weighted & Reputation-Based Voting',
        'Automated Execution Tracking',
        'Emergency Governance Protocols',
        'Cross-Agent Coordination'
      ],
      endpoints: {
        proposals: '/api/governance/proposals',
        voting: '/api/governance/votes',
        health: '/api/governance/health',
        config: '/api/governance/config'
      },
      documentation: 'https://github.com/371-Minds/os/tree/main/os-workspace/apps/dao-governance-service'
    }
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
app.listen(port, host, () => {
  console.log('🏦 DAO Governance Service Started');
  console.log(`🔗 Server running at http://${host}:${port}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗳️ API Base: http://${host}:${port}/api/governance`);
  console.log('✅ Phase 6: DAO Proposal & Voting System - READY');
});
