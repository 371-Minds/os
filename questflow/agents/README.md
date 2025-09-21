# QuestFlow Agents with Full Backstories

*Revolutionary AI agents with comprehensive backstories and autonomous capabilities for the 371 OS ecosystem.*

[![Agents](https://img.shields.io/badge/Agents-Core_Suite-blue.svg)](./core/)
[![ElizaOS](https://img.shields.io/badge/Powered_by-ElizaOS-purple.svg)](https://elizaos.ai/)
[![Architecture](https://img.shields.io/badge/Architecture-Unified-green.svg)](../../os-workspace/)

## 🌟 Overview

This directory contains enhanced QuestFlow agents with comprehensive backstories, similar to ElizaOS agents. Each agent includes detailed biographical information, lore, knowledge domains, and communication styles.

## 🏗️ Unified Architecture (371 OS)

**Critical Note**: As part of the 371 OS unified architecture, new agents should follow the **brain/body separation pattern**:

### Agent Architecture Pattern
- **🧠 Agent "Brain"**: Defined in [`os-workspace/libs/prompts/agent-definitions/`](../../os-workspace/libs/prompts/agent-definitions/) as YAML files
- **🤖 Agent "Body"**: Implemented as dedicated Nx applications in [`os-workspace/apps/`](../../os-workspace/apps/)
- **🔗 Integration**: ElizaOS plugins for enhanced capabilities

### ✨ Reference Implementation
For examples of the new unified architecture, see the [**Chief of Staff Agent (Ortega)**](../../os-workspace/apps/chief-of-staff-agent/) implementation.

## 🎯 Migration Strategy

| Legacy Approach | Unified Architecture | Benefits |
|----------------|---------------------|----------|
| JSON definitions | YAML brain + TypeScript body | Better separation, maintainability |
| Single file | Split brain/body | Cleaner architecture, reusability |
| Static configuration | Dynamic agent capabilities | Self-awareness, self-modification |
| QuestFlow only | ElizaOS + Nx workspace | Enterprise-grade tooling |

## 📚 Agent Structure

Each agent configuration includes:

### 📝 Core Components
- **📊 Basic Information**: name, role, description, version
- **⚙️ Provider Details**: provider, model, parameters, capabilities
- **📖 Backstory Elements**: bio, lore, knowledge, personality traits
- **💬 Communication Style**: messageExamples, postExamples, tone, style
- **🎨 Expertise**: topics, adjectives, specializations, skills
- **🔧 Functionality**: instructions, plugins, actions, evaluators
- **⛓️ Blockchain Integration**: decentralized identity (DID), reputation, staking

### 🔄 Enhanced Capabilities (Unified Architecture)
- **🧠 Self-Awareness**: Understanding of workspace structure and capabilities
- **🔄 Self-Modification**: Ability to modify own configuration and code
- **🤝 Cross-Agent Coordination**: Blockchain-verified multi-agent workflows
- **📊 Real-time Analytics**: Integrated performance monitoring and optimization
- **🔒 Economic Incentives**: Stake-based reputation for reliable behavior

## 🗂️ Template System

Use the [`templates/agent-backstory-template.json`](./templates/agent-backstory-template.json) as a starting point for creating new agents with full backstories.

### Template Structure
```json
{
  "name": "Agent Name",
  "role": "Primary Function",
  "description": "Detailed description",
  "provider": "openai",
  "model": "gpt-4o-mini",
  "bio": [
    "Biographical entry 1",
    "Biographical entry 2",
    "Biographical entry 3"
  ],
  "lore": [
    "Background story element",
    "Historical context",
    "Personality development"
  ],
  "knowledge": [
    "Domain expertise 1",
    "Technical knowledge 2",
    "Industry insights 3"
  ],
  "style": {
    "communication": "Professional yet approachable",
    "tone": "Analytical and strategic",
    "approach": "Data-driven decision making"
  },
  "blockchain": {
    "did": "did:371minds:unique-identifier",
    "capabilities": ["strategic-planning", "cost-optimization"],
    "reputation": 95,
    "stakeAmount": "1.0"
  }
}
```

## ✨ Benefits of Full Backstories

### 📈 Enhanced Performance
1. **🧠 Enhanced Context**: Agents understand their role and responsibilities more deeply
2. **🎨 Consistent Personality**: Standardized communication style and tone across interactions
3. **📚 Domain Expertise**: Clear knowledge boundaries and specialized capabilities
4. **📋 Better Interaction**: Improved examples for training and demonstration purposes
5. **⛓️ Blockchain Identity**: Integrated decentralized identification and reputation system
6. **📉 Performance Analytics**: Built-in monitoring and optimization capabilities
7. **🔄 Autonomous Operations**: Self-modification and adaptation capabilities

## 🚀 Creating New Agents

### 🎯 Legacy QuestFlow Agents (JSON Format)
*Maintained for backward compatibility*

```bash
# 1. Copy the template
cp templates/agent-backstory-template.json core/new-agent-name.json

# 2. Customize all fields with agent-specific information
# 3. Ensure blockchain DID is unique
# 4. Test the agent configuration for consistency
node ../dev-team/scripts/validate-agents.js
```

### ⭐ New Unified Architecture Agents (Recommended)
*Follow the 371 OS unified architecture pattern*

#### Step 1: Create Agent "Brain" (YAML Definition)
```bash
# Create agent definition
touch ../../os-workspace/libs/prompts/agent-definitions/agent-name.yml
```

#### Step 2: Generate Agent "Body" (Nx Application)
```bash
# Generate agent application
bun nx generate @nx/node:application agent-name --directory=apps/agent-name
```

#### Step 3: Follow Established Pattern
- Review the [**Chief of Staff Agent (Ortega)**](../../os-workspace/apps/chief-of-staff-agent/) implementation
- Implement ElizaOS plugin integration
- Add blockchain coordination capabilities
- Validate using agent definition standards

#### Step 4: Integration and Testing
```bash
# Build the agent
bun nx build agent-name

# Test the agent
bun nx test agent-name

# Start the agent
bun --watch apps/agent-name/src/index.ts
```

### 🔍 Agent Development Standards

#### Required Components
- **YAML Brain Definition**: Core personality and capabilities
- **TypeScript Body Implementation**: Runtime execution logic
- **ElizaOS Plugin Integration**: Enhanced agent capabilities
- **Blockchain Registry Entry**: Decentralized identity and reputation
- **Test Suite**: Comprehensive testing coverage
- **Documentation**: Clear usage and integration guide

#### Quality Checklist
- ✅ Follows unified architecture pattern
- ✅ Implements brain/body separation
- ✅ Includes comprehensive backstory
- ✅ Has blockchain identity (DID)
- ✅ Passes all validation tests
- ✅ Includes monitoring and analytics
- ✅ Supports self-modification capabilities

## 📁 Directory Structure

```
questflow/agents/
├── core/                          # 🏆 Core C-Suite and essential agents
│   ├── ceo-mimi.json              # CEO Mimi - Strategic leadership
│   ├── cfo-agent-prompt.json      # CFO - Financial management
│   ├── cto-agent-prompt.json      # CTO - Technical architecture
│   ├── clo-agent-prompt.json      # CLO - Legal compliance
│   ├── cmo-agent-prompt.json      # CMO - Marketing strategy
│   └── cpo-agent.json             # CPO - Product optimization
│
├── specialized/                 # 🔧 Agents with specific domain expertise
│   ├── business-intelligence.json  # BI analytics and reporting
│   ├── content-generation-agent.json # Content creation
│   ├── qa-automation-agent.json   # Quality assurance
│   ├── deployment-agent.json      # Akash Network deployment
│   └── social-media-manager.json  # Social media automation
│
├── templates/                   # 🗂️ Templates for creating new agents
│   ├── agent-backstory-template.json # Full backstory template
│   └── example-agent.json         # Basic agent example
│
└── README.md                    # 📚 This documentation file
```

### 🔗 Related Directories

```
os-workspace/                     # ⭐ New unified architecture
├── libs/prompts/agent-definitions/ # 🧠 Agent "brains" (YAML)
├── apps/                          # 🤖 Agent "bodies" (TypeScript)
└── packages/                      # 🔌 ElizaOS plugins and tools

questflow/dev-team/               # 🛠️ Development support tools
├── apps/api/agents/              # Agent API integrations
├── libs/agents-core/             # Shared agent utilities
└── scripts/                      # Agent validation and migration
```

## 🗺️ Migration Roadmap

### 📅 Phase 1: Assessment (Current)
- ✅ **Legacy Agents**: 25+ JSON-based agents with full backstories
- ✅ **Unified Example**: Chief of Staff Agent (Ortega) implemented
- ✅ **Infrastructure**: Nx workspace and ElizaOS integration ready

### 📅 Phase 2: Core Agents Migration
- 🗓️ **Priority**: CEO, CTO, CFO, CLO agents to unified architecture
- 🗓️ **Timeline**: Q1 2025
- 🗓️ **Benefits**: Self-awareness, blockchain coordination, cost optimization

### 📅 Phase 3: Specialized Agents Migration
- 🗓️ **Scope**: QA, deployment, content generation agents
- 🗓️ **Timeline**: Q2 2025
- 🗓️ **Features**: Advanced autonomy, cross-agent workflows

### 📅 Phase 4: Complete Ecosystem
- 🗓️ **Goal**: Full autonomous agent coordination
- 🗓️ **Timeline**: Q3 2025
- 🗓️ **Achievement**: 97.6% cost reduction, enterprise deployment

## 🔗 Related Documentation

- 📚 [**QuestFlow Dev Team**](../dev-team/README.md) - Development support and tools
- 🏗️ [**371 OS Architecture**](../../README.md) - Complete system overview
- 🧠 [**Chief of Staff Agent**](../../os-workspace/apps/chief-of-staff-agent/) - Unified architecture example
- 🛠️ [**Development Guide**](../dev-team/DEV.md) - Technical implementation details
- ⛓️ [**Blockchain Registry**](../../os-workspace/libs/blockchain-registry/) - Decentralized coordination