/**
 * Workflow Engine
 * 
 * Manages execution workflows triggered by approved governance proposals.
 * Integrates with GraphBit for complex multi-phase execution orchestration.
 */

import type { 
  GovernanceProposal, 
  VotingResults,
  ExecutionStatus,
  PhaseStatus 
} from '../../dao-governance-service/src/types.js';

export interface GraphBitWorkflow {
  id: string;
  name: string;
  proposal_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
  created_at: Date;
  started_at?: Date;
  completed_at?: Date;
  phases: GraphBitPhase[];
  current_phase_index: number;
  execution_context: Record<string, any>;
}

export interface GraphBitPhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  started_at?: Date;
  completed_at?: Date;
  tasks: GraphBitTask[];
  dependencies: string[];
  outputs: Record<string, any>;
}

export interface GraphBitTask {
  id: string;
  name: string;
  type: 'agent_task' | 'automation' | 'approval' | 'notification';
  status: 'pending' | 'running' | 'completed' | 'failed';
  assigned_agent?: string;
  configuration: Record<string, any>;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  execution_time_ms?: number;
}

export class WorkflowEngine {
  private graphbitEndpoint: string;
  private activeWorkflows: Map<string, GraphBitWorkflow>;
  private executionHistory: Array<{ workflow_id: string; event: string; timestamp: Date; details: any }>;

  constructor() {
    this.graphbitEndpoint = process.env.GRAPHBIT_ENDPOINT || 'http://localhost:4000/workflows';
    this.activeWorkflows = new Map();
    this.executionHistory = [];
    
    console.log('⚙️ Workflow Engine initialized with GraphBit integration');
    console.log(`🔗 GraphBit endpoint: ${this.graphbitEndpoint}`);
  }

  /**
   * Trigger execution workflow for approved proposal
   */
  public async triggerApprovedExecution(proposal: GovernanceProposal, votingResults: VotingResults): Promise<ExecutionStatus> {
    console.log(`🚀 Triggering execution workflow for approved proposal: ${proposal.id}`);
    
    if (votingResults.outcome !== 'approved') {
      throw new Error(`Cannot trigger execution for non-approved proposal: ${votingResults.outcome}`);
    }

    // Create GraphBit workflow based on proposal execution details
    const workflow = await this.createGraphBitWorkflow(proposal);
    
    // Start execution
    const executionStatus = await this.startWorkflow(workflow);
    
    // Track execution
    this.logExecutionEvent(workflow.id, 'workflow_triggered', {
      proposal_id: proposal.id,
      voting_results: votingResults,
      workflow_id: workflow.id
    });

    console.log(`✅ Execution workflow triggered: ${workflow.id}`);
    console.log(`📊 Current phase: ${executionStatus.current_phase}`);
    
    return executionStatus;
  }

  /**
   * Create GraphBit workflow from proposal execution details
   */
  private async createGraphBitWorkflow(proposal: GovernanceProposal): Promise<GraphBitWorkflow> {
    const workflowId = `workflow_${proposal.id}_${Date.now()}`;
    
    const workflow: GraphBitWorkflow = {
      id: workflowId,
      name: `Execute: ${proposal.title}`,
      proposal_id: proposal.id,
      status: 'pending',
      created_at: new Date(),
      phases: [],
      current_phase_index: 0,
      execution_context: {
        proposal_id: proposal.id,
        budget_allocated: proposal.budgetRequest?.total_amount || 0,
        budget_spent: 0,
        start_date: new Date(),
        proposer: proposal.proposer
      }
    };

    // Convert proposal phases to GraphBit phases
    if (proposal.executionDetails?.phases) {
      for (const [index, proposalPhase] of proposal.executionDetails.phases.entries()) {
        const graphbitPhase: GraphBitPhase = {
          id: proposalPhase.id,
          name: proposalPhase.name,
          description: proposalPhase.description,
          status: 'pending',
          tasks: [],
          dependencies: proposalPhase.dependencies || [],
          outputs: {}
        };

        // Create tasks for each objective in the phase
        for (const [taskIndex, objective] of proposalPhase.objectives.entries()) {
          const task: GraphBitTask = {
            id: `${proposalPhase.id}_task_${taskIndex}`,
            name: objective,
            type: 'agent_task',
            status: 'pending',
            assigned_agent: proposalPhase.responsible_agents[0],
            configuration: {
              description: objective,
              deliverables: proposalPhase.deliverables,
              completion_criteria: proposalPhase.completion_criteria,
              budget_allocation: proposalPhase.budget_allocation || 0
            },
            inputs: {
              phase_context: proposalPhase.description,
              dependencies: proposalPhase.dependencies
            },
            outputs: {}
          };

          graphbitPhase.tasks.push(task);
        }

        workflow.phases.push(graphbitPhase);
      }
    } else {
      // Create default execution phase if no details provided
      workflow.phases.push({
        id: 'default_execution',
        name: 'Execute Proposal',
        description: 'Execute the approved proposal',
        status: 'pending',
        tasks: [
          {
            id: 'execute_proposal',
            name: 'Execute Proposal Implementation',
            type: 'agent_task',
            status: 'pending',
            assigned_agent: proposal.proposer,
            configuration: {
              description: 'Implement the approved proposal',
              budget_allocation: proposal.budgetRequest?.total_amount || 0
            },
            inputs: { proposal_context: proposal.description },
            outputs: {}
          }
        ],
        dependencies: [],
        outputs: {}
      });
    }

    this.activeWorkflows.set(workflowId, workflow);
    console.log(`🔧 Created GraphBit workflow: ${workflowId} with ${workflow.phases.length} phases`);
    
    return workflow;
  }

  /**
   * Start workflow execution
   */
  private async startWorkflow(workflow: GraphBitWorkflow): Promise<ExecutionStatus> {
    console.log(`▶️ Starting workflow execution: ${workflow.id}`);
    
    // Mock GraphBit API call to start workflow
    await this.mockGraphBitApiCall('POST', '/workflows/start', {
      workflow_id: workflow.id,
      phases: workflow.phases.map(p => ({
        id: p.id,
        name: p.name,
        tasks: p.tasks.length
      }))
    });

    workflow.status = 'running';
    workflow.started_at = new Date();

    // Start first phase
    if (workflow.phases.length > 0) {
      workflow.phases[0].status = 'running';
      workflow.phases[0].started_at = new Date();
    }

    // Simulate phase execution progress
    setTimeout(() => {
      this.simulatePhaseProgress(workflow.id);
    }, 2000);

    return this.getExecutionStatus(workflow);
  }

  /**
   * Simulate phase execution progress
   */
  private async simulatePhaseProgress(workflowId: string): Promise<void> {
    const workflow = this.activeWorkflows.get(workflowId);
    if (!workflow) return;

    const currentPhase = workflow.phases[workflow.current_phase_index];
    if (!currentPhase) return;

    console.log(`🔄 Executing phase: ${currentPhase.name}`);

    // Simulate task execution
    for (const [taskIndex, task] of currentPhase.tasks.entries()) {
      await this.delay(1000);
      
      task.status = 'running';
      console.log(`  ⚡ Executing task: ${task.name}`);
      
      // Simulate task completion
      await this.delay(500);
      task.status = 'completed';
      task.execution_time_ms = 500;
      task.outputs = {
        completed: true,
        result: `Task ${task.name} completed successfully`
      };
      
      console.log(`  ✅ Task completed: ${task.name}`);
    }

    // Complete current phase
    currentPhase.status = 'completed';
    currentPhase.completed_at = new Date();
    currentPhase.outputs = {
      phase_completed: true,
      tasks_completed: currentPhase.tasks.length,
      deliverables: currentPhase.tasks.map(t => t.outputs)
    };

    console.log(`✅ Phase completed: ${currentPhase.name}`);

    this.logExecutionEvent(workflowId, 'phase_completed', {
      phase_id: currentPhase.id,
      phase_name: currentPhase.name,
      tasks_completed: currentPhase.tasks.length
    });

    // Move to next phase or complete workflow
    workflow.current_phase_index++;
    
    if (workflow.current_phase_index < workflow.phases.length) {
      // Start next phase
      const nextPhase = workflow.phases[workflow.current_phase_index];
      nextPhase.status = 'running';
      nextPhase.started_at = new Date();
      
      console.log(`🔄 Moving to next phase: ${nextPhase.name}`);
      
      // Continue execution
      setTimeout(() => {
        this.simulatePhaseProgress(workflowId);
      }, 1000);
    } else {
      // Complete workflow
      workflow.status = 'completed';
      workflow.completed_at = new Date();
      
      console.log(`🎉 Workflow completed: ${workflow.id}`);
      
      this.logExecutionEvent(workflowId, 'workflow_completed', {
        total_phases: workflow.phases.length,
        total_duration_ms: workflow.completed_at.getTime() - (workflow.started_at?.getTime() || 0)
      });
    }
  }

  /**
   * Get current execution status
   */
  private getExecutionStatus(workflow: GraphBitWorkflow): ExecutionStatus {
    const currentPhase = workflow.phases[workflow.current_phase_index];
    const completedPhases = workflow.phases.filter(p => p.status === 'completed').length;
    const progressPercentage = workflow.phases.length > 0 ? (completedPhases / workflow.phases.length) * 100 : 0;

    const phaseStatuses: PhaseStatus[] = workflow.phases.map(phase => ({
      phase_id: phase.id,
      status: this.mapPhaseStatus(phase.status),
      progress_percentage: phase.status === 'completed' ? 100 : phase.status === 'running' ? 50 : 0,
      start_date: phase.started_at,
      completion_date: phase.completed_at,
      deliverables_completed: phase.tasks.filter(t => t.status === 'completed').map(t => t.name),
      blockers: [],
      responsible_agent_status: phase.tasks.map(task => ({
        agent_id: task.assigned_agent || 'unassigned',
        role: 'executor',
        availability: task.status === 'running' ? 'busy' : 'available',
        current_tasks: task.status === 'running' ? [task.name] : [],
        completion_rate: task.status === 'completed' ? 1.0 : 0.0
      }))
    }));

    return {
      proposal_id: workflow.proposal_id,
      current_phase: currentPhase?.name || 'completed',
      overall_progress_percentage: progressPercentage,
      phase_statuses: phaseStatuses,
      encountered_issues: [],
      budget_utilization: {
        total_allocated: workflow.execution_context.budget_allocated,
        total_spent: workflow.execution_context.budget_spent,
        remaining_budget: workflow.execution_context.budget_allocated - workflow.execution_context.budget_spent,
        utilization_percentage: workflow.execution_context.budget_allocated > 0 ? 
          (workflow.execution_context.budget_spent / workflow.execution_context.budget_allocated) * 100 : 0,
        spending_by_category: [],
        projected_overrun: 0,
        cost_efficiency_score: 0.95
      },
      timeline_adherence: {
        original_timeline_days: 30,
        actual_days_elapsed: Math.floor((Date.now() - workflow.execution_context.start_date.getTime()) / (24 * 60 * 60 * 1000)),
        projected_total_days: 30,
        schedule_variance_days: 0,
        schedule_performance_index: 1.0,
        critical_path_delays: []
      },
      quality_metrics: [
        {
          metric_name: 'Task Completion Rate',
          target_value: 100,
          actual_value: progressPercentage,
          measurement_unit: 'percentage',
          trend: 'improving',
          last_measured: new Date()
        }
      ],
      next_milestones: workflow.phases.slice(workflow.current_phase_index + 1, workflow.current_phase_index + 3).map(phase => ({
        milestone_id: phase.id,
        name: phase.name,
        target_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        completion_criteria: ['Phase tasks completed', 'Deliverables validated'],
        risk_factors: [],
        preparation_status: 'on_track'
      }))
    };
  }

  /**
   * Map workflow phase status to execution status
   */
  private mapPhaseStatus(status: GraphBitPhase['status']): PhaseStatus['status'] {
    switch (status) {
      case 'pending': return 'not_started';
      case 'running': return 'in_progress';
      case 'completed': return 'completed';
      case 'failed': return 'failed';
      case 'skipped': return 'completed';
      default: return 'not_started';
    }
  }

  /**
   * Mock GraphBit API call for simulation
   */
  private async mockGraphBitApiCall(method: string, endpoint: string, data: any): Promise<any> {
    // Simulate network delay
    await this.delay(150 + Math.random() * 100);
    
    console.log(`📡 GraphBit API: ${method} ${endpoint}`);
    
    // Simulate successful response
    return {
      success: true,
      data: data || { message: 'GraphBit operation completed' },
      workflow_id: data?.workflow_id,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Log execution event for audit trail
   */
  private logExecutionEvent(workflowId: string, event: string, details: any): void {
    this.executionHistory.push({
      workflow_id: workflowId,
      event,
      timestamp: new Date(),
      details
    });
  }

  /**
   * Get workflow by ID
   */
  public getWorkflow(workflowId: string): GraphBitWorkflow | undefined {
    return this.activeWorkflows.get(workflowId);
  }

  /**
   * Get execution history
   */
  public getExecutionHistory(workflowId?: string): Array<{ workflow_id: string; event: string; timestamp: Date; details: any }> {
    if (workflowId) {
      return this.executionHistory.filter(event => event.workflow_id === workflowId);
    }
    return this.executionHistory;
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}