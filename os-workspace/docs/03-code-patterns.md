# Code Patterns for 371 OS

## 🏗️ ElizaOS Plugin Architecture Patterns

### Standard Plugin Structure
```typescript
// packages/elizaos-plugins/{plugin-name}/src/index.ts
import { Plugin } from '@elizaos/core';
import { actions } from './actions';
import { evaluators } from './evaluators';
import { providers } from './providers';

export default {
  name: '{plugin-name}',
  description: 'Plugin description explaining role in 371 OS ecosystem',
  actions: actions,
  evaluators: evaluators,
  providers: providers,
} as Plugin;
```

### Action Implementation Pattern
```typescript
// packages/elizaos-plugins/{plugin-name}/src/actions.ts
import { Action, ActionHandler, Memory, State } from '@elizaos/core';

export const ACTION_NAME: Action = {
  name: 'ACTION_NAME',
  description: 'Clear description of what this action accomplishes',
  validate: async (runtime, message) => {
    // Validation logic - return boolean
    return message.content?.action === 'ACTION_NAME';
  },
  handler: async (runtime, message, state, options, callback) => {
    try {
      // Action implementation
      const result = await performAction(message.content);
      
      if (callback) {
        callback({
          text: `Successfully executed ${ACTION_NAME}: ${result.summary}`,
          content: {
            success: true,
            data: result,
            timestamp: Date.now(),
          }
        });
      }
      
      return true;
    } catch (error) {
      if (callback) {
        callback({
          text: `Failed to execute ${ACTION_NAME}: ${error.message}`,
          content: {
            success: false,
            error: error.message,
            timestamp: Date.now(),
          }
        });
      }
      return false;
    }
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Example user request",
          action: "ACTION_NAME",
          parameters: { key: "value" }
        }
      },
      {
        user: "{{agent}}",
        content: {
          text: "I'll execute ACTION_NAME for you",
          action: "ACTION_NAME"
        }
      }
    ]
  ]
};
```

## 🔗 Blockchain Registry Patterns

### Smart Contract Interaction
```typescript
// packages/elizaos-plugins/universal-tool-server/src/blockchain-registry.ts
import { ethers } from 'ethers';
import { IPFSStorage } from './ipfs-storage';

export class BlockchainRegistryProvider {
  private contract: ethers.Contract;
  private ipfs: IPFSStorage;
  private provider: ethers.Provider;

  constructor(contractAddress: string, providerUrl: string) {
    this.provider = new ethers.JsonRpcProvider(providerUrl);
    this.contract = new ethers.Contract(contractAddress, ABI, this.provider);
    this.ipfs = new IPFSStorage();
  }

  async registerAgent(entry: AgentRegistryEntry): Promise<string> {
    // 1. Store metadata in IPFS for decentralization
    const metadataBuffer = Buffer.from(JSON.stringify({
      capabilities: entry.capabilities,
      toolDefinitions: entry.toolDefinitions,
      reputationHistory: entry.reputationHistory,
    }));
    
    const ipfsResult = await this.ipfs.add(metadataBuffer);
    const ipfsHash = ipfsResult.cid.toString();

    // 2. Create blockchain transaction
    const agentIdBytes = ethers.id(entry.agentId);
    const signer = await this.getSigner();
    const contractWithSigner = this.contract.connect(signer);
    
    const tx = await contractWithSigner.registerAgent(
      agentIdBytes,
      entry.did,
      ipfsHash,
      entry.stakeAmount,
      { gasLimit: 500000 }
    );

    await tx.wait();
    return tx.hash;
  }

  async discoverAgents(capability: string): Promise<AgentRegistryEntry[]> {
    const capabilityHash = ethers.id(capability);
    const agentIds = await this.contract.getAgentsByCapability(capabilityHash);
    
    const agents: AgentRegistryEntry[] = [];
    for (const agentId of agentIds) {
      const agentData = await this.contract.getAgent(agentId);
      const metadata = await this.ipfs.cat(agentData.ipfsHash);
      agents.push({
        agentId: ethers.toUtf8String(agentId),
        did: agentData.did,
        ...JSON.parse(metadata.toString()),
        reputation: agentData.reputation,
        stakeAmount: agentData.stakeAmount,
      });
    }
    
    return agents.sort((a, b) => Number(b.reputation) - Number(a.reputation));
  }
}
```

### IPFS Storage Pattern
```typescript
// packages/elizaos-plugins/universal-tool-server/src/ipfs-storage.ts
import { create, IPFSHTTPClient } from 'ipfs-http-client';

export class IPFSStorage {
  private client: IPFSHTTPClient;

  constructor(url: string = 'https://ipfs.infura.io:5001') {
    this.client = create({ url });
  }

  async add(data: Buffer): Promise<{ cid: any; size: number }> {
    const result = await this.client.add(data, {
      pin: true,
      cidVersion: 1,
    });
    return result;
  }

  async cat(cid: string): Promise<Uint8Array> {
    const chunks = [];
    for await (const chunk of this.client.cat(cid)) {
      chunks.push(chunk);
    }
    return new Uint8Array(Buffer.concat(chunks));
  }
}
```

## 🏢 Nx Workspace Integration Patterns

### Workspace Manipulation Action
```typescript
// packages/elizaos-plugins/nx-workspace/src/actions/workspace-analysis.ts
import { workspaceRoot, readProjectConfiguration } from '@nx/devkit';
import { execSync } from 'child_process';

export const analyzeWorkspaceAction: Action = {
  name: 'ANALYZE_WORKSPACE',
  description: 'Analyze Nx workspace structure for self-aware agent decision making',
  handler: async (runtime, message, state, options, callback) => {
    try {
      // Get workspace root and project structure
      const root = workspaceRoot;
      const projectGraph = JSON.parse(
        execSync('nx show projects --json', { cwd: root, encoding: 'utf8' })
      );

      // Analyze affected projects
      const affectedProjects = JSON.parse(
        execSync('nx show projects --affected --json', { 
          cwd: root, 
          encoding: 'utf8' 
        })
      );

      // Get dependency graph
      const dependencyGraph = JSON.parse(
        execSync('nx graph --file=graph.json && cat graph.json', { 
          cwd: root, 
          encoding: 'utf8' 
        })
      );

      const analysis = {
        workspaceRoot: root,
        totalProjects: projectGraph.length,
        affectedProjects: affectedProjects,
        criticalPath: this.analyzeCriticalPath(dependencyGraph),
        recommendations: this.generateOptimizationRecommendations(affectedProjects),
        costImpact: this.calculateCostImpact(affectedProjects),
      };

      if (callback) {
        callback({
          text: `Workspace analysis complete. Found ${analysis.totalProjects} projects, ${analysis.affectedProjects.length} affected by recent changes.`,
          content: {
            analysis,
            actionTaken: 'ANALYZE_WORKSPACE',
            timestamp: Date.now(),
          }
        });
      }

      return true;
    } catch (error) {
      // Error handling pattern
      return this.handleError(error, callback);
    }
  }
};
```

### Affected Analysis Pattern
```typescript
// packages/elizaos-plugins/nx-workspace/src/utils/affected-analysis.ts
export class AffectedAnalyzer {
  static async getAffectedProjects(base: string = 'main'): Promise<string[]> {
    try {
      const result = execSync(
        `nx show projects --affected --base=${base} --json`,
        { encoding: 'utf8' }
      );
      return JSON.parse(result);
    } catch (error) {
      console.warn('Failed to get affected projects, falling back to all projects');
      return this.getAllProjects();
    }
  }

  static async buildAffected(): Promise<{ success: boolean; duration: number }> {
    const startTime = Date.now();
    try {
      execSync('nx affected -t build --parallel=3', { 
        stdio: 'inherit',
        cwd: workspaceRoot 
      });
      return { 
        success: true, 
        duration: Date.now() - startTime 
      };
    } catch (error) {
      return { 
        success: false, 
        duration: Date.now() - startTime 
      };
    }
  }

  static calculateCostOptimization(affectedCount: number, totalCount: number): number {
    const efficiencyGain = 1 - (affectedCount / totalCount);
    return Math.round(efficiencyGain * 100);
  }
}
```

## 🚀 Akash Network Deployment Patterns

### Deployment Configuration
```typescript
// packages/akash-deployment/src/deployment-generator.ts
export class AkashDeploymentGenerator {
  static generateSDL(config: DeploymentConfig): string {
    return `
version: "2.0"

services:
  ${config.serviceName}:
    image: ${config.image}
    env:
      - NODE_ENV=production
      - ELIZAOS_CONFIG=${config.elizaConfig}
    expose:
      - port: ${config.port}
        as: 80
        to:
          - global: true

profiles:
  compute:
    ${config.serviceName}:
      resources:
        cpu:
          units: ${config.cpu}
        memory:
          size: ${config.memory}
        storage:
          size: ${config.storage}
  placement:
    dcloud:
      attributes:
        host: akash
      pricing:
        ${config.serviceName}:
          denom: uakt
          amount: ${config.maxPrice}

deployment:
  ${config.serviceName}:
    dcloud:
      profile: ${config.serviceName}
      count: ${config.replicas}
`;
  }

  static async deploy(sdl: string): Promise<DeploymentResult> {
    // Create deployment
    const deploymentId = await this.createDeployment(sdl);
    
    // Wait for bids
    const bids = await this.waitForBids(deploymentId);
    
    // Select best bid (lowest cost with good reputation)
    const selectedBid = this.selectOptimalBid(bids);
    
    // Create lease
    const lease = await this.createLease(selectedBid);
    
    return {
      deploymentId,
      leaseId: lease.id,
      providerUri: lease.providerUri,
      costReduction: this.calculateCostReduction(selectedBid.price),
    };
  }
}
```

## 🔐 Enterprise Security Patterns

### Secretless Broker Integration
```typescript
// packages/enterprise-security/src/secretless-integration.ts
export class SecretlessIntegration {
  private config: SecretlessConfig;

  async injectCredentials<T>(operation: () => Promise<T>): Promise<T> {
    // Secretless broker automatically injects credentials
    // No secrets in code - they're injected at runtime
    const context = await this.getSecureContext();
    
    return await operation();
  }

  async getSecureContext(): Promise<SecureContext> {
    // Credentials are injected by Secretless Broker
    // Agent code never sees actual secrets
    return {
      authenticated: true,
      permissions: await this.getPermissions(),
      auditTrail: this.initializeAuditTrail(),
    };
  }
}

// Usage in agent actions
export const secureAction: Action = {
  name: 'SECURE_OPERATION',
  handler: async (runtime, message, state, options, callback) => {
    const security = new SecretlessIntegration();
    
    return await security.injectCredentials(async () => {
      // Actual operation with injected credentials
      const result = await performSecureOperation();
      return result;
    });
  }
};
```

### ACI.dev Cloud Integration
```typescript
// packages/enterprise-security/src/aci-integration.ts
export class ACIIntegration {
  async deployWithSecurity(config: DeploymentConfig): Promise<SecureDeployment> {
    const aciConfig = {
      cloudProvider: 'akash',
      securityProfile: 'zero-trust',
      complianceFramework: 'SOC2',
      dataResidency: config.region,
    };

    // Deploy through ACI.dev for enterprise security
    const deployment = await this.deploySecure(aciConfig);
    
    return {
      deploymentId: deployment.id,
      securityEndpoint: deployment.secureEndpoint,
      complianceReport: deployment.compliance,
      auditLogs: deployment.auditEndpoint,
    };
  }
}
```

## 📊 Agent Coordination Patterns

### Multi-Agent Communication
```typescript
// packages/elizaos-plugins/agent-coordination/src/coordination.ts
export class AgentCoordinator {
  private registry: BlockchainRegistryProvider;

  async coordinateAgents(task: ComplexTask): Promise<TaskResult> {
    // 1. Analyze task requirements
    const requirements = this.analyzeTaskRequirements(task);
    
    // 2. Discover suitable agents
    const availableAgents = await this.discoverAgents(requirements);
    
    // 3. Create coordination plan
    const plan = this.createExecutionPlan(task, availableAgents);
    
    // 4. Execute coordinated workflow
    const results = await Promise.all(
      plan.steps.map(step => this.executeStep(step))
    );
    
    // 5. Aggregate results
    return this.aggregateResults(results);
  }

  private async executeStep(step: ExecutionStep): Promise<StepResult> {
    const agent = await this.getAgent(step.agentId);
    
    return await agent.execute({
      action: step.action,
      parameters: step.parameters,
      context: step.context,
    });
  }
}
```

### Economic Incentive Pattern
```typescript
// packages/elizaos-plugins/universal-tool-server/src/economics.ts
export class EconomicIncentiveManager {
  async executeWithIncentives(
    toolCall: UniversalToolCall,
    provider: AgentProvider
  ): Promise<IncentivizedResult> {
    // 1. Escrow payment
    const escrowId = await this.escrowPayment(toolCall.payment);
    
    // 2. Execute tool with verification
    const result = await provider.executeTool(toolCall);
    
    // 3. Verify result quality
    const quality = await this.verifyQuality(result, toolCall.expectedOutcome);
    
    // 4. Release payment based on quality
    if (quality.score > 0.8) {
      await this.releasePayment(escrowId, provider.address);
      await this.updateReputation(provider.agentId, quality.score);
    } else {
      await this.refundPayment(escrowId, toolCall.requester);
      await this.penalizeProvider(provider.agentId, quality.score);
    }
    
    return {
      result,
      quality,
      economicOutcome: quality.score > 0.8 ? 'success' : 'refunded',
    };
  }
}
```

## 🧪 Testing Patterns

### Plugin Integration Tests
```typescript
// packages/elizaos-plugins/universal-tool-server/src/__tests__/integration.test.ts
describe('Universal Tool Server Integration', () => {
  let blockchain: BlockchainRegistryProvider;
  let agent: TestAgent;

  beforeAll(async () => {
    // Setup test blockchain environment
    blockchain = new BlockchainRegistryProvider(
      TEST_CONTRACT_ADDRESS,
      TEST_RPC_URL
    );
    
    agent = new TestAgent({
      plugins: [universalToolServerPlugin],
    });
  });

  it('should register agent and enable tool discovery', async () => {
    // Register test agent
    const registryEntry = createTestAgentEntry();
    const txHash = await blockchain.registerAgent(registryEntry);
    expect(txHash).toMatch(/^0x[a-fA-F0-9]{64}$/);

    // Verify agent can be discovered
    const discoveredAgents = await blockchain.discoverAgents('test-capability');
    expect(discoveredAgents).toContainEqual(
      expect.objectContaining({
        agentId: registryEntry.agentId,
        capabilities: expect.arrayContaining(['test-capability']),
      })
    );
  });

  it('should coordinate cross-plugin agent communication', async () => {
    // Test nx-workspace plugin coordination with universal-tool-server
    const workspaceAnalysis = await agent.execute({
      action: 'ANALYZE_WORKSPACE',
    });

    const toolDiscovery = await agent.execute({
      action: 'DISCOVER_UNIVERSAL_TOOLS',
      capability: 'workspace-optimization',
    });

    expect(workspaceAnalysis.success).toBe(true);
    expect(toolDiscovery.success).toBe(true);
    expect(toolDiscovery.tools.length).toBeGreaterThan(0);
  });
});
```

These patterns should help Qoder understand the sophisticated architecture of 371 OS and generate code that follows the established patterns for blockchain coordination, enterprise security, and autonomous agent operation.