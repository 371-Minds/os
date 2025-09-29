# Advanced Topics

<cite>
**Referenced Files in This Document**   
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py)
- [config.py](file://371-os/src/minds371/adaptive_llm_router/config.py)
- [budget_guard.py](file://371-os/src/minds371/adaptive_llm_router/budget_guard.py)
- [usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py)
- [data_models.py](file://371-os/src/minds371/adaptive_llm_router/data_models.py)
- [policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py)
- [provider_registry.py](file://371-os/src/minds371/adaptive_llm_router/provider_registry.py)
- [llm.py](file://371-os/src/minds371/adaptive_llm_router/llm.py)
- [agent_utility_belt.py](file://371-os/src/minds371/agents/utility/agent_utility_belt.py)
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [_MASTER_ARCHITECTURE.md](file://371-os/_MASTER_ARCHITECTURE.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Core Components](#core-components)
4. [Adaptive LLM Router System](#adaptive-llm-router-system)
5. [Agent Utility Belt Implementation](#agent-utility-belt-implementation)
6. [Performance and Monitoring](#performance-and-monitoring)
7. [Security and Budget Management](#security-and-budget-management)
8. [Integration Patterns](#integration-patterns)
9. [Conclusion](#conclusion)

## Introduction
The 371OS platform represents a sophisticated multi-agent architecture designed to automate complex business operations through intelligent agent orchestration. This document explores advanced topics in 371OS development and operation, focusing on custom agent development, adaptive LLM routing, performance optimization, and security hardening techniques. The system implements a hierarchical C-Suite agent structure that mirrors traditional corporate leadership, enabling autonomous decision-making and task delegation across specialized domains.

**Section sources**
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html#L1-L200)
- [_MASTER_ARCHITECTURE.md](file://371-os/_MASTER_ARCHITECTURE.md#L1-L8)

## Architecture Overview

```mermaid
graph TB
subgraph "Platform Layer"
PL[Platform Integrations<br>Slack, VSCode, Web]
end
subgraph "Agent Layer"
AL[Specialized Agents<br>CEO, CTO, CMO, CFO]
IR[Intelligent Router Agent]
end
subgraph "Core Layer"
CLR[Adaptive LLM Router]
PE[Policy Engine]
BG[Budget Guard]
UL[Usage Ledger]
PR[Provider Registry]
end
subgraph "Services Layer"
SL[Analytics Service]
CL[Credential Warehouse]
PM[Performance Monitoring]
end
subgraph "Infrastructure Layer"
IL[Cloud Providers<br>DigitalOcean, AWS]
CO[Container Orchestration<br>Kubernetes]
end
PL --> AL
AL --> CLR
CLR --> PE
CLR --> BG
CLR --> UL
CLR --> PR
CLR --> SL
PE --> PR
BG --> UL
UL --> SL
IL --> CO
style CLR fill:#f59e0b,stroke:#333
style PE fill:#3b82f6,stroke:#333
style BG fill:#ef4444,stroke:#333
style UL fill:#10b981,stroke:#333
style PR fill:#8b5cf6,stroke:#333
```

**Diagram sources**
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html#L1-L200)
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py#L1-L105)

## Core Components

The 371OS platform is built on a hierarchical agent architecture that implements the Orchestrator-Worker pattern with C-Suite level oversight. At its foundation is the `ImprovedBaseAgent` class, which provides a robust framework for agent implementation with built-in performance monitoring, task queuing, and error handling capabilities.

The system features specialized agents for different business functions, including CEO, CTO, CMO, CFO, and other C-Suite roles, each designed to handle specific domains of expertise. These agents communicate through a centralized task queue system and can delegate tasks to one another based on their specialized capabilities.

The Intelligent Router Agent serves as a central coordination point, using MindScript to analyze incoming commands and route them to the appropriate specialized agent based on the task's category and requirements.

**Section sources**
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py#L1-L526)
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py#L1-L105)

## Adaptive LLM Router System

### System Architecture
The Adaptive LLM Router is the central hub for all LLM interactions within the 371OS platform. It implements intelligent provider selection, cost optimization, and usage tracking to ensure efficient and economical operation.

```mermaid
classDiagram
class AdaptiveLLMRouter {
+invoke(prompt, meta, user_id)
-estimate_tokens(text)
}
class PolicyEngine {
+select_provider(meta, est_in, est_out)
}
class BudgetGuard {
+check_budget()
+get_remaining_budget_percentage()
+is_budget_exceeded()
}
class UsageLedger {
+record_usage(usage_data)
+get_total_cost_for_current_month()
-_write_to_ledger(usage_data)
-_capture_posthog_event(usage_data)
}
class ProviderRegistry {
+get_provider(name, model)
+list_providers()
-_load_providers()
}
class LLMUsage {
+ts : datetime
+provider : str
+model : str
+tokens_in : int
+tokens_out : int
+cost : float
+task_id : Optional[str]
+agent : Optional[str]
+status : Union[str, None]
}
class LLMProvider {
+name : str
+model : str
+cost_in : float
+cost_out : float
+max_context : int
+latency_ms : int
+endpoint_env : str
}
AdaptiveLLMRouter --> PolicyEngine : "uses"
AdaptiveLLMRouter --> BudgetGuard : "uses"
AdaptiveLLMRouter --> UsageLedger : "uses"
AdaptiveLLMRouter --> ProviderRegistry : "uses"
UsageLedger --> LLMUsage : "creates"
ProviderRegistry --> LLMProvider : "contains"
PolicyEngine --> BudgetGuard : "checks"
```

**Diagram sources**
- [llm.py](file://371-os/src/minds371/adaptive_llm_router/llm.py#L1-L92)
- [policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py#L1-L34)
- [budget_guard.py](file://371-os/src/minds371/adaptive_llm_router/budget_guard.py#L1-L50)
- [usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py#L1-L89)
- [provider_registry.py](file://371-os/src/minds371/adaptive_llm_router/provider_registry.py#L1-L45)
- [data_models.py](file://371-os/src/minds371/adaptive_llm_router/data_models.py#L1-L40)

### Policy Engine Implementation
The Policy Engine implements a decision graph to select the optimal LLM provider based on multiple factors including budget status, task criticality, context length requirements, and privacy considerations.

```mermaid
flowchart TD
Start([Request Received]) --> PrivacyCheck{"Confidential Data?"}
PrivacyCheck --> |Yes| UseLocalAI["Return 'localai:phi-4-14b'"]
PrivacyCheck --> |No| CriticalityCheck{"High Quality Required?<br>Budget > 20%?"}
CriticalityCheck --> |Yes| UseGPT4["Return 'openrouter:gpt-4o-mini'"]
CriticalityCheck --> |No| ContextCheck{"Input > 8000 tokens?"}
ContextCheck --> |Yes| UseClaude["Return 'requesty:claude-3-sonnet'"]
ContextCheck --> |No| BudgetCheck{"Budget < 5% remaining?"}
BudgetCheck --> |Yes| UseMistral["Return 'openrouter:mistral-7b'"]
BudgetCheck --> |No| UseDefault["Return 'openrouter:qwen2-72b'"]
UseLocalAI --> End([Provider Selected])
UseGPT4 --> End
UseClaude --> End
UseMistral --> End
UseDefault --> End
```

**Diagram sources**
- [policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py#L1-L34)

### LLM Invocation Flow
The LLM invocation process follows a comprehensive workflow that ensures cost-effective and reliable operation.

```mermaid
sequenceDiagram
participant Client as "Client Application"
participant Router as "Adaptive LLM Router"
participant Policy as "Policy Engine"
participant Budget as "Budget Guard"
participant Registry as "Provider Registry"
participant LLM as "LLM Provider"
participant Ledger as "Usage Ledger"
Client->>Router : invoke(prompt, meta)
Router->>Router : estimate_tokens(prompt)
Router->>Policy : select_provider(meta, est_in, est_out)
Policy-->>Router : selected_model
Router->>Registry : get_provider(provider, model)
Registry-->>Router : provider_details
Router->>Budget : check_budget()
alt Budget Exceeded
Budget-->>Router : BudgetExceededError
Router-->>Client : Error
else Budget Available
Router->>LLM : acompletion(model, prompt)
alt Success
LLM-->>Router : response
Router->>Router : extract_usage_data()
Router->>Router : calculate_cost()
Router->>Ledger : record_usage(usage_data)
Router-->>Client : response.content
else Error
LLM-->>Router : Exception
Router->>Router : use_estimated_tokens()
Router->>Ledger : record_usage(error_status)
Router-->>Client : Exception
end
end
```

**Diagram sources**
- [llm.py](file://371-os/src/minds371/adaptive_llm_router/llm.py#L1-L92)

## Agent Utility Belt Implementation

### Class Structure
The Agent Utility Belt provides a collection of utility functions for service discovery and management within the 371OS ecosystem.

```mermaid
classDiagram
class AgentUtilityBelt {
+service_catalog : Dict
+update_catalog(catalog)
+process_task(task)
-find_services_by_tag(tag)
-get_repository_details(service_name)
}
class Task {
+id : str
+description : str
+agent_type : AgentType
+payload : Dict[str, Any]
+status : TaskStatus
}
AgentUtilityBelt --> Task : "handles"
```

**Diagram sources**
- [agent_utility_belt.py](file://371-os/src/minds371/agents/utility/agent_utility_belt.py#L1-L82)

### Service Catalog Structure
The utility belt maintains a service catalog organized by category and service, with associated metadata including tags and repository information.

```json
{
  "by_category": [
    {
      "ip": {
        "l2.io": {
          "tags": ["curl", "plain"]
        },
        "echoip.de": {
          "tags": ["curl", "plain"]
        }
      }
    },
    {
      "geo": {
        "ipinfo.io": {
          "tags": ["curl", "json"],
          "repository": "https://github.com/ipinfo/ipinfo"
        }
      }
    }
  ]
}
```

**Section sources**
- [agent_utility_belt.py](file://371-os/src/minds371/agents/utility/agent_utility_belt.py#L15-L25)

## Performance and Monitoring

### Base Agent Architecture
The ImprovedBaseAgent class provides a comprehensive foundation for all agents in the 371OS system, incorporating performance optimization and monitoring capabilities.

```mermaid
classDiagram
class ImprovedBaseAgent {
+agent_id : str
+agent_type : AgentType
+logger : Logger
+task_queue : TaskQueue
+connection_pool : ConnectionPool
+metrics : PerformanceMetrics
+cache : SimpleCache
+circuit_breaker : CircuitBreaker
+start_workers()
+stop_workers()
+_worker_loop(worker_name)
+_execute_task_with_monitoring(task)
+_metrics_loop()
+llm_invoke_with_pooling(prompt, meta)
+submit_task(task)
+get_metrics()
+get_status()
+shutdown()
}
class TaskQueue {
+queue : PriorityQueue
+semaphore : Semaphore
+active_tasks : Dict[str, Task]
+completed_tasks : Deque[Task]
+add_task(task)
+get_task()
+mark_active(task)
+mark_completed(task)
}
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
+update_response_time(processing_time)
+calculate_error_rate()
}
class ConnectionPool {
+max_connections : int
+available_connections : Queue
+active_connections : int
+get_connection()
+return_connection(connection)
}
class SimpleCache {
+cache : Dict[str, tuple]
+max_size : int
+ttl_seconds : int
+get(key)
+set(key, value)
}
class CircuitBreaker {
+failure_threshold : int
+timeout : int
+failure_count : int
+last_failure_time : Optional[float]
+is_open : bool
+can_execute()
+record_success()
+record_failure()
}
ImprovedBaseAgent --> TaskQueue : "uses"
ImprovedBaseAgent --> PerformanceMetrics : "contains"
ImprovedBaseAgent --> ConnectionPool : "uses"
ImprovedBaseAgent --> SimpleCache : "uses"
ImprovedBaseAgent --> CircuitBreaker : "uses"
```

**Diagram sources**
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py#L1-L526)

### Worker Execution Flow
The base agent implements a sophisticated worker system for processing tasks with comprehensive monitoring and error handling.

```mermaid
flowchart TD
Start([Worker Loop Start]) --> AcquireSemaphore["Acquire Semaphore<br>await semaphore"]
AcquireSemaphore --> GetTask["Get Task from Queue<br>await queue.get_task()"]
GetTask --> CheckTimeout{"Timeout?"}
CheckTimeout --> |Yes| ContinueLoop["Continue Loop"]
CheckTimeout --> |No| MarkActive["Mark Task Active"]
MarkActive --> CheckCircuitBreaker{"Circuit Breaker Open?"}
CheckCircuitBreaker --> |Yes| HandleCircuitBreaker["Raise Exception"]
CheckCircuitBreaker --> |No| ExecuteTask["Execute Task with Timeout"]
ExecuteTask --> TaskSuccess{"Task Successful?"}
TaskSuccess --> |Yes| MarkCompleted["Mark Task Completed"]
TaskSuccess --> |No| CheckRetry{"Retry Available?"}
CheckRetry --> |Yes| ScheduleRetry["Schedule Retry with Backoff"]
CheckRetry --> |No| MarkFailed["Mark Task Failed"]
MarkCompleted --> ReturnConnection["Return Connection to Pool"]
MarkFailed --> ReturnConnection
ScheduleRetry --> ReturnConnection
ReturnConnection --> UpdateMetrics["Update Performance Metrics"]
UpdateMetrics --> ContinueLoop
ContinueLoop --> AcquireSemaphore
```

**Diagram sources**
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py#L200-L399)

## Security and Budget Management

### Budget Management System
The budget management system implements hard-stop gates to prevent overspending on LLM usage, with configurable monthly caps and detailed usage tracking.

```mermaid
classDiagram
class BudgetManager {
+monthly_cap : float
+ledger : UsageLedger
+get_remaining_budget_percentage()
+is_budget_exceeded()
+check_budget()
}
class BudgetExceededError {
+message : str
}
class UsageLedger {
+usage_file : Path
+posthog_client : Optional[Posthog]
+record_usage(usage_data)
+_write_to_ledger(usage_data)
+_capture_posthog_event(usage_data)
+get_total_cost_for_current_month()
}
BudgetManager --> UsageLedger : "uses"
BudgetManager --> BudgetExceededError : "throws"
UsageLedger --> LLMUsage : "contains"
```

**Diagram sources**
- [budget_guard.py](file://371-os/src/minds371/adaptive_llm_router/budget_guard.py#L1-L50)
- [usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py#L1-L89)

### Usage Tracking and Analytics
The system maintains detailed records of all LLM usage for cost analysis, performance monitoring, and compliance auditing.

```mermaid
erDiagram
LLM_USAGE {
datetime ts PK
string provider
string model
int tokens_in
int tokens_out
float cost
string task_id FK
string agent
string status
}
TASK {
string id PK
string description
string agent_type
json payload
string status
datetime created_at
datetime started_at
datetime completed_at
}
LLM_PROVIDER {
string name PK
string model PK
float cost_in
float cost_out
int max_context
int latency_ms
string endpoint_env
}
SETTINGS {
string key PK
float monthly_cap
}
LLM_USAGE ||--o{ TASK : "references"
LLM_USAGE }o--|| LLM_PROVIDER : "uses"
SETTINGS ||--o{ LLM_USAGE : "governs"
```

**Diagram sources**
- [data_models.py](file://371-os/src/minds371/adaptive_llm_router/data_models.py#L1-L40)
- [usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py#L1-L89)

## Integration Patterns

### Intelligent Routing Pattern
The Intelligent Router Agent implements a command parsing and delegation pattern that uses MindScript to understand user commands and route them to appropriate specialized agents.

```mermaid
sequenceDiagram
participant User as "User"
participant Router as "IntelligentRouterAgent"
participant MindScript as "LogicExtractorAgent"
participant CTO as "CTO Agent"
participant CMO as "CMO Agent"
User->>Router : "Can you please find services in utility belt with tag 'beta'?"
Router->>MindScript : process_task(task)
MindScript-->>Router : {structured_payload : {category : "utility_belt"}}
Router->>Router : Determine target_agent_type = CTO
Router->>Router : Create new_task for CTO Agent
Router-->>User : {status : "routing_complete", delegated_to : "cto", new_task_id : "..."}
Router->>CTO : Submit new_task
CTO->>CTO : Process task to find services with tag 'beta'
```

**Diagram sources**
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py#L1-L105)

### Provider Registry Pattern
The Provider Registry implements a configuration-driven pattern for managing LLM providers, loading provider details from a JSON file.

```mermaid
flowchart TD
Start([Application Start]) --> InitializeRegistry["Initialize ProviderRegistry"]
InitializeRegistry --> CheckFile{"providers.json exists?"}
CheckFile --> |No| EmptyProviders["Set providers = []"]
CheckFile --> |Yes| ReadFile["Read providers.json"]
ReadFile --> ParseJSON["Parse JSON data"]
ParseJSON --> CreateProviders["Create LLMProvider objects"]
CreateProviders --> StoreProviders["Store in self.providers"]
StoreProviders --> Complete([Registry Ready])
EmptyProviders --> Complete
```

**Diagram sources**
- [provider_registry.py](file://371-os/src/minds371/adaptive_llm_router/provider_registry.py#L1-L45)

## Conclusion
The 371OS platform demonstrates a sophisticated approach to autonomous agent systems, combining hierarchical agent architectures with adaptive LLM routing and comprehensive monitoring. The system's modular design allows for extensibility while maintaining clear separation of concerns between components.

Key strengths include the adaptive LLM router's ability to optimize cost and performance through intelligent provider selection, the robust base agent implementation with built-in performance monitoring, and the comprehensive budget management system that prevents overspending. The integration of PostHog for analytics provides valuable insights into system usage patterns and performance characteristics.

Future development could focus on enhancing the policy engine with machine learning capabilities to dynamically optimize provider selection based on historical performance data, and expanding the security model to include more granular access controls and audit logging capabilities.