import { 
  AgentRegistryEntry, 
  AgentCapability, 
  ReputationScore 
} from './index';

describe('Core Types', () => {
  it('should define AgentRegistryEntry interface', () => {
    const agentEntry: AgentRegistryEntry = {
      agentId: 'test-agent',
      did: 'did:example:123',
      capabilities: [],
      reputation: { value: 0.95, lastUpdated: new Date() },
      stakeAmount: BigInt(1000)
    };
    
    expect(agentEntry.agentId).toBe('test-agent');
  });

  it('should define AgentCapability interface', () => {
    const capability: AgentCapability = {
      name: 'test-capability',
      description: 'A test capability',
      version: '1.0.0'
    };
    
    expect(capability.name).toBe('test-capability');
  });

  it('should define ReputationScore interface', () => {
    const reputation: ReputationScore = {
      value: 0.85,
      lastUpdated: new Date()
    };
    
    expect(reputation.value).toBe(0.85);
  });
});