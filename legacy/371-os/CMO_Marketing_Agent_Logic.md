graph TD
    subgraph "CMO Anova Agent: Marketing & Growth Workflow"
        Start((Receive Marketing Task)) --> AnalyzeTask{Analyze Request Category};

        AnalyzeTask -- "Strategy & Planning" --> DevStrategy[Develop Market Strategy];
        DevStrategy --> PlanCampaign[Plan Social Media Campaign];
        PlanCampaign --> End((Task Cycle Complete));

        AnalyzeTask -- "Performance Analysis" --> AnalyzeCAC[Analyze Customer Acquisition Cost];
        AnalyzeCAC --> OptimizeRetention[Optimize Retention Programs];
        OptimizeRetention --> End;
        
        AnalyzeTask -- "Competitive Analysis" --> ReviewCompetitors[Review Competitor Marketing];
        ReviewCompetitors --> SuggestCounters[Suggest Counter-Strategies];
        SuggestCounters --> End;
    end

    subgraph "Inherited Capabilities (from improved-base-agent.md)"
        style Inherited fill:#f0f0f0,stroke:#ccc
        C1[Concurrent Task Processing]
        C2[Caching System]
        C3[Circuit Breaker Pattern]
        C4[Real-time Monitoring & Metrics]
    end
