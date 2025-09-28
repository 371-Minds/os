graph TD
    subgraph "CFO Cash Agent: Financial Workflow Logic"
        Start((Receive Financial Task)) --> AnalyzeTask{Analyze Financial Request Type};
        
        AnalyzeTask -- "P&L Analysis" --> Analyze_PL[Process P&L Reports];
        Analyze_PL --> GenerateReport[Generate Analysis Report];
        GenerateReport --> End((Task Cycle Complete));

        AnalyzeTask -- "Revenue Forecast" --> CollectData[Collect Revenue Data];
        CollectData --> RunModel[Run Forecast Model];
        RunModel --> End;

        AnalyzeTask -- "Transaction Processing" --> ProcessEvent[Process Stripe/Banking Events];
        ProcessEvent --> UpdateLedger[Update Financial Ledger];
        UpdateLedger --> End;
    end

    subgraph "Inherited Capabilities (from improved-base-agent.md)"
        style Inherited fill:#f0f0f0,stroke:#ccc
        C1[Concurrent Task Processing]
        C2[Caching System]
        C3[Circuit Breaker Pattern]
        C4[Real-time Monitoring & Metrics]
    end
