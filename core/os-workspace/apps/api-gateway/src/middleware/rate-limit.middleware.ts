/**
 * Rate Limiting Middleware
 * 
 * Phase 1: Foundation - Request rate limiting for 371 OS API Gateway
 * Provides per-service and global rate limiting
 */

import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { getGatewayConfig, ServiceConfig } from '../config/gateway.config';

/**
 * Create rate limiter for a specific service
 */
export const createServiceRateLimiter = (service: ServiceConfig) => {
  return rateLimit({
    windowMs: service.rateLimit.windowMs,
    max: service.rateLimit.max,
    message: {
      success: false,
      error: 'Rate Limit Exceeded',
      message: `Too many requests to ${service.name} service. Please try again later.`,
      retryAfter: Math.ceil(service.rateLimit.windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => {
      // Use API key or IP as identifier
      const apiKey = req.headers['x-api-key'] as string;
      return apiKey || req.ip || 'unknown';
    }
  });
};

/**
 * Global rate limiter
 */
export const globalRateLimiter = () => {
  const config = getGatewayConfig();
  
  return rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: {
      success: false,
      error: 'Rate Limit Exceeded',
      message: config.rateLimit.message,
      retryAfter: Math.ceil(config.rateLimit.windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => {
      const apiKey = req.headers['x-api-key'] as string;
      return apiKey || req.ip || 'unknown';
    },
    skip: (req: Request) => {
      // Skip rate limiting for health checks
      return req.path === '/health' || req.path === '/api/v1/health';
    }
  });
};

/**
 * Request logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  
  // Add request ID to response headers
  res.setHeader('X-Request-ID', requestId);

  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Request ID: ${requestId}`);

  // Log response on finish
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};

/**
 * Error handling middleware
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`[Error] ${req.method} ${req.path}:`, err);

  // Don't expose error details in production
  const isDev = process.env.NODE_ENV === 'development';

  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: isDev ? err.message : 'An unexpected error occurred',
    ...(isDev && { stack: err.stack })
  });
};

export default { 
  createServiceRateLimiter, 
  globalRateLimiter, 
  requestLogger, 
  errorHandler 
};
