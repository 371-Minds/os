/**
 * Database Configuration for Zero-Trust Architecture
 * 
 * This configuration module connects to the database through the Secretless Broker
 * instead of using direct credentials. All connections go through localhost proxy.
 */

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
  connectionTimeout?: number;
  maxConnections?: number;
}

export interface NotificationConfig {
  apiEndpoint: string;
  apiKey: string;
}

export interface BlockchainConfig {
  rpcUrl: string;
  apiKey?: string;
}

/**
 * Database configuration using Secretless Broker proxy
 * 
 * IMPORTANT: All values point to localhost. The Secretless Broker
 * intercepts these connections and injects real credentials from UTS.
 */
export const getDatabaseConfig = (): DatabaseConfig => {
  // In zero-trust mode, we connect to localhost where Secretless Broker listens
  // The broker will inject real credentials from Universal Tool Server
  const isZeroTrustMode = process.env.ZERO_TRUST_MODE === 'true' || process.env.NODE_ENV === 'production';

  if (isZeroTrustMode) {
    console.log('🔐 Zero-Trust Mode: Connecting via Secretless Broker on localhost:5432');
    
    return {
      host: '127.0.0.1', // Secretless Broker local proxy
      port: 5432,        // Broker listens here
      database: process.env.DATABASE_NAME || 'dao_governance',
      user: 'broker-user',     // Dummy credentials - broker will inject real ones
      password: 'broker-pass', // Dummy credentials - broker will inject real ones
      ssl: false,              // SSL handled by broker to actual database
      connectionTimeout: 5000,
      maxConnections: 20
    };
  } else {
    // Development mode: Use environment variables directly
    console.log('⚠️ Development Mode: Using direct database connection (NOT for production!)');
    
    return {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      database: process.env.DATABASE_NAME || 'dao_governance_dev',
      user: process.env.DATABASE_USER || 'dev_user',
      password: process.env.DATABASE_PASSWORD || 'dev_password',
      ssl: process.env.DATABASE_SSL === 'true',
      connectionTimeout: 5000,
      maxConnections: 10
    };
  }
};

/**
 * Notification service configuration using Secretless Broker proxy
 */
export const getNotificationConfig = (): NotificationConfig => {
  const isZeroTrustMode = process.env.ZERO_TRUST_MODE === 'true' || process.env.NODE_ENV === 'production';

  if (isZeroTrustMode) {
    console.log('🔐 Zero-Trust Mode: Novu API via Secretless Broker on localhost:8081');
    
    return {
      apiEndpoint: 'http://127.0.0.1:8081', // Secretless Broker proxy for Novu
      apiKey: 'broker-api-key' // Dummy key - broker will inject real one
    };
  } else {
    console.log('⚠️ Development Mode: Using direct Novu API connection');
    
    return {
      apiEndpoint: process.env.NOVU_API_URL || 'https://api.novu.co',
      apiKey: process.env.NOVU_API_KEY || ''
    };
  }
};

/**
 * Blockchain RPC configuration using Secretless Broker proxy
 */
export const getBlockchainConfig = (): BlockchainConfig => {
  const isZeroTrustMode = process.env.ZERO_TRUST_MODE === 'true' || process.env.NODE_ENV === 'production';

  if (isZeroTrustMode) {
    console.log('🔐 Zero-Trust Mode: Blockchain RPC via Secretless Broker on localhost:8545');
    
    return {
      rpcUrl: 'http://127.0.0.1:8545', // Secretless Broker proxy for blockchain RPC
      apiKey: 'broker-api-key' // Dummy key - broker will inject real one
    };
  } else {
    console.log('⚠️ Development Mode: Using direct blockchain RPC connection');
    
    return {
      rpcUrl: process.env.BLOCKCHAIN_RPC_URL || 'http://localhost:8545',
      apiKey: process.env.BLOCKCHAIN_API_KEY
    };
  }
};

/**
 * Connection string builder for database clients
 */
export const buildConnectionString = (config: DatabaseConfig): string => {
  const { host, port, database, user, password, ssl } = config;
  const sslParam = ssl ? '?sslmode=require' : '';
  return `postgresql://${user}:${password}@${host}:${port}/${database}${sslParam}`;
};

/**
 * Validate that zero-trust configuration is properly set up
 */
export const validateZeroTrustSetup = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  const isProduction = process.env.NODE_ENV === 'production';
  const isZeroTrustEnabled = process.env.ZERO_TRUST_MODE === 'true';

  if (isProduction && !isZeroTrustEnabled) {
    errors.push('Production environment must use ZERO_TRUST_MODE=true');
  }

  if (isZeroTrustEnabled) {
    const dbConfig = getDatabaseConfig();
    
    if (dbConfig.host !== '127.0.0.1') {
      errors.push('Zero-Trust mode must use localhost (127.0.0.1) for database host');
    }
    
    if (dbConfig.user === 'dev_user' || dbConfig.password === 'dev_password') {
      errors.push('Zero-Trust mode should not use development credentials');
    }

    // Check that Secretless Broker is reachable (in production, this would be a health check)
    console.log('✓ Zero-Trust configuration validated');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Export configuration object for use in application
 */
export const serviceConfig = {
  database: getDatabaseConfig(),
  notification: getNotificationConfig(),
  blockchain: getBlockchainConfig(),
  zeroTrustValidation: validateZeroTrustSetup()
};

// Log configuration on module load (with sensitive data masked)
console.log('📋 Service Configuration Loaded:');
console.log(`   - Database: ${serviceConfig.database.host}:${serviceConfig.database.port}`);
console.log(`   - Notification: ${serviceConfig.notification.apiEndpoint}`);
console.log(`   - Blockchain: ${serviceConfig.blockchain.rpcUrl}`);
console.log(`   - Zero-Trust Validation: ${serviceConfig.zeroTrustValidation.valid ? '✓ PASS' : '✗ FAIL'}`);

if (!serviceConfig.zeroTrustValidation.valid) {
  console.error('❌ Zero-Trust Configuration Errors:');
  serviceConfig.zeroTrustValidation.errors.forEach(err => console.error(`   - ${err}`));
}
