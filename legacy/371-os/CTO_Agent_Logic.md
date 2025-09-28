graph TD
    subgraph "CTO Alex Agent: Technical Strategy & Oversight"
        Start((Receive Technical Task)) --> AnalyzeTask{Analyze Request Category};
        
        AnalyzeTask -- "Architecture Design" --> DesignArch[Design New Service Architecture];
        DesignArch --> CreateSpec[Create Technical Specification];
        CreateSpec --> End((Task Cycle Complete));

        AnalyzeTask -- "Technology Evaluation" --> EvalTech[Evaluate & Select New Technology];
        EvalTech --> POC[Plan Proof-of-Concept];
        POC --> End;

        AnalyzeTask -- "Security Response" --> MitigateVuln[Oversee Vulnerability Mitigation];
        MitigateVuln --> PostMortem[Conduct Post-Mortem Analysis];
        PostMortem --> End;
        
        AnalyzeTask -- "Infrastructure Planning" --> PlanScaling[Plan Infrastructure Scaling];
        PlanScaling --> End;
    end

    subgraph "Inherited Capabilities (from improved-base-agent.md)"
        style Inherited fill:#f0f0f0,stroke:#ccc
        C1[Concurrent Task Processing]
        C2[Caching System]
        C3[Circuit Breaker Pattern]
        C4[Real-time Monitoring & Metrics]
    end
