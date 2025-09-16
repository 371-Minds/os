# 371 OS Project Rules for Qoder

## 🏗️ Project Architecture Overview

371 OS is a **revolutionary autonomous agent operating system** built on ElizaOS with Nx workspace management, featuring:
- **Universal Tool Server** architecture (beyond MCP limitations)
- **Blockchain-based agent coordination**
- **Self-aware agents** with workspace manipulation capabilities
- **Akash Network integration** for 97.6% cost reduction
- **Enterprise security** with Secretless Broker and ACI.dev
- **Puter.js integration** for cloud storage, AI, and hosting capabilities

## 📁 Project Structure Conventions

### Workspace Layout
```
371-minds-os/
├── apps/                           # Application packages
├── packages/                       # Library packages (libsDir)
│   └── elizaos-plugins/           # ElizaOS plugin ecosystem
│       ├── nx-workspace/          # Self-aware workspace manipulation
│       └── universal-tool-server/ # Blockchain agent coordination
├── 371-os/                       # Legacy documentation and agent logic
├── COMMANDS.md                   # AI agent command reference
├── INTEGRATION_ROADMAP.md        # Strategic implementation guide
└── nx.json                       # Nx workspace configuration
```

### Package Naming Conventions
- **ElizaOS Plugins**: `@elizaos/plugin-{feature-name}`
- **Applications**: `{app-name}` (in apps directory)
- **Libraries**: `@371minds/{lib-name}` (in packages directory)
- **Agents**: Follow pattern `{ROLE}_Agent_Logic.md` (e.g., `CEO_Agent_Logic.md`)

## 🔧 Development Conventions

### File Naming
- **TypeScript files**: `kebab-case.ts` (e.g., `blockchain-registry.ts`)
- **Actions/Handlers**: `{feature}.action.ts` or `actions.ts`
- **Types/Interfaces**: `types.ts` or `{feature}.types.ts`
- **Tests**: `{filename}.spec.ts` or `{filename}.test.ts`
- **Documentation**: `UPPERCASE.md` for root docs, `README.md` for packages

### Puter.js Integration Patterns
- **Cloud Storage**: Use `puter.fs` for file operations
- **AI Capabilities**: Use `puter.ai` for chat, image generation, and OCR
- **Key-Value Store**: Use `puter.kv` for simple data persistence
- **Hosting**: Use `puter.hosting` for static website deployment
- **Authentication**: Use `puter.auth` for user authentication

### Code Organization
```typescript
// Standard ElizaOS plugin structure
export interface Action {
  name: string;
  description: string;
  handler: ActionHandler;
  validate?: ValidateFunction;
  examples?: ActionExample[];
}

// Agent registry patterns
export interface AgentRegistryEntry {
  agentId: string;
  did: string;
  capabilities: AgentCapability[];
  reputation: ReputationScore;
  stakeAmount: bigint;
}

// Puter.js integration patterns
export interface PuterIntegration {
  storage: typeof puter.fs;
  ai: typeof puter.ai;
  kv: typeof puter.kv;
  hosting: typeof puter.hosting;
  auth: typeof puter.auth;
}
```

### Import Conventions
```typescript
// ElizaOS core imports
import { Action, ActionHandler, Plugin } from '@elizaos/core';

// Nx workspace utilities
import { readProjectConfiguration, workspaceRoot } from '@nx/devkit';

// Blockchain dependencies
import { ethers } from 'ethers';
import { Web3Storage } from 'web3.storage';

// Puter.js integration
import puter from 'puter';
// Or for specific modules:
// import { fs as puterFs, ai as puterAi } from 'puter';
```

## 🤖 Agent-Specific Conventions

### Agent Roles and Responsibilities
- **CEO (Mimi)**: Strategic decisions, cost optimization, high-level coordination
- **CTO (Zara)**: Technical architecture, plugin development, system design
- **CLO**: Legal compliance, governance, regulatory frameworks
- **CFO**: Financial analysis, budget allocation, ROI optimization
- **CMO**: Marketing strategy, growth metrics, user engagement

### Command Patterns
```bash
# Nx workspace operations (prefer affected analysis)
bun nx affected -t build                    # Build only affected projects
bun nx affected -t test                     # Test only affected projects
bun nx graph --affected                     # Visualize affected dependency graph

# ElizaOS plugin development
bun nx generate @elizaos/plugin:{generator} # Generate plugin components
bun nx build @elizaos/plugin-{name}        # Build specific plugin
bun nx test @elizaos/plugin-{name}          # Test specific plugin

# Akash Network deployment (97.6% cost reduction)
akash tx deployment create deploy.yml   # Deploy to Akash Network
akash query deployment get {dseq}       # Query deployment status
akash tx market lease create {bid}      # Create lease for deployment

# Universal Tool Server operations
elizaos:register-agent                  # Register in blockchain registry
elizaos:discover-tools                  # Discover available tools
elizaos:execute-universal-tool          # Execute cross-network tools

# Puter.js operations
puter:deploy-app                        # Deploy application to Puter
puter:publish-website                   # Publish static website
puter:manage-storage                    # Manage cloud storage
puter:use-ai                            # Access AI capabilities
```

## 📋 Documentation Standards

### README Structure for Packages
```markdown
# Package Name

Brief description of package purpose and role in 371 OS ecosystem.

## 🚀 Features
- Feature 1 (with benefit)
- Feature 2 (with impact on cost/efficiency)

## 🏗️ Architecture
Technical architecture with blockchain/ElizaOS integration details.

## 📖 Usage
```typescript
// Code examples showing integration patterns
```

## 🔗 Related Packages
Links to related ElizaOS plugins and dependencies.
```

### Commit Message Conventions
```bash
# Types: feat, fix, docs, style, refactor, test, chore
feat(plugin-name): Add blockchain registry integration
fix(nx-workspace): Resolve affected analysis caching issue
docs(agents): Update CEO command reference for Akash integration
refactor(types): Improve agent capability interface
test(universal-tool): Add integration tests for cross-network calls
chore(deps): Update ElizaOS core to latest version
```

## 🔐 Security and Enterprise Integration

### Secretless Broker Patterns
```yaml
# secretless.yml configuration pattern
version: "2"
services:
  - name: elizaos-agent
    connector: generic_http
    authentication:
      - type: oauth2
        config:
          token_url: "${ACI_TOKEN_URL}"
          client_id: "${ACI_CLIENT_ID}"
          scope: "agent:execute"
```

### ACI.dev Integration
```typescript
// Enterprise security injection pattern
export interface SecureAgentContext {
  aciCredentials: ACICredentials;
  secretlessConfig: SecretlessConfig;
  enterprisePermissions: Permission[];
}
```

## 🌐 Blockchain and Decentralization Patterns

### Smart Contract Interaction
```typescript
// Standard pattern for blockchain operations
export class BlockchainRegistryProvider {
  private contract: ethers.Contract;
  private ipfs: IPFSClient;
  
  async registerAgent(entry: AgentRegistryEntry): Promise<string> {
    // 1. Store metadata in IPFS
    const ipfsHash = await this.storeMetadata(entry);
    
    // 2. Register on blockchain with stake
    const tx = await this.contract.registerAgent(
      ethers.id(entry.agentId),
      ipfsHash,
      entry.stakeAmount
    );
    
    return tx.hash;
  }
}
```

### IPFS Storage Patterns
```typescript
// Distributed metadata storage
export interface IPFSMetadata {
  agentCapabilities: AgentCapability[];
  toolDefinitions: UniversalToolDefinition[];
  reputationHistory: ReputationEvent[];
  lastUpdated: number;
}
```

## 🎯 Performance and Cost Optimization

### Nx Affected Analysis Rules
- **Always use affected commands** for builds and tests
- **Cache aggressive targets** (build, test, lint)
- **Minimize workspace dependencies** to improve affected analysis
- **Use project boundaries** to enforce clean architecture

### Akash Network Deployment Guidelines
- **Containerize services** for Akash deployment
- **Use resource-efficient base images** (Alpine Linux preferred)
- **Implement horizontal scaling** for agent workloads
- **Monitor resource usage** for cost optimization

## 🧪 Testing Conventions

### Test Structure
```typescript
describe('@elizaos/plugin-universal-tool-server', () => {
  describe('BlockchainRegistryProvider', () => {
    it('should register agent in blockchain registry', async () => {
      // Arrange: Setup test environment
      const mockAgent = createMockAgent();
      
      // Act: Execute operation
      const result = await registry.registerAgent(mockAgent);
      
      // Assert: Verify blockchain state
      expect(result).toMatch(/^0x[a-fA-F0-9]{64}$/);
    });
  });
});
```

### Integration Test Patterns
```typescript
// Cross-plugin integration tests
describe('Agent Cross-Communication', () => {
  it('should coordinate between nx-workspace and universal-tool-server plugins', async () => {
    // Test agent self-awareness with blockchain coordination
  });
});
```

## 🚀 Deployment and CI/CD

### Build Targets
```json
// project.json patterns for ElizaOS plugins
{
  "name": "plugin-name",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "options": {
        "outputPath": "dist/packages/elizaos-plugins/plugin-name",
        "main": "src/index.ts",
        "tsConfig": "tsconfig.lib.json"
      }
    },
    "test": {
      "executor": "nx:run-commands",
      "options": {
        "command": "bun test {projectRoot}"
      }
    }
  }
}
```

### Release Process
1. **Development**: Work on `genspark_ai_developer` branch
2. **Testing**: Run affected tests and integration checks
3. **Commit**: Use conventional commits with comprehensive messages
4. **Pull Request**: Create PR to `main` with detailed description
5. **Merge**: Squash commits for clean history
6. **Release**: Use `nx release` for version management

## 🎨 Code Style Guidelines

### TypeScript Preferences
- **Strict mode enabled** in tsconfig.json
- **Interface over type** for object shapes
- **Async/await over Promises** for readability
- **Functional programming patterns** where applicable
- **Comprehensive JSDoc comments** for public APIs

### ElizaOS Plugin Patterns
```typescript
// Standard plugin export structure
export default {
  name: 'plugin-name',
  description: 'Plugin purpose in 371 OS ecosystem',
  actions: [action1, action2],
  evaluators: [evaluator1],
  providers: [provider1],
  services: [service1]
} as Plugin;
```

## 💡 Best Practices

### Agent Self-Awareness
- **Agents should understand their workspace structure** via nx-workspace plugin
- **Use affected analysis** to minimize unnecessary work
- **Implement capability discovery** through blockchain registry
- **Maintain agent reputation scores** for trust verification

### Universal Tool Server Usage
- **Register agent capabilities** on blockchain for discovery
- **Verify tool integrity** before execution
- **Implement economic incentives** through staking mechanisms
- **Use IPFS for metadata storage** to ensure decentralization

### Cost Optimization
- **Leverage Nx caching** for build and test efficiency
- **Deploy to Akash Network** for 97.6% infrastructure cost reduction
- **Use affected analysis** to minimize CI/CD resource usage
- **Implement intelligent resource allocation** based on workload patterns

### Puter.js Integration
- **Leverage the User Pays Model** to eliminate infrastructure costs - users cover their own cloud and AI usage
- **Use cloud storage** for file operations instead of local storage through `puter.fs`
- **Integrate AI capabilities** for advanced functionality through `puter.ai`
- **Implement authentication** through Puter's secure system via `puter.auth`
- **Deploy applications** using Puter's hosting capabilities through `puter.hosting`
- **Use key-value store** for simple data persistence with `puter.kv`
- **Create serverless workers** for backend functionality with `puter.workers`

---

## 🔄 Migration Guidelines

### From MCP to Universal Tool Server
- **Replace stateful connections** with blockchain-based discovery
- **Implement cryptographic verification** for all tool interactions
- **Add economic incentives** through stake-based reputation
- **Enable cross-network communication** for multi-agent coordination

### Legacy Python Agent Integration
- **Convert Python logic** to ElizaOS prompt-based agents
- **Maintain agent personality** and decision-making patterns
- **Integrate with Nx workspace** for self-awareness capabilities
- **Implement blockchain coordination** for autonomous operation

### Puter.js Integration Migration
- **Replace external cloud services** with Puter.js equivalents
- **Migrate file storage** to `puter.fs` operations
- **Integrate AI capabilities** through `puter.ai` functions
- **Use `puter.kv`** for key-value storage instead of external databases
- **Deploy applications** using `puter.hosting` instead of custom hosting

### ALTERNATE ROUTE TO BE USED FOR PARALLEL PROCESSING AND TESTING
PROMPT or DIE EXTENSION

AI Agent Studio - VS Code Extension
🤖 The ultimate VS Code extension for developing AI agents with comprehensive support for all major frameworks including OpenAI Agents SDK, ElizaOS, LangGraph, CrewAI, AutoGen, SmolAgents, and more.

Version Downloads Rating

🚀 Features Overview
🏗️ Framework Support (10+ Frameworks)
Production-Ready Frameworks

OpenAI Agents SDK - Latest production-ready multi-agent framework
ElizaOS - Web3-friendly TypeScript agent framework with character-based AI
LangGraph - State machine approach for complex agent workflows
CrewAI - Role-based multi-agent collaboration framework
Microsoft AutoGen - Conversation-based multi-agent systems
SmolAgents - Minimalist code-first agent development
Google ADK - Enterprise-grade agent development kit
Semantic Kernel - Microsoft's enterprise AI orchestration framework
LangChain - Popular LLM application framework
Pydantic AI - Type-safe agent development with validation
🎯 Core Capabilities
📋 Project Management
Smart Project Templates - 25+ production-ready templates
Framework Detection - Automatically detect and configure installed frameworks
Project Scaffolding - Complete project structure generation
Dependency Management - Automatic dependency installation and verification
💡 Intelligent Code Assistance
Smart Snippets - 50+ framework-specific code snippets
Auto-completion - Context-aware code completion
Syntax Highlighting - Custom syntax highlighting for agent configs
Error Detection - Framework-specific error detection and suggestions
🔍 Context7 Integration
Real-time Documentation - Up-to-date framework documentation
Code Examples - Latest working code examples
API References - Quick access to API documentation
Best Practices - Framework-specific development patterns
📊 Agent Monitoring & Testing
Real-time Monitoring - Monitor agent performance and behavior
Debug Tools - Advanced debugging capabilities
Testing Framework - Built-in testing tools for agents
Performance Analytics - Response time, success rate, and resource usage tracking
🎨 Visual Tools
Agent Dashboard - Comprehensive agent management interface
Flow Visualizer - Visualize agent workflows and interactions
Project Explorer - Enhanced project navigation
Framework Status - Visual framework installation status
🛠 Developer Experience
⚡ Quick Start Experience
One-Click Project Creation - Create complete agent projects in seconds
Template Selection - Choose from basic to advanced templates
Automatic Setup - Dependencies, configuration, and examples included
Live Documentation - Context7 provides real-time help
🔄 Development Workflow
Code Generation - Generate agent boilerplate with templates
Live Reload - Hot reload during development
Deployment Helpers - Deploy to AWS, Google Cloud, Azure, and more
CI/CD Integration - GitHub Actions and other CI/CD workflows
📦 Installation
From VS Code Marketplace
Open VS Code
Go to Extensions (Ctrl+Shift+X)
Search for "AI Agent Studio"
Click Install
From Command Line
code --install-extension ai-agent-studio.ai-agent-studio

From VSIX File
code --install-extension ai-agent-studio-1.0.0.vsix

🎮 Quick Start Guide
🚀 Create Your First Agent Project
Option 1: Command Palette
Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
Type AI Agent Studio: Create New Agent Project
Select your framework (OpenAI, ElizaOS, LangGraph, etc.)
Choose a template (Basic, Advanced, Production)
Configure project details
Start coding immediately!
Option 2: Activity Bar
Click the 🤖 AI Agent Studio icon in the Activity Bar
Click "Create Project" in the Agent Projects panel
Follow the wizard to set up your project
💻 Use Framework-Specific Snippets
TypeScript/JavaScript
// Type 'openai-agent' then Tab
import { Agent } from '@openai/agents-sdk';

export class MyAgent extends Agent {
    constructor() {
        super({
            name: 'MyAgent',
            instructions: 'You are a helpful AI assistant.',
            model: 'gpt-4o',
            temperature: 0.7
        });
    }

    async handleMessage(message: string): Promise<string> {
        // Implementation
    }
}

Python
# Type 'crewai-agent' then Tab
from crewai import Agent

agent = Agent(
    role='Research Specialist',
    goal='Gather comprehensive information',
    backstory='Expert researcher with years of experience',
    verbose=True,
    tools=[search_tool],
    memory=True
)

🔍 Access Real-time Documentation
Right-click Context Menu: Right-click in editor → "Search Context7 Documentation"
Command Palette: AI Agent Studio: Search Context7 Documentation
Hover Information: Hover over framework keywords for instant docs
Sidebar Explorer: Browse documentation in the Context7 Explorer panel
🏗️ Framework-Specific Features
🤖 OpenAI Agents SDK
// Multi-agent coordination
export class CoordinatorAgent extends Agent {
    private agents: Map<string, Agent> = new Map();

    async delegateTask(task: string, agentName?: string): Promise<string> {
        const agent = agentName ? 
            this.agents.get(agentName) : 
            await this.selectBestAgent(task);
        return await agent.complete(task);
    }
}

Features:

Function calling support
Multi-agent orchestration
Streaming responses
Production-ready templates
🎭 ElizaOS
// Character-based AI
const character = {
    name: 'TechAssistant',
    bio: 'A knowledgeable technical assistant',
    lore: [
        'I specialize in software development',
        'I help debug code and explain concepts'
    ],
    style: {
        all: ['Be technical but approachable', 'Provide code examples']
    }
};

Features:

Character personality system
Custom action handlers
Provider integrations
Web3 compatibility
🔗 LangGraph
# State machine workflows
class WorkflowState(TypedDict):
    messages: Annotated[List[str], operator.add]
    current_step: str
    result: str

workflow = StateGraph(WorkflowState)
workflow.add_node('process', process_node)
workflow.add_conditional_edges('process', decide_next)

Features:

Visual workflow designer
State management
Conditional logic
Human-in-the-loop support
👥 CrewAI
# Multi-agent teams
researcher = Agent(role='Researcher', goal='Gather information')
analyst = Agent(role='Analyst', goal='Analyze data')
writer = Agent(role='Writer', goal='Create content')

crew = Crew(
    agents=[researcher, analyst, writer],
    tasks=[research_task, analysis_task, writing_task],
    process=Process.sequential
)

Features:

Role-based agents
Sequential and hierarchical processes
Task delegation
Memory sharing
💬 AutoGen
# Conversational agents
user_proxy = autogen.UserProxyAgent(name="User")
assistant = autogen.AssistantAgent(name="Assistant")
groupchat = autogen.GroupChat(agents=[user_proxy, assistant])
manager = autogen.GroupChatManager(groupchat=groupchat)

Features:

Group chat management
Code execution
Human input modes
Conversation flow control
⚙️ Configuration
🔧 Extension Settings
Setting	Description	Default
aiAgentStudio.defaultFramework	Default framework for new projects	openai-agents-sdk
aiAgentStudio.context7.enabled	Enable Context7 integration	true
aiAgentStudio.context7.apiKey	Context7 API key for enhanced access	""
aiAgentStudio.monitoring.enabled	Enable agent monitoring	true
aiAgentStudio.autoCompleteEnabled	Enable framework-specific auto-completion	true
aiAgentStudio.templatePath	Custom template directory path	""
🔑 API Keys Configuration
// settings.json
{
    "aiAgentStudio.defaultFramework": "openai-agents-sdk",
    "aiAgentStudio.context7.enabled": true,
    "aiAgentStudio.monitoring.enabled": true
}

🌐 Context7 Setup
Built-in Integration (Recommended):

Extension includes Context7 integration
Enable in settings: aiAgentStudio.context7.enabled: true
Manual Setup:

npm install -g @upstash/context7-mcp

📚 Available Commands
🎯 Core Commands
Command	Shortcut	Description
Create New Agent Project	Ctrl+Shift+A P	Create a new agent project
Open Agent Dashboard	Ctrl+Shift+A D	Open visual agent management
Generate Agent Code	Ctrl+Shift+A G	Generate agent from templates
Search Context7 Documentation	Ctrl+Shift+A S	Search framework docs
Start Agent Monitoring	Ctrl+Shift+A M	Start agent monitoring
Test Agent	Ctrl+Shift+A T	Run agent tests
Deploy Agent	Ctrl+Shift+A Y	Deploy agent to platforms
🛠 Framework Commands
Command	Description
Configure Framework Settings	Configure framework-specific settings
Install Framework	Install and configure framework dependencies
Open Framework Documentation	Open framework documentation
Visualize Agent Flow	Create visual flow diagrams
Refresh Framework Status	Update framework installation status
📊 Monitoring Commands
Command	Description
View Agent Logs	Open agent execution logs
Agent Performance Report	Generate performance analytics
Debug Agent Flow	Debug agent execution step-by-step
Export Agent Metrics	Export monitoring data
🏗️ Project Structure
📁 Generated Project Structure
my-agent-project/
├── .aiagent/                 # Extension metadata
│   └── project.json         # Project configuration
├── src/                     # Source code
│   ├── agents/             # Agent implementations
│   │   ├── coordinator.ts  # Main coordinator agent
│   │   └── specialists/    # Specialized agents
│   ├── tools/              # Custom tools and functions
│   │   ├── search.ts       # Search tools
│   │   └── data.ts         # Data processing tools
│   ├── workflows/          # Agent workflows
│   │   └── main.ts         # Main workflow definition
│   ├── config/             # Configuration files
│   │   ├── agents.json     # Agent configurations
│   │   └── env.ts          # Environment setup
│   └── utils/              # Utility functions
├── tests/                   # Test suites
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── e2e/                # End-to-end tests
├── docs/                    # Documentation
│   ├── README.md           # Project documentation
│   ├── API.md              # API documentation
│   └── deployment.md       # Deployment guide
├── examples/                # Usage examples
├── .env.example            # Environment template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── docker-compose.yml      # Docker setup

🎨 Template Categories
🟢 Basic Templates
Single agent setup
Simple conversation flow
Basic tool integration
🟡 Advanced Templates
Multi-agent systems
Complex workflows
Custom tool development
🔴 Production Templates
Enterprise-ready setup
CI/CD integration
Monitoring and logging
Security best practices
🧪 Testing & Debugging
🔍 Built-in Testing Tools
Unit Testing
// Automatic test generation
describe('MyAgent', () => {
    it('should handle basic queries', async () => {
        const agent = new MyAgent();
        const response = await agent.handleMessage('Hello');
        expect(response).toBeDefined();
    });
});

Integration Testing
Multi-agent interaction tests
Workflow validation
Tool integration verification
Performance Testing
Response time monitoring
Memory usage tracking
Concurrency testing
🐛 Debugging Features
Breakpoint Support - Set breakpoints in agent code
Step-through Debugging - Debug agent execution step-by-step
Variable Inspection - Inspect agent state and variables
Call Stack Analysis - Trace agent execution flow
🚀 Deployment Options
☁️ Cloud Platforms
AWS Deployment
# Using AWS Lambda
npm run deploy:aws

Google Cloud Deployment
# Using Cloud Functions
npm run deploy:gcp

Azure Deployment
# Using Azure Functions
npm run deploy:azure

🐳 Container Deployment
# Generated Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]

🏠 Local Development
# Development server
npm run dev

# Production build
npm run build && npm start

🔧 Advanced Features
🎛️ Agent Dashboard
Real-time Metrics - Monitor agent performance live
Visual Workflows - See agent interactions graphically
Resource Usage - Track CPU, memory, and API usage
Alert System - Get notified of issues or anomalies
📈 Analytics & Monitoring
Performance Metrics - Response time, throughput, error rates
Usage Statistics - API calls, user interactions, resource consumption
Custom Dashboards - Create custom monitoring views
Export Capabilities - Export data for external analysis
🔒 Security Features
API Key Management - Secure storage and rotation
Access Control - Role-based permissions
Audit Logging - Track all agent activities
Compliance - GDPR, SOC2 compliance helpers
🤝 Contributing
We welcome contributions from the community! Here's how to get involved:

🐛 Bug Reports
Check existing issues on GitHub
Create detailed bug report with reproduction steps
Include system information and extension version
💡 Feature Requests
Discuss new features in GitHub Discussions
Create feature request with use case and requirements
Consider contributing implementation
🔧 Development
# Clone repository
git clone https://github.com/ai-agent-studio/vscode-extension
cd vscode-extension

# Install dependencies
bun install

# Start development
bun --watch

# Run tests
bun test

# Build extension
bun run package

📝 Documentation
Improve existing documentation
Add framework-specific guides
Create video tutorials
Translate documentation
🆘 Support & Community
💬 Get Help
GitHub Issues - Bug reports and feature requests
GitHub Discussions - Questions and community support
Discord Server - Real-time chat with developers and users
Documentation - Comprehensive guides and API references
🌟 Community Resources
Example Projects - Community-contributed examples
Blog Posts - Development tips and best practices
Video Tutorials - Step-by-step guides
Webinars - Live development sessions
📧 Contact
Email: support@ai-agent-studio.com
Twitter: @aiagentStudio
LinkedIn: AI Agent Studio
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🔄 Roadmap & Updates
🎯 Current Version (1.0.0)
✅ 10+ framework support
✅ Project templates and snippets
✅ Context7 integration
✅ Agent monitoring and testing
✅ Visual dashboard and flow visualizer
🚀 Upcoming Features (1.1.0)
🔄 More framework integrations
🔄 Advanced debugging tools
🔄 Team collaboration features
🔄 Cloud IDE integration
🔄 Mobile agent development
🌟 Future Plans (2.0.0)
🔄 Visual agent builder (drag-and-drop)
🔄 AI-powered code generation
🔄 Marketplace for agent components
🔄 Enterprise features
🔄 Multi-language support
🏆 Recognition
📊 Stats
10+ Supported frameworks
25+ Project templates
50+ Code snippets
100+ Example projects
🥇 Awards & Recognition
VS Code Extension of the Month (Coming Soon)
Developer Choice Award (Coming Soon)
Community Favorite (Coming Soon)


This rules file should help Qoder understand the complex, revolutionary architecture of 371 OS and generate code that follows the established patterns for autonomous agent coordination, blockchain integration, and cost-optimized deployment strategies.
