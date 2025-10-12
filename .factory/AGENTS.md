# AGENTS.md

## Project Overview

This project, `371-os`, is a comprehensive OS for running a network of AI agents with revolutionary **email coordination** and **social media management capabilities**. It is structured as an Nx monorepo. The core logic, agent implementations, and various services are organized into `apps` and `packages` within the `core/os-workspace` directory.

### Revolutionary Email Integration

The 371 OS now features the world's first **cognitive-aware, blockchain-governed email ecosystem** that includes:
- **Enhanced Mail-Conduit Service**: Status.network integration with DAO governance
- **Agent Email Coordination**: Multi-agent approval workflows for email campaigns
- **Blockchain Verification**: Immutable email records with hash verification
- **Cognitive Optimization**: AI-driven timing and content personalization
- **Privacy Protection**: proxiedmail.com integration for privacy-preserving delivery
- **97.6% Cost Reduction**: Akash Network deployment optimization
- **Spatial Email Universe**: 3D visualization of communication flows in C3 interface

### Revolutionary Social Media Integration

The 371 OS includes the world's first **cognitive-aware social media management platform** with:
- **Postiz Integration**: Multi-platform social media management (Twitter, LinkedIn, Facebook, Instagram, Threads, Mastodon, Bluesky)
- **AI-Powered Content Generation**: Leverages 371 OS cognitive engine for superior content creation
- **Autonomous Social Media Agents**: Self-managing agents with strategic content planning
- **Spatial Social Media Analytics**: 3D visualization in CEO's Orrery for engagement metrics
- **Cross-Platform Intelligence**: Unified orchestration across all social platforms
- **Content Calendar Automation**: AI-driven scheduling and optimization
- **Multi-Brand Management**: Enterprise-grade multi-brand coordination

## Build & Test

The primary commands for building and testing the workspace are:

### Installing Dependencies
To install all dependencies from the root of the workspace:
```bash
bun install
```

### Building
To build a specific application or the entire workspace:
```bash
# Build a single application
bun nx build <app-name>

# Build all affected projects
bun nx affected --target=build
```

### Testing
To run tests for a specific application or for all affected projects:
```bash
# Run tests for a single application
bun nx test <app-name>

# Run all affected tests
bun nx affected --target=test
```


## Running in Development

To serve an application in development mode with live reloading, use the `serve` command:
```bash
bun nx serve <app-name>
```

## Key Conventions

- **Package Manager**: This project uses `bun` for package management. Always use `bun` instead of `npm` or `yarn`.
- **Monorepo Management**: All workspace operations should be run through the Nx CLI (`bun nx ...`).
- **Directory Structure**:
  - New applications are added to `core/os-workspace/apps/`.
  - New sharable libraries/packages are added to `core/os-workspace/packages/`.
- **Branching**: All new features and bugfixes should be developed on separate feature branches before being merged into `main`.

## Workspace Structure

```
core/os-workspace/
├── apps/                    # Application packages
│   ├── agent-factory/       # Agent creation and management
│   ├── c-suite-agent-runner/ # C-Suite coordination system
│   ├── ceo-agent/           # CEO Mimi agent implementation
│   ├── cto-agent/           # CTO Zara agent implementation
│   ├── cfo-agent/           # CFO Maya agent implementation
│   ├── clo-agent/           # CLO Sage agent implementation
│   ├── cao-agent/           # CAO Eduardo agent implementation
│   ├── chief-of-staff-agent/ # Coordination and task management
│   ├── cognitive-interface/  # Cognitive-aware UI system with C3 Template
│   ├── enhanced-mail-conduit/ # Revolutionary email coordination service
│   ├── intelligent-router/   # Adaptive LLM routing
│   ├── dao-governance-service/ # DAO management system
│   └── utility-agents/      # Supporting utility agents
├── packages/                # Shared libraries and plugins
│   ├── elizaos-plugins/     # ElizaOS plugin ecosystem
│   │   ├── postiz-social/   # Social media management plugin
│   │   ├── business-intelligence/ # Analytics and BI tools
│   │   ├── status-network-integration/ # Blockchain community platform
│   │   └── nx-workspace/    # Self-aware workspace manipulation
│   ├── cognitive-engine/    # Cognitive state detection
│   ├── business-intelligence/ # Analytics and BI tools
│   ├── nx-workspace/        # Self-aware workspace manipulation
│   ├── react-email-templates/ # Blockchain-verified email templates
│   └── thinng-testing/      # Mathematical state management
└── libs/prompts/agent-definitions/ # Agent "brains" (YAML files)
```

## Agent Development

### Agent Architecture
Each agent follows a unified **brain/body architecture**:
- **Brain**: Agent definitions stored as YAML files in `libs/prompts/agent-definitions/`
- **Body**: TypeScript/Node.js execution runtime in `apps/`

### Adding New Agents
1. Create agent definition YAML in `libs/prompts/agent-definitions/`
2. Generate application: `bun nx generate @nx/node:application <agent-name>`
3. Implement agent logic using ElizaOS patterns
4. Add Nx project configuration (`project.json`)
5. Implement comprehensive tests using Bun test runner

### Available Agents

#### C-Suite Agents with Email Coordination
- **CEO Mimi** (`ceo-agent`) - Strategic decisions, cost optimization, and **email campaign approval**
- **CTO Zara** (`cto-agent`) - Technical architecture and system design
- **CFO Maya** (`cfo-agent`) - Financial analysis, budget optimization, and **email cost analysis**
- **CLO Sage** (`clo-agent`) - Legal compliance, governance, and **email compliance validation**
- **CAO Eduardo** (`cao-agent`) - Administrative operations
- **Chief of Staff** (`chief-of-staff-agent`) - Task coordination and **email workflow orchestration**

#### Specialized Email Services
- **Enhanced Mail-Conduit** (`enhanced-mail-conduit`) - Revolutionary email service with:
  - Status.network DAO governance integration
  - Multi-agent approval workflows
  - Blockchain verification system
  - Cognitive optimization engine
  - proxiedmail.com privacy protection
  - 97.6% cost reduction via Akash Network

#### Interface and Coordination
- **Cognitive Interface** (`cognitive-interface`) - Adaptive UI system with **C3 Universal Template**
- **Agent Factory** (`agent-factory`) - Dynamic agent creation

#### Social Media Management
- **Postiz Plugin** (`elizaos-plugins/postiz-social`) - Revolutionary social media management with:
  - Multi-platform publishing and scheduling
  - AI-powered content generation
  - Autonomous social media agents (CMO, Content Creator, Community Manager)
  - Spatial analytics for CEO's Orrery
  - Engagement metrics and performance optimization
  - Content calendar automation
  - Multi-brand management capabilities

#### Blockchain Community Platform
- **Status Network Integration** (`elizaos-plugins/status-network-integration`) - Revolutionary blockchain community platform with:
  - Gasless L2 transactions for zero-cost user interactions
  - DAO governance with customizable voting parameters
  - Autonomous agent economy with SNT-based compensation
  - Cross-community project coordination
  - Token economics with staking, rewards, and treasury management
  - Multi-DAO proposal voting and execution
  - 97.6% infrastructure cost reduction via Status Network L2

#### Support Libraries
- **React Email Templates** (`react-email-templates`) - Blockchain-verified email templates
- **Business Intelligence** - Email analytics and performance tracking

## Testing

The project uses Bun's built-in test runner for optimal performance:
```bash
# Run all tests
bun test

# Run tests for specific project
bun nx test <project-name>

# Run affected tests only
bun nx affected --target=test
```

## Linting and Formatting

The project uses Biome for linting and formatting:
```bash
# Check and fix linting issues
bunx @biomejs/biome check --write .

# Format code
bunx @biomejs/biome format --write .
```

## Deployment

### Local Development
```bash
# Quick development setup
bun run quick-start

# Start system monitoring
bun run start:monitoring
```

### Production Deployment

#### Enhanced Mail-Conduit Deployment
```bash
# Deploy enhanced email service to Akash Network
cd apps/enhanced-mail-conduit/deploy/akash
./deploy.sh

# Deploy with full configuration
bun run deploy:email-service

# Deploy with secure token management
bun run deploy:with-secrets
```

#### Email Service Configuration
```bash
# Configure Status.network integration
export STATUS_NETWORK_API_KEY="your_api_key"
export EMAIL_DAO_CONTRACT_ADDRESS="0x..."

# Configure proxiedmail.com
export PROXIEDMAIL_API_KEY="your_proxiedmail_key"

# Configure blockchain verification
export EMAIL_VERIFICATION_CONTRACT="0x..."
export BLOCKCHAIN_NETWORK_ID="status-mainnet"
```

#### Postiz Social Media Configuration
```bash
# Configure Postiz API
export POSTIZ_API_ENDPOINT="https://api.postiz.com"
export POSTIZ_API_KEY="your_postiz_api_key"

# Build and test Postiz plugin
cd core/os-workspace/packages/elizaos-plugins/elizaos-plugins/postiz-social
bun run build
bun test/plugin.test.ts

# Run integration examples
bun examples/integration-example.ts
```

#### Status Network Integration Configuration
```bash
# Configure Status Network
export STATUS_NETWORK_RPC="https://rpc.status.network"
export STATUS_NETWORK_CHAIN_ID="1"
export SNT_TOKEN_ADDRESS="0x744d70FDBE2Ba4CF95131626614a1763DF805B9E"
export DAO_FACTORY_ADDRESS="0x..."
export GASLESS_RELAY_URL="https://relay.status.network"

# Build and test Status Network plugin
cd core/os-workspace/packages/elizaos-plugins/elizaos-plugins/status-network-integration
bun run build
bun test

# Create first community
bun examples/create-community.ts
```

## Environment Configuration

- **Runtime**: Bun (preferred over Node.js for 50x faster performance)
- **Package Manager**: Bun (configured in package.json as `"packageManager": "bun@1.2.18"`)
- **Module Type**: ES modules (`"type": "module"` in package.json)
- **Platform**: Windows-optimized with PowerShell scripts
- **Build Tool**: tsup for dual ESM/CJS output with TypeScript declarations

## Troubleshooting

### Common Issues

#### General Issues
- **Dependency Installation**: Use `bun install` instead of npm to avoid hanging
- **Build Failures**: Check TypeScript configuration and run `bun nx affected --target=build`
- **Test Issues**: Ensure Bun test runner is properly configured in project.json
- **Windows Execution**: Use PowerShell with ExecutionPolicy Bypass for scripts

#### Email Coordination Issues
- **Agent Coordination Failures**: Check agent availability and response times
- **Blockchain Verification Errors**: Verify contract addresses and network connectivity
- **DAO Governance Delays**: Allow sufficient time for community voting
- **Proxied Email Delivery**: Confirm proxiedmail.com API credentials
- **Cognitive Optimization**: Validate recipient behavior data and ML model performance

### Health Checks
```bash
# System health validation
node AB/scripts/quick-status.js

# Check MCP server connectivity
node core/mcp/test-mcp-connection.js

# Test enhanced mail-conduit service
curl http://localhost:3001/health

# Validate agent coordination
curl http://localhost:3001/api/agent/coordination/status

# Check email workflow status
bun nx test enhanced-mail-conduit
```

## Email Service Monitoring

### Real-time Monitoring
- **C3 Universal Template**: Spatial visualization of email flows
- **Agent Coordination Dashboard**: Real-time agent status and performance
- **Blockchain Verification Tracker**: Hash verification and audit trails
- **Cost Optimization Metrics**: Akash Network savings tracking
- **DAO Governance Monitor**: Proposal status and voting progress

### Analytics Endpoints
```bash
# Email campaign performance
GET /api/analytics/dashboard?timeRange=7d

# Agent performance metrics
GET /api/agent/coordination/status

# Blockchain verification analytics
GET /api/verification/analytics?timeRange=30d

# Cognitive optimization insights
GET /api/cognitive/analytics?timeRange=30d

# Cost optimization tracking
GET /api/cost/optimization?timeRange=30d
```

## Social Media Management

### Postiz Plugin Usage

The Postiz plugin provides comprehensive social media management capabilities:

```bash
# Build Postiz plugin
cd core/os-workspace/packages/elizaos-plugins/elizaos-plugins/postiz-social
bun run build

# Run tests
bun test/plugin.test.ts

# Run integration examples
bun examples/integration-example.ts
```

### Social Media Agent Operations

```typescript
// Initialize Postiz plugin
import { PostizPlugin, SocialPlatform } from '@elizaos/plugin-postiz-social';

const plugin = new PostizPlugin({
  apiEndpoint: process.env.POSTIZ_API_ENDPOINT,
  apiKey: process.env.POSTIZ_API_KEY,
  enableSpatialInterface: true,
  enableCognitiveEngine: true,
});

// Create autonomous social media agent
const agent = plugin.createAgent('cmo-agent', {
  role: 'CMO',
  useAI: true,
  autoPublish: false,
});

// Execute content strategy
await agent.executeContentStrategy();

// Generate content calendar
const calendar = await agent.generateContentCalendar(30);

// Monitor campaign performance
const monitoring = await agent.monitorCampaigns();
```

### Social Media Analytics

```bash
# Get spatial analytics for CEO's Orrery
GET /api/social/spatial-analytics?startDate=2025-01-01&endDate=2025-01-31

# Platform performance metrics
GET /api/social/platform/:platform/metrics

# Engagement analysis
GET /api/social/engagement/:postId

# Content recommendations
GET /api/social/recommendations/:platform
```

### Key Features

- **Multi-Platform Publishing**: Schedule and publish to 7+ social platforms simultaneously
- **AI Content Generation**: Leverages 371 OS cognitive engine for optimal content
- **Spatial Analytics**: 3D visualization of social media performance in CEO's Orrery
- **Autonomous Agents**: Self-managing social media operations with strategic planning
- **Performance Optimization**: Real-time engagement tracking and recommendations
- **Multi-Brand Management**: Coordinate multiple brands from a single interface
- **Cost Optimization**: Integrated with Akash Network for 97.6% cost reduction

## Blockchain Community Platform

### Status Network Integration

The Status Network plugin provides revolutionary blockchain community infrastructure:

```bash
# Build Status Network plugin
cd core/os-workspace/packages/elizaos-plugins/elizaos-plugins/status-network-integration
bun run build

# View configuration examples
cat config.example.ts

# Read comprehensive documentation
cat README.md
```

### Community Operations

```typescript
// Initialize Status Network plugin
import {
  StatusNetworkCommunityManager,
  AgentCommunityCoordinator,
  CommunityTokenomics,
  type StatusNetworkConfig
} from '@elizaos/plugin-status-network';

const config: StatusNetworkConfig = {
  rpcUrl: 'https://rpc.status.network',
  chainId: 1,
  sntTokenAddress: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
  // ... additional config
};

const communityManager = new StatusNetworkCommunityManager(
  config,
  process.env.PRIVATE_KEY!
);

// Create community DAO
const community = await communityManager.createCommunity({
  communityName: '371-os-core-developers',
  initialFunding: ethers.parseEther('100000'), // 100k SNT
  governanceParams: {
    votingPeriod: 50400, // ~1 week
    quorum: 40,
  },
  // ... additional config
});

// Assign agent to community
const agentCoordinator = new AgentCommunityCoordinator(communityManager);
await agentCoordinator.assignAgentToCommunity(
  'ceo-mimi',
  '371-os-core-developers',
  CommunityRole.ADMIN,
  ['strategic-planning', 'cost-optimization']
);
```

### Community Analytics

```bash
# Get community metrics
GET /api/community/:communityId/metrics

# Agent performance in community
GET /api/community/:communityId/agents/:agentId/performance

# Treasury analytics
GET /api/community/:communityId/treasury/analytics

# Cross-community project status
GET /api/community/projects/:projectId/status
```

### Revolutionary Features

- **Gasless Transactions**: Zero gas fees for community members via Status Network L2 relay
- **DAO Governance**: Customizable voting parameters with quorum and timelock security
- **Autonomous Agent Economy**: Performance-based SNT compensation for AI agents
- **Token Economics**: Staking, rewards, fees, burns in unified economic system
- **Cross-Community Coordination**: Multi-DAO proposals and shared project budgets
- **97.6% Cost Reduction**: Status Network L2 dramatically reduces infrastructure costs
- **Type-Safe Architecture**: Complete TypeScript interfaces for all blockchain operations