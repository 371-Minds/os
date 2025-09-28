/**
 * Governance Integration
 * 
 * Integrates with the DAO Governance Service and manages proposal lifecycle
 * including submission, voting coordination, and execution triggers.
 */

import type {
  GovernanceProposal,
  VotingResults,
  CreateProposalRequest,
  SubmitVoteRequest,
  GovernanceServiceResponse
} from '../../dao-governance-service/src/types.js';

export interface NextcloudDiscussion {
  thread_id: string;
  space_name: string;
  participants: string[];
  created_at: Date;
  messages_count: number;
}

export interface GovernanceWorkflow {
  proposal_id: string;
  current_stage: 'created' | 'submitted' | 'voting' | 'approved' | 'executed';
  stage_transitions: Array<{
    from_stage: string;
    to_stage: string;
    timestamp: Date;
    triggered_by: string;
  }>;
}

export class GovernanceIntegration {
  private baseUrl: string;
  private workflows: Map<string, GovernanceWorkflow>;

  constructor() {
    this.baseUrl = process.env.DAO_GOVERNANCE_URL || 'http://localhost:3000/api/governance';
    this.workflows = new Map();
    
    console.log('🏛️ Governance Integration initialized');
    console.log(`🔗 Connected to: ${this.baseUrl}`);
  }

  /**
   * Submit proposal to DAO Governance Service
   */
  public async submitProposal(proposal: GovernanceProposal): Promise<GovernanceServiceResponse<GovernanceProposal>> {
    console.log(`📝 Submitting proposal to governance service: ${proposal.id}`);
    
    try {
      // For simulation, we'll mock the API call
      const response = await this.mockGovernanceApiCall('POST', '/proposals', {
        title: proposal.title,
        description: proposal.description,
        type: proposal.type,
        proposer: proposal.proposer,
        execution_details: proposal.executionDetails,
        budget_request: proposal.budgetRequest,
        timeline: proposal.timeline,
        stakeholders: proposal.stakeholders
      });

      // Track workflow
      this.workflows.set(proposal.id, {
        proposal_id: proposal.id,
        current_stage: 'submitted',
        stage_transitions: [
          {
            from_stage: 'created',
            to_stage: 'submitted',
            timestamp: new Date(),
            triggered_by: proposal.proposer
          }
        ]
      });

      console.log(`✅ Proposal submitted successfully: ${proposal.id}`);
      return response;

    } catch (error) {
      console.error('❌ Failed to submit proposal:', error);
      throw error;
    }
  }

  /**
   * Start voting period for a proposal
   */
  public async startVotingPeriod(proposalId: string): Promise<GovernanceServiceResponse> {
    console.log(`🗳️ Starting voting period for proposal: ${proposalId}`);
    
    try {
      const response = await this.mockGovernanceApiCall('POST', `/proposals/${proposalId}/start-voting`, {});
      
      // Update workflow
      const workflow = this.workflows.get(proposalId);
      if (workflow) {
        workflow.current_stage = 'voting';
        workflow.stage_transitions.push({
          from_stage: 'submitted',
          to_stage: 'voting',
          timestamp: new Date(),
          triggered_by: 'system'
        });
      }

      console.log(`✅ Voting period started for proposal: ${proposalId}`);
      return response;

    } catch (error) {
      console.error('❌ Failed to start voting period:', error);
      throw error;
    }
  }

  /**
   * Submit vote for a proposal
   */
  public async submitVote(voteRequest: SubmitVoteRequest): Promise<GovernanceServiceResponse> {
    console.log(`🗳️ Submitting vote: ${voteRequest.voter_address} votes ${voteRequest.vote_option}`);
    
    try {
      const response = await this.mockGovernanceApiCall('POST', '/votes', voteRequest);
      console.log(`✅ Vote submitted successfully for proposal: ${voteRequest.proposal_id}`);
      return response;

    } catch (error) {
      console.error('❌ Failed to submit vote:', error);
      throw error;
    }
  }

  /**
   * Get voting results for a proposal
   */
  public async getVotingResults(proposalId: string): Promise<GovernanceServiceResponse<VotingResults>> {
    console.log(`📊 Retrieving voting results for proposal: ${proposalId}`);
    
    try {
      const response = await this.mockGovernanceApiCall('GET', `/proposals/${proposalId}/results`, null);
      console.log(`✅ Voting results retrieved for proposal: ${proposalId}`);
      return response;

    } catch (error) {
      console.error('❌ Failed to get voting results:', error);
      throw error;
    }
  }

  /**
   * Set up Nextcloud governance discussion thread
   */
  public async setupGovernanceDiscussion(proposal: GovernanceProposal): Promise<NextcloudDiscussion> {
    console.log(`💬 Setting up Nextcloud discussion for proposal: ${proposal.id}`);
    
    // Simulate Nextcloud API integration
    const discussion: NextcloudDiscussion = {
      thread_id: `thread_${proposal.id}`,
      space_name: 'DAO Governance',
      participants: ['mimi_ceo', 'zara_cto', 'maya_cfo', 'alex_clo'],
      created_at: new Date(),
      messages_count: 0
    };

    // Mock Nextcloud API call
    await this.delay(500);
    
    console.log(`✅ Nextcloud discussion thread created: ${discussion.thread_id}`);
    console.log(`👥 Participants: ${discussion.participants.join(', ')}`);
    
    return discussion;
  }

  /**
   * Process proposal approval and trigger execution
   */
  public async processApproval(proposalId: string, votingResults: VotingResults): Promise<{ execution_triggered: boolean; workflow_id?: string }> {
    console.log(`✅ Processing approval for proposal: ${proposalId}`);
    
    if (votingResults.outcome !== 'approved') {
      console.log(`❌ Proposal not approved: ${votingResults.outcome}`);
      return { execution_triggered: false };
    }

    // Update workflow
    const workflow = this.workflows.get(proposalId);
    if (workflow) {
      workflow.current_stage = 'approved';
      workflow.stage_transitions.push({
        from_stage: 'voting',
        to_stage: 'approved',
        timestamp: new Date(),
        triggered_by: 'voting_results'
      });
    }

    console.log(`🎯 Proposal approved - triggering execution workflow`);
    
    return {
      execution_triggered: true,
      workflow_id: `workflow_${proposalId}_execution`
    };
  }

  /**
   * Get proposal status and workflow information
   */
  public getProposalWorkflow(proposalId: string): GovernanceWorkflow | undefined {
    return this.workflows.get(proposalId);
  }

  /**
   * Check governance service health
   */
  public async checkServiceHealth(): Promise<{ healthy: boolean; response_time_ms: number }> {
    const startTime = Date.now();
    
    try {
      await this.mockGovernanceApiCall('GET', '/health', null);
      const responseTime = Date.now() - startTime;
      
      console.log(`✅ Governance service healthy (${responseTime}ms)`);
      return { healthy: true, response_time_ms: responseTime };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.error(`❌ Governance service unhealthy (${responseTime}ms):`, error);
      return { healthy: false, response_time_ms: responseTime };
    }
  }

  /**
   * Mock governance API call for simulation
   */
  private async mockGovernanceApiCall(method: string, endpoint: string, data: any): Promise<GovernanceServiceResponse> {
    // Simulate network delay
    await this.delay(200 + Math.random() * 300);
    
    // Simulate successful API response
    return {
      success: true,
      data: data || { message: 'Operation completed successfully' },
      metadata: {
        execution_time_ms: Math.floor(50 + Math.random() * 150)
      }
    };
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get summary of all workflows
   */
  public getWorkflowSummary(): Array<{ proposal_id: string; current_stage: string; transitions_count: number }> {
    return Array.from(this.workflows.values()).map(workflow => ({
      proposal_id: workflow.proposal_id,
      current_stage: workflow.current_stage,
      transitions_count: workflow.stage_transitions.length
    }));
  }
}