# Actions Plugin Type

<cite>
**Referenced Files in This Document**   
- [elizaos\Core Concepts\Plugins\Actions.md](file://elizaos/Core%20Concepts/Plugins/Actions.md) - *Updated in recent commit*
- [elizaos\Guides\Plugin Developer Guide.md](file://elizaos/Guides/Plugin%20Developer%20Guide.md) - *Updated in recent commit*
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md) - *Updated in recent commit*
- [packages\elizaos-plugins\universal-tool-server\src\actions.ts](file://packages/elizaos-plugins/universal-tool-server/src/actions.ts) - *Updated in recent commit*
- [packages\elizaos-plugins\universal-tool-server\src\types.ts](file://packages/elizaos-plugins/universal-tool-server/src/types.ts) - *Updated in recent commit*
- [packages\elizaos-plugins\universal-tool-server\src\index.ts](file://packages/elizaos-plugins/universal-tool-server/src/index.ts) - *Updated in recent commit*
- [elizaos\Guides\State Management.md](file://elizaos/Guides/State%20Management.md) - *Updated in recent commit*
- [packages\elizaos-plugins\nx-workspace\package.json](file://packages/elizaos-plugins/nx-workspace/package.json) - *Updated in commit 7d8e26ce7f8e90e5bb0f04459171d694a7fd64db*
- [AB\milestone-tracker.md](file://AB/milestone-tracker.md) - *Updated in commit 31e6752af941713a3fcdb75988c21608ccc836b5*
- [AB\benchmarks\performance-report-2025-09-01.md](file://AB/benchmarks/performance-report-2025-09-01.md) - *Updated in commit 31e6752af941713a3fcdb75988c21608ccc836b5*
- [os-workspace\packages\business-intelligence\src\actions.ts](file://os-workspace/packages/business-intelligence/src/actions.ts) - *Updated in recent commit*
- [os-workspace\packages\business-intelligence\src\types.ts](file://os-workspace/packages/business-intelligence/src/types.ts) - *Updated in recent commit*
- [os-workspace\packages\business-intelligence\src\index.ts](file://os-workspace/packages/business-intelligence/src/index.ts) - *Updated in recent commit*
- [troubleshooting\integration-fixes\BUSINESS_INTELLIGENCE_INDEX_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_INDEX_FIXES.md) - *Updated in recent commit*
</cite>

## Update Summary
**Changes Made**   
- Updated dependency information to reflect the new peerDependency requirement for @elizaos/core@^1.5.2
- Enhanced documentation of Universal Tool Server actions with detailed implementation examples
- Added comprehensive type definitions for blockchain registry and economic coordination
- Updated action interface documentation to reflect current best practices
- Improved examples with real-world implementation patterns from the codebase
- Incorporated reference to business intelligence actions from the Business Intelligence Plugin completion
- Added performance benchmark references from recent milestone updates
- Resolved export ambiguity by renaming BusinessIntelligenceActions to BusinessIntelligenceActionNames in types.ts
- Updated documentation to reflect proper import patterns for types and implementations

## Table of Contents
1. [Introduction](#introduction)
2. [Action Interface and Core Structure](#action-interface-and-core-structure)
3. [Execution Lifecycle and Workflow](#execution-lifecycle-and-workflow)
4. [ActionResult and State Management](#actionresult-and-state-management)
5. [Action Chaining and Context Propagation](#action-chaining-and-context-propagation)
6. [Universal Tool Server Integration](#universal-tool-server-integration)
7. [Validation and Error Handling](#validation-and-error-handling)
8. [Examples and Implementation Patterns](#examples-and-implementation-patterns)
9. [Testing Strategies](#testing-strategies)
10. [Best Practices](#best-practices)

## Introduction
The Actions plugin type in the 371OS architecture serves as the primary mechanism for executing atomic operations within agent workflows. Actions represent discrete, context-aware tasks that agents can perform, ranging from simple communication functions to complex cross-platform operations. This document provides a comprehensive analysis of the Action system, covering its interface definition, execution lifecycle, integration with the agent runtime, and advanced patterns for workflow orchestration. The documentation is designed to be accessible to beginners while providing technical depth for developers implementing custom actions.

**Section sources**
- [elizaos\Core Concepts\Plugins\Actions.md](file://elizaos/Core%20Concepts/Plugins/Actions.md)

## Action Interface and Core Structure
The Action interface defines the contract for all executable operations within the 371OS agent framework. Each action is a self-contained unit that can be discovered, validated, and executed by the agent runtime.

```
classDiagram
class Action {
+string name
+string description
+string[] similes
+ActionExample[][] examples
+Validator validate
+Handler handler
}
class ActionResult {
+boolean success
+string text
+Record<string, any> values
+Record<string, any> data
+string|Error error
}
class ActionContext {
+ActionResult[] previousResults
+getPreviousResult(actionName : string) ActionResult | undefined
}
Action --> ActionResult : "returns"
Action --> ActionContext : "receives via options"
```

**Diagram sources**
- [elizaos\Core Concepts\Plugins\Actions.md](file://elizaos/Core%20Concepts/Plugins/Actions.md)
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md)

**Section sources**
- [elizaos\Core Concepts\Plugins\Actions.md](file://elizaos/Core%20Concepts/Plugins/Actions.md)
- [elizaos\Guides\Plugin Developer Guide.md](file://elizaos/Guides/Plugin%20Developer%20Guide.md)

### Core Properties
The Action interface consists of several key properties that define its behavior:

- **name**: Unique identifier for the action (required)
- **description**: Human-readable explanation of what the action does (required)
- **similes**: Alternative names for fuzzy matching and natural language understanding
- **examples**: Teaching examples that demonstrate proper usage scenarios
- **validate**: Asynchronous function that determines if the action can be executed
- **handler**: Main execution logic that performs the action's work

### Minimal Implementation
A minimal action implementation requires only the essential properties:

```typescript
const minimalAction: Action = {
  name: 'MINIMAL_ACTION',
  description: 'Performs a basic operation',
  validate: async () => true,
  handler: async (runtime, message) => {
    return { text: "Operation completed" };
  }
};
```

## Execution Lifecycle and Workflow
The action execution lifecycle follows a well-defined sequence of phases that ensures proper context gathering, execution, and state management.

```
sequenceDiagram
participant Runtime as Agent Runtime
participant Provider as Provider
participant Action as Action Handler
participant Evaluator as Evaluator
Runtime->>Provider : composeState(message, ['ACTIONS'])
Provider-->>Runtime : state with action context
Runtime->>Runtime : getValidActions(runtime, message, state)
Runtime->>Action : processActions(message, responses, state, callback)
loop For each action
Action->>Action : validate(runtime, message, state)
alt Valid
Action->>Action : execute handler logic
Action-->>Runtime : ActionResult
Runtime->>Runtime : merge results into state
else Invalid
Action-->>Runtime : skip action
end
end
Runtime->>Evaluator : evaluate(message, state, true, callback, responses)
```

**Diagram sources**
- [elizaos\Guides\Plugin Developer Guide.md](file://elizaos/Guides/Plugin%20Developer%20Guide.md)
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md)

**Section sources**
- [elizaos\Guides\Plugin Developer Guide.md](file://elizaos/Guides/Plugin%20Developer%20Guide.md)
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md)

### Lifecycle Phases
1. **Provider Phase**: The runtime composes state by gathering context from relevant providers
2. **Action Selection**: The LLM selects valid actions based on the current message and state
3. **Action Execution**: The runtime processes actions sequentially through the `processActions` method
4. **State Accumulation**: Each action's results are merged into the accumulated state
5. **Evaluation Phase**: Post-processing occurs through evaluators to finalize the response

### Execution Flow Details
The `processActions` method manages the execution flow with the following characteristics:
- **Sequential Execution**: Actions execute in the order specified by the agent
- **State Accumulation**: Results from each action are merged into the accumulated state
- **Working Memory**: Results are stored in working memory for access during execution
- **Error Handling**: Failed actions don't stop the chain unless marked as critical

## ActionResult and State Management
The ActionResult interface standardizes how actions communicate their outcomes and manage state transitions.

```
classDiagram
class ActionResult {
+boolean success
+string text
+Record<string, any> values
+Record<string, any> data
+string|Error error
}
class State {
+Record<string, any> values
+Record<string, any> data
+string text
}
ActionResult --> State : "values merge into"
ActionResult --> State : "data stored in workingMemory"
```

**Diagram sources**
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md)

**Section sources**
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md)
- [elizaos\Guides\State Management.md](file://elizaos/Guides/State%20Management.md)

### ActionResult Interface
The ActionResult interface provides a standardized way for actions to communicate their outcomes:

```typescript
interface ActionResult {
  /** Whether the action succeeded - defaults to true */
  success: boolean;
  
  /** Optional text description of the result */
  text?: string;
  
  /** Values to merge into the state */
  values?: Record<string, any>;
  
  /** Data payload containing action-specific results */
  data?: Record<string, any>;
  
  /** Error information if the action failed */
  error?: string | Error;
}
```

### State Propagation
Results from actions are propagated through the state system in two ways:
1. **Values**: Merged into the state's values object for subsequent actions to access
2. **Data**: Stored in working memory for debugging, analytics, and complex data passing

```typescript
// Action 1 returns values that Action 2 can access
const action1Result = {
  success: true,
  values: { step1Complete: true, resourceId: "123" }
};

// Action 2 receives state with merged values
if (state.values.step1Complete) {
  // Continue with logic using previous result
  const resourceId = state.values.resourceId;
}
```

## Action Chaining and Context Propagation
Action chaining enables complex workflows by executing multiple actions in sequence, with context and results passed between them.

```
sequenceDiagram
participant User as User
participant Runtime as Agent Runtime
participant Action1 as Action 1
participant Action2 as Action 2
participant Action3 as Action 3
User->>Runtime : Request with multiple actions
Runtime->>Action1 : Execute first action
Action1-->>Runtime : ActionResult with data
Runtime->>Action2 : Execute with context
Action2->>Action2 : Access previousResults
Action2-->>Runtime : ActionResult with data
Runtime->>Action3 : Execute with accumulated context
Action3->>Action3 : Access previousResults
Action3-->>Runtime : Final result
Runtime->>User : Complete response
```

**Diagram sources**
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md)

**Section sources**
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md)

### Action Context Interface
The ActionContext interface provides access to previous action results:

```typescript
export interface ActionContext {
  /** Results from previously executed actions in this run */
  previousResults: ActionResult[];
  
  /** Get a specific previous result by action name */
  getPreviousResult?: (actionName: string) => ActionResult | undefined;
}
```

### Chaining Best Practices
1. **Return Proper ActionResult**: Always return a complete ActionResult object
2. **Store Identifiers in Data**: When creating resources, store identifiers for subsequent actions
3. **Handle Missing Dependencies**: Check if required previous results exist
4. **Use Callbacks for Feedback**: Send immediate feedback via callbacks

```typescript
// Example of proper chaining
const previousResult = context?.getPreviousResult?.('CREATE_RESOURCE');
if (!previousResult?.success) {
  return {
    success: false,
    text: "Required previous action did not complete successfully"
  };
}

// Use data from previous action
const resourceId = previousResult.data.resourceId;
```

## Universal Tool Server Integration
The Universal Tool Server extends the basic action system with blockchain-based registries, cryptographic trust, and economic coordination.

```
graph TB
subgraph "Blockchain Registry"
Registry[(Agent Registry)]
Reputation[Reputation System]
Economic[Economic Terms]
end
subgraph "Universal Tool Server"
Discover[discoverUniversalToolsAction]
Execute[executeUniversalToolAction]
Register[registerAgentAction]
Deploy[deployToAkashAction]
end
subgraph "External Systems"
Akash[Akash Network]
MCP[MCP Servers]
end
Discover --> Registry
Execute --> Registry
Register --> Registry
Deploy --> Akash
Execute --> MCP
Registry --> Reputation
Registry --> Economic
```

**Diagram sources**
- [packages\elizaos-plugins\universal-tool-server\src\actions.ts](file://packages/elizaos-plugins/universal-tool-server/src/actions.ts)
- [packages\elizaos-plugins\universal-tool-server\src\types.ts](file://packages/elizaos-plugins/universal-tool-server/src/types.ts)

**Section sources**
- [packages\elizaos-plugins\universal-tool-server\src\actions.ts](file://packages/elizaos-plugins/universal-tool-server/src/actions.ts)
- [packages\elizaos-plugins\universal-tool-server\src\types.ts](file://packages/elizaos-plugins/universal-tool-server/src/types.ts)

### Key Universal Actions
The Universal Tool Server provides several advanced actions:

- **REGISTER_AGENT_BLOCKCHAIN**: Registers agent capabilities in the decentralized registry
- **DISCOVER_UNIVERSAL_TOOLS**: Discovers tools from the blockchain-based registry
- **EXECUTE_UNIVERSAL_TOOL**: Executes tools using the Universal Tool Calling Protocol
- **DEPLOY_TO_AKASH**: Deploys agents to the Akash Network
- **UPDATE_AGENT_REPUTATION**: Updates agent reputation based on performance

### Blockchain Registry Types
The system uses several key types for decentralized coordination:

```typescript
interface AgentRegistryEntry {
  agentId: string;
  did: string; // Decentralized Identifier
  capabilities: AgentCapability[];
  verifiableCredentials: VerifiableCredential[];
  reputation: ReputationScore;
  economicTerms: EconomicTerms;
  deploymentInfo: DeploymentInfo;
}

interface AgentCapability {
  toolId: string;
  name: string;
  description: string;
  inputSchema: any; // JSON Schema
  outputSchema: any; // JSON Schema
  costModel: CostModel;
  permissions: Permission[];
  availability: AvailabilitySchedule;
}
```

## Validation and Error Handling
Proper validation and error handling are critical for robust action implementation.

```
flowchart TD
Start([Action Execution]) --> Validate["validate() method"]
Validate --> Valid{"Valid?"}
Valid --> |Yes| Execute["handler() method"]
Valid --> |No| ReturnInvalid["Return invalid result"]
Execute --> Success{"Success?"}
Success --> |Yes| ReturnSuccess["Return success ActionResult"]
Success --> |No| HandleError["Handle error"]
HandleError --> ReturnError["Return failure ActionResult"]
ReturnInvalid --> End([Complete])
ReturnSuccess --> End
ReturnError --> End
```

**Diagram sources**
- [elizaos\Guides\Plugin Developer Guide.md](file://elizaos/Guides/Plugin%20Developer%20Guide.md)

**Section sources**
- [elizaos\Guides\Plugin Developer Guide.md](file://elizaos/Guides/Plugin%20Developer%20Guide.md)
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md)

### Validation Strategies
The validate method should check multiple conditions before allowing execution:

```typescript
validate: async (runtime, message, state) => {
  const hasPermission = await checkPermissions(runtime, message);
  const hasRequiredService = !!runtime.getService('required-service');
  const isRightContext = message.content.channelType === ChannelType.GROUP;
  
  return hasPermission && hasRequiredService && isRightContext;
}
```

### Error Handling Patterns
Actions should handle errors gracefully and provide meaningful feedback:

```typescript
handler: async (runtime, message, state) => {
  try {
    // Action logic here
    const result = await someOperation();
    return {
      success: true,
      text: "Operation completed successfully",
      data: { result }
    };
  } catch (error) {
    console.error('Action failed:', error);
    return {
      success: false,
      text: `Operation failed: ${error.message}`,
      error: error.message
    };
  }
}
```

## Examples and Implementation Patterns
Concrete examples demonstrate various implementation patterns for different use cases.

**Section sources**
- [elizaos\Core Concepts\Plugins\Actions.md](file://elizaos/Core%20Concepts/Plugins/Actions.md)
- [elizaos\Plugins\DeFi Plugins\Solana\Developer Guide.md](file://elizaos/Plugins/DeFi%20Plugins/Solana/Developer%20Guide.md)
- [elizaos\Plugins\Core Plugins\Bootstrap\Implementation Examples.md](file://elizaos/Plugins/Core%20Plugins/Bootstrap/Implementation%20Examples.md)
- [AB\milestone-tracker.md](file://AB/milestone-tracker.md)
- [AB\benchmarks\performance-report-2025-09-01.md](file://AB/benchmarks/performance-report-2025-09-01.md)
- [os-workspace\packages\business-intelligence\src\actions.ts](file://os-workspace/packages/business-intelligence/src/actions.ts)
- [os-workspace\packages\business-intelligence\src\types.ts](file://os-workspace/packages/business-intelligence/src/types.ts)

### Basic Action Example
A simple action that validates and executes a task:

```typescript
const sendTokenAction: Action = {
  name: 'SEND_TOKEN',
  description: 'Send tokens to address',
  
  validate: async (runtime, message) => {
    return message.content.includes('send') && 
           message.content.includes('0x');
  },
  
  handler: async (runtime, message) => {
    const address = extractAddress(message.content);
    const amount = extractAmount(message.content);
    await sendToken(address, amount);
    return {
      text: `Sent ${amount} tokens to ${address}`
    };
  }
};
```

### DeFi Action Example
A more complex action for token swapping on Solana:

```typescript
export const swapAction: Action = {
  name: 'SWAP_SOLANA',
  description: 'Swap tokens on Solana using Jupiter',
  
  handler: async (runtime, message, state, options, callback) => {
    // Extract swap parameters
    const params = await extractSwapParams(runtime, message, state);
    
    // Get Jupiter quote
    const quote = await getJupiterQuote({
      inputMint: params.fromToken,
      outputMint: params.toToken,
      amount: params.amount,
      slippageBps: params.slippage * 100
    });
    
    // Execute swap
    const result = await executeJupiterSwap(
      service.connection,
      service.wallet,
      quote
    );
    
    callback?.({
      text: `Swapped ${params.fromAmount} ${params.fromSymbol} for ${formatAmount(quote.outAmount)} ${params.toSymbol}`,
      content: {
        success: true,
        signature: result.signature,
        fromAmount: params.fromAmount,
        toAmount: formatAmount(quote.outAmount),
        route: quote.routePlan
      }
    });
  }
};
```

### Business Intelligence Action Example
The Business Intelligence Plugin provides several actions for enterprise analytics:

```typescript
// Business data collection action
export const collectBusinessDataAction: Action = {
  name: 'COLLECT_BUSINESS_DATA',
  description: 'Collect and analyze comprehensive business metrics',
  
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const agentRole = runtime.character?.settings?.role as string;
    const allowedRoles = ['CEO', 'CFO', 'CTO', 'CLO', 'business-analyst'];
    const messageText = typeof message.content.text === 'string' ? message.content.text : '';
    return allowedRoles.includes(agentRole || '') || messageText.includes('business data');
  },

  handler: async (runtime: IAgentRuntime, message: Memory, state: State) => {
    try {
      const snapshot = await generateBusinessSnapshot();
      await updateOrreryVisualization(snapshot);
      
      return {
        text: `Business intelligence update complete`,
        data: {
          action: 'COLLECT_BUSINESS_DATA',
          status: 'completed',
          snapshot: snapshot,
          timestamp: new Date().toISOString(),
        },
        success: true,
      };
    } catch (error) {
      return {
        text: `Business data collection failed: ${(error as Error).message}`,
        data: {
          action: 'COLLECT_BUSINESS_DATA',
          status: 'error',
          error: (error as Error).message,
        },
        success: false,
      };
    }
  },
};
```

### Export Pattern for Business Intelligence Actions
Due to naming conflicts between type definitions and implementations, the Business Intelligence Plugin uses a specific export pattern:

```typescript
// In types.ts - export as BusinessIntelligenceActionNames to avoid conflict
export const BusinessIntelligenceActions = [
  'COLLECT_BUSINESS_DATA',
  'GENERATE_BUSINESS_ALERT',
  'ANALYZE_BUSINESS_TRENDS',
  'ANALYZE_DEPARTMENT_PERFORMANCE',
] as const;

export type BusinessIntelligenceActionType = (typeof BusinessIntelligenceActions)[number];

// In actions.ts - export actual action implementations
export const BusinessIntelligenceActions: Action[] = [
  collectBusinessDataAction,
  generateBusinessAlertAction,
  analyzeBusinessTrendsAction,
  analyzeDepartmentPerformanceAction,
];

// In index.ts - use renamed import for type constants
export { BusinessIntelligenceActions as BusinessIntelligenceActionNames } from './types';
export { 
  collectBusinessDataAction,
  generateBusinessAlertAction,
  analyzeBusinessTrendsAction,
  analyzeDepartmentPerformanceAction,
  BusinessIntelligenceActions 
} from './actions';
```

## Testing Strategies
Comprehensive testing ensures actions work correctly and handle edge cases properly.

**Section sources**
- [elizaos\Guides\Plugin Developer Guide.md](file://elizaos/Guides/Plugin%20Developer%20Guide.md)
- [elizaos\Plugins\Core Plugins\Bootstrap\Testing Guide.md](file://elizaos/Plugins/Core%20Plugins/Bootstrap/Testing%20Guide.md)

### Test Structure
Tests should cover validation, execution, and edge cases:

```typescript
describe('MyAction', () => {
  let mockRuntime: any;
  let mockMessage: Memory;
  let mockState: State;

  beforeEach(() => {
    mockRuntime = createMockRuntime({
      settings: { MY_API_KEY: 'test-key' },
    });

    mockMessage = {
      id: 'test-id',
      entityId: 'user-123',
      roomId: 'room-456',
      content: { text: 'Do the thing' },
    };

    mockState = {
      values: { recentMessages: 'test context' },
      data: { room: { name: 'Test Room' } },
      text: 'State text',
    };
  });

  describe('validation', () => {
    it('should validate when all requirements are met', async () => {
      const isValid = await myAction.validate(mockRuntime, mockMessage, mockState);
      expect(isValid).toBe(true);
    });
  });

  describe('handler', () => {
    it('should return success ActionResult on successful execution', async () => {
      const mockCallback = jest.fn();
      const result = await myAction.handler(mockRuntime, mockMessage, mockState, {}, mockCallback);
      
      expect(result.success).toBe(true);
      expect(result.text).toContain('completed');
      expect(mockCallback).toHaveBeenCalled();
    });
  });
});
```

### Testing with Dependencies
Tests should verify interactions with runtime methods:

```typescript
describe('Follow Room Action', () => {
  it('should update participation status', async () => {
    const setup = setupActionTest();

    setup.mockRuntime.getRoom.mockResolvedValue({
      id: 'room-123',
      type: ChannelType.TEXT,
      participants: ['user-123'],
    });

    await followRoomAction.handler(
      setup.mockRuntime,
      setup.mockMessage as Memory,
      setup.mockState as State,
      {},
      setup.callbackFn
    );

    expect(setup.mockRuntime.updateParticipantUserState).toHaveBeenCalledWith(
      'room-123',
      setup.mockRuntime.agentId,
      'FOLLOWED'
    );
  });
});
```

## Best Practices
Following these best practices ensures robust, maintainable, and effective action implementations.

**Section sources**
- [elizaos\Deep Dive\Plugin Internals.md](file://elizaos/Deep%20Dive/Plugin%20Internals.md)
- [elizaos\Guides\Plugin Developer Guide.md](file://elizaos/Guides/Plugin%20Developer%20Guide.md)
- [troubleshooting\integration-fixes\BUSINESS_INTELLIGENCE_INDEX_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_INDEX_FIXES.md)

### Return ActionResult Consistently
Always return a proper ActionResult object, even for simple actions:

```typescript
// ✅ Recommended
return {
  success: true,
  text: "Action completed",
  data: { /* any data for next actions */ }
};

// ❌ Avoid
return true;
```

### Use Callbacks for User Feedback
Send immediate feedback via callbacks to improve user experience:

```typescript
await callback?.({
  text: "Processing your request...",
  source: message.content.source
});

// Do the work
const result = await longRunningOperation();

await callback?.({
  text: `Done! ${result.summary}`,
  actions: ['MY_ACTION_COMPLETE'],
});
```

### Chain Actions with Context
Leverage previous action results for complex workflows:

```typescript
const previousResults = options?.context?.previousResults || [];
const lastResult = previousResults[previousResults.length - 1];

if (lastResult?.data?.needsFollowUp) {
  // Continue the chain
}
```

### Write Teaching Examples
Provide comprehensive examples to train the LLM:

```typescript
examples: [
  // Happy path
  [
    { name: '{{user}}', content: { text: 'Please do X' } },
    {
      name: '{{agent}}',
      content: {
        text: 'Doing X now!',
        actions: ['DO_X'],
      },
    },
  ],
  // Edge cases
  [
    { name: '{{user}}', content: { text: 'Do X without permission' } },
    {
      name: '{{agent}}',
      content: {
        text: "I don't have permission for that",
        actions: ['REPLY'],
      },
    },
  ],
]
```

### Handle Missing Dependencies
Always check for required previous results:

```typescript
const previousResult = context?.getPreviousResult?.('REQUIRED_ACTION');
if (!previousResult?.success) {
  return {
    success: false,
    text: "Required previous action did not complete successfully"
  };
}
```

### Manage Export Ambiguity
When both types and implementations share similar names, use strategic renaming:

```typescript
// In types.ts
export const BusinessIntelligenceActions = [...] as const;
export type BusinessIntelligenceActionType = (typeof BusinessIntelligenceActions)[number];

// In actions.ts
export const BusinessIntelligenceActions: Action[] = [...];

// In index.ts
export { BusinessIntelligenceActions as BusinessIntelligenceActionNames } from './types';
export { BusinessIntelligenceActions } from './actions';
```