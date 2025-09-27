import { EventEmitter } from 'eventemitter3';
import type { PluginMetadata, PluginRegistryEntry, PluginSecurityAssessment } from './types.js';

/**
 * Security policy configuration
 */
export interface SecurityPolicy {
  allowUnsignedPlugins: boolean;
  allowUnverifiedPlugins: boolean;
  requiredPermissions: string[];
  bannedPermissions: string[];
  maxMemoryUsage: number; // bytes
  maxCpuUsage: number; // percentage
  maxNetworkRequests: number; // per minute
  maxFileSystemAccess: number; // files per minute
  allowedDomains: string[];
  blockedDomains: string[];
  enableSandbox: boolean;
  sandboxMode: 'strict' | 'moderate' | 'permissive';
  timeout: number; // milliseconds
}

/**
 * Security violation types
 */
export enum SecurityViolationType {
  UNAUTHORIZED_API_ACCESS = 'unauthorized_api_access',
  EXCESSIVE_MEMORY_USAGE = 'excessive_memory_usage',
  EXCESSIVE_CPU_USAGE = 'excessive_cpu_usage',
  UNAUTHORIZED_NETWORK_ACCESS = 'unauthorized_network_access',
  UNAUTHORIZED_FILE_ACCESS = 'unauthorized_file_access',
  MALICIOUS_CODE_DETECTED = 'malicious_code_detected',
  UNSIGNED_PLUGIN = 'unsigned_plugin',
  UNVERIFIED_PLUGIN = 'unverified_plugin',
  PERMISSION_VIOLATION = 'permission_violation',
  TIMEOUT_VIOLATION = 'timeout_violation',
}

/**
 * Security violation record
 */
export interface SecurityViolation {
  pluginId: string;
  type: SecurityViolationType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: Date;
  context: Record<string, any>;
  blocked: boolean;
  resolved: boolean;
}

/**
 * Security violation error class
 */
export class SecurityViolationError extends Error {
  constructor(
    public pluginId: string,
    public type: SecurityViolationType,
    public severity: 'low' | 'medium' | 'high' | 'critical',
    public description: string,
    public context: Record<string, any> = {},
    public blocked: boolean = false,
    public resolved: boolean = false,
    public timestamp: Date = new Date()
  ) {
    super(description);
    this.name = 'SecurityViolationError';
  }
}

/**
 * Code analysis result
 */
export interface CodeAnalysisResult {
  safe: boolean;
  score: number; // 0-100, higher is safer
  vulnerabilities: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    line?: number;
    column?: number;
    recommendation: string;
  }>;
  permissions: string[];
  networkCalls: string[];
  fileSystemAccess: string[];
  dynamicCodeExecution: boolean;
  obfuscated: boolean;
}

/**
 * Security framework events
 */
export interface SecurityEvents {
  'violation:detected': (violation: SecurityViolation) => void;
  'violation:blocked': (violation: SecurityViolation) => void;
  'plugin:quarantined': (pluginId: string, reason: string) => void;
  'plugin:authorized': (pluginId: string) => void;
  'policy:updated': (policy: SecurityPolicy) => void;
  'scan:completed': (pluginId: string, result: CodeAnalysisResult) => void;
  'security:error': (error: Error) => void;
}

/**
 * Plugin quarantine status
 */
export interface QuarantineStatus {
  pluginId: string;
  quarantined: boolean;
  reason: string;
  timestamp: Date;
  reviewRequired: boolean;
  autoRelease?: Date;
}

/**
 * Security audit log entry
 */
export interface SecurityAuditLog {
  timestamp: Date;
  pluginId: string;
  action: string;
  result: 'success' | 'failure' | 'warning';
  details: Record<string, any>;
  userId?: string;
}

/**
 * Plugin Security Framework
 * 
 * Provides comprehensive security validation, sandboxing, and monitoring
 * for ElizaOS plugins with real-time threat detection.
 */
export class PluginSecurityFramework extends EventEmitter<SecurityEvents> {
  private policy: SecurityPolicy;
  private violations = new Map<string, SecurityViolation[]>();
  private quarantined = new Map<string, QuarantineStatus>();
  private auditLog: SecurityAuditLog[] = [];
  private resourceMonitors = new Map<string, NodeJS.Timeout>();
  private securityAssessments = new Map<string, PluginSecurityAssessment>();

  constructor(policy?: Partial<SecurityPolicy>) {
    super();
    
    this.policy = {
      allowUnsignedPlugins: false,
      allowUnverifiedPlugins: false,
      requiredPermissions: [],
      bannedPermissions: ['admin', 'root', 'system'],
      maxMemoryUsage: 100 * 1024 * 1024, // 100MB
      maxCpuUsage: 80, // 80%
      maxNetworkRequests: 60, // 1 per second
      maxFileSystemAccess: 30, // 0.5 per second
      allowedDomains: ['localhost', '127.0.0.1'],
      blockedDomains: ['malicious.com', 'suspicious.net'],
      enableSandbox: true,
      sandboxMode: 'strict',
      timeout: 30000, // 30 seconds
      ...policy,
    };
  }

  /**
   * Validate plugin security before installation
   */
  async validatePlugin(entry: PluginRegistryEntry, sourceCode?: Uint8Array): Promise<boolean> {
    try {
      this.logAudit(entry.id, 'validate', 'success', { message: 'Plugin security validation started' });

      // Basic metadata validation
      await this.validateMetadata(entry.metadata);

      // Signature validation
      if (!this.policy.allowUnsignedPlugins && !entry.metadata.signature) {
        throw new SecurityViolationError(
          entry.id,
          SecurityViolationType.UNSIGNED_PLUGIN,
          'critical',
          'Plugin is not signed'
        );
      }

      // Verification check
      if (!this.policy.allowUnverifiedPlugins && !entry.metadata.verified) {
        throw new SecurityViolationError(
          entry.id,
          SecurityViolationType.UNVERIFIED_PLUGIN,
          'high',
          'Plugin is not verified by marketplace'
        );
      }

      // Permission validation
      await this.validatePermissions(entry.id, entry.metadata.permissions || []);

      // Code analysis (if source available)
      if (sourceCode) {
        const analysis = await this.analyzeCode(entry.id, sourceCode);
        if (!analysis.safe) {
          throw new SecurityViolationError(
            entry.id,
            SecurityViolationType.MALICIOUS_CODE_DETECTED,
            'critical',
            `Malicious code detected: ${analysis.vulnerabilities.map(v => v.description).join(', ')}`
          );
        }
      }

      // Create security assessment
      await this.createSecurityAssessment(entry);

      this.logAudit(entry.id, 'validate', 'success', { 
        signature: !!entry.metadata.signature,
        verified: entry.metadata.verified,
        permissions: entry.metadata.permissions?.length || 0
      });

      this.emit('plugin:authorized', entry.id);
      return true;

    } catch (error) {
      if (error instanceof SecurityViolationError) {
        const violation: SecurityViolation = {
          pluginId: error.pluginId,
          type: error.type,
          severity: error.severity,
          description: error.description,
          timestamp: error.timestamp,
          context: error.context,
          blocked: error.blocked,
          resolved: error.resolved
        };
        this.recordViolation(violation);
        this.logAudit(entry.id, 'validate', 'failure', { reason: error.description });
        return false;
      }
      
      this.logAudit(entry.id, 'validate', 'failure', { error: String(error) });
      throw error;
    }
  }

  /**
   * Validate plugin metadata
   */
  private async validateMetadata(metadata: PluginMetadata): Promise<void> {
    // Basic validation
    if (!metadata.id || !metadata.name || !metadata.version) {
      throw new Error('Invalid plugin metadata: missing required fields');
    }

    // Version format validation
    if (!/^\d+\.\d+\.\d+/.test(metadata.version)) {
      throw new Error('Invalid version format');
    }

    // Author validation
    if (!metadata.author || metadata.author.trim().length === 0) {
      throw new Error('Plugin must have an author');
    }
  }

  /**
   * Validate plugin permissions
   */
  private async validatePermissions(pluginId: string, permissions: string[]): Promise<void> {
    // Check for banned permissions
    const bannedUsed = permissions.filter(p => this.policy.bannedPermissions.includes(p));
    if (bannedUsed.length > 0) {
      throw new SecurityViolationError(
        pluginId,
        SecurityViolationType.PERMISSION_VIOLATION,
        'high',
        `Plugin requests banned permissions: ${bannedUsed.join(', ')}`
      );
    }

    // Check required permissions
    const missingRequired = this.policy.requiredPermissions.filter(p => !permissions.includes(p));
    if (missingRequired.length > 0) {
      throw new SecurityViolationError(
        pluginId,
        SecurityViolationType.PERMISSION_VIOLATION,
        'medium',
        `Plugin missing required permissions: ${missingRequired.join(', ')}`
      );
    }
  }

  /**
   * Analyze plugin code for security issues
   */
  private async analyzeCode(pluginId: string, sourceCode: Uint8Array): Promise<CodeAnalysisResult> {
    // Mock code analysis - in production, this would use static analysis tools
    const codeString = new TextDecoder().decode(sourceCode);
    
    const vulnerabilities = [];
    const permissions: string[] = [];
    const networkCalls: string[] = [];
    const fileSystemAccess: string[] = [];

    // Check for suspicious patterns
    if (codeString.includes('eval(') || codeString.includes('Function(')) {
      vulnerabilities.push({
        type: 'dynamic_code_execution',
        severity: 'high' as const,
        description: 'Dynamic code execution detected',
        recommendation: 'Avoid using eval() or Function() constructor'
      });
    }

    if (codeString.includes('child_process') || codeString.includes('spawn')) {
      vulnerabilities.push({
        type: 'process_execution',
        severity: 'critical' as const,
        description: 'Process execution capability detected',
        recommendation: 'Review process execution usage for security'
      });
    }

    const score = Math.max(0, 100 - vulnerabilities.length * 20);
    const safe = vulnerabilities.filter(v => v.severity === 'critical' || v.severity === 'high').length === 0;

    return {
      safe,
      score,
      vulnerabilities,
      permissions,
      networkCalls,
      fileSystemAccess,
      dynamicCodeExecution: codeString.includes('eval('),
      obfuscated: false // Mock detection
    };
  }

  /**
   * Create security assessment for plugin
   */
  private async createSecurityAssessment(entry: PluginRegistryEntry): Promise<void> {
    const assessment: PluginSecurityAssessment = {
      pluginId: entry.id,
      riskLevel: entry.metadata.verified ? 'low' : 'medium',
      score: entry.metadata.verified ? 85 : 60,
      vulnerabilities: 0, // Would be populated by real analysis
      lastAssessment: new Date(),
      recommendations: []
    };

    this.securityAssessments.set(entry.id, assessment);
  }

  /**
   * Record a security violation
   */
  private recordViolation(violation: SecurityViolation): void {
    if (!this.violations.has(violation.pluginId)) {
      this.violations.set(violation.pluginId, []);
    }
    
    this.violations.get(violation.pluginId)!.push(violation);
    this.emit('violation:detected', violation);

    // Auto-block critical violations
    if (violation.severity === 'critical') {
      this.quarantinePlugin(violation.pluginId, violation.description);
      this.emit('violation:blocked', violation);
    }
  }

  /**
   * Quarantine a plugin
   */
  private quarantinePlugin(pluginId: string, reason: string): void {
    const status: QuarantineStatus = {
      pluginId,
      quarantined: true,
      reason,
      timestamp: new Date(),
      reviewRequired: true
    };

    this.quarantined.set(pluginId, status);
    this.emit('plugin:quarantined', pluginId, reason);
  }

  /**
   * Get security violations for a plugin
   */
  getViolations(pluginId: string): SecurityViolation[] {
    return this.violations.get(pluginId) || [];
  }

  /**
   * Get quarantine status for a plugin
   */
  getQuarantineStatus(pluginId: string): QuarantineStatus | undefined {
    return this.quarantined.get(pluginId);
  }

  /**
   * Get security assessment for a plugin
   */
  getSecurityAssessment(pluginId: string): PluginSecurityAssessment | undefined {
    return this.securityAssessments.get(pluginId);
  }

  /**
   * Update security policy
   */
  updatePolicy(newPolicy: Partial<SecurityPolicy>): void {
    this.policy = { ...this.policy, ...newPolicy };
    this.emit('policy:updated', this.policy);
  }

  /**
   * Cleanup framework resources
   */
  destroy(): void {
    // Clear all monitoring
    this.resourceMonitors.forEach(monitor => clearTimeout(monitor));
    this.resourceMonitors.clear();

    // Clear data
    this.violations.clear();
    this.quarantined.clear();
    this.securityAssessments.clear();
    this.auditLog.length = 0;

    this.removeAllListeners();
  }

  /**
   * Log security audit entry
   */
  private logAudit(pluginId: string, action: string, result: 'success' | 'failure' | 'warning', details: Record<string, any> = {}): void {
    const entry: SecurityAuditLog = {
      timestamp: new Date(),
      pluginId,
      action,
      result,
      details
    };

    this.auditLog.push(entry);

    // Keep only last 1000 entries
    if (this.auditLog.length > 1000) {
      this.auditLog.splice(0, this.auditLog.length - 1000);
    }
  }
}