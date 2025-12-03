/**
 * API Gateway Routes
 * 
 * Phase 1: Foundation - Route configuration with proxy setup
 */

import { Router, Request, Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { getGatewayConfig, ServiceConfig } from '../config/gateway.config';
import { authenticate, authorize, generateToken, AuthenticatedRequest } from '../middleware/auth.middleware';
import { createServiceRateLimiter } from '../middleware/rate-limit.middleware';

/**
 * Create proxy options for a service
 */
const createProxyOptions = (service: ServiceConfig): Options => ({
  target: `${service.target}:${service.port}`,
  changeOrigin: true,
  pathRewrite: {
    [`^/api/v1${service.path}`]: ''
  },
  onProxyReq: (proxyReq, req: AuthenticatedRequest) => {
    // Forward user info to downstream services
    if (req.user) {
      proxyReq.setHeader('X-User-ID', req.user.id);
      proxyReq.setHeader('X-User-Email', req.user.email);
      proxyReq.setHeader('X-User-Roles', req.user.roles.join(','));
    }
    
    // Forward request ID
    const requestId = req.headers['x-request-id'] as string;
    if (requestId) {
      proxyReq.setHeader('X-Request-ID', requestId);
    }
  },
  onError: (err, req, res) => {
    console.error(`Proxy error for ${service.name}:`, err.message);
    (res as Response).status(503).json({
      success: false,
      error: 'Service Unavailable',
      message: `${service.name} service is currently unavailable`,
      service: service.name
    });
  }
});

/**
 * Create routes for all configured services
 */
export const createServiceRoutes = (): Router => {
  const router = Router();
  const config = getGatewayConfig();

  // Set up routes for each service
  for (const service of config.services) {
    const middlewares: any[] = [];

    // Add rate limiting
    middlewares.push(createServiceRateLimiter(service));

    // Add authentication if required
    if (service.authRequired) {
      middlewares.push(authenticate);
      
      // Add role-based authorization if roles specified
      if (service.roles && service.roles.length > 0) {
        middlewares.push(authorize(...service.roles));
      }
    }

    // Add proxy middleware
    const proxyMiddleware = createProxyMiddleware(createProxyOptions(service));
    middlewares.push(proxyMiddleware);

    // Register route
    router.use(service.path, ...middlewares);
    
    console.log(`📡 Registered route: /api/v1${service.path} → ${service.target}:${service.port}`);
  }

  return router;
};

/**
 * Health check routes
 */
export const createHealthRoutes = (): Router => {
  const router = Router();
  const config = getGatewayConfig();

  // Gateway health check
  router.get('/health', (req: Request, res: Response) => {
    res.json({
      success: true,
      service: 'api-gateway',
      status: 'healthy',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // All services health check
  router.get('/health/services', async (req: Request, res: Response) => {
    const HEALTH_CHECK_TIMEOUT = 5000; // 5 second timeout

    const healthChecks = await Promise.all(
      config.services.map(async (service) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT);
        
        try {
          const response = await fetch(
            `${service.target}:${service.port}${service.healthPath}`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);
          return {
            name: service.name,
            status: response.ok ? 'healthy' : 'unhealthy',
            statusCode: response.status
          };
        } catch (error) {
          clearTimeout(timeoutId);
          return {
            name: service.name,
            status: 'unavailable',
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );

    const allHealthy = healthChecks.every(check => check.status === 'healthy');

    res.status(allHealthy ? 200 : 503).json({
      success: allHealthy,
      gateway: 'healthy',
      services: healthChecks,
      timestamp: new Date().toISOString()
    });
  });

  return router;
};

/**
 * Authentication routes
 */
export const createAuthRoutes = (): Router => {
  const router = Router();
  
  // Development API key - must be set via environment in production
  const DEV_API_KEY = process.env.DEV_API_KEY || (process.env.NODE_ENV === 'development' ? 'dev-api-key-371' : '');

  // Token generation endpoint (for development/testing)
  router.post('/auth/token', (req: Request, res: Response) => {
    const { apiKey } = req.body;

    if (!apiKey) {
      res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'API key is required'
      });
      return;
    }

    // Validate API key against environment variables
    const validKeys = [process.env.ADMIN_API_KEY, DEV_API_KEY].filter(Boolean);
    if (!validKeys.includes(apiKey)) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid API key'
      });
      return;
    }

    const token = generateToken({
      id: 'user-from-api-key',
      email: 'api-user@371minds.com',
      roles: ['user', 'admin']
    });

    res.json({
      success: true,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
  });

  // Token refresh endpoint
  router.post('/auth/refresh', authenticate as any, (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
      return;
    }

    const token = generateToken({
      id: req.user.id,
      email: req.user.email,
      roles: req.user.roles
    });

    res.json({
      success: true,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
  });

  // Validate token endpoint
  router.get('/auth/validate', authenticate as any, (req: AuthenticatedRequest, res: Response) => {
    res.json({
      success: true,
      user: req.user
    });
  });

  return router;
};

export default { createServiceRoutes, createHealthRoutes, createAuthRoutes };
