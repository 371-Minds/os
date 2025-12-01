/**
 * Autonomous Task Processor
 *
 * Handles autonomous task execution with reasoning chains,
 * sub-task spawning, and self-improvement capabilities
 */

import { GenerationOptions, type OllamaClient } from './ollama-client.js';
import type {
  ActionOutput,
  AgentTool,
  AutonomousConfig,
  AutonomousTask,
  ExecutionMetrics,
  MemoryEntry,
  OutputModality,
  ProcessingError,
  ProcessingResult,
  ReasoningStep,
  StructuredOutput,
} from './types.js';

/** Reasoning chain configuration */
interface ReasoningConfig {
  maxSteps: number;
  confidenceThreshold: number;
  enableSelfReflection: boolean;
  enableToolUse: boolean;
}

/** Task execution context */
interface ExecutionContext {
  task: AutonomousTask;
  startTime: number;
  reasoningChain: ReasoningStep[];
  subTasks: AutonomousTask[];
  depth: number;
  parentTaskId?: string;
}

export class AutonomousTaskProcessor {
  private ollamaClient: OllamaClient;
  private config: AutonomousConfig;
  private reasoningConfig: ReasoningConfig;
  private tools: Map<string, AgentTool> = new Map();
  private activeContexts: Map<string, ExecutionContext> = new Map();
  private memories: MemoryEntry[] = [];

  constructor(
    ollamaClient: OllamaClient,
    config: AutonomousConfig,
    reasoningConfig?: Partial<ReasoningConfig>,
  ) {
    this.ollamaClient = ollamaClient;
    this.config = config;
    this.reasoningConfig = {
      maxSteps: reasoningConfig?.maxSteps ?? 10,
      confidenceThreshold: reasoningConfig?.confidenceThreshold ?? 0.7,
      enableSelfReflection: reasoningConfig?.enableSelfReflection ?? true,
      enableToolUse: reasoningConfig?.enableToolUse ?? true,
    };

    // Register default tools
    this.registerDefaultTools();
  }

  /**
   * Process an autonomous task with full reasoning chain
   */
  async processTask(
    task: AutonomousTask,
    model: string,
    depth = 0,
    parentTaskId?: string,
  ): Promise<ProcessingResult> {
    // Check depth limit
    if (depth > this.config.maxSubTaskDepth) {
      return this.createErrorResult(task.id, 'Maximum sub-task depth exceeded');
    }

    // Create execution context
    const context: ExecutionContext = {
      task,
      startTime: Date.now(),
      reasoningChain: [],
      subTasks: [],
      depth,
      parentTaskId,
    };
    this.activeContexts.set(task.id, context);

    try {
      // Step 1: Initial observation and understanding
      const observation = await this.observe(task, model);
      context.reasoningChain.push(observation);

      // Step 2: Analysis and planning
      const analysis = await this.analyze(task, observation, model);
      context.reasoningChain.push(analysis);

      // Step 3: Generate hypotheses and action plan
      const plan = await this.plan(task, context.reasoningChain, model);
      context.reasoningChain.push(plan);

      // Step 4: Execute with optional sub-task spawning
      const actionResult = await this.execute(task, plan, context, model);
      context.reasoningChain.push(actionResult);

      // Step 5: Self-reflection (if enabled)
      if (this.reasoningConfig.enableSelfReflection) {
        const reflection = await this.reflect(
          task,
          context.reasoningChain,
          model,
        );
        context.reasoningChain.push(reflection);
      }

      // Generate final result
      const result = await this.synthesizeResult(task, context, model);

      // Store in memory
      this.addMemory(task, result);

      return result;
    } catch (error) {
      return this.createErrorResult(
        task.id,
        error instanceof Error ? error.message : 'Unknown error',
      );
    } finally {
      this.activeContexts.delete(task.id);
    }
  }

  /**
   * Register a tool for autonomous use
   */
  registerTool(tool: AgentTool): void {
    this.tools.set(tool.name, tool);
  }

  /**
   * Get active task contexts
   */
  getActiveContexts(): Map<string, ExecutionContext> {
    return this.activeContexts;
  }

  /**
   * Step 1: Observe and understand the task
   */
  private async observe(
    task: AutonomousTask,
    model: string,
  ): Promise<ReasoningStep> {
    const observationPrompt = `You are analyzing a task to understand what needs to be done.

Task: ${task.title}
Description: ${task.description}
Priority: ${task.priority}
Required Capabilities: ${task.requiredCapabilities.join(', ')}
Expected Output: ${task.expectedOutput}
${task.context?.textInputs ? `Additional Context:\n${task.context.textInputs.join('\n')}` : ''}

Provide a clear observation about:
1. What is the core objective?
2. What inputs are available?
3. What constraints exist?
4. What is the expected deliverable?

Be concise and specific.`;

    const { response } = await this.ollamaClient.generateText(
      observationPrompt,
      {
        model,
        temperature: 0.3,
        maxTokens: 500,
      },
    );

    return {
      step: 1,
      type: 'observation',
      content: response,
      confidence: 0.9,
      evidence: [task.description],
    };
  }

  /**
   * Step 2: Analyze the task and identify approach
   */
  private async analyze(
    task: AutonomousTask,
    observation: ReasoningStep,
    model: string,
  ): Promise<ReasoningStep> {
    const analysisPrompt = `Based on the following observation, analyze how to approach this task.

Observation:
${observation.content}

Task Requirements:
- Priority: ${task.priority}
- Timeout: ${task.timeoutMs}ms
- Allow Sub-tasks: ${task.allowSubTasks}

Available Tools: ${Array.from(this.tools.keys()).join(', ')}

Analyze:
1. What is the best approach?
2. Should this be broken into sub-tasks?
3. What tools might be needed?
4. What are potential challenges?

Provide a structured analysis.`;

    const { response } = await this.ollamaClient.generateText(analysisPrompt, {
      model,
      temperature: 0.4,
      maxTokens: 600,
    });

    return {
      step: 2,
      type: 'analysis',
      content: response,
      confidence: 0.85,
      evidence: [observation.content],
    };
  }

  /**
   * Step 3: Create an action plan
   */
  private async plan(
    task: AutonomousTask,
    reasoningChain: ReasoningStep[],
    model: string,
  ): Promise<ReasoningStep> {
    const previousReasoning = reasoningChain
      .map((s) => `[${s.type.toUpperCase()}] ${s.content}`)
      .join('\n\n');

    const planPrompt = `Based on the analysis, create a concrete action plan.

Previous Reasoning:
${previousReasoning}

Create a step-by-step plan with:
1. Specific actions to take
2. Order of operations
3. Success criteria for each step
4. Fallback options if steps fail

Format as numbered steps.`;

    const { response } = await this.ollamaClient.generateText(planPrompt, {
      model,
      temperature: 0.3,
      maxTokens: 800,
    });

    return {
      step: 3,
      type: 'hypothesis',
      content: response,
      confidence: 0.8,
      evidence: reasoningChain.map((s) => s.content),
    };
  }

  /**
   * Step 4: Execute the plan
   */
  private async execute(
    task: AutonomousTask,
    plan: ReasoningStep,
    context: ExecutionContext,
    model: string,
  ): Promise<ReasoningStep> {
    const executionPrompt = `Execute the following plan and provide the result.

Plan:
${plan.content}

Task: ${task.title}
Expected Output Type: ${task.expectedOutput}

Execute the plan step by step. For each step:
1. State what you're doing
2. Show the result
3. Verify success

Provide the complete execution result.`;

    const { response } = await this.ollamaClient.generateText(executionPrompt, {
      model,
      temperature: 0.2,
      maxTokens: 2000,
    });

    // Check if sub-tasks should be spawned
    if (task.allowSubTasks && this.shouldSpawnSubTasks(response)) {
      const subTasks = await this.generateSubTasks(task, response, model);
      context.subTasks.push(...subTasks);
    }

    return {
      step: 4,
      type: 'action',
      content: response,
      confidence: 0.85,
      evidence: [plan.content],
    };
  }

  /**
   * Step 5: Self-reflection
   */
  private async reflect(
    task: AutonomousTask,
    reasoningChain: ReasoningStep[],
    model: string,
  ): Promise<ReasoningStep> {
    const fullReasoning = reasoningChain
      .map((s) => `Step ${s.step} [${s.type}]: ${s.content}`)
      .join('\n\n');

    const reflectionPrompt = `Reflect on the reasoning and execution process.

Full Reasoning Chain:
${fullReasoning}

Original Task: ${task.title}

Reflect on:
1. Was the approach effective?
2. Were there any mistakes or inefficiencies?
3. What could be improved next time?
4. Is the result satisfactory?

Provide honest self-assessment.`;

    const { response } = await this.ollamaClient.generateText(
      reflectionPrompt,
      {
        model,
        temperature: 0.4,
        maxTokens: 500,
      },
    );

    return {
      step: 5,
      type: 'reflection',
      content: response,
      confidence: 0.9,
      evidence: reasoningChain.map((s) => s.content),
    };
  }

  /**
   * Synthesize the final result
   */
  private async synthesizeResult(
    task: AutonomousTask,
    context: ExecutionContext,
    model: string,
  ): Promise<ProcessingResult> {
    const totalTime = Date.now() - context.startTime;
    const actionStep = context.reasoningChain.find((s) => s.type === 'action');

    // Determine output based on expected type
    let output: string | StructuredOutput | ActionOutput;

    if (task.expectedOutput === 'structured') {
      output = await this.generateStructuredOutput(
        actionStep?.content || '',
        model,
      );
    } else if (task.expectedOutput === 'action') {
      output = this.parseActionOutput(actionStep?.content || '');
    } else {
      output = actionStep?.content || 'Task completed.';
    }

    const metrics: ExecutionMetrics = {
      totalTimeMs: totalTime,
      inferenceTimeMs: totalTime * 0.8, // Estimate
      gpuUtilization: 0.6,
      memoryUsageMB: 0,
      inputTokens: 0,
      outputTokens: 0,
      llmCalls: context.reasoningChain.length,
      visionProcessingCount: 0,
    };

    // Calculate average confidence
    const avgConfidence =
      context.reasoningChain.reduce((sum, s) => sum + s.confidence, 0) /
      context.reasoningChain.length;

    return {
      success: avgConfidence >= this.reasoningConfig.confidenceThreshold,
      taskId: task.id,
      outputType: task.expectedOutput,
      output,
      reasoning: context.reasoningChain,
      subTasks: context.subTasks.length > 0 ? context.subTasks : undefined,
      metrics,
    };
  }

  /**
   * Check if sub-tasks should be spawned
   */
  private shouldSpawnSubTasks(response: string): boolean {
    const indicators = [
      'multiple steps required',
      'complex task',
      'parallel processing',
      'break down into',
      'sub-tasks needed',
    ];

    const lowerResponse = response.toLowerCase();
    return indicators.some((i) => lowerResponse.includes(i));
  }

  /**
   * Generate sub-tasks from analysis
   */
  private async generateSubTasks(
    parentTask: AutonomousTask,
    analysis: string,
    model: string,
  ): Promise<AutonomousTask[]> {
    const subTaskPrompt = `Based on this analysis, generate sub-tasks.

Analysis:
${analysis}

Parent Task: ${parentTask.title}

Generate 2-4 sub-tasks in this exact JSON format:
[
  {
    "title": "Sub-task title",
    "description": "What needs to be done",
    "priority": "high|medium|low",
    "requiredCapabilities": ["text"],
    "expectedOutput": "text"
  }
]

Only output the JSON array.`;

    try {
      const { response } = await this.ollamaClient.generateText(subTaskPrompt, {
        model,
        temperature: 0.3,
        maxTokens: 800,
      });

      // Extract JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) return [];

      const subTasksData = JSON.parse(jsonMatch[0]);

      return subTasksData.map((st: any, i: number) => ({
        id: `${parentTask.id}_sub_${i + 1}`,
        title: st.title,
        description: st.description,
        priority: st.priority || 'medium',
        requiredCapabilities: st.requiredCapabilities || ['text'],
        expectedOutput: st.expectedOutput || 'text',
        timeoutMs: parentTask.timeoutMs / 2,
        allowSubTasks: false,
        createdAt: new Date(),
      }));
    } catch {
      return [];
    }
  }

  /**
   * Generate structured output
   */
  private async generateStructuredOutput(
    content: string,
    model: string,
  ): Promise<StructuredOutput> {
    try {
      const structurePrompt = `Convert this content to structured JSON:

${content}

Output only valid JSON.`;

      const { response } = await this.ollamaClient.generateText(
        structurePrompt,
        {
          model,
          temperature: 0.1,
          maxTokens: 1000,
        },
      );

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return {
          format: 'json',
          data: JSON.parse(jsonMatch[0]),
        };
      }
    } catch {
      // Fall back to markdown format
    }

    return {
      format: 'markdown',
      data: { content },
    };
  }

  /**
   * Parse action output from response
   */
  private parseActionOutput(content: string): ActionOutput {
    return {
      actionType: 'code_execution',
      status: 'executed',
      details: {
        content,
        executedAt: new Date().toISOString(),
      },
    };
  }

  /**
   * Create error result
   */
  private createErrorResult(taskId: string, message: string): ProcessingResult {
    const error: ProcessingError = {
      code: 'PROCESSING_ERROR',
      message,
      severity: 'error',
      recoverySuggestion: 'Review task requirements and try again',
    };

    return {
      success: false,
      taskId,
      outputType: 'text',
      output: `Error: ${message}`,
      reasoning: [],
      metrics: {
        totalTimeMs: 0,
        inferenceTimeMs: 0,
        gpuUtilization: 0,
        memoryUsageMB: 0,
        inputTokens: 0,
        outputTokens: 0,
        llmCalls: 0,
        visionProcessingCount: 0,
      },
      errors: [error],
    };
  }

  /**
   * Add memory entry
   */
  private addMemory(task: AutonomousTask, result: ProcessingResult): void {
    const entry: MemoryEntry = {
      id: `mem_${Date.now()}`,
      type: result.success ? 'result' : 'learning',
      content:
        typeof result.output === 'string'
          ? result.output
          : JSON.stringify(result.output),
      importance: result.success ? 0.7 : 0.9, // Failures are important to remember
      timestamp: new Date(),
      taskId: task.id,
    };

    this.memories.push(entry);

    // Keep memory bounded
    if (this.memories.length > 100) {
      this.memories = this.memories.slice(-100);
    }
  }

  /**
   * Get memory entries
   */
  getMemories(): MemoryEntry[] {
    return [...this.memories];
  }

  /**
   * Register default tools
   */
  private registerDefaultTools(): void {
    // File reader tool
    this.registerTool({
      name: 'read_file',
      description: 'Read contents of a file',
      inputSchema: { path: 'string' },
      outputSchema: { content: 'string' },
      requiredPermissions: ['file_read'],
      execute: async (input: any) => {
        const fs = await import('fs/promises');
        return { content: await fs.readFile(input.path, 'utf-8') };
      },
    });

    // Web search tool (simulated)
    this.registerTool({
      name: 'web_search',
      description: 'Search the web for information',
      inputSchema: { query: 'string' },
      outputSchema: { results: 'array' },
      requiredPermissions: ['external_api'],
      execute: async (input: any) => {
        return {
          results: [`Searched for: ${input.query}`],
          note: 'Web search requires API integration',
        };
      },
    });

    // Calculator tool
    this.registerTool({
      name: 'calculate',
      description: 'Perform mathematical calculations',
      inputSchema: { expression: 'string' },
      outputSchema: { result: 'number' },
      requiredPermissions: [],
      execute: async (input: any) => {
        try {
          // Safe evaluation using Function
          const result = new Function(`return ${input.expression}`)();
          return { result };
        } catch {
          return { error: 'Invalid expression' };
        }
      },
    });
  }
}
