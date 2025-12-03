/**
 * 371 OS Unified API Gateway
 * 
 * Phase 1: Foundation - Centralized API Gateway
 * 
 * Features:
 * - Unified routing for all 371 OS services
 * - JWT and API key authentication
 * - Role-based authorization
 * - Rate limiting per service and global
 * - Health checks for all services
 * - Request logging and tracing
 * - CORS configuration
 * - OpenAPI documentation
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { getGatewayConfig } from './config/gateway.config';
import { globalRateLimiter, requestLogger, errorHandler } from './middleware/rate-limit.middleware';
import { createServiceRoutes, createHealthRoutes, createAuthRoutes } from './routes/api.routes';
import { openApiSpec } from './openapi.spec';

const app = express();
const config = getGatewayConfig();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for API
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
  origin: config.cors.origin,
  methods: config.cors.methods,
  allowedHeaders: config.cors.allowedHeaders,
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Global rate limiting
app.use(globalRateLimiter());

// API Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: '371 OS API Documentation'
}));

// Serve OpenAPI spec as JSON
app.get('/api/openapi.json', (req, res) => {
  res.json(openApiSpec);
});

// Health check routes (no auth required)
app.use('/api/v1', createHealthRoutes());

// Authentication routes
app.use('/api/v1', createAuthRoutes());

// Service routes with proxy
app.use('/api/v1', createServiceRoutes());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: '371 OS API Gateway',
    version: '1.0.0',
    description: 'Unified API Gateway for 371 Minds Autonomous Agent Operating System',
    documentation: '/api/docs',
    openapi: '/api/openapi.json',
    health: '/api/v1/health',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      '/api/docs',
      '/api/openapi.json',
      '/api/v1/health',
      '/api/v1/health/services',
      '/api/v1/auth/token',
      '/api/v1/governance/*',
      '/api/v1/email/*',
      '/api/v1/workflow/*',
      '/api/v1/agents/*',
      '/api/v1/analytics/*',
      '/api/v1/mcp/docs/*',
      '/api/v1/mcp/cognition/*'
    ]
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(config.port, config.host, () => {
  console.log('');
  console.log('🚀 ═══════════════════════════════════════════════════════');
  console.log('   371 OS Unified API Gateway');
  console.log('   Phase 1: Foundation');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`📡 Server running on http://${config.host}:${config.port}`);
  console.log(`📚 API Documentation: http://localhost:${config.port}/api/docs`);
  console.log(`📋 OpenAPI Spec: http://localhost:${config.port}/api/openapi.json`);
  console.log(`❤️  Health Check: http://localhost:${config.port}/api/v1/health`);
  console.log('');
  console.log('🔐 Authentication:');
  console.log('   - Bearer Token (JWT)');
  console.log('   - X-API-Key Header');
  console.log('');
  console.log('📦 Registered Services:');
  config.services.forEach(service => {
    console.log(`   - ${service.name}: /api/v1${service.path} → :${service.port}`);
  });
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
});

export default app;
