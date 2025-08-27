Project Plan: Migrating 371 OS Agents to Prompt-Based Configuration

Goal: Transition all 371 OS agents from their current Python implementations (src/minds371/agents/...) to a prompt-based configuration system using YAML files in the prompts/ directory.

Current Status:

Initial prompt-based configurations have been created in prompts/business_agents/ and prompts/technical_agents/.
The document prompts/# 371 OS Agents and Meta Prompts.md outlines the agent architecture, types, categories, and some meta-prompt patterns.
An initial list of potential Python agent files has been compiled based on the project file listing.
Prompt templates and structures are being developed for Technical Agents.
Steps:

Inventory Remaining Agents:

Review the src/minds371/agents/ directory to identify all Python-based agent implementations that still need to be migrated.
Compare this list against the agents already represented by YAML files in the prompts/ directory.
Create a comprehensive list of agents requiring migration.
Categorize Remaining Agents:

The agents have been categorized based on the structure defined in prompts/# 371 OS Agents and Meta Prompts.md (Business Agents, Marketing Agents, Technical Agents, and Utility Agents). New categories have been noted for CCO and CRO agents.
Develop Prompt Templates and Structures:

For each agent category (or even specific agents with unique needs), define a standard YAML structure for their prompt configuration files. This should include:
agent_type: Corresponding to the AgentType enum (or similar classification).
capabilities: A clear description of the agent's functions.
meta_prompt_pattern: The core meta-prompt that defines the agent's behavior and role.
routing_rules (if applicable): How tasks are routed to this agent.
configuration (if applicable): Any specific parameters or settings for the agent.
test_cases (optional but recommended): Examples of tasks and expected outcomes.
Refer to the existing YAML files in prompts/ for examples (prompts/business_agents/ceo_mimi.yaml, etc.).

### Marketing Agents
A standard YAML structure for Marketing Agent prompt configurations:


A standard YAML structure for Marketing Agent prompt configurations:



Create Prompt Configuration Files (Iterative Process):

For each agent identified in Step 1:
Create a new YAML file in the appropriate subdirectory within prompts/ (e.g., prompts/utility_agents/financial_agent.yaml).
Translate the logic and capabilities of the Python agent implementation into the prompt-based configuration structure defined in Step 3.
Define the meta_prompt_pattern that effectively captures the agent's intended behavior.
Include any necessary configuration or routing rules.
Add relevant test cases.
Update Agent Registry and Routing:

Modify the system's agent registry (likely defined in configuration files like configs/agents/routing_rules.yaml or within the router agent's logic) to recognize and load the new prompt-based agents. This will involve integrating with the existing logic in the adaptive_llm_router directory, specifically src/minds371/adaptive_llm_router/intelligent_router_agent.py.
Ensure the router agent (src/minds371/agents/utility/router_agent.py or its prompt-based equivalent) can correctly interpret the routing rules defined in the new YAML files.
Refactor Python Implementations (Optional but Recommended):

Once an agent is successfully migrated to a prompt-based configuration, the corresponding Python file in src/minds371/agents/ can be refactored.
Instead of containing the full agent logic, these files might become simpler wrappers that load the prompt configuration and interact with the core system to execute the prompt.
Alternatively, the Python files could be removed entirely if the prompt-based system handles everything.
Testing:

Implement or update unit and integration tests to verify that the prompt-based agents function as expected.
Ensure task routing and agent selection work correctly with the new configuration.
Test the agents with various inputs to confirm their responses align with their defined meta-prompts.
Modify the system's agent registry (likely defined in configuration files like configs/agents/routing_rules.yaml or within the router agent's logic) to recognize and load the new prompt-based agents.
Ensure the router agent (src/minds371/agents/utility/router_agent.py or its prompt-based equivalent) can correctly interpret the routing rules defined in the new YAML files.
Refactor Python Implementations (Optional but Recommended):

Once an agent is successfully migrated to a prompt-based configuration, the corresponding Python file in src/minds371/agents/ can be refactored.
Instead of containing the full agent logic, these files might become simpler wrappers that load the prompt configuration and interact with the core system to execute the prompt.
Alternatively, the Python files could be removed entirely if the prompt-based system handles everything.
Testing:

Implement or update unit and integration tests to verify that the prompt-based agents function as expected.
Ensure task routing and agent selection work correctly with the new configuration.
Test the agents with various inputs to confirm their responses align with their defined meta-prompts.
Documentation:

Update prompts/# 371 OS Agents and Meta Prompts.md to include all migrated agents and their prompt configurations.
Provide clear explanations of the prompt structure and how to create new prompt-based agents.
Update any other relevant documentation (e.g., in the docs/ directory) to reflect the changes in the agent architecture.
Agents Identified for Migration (Based on initial file review):

**Business Agents:**
- src/minds371/agents/business/cgo_agent.py
- src/minds371/agents/business/cpo_agent.py

**Marketing Agents:**
- src/minds371/agents/marketing/content_generation_agent.py
- src/minds371/agents/marketing/content_valuator_agent.py
- src/minds371/agents/marketing/marketing_automation_agent.py

**Technical Agents:**
- src/minds371/agents/technical/code_campfile_agent.py
- src/minds371/agents/technical/code_mern_agent.py
- src/minds371/agents/technical/code_t3_agent.py
- src/minds371/agents/technical/deployment_agent.py
- src/minds371/agents/technical/qa_agent.py
- src/minds371/agents/technical/qa_automation_agent.py
- src/minds371/agents/technical/repository_intake_agent.py
- src/minds371/agents/technical/tech_stack_specialist_agent.py
- src/minds371/agents/technical/Game Dev Team/unity_ai_agent.py

**Utility Agents:**
- src/minds371/agents/utility/agent_utility_belt.py
- src/minds371/agents/utility/credential_warehouse_agent.py
- src/minds371/agents/utility/financial_agent.py

**New/Uncategorized Agents:**
- src/minds371/agents/cco_agent/cco_agent.py
- src/minds371/agents/cro_agent/cro_agent.py
This plan provides a structured approach to migrating your agents. You can tackle the agents category by category or prioritize them based on their importance to the system. Remember to version control your changes and test frequently.