/**
 * Authentication Middleware
 * 
 * Phase 1: Foundation - JWT-based authentication for 371 OS API Gateway
 * Supports both API key and JWT token authentication
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getGatewayConfig } from '../config/gateway.config';

export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
  apiKey?: string;
}

// Store for API keys (in production, use database)
// Initialize with environment-based keys only
const initApiKeys = (): Map<string, AuthUser> => {
  const keys = new Map<string, AuthUser>();
  
  // Add admin key from environment
  if (process.env.ADMIN_API_KEY) {
    keys.set(process.env.ADMIN_API_KEY, { 
      id: 'admin-user', 
      email: 'admin@371minds.com', 
      roles: ['admin'] 
    });
  }
  
  // Add dev key only in development mode
  const devKey = process.env.DEV_API_KEY || (process.env.NODE_ENV === 'development' ? 'dev-api-key-371' : '');
  if (devKey) {
    keys.set(devKey, { 
      id: 'dev-user', 
      email: 'dev@371minds.com', 
      roles: ['admin'] 
    });
  }
  
  return keys;
};

const apiKeys = initApiKeys();

/**
 * Verify JWT token
 */
const verifyToken = (token: string): AuthUser | null => {
  try {
    const config = getGatewayConfig();
    const decoded = jwt.verify(token, config.jwt.secret, {
      issuer: config.jwt.issuer
    }) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Verify API Key
 */
const verifyApiKey = (apiKey: string): AuthUser | null => {
  return apiKeys.get(apiKey) || null;
};

/**
 * Generate JWT token for a user
 */
export const generateToken = (user: Omit<AuthUser, 'iat' | 'exp'>): string => {
  const config = getGatewayConfig();
  return jwt.sign(
    { id: user.id, email: user.email, roles: user.roles },
    config.jwt.secret,
    { 
      expiresIn: config.jwt.expiresIn,
      issuer: config.jwt.issuer
    }
  );
};

/**
 * Authentication middleware
 * Supports:
 * - Bearer token (JWT)
 * - X-API-Key header
 */
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  // Check for Bearer token
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (user) {
      req.user = user;
      return next();
    }
  }

  // Check for API key
  const apiKey = req.headers['x-api-key'] as string;
  if (apiKey) {
    const user = verifyApiKey(apiKey);
    if (user) {
      req.user = user;
      req.apiKey = apiKey;
      return next();
    }
  }

  res.status(401).json({
    success: false,
    error: 'Unauthorized',
    message: 'Valid authentication required. Use Bearer token or X-API-Key header.'
  });
};

/**
 * Optional authentication - doesn't fail if no auth provided
 */
export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (user) {
      req.user = user;
    }
  }

  const apiKey = req.headers['x-api-key'] as string;
  if (apiKey && !req.user) {
    const user = verifyApiKey(apiKey);
    if (user) {
      req.user = user;
      req.apiKey = apiKey;
    }
  }

  next();
};

/**
 * Role-based authorization middleware
 */
export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication required'
      });
      return;
    }

    const hasRole = req.user.roles.some(role => allowedRoles.includes(role));
    if (!hasRole) {
      res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: `Access denied. Required roles: ${allowedRoles.join(', ')}`
      });
      return;
    }

    next();
  };
};

/**
 * Register a new API key (for admin use)
 */
export const registerApiKey = (apiKey: string, user: AuthUser): void => {
  apiKeys.set(apiKey, user);
};

/**
 * Revoke an API key
 */
export const revokeApiKey = (apiKey: string): boolean => {
  return apiKeys.delete(apiKey);
};

export default { authenticate, optionalAuth, authorize, generateToken, registerApiKey, revokeApiKey };
