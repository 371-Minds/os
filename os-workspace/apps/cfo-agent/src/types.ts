/**
 * CFO Agent (Maya) Type Definitions
 * 
 * Comprehensive type definitions for the CFO Agent's financial analysis capabilities,
 * task processing, and decision-making framework.
 */

// ============================================================================
// Core Agent Types
// ============================================================================

export interface AgentDefinition {
  agent_name: string;
  agent_type: string;
  core_instructions: string;
  personality_traits: string[];
  required_tools: string[];
  financial_domains?: Record<string, any>;
  decision_criteria?: Record<string, any>;
  escalation_criteria?: Record<string, any>;
  performance_targets?: Record<string, any>;
}

export interface AgentStatus {
  name: string;
  type: string;
  status: 'operational' | 'maintenance' | 'offline';
  capabilities: string[];
  performance: PerformanceMetrics;
  version: string;
  lastUpdate: string;
}

export interface PerformanceMetrics {
  tasksProcessed: number;
  averageResponseTime: number;
  successRate: number;
  escalationRate: number;
  accuracyRate?: number;
}

// ============================================================================
// Financial Task Types
// ============================================================================

export interface FinancialTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: 'low' | 'medium' | 'high' | 'critical';
  requestedBy: string;
  createdAt: Date;
  metadata?: Record<string, any>;
  attachments?: TaskAttachment[];
}

export type TaskCategory = 
  | 'budget_analysis'
  | 'cost_optimization' 
  | 'roi_assessment'
  | 'financial_reporting'
  | 'revenue_forecasting'
  | 'cash_flow_analysis'
  | 'investment_evaluation'
  | 'risk_assessment';

export interface TaskAttachment {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  url?: string;
  data?: Buffer;
}

// ============================================================================
// Analysis and Processing Types
// ============================================================================

export interface TaskAnalysis {
  category: TaskCategory;
  complexity: ComplexityLevel;
  confidence: number;
  riskAssessment: RiskAssessment;
  processingStrategy: ProcessingStrategy;
  estimatedTime: number;
  requiredData: string[];
  keywords: string[];
}

export interface ComplexityLevel {
  level: 'low' | 'medium' | 'high';
  factors: string[];
  description: string;
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  financialImpact: 'minimal' | 'moderate' | 'significant';
  businessImpact: 'minimal' | 'moderate' | 'significant';
  riskFactors: string[];
  mitigationStrategies: string[];
}

export interface ProcessingStrategy {
  approach: 'standard' | 'enhanced' | 'comprehensive';
  steps: string[];
  validationRequired: boolean;
  stakeholderReview: boolean;
}

// ============================================================================
// Financial Analysis Results
// ============================================================================

export interface ProcessingResult {
  taskId: string;
  category: TaskCategory;
  status: 'completed' | 'failed' | 'escalated';
  result: BudgetAnalysis | CostOptimization | ROIAssessment | FinancialReport | RevenueForecast;
  analysis: TaskAnalysis;
  metadata: ResultMetadata;
}

export interface ResultMetadata {
  processingTime: number;
  confidence: number;
  escalated: boolean;
  version: string;
  timestamp: Date;
  dataQuality?: DataQualityScore;
  validationStatus?: ValidationStatus;
}

export interface DataQualityScore {
  completeness: number;
  accuracy: number;
  timeliness: number;
  consistency: number;
  overall: number;
}

export interface ValidationStatus {
  validated: boolean;
  validatedBy?: string;
  validatedAt?: Date;
  validationNotes?: string;
}

// ============================================================================
// Budget Analysis Types
// ============================================================================

export interface BudgetAnalysis {
  taskId: string;
  budgetPeriod: string;
  totalBudget: number;
  actualSpending: number;
  budgetPerformance: BudgetPerformance;
  varianceAnalysis: VarianceAnalysis;
  optimizationOpportunities: OptimizationOpportunity[];
  recommendations: BudgetRecommendation[];
  forecastAdjustments: ForecastAdjustment[];
}

export interface BudgetPerformance {
  actualVsBudget: number;
  variancePercentage: number;
  varianceAmount: number;
  trendAnalysis: string;
  performanceRating: 'excellent' | 'good' | 'acceptable' | 'concerning' | 'critical';
}

export interface VarianceAnalysis {
  positiveVariances: VarianceItem[];
  negativeVariances: VarianceItem[];
  significantVariances: VarianceItem[];
  rootCauseAnalysis: string[];
}

export interface VarianceItem {
  category: string;
  budgetAmount: number;
  actualAmount: number;
  variance: number;
  variancePercentage: number;
  explanation: string;
  impact: 'low' | 'medium' | 'high';
}

export interface BudgetRecommendation {
  priority: 'high' | 'medium' | 'low';
  action: string;
  expectedImpact: number;
  timeframe: string;
  implementation: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ForecastAdjustment {
  category: string;
  currentForecast: number;
  adjustedForecast: number;
  adjustment: number;
  reasoning: string;
  confidenceLevel: number;
}

// ============================================================================
// Cost Optimization Types
// ============================================================================

export interface CostOptimization {
  taskId: string;
  analysisScope: string;
  totalCosts: number;
  optimizationOpportunities: OptimizationOpportunity[];
  implementationPlan: ImplementationPlan;
  riskAssessment: OptimizationRisk[];
  expectedSavings: SavingsProjection;
  timelineProjections: TimelineProjection[];
}

export interface OptimizationOpportunity {
  id: string;
  category: string;
  description: string;
  currentCost: number;
  optimizedCost: number;
  savingsPotential: number;
  savingsPercentage: number;
  implementationComplexity: 'low' | 'medium' | 'high';
  riskLevel: 'low' | 'medium' | 'high';
  paybackPeriod: number;
  confidence: number;
}

export interface ImplementationPlan {
  phases: ImplementationPhase[];
  totalDuration: number;
  totalInvestment: number;
  resourceRequirements: ResourceRequirement[];
  dependencies: string[];
  criticalSuccess: string[];
}

export interface ImplementationPhase {
  phase: number;
  name: string;
  duration: number;
  investment: number;
  expectedSavings: number;
  activities: string[];
  milestones: string[];
  risks: string[];
}

export interface ResourceRequirement {
  type: 'human' | 'technology' | 'financial';
  description: string;
  quantity: number;
  duration: number;
  cost: number;
}

export interface OptimizationRisk {
  category: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
  contingency: string;
}

export interface SavingsProjection {
  year1: number;
  year2: number;
  year3: number;
  total: number;
  netPresentValue: number;
  internalRateOfReturn: number;
}

export interface TimelineProjection {
  period: string;
  savings: number;
  cumulativeSavings: number;
  confidence: number;
}

// ============================================================================
// ROI Assessment Types
// ============================================================================

export interface ROIAssessment {
  taskId: string;
  investmentAmount: number;
  investmentDescription: string;
  financialMetrics: FinancialMetrics;
  riskAnalysis: InvestmentRisk;
  scenarios: ROIScenario[];
  recommendation: InvestmentRecommendation;
  sensitivity: SensitivityAnalysis;
}

export interface FinancialMetrics {
  roi: number;
  npv: number;
  irr: number;
  paybackPeriod: number;
  discountedPaybackPeriod: number;
  profitabilityIndex: number;
  breakEvenPoint: number;
}

export interface InvestmentRisk {
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: RiskFactor[];
  mitigationStrategies: string[];
  contingencyPlans: string[];
  riskAdjustedReturn: number;
}

export interface RiskFactor {
  factor: string;
  probability: number;
  impact: number;
  description: string;
  mitigation: string;
}

export interface ROIScenario {
  name: string;
  probability: number;
  investment: number;
  returns: number[];
  roi: number;
  npv: number;
  description: string;
}

export interface InvestmentRecommendation {
  decision: 'approve' | 'reject' | 'modify' | 'defer';
  reasoning: string[];
  conditions: string[];
  alternatives: string[];
  confidence: number;
  expectedOutcome: string;
}

export interface SensitivityAnalysis {
  variables: SensitivityVariable[];
  scenarioMatrix: ScenarioResult[][];
  keyDrivers: string[];
  riskFactors: string[];
}

export interface SensitivityVariable {
  name: string;
  baseCase: number;
  optimistic: number;
  pessimistic: number;
  impact: 'low' | 'medium' | 'high';
}

export interface ScenarioResult {
  variable: string;
  change: number;
  roiImpact: number;
  npvImpact: number;
}

// ============================================================================
// Financial Reporting Types
// ============================================================================

export interface FinancialReport {
  taskId: string;
  reportType: ReportType;
  reportPeriod: string;
  executiveSummary: ExecutiveSummary;
  keyMetrics: FinancialKPI[];
  detailedAnalysis: DetailedAnalysis;
  trends: TrendAnalysis[];
  benchmarks: BenchmarkComparison[];
  recommendations: string[];
}

export type ReportType = 
  | 'profit_loss'
  | 'cash_flow'
  | 'balance_sheet'
  | 'variance_report'
  | 'performance_dashboard'
  | 'executive_summary';

export interface ExecutiveSummary {
  keyHighlights: string[];
  majorConcerns: string[];
  actionItems: string[];
  overallPerformance: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'critical';
}

export interface FinancialKPI {
  name: string;
  value: number;
  target: number;
  variance: number;
  trend: 'improving' | 'stable' | 'declining';
  benchmark: number;
  description: string;
}

export interface DetailedAnalysis {
  revenue: RevenueAnalysis;
  expenses: ExpenseAnalysis;
  profitability: ProfitabilityAnalysis;
  cashFlow: CashFlowAnalysis;
  efficiency: EfficiencyAnalysis;
}

export interface RevenueAnalysis {
  totalRevenue: number;
  revenueGrowth: number;
  revenueByStream: RevenueStream[];
  seasonality: SeasonalityPattern[];
  forecast: number[];
}

export interface RevenueStream {
  name: string;
  amount: number;
  percentage: number;
  growth: number;
  trend: 'growing' | 'stable' | 'declining';
}

export interface SeasonalityPattern {
  period: string;
  multiplier: number;
  confidence: number;
}

export interface ExpenseAnalysis {
  totalExpenses: number;
  expenseGrowth: number;
  expenseByCategory: ExpenseCategory[];
  costStructure: CostStructure;
  efficiency: number;
}

export interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  variance: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface CostStructure {
  fixedCosts: number;
  variableCosts: number;
  fixedPercentage: number;
  variablePercentage: number;
  operatingLeverage: number;
}

export interface ProfitabilityAnalysis {
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  ebitda: number;
  ebitdaMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
}

export interface CashFlowAnalysis {
  operatingCashFlow: number;
  freeCashFlow: number;
  cashConversionCycle: number;
  workingCapital: number;
  cashBurn: number;
  runway: number;
}

export interface EfficiencyAnalysis {
  revenuePerEmployee: number;
  assetTurnover: number;
  inventoryTurnover: number;
  receivablesTurnover: number;
  payablesTurnover: number;
}

export interface TrendAnalysis {
  metric: string;
  trend: 'upward' | 'downward' | 'stable' | 'volatile';
  periodOverPeriod: number;
  yearOverYear: number;
  forecast: number[];
  confidence: number;
}

export interface BenchmarkComparison {
  metric: string;
  companyValue: number;
  industryAverage: number;
  topQuartile: number;
  percentile: number;
  performance: 'above' | 'at' | 'below';
}

// ============================================================================
// Revenue Forecasting Types
// ============================================================================

export interface RevenueForecast {
  taskId: string;
  forecastPeriod: string;
  methodology: ForecastMethodology;
  baseline: BaselineProjection;
  scenarios: ForecastScenario[];
  drivers: RevenueDriver[];
  assumptions: ForecastAssumption[];
  accuracy: ForecastAccuracy;
  recommendations: ForecastRecommendation[];
}

export interface ForecastMethodology {
  primaryMethod: string;
  supportingMethods: string[];
  dataSource: string[];
  timeHorizon: string;
  updateFrequency: string;
  confidence: number;
}

export interface BaselineProjection {
  currentRevenue: number;
  projectedRevenue: number[];
  growthRate: number[];
  seasonalAdjustments: number[];
  trend: 'linear' | 'exponential' | 'cyclical' | 'declining';
}

export interface ForecastScenario {
  name: string;
  probability: number;
  revenue: number[];
  growthRate: number[];
  keyAssumptions: string[];
  description: string;
}

export interface RevenueDriver {
  name: string;
  impact: 'high' | 'medium' | 'low';
  currentValue: number;
  projectedValue: number[];
  elasticity: number;
  confidence: number;
}

export interface ForecastAssumption {
  category: string;
  assumption: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ForecastAccuracy {
  historicalAccuracy: number;
  confidenceInterval: number;
  marginOfError: number;
  trackingMetrics: TrackingMetric[];
}

export interface TrackingMetric {
  metric: string;
  actual: number;
  forecast: number;
  variance: number;
  accuracy: number;
}

export interface ForecastRecommendation {
  type: 'strategic' | 'operational' | 'tactical';
  recommendation: string;
  rationale: string;
  expectedImpact: number;
  timeframe: string;
  priority: 'high' | 'medium' | 'low';
}

// ============================================================================
// Health Check and Monitoring Types
// ============================================================================

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: HealthCheck[];
  overall: boolean;
  timestamp: Date;
}

export interface HealthCheck {
  component: string;
  status: boolean;
  message: string;
  responseTime?: number;
  details?: Record<string, any>;
}

// ============================================================================
// Router Integration Types
// ============================================================================

export interface RouterRegistration {
  agentId: string;
  capabilities: AgentCapability[];
  availability: AvailabilityStatus;
  performance: PerformanceProfile;
  specializations: string[];
}

export interface AgentCapability {
  domain: string;
  skills: string[];
  confidence: number;
  complexity: string[];
  responseTime: number;
}

export interface AvailabilityStatus {
  available: boolean;
  capacity: number;
  currentLoad: number;
  estimatedWait: number;
  maintenanceWindow?: MaintenanceWindow;
}

export interface MaintenanceWindow {
  start: Date;
  end: Date;
  reason: string;
  impact: 'none' | 'reduced' | 'unavailable';
}

export interface PerformanceProfile {
  averageResponseTime: number;
  successRate: number;
  throughput: number;
  reliability: number;
  accuracy: number;
}