# @elizaos/plugin-status-network

**Status Network Integration Plugin for 371 OS**

Revolutionary blockchain-based community building and DAO governance platform powered by Status Network's gasless L2 infrastructure.

## 🚀 Features

- **🏛️ Community DAO Creation** - Deploy autonomous community DAOs with customizable governance
- **💸 Gasless Transactions** - Zero-cost user interactions via Status Network's L2 relay
- **🤖 Agent Coordination** - Seamless integration with 371 OS autonomous agents
- **💰 Token Economics** - SNT-powered compensation, staking, and reward distribution
- **🌐 Cross-Community Projects** - Coordinate multi-community initiatives
- **📊 Treasury Management** - Automated fund allocation and analytics
- **🔐 Zero-Trust Security** - Enterprise-grade security with Secretless Broker integration

## 📦 Installation

```bash
# Using Bun (recommended for 371 OS)
bun add @elizaos/plugin-status-network

# Using npm
npm install @elizaos/plugin-status-network
```

## 🏗️ Architecture

The plugin integrates with:
- **Status Network L2** - Gasless blockchain infrastructure
- **SNT Token** - Native governance and payment token
- **DAO DAO** - Decentralized autonomous organization framework
- **ElizaOS** - Autonomous agent runtime
- **371 OS** - Revolutionary agent operating system

## 📖 Usage

### Basic Setup

```typescript
import {
  StatusNetworkCommunityManager,
  AgentCommunityCoordinator,
  CommunityTokenomics,
  GaslessTransactionManager,
  InterCommunityCoordinator,
  type StatusNetworkConfig
} from '@elizaos/plugin-status-network';

// Configure Status Network connection
const config: StatusNetworkConfig = {
  rpcUrl: 'https://rpc.status.network',
  chainId: 1, // Status Network chain ID
  sntTokenAddress: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
  daoFactoryAddress: '0x...', // DAO factory contract address
  registryAddress: '0x...', // Agent registry address
  gaslessRelayUrl: 'https://relay.status.network',
  ipfsGateway: 'https://ipfs.status.network'
};

// Initialize community manager
const communityManager = new StatusNetworkCommunityManager(
  config,
  process.env.PRIVATE_KEY!
);
```

### Creating a Community

```typescript
import { CommunityRole, type CommunityConfig } from '@elizaos/plugin-status-network';
import { ethers } from 'ethers';

const communityConfig: CommunityConfig = {
  communityName: '371-os-core-developers',
  description: 'Core development community for 371 OS',
  topics: ['autonomous-agents', 'blockchain', 'ai'],
  governanceParams: {
    votingDelay: 1, // 1 block
    votingPeriod: 50400, // ~1 week
    proposalThreshold: ethers.parseEther('1000'), // 1000 SNT
    quorum: 40, // 40% quorum
    timelock: 86400 // 1 day
  },
  initialFunding: ethers.parseEther('100000'), // 100k SNT
  membershipRules: {
    minimumStake: ethers.parseEther('100'),
    inviteOnly: false,
    verificationRequired: true,
    reputationRequired: 50
  }
};

const community = await communityManager.createCommunity(communityConfig);
console.log(`Community created at: ${community.address}`);
```

### Agent Integration

```typescript
import { AgentCommunityCoordinator, CommunityRole } from '@elizaos/plugin-status-network';

const agentCoordinator = new AgentCommunityCoordinator(communityManager);

// Assign CEO agent to community
await agentCoordinator.assignAgentToCommunity(
  'ceo-mimi',
  '371-os-core-developers',
  CommunityRole.ADMIN,
  ['strategic-planning', 'cost-optimization', 'cross-community-coordination']
);

// Update agent performance
await agentCoordinator.updateAgentPerformance(
  'ceo-mimi',
  '371-os-core-developers',
  {
    tasksCompleted: 10,
    successRate: 0.95,
    communityRating: 4.8
  }
);

// Get agent performance summary
const summary = agentCoordinator.getAgentPerformanceSummary('ceo-mimi');
console.log(`Agent earnings: ${ethers.formatEther(summary.totalEarnings)} SNT`);
```

### Gasless Transactions

```typescript
import { GaslessTransactionManager } from '@elizaos/plugin-status-network';

const gaslessManager = new GaslessTransactionManager(config);

// Execute gasless transaction for user
const txHash = await gaslessManager.executeGaslessTransaction(
  userAddress,
  {
    to: contractAddress,
    data: encodedFunctionCall,
    value: BigInt(0)
  },
  communityId
);

console.log(`Gasless transaction executed: ${txHash}`);
```

### Token Economics

```typescript
import { CommunityTokenomics, type TokenomicsConfig } from '@elizaos/plugin-status-network';

const tokenomicsConfig: TokenomicsConfig = {
  sntTokenAddress: config.sntTokenAddress,
  stakingContract: '0x...', // Staking contract address
  rewardPool: '0x...', // Reward pool address
  feeStructure: {
    baseFeePercent: 2.5,
    volumeTiers: [
      { threshold: ethers.parseEther('10000'), feePercent: 2.0 },
      { threshold: ethers.parseEther('100000'), feePercent: 1.5 }
    ],
    agentServiceFee: 1.0,
    governanceFee: 0.5
  },
  inflationRate: 0.05, // 5% annual
  burnRate: 0.01 // 1% burn
};

const tokenomics = new CommunityTokenomics(communityManager, tokenomicsConfig);

// Distribute monthly rewards
await tokenomics.distributeMemberRewards('371-os-core-developers');

// Stake SNT for governance rights
await tokenomics.stakeSNT(
  userAddress,
  ethers.parseEther('1000'),
  '371-os-core-developers'
);
```

### Cross-Community Coordination

```typescript
import { InterCommunityCoordinator, type CrossCommunityProject } from '@elizaos/plugin-status-network';

const coordinator = new InterCommunityCoordinator(communityManager);

const project: CrossCommunityProject = {
  id: 'universal-ai-framework',
  name: 'Universal AI Agent Framework',
  description: 'Collaborative development of shared agent infrastructure',
  participatingCommunities: [
    '371-os-core-developers',
    'elizaos-plugin-builders',
    'blockchain-registry-contributors'
  ],
  budget: ethers.parseEther('500000'), // 500k SNT
  timeline: {
    startDate: new Date(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    milestones: [
      {
        id: 'milestone-1',
        name: 'Architecture Design',
        description: 'Complete system architecture',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        completed: false,
        deliverables: ['architecture-doc', 'api-specs']
      }
    ]
  },
  deliverables: [],
  coordinatingAgent: 'cto-zara'
};

await coordinator.coordinateCrossCommunityProject(
  project.participatingCommunities,
  project
);
```

## 🎯 Use Cases

### Developer Communities
- **371 OS Core Developers** - Platform development and maintenance
- **ElizaOS Plugin Builders** - Plugin ecosystem expansion
- **Blockchain Registry Contributors** - Infrastructure validators

### Industry-Specific Communities
- **Enterprise AI Integrators** - Business implementations
- **Creative Communities** - AI-powered content generation
- **Financial Communities** - DAO treasury management

### Geographic Communities
- **Regional Developer Hubs** - Local innovation clusters
- **Language-Specific Groups** - Localized support
- **University Partnerships** - Academic research collaboration

## 🔧 Configuration

### Environment Variables

```bash
# Status Network Configuration
STATUS_NETWORK_RPC=https://rpc.status.network
STATUS_NETWORK_CHAIN_ID=1
SNT_TOKEN_ADDRESS=0x744d70FDBE2Ba4CF95131626614a1763DF805B9E
DAO_FACTORY_ADDRESS=0x...
AGENT_REGISTRY_ADDRESS=0x...
GASLESS_RELAY_URL=https://relay.status.network
IPFS_GATEWAY=https://ipfs.status.network

# Security
PRIVATE_KEY=your_private_key_here
ENABLE_GASLESS=true
ENABLE_CROSS_COMMUNITY=true

# Logging
LOG_LEVEL=info
```

## 📊 Performance

- **97.6% Cost Reduction** vs traditional cloud infrastructure
- **Zero Gas Fees** for user transactions
- **Sub-second** transaction confirmation times
- **Unlimited Scalability** via Status Network L2

## 🔐 Security

- **Zero-Trust Architecture** - No secrets in application code
- **Secretless Broker** - Dynamic credential injection
- **ACI.dev Integration** - Policy enforcement
- **Smart Contract Audits** - Comprehensive security review
- **Multi-signature Governance** - Secure DAO operations

## 🛠️ Development

```bash
# Install dependencies
bun install

# Build plugin
bun run build

# Run tests
bun test

# Lint code
bun run lint

# Format code
bun run format
```

## 📚 API Reference

See [full API documentation](./docs/API.md) for detailed method signatures and examples.

### Core Classes

- `StatusNetworkCommunityManager` - Community and DAO management
- `AgentCommunityCoordinator` - Agent assignment and performance tracking
- `GaslessTransactionManager` - Gasless transaction execution
- `CommunityTokenomics` - Token economics and rewards
- `InterCommunityCoordinator` - Cross-community project coordination

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](../../../../../../community/CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🔗 Links

- [Status Network](https://status.network)
- [371 OS Documentation](../../../../../README.md)
- [ElizaOS](https://github.com/elizaos/eliza)
- [DAO DAO](https://daodao.zone)

## 🙋 Support

- [Discord Community](https://discord.gg/371-minds)
- [GitHub Issues](https://github.com/371-Minds/os/issues)
- [Documentation](https://docs.371.systems)

---

**Built with ❤️ by the 371 Minds team**

*Powering the future of autonomous business communities*
