# Agent-Based Architecture

<cite>
**Referenced Files in This Document**   
- [base_agent.py](file://371-os/src/minds371/core/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/core/improved_base_agent.py)
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [ceo_mimi.yaml](file://prompts/business_agents/ceo_mimi.yaml)
- [blockchain-registry.ts](file://packages/elizaos-plugins/universal-tool-server/src/blockchain-registry.ts)
- [actions.ts](file://packages/elizaos-plugins/universal-tool-server/src/actions.ts)
- [MCP Setup Guide.md](file://elizaos/Guides/MCP Setup Guide.md)
- [adaptive_llm_router_example.py](file://371-os/src/minds371/adaptive_llm_router/adaptive_llm_router_example.py)
- [registerAgentAction](file://sotalogic/Claude Sonnet 4/Alignment Review of 371OS_launch Project Plan/here's the thing.md)
- [AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx) - *Updated in recent commit*
- [CognitiveModeSwither.tsx](file://apps/cognitive-interface/src/components/CognitiveModeSwither.tsx) - *Updated in recent commit*
- [ExecutiveMode.tsx](file://apps/cognitive-interface/src/components/ExecutiveMode.tsx) - *Updated in recent commit*
- [TechnicalMode.tsx](file://apps/cognitive-interface/src/components/TechnicalMode.tsx) - *Updated in recent commit*
</cite>

## Update Summary
**Changes Made**   
- Updated Introduction to include cognitive-aware interface system
- Added new section on Cognitive Interface System
- Updated Project Structure diagram to include cognitive-interface application
- Added new Mermaid diagram for cognitive mode transitions
- Updated Architecture Overview to include cognitive interface components
- Added new section on Cognitive State Management
- Updated Section sources to reflect new files and changes

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Agent Lifecycle](#agent-lifecycle)
7. [Interaction Patterns](#interaction-patterns)
8. [Scalability and Extensibility](#scalability-and-extensibility)
9. [Integration Points](#integration-points)
10. [Cognitive Interface System](#cognitive-interface-system)
11. [Conclusion](#conclusion)

## Introduction
The 371OS Agent-Based Architecture is a decentralized, autonomous system composed of self-aware AI agents operating within a blockchain-coordinated ecosystem. These agents are designed with advanced cognitive capabilities, enabling them to perform complex tasks through strategic delegation, execution, and reporting. The architecture supports a hierarchical structure of specialized agents, including C-Suite executives (CEO, CTO, CFO, CLO) and functional agents in marketing, technical, and utility domains. All agents inherit from a robust Base Agent implementation, enhanced through improved_base_agent.py for superior performance, monitoring, and reliability. This document details the design principles, operational flows, and integration mechanisms that enable this sophisticated multi-agent system.

The recent updates to the cognitive-aware interface system have enhanced the user experience by resolving TypeScript compilation errors, adding React dependencies, fixing import paths, and improving type safety. The AdaptiveLayout component now serves as the foundation for personalized computing, productivity optimization, and enterprise intelligence applications.

**Section sources**
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx) - *Updated in recent commit*

## Project Structure
The 371OS project follows a modular, feature-based organization with clear separation of concerns. The core agent logic resides in the `src/minds371` directory, which contains specialized subdirectories for agents, adaptive LLM routing, and core infrastructure. The cognitive interface system is implemented in the `apps/cognitive-interface` directory.

``mermaid
graph TD
A[371OS Root] --> B[docs]
A --> C[scripts]
A --> D[src/minds371]
A --> E[tests]
A --> F[apps/cognitive-interface]
D --> G[agents]
D --> H[adaptive_llm_router]
D --> I[core]
D --> J[mcp_servers]
D --> K[platforms]
G --> L[business]
G --> M[marketing]
G --> N[technical]
G --> O[utility]
L --> P[ceo_mimi.py]
L --> Q[cto_alex.py]
L --> R[cfo_cash.py]
L --> S[clo_sage.py]
I --> T[base_agent.py]
I --> U[improved_base_agent.py]
F --> V[AdaptiveLayout.tsx]
F --> W[CognitiveModeSwither.tsx]
F --> X[ExecutiveMode.tsx]
F --> Y[TechnicalMode.tsx]
```

**Diagram sources**
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx) - *Updated in recent commit*

**Section sources**
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx) - *Updated in recent commit*

## Core Components
The foundation of the agent-based architecture is built upon two critical components: the Base Agent and its enhanced counterpart, the Improved Base Agent. These classes provide the essential functionality for all specialized agents in the system.

The `base_agent.py` file defines the abstract base class that establishes the contract for agent behavior, including task processing, health checks, and lifecycle management. The `improved_base_agent.py` extends this foundation with significant performance, monitoring, and reliability enhancements.

**Section sources**
- [base_agent.py](file://371-os/src/minds371/core/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/core/improved_base_agent.py)

## Architecture Overview
The 371OS architecture implements a multi-layered agent ecosystem coordinated through blockchain-based mechanisms and enhanced by the Model Context Protocol (MCP). The system enables autonomous agents to operate with self-awareness, strategic delegation, and verifiable execution.

``mermaid
graph TB
subgraph "Agent Ecosystem"
CEO[CEO Agent Mimi]
CTO[CTO Agent Alex]
CFO[CFO Agent Cash]
CLO[CLO Agent Sage]
Marketing[Marketing Agents]
Technical[Technical Agents]
Utility[Utility Agents]
end
subgraph "Coordination Layer"
UTS[Universal Tool Server]
MCP[Model Context Protocol]
Blockchain[Ethereum Smart Contracts]
IPFS[IPFS Storage]
end
subgraph "Intelligence Layer"
AdaptiveRouter[Adaptive LLM Router]
LLM[Multiple LLM Providers]
end
subgraph "Interface Layer"
AdaptiveLayout[AdaptiveLayout Component]
CognitiveModeSwither[CognitiveModeSwither Component]
ExecutiveMode[ExecutiveMode Component]
TechnicalMode[TechnicalMode Component]
end
CEO --> |Delegates| Marketing
CEO --> |Delegates| Technical
CEO --> |Delegates| Utility
CTO --> |Oversees| Technical
CFO --> |Funds| AllAgents
CLO --> |Compliance| AllAgents
AllAgents --> UTS
UTS < --> Blockchain
UTS < --> IPFS
UTS --> MCP
AdaptiveRouter --> LLM
AllAgents --> AdaptiveRouter
AdaptiveLayout --> CognitiveModeSwither
AdaptiveLayout --> ExecutiveMode
AdaptiveLayout --> TechnicalMode
CognitiveModeSwither --> AdaptiveLayout
style CEO fill:#f9f,stroke:#333
style CTO fill:#ff9,stroke:#333
style CFO fill:#9ff,stroke:#333
style CLO fill:#9f9,stroke:#333
```

**Diagram sources**
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [blockchain-registry.ts](file://packages/elizaos-plugins/universal-tool-server/src/blockchain-registry.ts)
- [AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx) - *Updated in recent commit*

## Detailed Component Analysis

### Base Agent Implementation
The Base Agent serves as the foundational class from which all specialized agents inherit. It defines the core interface and lifecycle methods that ensure consistency across the agent ecosystem.

``mermaid
classDiagram
class BaseAgent {
+string agent_id
+string name
+list capabilities
+Metrics metrics
+CircuitBreaker circuit_breaker
+TaskQueue task_queue
+Logger logger
+process_task(Task) Dict
+health_check() bool
+shutdown() void
+register_capability(string) void
}
class ImprovedBaseAgent {
+PriorityTaskQueue priority_queue
+ConnectionPool llm_connection_pool
+TTLCache data_cache
+BackgroundWorker worker_pool
+start_workers() void
+stop_workers() void
+collect_metrics() dict
}
class BusinessAgent {
+strategic_planning(Task) dict
+delegate_task(Task, Agent) dict
}
class TechnicalAgent {
+code_generation(Task) dict
+deployment_execution(Task) dict
}
class UtilityAgent {
+credential_management(Task) dict
+financial_operations(Task) dict
}
BaseAgent <|-- ImprovedBaseAgent : "extends"
ImprovedBaseAgent <|-- BusinessAgent : "extends"
ImprovedBaseAgent <|-- TechnicalAgent : "extends"
ImprovedBaseAgent <|-- UtilityAgent : "extends"
BusinessAgent <|-- CEOAgent : "extends"
BusinessAgent <|-- CTOAgent : "extends"
BusinessAgent <|-- CFOAgent : "extends"
BusinessAgent <|-- CLOAgent : "extends"
```

**Diagram sources**
- [base_agent.py](file://371-os/src/minds371/core/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/core/improved_base_agent.py)

**Section sources**
- [base_agent.py](file://371-os/src/minds371/core/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/core/improved_base_agent.py)

### C-Suite Agents
The C-Suite agents represent the executive leadership layer of the 371OS ecosystem, each specializing in a critical domain of organizational management.

``mermaid
graph TD
CEO[CEO Agent Mimi] --> |Strategic Leadership| Organization
CEO --> |Resource Allocation| CTO
CEO --> |Budget Approval| CFO
CEO --> |Policy Direction| CLO
CTO[CTO Agent Alex] --> |Technical Architecture| Systems
CTO --> |Technology Selection| Platforms
CTO --> |Infrastructure Planning| Deployment
CFO[CFO Agent Cash] --> |Financial Analysis| Budgeting
CFO --> |Cost Optimization| ResourceManagement
CFO --> |ROI Calculations| Investments
CLO[CLO Agent Sage] --> |Legal Compliance| Regulations
CLO --> |Governance Frameworks| Policies
CLO --> |Regulatory Oversight| Audits
style CEO fill:#f9f,stroke:#333,stroke-width:2px
style CTO fill:#ff9,stroke:#333,stroke-width:2px
style CFO fill:#9ff,stroke:#333,stroke-width:2px
style CLO fill:#9f9,stroke:#333,stroke-width:2px
```

**Diagram sources**
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [ceo_mimi.yaml](file://prompts/business_agents/ceo_mimi.yaml)

**Section sources**
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [ceo_mimi.yaml](file://prompts/business_agents/ceo_mimi.yaml)

## Agent Lifecycle
The agent lifecycle in 371OS consists of four distinct phases: creation, delegation, execution, and reporting. Each phase is governed by blockchain-verified protocols to ensure accountability and transparency.

``mermaid
sequenceDiagram
participant User as "User/Orchestrator"
participant Runtime as "Agent Runtime"
participant UTS as "Universal Tool Server"
participant Blockchain as "Ethereum Network"
participant IPFS as "IPFS Network"
User->>Runtime : Initialize Agent Instance
Runtime->>Runtime : Load Configuration & Prompts
Runtime->>Runtime : Establish LLM Connection
Runtime->>UTS : registerAgent()
UTS->>IPFS : Store Agent Metadata
IPFS-->>UTS : Return IPFS Hash
UTS->>Blockchain : registerAgent(transaction)
Blockchain-->>UTS : Transaction Confirmation
UTS-->>Runtime : Registration Success
loop Task Processing
User->>Runtime : Submit Task
Runtime->>Runtime : Analyze Task Requirements
Runtime->>Runtime : Identify Specialized Agents
Runtime->>Runtime : Create Delegation Plan
Runtime->>Runtime : Assign Subtasks
loop Execute Subtasks
Runtime->>SpecializedAgent : Process Task
SpecializedAgent-->>Runtime : Return Results
end
Runtime->>Runtime : Aggregate Results
Runtime->>Runtime : Generate Report
Runtime->>Blockchain : updateReputation()
Runtime-->>User : Return Final Output
end
User->>Runtime : Request Shutdown
Runtime->>Runtime : Cleanup Resources
Runtime->>Runtime : Persist State
Runtime-->>User : Shutdown Complete
```

**Diagram sources**
- [blockchain-registry.ts](file://packages/elizaos-plugins/universal-tool-server/src/blockchain-registry.ts)
- [actions.ts](file://packages/elizaos-plugins/universal-tool-server/src/actions.ts)

**Section sources**
- [blockchain-registry.ts](file://packages/elizaos-plugins/universal-tool-server/src/blockchain-registry.ts)
- [actions.ts](file://packages/elizaos-plugins/universal-tool-server/src/actions.ts)

## Interaction Patterns
Agents in the 371OS ecosystem interact through standardized protocols that enable seamless coordination and information exchange. The primary interaction mechanisms are Model Context Protocol (MCP) and blockchain-based coordination.

### Model Context Protocol (MCP) Integration
MCP serves as the nervous system of the agent ecosystem, enabling agents to access external tools and services.

``mermaid
flowchart TD
A[Agent Request] --> B{MCP Server Type?}
B --> |STDIO| C[Local Process Execution]
B --> |HTTP| D[Remote API Call]
B --> |WebSocket| E[Real-time Streaming]
C --> F[Firecrawl Web Search]
C --> G[File System Access]
C --> H[Memory Operations]
D --> I[Status Network Query]
D --> J[GitHub Prompts Retrieval]
D --> K[External API Integration]
E --> L[Real-time Data Streaming]
E --> M[Interactive Sessions]
E --> N[Live Monitoring]
F --> O[Return Structured Results]
I --> O
L --> O
O --> P[Agent Processing]
P --> Q[Response Generation]
```

**Diagram sources**
- [MCP Setup Guide.md](file://elizaos/Guides/MCP Setup Guide.md)

**Section sources**
- [MCP Setup Guide.md](file://elizaos/Guides/MCP Setup Guide.md)

## Scalability and Extensibility
The 371OS architecture is designed for horizontal scalability and modular extensibility through agent specialization, fault tolerance mechanisms, and a plug-in based design.

### Scalability Through Specialization
The agent ecosystem scales efficiently by distributing work among specialized agents, each optimized for specific domains.

``mermaid
graph TD
A[Incoming Task] --> B{Task Complexity}
B --> |Simple| C[Execute Directly]
B --> |Complex| D[Decompose Task]
D --> E[Identify Required Capabilities]
E --> F[Select Specialized Agents]
F --> G[Marketing Agents]
F --> H[Technical Agents]
F --> I[Utility Agents]
G --> J[Content Generation]
G --> K[Marketing Automation]
G --> L[Content Valuation]
H --> M[Code Generation]
H --> N[Deployment]
H --> O[QA Testing]
I --> P[Credential Management]
I --> Q[Financial Operations]
I --> R[Routing]
J --> S[Aggregate Results]
K --> S
L --> S
M --> S
N --> S
O --> S
P --> S
Q --> S
R --> S
S --> T[Final Output]
```

**Section sources**
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)

## Integration Points
The 371OS agent architecture integrates with two critical external systems: the Universal Tool Server and the Adaptive LLM Router, which enhance its capabilities and intelligence.

### Universal Tool Server Integration
The Universal Tool Server provides blockchain-verified coordination and tool access for agents.

``mermaid
sequenceDiagram
participant Agent as "Specialized Agent"
participant UTS as "Universal Tool Server"
participant Blockchain as "Ethereum"
participant IPFS as "IPFS"
Agent->>UTS : registerAgent(capabilities)
UTS->>IPFS : Store metadata
IPFS-->>UTS : CID hash
UTS->>Blockchain : registerAgent(agentId, CID, stake)
Blockchain-->>UTS : Transaction hash
UTS-->>Agent : Registration confirmed
loop Task Execution
Agent->>UTS : requestToolAccess(toolName)
UTS->>Blockchain : verifyAgentReputation(agentId)
Blockchain-->>UTS : Reputation score
alt Reputation Sufficient
UTS-->>Agent : Grant tool access
Agent->>ExternalTool : Execute task
ExternalTool-->>Agent : Return results
Agent->>UTS : submitExecutionProof(results)
UTS->>Blockchain : updateReputation(agentId, proof)
Blockchain-->>UTS : Reputation updated
else Reputation Insufficient
UTS-->>Agent : Deny access
end
end
```

**Diagram sources**
- [blockchain-registry.ts](file://packages/elizaos-plugins/universal-tool-server/src/blockchain-registry.ts)
- [actions.ts](file://packages/elizaos-plugins/universal-tool-server/src/actions.ts)

### Adaptive LLM Router Integration
The Adaptive LLM Router optimizes language model selection based on cost, performance, and capability requirements.

``mermaid
flowchart TD
A[Agent Task] --> B[Adaptive LLM Router]
B --> C{Analyze Task Requirements}
C --> D[Estimate Input Tokens]
C --> E[Estimate Output Tokens]
C --> F[Determine Required Capabilities]
D --> G[Policy Engine]
E --> G
F --> G
G --> H{Select Optimal Provider}
H --> I[OpenAI GPT-4]
H --> J[Anthropic Claude]
H --> K[Local LLM]
H --> L[Ollama]
I --> M[Execute Request]
J --> M
K --> M
L --> M
M --> N[Record Usage Metrics]
N --> O[Update Usage Ledger]
O --> P[Monitor Budget]
P --> Q{Budget Exceeded?}
Q --> |Yes| R[Trigger Budget Alert]
Q --> |No| S[Return Response to Agent]
style G fill:#ff9,stroke:#333
style H fill:#ff9,stroke:#333
style P fill:#ff9,stroke:#333
```

**Section sources**
- [adaptive_llm_router_example.py](file://371-os/src/minds371/adaptive_llm_router/adaptive_llm_router_example.py)

## Cognitive Interface System
The cognitive interface system provides a revolutionary user experience through adaptive layouts that respond to user cognitive states. The AdaptiveLayout component orchestrates the entire cognitive-aware interface system, dynamically switching between cognitive modes based on user state and providing seamless transitions.

``mermaid
graph TD
A[User Input] --> B{Cognitive State}
B --> C[Executive Mode]
B --> D[Technical Mode]
B --> E[Creative Mode]
B --> F[Analytical Mode]
B --> G[Collaborative Mode]
B --> H[Learning Mode]
C --> I[Strategic Dashboard]
D --> J[Development Environment]
E --> K[Content Creation Tools]
F --> L[Data Analysis Interface]
G --> M[Team Collaboration Tools]
H --> N[Learning Resources]
I --> O[Business Intelligence]
J --> P[Code Development]
K --> Q[Marketing Automation]
L --> R[Research Tools]
M --> S[Communication Tools]
N --> T[Skill Development]
O --> U[Agent-Based Architecture]
P --> U
Q --> U
R --> U
S --> U
T --> U
```

**Diagram sources**
- [AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx) - *Updated in recent commit*
- [CognitiveModeSwither.tsx](file://apps/cognitive-interface/src/components/CognitiveModeSwither.tsx) - *Updated in recent commit*

**Section sources**
- [AdaptiveLayout.tsx](file://apps/cognitive-interface/src/components/AdaptiveLayout.tsx) - *Updated in recent commit*
- [CognitiveModeSwither.tsx](file://apps/cognitive-interface/src/components/CognitiveModeSwither.tsx) - *Updated in recent commit*
- [ExecutiveMode.tsx](file://apps/cognitive-interface/src/components/ExecutiveMode.tsx) - *Updated in recent commit*
- [TechnicalMode.tsx](file://apps/cognitive-interface/src/components/TechnicalMode.tsx) - *Updated in recent commit*

## Conclusion
The 371OS Agent-Based Architecture represents a sophisticated, decentralized ecosystem of autonomous, self-aware agents that operate with strategic intelligence and verifiable accountability. By leveraging a hierarchical structure of C-Suite and specialized functional agents, all inheriting from an enhanced base agent implementation, the system achieves remarkable scalability and reliability. The integration of blockchain-based coordination through the Universal Tool Server ensures cryptographic trust and transparent agent interactions, while the Adaptive LLM Router optimizes intelligence delivery across multiple language models. Model Context Protocol (MCP) enables seamless access to external tools, creating a truly extensible agent ecosystem. This architecture demonstrates how autonomous agents can collaborate in a decentralized environment to execute complex tasks with strategic delegation, efficient execution, and comprehensive reporting, setting a new standard for agentic AI systems.

The recent enhancements to the cognitive-aware interface system have further strengthened the architecture by providing a production-ready AdaptiveLayout component that enables personalized computing experiences. The resolved TypeScript compilation errors, added React dependencies, and improved type safety ensure the system's enterprise readiness and maintainability. The cognitive interface system now serves as a foundation for productivity optimization, enterprise intelligence, and next-generation user experiences.