graph TD
    subgraph "CGO Agent: Autonomous Community Growth Workflow"
        Start((Receive Growth Task)) --> AnalyzeTask{Analyze Request Type};

        AnalyzeTask -- "Analyze Growth" --> GetMetrics[Get Engagement & Referral Metrics];
        GetMetrics --> AIInsights[Use Koog AI to Identify Scaling Opportunities];
        AIInsights --> End((Task Cycle Complete));

        AnalyzeTask -- "Trigger Scaling" --> Decision{Action is 'Spawn Subcommunity'?};
        Decision -- "Yes" --> TriggerSpace[Trigger JetBrains Space Workflow];
        TriggerSpace --> CreateAnyChat[Create AnyChat Space for New Community];
        CreateAnyChat --> End;
        Decision -- "No" --> End;
    end

    subgraph "Inherited Capabilities (from improved-base-agent.md)"
        style Inherited fill:#f0f0f0,stroke:#ccc
        C1[Concurrent Task Processing]
        C2[Caching System]
        C3[Circuit Breaker Pattern]
        C4[Real-time Monitoring & Metrics]
    end
