# C-Suite Agents

<cite>
**Referenced Files in This Document**   
- [THINNG_ARCHITECTURAL_ENHANCEMENTS.md](file://THINNG_ARCHITECTURAL_ENHANCEMENTS.md) - *Updated in recent commit: Enhanced mathematical positioning and relationship calculations*
- [ceo-agent/src/types.ts](file://core\os-workspace\apps\ceo-agent\src\types.ts) - *CEO Agent type definitions with unified brain/body architecture*
- [cto-agent/src/types.ts](file://core\os-workspace\apps\cto-agent\src\types.ts) - *CTO Agent technical leadership types*
- [cfo-agent/src/types.ts](file://core\os-workspace\apps\cfo-agent\src\types.ts) - *CFO Agent financial analysis type system*
- [clo-agent/src/types.ts](file://core\os-workspace\apps\clo-agent\src\types.ts) - *CLO Agent legal compliance type definitions*
- [improved_base_agent.py](file://legacy\_legacy\core\improved_base_agent.py) - *Core base class for all C-Suite agents*
- [questflow/agents/core](file://core\questflow\agents\core) - *C-Suite agent configuration and prompt templates*
</cite>

## Update Summary
**Changes Made**   
- Updated documentation to reflect mathematical precision enhancements using thi.ng vectors and matrices
- Added detailed type system documentation for CEO, CTO, CFO, and CLO agents
- Integrated information about Vec3 positioning and relationship strength calculations
- Updated project structure to reflect TypeScript-based type definitions
- Enhanced section sources with precise file references and line numbers
- Added new sections on mathematical foundation layer and spatial computing architecture
- Updated diagram sources to reference actual implementation files
- Verified inheritance model from improved_base_agent.py
- Confirmed integration points with Adaptive LLM Router for cost-aware reasoning

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [C-Suite Meetings](#c-suite-meetings)
7. [Dependency Analysis](#dependency-analysis)
8. [Performance Considerations](#performance-considerations)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Conclusion](#conclusion)

## Introduction
The C-Suite Agents represent a strategic layer within the 371-OS agent ecosystem, functioning as executive decision-makers responsible for high-level orchestration, domain-specific oversight, and cross-functional coordination. Each agent emulates a real-world executive role, leveraging specialized knowledge and delegated authority to manage distinct aspects of the system's operations. This document provides a comprehensive analysis of the architecture, functionality, and integration patterns of these agents, including CEO Agent (Mimi), CTO Agent (Zara), CFO Agent (Maya), CLO Agent (Alex), CMO Agent (Anova), CGO Agent, and CPO Agent. The analysis includes their inheritance model, interaction protocols, prompt engineering foundations, and performance monitoring mechanisms. Recent updates have introduced mathematical precision using thi.ng vectors and matrices for enhanced positioning and relationship calculations, significantly strengthening the strategic decision-making capabilities of the executive layer. The agents now utilize Vec3 positions and mathematical relationship strength calculations based on mass and distance, enabling more sophisticated spatial reasoning and business entity positioning within the CEO's Orrery visualization system.

## Project Structure
The C-Suite Agents are organized within the `core/os-workspace/apps/` directory, each implemented as a dedicated TypeScript application following the unified brain/body architecture pattern. These agents inherit core functionality from `improved_base_agent.py`, which is available in the `legacy/_legacy/core/` directory, indicating a shared base implementation across the agent ecosystem. The agents interact with the Adaptive LLM Router for cost-aware reasoning and utilize `usage_ledger.py` for audit logging and resource tracking. Configuration for these agents is managed through YAML files in `questflow/agents/core/` and TypeScript type definitions in their respective `src/types.ts` files, reflecting a dual-configuration approach for different operational contexts. The CEO Agent (Mimi) has been enhanced with a refactored TypeScript implementation where the "brain" consists of the agent definition in `ceo_mimi.json` and the "body" comprises the TypeScript application in `os-workspace/apps/ceo-agent/src/`. Similarly, the CTO Agent (Zara) has been refactored with the same unified brain/body architecture pattern, with its "brain" defined in `cto_alex.json` and its "body" implemented in `os-workspace/apps/cto-agent/src/`. The CFO Agent (Maya) follows the same unified brain/body architecture pattern, with its "brain" defined in `cfo_maya.json` and its "body" implemented in `os-workspace/apps/cfo-agent/src/`. The CLO Agent (Alex) has been updated with comprehensive type definitions for legal compliance and governance in `clo-agent/src/types.ts`.

```mermaid
graph TD
subgraph "Agents"
CEO[CEO Agent (Mimi)]
CFO[CFO Agent (Maya)]
CTO[CTO Agent (Zara)]
CLO[CLO Agent (Alex)]
CMO[CMO Agent (Anova)]
CGO[CGO Agent]
CPO[CPO Agent]
end
subgraph "Core Infrastructure"
BaseAgent[improved_base_agent.py]
Router[Adaptive LLM Router]
Ledger[usage_ledger.py]
thiNG[thi.ng Vectors & Matrices]
end
subgraph "Configuration"
YAMLConfig[questflow/agents/core/]
TypeDefinitions[Agent-specific types.ts]
BrainCEO[ceo_mimi.json]
BrainCTO[cto_alex.json]
BrainCFO[cfo_maya.json]
BrainCLO[clo_alex.json]
end
subgraph "Mathematical Foundation"
Vec3[Vec3 Positioning]
Matrix4[Matrix4 Transformations]
RelationshipStrength[Mathematical Relationship Strength]
BusinessEntity[BusinessEntity Interface]
end
subgraph "Spatial Computing"
CEOOrrery[CEO's Orrery]
DeveloperGalaxy[Developer's Galaxy]
BusinessUniverse[Business Universe Geometry]
CodeVisualization[Code Visualization]
end
CEO --> BaseAgent
CFO --> BaseAgent
CTO --> BaseAgent
CLO --> BaseAgent
CMO --> BaseAgent
CGO --> BaseAgent
CPO --> BaseAgent
CEO --> Router
CFO --> Router
CTO --> Router
CLO --> Router
CMO --> Router
CGO --> Router
CPO --> Router
Router --> Ledger
CEO --> YAMLConfig
CEO --> TypeDefinitions
CTO --> TypeDefinitions
CFO --> TypeDefinitions
CLO --> TypeDefinitions
CEO --> thiNG
CTO --> thiNG
CFO --> thiNG
CLO --> thiNG
thiNG --> Vec3
thiNG --> Matrix4
thiNG --> RelationshipStrength
Vec3 --> BusinessEntity
Matrix4 --> BusinessEntity
RelationshipStrength --> BusinessEntity
BusinessEntity --> CEOOrrery
BusinessEntity --> DeveloperGalaxy
CEOOrrery --> BusinessUniverse
DeveloperGalaxy --> CodeVisualization
style CEO fill:#f9f,stroke:#333
style CFO fill:#f9f,stroke:#333
style CTO fill:#f9f,stroke:#333
style CLO fill:#f9f,stroke:#333
style CMO fill:#f9f,stroke:#333
style CGO fill:#f9f,stroke:#333
style CPO fill:#f9f,stroke:#333
style thiNG fill:#00ccff,stroke:#333
style BusinessEntity fill:#00ccff,stroke:#333
style CEOOrrery fill:#00ccff,stroke:#333
style DeveloperGalaxy fill:#00ccff,stroke:#333
```

**Diagram sources**
- [THINNG_ARCHITECTURAL_ENHANCEMENTS.md](file://THINNG_ARCHITECTURAL_ENHANCEMENTS.md#L0-L568)
- [ceo-agent/src/types.ts](file://core\os-workspace\apps\ceo-agent\src\types.ts#L0-L410)
- [cto-agent/src/types.ts](file://core\os-workspace\apps\cto-agent\src\types.ts#L0-L364)
- [cfo-agent/src/types.ts](file://core\os-workspace\apps\cfo-agent\src\types.ts#L0-L656)
- [clo-agent/src/types.ts](file://core\os-workspace\apps\clo-agent\src\types.ts#L0-L509)

**Section sources**
- [THINNG_ARCHITECTURAL_ENHANCEMENTS.md](file://THINNG_ARCHITECTURAL_ENHANCEMENTS.md#L0-L568) - *Updated in recent commit: Mathematical precision enhancements*
- [ceo-agent/src/types.ts](file://core\os-workspace\apps\ceo-agent\src\types.ts#L334-L362) - *BusinessEntity interface with Vec3 positions*
- [cto-agent/src/types.ts](file://core\os-workspace\apps\cto-agent\src\types.ts#L0-L364) - *Technical leadership type system*
- [cfo-agent/src/types.ts](file://core\os-workspace\apps\cfo-agent\src\types.ts#L0-L656) - *Financial analysis type system*
- [clo-agent/src/types.ts](file://core\os-workspace\apps\clo-agent\src\types.ts#L0-L509) - *Legal compliance type system*