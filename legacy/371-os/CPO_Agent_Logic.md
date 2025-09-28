graph TD
    subgraph "CPO Agent: AI-Powered Product Workflow"
        Start((Receive Product Task)) --> AnalyzeTask{Analyze Request Type};

        AnalyzeTask -- "Analyze Feature Requests" --> AIFeatureAnalysis[Use JetBrains AI to Analyze Feedback];
        AIFeatureAnalysis --> GenDevSpecs[Generate Development Specifications];
        GenDevSpecs --> End((Task Cycle Complete));

        AnalyzeTask -- "Manage Mini-App Lifecycle" --> GetAppAnalytics[Get App Analytics from Medusa];
        GetAppAnalytics --> AdoptionDecision{Adoption Rate > 65%?};
        AdoptionDecision -- "Yes" --> Promote[Promote to Blue Ocean App];
        Promote --> End;
        
        AdoptionDecision -- "No" --> UsageDecision{Usage Trend < 10%?};
        UsageDecision -- "Yes" --> Retire[Recommend App Retirement];
        Retire --> End;

        UsageDecision -- "No" --> Optimize[Suggest Optimizations via JetBrains AI];
        Optimize --> End;
    end

    subgraph "Inherited Capabilities (from improved-base-agent.md)"
        style Inherited fill:#f0f0f0,stroke:#ccc
        C1[Concurrent Task Processing]
        C2[Caching System]
        C3[Circuit Breaker Pattern]
        C4[Real-time Monitoring & Metrics]
    end
