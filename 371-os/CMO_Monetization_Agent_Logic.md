graph TD
    subgraph "CMO (Monetization) Agent: Revenue Optimization Workflow"
        Start((Receive Monetization Task)) --> AnalyzeTask{Analyze Request Type};

        AnalyzeTask -- "PWYC Pricing Optimization" --> QueryDataGrip[Query Community Contribution Data];
        QueryDataGrip --> AnalyzeData[Analyze Contribution Analytics];
        AnalyzeData --> PriceDecision{Median > 1.15x Suggestion?};
        PriceDecision -- "Yes" --> UpdatePrice[Update Community Pricing Suggestion];
        UpdatePrice --> End((Task Cycle Complete));
        PriceDecision -- "No" --> End;

        AnalyzeTask -- "Ad Campaign Management" --> AnalyzePlatforms[Analyze All Ad Platform Performance];
        AnalyzePlatforms --> ROIDecision{Any Platform ROI < 1.2?};
        ROIDecision -- "Yes" --> OptimizeCampaigns[Trigger Campaign Optimization];
        OptimizeCampaigns --> End;
        ROIDecision -- "No" --> End;
    end

    subgraph "Inherited Capabilities (from improved-base-agent.md)"
        style Inherited fill:#f0f0f0,stroke:#ccc
        C1[Concurrent Task Processing]
        C2[Caching System]
        C3[Circuit Breaker Pattern]
        C4[Real-time Monitoring & Metrics]
    end
