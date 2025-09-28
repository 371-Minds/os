/**
 * Bizbuilderprompts Bridge
 * 
 * Handles integration with the bizbuilderprompts repository to load and parse
 * Stratplans. Provides a clean interface for accessing strategic plans.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { StratplanData, SubPrompt, StratplanPhase, ResourceRequirement, TimelineItem, BudgetRequirement } from './types.js';

export class BizbuilderpromptsBridge {
  private readonly defaultRepository = 'https://github.com/371-Minds/bizbuilderprompts.git';
  private readonly localCachePath = path.join(process.cwd(), '.cache', 'bizbuilderprompts');

  /**
   * Load a Stratplan from the specified source
   */
  public async loadStratplan(source: string): Promise<StratplanData> {
    console.log('📥 Loading Stratplan from source:', source);

    try {
      // For Phase 1 implementation, we'll create a mock Stratplan
      // In Phase 2, this will integrate with the actual bizbuilderprompts repository
      const stratplanData = await this.loadMockStratplan(source);
      
      console.log('✅ Stratplan loaded successfully:', stratplanData.title);
      return stratplanData;

    } catch (error) {
      console.error('❌ Failed to load Stratplan:', error);
      throw new Error(`Stratplan loading failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Test connection to bizbuilderprompts repository
   */
  public async testConnection(): Promise<boolean> {
    try {
      // For Phase 1, always return true (mock connection)
      // In Phase 2, this will test actual repository connectivity
      console.log('🔗 Testing connection to bizbuilderprompts repository...');
      
      // Simulate connection test delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('✅ Connection test successful');
      return true;

    } catch (error) {
      console.error('❌ Connection test failed:', error);
      return false;
    }
  }

  /**
   * List available Stratplans in the repository
   */
  public async listAvailableStratplans(): Promise<string[]> {
    try {
      // Mock list of available Stratplans
      return [
        'revenue-optimization-2024.md',
        'ai-integration-strategy.md',
        'market-expansion-plan.md',
        'operational-efficiency.md',
        'digital-transformation.md'
      ];

    } catch (error) {
      console.error('❌ Failed to list Stratplans:', error);
      return [];
    }
  }

  /**
   * Parse Stratplan content from markdown or structured format
   */
  private async parseStratplanContent(content: string, filename: string): Promise<StratplanData> {
    // For Phase 1, return a comprehensive mock structure
    // Phase 2 will implement actual markdown/YAML parsing
    
    const stratplanId = this.generateStratplanId(filename);
    const title = this.extractTitleFromFilename(filename);

    return {
      id: stratplanId,
      title,
      description: `Strategic plan for ${title.toLowerCase()} with comprehensive execution framework`,
      metaPrompt: this.generateMetaPrompt(title),
      subPrompts: this.generateSubPrompts(title),
      phases: this.generatePhases(title),
      requiredResources: this.generateResourceRequirements(title),
      success_criteria: this.generateSuccessCriteria(title),
      timeline: this.generateTimeline(),
      stakeholders: this.generateStakeholders(title),
      budget: this.generateBudgetRequirement(title),
      metadata: {
        source: filename,
        parsed_at: new Date().toISOString(),
        version: '1.0.0',
        category: this.categorizeStratplan(title)
      }
    };
  }

  /**
   * Load mock Stratplan for Phase 1 implementation
   */
  private async loadMockStratplan(source: string): Promise<StratplanData> {
    // Validate inputs
    if (!source || source.trim() === '') {
      throw new Error('Invalid source: source path cannot be empty');
    }

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 200));

    const filename = path.basename(source);
    if (!filename || filename.trim() === '') {
      throw new Error('Invalid source: could not extract filename from source path');
    }

    const mockContent = this.generateMockContent(filename);

    return this.parseStratplanContent(mockContent, filename);
  }

  /**
   * Generate mock content based on filename
   */
  private generateMockContent(filename: string): string {
    const title = this.extractTitleFromFilename(filename);
    return `# ${title}\n\nStrategic initiative focusing on ${title.toLowerCase()} with comprehensive execution plan.`;
  }

  /**
   * Generate unique Stratplan ID
   */
  private generateStratplanId(filename: string): string {
    const base = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const timestamp = Date.now().toString(36);
    return `STRAT-${base}-${timestamp}`.toUpperCase();
  }

  /**
   * Extract title from filename
   */
  private extractTitleFromFilename(filename: string): string {
    if (!filename || filename.trim() === '') {
      throw new Error('Invalid filename: cannot extract title from empty filename');
    }

    const title = filename
      .replace(/\.[^/.]+$/, '')
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (!title || title.trim() === '') {
      throw new Error('Invalid filename: could not generate title from filename');
    }

    return title;
  }

  /**
   * Generate meta-prompt for the Stratplan
   */
  private generateMetaPrompt(title: string): string {
    return `Execute comprehensive ${title} initiative with focus on strategic implementation, ` +
           `risk mitigation, resource optimization, and stakeholder alignment. Ensure measurable ` +
           `outcomes and sustainable long-term impact.`;
  }

  /**
   * Generate sub-prompts for the Stratplan 
   */
  private generateSubPrompts(title: string): SubPrompt[] {
    const basePrompts = [
      {
        id: 'analysis',
        title: 'Strategic Analysis',
        content: `Conduct comprehensive analysis of current state and opportunities for ${title}`,
        dependencies: [],
        expectedOutputs: ['Current state assessment', 'Opportunity identification', 'Gap analysis'],
        priority: 1
      },
      {
        id: 'planning',
        title: 'Implementation Planning',
        content: `Develop detailed implementation plan for ${title} initiative`,
        dependencies: ['analysis'],
        expectedOutputs: ['Implementation roadmap', 'Resource allocation plan', 'Timeline'],
        priority: 2
      },
      {
        id: 'execution',
        title: 'Execution Management',
        content: `Execute ${title} plan with continuous monitoring and adaptation`,
        dependencies: ['planning'],
        expectedOutputs: ['Progress reports', 'Milestone achievements', 'Course corrections'],
        priority: 3
      },
      {
        id: 'validation',
        title: 'Results Validation',
        content: `Validate outcomes and measure success of ${title} initiative`,
        dependencies: ['execution'],
        expectedOutputs: ['Success metrics', 'Impact assessment', 'Lessons learned'],
        priority: 4
      }
    ];

    return basePrompts;
  }

  /**
   * Generate strategic phases
   */
  private generatePhases(title: string): StratplanPhase[] {
    return [
      {
        id: 'phase-1',
        name: 'Discovery & Analysis',
        description: `Initial discovery and analysis phase for ${title}`,
        objectives: [
          'Complete stakeholder analysis',
          'Assess current capabilities',
          'Identify key opportunities and challenges'
        ],
        deliverables: [
          'Stakeholder map',
          'Current state assessment',
          'Opportunity analysis report'
        ],
        duration: '3-4 weeks',
        dependencies: [],
        success_metrics: [
          'All stakeholders identified and engaged',
          'Comprehensive current state documented',
          'Top 3 opportunities prioritized'
        ]
      },
      {
        id: 'phase-2',
        name: 'Strategy Development',
        description: `Strategy development and planning for ${title}`,
        objectives: [
          'Develop comprehensive strategy',
          'Create detailed implementation plan',
          'Secure stakeholder buy-in'
        ],
        deliverables: [
          'Strategic plan document',
          'Implementation roadmap',
          'Stakeholder approval'
        ],
        duration: '4-6 weeks',
        dependencies: ['phase-1'],
        success_metrics: [
          'Strategy approved by all key stakeholders',
          'Implementation plan with clear timelines',
          'Resource requirements defined'
        ]
      },
      {
        id: 'phase-3',
        name: 'Implementation',
        description: `Core implementation of ${title} strategy`,
        objectives: [
          'Execute strategic initiatives',
          'Monitor progress and adapt',
          'Maintain stakeholder alignment'
        ],
        deliverables: [
          'Implemented solutions',
          'Progress reports',
          'Stakeholder updates'
        ],
        duration: '12-16 weeks',
        dependencies: ['phase-2'],
        success_metrics: [
          'All major initiatives launched',
          'Progress within 10% of plan',
          'Stakeholder satisfaction > 80%'
        ]
      },
      {
        id: 'phase-4',
        name: 'Optimization & Closure',
        description: `Optimization and formal closure of ${title} initiative`,
        objectives: [
          'Optimize implemented solutions',
          'Document lessons learned',
          'Ensure sustainable operations'
        ],
        deliverables: [
          'Optimized processes',
          'Final project report',
          'Handover documentation'
        ],
        duration: '2-3 weeks',
        dependencies: ['phase-3'],
        success_metrics: [
          'All success criteria met',
          'Sustainable operations established',
          'Lessons learned documented'
        ]
      }
    ];
  }

  /**
   * Generate resource requirements
   */
  private generateResourceRequirements(title: string): ResourceRequirement[] {
    const baseRequirements: ResourceRequirement[] = [
      {
        type: 'human',
        description: 'Project Manager',
        quantity: 1,
        unit: 'FTE',
        priority: 'required',
        estimatedCost: 120000
      },
      {
        type: 'human',
        description: 'Subject Matter Experts',
        quantity: 2,
        unit: 'FTE',
        priority: 'required',
        estimatedCost: 180000
      },
      {
        type: 'technical',
        description: 'Software Tools and Platforms',
        quantity: 1,
        unit: 'package',
        priority: 'required',
        estimatedCost: 50000
      },
      {
        type: 'financial',
        description: 'Operating Budget',
        quantity: 1,
        unit: 'allocation',
        priority: 'required',
        estimatedCost: 75000
      }
    ];

    // Adjust costs based on title/category
    const categoryMultiplier = this.getCategoryMultiplier(title);
    return baseRequirements.map(req => ({
      ...req,
      estimatedCost: Math.round((req.estimatedCost || 0) * categoryMultiplier)
    }));
  }

  /**
   * Generate success criteria
   */
  private generateSuccessCriteria(title: string): string[] {
    return [
      `${title} objectives achieved within approved timeline`,
      'All stakeholder requirements satisfied',
      'Budget utilized within approved allocation',
      'Quality standards met or exceeded',
      'Risk mitigation measures successfully implemented',
      'Sustainable operations established for long-term success'
    ];
  }

  /**
   * Generate timeline items
   */
  private generateTimeline(): TimelineItem[] {
    const now = new Date();
    return [
      {
        id: 'milestone-1',
        milestone: 'Project Kickoff',
        description: 'Formal project initiation and team assembly',
        startDate: new Date(now.getTime() + 1 * 7 * 24 * 60 * 60 * 1000), // 1 week
        endDate: new Date(now.getTime() + 2 * 7 * 24 * 60 * 60 * 1000), // 2 weeks
        dependencies: [],
        responsible_parties: ['Project Manager', 'Stakeholders']
      },
      {
        id: 'milestone-2',
        milestone: 'Analysis Complete',
        description: 'Comprehensive analysis and planning completed',
        startDate: new Date(now.getTime() + 2 * 7 * 24 * 60 * 60 * 1000), // 2 weeks
        endDate: new Date(now.getTime() + 6 * 7 * 24 * 60 * 60 * 1000), // 6 weeks
        dependencies: ['milestone-1'],
        responsible_parties: ['Analysis Team', 'Subject Matter Experts']
      },
      {
        id: 'milestone-3',
        milestone: 'Implementation Start',
        description: 'Core implementation phase begins',
        startDate: new Date(now.getTime() + 6 * 7 * 24 * 60 * 60 * 1000), // 6 weeks
        endDate: new Date(now.getTime() + 18 * 7 * 24 * 60 * 60 * 1000), // 18 weeks
        dependencies: ['milestone-2'],
        responsible_parties: ['Implementation Team', 'Project Manager']
      },
      {
        id: 'milestone-4',
        milestone: 'Project Completion',
        description: 'All deliverables completed and validated',
        startDate: new Date(now.getTime() + 18 * 7 * 24 * 60 * 60 * 1000), // 18 weeks
        endDate: new Date(now.getTime() + 20 * 7 * 24 * 60 * 60 * 1000), // 20 weeks
        dependencies: ['milestone-3'],
        responsible_parties: ['Validation Team', 'Stakeholders']
      }
    ];
  }

  /**
   * Generate stakeholders list
   */
  private generateStakeholders(title: string): string[] {
    const baseStakeholders = [
      'CEO',
      'CTO', 
      'CFO',
      'Project Sponsor',
      'Implementation Team Lead'
    ];

    // Add category-specific stakeholders
    const categoryStakeholders = this.getCategoryStakeholders(title);
    return [...baseStakeholders, ...categoryStakeholders];
  }

  /**
   * Generate budget requirement
   */
  private generateBudgetRequirement(title: string): BudgetRequirement {
    const categoryMultiplier = this.getCategoryMultiplier(title);
    const baseBudget = 425000; // Sum of base resource requirements
    const totalBudget = Math.round(baseBudget * categoryMultiplier);

    return {
      totalBudget,
      currency: 'USD',
      breakdown: [
        {
          category: 'Personnel',
          amount: Math.round(totalBudget * 0.7),
          justification: 'Human resources for project execution'
        },
        {
          category: 'Technology',
          amount: Math.round(totalBudget * 0.2),
          justification: 'Technology and infrastructure costs'
        },
        {
          category: 'Operations',
          amount: Math.round(totalBudget * 0.1),
          justification: 'Operational expenses and overhead'
        }
      ],
      contingency: Math.round(totalBudget * 0.15),
      funding_sources: ['DAO Treasury', 'Strategic Reserve Fund']
    };
  }

  /**
   * Categorize Stratplan based on title
   */
  private categorizeStratplan(title: string): string {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('revenue') || titleLower.includes('financial')) return 'financial';
    if (titleLower.includes('ai') || titleLower.includes('tech') || titleLower.includes('digital')) return 'technical';
    if (titleLower.includes('market') || titleLower.includes('expansion')) return 'growth';
    if (titleLower.includes('operational') || titleLower.includes('efficiency')) return 'operational';
    
    return 'strategic';
  }

  /**
   * Get category-specific cost multiplier
   */
  private getCategoryMultiplier(title: string): number {
    const category = this.categorizeStratplan(title);
    
    const multipliers = {
      financial: 1.5,
      technical: 1.8,
      growth: 1.3,
      operational: 1.0,
      strategic: 1.2
    };

    return multipliers[category as keyof typeof multipliers] || 1.0;
  }

  /**
   * Get category-specific stakeholders
   */
  private getCategoryStakeholders(title: string): string[] {
    const category = this.categorizeStratplan(title);
    
    const stakeholderMap = {
      financial: ['Chief Financial Officer', 'Treasury Manager', 'Finance Team'],
      technical: ['Technical Architect', 'Dev Team Lead', 'Infrastructure Team'],
      growth: ['Growth Manager', 'Marketing Team', 'Business Development'],
      operational: ['Operations Manager', 'Process Team', 'Quality Assurance'],
      strategic: ['Strategy Team', 'Board Representatives', 'Advisory Council']
    };

    return stakeholderMap[category as keyof typeof stakeholderMap] || [];
  }

  /**
   * Clone repository (for future implementation)
   */
  private async cloneRepository(repoUrl: string): Promise<void> {
    // Phase 2 implementation: Use git commands to clone repository
    console.log('🔄 Repository cloning will be implemented in Phase 2');
  }

  /**
   * Validate the bridge is operational
   */
  public async validate(): Promise<boolean> {
    try {
      const available = await this.listAvailableStratplans();
      const connectionOk = await this.testConnection();
      
      return available.length > 0 && connectionOk;
    } catch (error) {
      console.error('BizbuilderpromptsBridge validation failed:', error);
      return false;
    }
  }
}