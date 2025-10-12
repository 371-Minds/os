# DAO Governance Service

**Phase 6: Complete DAO Proposal & Voting System**  
**Phase 20: Zero-Trust Architecture with Secretless Broker** ✨

A comprehensive governance system for the 371 DAO ecosystem that enables decentralized decision-making through sophisticated voting mechanisms, proposal management, and execution tracking.

## 🔐 Zero-Trust Security Architecture

**NEW:** This service implements enterprise-grade zero-trust security using the Secretless Broker pattern:

- ✅ **No credentials in application code**
- ✅ **No secrets in environment variables**
- ✅ **Dynamic credential injection from Universal Tool Server**
- ✅ **Transparent database and API credential management**
- ✅ **Production-ready security for Akash Network deployment**

**👉 See [ZERO_TRUST_README.md](./ZERO_TRUST_README.md) for complete security documentation**

## 🚀 Features

### Core Governance Capabilities
- **Multi-Type Proposals**: Strategic, Operational, Financial, Governance, Technical, and Emergency proposals
- **Advanced Voting Mechanisms**: Weighted voting, stake-based, reputation-based, and hybrid systems
- **Flexible Quorum & Approval Thresholds**: Configurable by proposal type
- **Delegation Support**: Vote delegation for enhanced participation
- **Emergency Protocols**: Fast-track governance for critical situations

### Voting System Features
- **Stake-Weighted Voting**: Voting power based on token stake
- **Reputation-Weighted Voting**: Voting power based on agent reputation
- **Hybrid Voting Models**: Combined stake and reputation weighting
- **Anti-Manipulation**: Sybil attack prevention and vote validation
- **Real-Time Results**: Live vote tallying and participation tracking

### Execution & Tracking
- **Automated Execution**: Seamless transition from approval to implementation
- **Phase-Based Execution**: Multi-phase project execution with milestone tracking
- **Budget Management**: Integrated budget allocation and spending tracking
- **Progress Monitoring**: Real-time execution status and timeline adherence
- **Quality Metrics**: Performance tracking and success criteria validation

## 🏗️ Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Proposal Layer    │    │   Voting Layer      │    │  Execution Layer    │
│                     │    │                     │    │                     │
│ • Creation          │───▶│ • Vote Collection   │───▶│ • Phase Management  │
│ • Validation        │    │ • Power Calculation │    │ • Budget Tracking   │
│ • Submission        │    │ • Result Tallying   │    │ • Quality Metrics   │
│ • Review Process    │    │ • Outcome Decision  │    │ • Progress Updates  │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

## 🛠️ API Endpoints

### Proposal Management
```
POST   /api/governance/proposals              # Create new proposal
GET    /api/governance/proposals              # List proposals (filtered)
GET    /api/governance/proposals/:id          # Get specific proposal
POST   /api/governance/proposals/:id/submit   # Submit for voting
POST   /api/governance/proposals/:id/start-voting # Start voting period
```

### Voting Operations
```
POST   /api/governance/votes                  # Submit vote
GET    /api/governance/proposals/:id/results  # Get voting results
```

### System Information
```
GET    /api/governance/health                 # Health check
GET    /api/governance/config                 # Public configuration
GET    /api/governance/stats                  # System statistics
```

## 📝 Usage Examples

### 1. Creating a Strategic Proposal

```typescript
const proposal = await governance.createProposal({
  title: "AI Agent Expansion Initiative",
  description: "Expand our agent ecosystem to include specialized financial agents",
  type: ProposalType.STRATEGIC,
  proposer: "CEO-Agent",
  execution_details: {
    phases: [
      {
        id: "phase-1",
        name: "Research & Development",
        description: "Develop specialized financial agent capabilities",
        objectives: ["Research market needs", "Design agent architecture"],
        deliverables: ["Market analysis", "Technical specifications"],
        estimatedDuration: "8 weeks",
        responsible_agents: ["CTO-Agent", "Research-Team"],
        completion_criteria: ["Stakeholder approval", "Technical validation"],
        dependencies: []
      }
    ],
    dependencies: [],
    success_criteria: ["Operational financial agents", "ROI positive within 6 months"],
    risk_mitigation: [],
    resource_requirements: []
  },
  budget_request: {
    total_amount: 500000,
    currency: "USD",
    breakdown: [
      { category: "Development", amount: 300000, percentage: 60, description: "Agent development costs" },
      { category: "Testing", amount: 100000, percentage: 20, description: "QA and validation" },
      { category: "Deployment", amount: 100000, percentage: 20, description: "Infrastructure and rollout" }
    ],
    justification: "Investment in specialized agents will increase DAO revenue",
    funding_source: "DAO Treasury",
    payment_schedule: [],
    contingency_percentage: 15
  },
  timeline: {
    key_milestones: [],
    review_period_days: 7,
    voting_period_days: 14
  },
  stakeholders: ["CEO-Agent", "CFO-Agent", "CTO-Agent", "Community"]
});
```

### 2. Submitting a Vote

```typescript
const vote = await governance.submitVote({
  proposal_id: "PROP-ABC123",
  voter_address: "0x1234567890123456789012345678901234567890",
  vote_option: VoteOption.FOR,
  reason: "This initiative aligns with our strategic goals for growth",
  signature: "0xsignature...",
  delegated_votes: []
});
```

### 3. Checking Voting Results

```typescript
const results = await governance.getVotingResults("PROP-ABC123");
console.log(`Participation: ${results.data.participation_rate}%`);
console.log(`Approval: ${((results.data.power_for / results.data.total_voting_power) * 100).toFixed(2)}%`);
console.log(`Outcome: ${results.data.outcome}`);
```

## ⚙️ Configuration

The system supports multiple configuration profiles:

### Development Configuration
```typescript
{
  quorum_percentage: 10,
  approval_threshold_percentage: 51,
  voting_period_hours: 1,
  minimum_stake_required: 10
}
```

### Production Configuration
```typescript
{
  quorum_percentage: 20,
  approval_threshold_percentage: 66,
  voting_period_hours: 168, // 7 days
  minimum_stake_required: 1000
}
```

### High-Security Configuration
```typescript
{
  quorum_percentage: 40,
  approval_threshold_percentage: 80,
  voting_period_hours: 336, // 14 days
  minimum_stake_required: 10000
}
```

## 🔐 Security Features

### Zero-Trust Architecture (NEW)
- **Secretless Broker Integration**: All credentials managed through sidecar container
- **Universal Tool Server**: Centralized, auditable secret management
- **No Hardcoded Secrets**: Application never handles raw credentials
- **Transparent Proxying**: Database and API connections through localhost broker
- **Automated Rotation**: Credentials rotated without application changes

### Governance Security
- **Signature Verification**: All votes require cryptographic signatures
- **Stake Requirements**: Minimum stake thresholds prevent spam
- **Blacklist Support**: Ability to exclude malicious actors
- **Emergency Veto**: Council can halt problematic proposals
- **Audit Trail**: Complete transaction history on blockchain

## 🚀 Getting Started

### Local Development with Zero-Trust Testing

1. **Start the local test environment (includes Secretless Broker):**
   ```bash
   cd f:/os-main/core/os-workspace/apps/dao-governance-service
   docker-compose up -d
   ```

2. **Verify services are running:**
   ```bash
   docker-compose ps
   # All services should show "healthy" status
   ```

3. **Test the API:**
   ```bash
   curl http://localhost:3000/api/governance/health
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f dao-governance-service
   docker-compose logs -f secretless-broker
   ```

### Traditional Development (Without Docker)

1. **Install Dependencies**
   ```bash
   cd f:/os-main/os-workspace
   bun install
   ```

2. **Build the Service**
   ```bash
   bun nx build dao-governance-service
   ```

3. **Start the Service**
   ```bash
   # Set development mode (disables zero-trust for local dev)
   $env:NODE_ENV = "development"
   $env:ZERO_TRUST_MODE = "false"
   bun nx serve dao-governance-service
   ```

### Production Deployment to Akash Network

1. **Validate zero-trust configuration:**
   ```powershell
   cd f:/os-main/core/os-workspace/apps/dao-governance-service
   powershell -ExecutionPolicy Bypass -File .\validate-config.ps1 -Verbose
   ```

2. **Set required environment variables:**
   ```powershell
   $env:UTS_AUTH_TOKEN = "your-uts-auth-token"
   $env:UTS_ENDPOINT = "http://uts.internal"
   ```

3. **Deploy to Akash:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\deploy-akash.ps1
   ```

**📚 Complete deployment guide:** See [ZERO_TRUST_README.md](./ZERO_TRUST_README.md)

## 🧪 Testing

Run the included test example:
```bash
bun apps/dao-governance-service/src/test-example.ts
```

## 📊 Monitoring & Analytics

The service provides comprehensive metrics:
- Proposal creation rates
- Voting participation rates
- Execution success rates
- Budget utilization efficiency
- Agent performance metrics

## 🔗 Integration with 371 OS

This governance service integrates seamlessly with:
- **Chief of Staff Agent**: Converts Stratplans into governance proposals
- **Blockchain Registry**: Records all governance actions on-chain
- **Agent Ecosystem**: Coordinates execution across multiple agents
- **Financial System**: Manages budget allocation and tracking
- **Universal Tool Server**: Secure credential management (Zero-Trust)
- **Secretless Broker**: Transparent credential injection for all services

## 📚 Documentation

- **[ZERO_TRUST_README.md](./ZERO_TRUST_README.md)**: Complete zero-trust architecture guide
- **[UTS_SECRETS_CONFIG.md](./UTS_SECRETS_CONFIG.md)**: Universal Tool Server secrets configuration
- **[DAO_GOVERNANCE_MODERNIZATION.md](./DAO_GOVERNANCE_MODERNIZATION.md)**: Agent modernization details
- **[README.md](./README.md)**: This file - service overview

## 🎯 Roadmap

- [ ] Quadratic voting implementation
- [ ] Cross-chain governance support
- [ ] AI-powered proposal analysis
- [ ] Advanced analytics dashboard
- [ ] Mobile governance interface

---

**Part of the 371 OS Revolutionary Autonomous Agent Operating System**  
*Enabling true decentralized governance for the next generation of AI organizations*