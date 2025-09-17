Below is a list of Composio documentation. Use your web and fetch capabilities to read the documentation you need.
[Composio Documentation](https://docs.composio.dev)

- [Quickstart](https://docs.composio.dev/docs/quickstart.mdx): Add authenticated tool-calling to any LLM agent in three steps.
- [Configuration](https://docs.composio.dev/docs/configuration.mdx)
- [Providers](https://docs.composio.dev/docs/providers.mdx)
- [Executing Tools](https://docs.composio.dev/docs/executing-tools.mdx): Learn how to execute Composio's tools with different providers and frameworks
- [Authenticating Tools](https://docs.composio.dev/docs/authenticating-tools.mdx): Learn how to authenticate tools
- [Fetching and Filtering Tools](https://docs.composio.dev/docs/fetching-tools.mdx): Learn how to fetch and filter Composio's tools and toolkits
- [Schema Modifiers](https://docs.composio.dev/docs/modifiers/schema-modifiers.mdx): Learn how to use schema modifiers to transform tool schemas before they are seen by agents.
- [Before Execution Modifiers](https://docs.composio.dev/docs/modifiers/before-execution.mdx): Learn how to use before execution modifiers to modify tool arguments before execution.
- [After Execution Modifiers](https://docs.composio.dev/docs/modifiers/after-execution.mdx): Learn how to use after execution modifiers to transform tool results after execution.
- [Creating custom tools](https://docs.composio.dev/docs/custom-tools.mdx): Learn how to extend Composio's toolkits with your own tools
- [Custom Auth Configs](https://docs.composio.dev/docs/custom-auth-configs.mdx): Guide to using customizing auth configs for a toolkit
- [Programmatic Auth Configs](https://docs.composio.dev/docs/programmatic-auth-configs.mdx): Guide to creating auth configs programmatically
- [Custom Auth Parameters](https://docs.composio.dev/docs/custom-auth-params.mdx): Guide to injecting custom credentials in headers or parameters for a toolkit
- [Using Triggers](https://docs.composio.dev/docs/using-triggers.mdx): Send payloads to your system based on external events
- [OpenAI Providers](https://docs.composio.dev/providers/openai.mdx)
- [Anthropic Provider](https://docs.composio.dev/providers/anthropic.mdx)
- [LangGraph Provider](https://docs.composio.dev/providers/langgraph.mdx)
- [CrewAI Provider](https://docs.composio.dev/providers/crewai.mdx)
- [Vercel AI SDK Provider](https://docs.composio.dev/providers/vercel.mdx)
- [Google ADK Provider](https://docs.composio.dev/providers/google-adk.mdx)
- [OpenAI Agents Provider](https://docs.composio.dev/providers/openai-agents.mdx)
- [Mastra Provider](https://docs.composio.dev/providers/mastra.mdx)
- [Custom Providers](https://docs.composio.dev/toolsets/custom.mdx)

---
title: Providers
image:
  type: url
  value: 'https://og.composio.dev/api/og?title=Providers'
keywords: ''
hide-nav-links: false
---

Providers in Composio act as bridges between your AI models and external tools. They transform Composio's tools into formats that different AI frameworks can understand and use, making it possible to integrate with any AI framework seamlessly.

## What are Providers?  
Think of providers as translators. Different AI frameworks (like OpenAI, Anthropic Claude, or LangChain) expect tools to be formatted in their specific way. Instead of manually converting Composio tools for each framework, providers handle this transformation automatically.

For example:
- OpenAI expects tools in a specific JSON schema format with type: "function"
- Anthropic Claude expects tools with an input_schema structure
- LangChain expects tools as callable functions with specific parameters

Providers ensure that Composio tools work correctly with your chosen AI platform without you having to worry about the technical details.


## Using Providers
Here's how you can generate text with various providers using Composio SDK:

### Default Provider (OpenAI)
If you don't specify a provider, Composio uses the OpenAI provider by default:
<CodeGroup>
```python Python
from openai import OpenAI
from composio import Composio

# Initialize tools.
openai_client = OpenAI()
composio = Composio(api_key="your-composio-api-key")

# Define task.
task = "Star a repo composiohq/composio on GitHub"

# Get GitHub tools that are pre-configured
tools = composio.tools.get(user_id="default", toolkits=["GITHUB"])

# Get response from the LLM
response = openai_client.chat.completions.create(
    model="gpt-4o-mini",
    tools=tools,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": task},
    ],
)
print(response)

# Execute the function calls.
result = composio.provider.handle_tool_calls(response=response, user_id="default")
print(result)


```
```typescript TypeScript
import { Composio } from '@composio/core';

// Uses OpenAI provider automatically
const composio = new Composio({
  apiKey: 'your-composio-api-key'
});

// Get tools formatted for OpenAI
const tools = await composio.tools.get('default', {
  toolkits: ['github']
});

// Use with OpenAI
const completion = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Star the repo composiohq/composio on GitHub' },
  ],
  tools: tools // Already formatted for OpenAI
});

// Execute the function calls.
const result = await composio.provider.handleToolCalls("user@example.com", completion)
console.log(result)

```
</CodeGroup>

### Using a Different Provider
Different providers may require additional packages:


<CodeGroup>
```shell Python
# Core SDK (includes OpenAI provider)
pip install composio==0.8.0

# Additional providers
pip install composio_anthropic==0.8.0
pip install composio_google==0.8.0
pip install composio_langchain==0.8.0
pip install composio_crewai==0.8.0
```
```shell Typescript
# Core SDK (includes OpenAI provider)
npm install @composio/core

# Additional providers
npm install @composio/anthropic
npm install @composio/google  
npm install @composio/langchain
npm install @composio/vercel
```
</CodeGroup>

To use a different provider, specify it when initializing Composio:

<Tabs>
<Tab title="OpenAI (Default)">
OpenAI is a completion provider. You can use it to generate text, function calls.
<CodeGroup>
```python Python
from composio import Composio
from composio_openai import OpenAIProvider

composio = Composio(provider=OpenAIProvider())
```
```typescript TypeScript
import { Composio } from "@composio/core";
import { OpenAIProvider } from "@composio/openai";

const composio = new Composio({ provider: new OpenAIProvider() });

```

</CodeGroup>
</Tab>
<Tab title="Anthropic">
Anthropic is a completion provider. You can use it to generate text, function calls.
<CodeGroup>
```python Python
from composio import Composio
from composio_anthropic import AnthropicProvider

composio = Composio(provider=AnthropicProvider())
```
```typescript TypeScript
import { Composio } from "@composio/core";
import { AnthropicProvider } from "@composio/anthropic";
import { Anthropic } from "@anthropic-ai/sdk";

const composio = new Composio({ provider: new AnthropicProvider() });

```
</CodeGroup>
</Tab>
<Tab title="Vercel AI SDK">
```typescript TypeScript
import { Composio } from "@composio/core";
import { VercelProvider } from "@composio/vercel";

const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new VercelProvider(),
});

```
</Tab>
<Tab title="Mastra">
```typescript TypeScript
import { MastraProvider } from '@composio/mastra';
import { Agent } from '@mastra/core/agent';
import { Composio } from '@composio/core';

const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new MastraProvider(),
});

```

</Tab>
<Tab title="OpenAI Agents">
```python Python
import asyncio

from agents import Agent, Runner

from composio import Composio
from composio_openai_agents import OpenAIAgentsProvider

# Initialize Composio toolset
composio = Composio(provider=OpenAIAgentsProvider())
```
</Tab>
</Tabs>


## Supported Providers
Composio supports two different types of providers based on the type of AI framework you are using:

### Non-Agentic Providers
These providers work with AI platforms that use chat completion APIs, where you control the tool execution flow. The AI model analyzes your conversation and suggests which tools to use, but your code decides when and how to execute them.
With chat completion APIs, the typical flow is:

1. You send a message to the AI model along with available tools
2. The AI responds with either a text message or a request to use specific tools
3. If tools are requested, you execute them and send the results back to continue the conversation

<CardGroup cols={3}>
  <Card
    title="OpenAI Provider"
    icon={<img src="file:28f325a6-2873-4451-af81-69e31baa50c6" width="24" height="24" />}
    href="/providers/openai"
  >
    Integrate with OpenAI's tool calling and agents.
  </Card>
  <Card
    title="Anthropic Provider"
    icon={<img src="file:ea3abe73-e89d-4a70-b497-e0b2989bdd8e" width="24" height="24" />}
    href="/providers/anthropic"
  >
    Use Anthropic's Claude models with Composio tools.
  </Card>
  <Card
    title="Gemini Provider"
    icon={<img src="file:87edb81b-119d-4254-ae66-6614dcca5a48" width="24" height="24" />}
    href="/providers/google"
  >
    Integrate with Google's Gemini models.
  </Card>
</CardGroup>

### Agentic Providers
These providers work with AI frameworks that can execute tools autonomously. The AI agent can decide to run tools on its own without your direct intervention.

<CardGroup cols={3}>
  <Card
    title="LangChain Provider"
    icon={<img src="file:df087933-4aec-4cef-8769-d3a49aa21f2d"/>}
    href="/providers/langchain"
  >
    Add tools to LangChain agent flows.
  </Card>
  <Card
    title="CrewAI Provider"
    icon="fa-solid fa-people-group"
    href="/providers/crewai"
  >
    Enable tool calling in CrewAI multi-agent systems.
  </Card>
  <Card
    title="Vercel AI SDK Provider"
    icon={<img src="file:7db9c2be-f19f-4916-8e1b-1e2208364a32" width="24" height="24" />}
    href="/providers/vercel"
  >
    Use Composio tools with Vercel's AI SDK.
  </Card>
  <Card
    title="OpenAI Agents Provider"
    icon="fa-solid fa-user-astronaut"
    href="/providers/openai-agents"
  >
    Add tools to OpenAI's new Agents API.
  </Card>
  <Card
    title="Mastra Provider"
    icon="fa-solid fa-cubes"
    href="/providers/mastra"
  >
    Use Composio tools with Mastra agent framework.
  </Card>
</CardGroup>

<Tip title="Custom Providers" icon="puzzle">
Using a framework not yet supported by Composio? Create a custom provider in [TypeScript](/providers/custom/typescript) or [Python](/providers/custom/python)!
</Tip>
---
title: TypeScript Custom Provider
image:
  type: url
  value: 'https://og.composio.dev/api/og?title=TypeScript%20Custom%20Provider'
keywords: ''
hide-nav-links: false
---

This guide provides a comprehensive walkthrough of creating custom providers for the Composio TypeScript SDK, enabling integration with different AI frameworks and platforms.

## Provider Architecture

The Composio SDK uses a provider architecture to adapt tools for different AI frameworks. The provider handles:

1. **Tool Format Transformation**: Converting Composio tools into formats compatible with specific AI platforms
2. **Tool Execution**: Managing the flow of tool execution and results
3. **Platform-Specific Integration**: Providing helper methods for seamless integration

## Types of Providers

There are two types of providers:

1. **Non-Agentic Providers**: Transform tools for platforms that don't have their own agency (e.g., OpenAI)
2. **Agentic Providers**: Transform tools for platforms that have their own agency (e.g., LangChain, AutoGPT)

## Provider Class Hierarchy

```
BaseProvider (Abstract)
├── BaseNonAgenticProvider (Abstract)
│   └── OpenAIProvider (Concrete)
│   └── [Your Custom Non-Agentic Provider] (Concrete)
└── BaseAgenticProvider (Abstract)
    └── [Your Custom Agentic Provider] (Concrete)
```

## Creating a Non-Agentic Provider

Non-agentic providers implement the `BaseNonAgenticProvider` abstract class:

```typescript
import { BaseNonAgenticProvider, Tool } from '@composio/core';

// Define your tool format
interface MyAITool {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

// Define your tool collection format
type MyAIToolCollection = MyAITool[];

// Create your provider
export class MyAIProvider extends BaseNonAgenticProvider<MyAIToolCollection, MyAITool> {
  // Required: Unique provider name for telemetry
  readonly name = 'my-ai-platform';

  // Required: Method to transform a single tool
  override wrapTool(tool: Tool): MyAITool {
    return {
      name: tool.slug,
      description: tool.description || '',
      parameters: {
        type: 'object',
        properties: tool.inputParameters?.properties || {},
        required: tool.inputParameters?.required || [],
      },
    };
  }

  // Required: Method to transform a collection of tools
  override wrapTools(tools: Tool[]): MyAIToolCollection {
    return tools.map(tool => this.wrapTool(tool));
  }

  // Optional: Custom helper methods for your AI platform
  async executeMyAIToolCall(
    userId: string,
    toolCall: {
      name: string;
      arguments: Record<string, unknown>;
    }
  ): Promise<string> {
    // Use the built-in executeTool method
    const result = await this.executeTool(toolCall.name, {
      userId,
      arguments: toolCall.arguments,
    });

    return JSON.stringify(result.data);
  }
}
```

## Creating an Agentic Provider

Agentic providers implement the `BaseAgenticProvider` abstract class:

```typescript
import { BaseAgenticProvider, Tool, ExecuteToolFn } from '@composio/core';

// Define your tool format
interface AgentTool {
  name: string;
  description: string;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
  schema: Record<string, unknown>;
}

// Define your tool collection format
interface AgentToolkit {
  tools: AgentTool[];
  createAgent: (config: Record<string, unknown>) => unknown;
}

// Create your provider
export class MyAgentProvider extends BaseAgenticProvider<AgentToolkit, AgentTool> {
  // Required: Unique provider name for telemetry
  readonly name = 'my-agent-platform';

  // Required: Method to transform a single tool with execute function
  override wrapTool(tool: Tool, executeToolFn: ExecuteToolFn): AgentTool {
    return {
      name: tool.slug,
      description: tool.description || '',
      schema: tool.inputParameters || {},
      execute: async (args: Record<string, unknown>) => {
        const result = await executeToolFn(tool.slug, args);
        if (!result.successful) {
          throw new Error(result.error || 'Tool execution failed');
        }
        return result.data;
      },
    };
  }

  // Required: Method to transform a collection of tools with execute function
  override wrapTools(tools: Tool[], executeToolFn: ExecuteToolFn): AgentToolkit {
    const agentTools = tools.map(tool => this.wrapTool(tool, executeToolFn));

    return {
      tools: agentTools,
      createAgent: config => {
        // Create an agent using the tools
        return {
          run: async (prompt: string) => {
            // Implementation depends on your agent framework
            console.log(`Running agent with prompt: ${prompt}`);
            // The agent would use the tools.execute method to run tools
          },
        };
      },
    };
  }

  // Optional: Custom helper methods for your agent platform
  async runAgent(agentToolkit: AgentToolkit, prompt: string): Promise<unknown> {
    const agent = agentToolkit.createAgent({});
    return await agent.run(prompt);
  }
}
```

## Using Your Custom Provider

After creating your provider, use it with the Composio SDK:

```typescript
import { Composio } from '@composio/core';
import { MyAIProvider } from './my-ai-provider';

// Create your provider instance
const myProvider = new MyAIProvider();

// Initialize Composio with your provider
const composio = new Composio({
  apiKey: 'your-composio-api-key',
  provider: myProvider,
});

// Get tools - they will be transformed by your provider
const tools = await composio.tools.get('default', {
  toolkits: ['github'],
});

// Use the tools with your AI platform
console.log(tools); // These will be in your custom format
```

## Provider State and Context

Your provider can maintain state and context:

```typescript
export class StatefulProvider extends BaseNonAgenticProvider<ToolCollection, Tool> {
  readonly name = 'stateful-provider';

  // Provider state
  private requestCount = 0;
  private toolCache = new Map<string, any>();
  private config: ProviderConfig;

  constructor(config: ProviderConfig) {
    super();
    this.config = config;
  }

  override wrapTool(tool: Tool): ProviderTool {
    this.requestCount++;

    // Use the provider state/config
    const enhancedTool = {
      // Transform the tool
      name: this.config.useUpperCase ? tool.slug.toUpperCase() : tool.slug,
      description: tool.description,
      schema: tool.inputParameters,
    };

    // Cache the transformed tool
    this.toolCache.set(tool.slug, enhancedTool);

    return enhancedTool;
  }

  override wrapTools(tools: Tool[]): ProviderToolCollection {
    return tools.map(tool => this.wrapTool(tool));
  }

  // Custom methods that use provider state
  getRequestCount(): number {
    return this.requestCount;
  }

  getCachedTool(slug: string): ProviderTool | undefined {
    return this.toolCache.get(slug);
  }
}
```

## Advanced: Provider Composition

You can compose functionality by extending existing providers:

```typescript
import { OpenAIProvider } from '@composio/openai';

// Extend the OpenAI provider with custom functionality
export class EnhancedOpenAIProvider extends OpenAIProvider {
  // Add properties
  private analytics = {
    toolCalls: 0,
    errors: 0,
  };

  // Override methods to add functionality
  override async executeToolCall(userId, tool, options, modifiers) {
    this.analytics.toolCalls++;

    try {
      // Call the parent implementation
      const result = await super.executeToolCall(userId, tool, options, modifiers);
      return result;
    } catch (error) {
      this.analytics.errors++;
      throw error;
    }
  }

  // Add new methods
  getAnalytics() {
    return this.analytics;
  }

  async executeWithRetry(userId, tool, options, modifiers, maxRetries = 3) {
    let attempts = 0;
    let lastError;

    while (attempts < maxRetries) {
      try {
        return await this.executeToolCall(userId, tool, options, modifiers);
      } catch (error) {
        lastError = error;
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }

    throw lastError;
  }
}
```

## Example: Anthropic Claude Provider

Here's a more complete example for Anthropic's Claude:

```typescript
import { BaseNonAgenticProvider, Tool } from '@composio/core';
import Anthropic from '@anthropic-ai/sdk';

interface ClaudeTool {
  name: string;
  description: string;
  input_schema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
}

type ClaudeToolCollection = ClaudeTool[];

export class ClaudeProvider extends BaseNonAgenticProvider<ClaudeToolCollection, ClaudeTool> {
  readonly name = 'claude';
  private client: Anthropic;

  constructor(apiKey: string) {
    super();
    this.client = new Anthropic({
      apiKey,
    });
  }

  override wrapTool(tool: Tool): ClaudeTool {
    return {
      name: tool.slug,
      description: tool.description || '',
      input_schema: {
        type: 'object',
        properties: tool.inputParameters?.properties || {},
        required: tool.inputParameters?.required || [],
      },
    };
  }

  override wrapTools(tools: Tool[]): ClaudeToolCollection {
    return tools.map(tool => this.wrapTool(tool));
  }

  // Helper method to create a Claude message with tools
  async createMessage(prompt: string, tools: ClaudeToolCollection, userId: string) {
    const response = await this.client.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      system: 'You are a helpful assistant with access to tools.',
      messages: [{ role: 'user', content: prompt }],
      tools,
    });

    // Process tool calls if any
    if (
      response.content.some(
        content => content.type === 'tool_use' && 'name' in content && 'input' in content
      )
    ) {
      const toolResponses = await Promise.all(
        response.content
          .filter(content => content.type === 'tool_use')
          .map(async (content: any) => {
            const result = await this.executeTool(content.name, {
              userId,
              arguments: content.input,
            });

            return {
              type: 'tool_result',
              tool_use_id: content.id,
              content: JSON.stringify(result.data),
            };
          })
      );

      // Continue the conversation with tool results
      const followupResponse = await this.client.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        system: 'You are a helpful assistant with access to tools.',
        messages: [
          { role: 'user', content: prompt },
          { role: 'assistant', content: response.content },
          { role: 'user', content: toolResponses },
        ],
        tools,
      });

      return followupResponse;
    }

    return response;
  }
}
```

## Example: LangChain Provider

Here's an example for LangChain:

```typescript
import { BaseAgenticProvider, Tool, ExecuteToolFn } from '@composio/core';
import { DynamicTool } from 'langchain/tools';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';

interface LangChainTool extends DynamicTool {
  name: string;
  description: string;
  func: (input: Record<string, unknown>) => Promise<string>;
}

interface LangChainToolkit {
  tools: LangChainTool[];
  createExecutor: (options: { model: string }) => Promise<any>;
}

export class LangChainProvider extends BaseAgenticProvider<LangChainToolkit, LangChainTool> {
  readonly name = 'langchain';

  override wrapTool(tool: Tool, executeToolFn: ExecuteToolFn): LangChainTool {
    return new DynamicTool({
      name: tool.slug,
      description: tool.description || '',
      func: async (input: string) => {
        try {
          // Parse input from string to object
          const args = typeof input === 'string' ? JSON.parse(input) : input;

          // Execute the tool
          const result = await executeToolFn(tool.slug, args);

          if (!result.successful) {
            throw new Error(result.error || 'Tool execution failed');
          }

          // Return the result
          return JSON.stringify(result.data);
        } catch (error) {
          return `Error: ${error.message}`;
        }
      },
    }) as LangChainTool;
  }

  override wrapTools(tools: Tool[], executeToolFn: ExecuteToolFn): LangChainToolkit {
    const langchainTools = tools.map(tool => this.wrapTool(tool, executeToolFn));

    return {
      tools: langchainTools,
      createExecutor: async ({ model }) => {
        const llm = new ChatOpenAI({
          modelName: model || 'gpt-4',
          temperature: 0,
        });

        return await initializeAgentExecutorWithOptions(langchainTools, llm, {
          agentType: 'chat-zero-shot-react-description',
          verbose: true,
        });
      },
    };
  }

  // Helper method to run the agent
  async runAgent(toolkit: LangChainToolkit, prompt: string, model = 'gpt-4'): Promise<string> {
    const executor = await toolkit.createExecutor({ model });
    const result = await executor.call({ input: prompt });
    return result.output;
  }
}
```

## Best Practices

1. **Keep providers focused**: Each provider should integrate with one specific platform
2. **Handle errors gracefully**: Catch and transform errors from tool execution
3. **Follow platform conventions**: Adopt naming and structural conventions of the target platform
4. **Optimize for performance**: Cache transformed tools when possible
5. **Add helper methods**: Provide convenient methods for common platform-specific operations
6. **Provide clear documentation**: Document your provider's unique features and usage
7. **Use telemetry**: Set a meaningful provider name for telemetry insights
