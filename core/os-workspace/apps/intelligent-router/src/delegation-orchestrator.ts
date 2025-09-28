/**
 * DelegationOrchestrator - Task delegation and multi-agent coordination service
 * Manages the actual delegation of tasks to selected agents and coordinates
 * multi-agent workflows for complex tasks requiring collaboration
 */

import {
  RoutingTask,
  RoutingDecision,
  CoordinationStrategy,
  CoordinationStrategyType,
  ExecutionStep,
  AgentCapability,
  AvailabilityStatus,
  TaskPriority,
} from './types';

interface DelegationResult {
  success: boolean;
  delegation_id: string;
  assigned_agents: string[];
  execution_plan?: ExecutionStep[];
  estimated_start_time: Date;
  estimated_completion_time: Date;
  coordination_type?: CoordinationStrategyType;
  error?: string;
  monitoring_id?: string;
}

interface TaskExecution {
  execution_id: string;
  task_id: string;
  agent_id: string;
  status: 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  start_time?: Date;
  completion_time?: Date;
  progress_percentage: number;
  dependencies: string[];
  error_message?: string;
}

interface CoordinationSession {
  session_id: string;
  task_id: string;
  strategy: CoordinationStrategy;
  participating_agents: string[];
  execution_steps: TaskExecution[];
  overall_status: 'planning' | 'executing' | 'completed' | 'failed';
  progress_percentage: number;
  created_at: Date;
  updated_at: Date;
}

export class DelegationOrchestrator {
  private activeExecutions: Map<string, TaskExecution> = new Map();
  private coordinationSessions: Map<string, CoordinationSession> = new Map();
  private delegationHistory: Map<string, DelegationResult> = new Map();
  private agentWorkloadTracker: Map<string, number> = new Map();

  constructor() {
    console.log('[DelegationOrchestrator] Initialized task delegation and coordination service');
  }

  /**
   * Delegates a task to the selected agent(s) based on routing decision
   */
  public async delegateTask(
    task: RoutingTask,
    decision: RoutingDecision,
    coordinationStrategy?: CoordinationStrategy
  ): Promise<DelegationResult> {
    const delegationId = `delegation_${task.id}_${Date.now()}`;
    console.log(`[DelegationOrchestrator] Delegating task ${task.id} with delegation ID: ${delegationId}`);

    try {
      // Validate delegation requirements
      this.validateDelegationRequirements(task, decision);

      let result: DelegationResult;

      if (decision.coordination_required && coordinationStrategy) {
        // Handle multi-agent coordination
        result = await this.handleMultiAgentDelegation(
          task,
          decision,
          coordinationStrategy,
          delegationId
        );
      } else {
        // Handle single agent delegation
        result = await this.handleSingleAgentDelegation(
          task,
          decision,
          delegationId
        );
      }

      // Record delegation in history
      this.delegationHistory.set(delegationId, result);

      // Update agent workload tracking
      this.updateAgentWorkload(result.assigned_agents, 1);

      console.log(`[DelegationOrchestrator] Delegation ${delegationId} ${result.success ? 'successful' : 'failed'}`);
      return result;

    } catch (error) {
      console.error(`[DelegationOrchestrator] Delegation failed for task ${task.id}:`, error);
      
      const failedResult: DelegationResult = {
        success: false,
        delegation_id: delegationId,
        assigned_agents: [],
        estimated_start_time: new Date(),
        estimated_completion_time: new Date(),
        error: error instanceof Error ? error.message : 'Unknown delegation error'
      };

      this.delegationHistory.set(delegationId, failedResult);
      return failedResult;
    }
  }

  /**
   * Handles delegation to a single agent
   */
  private async handleSingleAgentDelegation(
    task: RoutingTask,
    decision: RoutingDecision,
    delegationId: string
  ): Promise<DelegationResult> {
    console.log(`[DelegationOrchestrator] Single agent delegation to: ${decision.primary_agent}`);

    // Create task execution
    const execution = this.createTaskExecution(
      task.id,
      decision.primary_agent,
      [],
      delegationId
    );

    // Add to active executions
    this.activeExecutions.set(execution.execution_id, execution);

    // Simulate task delegation (in real system, this would integrate with agent runtime)
    const delegationSuccess = await this.simulateAgentDelegation(decision.primary_agent, task);

    if (delegationSuccess) {
      // Update execution status
      execution.status = 'in_progress';
      execution.start_time = new Date();
      
      // Calculate estimated completion time
      const estimatedCompletion = new Date();
      estimatedCompletion.setTime(
        estimatedCompletion.getTime() + decision.estimated_completion_time
      );

      return {
        success: true,
        delegation_id: delegationId,
        assigned_agents: [decision.primary_agent],
        estimated_start_time: execution.start_time,
        estimated_completion_time: estimatedCompletion,
        monitoring_id: execution.execution_id
      };
    } else {
      // Try fallback agents
      if (decision.alternative_agents && decision.alternative_agents.length > 0) {
        return this.tryFallbackDelegation(task, decision, delegationId);
      } else {
        throw new Error(`Primary agent ${decision.primary_agent} unavailable and no fallback agents specified`);
      }
    }
  }

  /**
   * Handles multi-agent coordination and delegation
   */
  private async handleMultiAgentDelegation(
    task: RoutingTask,
    decision: RoutingDecision,
    strategy: CoordinationStrategy,
    delegationId: string
  ): Promise<DelegationResult> {
    console.log(`[DelegationOrchestrator] Multi-agent delegation using ${strategy.strategy_type} strategy`);

    // Create coordination session
    const sessionId = `coordination_${task.id}_${Date.now()}`;
    const session = this.createCoordinationSession(
      task.id,
      strategy,
      [decision.primary_agent, ...(decision.alternative_agents || [])],
      sessionId
    );

    // Generate execution plan based on strategy
    const executionPlan = this.generateExecutionPlan(task, decision, strategy);
    
    // Create task executions for each step
    const executions: TaskExecution[] = [];
    for (const step of executionPlan) {
      const execution = this.createTaskExecution(
        task.id,
        step.agent_id,
        step.dependencies,
        `${delegationId}_step_${step.step_id}`
      );
      executions.push(execution);
      this.activeExecutions.set(execution.execution_id, execution);
    }

    session.execution_steps = executions;
    this.coordinationSessions.set(sessionId, session);

    // Execute coordination based on strategy type
    const coordinationResult = await this.executeCoordinationStrategy(session, strategy);

    if (coordinationResult.success) {
      // Calculate overall estimated completion
      const estimatedCompletion = this.calculateCoordinationCompletion(executionPlan, strategy);
      
      return {
        success: true,
        delegation_id: delegationId,
        assigned_agents: session.participating_agents,
        execution_plan: executionPlan,
        estimated_start_time: new Date(),
        estimated_completion_time: estimatedCompletion,
        coordination_type: strategy.strategy_type,
        monitoring_id: sessionId
      };
    } else {
      throw new Error(`Coordination execution failed: ${coordinationResult.error}`);
    }
  }

  /**
   * Tries fallback agents when primary delegation fails
   */
  private async tryFallbackDelegation(
    task: RoutingTask,
    decision: RoutingDecision,
    delegationId: string
  ): Promise<DelegationResult> {
    console.log(`[DelegationOrchestrator] Trying fallback agents for task: ${task.id}`);

    for (const fallbackAgent of decision.alternative_agents || []) {
      const delegationSuccess = await this.simulateAgentDelegation(fallbackAgent, task);
      
      if (delegationSuccess) {
        // Create execution for fallback agent
        const execution = this.createTaskExecution(
          task.id,
          fallbackAgent,
          [],
          `${delegationId}_fallback`
        );
        
        execution.status = 'in_progress';
        execution.start_time = new Date();
        this.activeExecutions.set(execution.execution_id, execution);

        const estimatedCompletion = new Date();
        estimatedCompletion.setTime(
          estimatedCompletion.getTime() + decision.estimated_completion_time * 1.2 // 20% penalty for fallback
        );

        return {
          success: true,
          delegation_id: delegationId,
          assigned_agents: [fallbackAgent],
          estimated_start_time: execution.start_time,
          estimated_completion_time: estimatedCompletion,
          monitoring_id: execution.execution_id
        };
      }
    }

    throw new Error('All agents (primary and fallback) unavailable for delegation');
  }

  /**
   * Creates a new task execution record
   */
  private createTaskExecution(
    taskId: string,
    agentId: string,
    dependencies: string[],
    executionId: string
  ): TaskExecution {
    return {
      execution_id: executionId,
      task_id: taskId,
      agent_id: agentId,
      status: 'queued',
      progress_percentage: 0,
      dependencies: dependencies
    };
  }

  /**
   * Creates a new coordination session
   */
  private createCoordinationSession(
    taskId: string,
    strategy: CoordinationStrategy,
    participatingAgents: string[],
    sessionId: string
  ): CoordinationSession {
    return {
      session_id: sessionId,
      task_id: taskId,
      strategy: strategy,
      participating_agents: participatingAgents,
      execution_steps: [],
      overall_status: 'planning',
      progress_percentage: 0,
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  /**
   * Generates execution plan based on coordination strategy
   */
  private generateExecutionPlan(
    task: RoutingTask,
    decision: RoutingDecision,
    strategy: CoordinationStrategy
  ): ExecutionStep[] {
    const plan: ExecutionStep[] = [];
    const agents = [decision.primary_agent, ...(decision.alternative_agents?.slice(0, 2) || [])];

    switch (strategy.strategy_type) {
      case CoordinationStrategyType.SEQUENTIAL:
        // Create sequential execution steps
        for (let i = 0; i < agents.length; i++) {
          const step: ExecutionStep = {
            step_id: `seq_step_${i + 1}`,
            agent_id: agents[i],
            task_description: `Sequential step ${i + 1}: ${task.description}`,
            dependencies: i > 0 ? [`seq_step_${i}`] : [],
            estimated_duration: decision.estimated_completion_time / agents.length,
            parallel_execution_allowed: false
          };
          plan.push(step);
        }
        break;

      case CoordinationStrategyType.PARALLEL:
        // Create parallel execution steps
        for (let i = 0; i < agents.length; i++) {
          const step: ExecutionStep = {
            step_id: `par_step_${i + 1}`,
            agent_id: agents[i],
            task_description: `Parallel step ${i + 1}: ${task.description}`,
            dependencies: [],
            estimated_duration: decision.estimated_completion_time,
            parallel_execution_allowed: true
          };
          plan.push(step);
        }
        break;

      case CoordinationStrategyType.COLLABORATIVE:
        // Create collaborative execution with coordination steps
        const coordinationStep: ExecutionStep = {
          step_id: 'coord_setup',
          agent_id: decision.primary_agent,
          task_description: `Coordination setup: ${task.description}`,
          dependencies: [],
          estimated_duration: decision.estimated_completion_time * 0.2,
          parallel_execution_allowed: false
        };
        plan.push(coordinationStep);

        for (let i = 0; i < agents.length; i++) {
          const step: ExecutionStep = {
            step_id: `collab_step_${i + 1}`,
            agent_id: agents[i],
            task_description: `Collaborative step ${i + 1}: ${task.description}`,
            dependencies: ['coord_setup'],
            estimated_duration: decision.estimated_completion_time * 0.6,
            parallel_execution_allowed: true
          };
          plan.push(step);
        }

        const finalStep: ExecutionStep = {
          step_id: 'coord_finalize',
          agent_id: decision.primary_agent,
          task_description: `Coordination finalization: ${task.description}`,
          dependencies: plan.filter(s => s.step_id.startsWith('collab_')).map(s => s.step_id),
          estimated_duration: decision.estimated_completion_time * 0.2,
          parallel_execution_allowed: false
        };
        plan.push(finalStep);
        break;
    }

    return plan;
  }

  /**
   * Executes coordination strategy
   */
  private async executeCoordinationStrategy(
    session: CoordinationSession,
    strategy: CoordinationStrategy
  ): Promise<{ success: boolean; error?: string }> {
    console.log(`[DelegationOrchestrator] Executing ${strategy.strategy_type} coordination`);

    try {
      session.overall_status = 'executing';
      session.updated_at = new Date();

      // Simulate coordination execution based on strategy
      switch (strategy.strategy_type) {
        case CoordinationStrategyType.SEQUENTIAL:
          return this.executeSequentialCoordination(session);
        
        case CoordinationStrategyType.PARALLEL:
          return this.executeParallelCoordination(session);
        
        case CoordinationStrategyType.COLLABORATIVE:
          return this.executeCollaborativeCoordination(session);
        
        default:
          throw new Error(`Unknown coordination strategy: ${strategy.strategy_type}`);
      }

    } catch (error) {
      session.overall_status = 'failed';
      session.updated_at = new Date();
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Coordination execution failed'
      };
    }
  }

  /**
   * Executes sequential coordination
   */
  private async executeSequentialCoordination(session: CoordinationSession): Promise<{ success: boolean; error?: string }> {
    console.log(`[DelegationOrchestrator] Executing sequential coordination for session: ${session.session_id}`);
    
    // Simulate sequential execution
    for (const execution of session.execution_steps) {
      // Check dependencies
      const dependenciesMet = this.checkDependencies(execution, session.execution_steps);
      if (!dependenciesMet) {
        return { success: false, error: 'Dependencies not met for sequential execution' };
      }

      // Simulate agent delegation
      const delegationSuccess = await this.simulateAgentDelegation(execution.agent_id, null);
      if (!delegationSuccess) {
        return { success: false, error: `Agent ${execution.agent_id} unavailable` };
      }

      execution.status = 'in_progress';
      execution.start_time = new Date();
    }

    session.overall_status = 'completed';
    session.progress_percentage = 100;
    session.updated_at = new Date();

    return { success: true };
  }

  /**
   * Executes parallel coordination
   */
  private async executeParallelCoordination(session: CoordinationSession): Promise<{ success: boolean; error?: string }> {
    console.log(`[DelegationOrchestrator] Executing parallel coordination for session: ${session.session_id}`);
    
    // Simulate parallel execution - all agents start simultaneously
    const delegationPromises = session.execution_steps.map(async (execution) => {
      const delegationSuccess = await this.simulateAgentDelegation(execution.agent_id, null);
      if (delegationSuccess) {
        execution.status = 'in_progress';
        execution.start_time = new Date();
        return true;
      }
      return false;
    });

    const results = await Promise.all(delegationPromises);
    const allSuccessful = results.every(result => result);

    if (allSuccessful) {
      session.overall_status = 'completed';
      session.progress_percentage = 100;
      session.updated_at = new Date();
      return { success: true };
    } else {
      return { success: false, error: 'One or more agents unavailable for parallel execution' };
    }
  }

  /**
   * Executes collaborative coordination
   */
  private async executeCollaborativeCoordination(session: CoordinationSession): Promise<{ success: boolean; error?: string }> {
    console.log(`[DelegationOrchestrator] Executing collaborative coordination for session: ${session.session_id}`);
    
    // Simulate collaborative execution with coordination overhead
    let setupComplete = false;
    let collaborationStepsStarted = 0;
    let finalizationComplete = false;

    for (const execution of session.execution_steps) {
      if (execution.step_id === 'coord_setup') {
        const delegationSuccess = await this.simulateAgentDelegation(execution.agent_id, null);
        if (!delegationSuccess) {
          return { success: false, error: 'Coordination setup failed' };
        }
        execution.status = 'in_progress';
        execution.start_time = new Date();
        setupComplete = true;
      }
    }

    if (!setupComplete) {
      return { success: false, error: 'Coordination setup phase failed' };
    }

    // Start collaborative steps
    for (const execution of session.execution_steps) {
      if (execution.step_id.startsWith('collab_')) {
        const delegationSuccess = await this.simulateAgentDelegation(execution.agent_id, null);
        if (delegationSuccess) {
          execution.status = 'in_progress';
          execution.start_time = new Date();
          collaborationStepsStarted++;
        }
      }
    }

    if (collaborationStepsStarted === 0) {
      return { success: false, error: 'No collaborative agents available' };
    }

    // Finalization step
    for (const execution of session.execution_steps) {
      if (execution.step_id === 'coord_finalize') {
        const delegationSuccess = await this.simulateAgentDelegation(execution.agent_id, null);
        if (delegationSuccess) {
          execution.status = 'in_progress';
          execution.start_time = new Date();
          finalizationComplete = true;
        }
      }
    }

    if (finalizationComplete) {
      session.overall_status = 'completed';
      session.progress_percentage = 100;
      session.updated_at = new Date();
      return { success: true };
    } else {
      return { success: false, error: 'Coordination finalization failed' };
    }
  }

  /**
   * Checks if execution dependencies are met
   */
  private checkDependencies(execution: TaskExecution, allExecutions: TaskExecution[]): boolean {
    if (execution.dependencies.length === 0) {
      return true;
    }

    return execution.dependencies.every(depId => {
      const depExecution = allExecutions.find(ex => ex.execution_id.includes(depId));
      return depExecution && (depExecution.status === 'completed' || depExecution.status === 'in_progress');
    });
  }

  /**
   * Calculates estimated completion time for coordination
   */
  private calculateCoordinationCompletion(plan: ExecutionStep[], strategy: CoordinationStrategy): Date {
    const now = new Date();
    let totalDuration = 0;

    switch (strategy.strategy_type) {
      case CoordinationStrategyType.SEQUENTIAL:
        totalDuration = plan.reduce((sum, step) => sum + step.estimated_duration, 0);
        break;
      
      case CoordinationStrategyType.PARALLEL:
        totalDuration = Math.max(...plan.map(step => step.estimated_duration));
        break;
      
      case CoordinationStrategyType.COLLABORATIVE:
        const maxParallelDuration = Math.max(
          ...plan.filter(s => s.parallel_execution_allowed).map(s => s.estimated_duration)
        );
        const sequentialDuration = plan
          .filter(s => !s.parallel_execution_allowed)
          .reduce((sum, step) => sum + step.estimated_duration, 0);
        totalDuration = sequentialDuration + maxParallelDuration;
        break;
    }

    const completion = new Date(now);
    completion.setTime(completion.getTime() + totalDuration);
    return completion;
  }

  /**
   * Simulates agent delegation (in real system, this would integrate with agent runtime)
   */
  private async simulateAgentDelegation(agentId: string, task: RoutingTask | null): Promise<boolean> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

    // Simulate agent availability (90% success rate for simulation)
    const isAvailable = Math.random() > 0.1;
    
    if (isAvailable) {
      console.log(`[DelegationOrchestrator] Simulated successful delegation to agent: ${agentId}`);
    } else {
      console.log(`[DelegationOrchestrator] Simulated delegation failure for agent: ${agentId}`);
    }

    return isAvailable;
  }

  /**
   * Updates agent workload tracking
   */
  private updateAgentWorkload(agentIds: string[], increment: number): void {
    agentIds.forEach(agentId => {
      const currentWorkload = this.agentWorkloadTracker.get(agentId) || 0;
      this.agentWorkloadTracker.set(agentId, currentWorkload + increment);
    });
  }

  /**
   * Validates delegation requirements
   */
  private validateDelegationRequirements(task: RoutingTask, decision: RoutingDecision): void {
    if (!decision.primary_agent) {
      throw new Error('No primary agent specified in routing decision');
    }

    if (decision.coordination_required && (!decision.alternative_agents || decision.alternative_agents.length === 0)) {
      throw new Error('Coordination required but no alternative agents specified');
    }

    if (!task.id || !task.description) {
      throw new Error('Task missing required information for delegation');
    }
  }

  /**
   * Gets status of a specific delegation
   */
  public getDelegationStatus(delegationId: string): DelegationResult | null {
    return this.delegationHistory.get(delegationId) || null;
  }

  /**
   * Gets status of a coordination session
   */
  public getCoordinationStatus(sessionId: string): CoordinationSession | null {
    return this.coordinationSessions.get(sessionId) || null;
  }

  /**
   * Gets current active executions
   */
  public getActiveExecutions(): TaskExecution[] {
    return Array.from(this.activeExecutions.values());
  }

  /**
   * Gets agent workload information
   */
  public getAgentWorkloads(): Record<string, number> {
    const workloads: Record<string, number> = {};
    for (const [agentId, workload] of this.agentWorkloadTracker) {
      workloads[agentId] = workload;
    }
    return workloads;
  }

  /**
   * Cancels an active execution
   */
  public async cancelExecution(executionId: string): Promise<boolean> {
    const execution = this.activeExecutions.get(executionId);
    if (execution && execution.status === 'in_progress') {
      execution.status = 'cancelled';
      console.log(`[DelegationOrchestrator] Cancelled execution: ${executionId}`);
      return true;
    }
    return false;
  }

  /**
   * Gets delegation statistics
   */
  public getDelegationStatistics(): any {
    const totalDelegations = this.delegationHistory.size;
    const successfulDelegations = Array.from(this.delegationHistory.values())
      .filter(result => result.success).length;
    
    return {
      total_delegations: totalDelegations,
      successful_delegations: successfulDelegations,
      success_rate: totalDelegations > 0 ? successfulDelegations / totalDelegations : 0,
      active_executions: this.activeExecutions.size,
      active_coordination_sessions: this.coordinationSessions.size,
      agent_workloads: this.getAgentWorkloads()
    };
  }
}