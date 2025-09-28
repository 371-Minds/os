/**
 * DAO Governance API Routes
 * 
 * REST API endpoints for the DAO Governance & Voting System
 */

import { Router, Request, Response } from 'express';
import { DAOGovernanceService } from './governance-service.js';
import { getDAOConfig } from './config.js';
import {
  CreateProposalRequest,
  SubmitVoteRequest,
  ProposalQueryParams,
  ProposalStatus,
  ProposalType,
  VoteOption,
  HumanApprovalRequest
} from './types.js';

export class GovernanceApiRoutes {
  private router: Router;
  private governanceService: DAOGovernanceService;

  constructor() {
    this.router = Router();
    
    // Initialize governance service with configuration
    const config = getDAOConfig(process.env.NODE_ENV === 'development' ? 'development' : 'production');
    this.governanceService = new DAOGovernanceService(config);
    
    this.setupRoutes();
    console.log('🛣️ DAO Governance API routes initialized');
  }

  public getRouter(): Router {
    return this.router;
  }

  private setupRoutes(): void {
    // Proposal management routes
    this.router.post('/proposals', this.createProposal.bind(this));
    this.router.get('/proposals', this.getProposals.bind(this));
    this.router.get('/proposals/:id', this.getProposal.bind(this));
    this.router.post('/proposals/:id/submit', this.submitProposal.bind(this));
    this.router.post('/proposals/:id/start-voting', this.startVoting.bind(this));
    this.router.get('/proposals/:id/results', this.getVotingResults.bind(this));
    this.router.get('/proposals/:id/execution-status', this.getExecutionStatus.bind(this));

    // Human approval routes (Phase 19 enhancement)
    this.router.post('/proposals/:id/approve', this.approveProposal.bind(this));
    this.router.post('/proposals/:id/reject', this.rejectProposal.bind(this));
    this.router.get('/proposals/pending-approval', this.getPendingApprovalProposals.bind(this));

    // GraphBit workflow integration routes
    this.router.get('/workflows/ready-for-execution', this.getWorkflowReadyProposals.bind(this));
    this.router.post('/workflows/:proposal_id/execution-started', this.markExecutionStarted.bind(this));

    // Voting routes
    this.router.post('/votes', this.submitVote.bind(this));
    this.router.get('/proposals/:id/votes', this.getProposalVotes.bind(this));

    // Administrative routes
    this.router.get('/health', this.healthCheck.bind(this));
    this.router.get('/config', this.getConfiguration.bind(this));
    this.router.get('/stats', this.getSystemStats.bind(this));

    console.log('📋 API routes configured');
  }

  /**
   * POST /proposals - Create a new governance proposal
   */
  private async createProposal(req: Request, res: Response): Promise<void> {
    try {
      const request: CreateProposalRequest = req.body;

      // Basic validation
      if (!request.title || !request.description || !request.type || !request.proposer) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: title, description, type, proposer'
        });
        return;
      }

      // Validate proposal type
      if (!Object.values(ProposalType).includes(request.type)) {
        res.status(400).json({
          success: false,
          error: `Invalid proposal type: ${request.type}`
        });
        return;
      }

      const result = await this.governanceService.createProposal(request);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }

    } catch (error) {
      console.error('❌ Error creating proposal:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * GET /proposals - Get proposals with filtering and pagination
   */
  private async getProposals(req: Request, res: Response): Promise<void> {
    try {
      const queryParams: ProposalQueryParams = {
        status: req.query.status as ProposalStatus,
        type: req.query.type as ProposalType,
        proposer: req.query.proposer as string,
        created_after: req.query.created_after ? new Date(req.query.created_after as string) : undefined,
        created_before: req.query.created_before ? new Date(req.query.created_before as string) : undefined,
        voting_active: req.query.voting_active === 'true',
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        sort_by: req.query.sort_by as any,
        sort_order: req.query.sort_order as 'asc' | 'desc'
      };

      const result = await this.governanceService.queryProposals(queryParams);
      res.json(result);

    } catch (error) {
      console.error('❌ Error querying proposals:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * GET /proposals/:id - Get specific proposal by ID
   */
  private async getProposal(req: Request, res: Response): Promise<void> {
    try {
      const proposalId = req.params.id;
      const result = await this.governanceService.getProposal(proposalId);

      if (result.success) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }

    } catch (error) {
      console.error('❌ Error getting proposal:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * POST /proposals/:id/submit - Submit proposal for voting
   */
  private async submitProposal(req: Request, res: Response): Promise<void> {
    try {
      const proposalId = req.params.id;
      const { submitted_by } = req.body;

      if (!submitted_by) {
        res.status(400).json({
          success: false,
          error: 'submitted_by field is required'
        });
        return;
      }

      const result = await this.governanceService.submitProposal(proposalId, submitted_by);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }

    } catch (error) {
      console.error('❌ Error submitting proposal:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * POST /proposals/:id/start-voting - Start voting period
   */
  private async startVoting(req: Request, res: Response): Promise<void> {
    try {
      const proposalId = req.params.id;
      const result = await this.governanceService.startVoting(proposalId);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }

    } catch (error) {
      console.error('❌ Error starting voting:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * POST /votes - Submit a vote on a proposal
   */
  private async submitVote(req: Request, res: Response): Promise<void> {
    try {
      const request: SubmitVoteRequest = req.body;

      // Validate required fields
      if (!request.proposal_id || !request.voter_address || !request.vote_option || !request.signature) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: proposal_id, voter_address, vote_option, signature'
        });
        return;
      }

      // Validate vote option
      if (!Object.values(VoteOption).includes(request.vote_option)) {
        res.status(400).json({
          success: false,
          error: `Invalid vote option: ${request.vote_option}`
        });
        return;
      }

      const result = await this.governanceService.submitVote(request);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }

    } catch (error) {
      console.error('❌ Error submitting vote:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * GET /proposals/:id/results - Get voting results for a proposal
   */
  private async getVotingResults(req: Request, res: Response): Promise<void> {
    try {
      const proposalId = req.params.id;
      const result = await this.governanceService.getVotingResults(proposalId);

      if (result.success) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }

    } catch (error) {
      console.error('❌ Error getting voting results:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * GET /proposals/:id/execution-status - Get execution status for approved proposal
   */
  private async getExecutionStatus(req: Request, res: Response): Promise<void> {
    try {
      const proposalId = req.params.id;
      const result = await this.governanceService.getExecutionStatus(proposalId);

      if (result.success) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }

    } catch (error) {
      console.error('❌ Error getting execution status:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * POST /proposals/:id/approve - Approve a proposal awaiting human approval
   */
  private async approveProposal(req: Request, res: Response): Promise<void> {
    try {
      const proposalId = req.params.id;
      const {
        approved_by,
        reasoning,
        conditions,
        escalation_level
      } = req.body;

      if (!approved_by) {
        res.status(400).json({
          success: false,
          error: 'approved_by field is required'
        });
        return;
      }

      const approvalRequest: HumanApprovalRequest = {
        proposal_id: proposalId,
        decision: 'approved' as any,
        approved_by,
        reasoning,
        conditions,
        escalation_level: escalation_level || 'standard'
      };

      const result = await this.governanceService.processHumanApproval(approvalRequest);

      if (result.success) {
        // Emit the PROPOSAL_HUMAN_APPROVED event that GraphBit listens for
        console.log(`📡 Emitting PROPOSAL_HUMAN_APPROVED event for GraphBit workflow`);
        
        res.json({
          success: true,
          data: result.data,
          message: `Proposal ${proposalId} approved by ${approved_by}`,
          workflow_triggered: true,
          event_emitted: 'PROPOSAL_HUMAN_APPROVED'
        });
      } else {
        res.status(400).json(result);
      }

    } catch (error) {
      console.error('❌ Error approving proposal:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * POST /proposals/:id/reject - Reject a proposal awaiting human approval
   */
  private async rejectProposal(req: Request, res: Response): Promise<void> {
    try {
      const proposalId = req.params.id;
      const {
        approved_by,
        reasoning,
        modifications,
        escalation_level
      } = req.body;

      if (!approved_by) {
        res.status(400).json({
          success: false,
          error: 'approved_by field is required'
        });
        return;
      }

      const approvalRequest: HumanApprovalRequest = {
        proposal_id: proposalId,
        decision: 'rejected' as any,
        approved_by,
        reasoning,
        modifications,
        escalation_level: escalation_level || 'standard'
      };

      const result = await this.governanceService.processHumanApproval(approvalRequest);

      if (result.success) {
        res.json({
          success: true,
          data: result.data,
          message: `Proposal ${proposalId} rejected by ${approved_by}`
        });
      } else {
        res.status(400).json(result);
      }

    } catch (error) {
      console.error('❌ Error rejecting proposal:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * GET /workflows/ready-for-execution - Get proposals ready for GraphBit workflow execution
   */
  private async getWorkflowReadyProposals(req: Request, res: Response): Promise<void> {
    try {
      const queryParams: ProposalQueryParams = {
        status: 'executed' as ProposalStatus, // Approved and executed proposals
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        sort_by: 'humanApprovedAt' as any,
        sort_order: 'desc'
      };

      const result = await this.governanceService.queryProposals(queryParams);
      
      if (result.success) {
        // Filter only proposals with execution authorization
        const workflowReady = result.data?.filter(proposal => 
          proposal.votingResults?.execution_authorized && 
          proposal.humanApprovalStatus === 'approved'
        );

        // Prepare workflow execution data
        const workflowData = workflowReady?.map(proposal => ({
          proposal_id: proposal.id,
          title: proposal.title,
          type: proposal.type,
          execution_details: proposal.executionDetails,
          budget_request: proposal.budgetRequest,
          impacted_agents: proposal.impactedAgents,
          cognitive_summary: proposal.cognitiveSummary,
          approved_at: proposal.humanApprovedAt,
          approved_by: proposal.humanApprovalStatus
        }));

        res.json({
          success: true,
          data: workflowData,
          metadata: {
            ...result.metadata,
            workflow_ready_count: workflowData?.length || 0
          }
        });
      } else {
        res.status(400).json(result);
      }

    } catch (error) {
      console.error('❌ Error getting workflow ready proposals:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * POST /workflows/:proposal_id/execution-started - Mark proposal execution as started by GraphBit
   */
  private async markExecutionStarted(req: Request, res: Response): Promise<void> {
    try {
      const proposalId = req.params.proposal_id;
      const { workflow_id, started_by } = req.body;

      if (!workflow_id || !started_by) {
        res.status(400).json({
          success: false,
          error: 'workflow_id and started_by fields are required'
        });
        return;
      }

      const proposalResult = await this.governanceService.getProposal(proposalId);
      
      if (!proposalResult.success || !proposalResult.data) {
        res.status(404).json({
          success: false,
          error: `Proposal ${proposalId} not found`
        });
        return;
      }

      // Update proposal with execution information
      // Note: In a full implementation, you'd add execution tracking to the proposal data
      console.log(`🚀 Proposal ${proposalId} execution started by GraphBit workflow ${workflow_id}`);

      res.json({
        success: true,
        data: {
          proposal_id: proposalId,
          workflow_id,
          execution_started_at: new Date().toISOString(),
          started_by
        },
        message: `Execution started for proposal ${proposalId}`
      });

    } catch (error) {
      console.error('❌ Error marking execution started:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
  private async getPendingApprovalProposals(req: Request, res: Response): Promise<void> {
    try {
      const queryParams: ProposalQueryParams = {
        status: 'pending_human_approval' as ProposalStatus,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        sort_by: 'created_at',
        sort_order: 'desc'
      };

      const result = await this.governanceService.queryProposals(queryParams);
      
      if (result.success) {
        // Enrich response with cognitive summaries for easier human review
        const enrichedProposals = result.data?.map(proposal => ({
          id: proposal.id,
          title: proposal.title,
          description: proposal.description,
          type: proposal.type,
          status: proposal.status,
          proposer: proposal.proposer,
          createdAt: proposal.createdAt,
          votingResults: proposal.votingResults,
          cognitiveSummary: proposal.cognitiveSummary,
          budgetRequest: proposal.budgetRequest,
          executionDetails: proposal.executionDetails,
          stakeholders: proposal.stakeholders
        }));

        res.json({
          success: true,
          data: enrichedProposals,
          metadata: result.metadata
        });
      } else {
        res.status(400).json(result);
      }

    } catch (error) {
      console.error('❌ Error getting pending approval proposals:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
  private async getProposalVotes(req: Request, res: Response): Promise<void> {
    try {
      // Note: In production, this should be restricted to authorized users only
      const proposalId = req.params.id;
      
      res.status(501).json({
        success: false,
        error: 'Vote details endpoint not implemented - privacy protection'
      });

    } catch (error) {
      console.error('❌ Error getting proposal votes:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * GET /proposals/:id/votes - Get all votes for a proposal (admin only)
   */
  private async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      const isValid = await this.governanceService.validate();
      
      res.json({
        success: true,
        data: {
          status: 'healthy',
          service: 'dao-governance-service',
          version: '1.0.0',
          timestamp: new Date().toISOString(),
          governance_service_operational: isValid
        }
      });

    } catch (error) {
      console.error('❌ Health check failed:', error);
      res.status(503).json({
        success: false,
        error: 'Service unhealthy'
      });
    }
  }

  /**
   * GET /config - Get current DAO governance configuration (public info only)
   */
  private async getConfiguration(req: Request, res: Response): Promise<void> {
    try {
      // Return only public configuration information
      res.json({
        success: true,
        data: {
          supported_proposal_types: Object.values(ProposalType),
          vote_options: Object.values(VoteOption),
          voting_mechanisms: Object.values(VoteOption),
          default_voting_period_hours: 168,
          default_quorum_percentage: 20,
          default_approval_threshold: 66
        }
      });

    } catch (error) {
      console.error('❌ Error getting configuration:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  /**
   * GET /stats - Get system statistics
   */
  private async getSystemStats(req: Request, res: Response): Promise<void> {
    try {
      // Get basic statistics (mock implementation)
      const stats = {
        total_proposals: 0,
        active_proposals: 0,
        completed_proposals: 0,
        total_votes_cast: 0,
        average_participation_rate: 0,
        proposals_by_type: {} as Record<string, number>,
        proposals_by_status: {} as Record<string, number>
      };

      res.json({
        success: true,
        data: stats
      });

    } catch (error) {
      console.error('❌ Error getting system stats:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}