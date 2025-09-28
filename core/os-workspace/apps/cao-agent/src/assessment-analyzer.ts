/**
 * Assessment Analyzer Component
 * 
 * Responsible for systematic evaluation of agent capabilities, competency assessment,
 * and performance gap analysis through comprehensive assessment frameworks.
 */

import type {
  Assessment,
  AssessmentResult,
  AssessmentQuestion,
  AssessmentResponse,
  CompetencyRating,
  CompetencyLevel,
  AgentPerformanceData,
  CAOLogger,
  CAOOperationResult,
  AssessmentEvaluationCriteria,
  PerformanceThreshold,
  CompetencyLevelDefinition
} from './types.js';

export class AssessmentAnalyzer {
  private logger: CAOLogger;
  private assessments: Map<string, Assessment>;
  private assessmentResults: Map<string, AssessmentResult[]>;
  private competencyMappings: Map<string, Record<string, CompetencyRating>>;
  private evaluationCriteria: AssessmentEvaluationCriteria;
  private performanceThresholds: Record<string, PerformanceThreshold>;

  constructor(
    evaluationCriteria: AssessmentEvaluationCriteria,
    logger: CAOLogger
  ) {
    this.logger = logger;
    this.evaluationCriteria = evaluationCriteria;
    this.assessments = new Map();
    this.assessmentResults = new Map();
    this.competencyMappings = new Map();
    this.performanceThresholds = evaluationCriteria.performance_thresholds;
    
    this.initializeAssessmentAnalyzer();
    this.logger.info('🎯 Assessment Analyzer initialized successfully');
  }

  /**
   * Initialize assessment analyzer with default assessments and competency frameworks
   */
  private initializeAssessmentAnalyzer(): void {
    this.createFoundationalAssessments();
    this.initializeCompetencyFrameworks();
    this.logger.info('📋 Assessment analyzer initialized with foundational assessments');
  }

  /**
   * Evaluate agent competencies through comprehensive assessment
   */
  public async evaluateAgentCompetencies(
    agentId: string,
    assessmentId: string,
    responses: AssessmentResponse[]
  ): Promise<CAOOperationResult> {
    const startTime = Date.now();

    try {
      this.logger.info(`🔍 Evaluating competencies for agent: ${agentId}, assessment: ${assessmentId}`);

      // Validate assessment exists
      const assessment = this.assessments.get(assessmentId);
      if (!assessment) {
        throw new Error(`Assessment not found: ${assessmentId}`);
      }

      // Validate responses
      this.validateAssessmentResponses(assessment, responses);

      // Calculate assessment scores
      const scoringResults = this.calculateAssessmentScores(assessment, responses);

      // Analyze competency breakdown
      const competencyBreakdown = this.analyzeCompetencyBreakdown(
        assessment,
        responses,
        scoringResults
      );

      // Determine competency levels
      const competencyLevels = this.determineCompetencyLevels(competencyBreakdown);

      // Generate performance feedback
      const feedback = this.generatePerformanceFeedback(
        assessment,
        scoringResults,
        competencyBreakdown
      );

      // Create assessment result
      const assessmentResult: AssessmentResult = {
        resultId: `result_${agentId}_${assessmentId}_${Date.now()}`,
        assessmentId,
        agentId,
        startTime: new Date(Date.now() - (responses.reduce((sum, r) => sum + r.timeSpent, 0))),
        endTime: new Date(),
        score: scoringResults.totalScore,
        maxScore: scoringResults.maxPossibleScore,
        percentage: (scoringResults.totalScore / scoringResults.maxPossibleScore) * 100,
        passed: scoringResults.totalScore >= assessment.passingScore,
        responses,
        competencyBreakdown,
        feedback,
        recommendedActions: this.generateRecommendedActions(competencyLevels, scoringResults)
      };

      // Store assessment result
      this.storeAssessmentResult(agentId, assessmentResult);

      // Update competency mappings
      await this.updateCompetencyMappings(agentId, competencyLevels);

      const processingTime = Date.now() - startTime;

      this.logger.info(`✅ Competency evaluation completed for ${agentId} in ${processingTime}ms`);

      return {
        success: true,
        operationType: 'evaluate_competencies',
        operationId: `eval_${agentId}_${Date.now()}`,
        timestamp: new Date(),
        processingTime,
        result: {
          assessmentResultId: assessmentResult.resultId,
          score: assessmentResult.score,
          percentage: assessmentResult.percentage,
          passed: assessmentResult.passed,
          competencyLevels: Object.keys(competencyLevels),
          recommendedActions: assessmentResult.recommendedActions.length
        },
        metadata: {
          agentVersion: '1.0.0',
          requestSource: 'assessment_analyzer',
          resourcesUsed: ['assessment_library', 'competency_frameworks']
        }
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      this.logger.error(`❌ Competency evaluation failed for ${agentId}:`, error);

      return {
        success: false,
        operationType: 'evaluate_competencies',
        operationId: `eval_${agentId}_${Date.now()}`,
        timestamp: new Date(),
        processingTime,
        error: {
          code: 'COMPETENCY_EVALUATION_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
          details: error,
          severity: 'medium',
          category: 'processing',
          recoverable: true,
          suggestedActions: [
            'Verify assessment ID is valid',
            'Check response format and completeness',
            'Review competency mapping configuration'
          ]
        },
        metadata: {
          agentVersion: '1.0.0',
          requestSource: 'assessment_analyzer',
          resourcesUsed: []
        }
      };
    }
  }

  /**
   * Track learning progress over time through periodic assessments
   */
  public async trackLearningProgress(
    agentId: string,
    timeframe: { startDate: Date; endDate: Date }
  ): Promise<{
    progressMetrics: Record<string, number>;
    competencyTrends: Record<string, { direction: 'improving' | 'declining' | 'stable'; rate: number }>;
    recommendedInterventions: string[];
  }> {
    try {
      this.logger.info(`📈 Tracking learning progress for agent: ${agentId}`);

      // Get assessment results within timeframe
      const results = this.getAssessmentResultsInTimeframe(agentId, timeframe);

      if (results.length === 0) {
        this.logger.warn(`No assessment results found for ${agentId} in specified timeframe`);
        return {
          progressMetrics: {},
          competencyTrends: {},
          recommendedInterventions: ['Schedule initial assessment']
        };
      }

      // Calculate progress metrics
      const progressMetrics = this.calculateProgressMetrics(results);

      // Analyze competency trends
      const competencyTrends = this.analyzeCompetencyTrends(results);

      // Generate intervention recommendations
      const recommendedInterventions = this.generateInterventionRecommendations(
        progressMetrics,
        competencyTrends
      );

      this.logger.info(`✅ Learning progress tracking completed for ${agentId}`);

      return {
        progressMetrics,
        competencyTrends,
        recommendedInterventions
      };

    } catch (error) {
      this.logger.error(`❌ Learning progress tracking failed for ${agentId}:`, error);
      throw error;
    }
  }

  /**
   * Analyze performance gaps and suggest targeted improvements
   */
  public async analyzePerformanceGaps(
    agentId: string,
    targetCompetencyLevels: Record<string, CompetencyLevel>
  ): Promise<{
    gaps: Record<string, { current: CompetencyLevel; target: CompetencyLevel; severity: 'low' | 'medium' | 'high' }>;
    prioritizedImprovementAreas: string[];
    estimatedImprovementTime: Record<string, string>;
  }> {
    try {
      this.logger.info(`🔍 Analyzing performance gaps for agent: ${agentId}`);

      // Get current competency levels
      const currentCompetencies = this.competencyMappings.get(agentId) || {};

      // Identify gaps
      const gaps: Record<string, any> = {};
      const prioritizedAreas: string[] = [];

      for (const [competencyArea, targetLevel] of Object.entries(targetCompetencyLevels)) {
        const currentRating = currentCompetencies[competencyArea];
        const currentLevel = currentRating?.currentLevel || 'novice';

        if (this.getCompetencyLevelOrder(currentLevel) < this.getCompetencyLevelOrder(targetLevel)) {
          const severity = this.calculateGapSeverity(currentLevel, targetLevel);
          gaps[competencyArea] = {
            current: currentLevel,
            target: targetLevel,
            severity
          };

          if (severity === 'high') {
            prioritizedAreas.unshift(competencyArea);
          } else {
            prioritizedAreas.push(competencyArea);
          }
        }
      }

      // Estimate improvement time
      const estimatedImprovementTime = this.estimateImprovementTime(gaps);

      this.logger.info(`✅ Performance gap analysis completed for ${agentId}`);

      return {
        gaps,
        prioritizedImprovementAreas: prioritizedAreas,
        estimatedImprovementTime
      };

    } catch (error) {
      this.logger.error(`❌ Performance gap analysis failed for ${agentId}:`, error);
      throw error;
    }
  }

  /**
   * Create custom assessment for specific competency evaluation
   */
  public async createCustomAssessment(
    competencyAreas: string[],
    difficultyLevel: 'easy' | 'medium' | 'hard',
    assessmentType: 'diagnostic' | 'formative' | 'summative' | 'competency'
  ): Promise<Assessment> {
    try {
      this.logger.info(`🎯 Creating custom assessment for competencies: ${competencyAreas.join(', ')}`);

      const assessmentId = `custom_${Date.now()}`;
      const questions = await this.generateQuestions(competencyAreas, difficultyLevel);

      const assessment: Assessment = {
        assessmentId,
        type: assessmentType,
        title: `Custom ${assessmentType} Assessment`,
        description: `Assessment targeting ${competencyAreas.join(', ')} competencies`,
        competencyAreas,
        questions,
        duration: this.calculateAssessmentDuration(questions.length),
        passingScore: this.getPassingScoreForDifficulty(difficultyLevel),
        maxAttempts: 3,
        availableFrom: new Date(),
        availableUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        createdBy: 'CAO_Agent',
        createdAt: new Date()
      };

      this.assessments.set(assessmentId, assessment);

      this.logger.info(`✅ Custom assessment created: ${assessmentId}`);
      return assessment;

    } catch (error) {
      this.logger.error('❌ Custom assessment creation failed:', error);
      throw error;
    }
  }

  /**
   * Get assessment results for specific agent
   */
  public getAssessmentResults(agentId: string): AssessmentResult[] {
    return this.assessmentResults.get(agentId) || [];
  }

  /**
   * Get competency ratings for specific agent
   */
  public getCompetencyRatings(agentId: string): Record<string, CompetencyRating> {
    return this.competencyMappings.get(agentId) || {};
  }

  /**
   * Get available assessments
   */
  public getAvailableAssessments(): Assessment[] {
    return Array.from(this.assessments.values());
  }

  /**
   * Private helper methods
   */

  private createFoundationalAssessments(): void {
    // Technical Skills Assessment
    const technicalAssessment: Assessment = {
      assessmentId: 'tech_skills_foundation',
      type: 'competency',
      title: 'Technical Skills Foundation',
      description: 'Assessment of core technical competencies',
      competencyAreas: ['technical', 'problem_solving', 'system_design'],
      questions: [
        {
          questionId: 'tech_q1',
          type: 'multiple_choice',
          question: 'What is the most effective way to optimize response time?',
          options: [
            'Increase server resources',
            'Implement caching strategies',
            'Reduce functionality',
            'Add more servers'
          ],
          correctAnswer: 'Implement caching strategies',
          points: 10,
          competencyArea: 'technical',
          difficultyLevel: 'medium',
          explanation: 'Caching strategies provide the most cost-effective performance improvement'
        }
      ],
      duration: 'PT45M',
      passingScore: 70,
      maxAttempts: 3,
      availableFrom: new Date(),
      availableUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      createdBy: 'CAO_Agent',
      createdAt: new Date()
    };

    this.assessments.set(technicalAssessment.assessmentId, technicalAssessment);
  }

  private initializeCompetencyFrameworks(): void {
    // Initialize with basic competency mappings
    const sampleCompetencyMapping: Record<string, CompetencyRating> = {
      'technical': {
        currentLevel: 'developing',
        targetLevel: 'proficient',
        progressPercentage: 60,
        lastAssessmentDate: new Date(),
        nextAssessmentDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    };

    // This would be populated as agents are assessed
  }

  private validateAssessmentResponses(assessment: Assessment, responses: AssessmentResponse[]): void {
    if (responses.length !== assessment.questions.length) {
      throw new Error(`Expected ${assessment.questions.length} responses, got ${responses.length}`);
    }

    const questionIds = new Set(assessment.questions.map(q => q.questionId));
    for (const response of responses) {
      if (!questionIds.has(response.questionId)) {
        throw new Error(`Invalid question ID in response: ${response.questionId}`);
      }
    }
  }

  private calculateAssessmentScores(
    assessment: Assessment,
    responses: AssessmentResponse[]
  ): { totalScore: number; maxPossibleScore: number; questionScores: Record<string, number> } {
    let totalScore = 0;
    let maxPossibleScore = 0;
    const questionScores: Record<string, number> = {};

    for (const question of assessment.questions) {
      const response = responses.find(r => r.questionId === question.questionId);
      maxPossibleScore += question.points;

      if (response) {
        const score = response.isCorrect ? question.points : 0;
        totalScore += score;
        questionScores[question.questionId] = score;
      }
    }

    return { totalScore, maxPossibleScore, questionScores };
  }

  private analyzeCompetencyBreakdown(
    assessment: Assessment,
    responses: AssessmentResponse[],
    scoringResults: { questionScores: Record<string, number> }
  ): Record<string, number> {
    const competencyBreakdown: Record<string, number> = {};

    // Initialize competency areas
    for (const area of assessment.competencyAreas) {
      competencyBreakdown[area] = 0;
    }

    // Calculate scores by competency area
    for (const question of assessment.questions) {
      const score = scoringResults.questionScores[question.questionId] || 0;
      const maxScore = question.points;
      const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
      
      competencyBreakdown[question.competencyArea] = 
        (competencyBreakdown[question.competencyArea] || 0) + percentage;
    }

    // Average scores for each competency area
    const questionsPerArea: Record<string, number> = {};
    for (const question of assessment.questions) {
      questionsPerArea[question.competencyArea] = 
        (questionsPerArea[question.competencyArea] || 0) + 1;
    }

    for (const area in competencyBreakdown) {
      if (questionsPerArea[area] > 0) {
        competencyBreakdown[area] /= questionsPerArea[area];
      }
    }

    return competencyBreakdown;
  }

  private determineCompetencyLevels(competencyBreakdown: Record<string, number>): Record<string, CompetencyLevel> {
    const levels: Record<string, CompetencyLevel> = {};

    for (const [area, score] of Object.entries(competencyBreakdown)) {
      if (score >= 85) {
        levels[area] = 'expert';
      } else if (score >= 70) {
        levels[area] = 'proficient';
      } else if (score >= 50) {
        levels[area] = 'developing';
      } else {
        levels[area] = 'novice';
      }
    }

    return levels;
  }

  private generatePerformanceFeedback(
    assessment: Assessment,
    scoringResults: any,
    competencyBreakdown: Record<string, number>
  ): string {
    const percentage = (scoringResults.totalScore / scoringResults.maxPossibleScore) * 100;
    
    let feedback = `Assessment completed with a score of ${percentage.toFixed(1)}%. `;
    
    if (percentage >= 85) {
      feedback += 'Excellent performance across all areas. ';
    } else if (percentage >= 70) {
      feedback += 'Good performance with room for improvement in some areas. ';
    } else {
      feedback += 'Performance indicates need for focused learning interventions. ';
    }

    // Add competency-specific feedback
    const weakAreas = Object.entries(competencyBreakdown)
      .filter(([, score]) => score < 70)
      .map(([area]) => area);

    if (weakAreas.length > 0) {
      feedback += `Focus areas for improvement: ${weakAreas.join(', ')}.`;
    }

    return feedback;
  }

  private generateRecommendedActions(
    competencyLevels: Record<string, CompetencyLevel>,
    scoringResults: any
  ): string[] {
    const actions: string[] = [];

    for (const [area, level] of Object.entries(competencyLevels)) {
      if (level === 'novice') {
        actions.push(`Complete foundational training in ${area}`);
      } else if (level === 'developing') {
        actions.push(`Practice exercises and case studies in ${area}`);
      } else if (level === 'proficient') {
        actions.push(`Explore advanced topics in ${area}`);
      }
    }

    if (actions.length === 0) {
      actions.push('Continue maintaining current performance level');
    }

    return actions;
  }

  private storeAssessmentResult(agentId: string, result: AssessmentResult): void {
    if (!this.assessmentResults.has(agentId)) {
      this.assessmentResults.set(agentId, []);
    }

    const results = this.assessmentResults.get(agentId)!;
    results.push(result);

    // Keep only last 50 results per agent
    if (results.length > 50) {
      results.splice(0, results.length - 50);
    }
  }

  private async updateCompetencyMappings(
    agentId: string,
    competencyLevels: Record<string, CompetencyLevel>
  ): Promise<void> {
    if (!this.competencyMappings.has(agentId)) {
      this.competencyMappings.set(agentId, {});
    }

    const mappings = this.competencyMappings.get(agentId)!;

    for (const [area, level] of Object.entries(competencyLevels)) {
      mappings[area] = {
        currentLevel: level,
        targetLevel: this.getNextTargetLevel(level),
        progressPercentage: this.levelToPercentage(level),
        lastAssessmentDate: new Date(),
        nextAssessmentDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      };
    }
  }

  private getAssessmentResultsInTimeframe(
    agentId: string,
    timeframe: { startDate: Date; endDate: Date }
  ): AssessmentResult[] {
    const results = this.assessmentResults.get(agentId) || [];
    return results.filter(r => 
      r.endTime >= timeframe.startDate && r.endTime <= timeframe.endDate
    );
  }

  private calculateProgressMetrics(results: AssessmentResult[]): Record<string, number> {
    if (results.length === 0) return {};

    const sortedResults = results.sort((a, b) => a.endTime.getTime() - b.endTime.getTime());
    
    return {
      averageScore: sortedResults.reduce((sum, r) => sum + r.percentage, 0) / sortedResults.length,
      improvementRate: this.calculateImprovementRate(sortedResults),
      consistencyScore: this.calculateConsistencyScore(sortedResults),
      completionRate: sortedResults.filter(r => r.passed).length / sortedResults.length
    };
  }

  private analyzeCompetencyTrends(results: AssessmentResult[]): Record<string, any> {
    const trends: Record<string, any> = {};
    
    if (results.length < 2) return trends;

    // Group by competency area
    const competencyData: Record<string, number[]> = {};
    
    for (const result of results) {
      for (const [area, score] of Object.entries(result.competencyBreakdown)) {
        if (!competencyData[area]) competencyData[area] = [];
        competencyData[area].push(score);
      }
    }

    // Calculate trends
    for (const [area, scores] of Object.entries(competencyData)) {
      const trend = this.calculateTrend(scores);
      trends[area] = trend;
    }

    return trends;
  }

  private calculateTrend(scores: number[]): { direction: 'improving' | 'declining' | 'stable'; rate: number } {
    if (scores.length < 2) return { direction: 'stable', rate: 0 };

    const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
    const secondHalf = scores.slice(Math.floor(scores.length / 2));

    const firstAvg = firstHalf.reduce((sum, s) => sum + s, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, s) => sum + s, 0) / secondHalf.length;

    const rate = secondAvg - firstAvg;

    let direction: 'improving' | 'declining' | 'stable';
    if (Math.abs(rate) < 5) {
      direction = 'stable';
    } else if (rate > 0) {
      direction = 'improving';
    } else {
      direction = 'declining';
    }

    return { direction, rate: Math.abs(rate) };
  }

  private generateInterventionRecommendations(
    progressMetrics: Record<string, number>,
    competencyTrends: Record<string, any>
  ): string[] {
    const recommendations: string[] = [];

    if (progressMetrics.averageScore < 70) {
      recommendations.push('Schedule intensive training session');
    }

    if (progressMetrics.improvementRate < 0) {
      recommendations.push('Review learning approach and materials');
    }

    const decliningAreas = Object.entries(competencyTrends)
      .filter(([, trend]) => trend.direction === 'declining')
      .map(([area]) => area);

    if (decliningAreas.length > 0) {
      recommendations.push(`Focus on declining areas: ${decliningAreas.join(', ')}`);
    }

    return recommendations;
  }

  private getCompetencyLevelOrder(level: CompetencyLevel): number {
    const order = { 'novice': 1, 'developing': 2, 'proficient': 3, 'expert': 4 };
    return order[level] || 0;
  }

  private calculateGapSeverity(
    current: CompetencyLevel,
    target: CompetencyLevel
  ): 'low' | 'medium' | 'high' {
    const gap = this.getCompetencyLevelOrder(target) - this.getCompetencyLevelOrder(current);
    
    if (gap === 1) return 'low';
    if (gap === 2) return 'medium';
    return 'high';
  }

  private estimateImprovementTime(gaps: Record<string, any>): Record<string, string> {
    const estimates: Record<string, string> = {};

    for (const [area, gap] of Object.entries(gaps)) {
      switch (gap.severity) {
        case 'low':
          estimates[area] = '2-4 weeks';
          break;
        case 'medium':
          estimates[area] = '1-2 months';
          break;
        case 'high':
          estimates[area] = '2-4 months';
          break;
      }
    }

    return estimates;
  }

  private async generateQuestions(
    competencyAreas: string[],
    difficulty: 'easy' | 'medium' | 'hard'
  ): Promise<AssessmentQuestion[]> {
    // In a real implementation, this would generate questions based on competency areas and difficulty
    return [
      {
        questionId: `q_${Date.now()}`,
        type: 'multiple_choice',
        question: `Sample ${difficulty} question for ${competencyAreas[0]}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        points: 10,
        competencyArea: competencyAreas[0],
        difficultyLevel: difficulty,
        explanation: 'Sample explanation'
      }
    ];
  }

  private calculateAssessmentDuration(questionCount: number): string {
    // Estimate 2 minutes per question
    const minutes = questionCount * 2;
    return `PT${minutes}M`;
  }

  private getPassingScoreForDifficulty(difficulty: 'easy' | 'medium' | 'hard'): number {
    const scores = { 'easy': 60, 'medium': 70, 'hard': 80 };
    return scores[difficulty];
  }

  private getNextTargetLevel(currentLevel: CompetencyLevel): CompetencyLevel {
    const progression: Record<CompetencyLevel, CompetencyLevel> = {
      'novice': 'developing',
      'developing': 'proficient',
      'proficient': 'expert',
      'expert': 'expert'
    };
    return progression[currentLevel];
  }

  private levelToPercentage(level: CompetencyLevel): number {
    const percentages = { 'novice': 25, 'developing': 50, 'proficient': 75, 'expert': 100 };
    return percentages[level];
  }

  private calculateImprovementRate(results: AssessmentResult[]): number {
    if (results.length < 2) return 0;
    
    const first = results[0].percentage;
    const last = results[results.length - 1].percentage;
    return last - first;
  }

  private calculateConsistencyScore(results: AssessmentResult[]): number {
    if (results.length < 2) return 100;
    
    const scores = results.map(r => r.percentage);
    const mean = scores.reduce((sum, s) => sum + s, 0) / scores.length;
    const variance = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Convert to consistency score (lower deviation = higher consistency)
    return Math.max(0, 100 - standardDeviation);
  }
}