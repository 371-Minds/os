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
      this.logAudit(entry.id, 'validate', 'Plugin security validation started');

      // Basic metadata validation
      await this.validateMetadata(entry.metadata);

      // Signature validation
      if (!this.policy.allowUnsignedPlugins && !entry.metadata.signature) {
        throw new SecurityViolation(
          entry.id,
          SecurityViolationType.UNSIGNED_PLUGIN,
          'critical',
          'Plugin is not signed'
        );
      }

      // Verification check
      if (!this.policy.allowUnverifiedPlugins && !entry.metadata.verified) {
        throw new SecurityViolation(
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
          throw new SecurityViolation(
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
      if (error instanceof SecurityViolation) {
        this.recordViolation(error);
        this.logAudit(entry.id, 'validate', 'failure', { reason: error.description });
        return false;
      }
      
      this.emit('security:error', error as Error);
      throw error;
    }
  }

  /**
   * Monitor plugin runtime security
   */
  startRuntimeMonitoring(pluginId: string): void {
    if (this.resourceMonitors.has(pluginId)) {
      return; // Already monitoring
    }

    const monitor = setInterval(() => {
      this.checkRuntimeSecurity(pluginId).catch(error => {
        this.emit('security:error', error);
      });
    }, 5000); // Check every 5 seconds

    this.resourceMonitors.set(pluginId, monitor);
    this.logAudit(pluginId, 'monitor_start', 'success');
  }

  /**
   * Stop runtime monitoring for a plugin
   */
  stopRuntimeMonitoring(pluginId: string): void {
    const monitor = this.resourceMonitors.get(pluginId);
    if (monitor) {
      clearInterval(monitor);
      this.resourceMonitors.delete(pluginId);
      this.logAudit(pluginId, 'monitor_stop', 'success');
    }
  }

  /**
   * Quarantine a plugin due to security violations
   */
  async quarantinePlugin(pluginId: string, reason: string, autoRelease?: Date): Promise<void> {
    const status: QuarantineStatus = {
      pluginId,
      quarantined: true,
      reason,
      timestamp: new Date(),
      reviewRequired: true,
      autoRelease,
    };

    this.quarantined.set(pluginId, status);
    this.stopRuntimeMonitoring(pluginId);
    
    this.logAudit(pluginId, 'quarantine', 'success', { reason, autoRelease });
    this.emit('plugin:quarantined', pluginId, reason);
  }

  /**
   * Release a plugin from quarantine
   */
  async releaseFromQuarantine(pluginId: string): Promise<void> {
    const status = this.quarantined.get(pluginId);
    if (!status) {
      throw new Error(`Plugin not in quarantine: ${pluginId}`);
    }

    status.quarantined = false;
    status.reviewRequired = false;
    
    this.logAudit(pluginId, 'release', 'success');
    this.emit('plugin:authorized', pluginId);
  }

  /**
   * Check if a plugin is quarantined
   */
  isQuarantined(pluginId: string): boolean {
    const status = this.quarantined.get(pluginId);
    return status?.quarantined || false;
  }

  /**
   * Get security violations for a plugin
   */
  getViolations(pluginId: string): SecurityViolation[] {
    return this.violations.get(pluginId) || [];
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
  updatePolicy(updates: Partial<SecurityPolicy>): void {
    this.policy = { ...this.policy, ...updates };
    this.logAudit('system', 'policy_update', 'success', updates);
    this.emit('policy:updated', this.policy);
  }

  /**
   * Get current security policy
   */
  getPolicy(): SecurityPolicy {
    return { ...this.policy };
  }

  /**
   * Get audit log
   */
  getAuditLog(pluginId?: string): SecurityAuditLog[] {
    if (pluginId) {
      return this.auditLog.filter(log => log.pluginId === pluginId);
    }
    return [...this.auditLog];
  }

  /**
   * Clear audit log (admin function)
   */
  clearAuditLog(): void {
    this.auditLog.length = 0;
    this.logAudit('system', 'audit_clear', 'success');
  }

  /**
   * Generate security report
   */
  generateSecurityReport(): {
    totalPlugins: number;
    quarantinedPlugins: number;
    totalViolations: number;
    criticalViolations: number;
    averageSecurityScore: number;
    topViolationTypes: Array<{ type: string; count: number }>;
  } {
    const allViolations = Array.from(this.violations.values()).flat();
    const criticalViolations = allViolations.filter(v => v.severity === 'critical');
    
    // Count violation types
    const violationCounts = new Map<string, number>();
    allViolations.forEach(v => {
      violationCounts.set(v.type, (violationCounts.get(v.type) || 0) + 1);
    });
    
    const topViolationTypes = Array.from(violationCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));

    // Calculate average security score
    const assessments = Array.from(this.securityAssessments.values());
    const averageSecurityScore = assessments.length > 0
      ? assessments.reduce((sum, a) => sum + (a.riskLevel === 'low' ? 90 : a.riskLevel === 'medium' ? 70 : a.riskLevel === 'high' ? 40 : 10), 0) / assessments.length
      : 0;

    return {
      totalPlugins: this.securityAssessments.size,
      quarantinedPlugins: Array.from(this.quarantined.values()).filter(q => q.quarantined).length,
      totalViolations: allViolations.length,
      criticalViolations: criticalViolations.length,
      averageSecurityScore,
      topViolationTypes,
    };
  }

  /**
   * Cleanup and destroy security framework
   */
  destroy(): void {
    // Stop all monitors
    for (const monitor of this.resourceMonitors.values()) {
      clearInterval(monitor);
    }
    this.resourceMonitors.clear();
    
    // Clear data
    this.violations.clear();
    this.quarantined.clear();
    this.securityAssessments.clear();
    this.auditLog.length = 0;
    
    // Remove listeners
    this.removeAllListeners();
  }

  // Private methods

  private async validateMetadata(metadata: PluginMetadata): Promise<void> {
    // Validate required fields
    if (!metadata.name || !metadata.version || !metadata.description) {
      throw new Error('Missing required metadata fields');
    }

    // Validate version format
    if (!/^\d+\.\d+\.\d+$/.test(metadata.version)) {
      throw new Error('Invalid version format');
    }

    // Check for suspicious metadata
    const suspiciousKeywords = ['hack', 'exploit', 'backdoor', 'malware'];
    const text = `${metadata.name} ${metadata.description} ${metadata.keywords?.join(' ') || ''}`.toLowerCase();
    
    for (const keyword of suspiciousKeywords) {
      if (text.includes(keyword)) {
        throw new Error(`Suspicious keyword detected: ${keyword}`);
      }
    }
  }

  private async validatePermissions(pluginId: string, permissions: string[]): Promise<void> {
    // Check for banned permissions
    for (const permission of permissions) {
      if (this.policy.bannedPermissions.includes(permission)) {
        throw new SecurityViolation(
          pluginId,
          SecurityViolationType.PERMISSION_VIOLATION,
          'high',
          `Banned permission requested: ${permission}`
        );
      }
    }

    // Check for required permissions
    for (const required of this.policy.requiredPermissions) {
      if (!permissions.includes(required)) {
        throw new SecurityViolation(
          pluginId,
          SecurityViolationType.PERMISSION_VIOLATION,
          'medium',
          `Required permission missing: ${required}`
        );
      }
    }
  }

  private async analyzeCode(pluginId: string, sourceCode: Uint8Array): Promise<CodeAnalysisResult> {
    const code = new TextDecoder().decode(sourceCode);
    
    // Basic static analysis
    const result: CodeAnalysisResult = {
      safe: true,
      score: 100,
      vulnerabilities: [],
      permissions: [],
      networkCalls: [],
      fileSystemAccess: [],
      dynamicCodeExecution: false,
      obfuscated: false,
    };

    // Check for dangerous patterns
    const dangerousPatterns = [
      { pattern: /eval\s*\(/g, type: 'dynamic_execution', severity: 'high' as const },
      { pattern: /Function\s*\(/g, type: 'dynamic_execution', severity: 'high' as const },
      { pattern: /document\.write/g, type: 'dom_manipulation', severity: 'medium' as const },
      { pattern: /innerHTML\s*=/g, type: 'xss_risk', severity: 'medium' as const },
      { pattern: /fetch\s*\(/g, type: 'network_request', severity: 'low' as const },
      { pattern: /XMLHttpRequest/g, type: 'network_request', severity: 'low' as const },
      { pattern: /fs\./g, type: 'file_system', severity: 'medium' as const },
      { pattern: /require\s*\(\s*['"]child_process['"]/g, type: 'process_execution', severity: 'critical' as const },
    ];

    for (const { pattern, type, severity } of dangerousPatterns) {
      const matches = code.match(pattern);
      if (matches) {
        result.vulnerabilities.push({
          type,
          severity,
          description: `Potentially dangerous pattern detected: ${pattern.source}`,
          recommendation: `Review usage of ${type} and ensure it's necessary and secure`,
        });
        
        result.score -= severity === 'critical' ? 30 : severity === 'high' ? 20 : severity === 'medium' ? 10 : 5;
      }
    }

    // Check for obfuscation
    const obfuscationIndicators = [
      /\\x[0-9a-f]{2}/gi, // Hex encoded strings
      /\\u[0-9a-f]{4}/gi, // Unicode escaped strings
      /[a-zA-Z_$][a-zA-Z0-9_$]*\s*=\s*['"]\w{20,}['"]/g, // Long random strings
    ];

    for (const pattern of obfuscationIndicators) {
      if (pattern.test(code)) {
        result.obfuscated = true;
        result.score -= 15;
        result.vulnerabilities.push({
          type: 'obfuscation',
          severity: 'medium',
          description: 'Code appears to be obfuscated',
          recommendation: 'Review obfuscated code for malicious intent',
        });
        break;
      }
    }

    // Determine if code is safe
    result.safe = result.score >= 70 && !result.vulnerabilities.some(v => v.severity === 'critical');

    this.emit('scan:completed', pluginId, result);
    return result;
  }

  private async checkRuntimeSecurity(pluginId: string): Promise<void> {
    // Mock runtime security checks
    // In a real implementation, this would monitor actual resource usage
    
    const mockMemoryUsage = Math.random() * 150 * 1024 * 1024; // Random memory usage
    const mockCpuUsage = Math.random() * 100; // Random CPU usage
    
    if (mockMemoryUsage > this.policy.maxMemoryUsage) {
      const violation = new SecurityViolation(
        pluginId,
        SecurityViolationType.EXCESSIVE_MEMORY_USAGE,
        'high',
        `Memory usage exceeded limit: ${Math.round(mockMemoryUsage / 1024 / 1024)}MB > ${Math.round(this.policy.maxMemoryUsage / 1024 / 1024)}MB`
      );
      this.recordViolation(violation);
    }
    
    if (mockCpuUsage > this.policy.maxCpuUsage) {
      const violation = new SecurityViolation(
        pluginId,
        SecurityViolationType.EXCESSIVE_CPU_USAGE,
        'high',
        `CPU usage exceeded limit: ${Math.round(mockCpuUsage)}% > ${this.policy.maxCpuUsage}%`
      );
      this.recordViolation(violation);
    }
  }

  private recordViolation(violation: SecurityViolation): void {
    const existing = this.violations.get(violation.pluginId) || [];
    existing.push(violation);
    this.violations.set(violation.pluginId, existing);
    
    this.emit('violation:detected', violation);
    
    // Auto-quarantine for critical violations
    if (violation.severity === 'critical') {
      this.quarantinePlugin(violation.pluginId, violation.description);
      violation.blocked = true;
      this.emit('violation:blocked', violation);
    }
  }

  private async createSecurityAssessment(entry: PluginRegistryEntry): Promise<void> {
    const violations = this.getViolations(entry.id);
    const criticalCount = violations.filter(v => v.severity === 'critical').length;
    const highCount = violations.filter(v => v.severity === 'high').length;
    
    let riskLevel: PluginSecurityAssessment['riskLevel'] = 'low';
    if (criticalCount > 0) riskLevel = 'critical';
    else if (highCount > 2) riskLevel = 'high';
    else if (highCount > 0 || violations.length > 5) riskLevel = 'medium';

    const assessment: PluginSecurityAssessment = {
      pluginId: entry.id,
      riskLevel,
      vulnerabilities: violations.map(v => ({
        type: v.type,
        severity: v.severity,
        description: v.description,
      })),
      permissions: entry.metadata.permissions || [],
      sandboxViolations: violations.filter(v => 
        v.type === SecurityViolationType.UNAUTHORIZED_API_ACCESS ||
        v.type === SecurityViolationType.PERMISSION_VIOLATION
      ).length,
      lastAssessed: new Date(),
    };

    this.securityAssessments.set(entry.id, assessment);
  }

  private logAudit(pluginId: string, action: string, result: SecurityAuditLog['result'], details?: Record<string, any>): void {
    const entry: SecurityAuditLog = {
      timestamp: new Date(),
      pluginId,
      action,
      result,
      details: details || {},
    };

    this.auditLog.push(entry);
    
    // Keep only last 1000 entries
    if (this.auditLog.length > 1000) {
      this.auditLog.splice(0, this.auditLog.length - 1000);
    }
  }
}

/**
 * Security violation error class
 */
class SecurityViolation extends Error {
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
    this.name = 'SecurityViolation';
  }
}