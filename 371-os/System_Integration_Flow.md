graph TD
    subgraph "User Interaction Layer"
        User_Input[User Command: e.g., 'Deploy the auth service']
    end

    subgraph "Core System Orchestration"
        A(Intelligent Router Agent)
        B(MindScript Agent)
    end

    subgraph "C-Suite Agents (Strategic Layer)"
        C(CTO Agent)
        D(...)
    end
    
    subgraph "Operational Agents (Execution Layer)"
        E(Deployment Agent)
        F(...)
    end

    User_Input --> A
    A -- "1. Analyze command" --> B
    B -- "2. Return structured JSON" --> A
    A -- "3. Route based on 'category: deployment'" --> C
    C -- "4. Decompose into technical tasks" --> E
    E -- "5. Perform deployment & return result" --> C
    C -- "6. Confirm completion & format result" --> A
    A -- "7. Return final status to user" --> Final_Output((Task Complete))
