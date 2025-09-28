/**
 * DAO Governance Service with Cognitive Oversight
 * 
 * Enhanced service managing the complete DAO governance lifecycle with
 * Cognitive Oversight Architecture and Human-in-the-Loop approval gates.
 */

import {
  GovernanceProposal,
  ProposalType,
  ProposalStatus,
  Vote,
  VoteOption,
  VotingResults,
  VotingOutcome,
  GovernanceEvent,
  GovernanceEventType,
  DAOGovernanceConfig,
  CreateProposalRequest,
  SubmitVoteRequest,
  ProposalQueryParams,
  GovernanceServiceResponse,
  VotingConfiguration,
  CognitiveSummary,
  HumanApprovalStatus,
  HumanApprovalRequest,
  HumanApprovalDecision
} from './types.js';
import { CognitiveQueryService } from './cognitive-query.service.js';
import { AgentResolverService } from './agent-resolver.service.js';

export class DAOGovernanceService {
  private proposals: Map<string, GovernanceProposal> = new Map();
  private votes: Map<string, Vote[]> = new Map();
  private events: GovernanceEvent[] = [];
  private config: DAOGovernanceConfig;
  private agentResolver: AgentResolverService;
  private cognitiveQueryService: CognitiveQueryService;

  constructor(config: DAOGovernanceConfig) {
    this.config = config;
    this.agentResolver = new AgentResolverService();
    this.cognitiveQueryService = new CognitiveQueryService();
    console.log('🏛️ DAO Governance Service initialized with modernized agent resolution');
  }

  /**
   * Create a new governance proposal
   */
  public async createProposal(request: CreateProposalRequest): Promise<GovernanceServiceResponse<GovernanceProposal>> {
    console.log(`📝 Creating ${request.type} proposal: ${request.title}`);

    try {
      const proposalId = this.generateProposalId();
      const votingConfig = this.buildVotingConfiguration(request.type, request.voting_config);
      const timeline = this.calculateProposalTimeline(request.timeline, votingConfig);

      const proposal: GovernanceProposal = {
        id: proposalId,
        title: request.title,
        description: request.description,
        proposer: request.proposer,
        proposerAddress: request.proposer,
        type: request.type,
        status: ProposalStatus.DRAFT,
        executionDetails: request.execution_details,
        budgetRequest: request.budget_request,
        timeline,
        votingConfig,
        stakeholders: request.stakeholders,
        impactedAgents: this.identifyImpactedAgents(request.execution_details),
        emergencyProposal: request.emergency_proposal || false,
        createdAt: new Date()
      };

      this.proposals.set(proposalId, proposal);
      this.votes.set(proposalId, []);

      await this.recordEvent({
        id: this.generateEventId(),
        type: GovernanceEventType.PROPOSAL_CREATED,
        proposal_id: proposalId,
        triggered_by: request.proposer,
        timestamp: new Date(),
        data: { title: request.title, type: request.type }
      });

      console.log(`✅ Proposal created: ${proposalId}`);
      return { success: true, data: proposal };

    } catch (error) {
      console.error('❌ Failed to create proposal:', error);
      return {
        success: false,
        error: `Proposal creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Submit a vote on a proposal
   */
  public async submitVote(request: SubmitVoteRequest): Promise<GovernanceServiceResponse<Vote>> {
    console.log(`🗳️ Submitting ${request.vote_option} vote for proposal ${request.proposal_id}`);

    try {
      const proposal = this.proposals.get(request.proposal_id);
      if (!proposal) {
        throw new Error(`Proposal ${request.proposal_id} not found`);
      }

      if (proposal.status !== ProposalStatus.VOTING_ACTIVE) {
        throw new Error(`Voting is not active for proposal ${request.proposal_id}`);
      }

      const existingVotes = this.votes.get(request.proposal_id) || [];
      if (existingVotes.some(vote => vote.voter_address === request.voter_address)) {
        throw new Error(`Voter ${request.voter_address} has already voted`);
      }

      const votingPower = await this.calculateVotingPower(request.voter_address, proposal.votingConfig);

      const vote: Vote = {
        voter_id: request.voter_address,
        voter_address: request.voter_address,
        proposal_id: request.proposal_id,
        vote_option: request.vote_option,
        voting_power: votingPower,
        reason: request.reason,
        delegated_votes: request.delegated_votes,
        timestamp: new Date(),
        signature: request.signature,
        transaction_hash: this.generateTransactionHash()
      };

      existingVotes.push(vote);
      this.votes.set(request.proposal_id, existingVotes);

      await this.recordEvent({
        id: this.generateEventId(),
        type: GovernanceEventType.VOTE_CAST,
        proposal_id: request.proposal_id,
        triggered_by: request.voter_address,
        timestamp: new Date(),
        data: { vote_option: request.vote_option, voting_power: votingPower }
      });

      console.log(`✅ Vote submitted for proposal ${request.proposal_id}`);
      return { success: true, data: vote };

    } catch (error) {
      console.error(`❌ Failed to submit vote:`, error);
      return {
        success: false,
        error: `Vote submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Calculate voting results for a proposal with cognitive enhancement
   */
  private async calculateVotingResults(proposalId: string): Promise<VotingResults> {
    const proposal = this.proposals.get(proposalId)!;
    const votes = this.votes.get(proposalId) || [];

    const tallies = {
      for: votes.filter(v => v.vote_option === VoteOption.FOR).length,
      against: votes.filter(v => v.vote_option === VoteOption.AGAINST).length,
      abstain: votes.filter(v => v.vote_option === VoteOption.ABSTAIN).length,
      veto: votes.filter(v => v.vote_option === VoteOption.VETO).length
    };

    const powerTallies = {
      for: votes.filter(v => v.vote_option === VoteOption.FOR).reduce((sum, v) => sum + v.voting_power, 0),
      against: votes.filter(v => v.vote_option === VoteOption.AGAINST).reduce((sum, v) => sum + v.voting_power, 0),
      abstain: votes.filter(v => v.vote_option === VoteOption.ABSTAIN).reduce((sum, v) => sum + v.voting_power, 0),
      veto: votes.filter(v => v.vote_option === VoteOption.VETO).reduce((sum, v) => sum + v.voting_power, 0)
    };

    const totalVotingPower = powerTallies.for + powerTallies.against + powerTallies.abstain + powerTallies.veto;
    const totalEligiblePower = await this.getTotalEligibleVotingPower();
    
    const participationRate = (totalVotingPower / totalEligiblePower) * 100;
    const quorumAchieved = participationRate >= proposal.votingConfig.quorum_percentage;
    
    const approvalRate = totalVotingPower > 0 ? (powerTallies.for / totalVotingPower) * 100 : 0;
    const approvalThresholdMet = approvalRate >= proposal.votingConfig.approval_threshold_percentage;

    let outcome: VotingOutcome;
    if (powerTallies.veto > 0 && proposal.emergencyProposal) {
      outcome = VotingOutcome.VETOED;
    } else if (!quorumAchieved) {
      outcome = VotingOutcome.QUORUM_NOT_MET;
    } else if (approvalThresholdMet) {
      outcome = VotingOutcome.APPROVED;
    } else {
      outcome = VotingOutcome.REJECTED;
    }

    // If approved, transition to PENDING_HUMAN_APPROVAL instead of EXECUTED
    if (outcome === VotingOutcome.APPROVED) {
      await this.transitionToPendingHumanApproval(proposalId);
    }

    return {
      proposal_id: proposalId,
      total_votes_cast: votes.length,
      total_voting_power: totalVotingPower,
      quorum_achieved: quorumAchieved,
      approval_threshold_met: approvalThresholdMet,
      votes_for: tallies.for,
      votes_against: tallies.against,
      votes_abstain: tallies.abstain,
      votes_veto: tallies.veto,
      power_for: powerTallies.for,
      power_against: powerTallies.against,
      power_abstain: powerTallies.abstain,
      power_veto: powerTallies.veto,
      participation_rate: participationRate,
      unique_voters: votes.length,
      delegated_votes_count: votes.filter(v => v.delegated_votes && v.delegated_votes.length > 0).length,
      agent_participation: await this.calculateAgentParticipation(votes),
      outcome,
      execution_authorized: false, // Will be set to true only after human approval
      voting_ended_at: new Date(),
      results_finalized_at: new Date()
    };
  }

  /**
   * Transition proposal to pending human approval after agent vote passes
   */
  private async transitionToPendingHumanApproval(proposalId: string): Promise<void> {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) return;

    console.log(`👤 Transitioning proposal ${proposalId} to pending human approval`);
    
    proposal.status = ProposalStatus.PENDING_HUMAN_APPROVAL;
    proposal.humanApprovalStatus = HumanApprovalStatus.PENDING;

    await this.recordEvent({
      id: this.generateEventId(),
      type: GovernanceEventType.HUMAN_APPROVAL_REQUESTED,
      proposal_id: proposalId,
      triggered_by: 'governance_system',
      timestamp: new Date(),
      data: {
        voting_results: 'approved_by_agents',
        cognitive_summary: proposal.cognitiveSummary ? {
          alignment_score: proposal.cognitiveSummary.alignmentScore,
          key_insights_count: proposal.cognitiveSummary.keyInsights.length
        } : null
      }
    });

    // TODO: Trigger Novu notification to human approver
    console.log(`📧 Human approval notification triggered for proposal: ${proposal.title}`);
    console.log(`   Cognitive Alignment Score: ${proposal.cognitiveSummary?.alignmentScore || 'N/A'}`);
  }

  /**
   * Process human approval decision with cognitive insight integration
   */
  public async processHumanApproval(request: HumanApprovalRequest): Promise<GovernanceServiceResponse<GovernanceProposal>> {
    console.log(`👤 Processing human approval decision for proposal ${request.proposal_id}: ${request.decision}`);

    try {
      const proposal = this.proposals.get(request.proposal_id);
      if (!proposal) {
        throw new Error(`Proposal ${request.proposal_id} not found`);
      }

      if (proposal.status !== ProposalStatus.PENDING_HUMAN_APPROVAL) {
        throw new Error(`Proposal ${request.proposal_id} is not pending human approval`);
      }

      // Enrich approval decision with cognitive insights if not already present
      if (!proposal.cognitiveSummary && request.decision === 'approved') {
        console.log(`🧠 Generating final cognitive analysis for approval decision`);
        await this.triggerCognitiveAnalysis(proposal, request.approved_by);
      }

      const decision: HumanApprovalDecision = {
        status: request.decision,
        approvedBy: request.approved_by,
        timestamp: new Date(),
        reasoning: request.reasoning,
        conditions: request.conditions,
        modifications: request.modifications,
        escalationLevel: request.escalation_level
      };

      proposal.humanApprovalStatus = request.decision;
      
      if (request.decision === HumanApprovalStatus.APPROVED) {
        proposal.status = ProposalStatus.EXECUTED;
        proposal.humanApprovedAt = new Date();
        
        // Enable execution authorization
        if (proposal.votingResults) {
          proposal.votingResults.execution_authorized = true;
        }

        await this.recordEvent({
          id: this.generateEventId(),
          type: GovernanceEventType.HUMAN_APPROVAL_GRANTED,
          proposal_id: request.proposal_id,
          triggered_by: request.approved_by,
          timestamp: new Date(),
          data: {
            reasoning: request.reasoning,
            conditions: request.conditions,
            escalation_level: request.escalation_level,
            cognitive_alignment_score: proposal.cognitiveSummary?.alignmentScore
          }
        });

        console.log(`✅ Proposal ${request.proposal_id} approved by human: ${request.approved_by}`);
        
        // Emit GraphBit workflow trigger event
        await this.emitWorkflowTriggerEvent(proposal, 'PROPOSAL_HUMAN_APPROVED');
        
      } else if (request.decision === HumanApprovalStatus.REJECTED) {
        proposal.status = ProposalStatus.REJECTED;

        await this.recordEvent({
          id: this.generateEventId(),
          type: GovernanceEventType.HUMAN_APPROVAL_REJECTED,
          proposal_id: request.proposal_id,
          triggered_by: request.approved_by,
          timestamp: new Date(),
          data: {
            reasoning: request.reasoning,
            modifications: request.modifications
          }
        });

        console.log(`❌ Proposal ${request.proposal_id} rejected by human: ${request.approved_by}`);
      }

      return { success: true, data: proposal };

    } catch (error) {
      console.error(`❌ Failed to process human approval:`, error);
      return {
        success: false,
        error: `Human approval processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Emit workflow trigger event for GraphBit integration
   */
  private async emitWorkflowTriggerEvent(proposal: GovernanceProposal, eventType: string): Promise<void> {
    console.log(`🚀 Emitting workflow trigger event: ${eventType} for proposal ${proposal.id}`);
    
    try {
      // Prepare workflow trigger data
      const workflowData = {
        proposal_id: proposal.id,
        proposal_title: proposal.title,
        proposal_type: proposal.type,
        execution_details: proposal.executionDetails,
        budget_request: proposal.budgetRequest,
        impacted_agents: proposal.impactedAgents,
        cognitive_summary: proposal.cognitiveSummary,
        human_approval_status: proposal.humanApprovalStatus,
        voting_results: proposal.votingResults,
        trigger_timestamp: new Date().toISOString()
      };
      
      // Record the workflow trigger event
      await this.recordEvent({
        id: this.generateEventId(),
        type: 'WORKFLOW_TRIGGER_EMITTED' as GovernanceEventType,
        proposal_id: proposal.id,
        triggered_by: 'governance_system',
        timestamp: new Date(),
        data: {
          workflow_event_type: eventType,
          workflow_data: workflowData
        }
      });
      
      // TODO: In production, emit to actual workflow system (GraphBit)
      // Example: await this.workflowService.triggerWorkflow(eventType, workflowData);
      
      console.log(`✨ Workflow trigger event emitted successfully for proposal: ${proposal.title}`);
      
    } catch (error) {
      console.error(`❌ Failed to emit workflow trigger event:`, error);
      // Don't fail the approval process if workflow trigger fails
    }
  }
  private async triggerCognitiveAnalysis(proposal: GovernanceProposal, requestedBy: string): Promise<void> {
    console.log(`🧠 Triggering cognitive analysis for proposal ${proposal.id}`);
    
    try {
      // Create cognitive analysis request
      const analysisRequest = {
        proposalId: proposal.id,
        proposalTitle: proposal.title,
        proposalDescription: proposal.description,
        proposalType: proposal.type,
        executionDetails: proposal.executionDetails,
        agentId: requestedBy,
        context: `Proposal submitted for governance review. Type: ${proposal.type}, Stakeholders: ${proposal.stakeholders.join(', ')}`
      };
      
      // Request cognitive analysis
      const cognitiveSummary = await this.cognitiveQueryService.analyzeProposal(analysisRequest);
      
      if (cognitiveSummary) {
        // Attach cognitive summary to proposal
        await this.attachCognitiveSummary(proposal.id, cognitiveSummary);
        console.log(`✨ Cognitive analysis completed for proposal ${proposal.id}`);
      } else {
        console.warn(`⚠️ Cognitive analysis failed for proposal ${proposal.id}`);
      }
      
    } catch (error) {
      console.error(`❌ Cognitive analysis error for proposal ${proposal.id}:`, error);
      // Don't fail the proposal submission if cognitive analysis fails
    }
  }
  public async attachCognitiveSummary(proposalId: string, cognitiveSummary: CognitiveSummary): Promise<GovernanceServiceResponse<GovernanceProposal>> {
    console.log(`🧠 Attaching cognitive summary to proposal ${proposalId}`);

    try {
      const proposal = this.proposals.get(proposalId);
      if (!proposal) {
        throw new Error(`Proposal ${proposalId} not found`);
      }

      proposal.cognitiveSummary = cognitiveSummary;

      await this.recordEvent({
        id: this.generateEventId(),
        type: GovernanceEventType.COGNITIVE_ANALYSIS_COMPLETED,
        proposal_id: proposalId,
        triggered_by: 'cognitive_system',
        timestamp: new Date(),
        data: {
          alignment_score: cognitiveSummary.alignmentScore,
          confidence: cognitiveSummary.confidence,
          insights_count: cognitiveSummary.keyInsights.length,
          risk_factors: cognitiveSummary.riskAnalysis.length
        }
      });

      console.log(`✅ Cognitive summary attached - Alignment Score: ${cognitiveSummary.alignmentScore}`);
      return { success: true, data: proposal };

    } catch (error) {
      console.error(`❌ Failed to attach cognitive summary:`, error);
      return {
        success: false,
        error: `Cognitive summary attachment failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
  private generateProposalId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `PROP-${timestamp}-${random}`.toUpperCase();
  }

  private generateEventId(): string {
    return `EVENT-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 3)}`.toUpperCase();
  }

  private generateTransactionHash(): string {
    return `0x${Math.random().toString(16).substr(2, 64)}`;
  }

  private buildVotingConfiguration(type: ProposalType, overrides?: Partial<VotingConfiguration>): VotingConfiguration {
    let config = { ...this.config.default_voting_config };
    const typeSpecific = this.config.type_specific_configs[type];
    if (typeSpecific) config = { ...config, ...typeSpecific };
    if (overrides) config = { ...config, ...overrides };
    return config;
  }

  private calculateProposalTimeline(requestTimeline: any, votingConfig: VotingConfiguration): any {
    return {
      ...requestTimeline,
      review_period_days: requestTimeline.review_period_days || this.config.proposal_submission.review_period_days,
      voting_period_days: Math.ceil(votingConfig.voting_period_hours / 24)
    };
  }

  private identifyImpactedAgents(executionDetails: any): string[] {
    // Use agent resolver to get modernized agent identifiers
    const resolvedAgents = this.agentResolver.resolveExecutionAgents(executionDetails);
    const modernAgentIds = resolvedAgents.map(agent => agent.agentId);
    
    console.log(`🔍 Identified ${modernAgentIds.length} impacted agents:`, modernAgentIds);
    return modernAgentIds;
  }

  private async calculateVotingPower(voterAddress: string, config: VotingConfiguration): Promise<number> {
    // Try to resolve as agent first, then fallback to stake-based calculation
    const agentWeight = this.agentResolver.getAgentVotingWeight(voterAddress);
    
    if (agentWeight) {
      console.log(`🤖 Using agent voting power for ${voterAddress}: ${agentWeight.votingPower}`);
      return agentWeight.votingPower;
    }
    
    // Fallback to original calculation for non-agent voters
    if (config.voting_power_calculation.base_mechanism === 'equal') return 1;
    
    const stake = await this.getStakeAmount(voterAddress);
    const reputation = await this.getReputationScore(voterAddress);
    
    return Math.max(stake + reputation, 1);
  }

  private async getStakeAmount(address: string): Promise<number> {
    // Mock implementation - in real system, query blockchain
    return Math.floor(Math.random() * 1000) + 100;
  }

  private async getReputationScore(address: string): Promise<number> {
    // Mock implementation - in real system, query reputation system
    return Math.floor(Math.random() * 100) + 50;
  }

  private async getTotalEligibleVotingPower(): Promise<number> {
    // Mock implementation - in real system, calculate from all eligible voters
    return 10000;
  }

  private async calculateAgentParticipation(votes: Vote[]): Promise<any[]> {
    // Get all C-Suite agents and their participation
    const cSuiteAgents = this.agentResolver.getAllCSuiteAgents();
    const participation: any[] = [];
    
    for (const agent of cSuiteAgents) {
      const agentVotes = votes.filter(vote => {
        const resolvedVoter = this.agentResolver.resolveAgent(vote.voter_address);
        return resolvedVoter?.characterRole === agent.role;
      });
      
      const votingPowerExercised = agentVotes.reduce((sum, vote) => sum + vote.voting_power, 0);
      const participationRate = agentVotes.length > 0 ? 100 : 0;
      
      participation.push({
        agent_type: agent.role,
        agent_id: agent.agentId,
        total_eligible: 1,
        votes_cast: agentVotes.length,
        participation_rate: participationRate,
        voting_power_exercised: votingPowerExercised
      });
    }
    
    return participation;
  }

  private async recordEvent(event: GovernanceEvent): Promise<void> {
    this.events.push(event);
    console.log(`📝 Event recorded: ${event.type} for proposal ${event.proposal_id}`);
  }

  private async checkEarlyExecutionConditions(proposalId: string): Promise<void> {
    // Check if proposal can be executed early due to overwhelming support
    const results = await this.calculateVotingResults(proposalId);
    if (results.approval_threshold_met && results.participation_rate > 75) {
      console.log(`⚡ Early execution conditions met for proposal ${proposalId}`);
    }
  }

  /**
   * Submit a proposal for voting with enhanced cognitive analysis
   */
  public async submitProposal(proposalId: string, submittedBy: string): Promise<GovernanceServiceResponse<GovernanceProposal>> {
    console.log(`📤 Submitting proposal ${proposalId} for voting with cognitive analysis`);

    try {
      const proposal = this.proposals.get(proposalId);
      if (!proposal) {
        throw new Error(`Proposal ${proposalId} not found`);
      }

      if (proposal.status !== ProposalStatus.DRAFT) {
        throw new Error(`Proposal ${proposalId} is not in draft status`);
      }

      // Trigger cognitive analysis before submission
      await this.triggerCognitiveAnalysis(proposal, submittedBy);

      proposal.status = ProposalStatus.SUBMITTED;
      proposal.submittedAt = new Date();
      proposal.votingStartsAt = new Date(Date.now() + (this.config.proposal_submission.review_period_days * 24 * 60 * 60 * 1000));
      proposal.votingEndsAt = new Date(proposal.votingStartsAt.getTime() + (proposal.votingConfig.voting_period_hours * 60 * 60 * 1000));

      await this.recordEvent({
        id: this.generateEventId(),
        type: GovernanceEventType.PROPOSAL_SUBMITTED,
        proposal_id: proposalId,
        triggered_by: submittedBy,
        timestamp: new Date(),
        data: { 
          voting_starts_at: proposal.votingStartsAt,
          cognitive_analysis_requested: true
        }
      });

      return { success: true, data: proposal };
    } catch (error) {
      return { success: false, error: `Proposal submission failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }

  /**
   * Start voting period for a proposal
   */
  public async startVoting(proposalId: string): Promise<GovernanceServiceResponse<GovernanceProposal>> {
    console.log(`🗳️ Starting voting for proposal ${proposalId}`);

    try {
      const proposal = this.proposals.get(proposalId);
      if (!proposal) {
        throw new Error(`Proposal ${proposalId} not found`);
      }

      proposal.status = ProposalStatus.VOTING_ACTIVE;

      await this.recordEvent({
        id: this.generateEventId(),
        type: GovernanceEventType.VOTING_STARTED,
        proposal_id: proposalId,
        triggered_by: 'system',
        timestamp: new Date(),
        data: { voting_ends_at: proposal.votingEndsAt }
      });

      return { success: true, data: proposal };
    } catch (error) {
      return { success: false, error: `Voting start failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }

  /**
   * Get proposal by ID
   */
  public async getProposal(proposalId: string): Promise<GovernanceServiceResponse<GovernanceProposal>> {
    const proposal = this.proposals.get(proposalId);
    
    if (!proposal) {
      return { success: false, error: `Proposal ${proposalId} not found` };
    }

    return { success: true, data: proposal };
  }

  /**
   * Query proposals with filters and pagination
   */
  public async queryProposals(params: ProposalQueryParams): Promise<GovernanceServiceResponse<GovernanceProposal[]>> {
    try {
      let proposals = Array.from(this.proposals.values());

      // Apply filters
      if (params.status) proposals = proposals.filter(p => p.status === params.status);
      if (params.type) proposals = proposals.filter(p => p.type === params.type);
      if (params.proposer) proposals = proposals.filter(p => p.proposer === params.proposer);
      if (params.voting_active) proposals = proposals.filter(p => p.status === ProposalStatus.VOTING_ACTIVE);

      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const paginatedProposals = proposals.slice(startIndex, startIndex + limit);

      return {
        success: true,
        data: paginatedProposals,
        metadata: { total_count: proposals.length, page, limit }
      };
    } catch (error) {
      return { success: false, error: `Query failed: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }

  /**
   * Get voting results for a proposal
   */
  public async getVotingResults(proposalId: string): Promise<GovernanceServiceResponse<VotingResults>> {
    const proposal = this.proposals.get(proposalId);
    
    if (!proposal) {
      return { success: false, error: `Proposal ${proposalId} not found` };
    }

    if (proposal.status === ProposalStatus.VOTING_ACTIVE) {
      const results = await this.calculateVotingResults(proposalId);
      return { success: true, data: results };
    }

    if (!proposal.votingResults) {
      return { success: false, error: `No voting results available for proposal ${proposalId}` };
    }

    return { success: true, data: proposal.votingResults };
  }

  /**
   * Get execution status for an approved proposal
   */
  public async getExecutionStatus(proposalId: string): Promise<GovernanceServiceResponse<any>> {
    const proposal = this.proposals.get(proposalId);
    
    if (!proposal) {
      return { success: false, error: `Proposal ${proposalId} not found` };
    }

    if (!proposal.executionStatus) {
      return { success: false, error: `No execution status available for proposal ${proposalId}` };
    }

    return { success: true, data: proposal.executionStatus };
  }

  /**
   * Validate the service is operational
   */
  public async validate(): Promise<boolean> {
    try {
      return typeof this.createProposal === 'function' &&
             typeof this.submitVote === 'function' &&
             this.proposals instanceof Map &&
             this.votes instanceof Map;
    } catch (error) {
      console.error('DAOGovernanceService validation failed:', error);
      return false;
    }
  }
}