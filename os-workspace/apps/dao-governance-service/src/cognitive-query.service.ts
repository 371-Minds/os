/**
 * Cognitive Query Service
 * 
 * Interfaces with the Cognition Layer MCP to analyze proposals against
 * the Chief AI Orchestrator's workstreams and decision patterns.
 */

import {
  CognitiveSummary,
  CognitiveAnalysisRequest,
  ProposalType,
  ExecutionDetails
} from './types.js';

export interface CognitionMCPResponse {
  success: boolean;
  data?: {
    keyInsights: string[];
    riskAnalysis: string[];
    relevantWorkstreams: string[];
    alignmentScore: number;
    confidence: number;
    recommendations: string[];
    potentialBlockers: string[];
  };
  error?: string;
}

export class CognitiveQueryService {
  private mcpEndpoint: string;
  private defaultTimeout: number = 30000; // 30 seconds

  constructor(mcpEndpoint?: string) {
    this.mcpEndpoint = mcpEndpoint || process.env.MCP_COGNITION_ENDPOINT || 'http://localhost:39300/model_context_protocol/2024-11-05/sse';
    console.log('🧠 Cognitive Query Service initialized with endpoint:', this.mcpEndpoint);
  }

  /**
   * Analyze a proposal against the Chief AI Orchestrator's workstreams
   */
  public async analyzeProposal(request: CognitiveAnalysisRequest): Promise<CognitiveSummary | null> {
    console.log(`🔍 Analyzing proposal ${request.proposalId} for agent ${request.agentId}`);

    try {
      const cognitiveQuery = this.buildCognitiveQuery(request);
      const mcpResponse = await this.queryCognitionLayer(cognitiveQuery);

      if (!mcpResponse.success || !mcpResponse.data) {
        console.warn(`⚠️ Cognitive analysis failed for proposal ${request.proposalId}: ${mcpResponse.error}`);
        return null;
      }

      const cognitiveSummary: CognitiveSummary = {
        keyInsights: mcpResponse.data.keyInsights,
        riskAnalysis: mcpResponse.data.riskAnalysis,
        relevantWorkstreams: mcpResponse.data.relevantWorkstreams,
        alignmentScore: mcpResponse.data.alignmentScore,
        confidence: mcpResponse.data.confidence,
        analysisTimestamp: new Date(),
        sourceQueries: [cognitiveQuery],
        recommendations: mcpResponse.data.recommendations,
        potentialBlockers: mcpResponse.data.potentialBlockers
      };

      console.log(`✅ Cognitive analysis completed for proposal ${request.proposalId} - Alignment Score: ${cognitiveSummary.alignmentScore}`);
      return cognitiveSummary;

    } catch (error) {
      console.error(`❌ Cognitive analysis error for proposal ${request.proposalId}:`, error);
      return null;
    }
  }

  /**
   * Build a structured query for the Cognition Layer MCP
   */
  private buildCognitiveQuery(request: CognitiveAnalysisRequest): string {
    const query = `
Analyze proposal '${request.proposalTitle}' against the Chief AI Orchestrator's active workstreams and historical decisions.

PROPOSAL DETAILS:
- Type: ${request.proposalType}
- Description: ${request.proposalDescription}
- Agent Requesting Analysis: ${request.agentId}

EXECUTION PHASES:
${request.executionDetails.phases.map(phase => 
  `- ${phase.name}: ${phase.description} (Responsible: ${phase.responsible_agents.join(', ')})`
).join('\n')}

ANALYSIS REQUIREMENTS:
1. Identify key insights from the Chief AI Orchestrator's workstreams that relate to this proposal
2. Assess alignment with documented priorities, especially regarding:
   - Technical architecture decisions
   - Performance optimization patterns
   - Cost reduction strategies (especially 97.6% cost reduction via Akash Network)
   - Agent autonomy and coordination
   - Legacy system migration patterns
3. Analyze potential risks and mitigation strategies
4. Provide a numerical alignment score (0.0 to 1.0)
5. Suggest recommendations for improvement
6. Identify potential blockers or concerns

CONTEXT:
${request.context}

Please provide a structured analysis focusing on actionable insights and strategic alignment.
    `.trim();

    return query;
  }

  /**
   * Query the Cognition Layer MCP server
   */
  private async queryCognitionLayer(query: string): Promise<CognitionMCPResponse> {
    try {
      console.log('🔗 Querying Cognition Layer MCP...');

      // For now, implement a mock response that demonstrates the expected behavior
      // In production, this would make an actual HTTP request to the MCP server
      const mockResponse = await this.generateMockCognitiveResponse(query);
      
      console.log('📊 Received cognitive analysis response');
      return mockResponse;

    } catch (error) {
      console.error('❌ Failed to query Cognition Layer MCP:', error);
      return {
        success: false,
        error: `MCP query failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Generate a realistic mock response for development/testing
   * In production, this would be replaced with actual MCP communication
   */
  private async generateMockCognitiveResponse(query: string): Promise<CognitionMCPResponse> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Extract proposal type and key terms for intelligent mock response
    const isLegacyMigration = query.toLowerCase().includes('legacy') || query.toLowerCase().includes('python');
    const isPerformanceOptimization = query.toLowerCase().includes('performance') || query.toLowerCase().includes('bun');
    const isAkashDeployment = query.toLowerCase().includes('akash') || query.toLowerCase().includes('deploy');
    const isTechnicalRefactor = query.toLowerCase().includes('refactor') || query.toLowerCase().includes('technical');

    let alignmentScore = 0.7; // Base score
    const keyInsights: string[] = [];
    const riskAnalysis: string[] = [];
    const relevantWorkstreams: string[] = [];
    const recommendations: string[] = [];
    const potentialBlockers: string[] = [];

    // Customize response based on proposal content
    if (isLegacyMigration) {
      alignmentScore = 0.95;
      keyInsights.push(
        "Chief AI Orchestrator has consistently prioritized migrating from legacy Python to Bun/TypeScript for performance gains",
        "Previous documentation shows performance issues with legacy-python-utils library",
        "Migration aligns with the 50x performance improvement strategy documented in Bun migration"
      );
      relevantWorkstreams.push("Bun Migration Strategy", "Legacy System Modernization", "Performance Optimization");
      recommendations.push("Prioritize high-impact components first", "Ensure comprehensive testing during migration");
      riskAnalysis.push("Low risk - aligns with established architectural patterns");
    }

    if (isPerformanceOptimization) {
      alignmentScore = Math.min(alignmentScore + 0.1, 1.0);
      keyInsights.push("Performance optimization is a core strategic priority");
      relevantWorkstreams.push("System Performance Enhancement");
      recommendations.push("Monitor performance metrics during implementation");
    }

    if (isAkashDeployment) {
      alignmentScore = Math.min(alignmentScore + 0.15, 1.0);
      keyInsights.push("Akash Network deployment is critical for achieving 97.6% cost reduction");
      relevantWorkstreams.push("Akash Network Integration", "Cost Optimization Strategy");
      recommendations.push("Validate Akash deployment configurations");
    }

    if (isTechnicalRefactor) {
      keyInsights.push("Technical refactoring supports the goal of creating maintainable, scalable architecture");
      recommendations.push("Follow established coding standards and architectural patterns");
      riskAnalysis.push("Medium risk - ensure backward compatibility");
    }

    // Add some baseline insights if none were added
    if (keyInsights.length === 0) {
      keyInsights.push(
        "Proposal aligns with general system improvement objectives",
        "Supports the autonomous agent ecosystem development"
      );
      relevantWorkstreams.push("System Architecture Evolution");
      recommendations.push("Ensure proper documentation and testing");
      riskAnalysis.push("Standard risk level - follow established review procedures");
    }

    return {
      success: true,
      data: {
        keyInsights,
        riskAnalysis,
        relevantWorkstreams,
        alignmentScore,
        confidence: 0.85 + Math.random() * 0.1, // 0.85-0.95 confidence
        recommendations,
        potentialBlockers
      }
    };
  }

  /**
   * Health check for the Cognition Layer MCP connection
   */
  public async healthCheck(): Promise<boolean> {
    try {
      const testQuery = "Health check - verify Cognition Layer MCP connectivity";
      const response = await this.queryCognitionLayer(testQuery);
      return response.success;
    } catch (error) {
      console.error('❌ Cognition Layer MCP health check failed:', error);
      return false;
    }
  }

  /**
   * Get the current MCP endpoint configuration
   */
  public getEndpointInfo(): { endpoint: string; timeout: number } {
    return {
      endpoint: this.mcpEndpoint,
      timeout: this.defaultTimeout
    };
  }
}

export default CognitiveQueryService;