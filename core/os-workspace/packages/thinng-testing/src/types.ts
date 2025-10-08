/**
 * @fileoverview Testing Framework Types
 * Comprehensive type definitions for Phase 5 testing infrastructure
 */

// Core testing types
export interface TestFrameworkConfig {
  phases: TestPhase[];
  performanceThresholds: PerformanceThresholds;
  integrationScenarios: IntegrationScenario[];
  reportingConfig: ReportingConfig;
  deploymentTargets: DeploymentTarget[];
}

export type TestPhase = 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'phase5';

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  phase: TestPhase;
  tests: TestCase[];
  setup?: () => Promise<void>;
  teardown?: () => Promise<void>;
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  category: TestCategory;
  priority: TestPriority;
  execute: () => Promise<TestResult>;
  timeout?: number;
  retries?: number;
  dependencies?: string[];
}

export type TestCategory = 
  | 'unit'
  | 'integration' 
  | 'performance'
  | 'regression'
  | 'deployment'
  | 'e2e';

export type TestPriority = 'critical' | 'high' | 'medium' | 'low';

export interface TestResult {
  testId: string;
  status: TestStatus;
  duration: number;
  message?: string;
  error?: Error;
  metrics?: TestMetrics;
  artifacts?: TestArtifact[];
}

export type TestStatus = 'passed' | 'failed' | 'skipped' | 'pending' | 'timeout';

export interface TestMetrics {
  performance?: PerformanceMetrics;
  memory?: MemoryMetrics;
  coverage?: CoverageMetrics;
  custom?: Record<string, number>;
}

export interface PerformanceMetrics {
  executionTime: number;
  throughput?: number;
  latency?: number;
  fps?: number;
  improvementFactor?: number;
}

export interface MemoryMetrics {
  heapUsed: number;
  heapTotal: number;
  external: number;
  arrayBuffers: number;
  peakUsage?: number;
  leakDetected?: boolean;
}

export interface CoverageMetrics {
  lines: number;
  functions: number;
  branches: number;
  statements: number;
  percentage: number;
}

export interface TestArtifact {
  type: ArtifactType;
  name: string;
  path: string;
  size: number;
  metadata?: Record<string, any>;
}

export type ArtifactType = 'screenshot' | 'video' | 'log' | 'report' | 'data' | 'benchmark';

// Performance testing types
export interface PerformanceThresholds {
  mathematicalOperations: {
    improvementFactor: number; // 3.2x minimum
    executionTime: number; // milliseconds
    accuracy: number; // 0.98 minimum
  };
  webglRendering: {
    frameRate: number; // 60fps minimum
    renderingThroughput: number;
    memoryUsage: number;
  };
  agentIntelligence: {
    decisionSpeed: number;
    patternRecognition: number;
    fuzzyLogicPrecision: number;
  };
  memoryManagement: {
    allocationReduction: number; // 60% minimum
    gcEfficiency: number;
    leakPrevention: number;
  };
}

export interface PerformanceRegressionTest {
  id: string;
  name: string;
  baseline: PerformanceBaseline;
  currentMetrics: PerformanceMetrics;
  threshold: number;
  status: RegressionStatus;
}

export interface PerformanceBaseline {
  phase: TestPhase;
  component: string;
  metrics: PerformanceMetrics;
  timestamp: number;
  version: string;
}

export type RegressionStatus = 'improved' | 'maintained' | 'degraded' | 'critical';

// Integration testing types
export interface IntegrationScenario {
  id: string;
  name: string;
  description: string;
  phases: TestPhase[];
  components: ComponentIntegration[];
  validationCriteria: ValidationCriteria;
}

export interface ComponentIntegration {
  component: string;
  dependencies: string[];
  interfaces: InterfaceDefinition[];
  expectedBehavior: string;
}

export interface InterfaceDefinition {
  name: string;
  type: 'api' | 'event' | 'data' | 'ui';
  specification: any;
  validationRules: ValidationRule[];
}

export interface ValidationRule {
  property: string;
  operator: 'equals' | 'greater' | 'less' | 'contains' | 'matches';
  expected: any;
  tolerance?: number;
}

export interface ValidationCriteria {
  functionalRequirements: string[];
  performanceRequirements: PerformanceRequirement[];
  qualityRequirements: QualityRequirement[];
}

export interface PerformanceRequirement {
  metric: string;
  threshold: number;
  comparison: 'minimum' | 'maximum' | 'target';
  tolerance: number;
}

export interface QualityRequirement {
  aspect: 'reliability' | 'maintainability' | 'usability' | 'security';
  criteria: string;
  measurement: string;
  target: number;
}

// Deployment testing types
export interface DeploymentTarget {
  name: string;
  platform: 'akash' | 'local' | 'staging' | 'production';
  configuration: DeploymentConfiguration;
  healthChecks: HealthCheck[];
  rollbackStrategy: RollbackStrategy;
}

export interface DeploymentConfiguration {
  resources: ResourceRequirements;
  networking: NetworkConfiguration;
  storage: StorageConfiguration;
  environment: EnvironmentVariables;
}

export interface ResourceRequirements {
  cpu: string;
  memory: string;
  storage: string;
  bandwidth?: string;
}

export interface NetworkConfiguration {
  ports: PortMapping[];
  domains: string[];
  ssl: boolean;
  loadBalancing?: LoadBalancingConfig;
}

export interface PortMapping {
  internal: number;
  external: number;
  protocol: 'tcp' | 'udp' | 'http' | 'https';
}

export interface StorageConfiguration {
  persistent: PersistentVolume[];
  temporary: TemporaryVolume[];
}

export interface PersistentVolume {
  name: string;
  size: string;
  mountPath: string;
  accessMode: 'ReadWriteOnce' | 'ReadOnlyMany' | 'ReadWriteMany';
}

export interface TemporaryVolume {
  name: string;
  size: string;
  mountPath: string;
}

export interface EnvironmentVariables {
  [key: string]: string;
}

export interface LoadBalancingConfig {
  strategy: 'round-robin' | 'least-connections' | 'ip-hash';
  healthCheck: string;
  timeout: number;
}

export interface HealthCheck {
  name: string;
  type: 'http' | 'tcp' | 'exec' | 'grpc';
  target: string;
  interval: number;
  timeout: number;
  retries: number;
  initialDelay?: number;
}

export interface RollbackStrategy {
  trigger: RollbackTrigger[];
  method: 'immediate' | 'gradual' | 'canary';
  timeoutMs: number;
  preserveData: boolean;
}

export interface RollbackTrigger {
  condition: string;
  threshold: number;
  duration: number;
}

// Reporting types
export interface ReportingConfig {
  formats: ReportFormat[];
  destinations: ReportDestination[];
  realTime: boolean;
  archival: ArchivalConfig;
}

export type ReportFormat = 'html' | 'json' | 'xml' | 'pdf' | 'markdown';

export interface ReportDestination {
  type: 'file' | 'email' | 'webhook' | 'dashboard';
  target: string;
  credentials?: any;
}

export interface ArchivalConfig {
  enabled: boolean;
  retention: number; // days
  compression: boolean;
  location: string;
}

export interface TestReport {
  id: string;
  timestamp: number;
  duration: number;
  summary: TestSummary;
  phases: PhaseReport[];
  performance: PerformanceReport;
  deployment: DeploymentReport;
  artifacts: TestArtifact[];
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  coverage: number;
  successRate: number;
}

export interface PhaseReport {
  phase: TestPhase;
  status: TestStatus;
  duration: number;
  testResults: TestResult[];
  coverage: CoverageMetrics;
  issues: TestIssue[];
}

export interface TestIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  message: string;
  location: string;
  recommendation: string;
}

export interface PerformanceReport {
  overall: PerformanceMetrics;
  phases: PhasePerformanceReport[];
  regressions: PerformanceRegressionTest[];
  improvements: PerformanceImprovement[];
}

export interface PhasePerformanceReport {
  phase: TestPhase;
  metrics: PerformanceMetrics;
  comparison: PerformanceComparison;
  bottlenecks: PerformanceBottleneck[];
}

export interface PerformanceComparison {
  baseline: PerformanceMetrics;
  current: PerformanceMetrics;
  improvement: number;
  status: RegressionStatus;
}

export interface PerformanceBottleneck {
  component: string;
  metric: string;
  impact: 'high' | 'medium' | 'low';
  recommendation: string;
}

export interface PerformanceImprovement {
  component: string;
  metric: string;
  improvement: number;
  significance: 'major' | 'minor' | 'negligible';
}

export interface DeploymentReport {
  targets: DeploymentTargetReport[];
  healthStatus: HealthStatus;
  costAnalysis: CostAnalysis;
  securityValidation: SecurityValidation;
}

export interface DeploymentTargetReport {
  target: string;
  status: 'success' | 'failed' | 'partial';
  duration: number;
  healthChecks: HealthCheckResult[];
  issues: DeploymentIssue[];
}

export interface HealthCheckResult {
  check: string;
  status: 'healthy' | 'unhealthy' | 'warning';
  latency: number;
  message?: string;
}

export interface DeploymentIssue {
  severity: 'critical' | 'warning' | 'info';
  component: string;
  message: string;
  resolution?: string;
}

export interface HealthStatus {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  components: ComponentHealth[];
  uptime: number;
  lastUpdate: number;
}

export interface ComponentHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: HealthCheckResult[];
  dependencies: string[];
}

export interface CostAnalysis {
  current: CostBreakdown;
  projected: CostBreakdown;
  savings: CostSavings;
  optimization: CostOptimization[];
}

export interface CostBreakdown {
  compute: number;
  storage: number;
  network: number;
  total: number;
  currency: string;
}

export interface CostSavings {
  amount: number;
  percentage: number;
  comparison: 'traditional_cloud' | 'previous_deployment';
}

export interface CostOptimization {
  recommendation: string;
  potential_savings: number;
  implementation_effort: 'low' | 'medium' | 'high';
}

export interface SecurityValidation {
  overall: 'secure' | 'concerns' | 'vulnerable';
  vulnerabilities: SecurityVulnerability[];
  compliance: ComplianceStatus[];
  recommendations: SecurityRecommendation[];
}

export interface SecurityVulnerability {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  description: string;
  mitigation: string;
  status: 'open' | 'mitigated' | 'accepted';
}

export interface ComplianceStatus {
  framework: string;
  status: 'compliant' | 'non_compliant' | 'partial';
  requirements: ComplianceRequirement[];
}

export interface ComplianceRequirement {
  id: string;
  description: string;
  status: 'met' | 'not_met' | 'partial';
  evidence?: string;
}

export interface SecurityRecommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  implementation: string;
}