/**
 * API Gateway Configuration
 * 
 * Phase 1: Foundation - Unified API Gateway for 371 OS
 * Centralizes all service routing with authentication and rate limiting
 */

export interface ServiceConfig {
  name: string;
  path: string;
  target: string;
  port: number;
  healthPath: string;
  rateLimit: {
    windowMs: number;
    max: number;
  };
  authRequired: boolean;
  roles?: string[];
}

export interface GatewayConfig {
  port: number;
  host: string;
  apiVersion: string;
  cors: {
    origin: string | string[];
    methods: string[];
    allowedHeaders: string[];
  };
  rateLimit: {
    windowMs: number;
    max: number;
    message: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    issuer: string;
  };
  services: ServiceConfig[];
}

export const getGatewayConfig = (): GatewayConfig => ({
  port: parseInt(process.env.GATEWAY_PORT || '3000'),
  host: process.env.GATEWAY_HOST || '0.0.0.0',
  apiVersion: 'v1',
  
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Request-ID']
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'development-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    issuer: '371-minds-os'
  },

  services: [
    {
      name: 'governance',
      path: '/governance',
      target: 'http://localhost',
      port: parseInt(process.env.GOVERNANCE_PORT || '3001'),
      healthPath: '/health',
      rateLimit: { windowMs: 60000, max: 50 },
      authRequired: true,
      roles: ['user', 'admin']
    },
    {
      name: 'email',
      path: '/email',
      target: 'http://localhost',
      port: parseInt(process.env.EMAIL_PORT || '3002'),
      healthPath: '/health',
      rateLimit: { windowMs: 60000, max: 30 },
      authRequired: true,
      roles: ['user', 'admin']
    },
    {
      name: 'workflow',
      path: '/workflow',
      target: 'http://localhost',
      port: parseInt(process.env.WORKFLOW_PORT || '3003'),
      healthPath: '/api/workflows/status',
      rateLimit: { windowMs: 60000, max: 60 },
      authRequired: true,
      roles: ['user', 'admin']
    },
    {
      name: 'agents',
      path: '/agents',
      target: 'http://localhost',
      port: parseInt(process.env.AGENTS_PORT || '3004'),
      healthPath: '/health',
      rateLimit: { windowMs: 60000, max: 40 },
      authRequired: true,
      roles: ['admin']
    },
    {
      name: 'analytics',
      path: '/analytics',
      target: 'http://localhost',
      port: parseInt(process.env.ANALYTICS_PORT || '3005'),
      healthPath: '/health',
      rateLimit: { windowMs: 60000, max: 100 },
      authRequired: true,
      roles: ['user', 'admin', 'analyst']
    },
    {
      name: 'mcp-documentation',
      path: '/mcp/docs',
      target: 'http://localhost',
      port: 39301,
      healthPath: '/health',
      rateLimit: { windowMs: 60000, max: 200 },
      authRequired: false
    },
    {
      name: 'mcp-cognition',
      path: '/mcp/cognition',
      target: 'http://localhost',
      port: 39300,
      healthPath: '/health',
      rateLimit: { windowMs: 60000, max: 200 },
      authRequired: false
    }
  ]
});

export default getGatewayConfig;
