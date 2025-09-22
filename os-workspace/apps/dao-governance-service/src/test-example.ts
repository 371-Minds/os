/**
 * DAO Governance Service Test Example
 */

import { DAOGovernanceService } from './governance-service.js';
import { getDAOConfig } from './config.js';
import { ProposalType, VoteOption } from './types.js';

async function testGovernanceSystem() {
  console.log('🧪 Testing DAO Governance System');
  
  // Initialize service
  const config = getDAOConfig('development');
  const governance = new DAOGovernanceService(config);
  
  // Test proposal creation
  const proposalResult = await governance.createProposal({
    title: 'Test Strategic Initiative',
    description: 'A test proposal for governance validation',
    type: ProposalType.STRATEGIC,
    proposer: 'test-agent',
    execution_details: {
      phases: [{
        id: 'phase-1',
        name: 'Implementation',
        description: 'Test implementation phase',
        objectives: ['Complete testing'],
        deliverables: ['Test results'],
        estimatedDuration: '1 week',
        responsible_agents: ['test-agent'],
        completion_criteria: ['All tests pass'],
        dependencies: []
      }],
      dependencies: [],
      success_criteria: ['System operational'],
      risk_mitigation: [],
      resource_requirements: []
    },
    timeline: {
      key_milestones: [],
      review_period_days: 1,
      voting_period_days: 1
    },
    stakeholders: ['test-stakeholder']
  });
  
  if (proposalResult.success) {
    console.log('✅ Proposal created:', proposalResult.data?.id);
    
    // Test vote submission
    const voteResult = await governance.submitVote({
      proposal_id: proposalResult.data!.id,
      voter_address: '0x123',
      vote_option: VoteOption.FOR,
      signature: 'test-signature'
    });
    
    if (voteResult.success) {
      console.log('✅ Vote submitted successfully');
    } else {
      console.log('❌ Vote failed:', voteResult.error);
    }
  } else {
    console.log('❌ Proposal creation failed:', proposalResult.error);
  }
}

export { testGovernanceSystem };