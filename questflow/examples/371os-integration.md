# 371OS Integration Example

This example demonstrates how to use QuestFlow to orchestrate 371OS agents and workflows.

## Prerequisites

1. Ensure 371OS is properly set up in the `../os-workspace` directory
2. Run the setup script: `node scripts/setup-371os.js`
3. Install dependencies: `npm install`

## Example 1: C-Suite Agent Coordination

This example shows how to coordinate the C-Suite agents (CEO, CTO, CFO, etc.) to accomplish a strategic goal.

```javascript
const { loadAgentConfig } = require('../lib/agent-registry');
const { executeWorkflow } = require('../scripts/execute-workflow');

// Load the CEO agent (Mimi)
const ceoAgent = loadAgentConfig('ceo-mimi', '../os-workspace/agents/business-agents');

// Create a strategic planning workflow
const strategicPlanWorkflow = {
  name: 'strategic-planning',
  steps: [
    {
      id: 'step-1',
      name: 'Market Analysis',
      agent: 'cmo-anova',
      action: 'analyze_market_trends'
    },
    {
      id: 'step-2',
      name: 'Technical Feasibility',
      agent: 'cto-zara',
      action: 'assess_technical_feasibility'
    },
    {
      id: 'step-3',
      name: 'Financial Projections',
      agent: 'cfo-maya',
      action: 'generate_financial_projections'
    },
    {
      id: 'step-4',
      name: 'Strategic Decision',
      agent: 'ceo-mimi',
      action: 'make_strategic_decision',
      dependencies: ['step-1', 'step-2', 'step-3']
    }
  ]
};

// Execute the workflow
executeWorkflow(strategicPlanWorkflow);
```

## Example 2: Plugin Development Workflow

This example shows how to automate the development and deployment of ElizaOS plugins.

```javascript
const { executeWorkflow } = require('../scripts/execute-workflow');

// Plugin development workflow
const pluginDevWorkflow = {
  name: 'plugin-development',
  steps: [
    {
      id: 'step-1',
      name: 'Plugin Planning',
      agent: 'cto-zara',
      action: 'plan_plugin',
      parameters: {
        type: 'business-intelligence'
      }
    },
    {
      id: 'step-2',
      name: 'Implementation',
      agent: 'technical-agent',
      action: 'implement_plugin'
    },
    {
      id: 'step-3',
      name: 'Testing',
      agent: 'test-agent',
      action: 'test_plugin'
    },
    {
      id: 'step-4',
      name: 'Deployment',
      agent: 'universal-tool-server',
      action: 'deploy_plugin',
      parameters: {
        target: 'akash-network'
      }
    }
  ]
};

// Execute the workflow
executeWorkflow(pluginDevWorkflow);
```

## Example 3: Business Intelligence Analysis

This example demonstrates how to leverage the business intelligence capabilities of 371OS.

```javascript
const { loadAgentConfig } = require('../lib/agent-registry');

// Load the business intelligence agent
const biAgent = loadAgentConfig('business-intelligence', '../os-workspace/packages/business-intelligence');

// Execute business intelligence actions
const actions = [
  'COLLECT_BUSINESS_DATA',
  'GENERATE_BUSINESS_ALERT',
  'ANALYZE_BUSINESS_TRENDS',
  'ANALYZE_DEPARTMENT_PERFORMANCE'
];

actions.forEach(action => {
  console.log(`Executing ${action}...`);
  // In a real implementation, this would call the agent's action handler
});
```

## Running the Examples

1. Ensure all agents are properly configured in the `agents/` directory
2. Run an example: `node examples/c-suite-coordination.js`
3. Monitor the execution in the `workflows/executions/` directory
4. Review results and logs

## Customization

You can customize these examples by:

1. Modifying agent configurations in `agents/core/` and `agents/specialized/`
2. Creating new workflows in `workflows/templates/`
3. Adding new tasks in `tasks/`
4. Extending connectors in `connectors/`

The integration with 371OS allows you to leverage the full power of the autonomous agent operating system while providing a structured workflow orchestration layer through QuestFlow.