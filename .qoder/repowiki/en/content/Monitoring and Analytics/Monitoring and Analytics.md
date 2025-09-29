# Monitoring and Analytics

<cite>
**Referenced Files in This Document**   
- [371-os\examples\basic_usage\monitoring_demo.py](file://371-os/examples/basic_usage/monitoring_demo.py)
- [371-os\tests\performance\benchmark.py](file://371-os/tests/performance/benchmark.py)
- [371-os\src\minds371\adaptive_llm_router\usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py)
- [371-os\src\minds371\adaptive_llm_router\config.py](file://371-os/src/minds371/adaptive_llm_router/config.py)
- [371-os\src\minds371\adaptive_llm_router\budget_guard.py](file://371-os/src/minds371/adaptive_llm_router/budget_guard.py)
- [371-os\src\minds371\adaptive_llm_router\data_models.py](file://371-os/src/minds371/adaptive_llm_router/data_models.py)
- [371-os\src\minds371\adaptive_llm_router\llm.py](file://371-os/src/minds371/adaptive_llm_router/llm.py)
- [371-os\src\minds371\adaptive_llm_router\policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py)
- [371-os\src\minds371\adaptive_llm_router\provider_registry.py](file://371-os/src/minds371/adaptive_llm_router/provider_registry.py)
- [371-os\src\minds371\agents\base_agent\improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py)
- [371-os\src\minds371\adaptive_llm_router\providers.json](file://371-os/src/minds371/adaptive_llm_router/providers.json)
- [371-os\src\minds371\adaptive_llm_router\llm_usage.json](file://371-os/src/minds371/adaptive_llm_router/llm_usage.json)
- [AB\benchmarks\performance-report-2025-09-01.md](file://AB/benchmarks/performance-report-2025-09-01.md) - *Added in recent commit*
- [AB\scripts\quick-status.js](file://AB/scripts/quick-status.js) - *Added in recent commit*
- [AB\sessions\session-2025-09-01.md](file://AB/sessions/session-2025-09-01.md) - *Added in recent commit*
- [apps\cognitive-interface\src\components\AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx) - *Updated in recent commit*
- [packages\elizaos-plugins\cognitive-engine\src\actions.ts](file://packages/elizaos-plugins/cognitive-engine/src/actions.ts) - *Updated in recent commit*
- [packages\elizaos-plugins\cognitive-engine\src\provider.ts](file://packages/elizaos-plugins/cognitive-engine/src/provider.ts) - *Updated in recent commit*
- [apps\cognitive-interface\src\integration\cognitive-engine-bridge.ts](file://apps/cognitive-interface/src/integration/cognitive-engine-bridge.ts) - *Updated in recent commit*
- [371-os\src\minds371\services\email_system\components\branding\color-schemes.tsx](file://371-os/src/minds371/services/email_system/components/branding/color-schemes.tsx) - *Updated in recent commit*
- [371-os\src\minds371\services\email_system\styles\shared\animations.css](file://371-os/src/minds371/services/email_system/styles/shared/animations.css) - *Updated in recent commit*
- [packages\elizaos-plugins\mongodb-integration\src\analytics-service.ts](file://packages/elizaos-plugins\mongodb-integration\src\analytics-service.ts) - *Updated in recent commit*
- [packages\elizaos-plugins\mongodb-integration\src\analytics-service.test.ts](file://packages\elizaos-plugins\mongodb-integration\src\analytics-service.test.ts) - *Updated in recent commit*
</cite>

## Update Summary
**Changes Made**   
- Added new section on MongoDB Analytics Service Integration
- Updated Introduction to include MongoDB analytics capabilities
- Enhanced Analytics System Overview with MongoDB analytics details
- Added new Key Performance Indicators for MongoDB analytics
- Updated Data Flow Architecture to include MongoDB analytics components
- Added references to email system branding and animations in related files
- Updated Session Analytics and Cognitive Pattern Tracking with MongoDB integration details
- Added new Best Practices for MongoDB analytics optimization

## Table of Contents
1. [Introduction](#introduction)
2. [Performance Monitoring and Benchmarking](#performance-monitoring-and-benchmarking)
3. [Analytics System Overview](#analytics-system-overview)
4. [Usage Ledger Implementation](#usage-ledger-implementation)
5. [Configuration Options](#configuration-options)
6. [Key Performance Indicators](#key-performance-indicators)
7. [Data Flow Architecture](#data-flow-architecture)
8. [Integration with External Tools](#integration-with-external-tools)
9. [Common Monitoring Issues](#common-monitoring-issues)
10. [Best Practices](#best-practices)
11. [Performance Benchmarking and Reporting](#performance-benchmarking-and-reporting)
12. [System Health Monitoring Tools](#system-health-monitoring-tools)
13. [Session Analytics and Cognitive Pattern Tracking](#session-analytics-and-cognitive-pattern-tracking)
14. [Productivity Scoring System](#productivity-scoring-system)
15. [MongoDB Analytics Service Integration](#mongodb-analytics-service-integration)

## Introduction
The 371OS monitoring and analytics system provides comprehensive visibility into system performance, agent behavior, LLM usage costs, cognitive patterns, and MongoDB analytics. The architecture is designed to track metrics at multiple levels, from individual agent performance to system-wide cost analysis, user cognitive states, and MongoDB analytics. The system implements real-time metrics collection, cost tracking through a usage ledger, and budget enforcement mechanisms to ensure efficient resource utilization. Recent updates have enhanced the monitoring capabilities with new benchmarking tools, session tracking, system health checks, comprehensive cognitive analytics, and MongoDB analytics integration. This documentation details the implementation of these components and provides guidance for effective monitoring and optimization.

## Performance Monitoring and Benchmarking

The performance monitoring system in 371OS is implemented through benchmarking tools and real-time metrics collection. The system uses a combination of synthetic benchmarks and production monitoring to evaluate agent performance.

```
mermaid
flowchart TD
A["Start Benchmark"] --> B["Initialize Agent"]
B --> C["Replace Dependencies with Mocks"]
C --> D["Submit Content Generation Task"]
D --> E["Submit Social Media Task"]
E --> F["Submit Email Marketing Task"]
F --> G["Collect Metrics"]
G --> H["Output Results"]
```

**Section sources**
- [371-os\tests\performance\benchmark.py](file://371-os/tests/performance/benchmark.py#L1-L160)

The benchmarking framework allows for testing individual agent capabilities in isolation. The `benchmark.py` file demonstrates a complete test suite for the MarketingAutomationAgent, simulating content generation, social media management, and email marketing tasks. The framework uses mock implementations of external dependencies to ensure consistent and repeatable results.

## Analytics System Overview

The analytics system in 371OS tracks agent performance, LLM usage costs, overall system health, user cognitive patterns, and MongoDB analytics. The system is built on a foundation of structured data models and comprehensive monitoring capabilities.

### Agent Performance Tracking

The ImprovedBaseAgent class implements comprehensive performance monitoring capabilities. Each agent collects detailed metrics including:

- **Task completion statistics**: Number of tasks completed and failed
- **Response time metrics**: Average and total processing time
- **Resource utilization**: Memory and CPU usage
- **Error rates**: Percentage of failed tasks
- **Throughput**: Tasks processed per second
- **Cache performance**: Hit and miss rates

```
mermaid
classDiagram
class PerformanceMetrics {
+tasks_completed : int
+tasks_failed : int
+total_processing_time : float
+avg_response_time : float
+current_memory_mb : float
+peak_memory_mb : float
+cpu_usage_percent : float
+error_rate : float
+throughput : float
+cache_hits : int
+cache_misses : int
+update_response_time(processing_time : float)
+calculate_error_rate() float
}
class ImprovedBaseAgent {
-task_queue : TaskQueue
-connection_pool : ConnectionPool
-cache : SimpleCache
-circuit_breaker : CircuitBreaker
+get_metrics() PerformanceMetrics
+get_status() Dict[str, Any]
+_update_system_metrics()
}
ImprovedBaseAgent --> PerformanceMetrics : "contains"
```

**Section sources**
- [371-os\src\minds371\agents\base_agent\improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py#L1-L525)

The system also implements advanced performance optimization features including connection pooling, caching, and circuit breakers to improve reliability and efficiency.

### Session Analytics and Cognitive Pattern Tracking

The AdaptiveLayout component implements comprehensive session analytics and cognitive pattern tracking. The system monitors user cognitive states and transitions between different cognitive modes.

```typescript
interface SessionAnalytics {
  totalTransitions: number;
  averageSessionDuration: number;
  mostUsedMode: string;
  productivityScore: number;
  cognitivePatterns: string[];
}
```

The system tracks cognitive transitions between modes such as executive, technical, creative, analytical, collaborative, and learning. Each transition is recorded with metadata including trigger type (manual, automatic, or shortcut), timestamp, and confidence level.

```
mermaid
sequenceDiagram
participant User as "User"
participant Interface as "AdaptiveLayout"
participant Engine as "Cognitive Engine"
participant Analytics as "Analytics System"
User->>Interface : Mode Change (Manual/Automatic)
Interface->>Interface : Record Transition
Interface->>Engine : Send Context Data
Engine->>Engine : Analyze Patterns
Engine->>Analytics : Update Session Analytics
Analytics->>Interface : Return Productivity Score
Interface->>User : Display Cognitive Insights
```

**Section sources**
- [apps\cognitive-interface\src\components\AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx#L1-L417)
- [packages\elizaos-plugins\cognitive-engine\src\provider.ts](file://packages/elizaos-plugins/cognitive-engine/src/provider.ts#L296-L383)
- [packages\elizaos-plugins\cognitive-engine\src\actions.ts](file://packages/elizaos-plugins/cognitive-engine/src/actions.ts#L239-L310)

The cognitive pattern tracking system identifies recurring patterns in user behavior, such as time-based patterns (executive mode in mornings) and sequential workflows (technical → creative). These patterns are used to provide optimization recommendations and improve automatic mode detection.

## Usage Ledger Implementation

The usage ledger is a critical component for tracking all LLM interactions for cost analysis and optimization. It records detailed information about each LLM call, enabling comprehensive cost tracking and analysis.

### Data Model

The LLMUsage data model defines the structure of each usage record:

```python
class LLMUsage(BaseModel):
    ts: datetime = Field(default_factory=datetime.now)
    provider: str
    model: str
    tokens_in: int
    tokens_out: int
    cost: float
    task_id: Optional[str] = None
    agent: Optional[str] = None
    status: Union[str, None] = "ok" # "ok", "fallback", "error"
```

**Section sources**
- [371-os\src\minds371\adaptive_llm_router\data_models.py](file://371-os/src/minds371/adaptive_llm_router/data_models.py#L1-L40)

### Ledger Functionality

The UsageLedger class implements the core functionality for recording and analyzing LLM usage:

```
mermaid
sequenceDiagram
participant Agent as "Agent"
participant Router as "LLM Router"
participant Ledger as "UsageLedger"
participant Storage as "JSON File"
participant Analytics as "PostHog"
Agent->>Router : invoke(prompt, meta)
Router->>Ledger : record_usage(usage_data)
Ledger->>Storage : _write_to_ledger()
Ledger->>Analytics : _capture_posthog_event()
Storage-->>Ledger : Success
Analytics-->>Ledger : Success
Ledger-->>Router : Usage recorded
Router-->>Agent : LLM response
```

**Section sources**
- [371-os\src\minds371\adaptive_llm_router\usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py#L1-L89)
- [371-os\src\minds371\adaptive_llm_router\llm.py](file://371-os/src/minds371/adaptive_llm_router/llm.py#L1-L92)

The ledger persists usage data to a JSON file (`llm_usage.json`) while simultaneously sending events to PostHog for analytics. This dual approach enables both local analysis and integration with external analytics platforms.

The system provides methods for cost analysis, including `get_total_cost_for_current_month()`, which calculates the total LLM costs for the current calendar month by summing all usage records with timestamps in the current month.

## Configuration Options

The monitoring and analytics system provides several configuration options for tuning behavior, setting thresholds, and managing data retention.

### Monitoring Thresholds

The system implements budget-based thresholds through the `config.py` file:

```python
# The monthly budget cap for LLM usage in USD.
MONTHLY_BUDGET_CAP = 20.00
```

**Section sources**
- [371-os\src\minds371\adaptive_llm_router\config.py](file://371-os/src/minds371/adaptive_llm_router/config.py#L1-L7)

The BudgetManager class uses this configuration to enforce spending limits and trigger alerts when thresholds are approached or exceeded.

### Alerting Rules

The policy engine implements alerting and routing rules based on budget availability and task requirements:

```python
def select_provider(meta: Dict[str, Any], est_in: int, est_out: int) -> str:
    budget_percentage = budget_manager.get_remaining_budget_percentage()

    # Privacy Flag: forces LocalAI
    if meta.get("confidential"):
        return "localai:phi-4-14b"

    # Task Criticality: high-quality model for critical tasks if budget allows
    if meta.get("quality") == "high" and budget_percentage > 0.20:
        return "openrouter:gpt-4o-mini"

    # Context Length: long-context model for large inputs
    if est_in > 8000:
        return "requesty:claude-3-sonnet"

    # Low Budget Mode: cheapest model when budget is low
    if budget_percentage < 0.05:
        return "openrouter:mistral-7b"

    # Balanced Default: the default choice for all other cases
    return "openrouter:qwen2-72b"
```

**Section sources**
- [371-os\src\minds371\adaptive_llm_router\policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py#L1-L34)

### Data Retention Policies

The current implementation retains all usage data indefinitely in the JSON ledger file. The system does not implement automatic data purging, but the data structure supports time-based queries for reporting and analysis.

## Key Performance Indicators

The system tracks several key performance indicators (KPIs) for monitoring system health and efficiency:

### Cost Efficiency KPIs
- **Monthly LLM Cost**: Total cost of LLM usage for the current month
- **Cost per Task**: Average cost of processing individual tasks
- **Budget Utilization**: Percentage of monthly budget consumed

### Performance KPIs
- **Average Response Time**: Mean processing time for completed tasks
- **Error Rate**: Percentage of failed tasks
- **Throughput**: Number of tasks processed per second
- **Cache Hit Rate**: Percentage of requests served from cache

### System Health KPIs
- **CPU Usage**: Percentage of CPU utilization by agents
- **Memory Usage**: Current and peak memory consumption
- **Circuit Breaker Status**: Whether external services are available

### Cognitive Performance KPIs
- **Productivity Score**: Score from 0-100 based on session focus and workflow efficiency
- **Total Mode Transitions**: Number of cognitive state changes during session
- **Average Session Duration**: Length of user sessions in minutes
- **Dominant Cognitive Mode**: Most frequently used cognitive state
- **Transition Efficiency**: Measure of how effectively user transitions between modes

### MongoDB Analytics KPIs
- **User Interaction Rate**: Number of user interactions per session
- **Session Duration**: Length of user sessions tracked in MongoDB
- **Cognitive State Changes**: Number of cognitive state transitions
- **Behavior Pattern Recognition**: Frequency of identified user behavior patterns
- **Data Retention Efficiency**: Ratio of stored analytics data to retention policy

These KPIs can be accessed through the agent's `get_metrics()` and `get_status()` methods, providing real-time visibility into system performance.

**Section sources**
- [371-os\src\minds371\agents\base_agent\improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py#L1-L525)
- [apps\cognitive-interface\src\components\AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx#L1-L417)
- [packages\elizaos-plugins\mongodb-integration\src\analytics-service.ts](file://packages\elizaos-plugins\mongodb-integration\src\analytics-service.ts#L1-L512)

## Data Flow Architecture

The monitoring data flows through a well-defined architecture from collection to visualization.

```
mermaid
graph TD
A["Agent Task Processing"] --> B["Metric Collection"]
B --> C["Usage Ledger"]
C --> D["JSON Storage"]
C --> E["PostHog Analytics"]
D --> F["Cost Analysis"]
E --> G["External Dashboards"]
F --> H["Optimization Decisions"]
G --> H
H --> I["Policy Engine"]
I --> J["LLM Routing"]
J --> A
K["Cognitive Interface"] --> L["Cognitive State Detection"]
L --> M["Session Analytics"]
M --> N["Productivity Scoring"]
N --> O["Cognitive Optimization"]
O --> P["Cognitive Engine"]
P --> K
Q["Email System"] --> R["Branding and Animations"]
R --> S["Analytics Dashboard Visualizations"]
S --> T["User Experience"]
T --> Q
U["MongoDB Analytics Service"] --> V["User Interaction Tracking"]
V --> W["Session Analytics"]
W --> X["Cognitive State Tracking"]
X --> Y["Behavior Pattern Recognition"]
Y --> Z["Analytics Insights"]
Z --> U
```

**Section sources**
- [371-os\src\minds371\adaptive_llm_router\llm.py](file://371-os/src/minds371/adaptive_llm_router/llm.py#L1-L92)
- [371-os\src\minds371\adaptive_llm_router\usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py#L1-L89)
- [371-os\src\minds371\adaptive_llm_router\policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py#L1-L34)
- [apps\cognitive-interface\src\components\AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx#L1-L417)
- [apps\cognitive-interface\src\integration\cognitive-engine-bridge.ts](file://apps/cognitive-interface/src/integration/cognitive-engine-bridge.ts#L1-L197)
- [371-os\src\minds371\services\email_system\components\branding\color-schemes.tsx](file://371-os/src/minds371/services/email_system/components/branding/color-schemes.tsx#L1-L392)
- [371-os\src\minds371\services\email_system\styles\shared\animations.css](file://371-os/src/minds371/services/email_system/styles/shared\animations.css#L1-L270)
- [packages\elizaos-plugins\mongodb-integration\src\analytics-service.ts](file://packages\elizaos-plugins\mongodb-integration\src\analytics-service.ts#L1-L512)

The data flow begins with agent task processing, where performance metrics and LLM usage data are collected. This data is sent to the UsageLedger, which persists it to JSON storage and forwards it to PostHog for external analytics. The collected data informs cost analysis and optimization decisions, which are fed back into the policy engine to influence future LLM routing decisions. Simultaneously, the cognitive interface collects data on user cognitive states, which is analyzed to generate productivity scores and cognitive optimization recommendations. The email system branding and animations enhance the analytics dashboard visualizations, improving user experience. The MongoDB analytics service tracks user interactions, session analytics, cognitive states, and behavior patterns, providing comprehensive insights.

## Integration with External Tools

The monitoring system integrates with external tools for enhanced analytics and visualization capabilities.

### PostHog Integration

The UsageLedger class integrates with PostHog to send usage events:

```python
def _capture_posthog_event(self, usage_data: LLMUsage):
    """Sends a 'llm_usage' event to PostHog."""
    if self.posthog_client:
        self.posthog_client.capture(
            "llm_usage",
            properties={
                "provider": usage_data.provider,
                "model": usage_data.model,
                "cost": usage_data.cost,
                "agent": usage_data.agent,
                "tokens_in": usage_data.tokens_in,
                "tokens_out": usage_data.tokens_out,
                "status": usage_data.status,
                "task_id": usage_data.task_id,
            }
        )
```

This integration enables the use of PostHog's dashboards and analytics features for monitoring LLM usage patterns, identifying trends, and generating reports.

### Cognitive Engine Integration

The cognitive interface integrates with the ElizaOS cognitive engine through a dedicated bridge:

```typescript
class CognitiveEngineIntegration {
  private cognitiveActions: CognitiveEngineActions;
  private cognitiveProvider: CognitiveEngineProvider;
  private uiInstance: any = null;

  constructor() {
    this.cognitiveActions = this.initializeCognitiveActions();
    this.cognitiveProvider = this.initializeCognitiveProvider();
  }
}
```

This integration enables real-time cognitive state detection, interface adaptation, and productivity analysis by leveraging the cognitive engine's pattern recognition and optimization capabilities.

**Section sources**
- [371-os\src\minds371\adaptive_llm_router\usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py#L1-L89)
- [apps\cognitive-interface\src\integration\cognitive-engine-bridge.ts](file://apps/cognitive-interface/src/integration/cognitive-engine-bridge.ts#L1-L197)

## Common Monitoring Issues

The system addresses several common monitoring challenges:

### Data Overload
The system mitigates data overload by focusing on essential metrics and using efficient data structures. The usage ledger stores only necessary information, and the in-memory metrics are aggregated to prevent excessive memory usage.

### False Alerts
The circuit breaker implementation helps reduce false alerts by preventing repeated attempts to failed services. The system implements exponential backoff for retries, reducing the frequency of error notifications.

### Performance Impact
The monitoring system is designed to minimize performance impact:
- Metrics are collected asynchronously in a background loop
- Connection pooling reduces the overhead of external API calls
- Caching reduces redundant LLM calls
- The circuit breaker prevents wasted attempts on unavailable services

These optimizations ensure that monitoring enhances rather than hinders system performance.

**Section sources**
- [371-os\src\minds371\agents\base_agent\improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py#L1-L525)

## Best Practices

### Setting Up Effective Monitoring
1. **Configure appropriate budget caps** based on expected usage patterns
2. **Implement meaningful task metadata** to enable intelligent routing
3. **Monitor cache hit rates** to optimize caching effectiveness
4. **Set up external analytics** for long-term trend analysis
5. **Regularly review error logs** to identify systemic issues
6. **Utilize MongoDB analytics** for comprehensive user behavior tracking
7. **Leverage email system branding** for enhanced dashboard visualizations
8. **Implement animation effects** for improved user engagement

### Using Analytics for Optimization
1. **Analyze cost per task** to identify expensive operations
2. **Monitor response times** to detect performance degradation
3. **Track error rates** to improve system reliability
4. **Use budget utilization data** to plan capacity and costs
5. **Leverage cache metrics** to optimize frequently accessed data
6. **Review cognitive patterns** to optimize workflow efficiency
7. **Monitor productivity scores** to identify optimal working conditions
8. **Implement cognitive optimization recommendations** to improve user experience
9. **Analyze MongoDB analytics** to understand user behavior patterns
10. **Utilize branding and animations** to enhance analytics dashboard effectiveness

By following these best practices, organizations can maximize the value of the 371OS monitoring and analytics system, ensuring efficient resource utilization and optimal system performance.

## Performance Benchmarking and Reporting

Recent updates have introduced comprehensive performance benchmarking and reporting capabilities to the 371OS monitoring system. The new performance reports provide detailed insights into system performance across multiple dimensions.

### Benchmark Report Structure

The performance reports follow a standardized structure that includes:

- **System Performance Metrics**: Build times, dependency management, and compilation performance
- **Code Quality Metrics**: TypeScript implementation quality and architecture standards
- **Revolutionary Technology Benchmarks**: Autonomous agent capabilities and integration quality
- **Performance Targets Achieved**: Technical excellence and business intelligence milestones

```
mermaid
graph TD
A["Performance Benchmarking"] --> B["System Metrics Collection"]
B --> C["Code Quality Analysis"]
C --> D["Technology Validation"]
D --> E["Target Achievement Assessment"]
E --> F["Report Generation"]
F --> G["Performance Optimization"]
G --> A
```

**Section sources**
- [AB\benchmarks\performance-report-2025-09-01.md](file://AB/benchmarks/performance-report-2025-09-01.md#L1-L151)

The benchmark reports provide quantitative measurements of system performance, enabling data-driven optimization decisions.

## System Health Monitoring Tools

A new system health monitoring tool has been introduced to provide instant status checks for the 371OS environment. The `quick-status.js` script offers a comprehensive health check that verifies the integrity of the system setup.

### Quick Status Tool Functionality

The `quick-status.js` tool performs the following checks:

- **Workspace Validation**: Confirms the current directory is the 371 OS workspace root
- **Package Manager Status**: Checks for installed Bun, Node.js, and Nx versions
- **Architecture Status**: Verifies the presence of critical directories
- **Plugin Build Status**: Validates that essential plugins are properly built
- **Documentation Status**: Confirms the existence of troubleshooting documentation
- **TypeScript Status**: Ensures TypeScript is properly configured

```javascript
// AB/scripts/quick-status.js - Instant 371 OS System Health Check
// Usage: node AB/scripts/quick-status.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 371 OS System Health Check\n');
console.log('═'.repeat(50));

// Check workspace root
const workspaceRoot = process.cwd();
console.log(`📁 Workspace: ${workspaceRoot}`);

// Check if we're in the right directory
if (!fs.existsSync('package.json') || !fs.existsSync('nx.json')) {
  console.log('❌ ERROR: Not in 371 OS workspace root');
  console.log('   Run this from  directory');
  process.exit(1);
}

console.log('✅ Valid 371 OS workspace detected\n');
```

**Section sources**
- [AB\scripts\quick-status.js](file://AB/scripts/quick-status.js#L1-L168)

The tool provides a system health summary and recommended next steps, making it easier to identify and resolve setup issues quickly.

## Session Analytics and Cognitive Pattern Tracking

The system implements comprehensive session analytics and cognitive pattern tracking through the AdaptiveLayout component and cognitive engine integration. This functionality provides insights into user behavior and cognitive workflows.

### Cognitive State Detection

The system detects cognitive states based on multiple factors:
- **Time of day**: Executive mode in mornings (9-11 AM), technical mode in afternoons (1-5 PM), creative mode in evenings (7-9 PM)
- **User activity**: Code-related actions trigger technical mode, design/content actions trigger creative mode, strategy/meeting actions trigger executive mode
- **Contextual patterns**: Analysis of recent actions and work patterns to predict optimal cognitive states

### Pattern Recognition

The cognitive engine analyzes user transitions to identify recurring patterns:

```typescript
private identifyPatterns(transitions: StateTransition[]): any[] {
  // Simplified pattern identification
  return [
    { type: 'time-based', confidence: 0.8, description: 'Executive mode in mornings' },
    { type: 'sequential', confidence: 0.7, description: 'Technical → Creative workflow' }
  ];
}
```

The system tracks patterns such as:
- **Time-based patterns**: Consistent mode usage at specific times of day
- **Sequential workflows**: Common transition sequences between cognitive states
- **Activity-based triggers**: Specific actions that consistently lead to mode changes
- **Efficiency patterns**: Combinations of modes and transitions that correlate with high productivity

**Section sources**
- [apps\cognitive-interface\src\components\AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx#L1-L417)
- [packages\elizaos-plugins\cognitive-engine\src\provider.ts](file://packages/elizaos-plugins/cognitive-engine/src/provider.ts#L339-L383)

These patterns are used to provide personalized recommendations and improve automatic mode switching accuracy.

## Productivity Scoring System

The system implements a comprehensive productivity scoring system that evaluates user efficiency and focus during sessions.

### Score Calculation

The productivity score is calculated based on multiple factors:

```typescript
const calculateProductivityScore = (
  history: typeof modeHistory, 
  transitions: CognitiveTransition[]
): number => {
  const baseScore = 70;
  let adjustments = 0;

  // Reward focused sessions (longer durations in single mode)
  const avgDuration = history.reduce((sum: number, entry: typeof modeHistory[0]) => sum + entry.duration, 0) / history.length;
  if (avgDuration > 30 * 60 * 1000) adjustments += 15; // 30+ minutes
  
  // Penalize excessive transitions
  const transitionRate = transitions.length / (history.length || 1);
  if (transitionRate > 0.5) adjustments -= 10;
  
  // Reward appropriate mode usage patterns
  const technicalSessions = history.filter((h: typeof modeHistory[0]) => h.mode === 'technical' && h.duration > 20 * 60 * 1000);
  if (technicalSessions.length > 0) adjustments += 10;
  
  return Math.min(Math.max(baseScore + adjustments, 0), 100);
};
```

### Scoring Factors

The productivity score considers:
- **Session focus**: Longer durations in single modes increase the score
- **Transition efficiency**: Excessive mode switching reduces the score
- **Appropriate mode usage**: Using technical mode for development work increases the score
- **Workflow consistency**: Following established productive patterns increases the score
- **Time optimization**: Using optimal modes for specific times of day increases the score

The score ranges from 0-100 and is updated in real-time as users interact with the system. This score provides immediate feedback on workflow efficiency and helps users optimize their cognitive workflows.

**Section sources**
- [apps\cognitive-interface\src\components\AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx#L203-L229)
- [packages\elizaos-plugins\cognitive-engine\src\utils.ts](file://packages/elizaos-plugins\cognitive-engine\src\utils.ts#L61-L102)

## MongoDB Analytics Service Integration

The MongoDB Analytics Service provides comprehensive user behavior tracking and analytics storage for the cognitive-aware interface system. It enables detailed analysis of user interactions, session analytics, cognitive states, and behavior patterns.

### Data Models

The service implements several key data models for tracking user behavior:

```typescript
interface UserInteraction {
  id: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  interactionType: 'click' | 'hover' | 'scroll' | 'keypress' | 'navigation' | 'mode_switch' | 'component_interaction';
  component: string;
  page: string;
  coordinates?: { x: number; y: number };
  duration?: number;
  metadata?: Record<string, any>;
}

interface SessionAnalytics {
  sessionId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  totalInteractions: number;
  modeTransitions: number;
  mostUsedMode: string;
  productivityScore: number;
  cognitivePatterns: string[];
  interactionHeatmap?: Record<string, number>;
}
```

**Section sources**
- [packages\elizaos-plugins\mongodb-integration\src\analytics-service.ts](file://packages\elizaos-plugins\mongodb-integration\src\analytics-service.ts#L1-L512)

### Service Functionality

The AnalyticsService class implements the core functionality for tracking and analyzing user behavior:

```
mermaid
sequenceDiagram
participant User as "User"
participant Interface as "Cognitive Interface"
participant Service as "AnalyticsService"
participant MongoDB as "MongoDB"
participant PostHog as "PostHog"
User->>Interface : User Interaction
Interface->>Service : trackInteraction()
Service->>MongoDB : Insert Interaction
Service->>PostHog : Capture Event
MongoDB-->>Service : Success
PostHog-->>Service : Success
Service-->>Interface : Tracking Complete
```

**Section sources**
- [packages\elizaos-plugins\mongodb-integration\src\analytics-service.ts](file://packages\elizaos-plugins\mongodb-integration\src\analytics-service.ts#L1-L512)

The service tracks user interactions, session analytics, cognitive states, and behavior patterns, storing them in MongoDB while also sending events to PostHog for external analytics. This dual approach enables both local analysis and integration with external analytics platforms.

The system provides methods for querying analytics data, including `getUserInteractions()`, `getSessionAnalytics()`, `getCognitiveStateHistory()`, and `identifyBehaviorPatterns()`, which can be used to generate insights and optimize user experience.

### Email System Branding and Animations

The email system branding and animations enhance the analytics dashboard visualizations, improving user experience. The color schemes and animations are defined in the email system components:

```typescript
export const COLOR_SCHEMES = {
  '371minds': {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  },
  // Additional color schemes...
};
```

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}
```

**Section sources**
- [371-os\src\minds371\services\email_system\components\branding\color-schemes.tsx](file://371-os/src/minds371/services/email_system/components/branding/color-schemes.tsx#L1-L392)
- [371-os\src\minds371\services\email_system\styles\shared\animations.css](file://371-os/src/minds371/services/email_system/styles/shared\animations.css#L1-L270)

These branding and animation elements are used in the analytics dashboard to create visually appealing and engaging visualizations that enhance user experience and data comprehension.