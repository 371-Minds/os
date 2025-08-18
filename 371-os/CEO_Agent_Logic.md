graph TD
    subgraph "CEO Mimi Agent: Strategic Delegation Logic"
        Start((Receive High-Level Task)) --> AnalyzeTask{Analyze Task Type};
        
        AnalyzeTask -- "Is it a Technical Task?" --> Delegate_CTO[Delegate to CTO Agent];
        Delegate_CTO --> Monitor_CTO{Monitor for Completion};
        Monitor_CTO --> End((Task Cycle Complete));

        AnalyzeTask -- "Is it a Marketing Task?" --> Delegate_CMO[Delegate to CMO Agent];
        Delegate_CMO --> Monitor_CMO{Monitor for Completion};
        Monitor_CMO --> End;

        AnalyzeTask -- "Is it a Financial Task?" --> Delegate_CFO[Delegate to CFO Agent];
        Delegate_CFO --> Monitor_CFO{Monitor for Completion};
        Monitor_CFO --> End;

        AnalyzeTask -- "Is it a Community Task?" --> Delegate_CCO[Delegate to CCO Agent];
        Delegate_CCO --> Monitor_CCO{Monitor for Completion};
        Monitor_CCO --> End;
    end

    subgraph "Inherited Capabilities (from improved-base-agent.md)"
        style Inherited fill:#f0f0f0,stroke:#ccc
        C1[Concurrent Task Processing]
        C2[Caching System]
        C3[Circuit Breaker Pattern]
        C4[Real-time Monitoring & Metrics]
    end
