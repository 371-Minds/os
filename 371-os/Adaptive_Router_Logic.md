graph TD
    subgraph "Intelligent Router: Core System Workflow"
        Start((User Request Ingested)) --> CheckBudget[Check Budget Guard];
        CheckBudget -- "Budget OK" --> A[Use Adaptive LLM Router to Analyze Request];
        A --> Decompose[Decompose Request into Tasks];
        Decompose --> Classify{Classify Task Category};

        Classify -- "Strategic/Executive" --> RouteCEO[Route to CEO Agent];
        Classify -- "Technical" --> RouteCTO[Route to CTO Agent];
        Classify -- "Marketing" --> RouteCMO[Route to CMO (Marketing) Agent];
        Classify -- "Monetization" --> RouteCMO2[Route to CMO (Monetization) Agent];
        Classify -- "Product" --> RouteCPO[Route to CPO Agent];
        Classify -- "Community" --> RouteCCO[Route to CCO Agent];
        Classify -- "Financial" --> RouteCFO[Route to CFO Agent];
        Classify -- "Learning/Optimization" --> RouteCLO[Route to CLO Agent];

        CheckBudget -- "Budget Exceeded" --> B(Return Budget Exceeded Error);
        B --> End((Request Cycle Complete));

        RouteCEO --> End;
        RouteCTO --> End;
        RouteCMO --> End;
        RouteCMO2 --> End;
        RouteCPO --> End;
        RouteCCO --> End;
        RouteCFO --> End;
        RouteCLO --> End;
    end

    subgraph "Core Components Utilized"
        style Core fill:#e6f3ff,stroke:#0066cc
        Comp1[Adaptive LLM Router]
        Comp2[Budget Manager]
        Comp3[Usage Ledger]
    end
