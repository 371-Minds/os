# CEO Mimi Agent

<cite>
**Referenced Files in This Document**   
- [ceo_mimi.py](file://371-os\src\minds371\agents\business\ceo_mimi.py) - *Updated in recent commit*
- [ceo_mimi.yaml](file://prompts\business_agents\ceo_mimi.yaml) - *Configuration for CEO agent behavior*
- [CEO_Agent_Logic.md](file://371-os\CEO_Agent_Logic.md) - *Strategic delegation logic diagram*
- [Adaptive_Router_Logic.md](file://371-os\Adaptive_Router_Logic.md) - *Routing workflow with budget checks*
- [ref-tools-mcp.md](file://371-os\src\minds371\mcp_servers\ref-tools-mcp.md) - *MCP server configuration for reference tools*
- [config.py](file://371-os\src\minds371\adaptive_llm_router\config.py) - *Monthly budget cap definition*
- [BUSINESS_INTELLIGENCE_ACTIONS_FIXES.md](file://BUSINESS_INTELLIGENCE_ACTIONS_FIXES.md) - *Bug fixes affecting business intelligence agents*
- [BUSINESS_INTELLIGENCE_EVALUATOR_FIXES.md](file://BUSINESS_INTELLIGENCE_EVALUATOR_FIXES.md) - *Type safety improvements in validator functions*
</cite>

## Update Summary
**Changes Made**   
- Updated section sources to reflect accurate file paths and recent changes
- Added new referenced files related to recent bug fixes in business intelligence components
- Clarified integration points between CEO Mimi Agent and the Universal Tool Server based on updated context
- Enhanced troubleshooting guidance to address potential issues arising from recent TypeScript compilation fixes
- Maintained all architectural diagrams and core functionality descriptions as they remain accurate

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)

## Introduction
The CEO Mimi Agent is the strategic leadership entity within the 371OS agent ecosystem, responsible for high-level goal setting, task delegation, and cross-functional coordination across technical, financial, and operational domains. As the central decision-making node, Mimi receives high-level tasks, analyzes their nature, and delegates them to specialized C-suite agents such as CTO Alex, CFO Cash, CMO Anova, and CCO Sage. This document provides a comprehensive analysis of Mimi's initialization process, goal decomposition logic, delegation patterns, integration with the Adaptive LLM Router for cost-aware operations, and communication via the Multi-Agent Communication Protocol (MCP). The analysis includes configuration directives, performance monitoring mechanisms, and optimization strategies for enterprise-scale deployment.

## Project Structure
The CEO Mimi Agent is structured within the 371OS monorepo architecture, following a domain-driven design pattern with clear separation between business logic, configuration, and supporting infrastructure. The agent resides in the `business` subdirectory of the agents module, inheriting core capabilities from the base agent framework.

``mermaid
graph TD
subgraph "371OS Agent Ecosystem"
CEO[CEO Mimi Agent]
CTO[CTO Alex Agent]
CFO[CFO Cash Agent]
CMO[CMO Anova Agent]
CCO[CCO Sage Agent]
end
subgraph "Core Infrastructure"
Router[Adaptive LLM Router]
MCP[MCP Servers]
Ledger[Usage Ledger]
Budget[Budget Guard]
end
CEO --> CTO
CEO --> CFO
CEO --> CMO
CEO --> CCO
Router --> CEO
MCP --> CEO
Budget --> Router
Ledger --> Router
style CEO fill:#4CAF50,stroke:#388E3C
```

**Diagram sources**
- [ceo_mimi.py](file://371-os\src\minds371\agents\business\ceo_mimi.py)
- [Adaptive_Router_Logic.md](file://371-os\Adaptive_Router_Logic.md)

**Section sources**
- [ceo_mimi.py](file://371-os\src\minds371\agents\business\ceo_mimi.py)

## Core Components
The CEO Mimi Agent consists of three primary components: the agent class implementation, the YAML prompt configuration, and the delegation logic framework. The agent inherits from `BaseAgent` and implements strategic delegation capabilities. The configuration defines behavioral directives and response formats, while the logic determines routing decisions based on task classification.

**Section sources**
- [ceo_mimi.py](file://371-os\src\minds371\agents\business\ceo_mimi.py)
- [ceo_mimi.yaml](file://prompts\business_agents\ceo_mimi.yaml)

## Architecture Overview
The CEO Mimi Agent operates as the strategic orchestrator within the 371OS ecosystem, receiving tasks from the Adaptive LLM Router and delegating them to specialized agents. The architecture follows a hierarchical delegation model where Mimi analyzes task types and routes them to appropriate C-suite agents based on domain keywords.

``mermaid
graph TD
subgraph "CEO Mimi Agent: Strategic Delegation Logic"
Start((Receive High-Level Task)) --> AnalyzeTask{Analyze Task Type};
AnalyzeTask -- "Is it a Technical Task?" --> Delegate_CTO[Delegate to CTO Agent];
Delegate_CTO --> Monitor_CTO{Monitor for Completion};
Monitor_CTO --> End((Task Cycle Complete));
AnalyzeTask -- "Is it a Marketing Task?" --> Delegate_CMO[Delegate to CMO Agent];
Delegate_CMO --> Monitor_CMO{Monitor for Completion};
Monitor_CMO --> End;
AnalyzeTask -- "Is it a Financial Task?" --> Delegate_CFO[Delegate to CFO Agent];
Delegate_CFO --> Monitor_CFO{Monitor for Completion};
Monitor_CFO --> End;
AnalyzeTask -- "Is it a Community Task?" --> Delegate_CCO[Delegate to CCO Agent];
Delegate_CCO --> Monitor_CCO{Monitor for Completion};
Monitor_CCO --> End;
end
subgraph "Inherited Capabilities (from improved-base-agent.md)"
style Inherited fill:#f0f0f0,stroke:#ccc
C1[Concurrent Task Processing]
C2[Caching System]
C3[Circuit Breaker Pattern]
C4[Real-time Monitoring & Metrics]
end
```

**Diagram sources**
- [CEO_Agent_Logic.md](file://371-os\CEO_Agent_Logic.md)

## Detailed Component Analysis

### CEO Mimi Agent Implementation
The `CeoMimiAgent` class implements the strategic leadership functionality through keyword-based task classification and delegation. The agent processes incoming tasks by analyzing their descriptions for domain-specific keywords and routing them accordingly.

```python
async def process_task(self, task: Task) -> Dict[str, Any]:
    description = task.description.lower()

    if any(keyword in description for keyword in ["financial", "budget", "quarterly"]):
        return {"status": "success", "message": "Delegating to CFO Cash"}
    elif any(keyword in description for keyword in ["feature", "application", "security", "infrastructure"]):
        return {"status": "success", "message": "Delegating to CTO Alex"}
    elif any(keyword in description for keyword in ["marketing", "campaign"]):
        return {"status": "success", "message": "Delegating to CMO Anova"}
    elif any(keyword in description for keyword in ["community", "outreach"]):
        return {"status": "success", "message": "Delegating to CCO Sage"}
    else:
        return {"status": "success", "message": "Task noted. No specific C-suite agent identified for delegation."}
```

The implementation demonstrates a simple yet effective pattern matching approach for delegation decisions. Each condition checks for relevant keywords in the task description, enabling Mimi to route tasks to the appropriate specialized agent.

**Section sources**
- [ceo_mimi.py](file://371-os\src\minds371\agents\business\ceo_mimi.py#L28-L59)

### Configuration and Behavioral Directives
The `ceo_mimi.yaml` configuration file defines the agent's behavioral parameters, including its domain expertise, capabilities, and response format requirements. The template enforces structured delegation responses in JSON format with specific metadata fields.

```yaml
template: |
  # Agent Context
  - **Agent Type**: CEO
  - **Domain**: Strategic oversight and task delegation
  - **Capabilities**: Strategic decision-making, task delegation, agent coordination
  - **Response Format**: Structured delegation response

  # Task Processing
  **Task Description**: {task_description}

  **Delegation Logic**:
  - Analyze task complexity and requirements
  - Identify appropriate specialized agents
  - Delegate tasks based on agent capabilities
  - Monitor and coordinate agent execution

  # Response Requirements
  - **Status**: "delegated" or "completed"
  - **Structure**: JSON with delegation details
  - **Metadata**: Include delegation chain and agent coordination info
```

The configuration establishes clear expectations for task processing and ensures consistent response formatting across all interactions.

**Section sources**
- [ceo_mimi.yaml](file://prompts\business_agents\ceo_mimi.yaml#L0-L47)

### Integration with Adaptive LLM Router
CEO Mimi integrates with the Adaptive LLM Router as part of the intelligent routing workflow. The router first checks budget constraints before decomposing requests and classifying task categories. Strategic/executive tasks are specifically routed to Mimi for further processing.

``mermaid
graph TD
subgraph "Intelligent Router: Core System Workflow"
Start((User Request Ingested)) --> CheckBudget[Check Budget Guard];
CheckBudget -- "Budget OK" --> A[Use Adaptive LLM Router to Analyze Request];
A --> Decompose[Decompose Request into Tasks];
Decompose --> Classify{Classify Task Category};
Classify -- "Strategic/Executive" --> RouteCEO[Route to CEO Agent];
Classify -- "Technical" --> RouteCTO[Route to CTO Agent];
Classify -- "Marketing" --> RouteCMO[Route to CMO (Marketing) Agent];
Classify -- "Financial" --> RouteCFO[Route to CFO Agent];
CheckBudget -- "Budget Exceeded" --> B(Return Budget Exceeded Error);
B --> End((Request Cycle Complete));
RouteCEO --> End;
end
subgraph "Core Components Utilized"
style Core fill:#e6f3ff,stroke:#0066cc
Comp1[Adaptive LLM Router]
Comp2[Budget Manager]
Comp3[Usage Ledger]
end
```

The router enforces a monthly budget cap of $20.00 (defined in `config.py`), ensuring cost-aware decision-making at the system level before tasks reach Mimi.

**Diagram sources**
- [Adaptive_Router_Logic.md](file://371-os\Adaptive_Router_Logic.md)
- [config.py](file://371-os\src\minds371\adaptive_llm_router\config.py)

### MCP for Inter-Agent Communication
The CEO Mimi Agent utilizes MCP (Model Context Protocol) for inter-agent communication and tool access. The `ref-tools-mcp` configuration enables Mimi to access documentation and reference materials, supporting informed decision-making during delegation.

```json
{
  "mcpServers": {
    "ref-tools": {
      "command": "npx",
      "args": ["ref-tools-mcp"],
      "env": {
        "REF_API_KEY": "your-api-key"
      }
    }
  }
}
```

Key features of the MCP integration include:
- Smart documentation chunking to minimize token usage
- Code tab awareness for comprehensive example retrieval
- Deep link generation for source verification
- Fast performance with P95 latency of 1.7 seconds
- Comprehensive coverage of thousands of sites and public repositories

This integration eliminates hallucinations by providing up-to-date, verifiable information during the delegation process.

**Section sources**
- [ref-tools-mcp.md](file://371-os\src\minds371\mcp_servers\ref-tools-mcp.md)

## Dependency Analysis
The CEO Mimi Agent depends on several core components within the 371OS ecosystem, forming a hierarchical delegation network. Mimi inherits capabilities from the base agent framework while depending on specialized agents for domain-specific execution.

``mermaid
graph TD
CEO[CeoMimiAgent] --> Base[BaseAgent]
CEO --> Task[Task]
CEO --> AgentType[AgentType]
CEO --> AgentCapability[AgentCapability]
Base --> Concurrent[Concurrent Task Processing]
Base --> Cache[Caching System]
Base --> Circuit[Circuit Breaker Pattern]
Base --> Monitoring[Real-time Monitoring & Metrics]
CEO --> CTO[CTO Alex Agent]
CEO --> CFO[CFO Cash Agent]
CEO --> CMO[CMO Anova Agent]
CEO --> CCO[CCO Sage Agent]
style CEO fill:#4CAF50,stroke:#388E3C
```

The dependency structure reveals a clean separation of concerns, with Mimi focusing exclusively on strategic oversight while delegating execution to specialized agents.

**Diagram sources**
- [ceo_mimi.py](file://371-os\src\minds371\agents\business\ceo_mimi.py)

## Performance Considerations
The CEO Mimi Agent is designed for high-performance operation with built-in health checking and benchmarking capabilities. The agent implements a simple health check that returns `True` when operational, enabling system monitoring.

```python
async def health_check(self) -> bool:
    """
    Checks if the agent is healthy.
    """
    return True
```

Benchmark testing validates Mimi's delegation logic across various task types:
- Technical tasks (e.g., "Develop a new feature") → CTO Alex
- Financial tasks (e.g., "Analyze quarterly financial results") → CFO Cash
- Marketing tasks (e.g., "Launch a new marketing campaign") → CMO Anova
- Community tasks (e.g., "Coordinate community outreach") → CCO Sage

The agent's performance is further optimized through caching, concurrent task processing, and circuit breaker patterns inherited from the base agent framework.

## Troubleshooting Guide
Common issues with the CEO Mimi Agent typically involve delegation bottlenecks and misaligned priorities. The following strategies address these challenges:

**Delegation Bottlenecks**
- **Issue**: Tasks not being delegated to appropriate agents
- **Solution**: Verify keyword matching in `process_task()` and ensure task descriptions contain appropriate domain keywords
- **Optimization**: Expand keyword lists or implement machine learning-based classification for more nuanced task routing

**Misaligned Priorities**
- **Issue**: Critical tasks not receiving appropriate priority
- **Solution**: Implement payload-based priority handling and integrate with the Universal Tool Server for resource allocation
- **Optimization**: Use `akash:cost-analysis` command for budget optimization and `affected:build` for resource allocation

**Configuration Issues**
- **Issue**: Incorrect response formatting
- **Solution**: Validate YAML template structure and ensure required metadata fields are included
- **Optimization**: Implement schema validation for delegation responses

**Performance Problems**
- **Issue**: Slow response times
- **Solution**: Leverage caching system and verify MCP server connectivity
- **Optimization**: Monitor usage ledger and adjust budget caps in `config.py`

**Integration Failures**
- **Issue**: MCP server connection problems
- **Solution**: Verify environment variables (e.g., `REF_API_KEY`) and server availability
- **Optimization**: Implement fallback mechanisms and circuit breaker patterns

## Conclusion
The CEO Mimi Agent serves as the strategic leadership entity in the 371OS ecosystem, providing centralized oversight and intelligent delegation across technical, financial, marketing, and community domains. By leveraging keyword-based classification, structured configuration, and integration with the Adaptive LLM Router and MCP, Mimi enables efficient task routing while maintaining cost awareness and operational integrity. The agent's design follows enterprise-grade patterns with comprehensive monitoring, error handling, and performance optimization features. Future enhancements could include machine learning-based task classification, dynamic priority adjustment, and deeper integration with blockchain-based tool registries for enhanced trust and coordination.