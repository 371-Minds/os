# Agent Management API

<cite>
**Referenced Files in This Document**   
- [Create a new agent.md](file://reference/elizaos/API Reference/Create a new agent.md) - *Updated in recent commit*
- [Get agent details.md](file://reference/elizaos/API Reference/Get agent details.md) - *Updated in recent commit*
- [List all agents.md](file://reference/elizaos/API Reference/List all agents.md) - *Updated in recent commit*
- [Start an agent.md](file://reference/elizaos/API Reference/Start an agent.md) - *Updated in recent commit*
- [Stop an agent.md](file://reference/elizaos/API Reference/Stop an agent.md) - *Updated in recent commit*
- [Update agent.md](file://reference/elizaos/API Reference/Update agent.md) - *Updated in recent commit*
- [Delete an agent.md](file://reference/elizaos/API Reference/Delete an agent.md) - *Updated in recent commit*
- [Sessions Health Check.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Sessions Health Check.md) - *Added health monitoring integration*
- [Basic health check.md](file://reference/elizaos/API Reference/System/Basic health check.md) - *Added system health reference*
</cite>

## Update Summary
**Changes Made**   
- Updated API response schemas based on OpenAPI specifications
- Enhanced error handling section with additional status codes
- Updated request and response examples to match current API behavior
- Verified and updated all endpoint specifications against current implementation
- Added comprehensive source tracking for all referenced files
- Integrated health monitoring endpoints into performance considerations
- Added references to system and sessions health check APIs

## Table of Contents
1. [Introduction](#introduction)
2. [Agent Lifecycle Operations](#agent-lifecycle-operations)
   - [Create Agent](#create-agent)
   - [Retrieve Agent](#retrieve-agent)
   - [Start Agent](#start-agent)
   - [Stop Agent](#stop-agent)
   - [Update Agent](#update-agent)
   - [Delete Agent](#delete-agent)
3. [Agent State Machine](#agent-state-machine)
4. [Authentication and Security](#authentication-and-security)
5. [Request and Response Examples](#request-and-response-examples)
6. [Error Handling](#error-handling)
7. [Performance Considerations](#performance-considerations)
8. [Validation Rules](#validation-rules)
9. [Sample curl Commands](#sample-curl-commands)

## Introduction

The Agent Management API in the 371OS platform provides comprehensive control over autonomous agents, enabling creation, retrieval, lifecycle management, configuration updates, and deletion. This API serves as the primary interface for provisioning and managing intelligent agents that perform business, technical, and utility functions within the 371Minds ecosystem.

The API follows RESTful principles with predictable resource URLs and standard HTTP methods. All endpoints are designed to support both programmatic integration and interactive exploration. Agents represent autonomous entities with specific roles (CEO, CFO, CTO, etc.) that can be orchestrated to perform complex business operations.

**Section sources**
- [Get agent details.md](file://reference/elizaos/API Reference/Get agent details.md)
- [List all agents.md](file://reference/elizaos/API Reference/List all agents.md)

## Agent Lifecycle Operations

### Create Agent

Creates a new agent from character configuration.

**HTTP Method**: POST  
**URL Pattern**: `/api/agents`

**Request Parameters**:
- **Body** (application/json):
  - `characterPath`: Path to a character file (string)
  - `characterJson`: Character configuration in JSON format (object)

**Required Fields**: Either `characterPath` or `characterJson` must be provided.

**Response Schema**:
```json
{
  "success": true,
  "data": {
    "character": {
      "id": "string (uuid)",
      "name": "string",
      "bio": "string",
      "settings": "object",
      "system": "string",
      "style": "object",
      "lore": ["string"],
      "messageExamples": ["string"],
      "topics": ["string"],
      "plugins": ["string"]
    }
  }
}
```

**HTTP Status Codes**:
- 201: Agent created successfully
- 400: Error creating agent (invalid configuration)

**Section sources**
- [Create a new agent.md](file://reference/elizaos/API Reference/Create a new agent.md)

### Retrieve Agent

Retrieves detailed information about a specific agent or lists all available agents.

#### Get Specific Agent
**HTTP Method**: GET  
**URL Pattern**: `/api/agents/{agentId}`

**Path Parameters**:
- `agentId`: ID of the agent to retrieve (string, required, format: uuid)

**Response Schema**:
```json
{
  "success": true,
  "data": {
    "id": "string (uuid)",
    "name": "string",
    "status": "string (enum: active, inactive)"
  }
}
```

**HTTP Status Codes**:
- 200: Agent details retrieved successfully
- 400: Invalid agent ID
- 404: Agent not found
- 500: Server error

#### List All Agents
**HTTP Method**: GET  
**URL Pattern**: `/api/agents`

**Response Schema**:
```json
{
  "success": true,
  "data": {
    "agents": [
      {
        "id": "string (uuid)",
        "name": "string",
        "status": "string (enum: active, inactive)"
      }
    ]
  }
}
```

**HTTP Status Codes**:
- 200: List of agents retrieved successfully
- 500: Error retrieving agents

**Section sources**
- [Get agent details.md](file://reference/elizaos/API Reference/Get agent details.md)
- [List all agents.md](file://reference/elizaos/API Reference/List all agents.md)

### Start Agent

Starts an existing agent.

**HTTP Method**: POST  
**URL Pattern**: `/api/agents/{agentId}/start`

**Path Parameters**:
- `agentId`: ID of the agent to start (string, required, format: uuid)

**Request Body**: Empty

**Response Schema**:
```json
{
  "success": true,
  "data": {
    "id": "string (uuid)",
    "name": "string",
    "status": "active"
  }
}
```

**HTTP Status Codes**:
- 200: Agent started successfully
- 400: Invalid agent ID
- 404: Agent not found
- 500: Error starting agent

**Section sources**
- [Start an agent.md](file://reference/elizaos/API Reference/Start an agent.md)

### Stop Agent

Stops a running agent.

**HTTP Method**: POST  
**URL Pattern**: `/api/agents/{agentId}/stop`

**Path Parameters**:
- `agentId`: ID of the agent to stop (string, required, format: uuid)

**Request Body**: Empty

**Response Schema**:
```json
{
  "success": true,
  "data": {
    "message": "string"
  }
}
```

**HTTP Status Codes**:
- 200: Agent stopped successfully
- 400: Invalid agent ID format
- 404: Agent not found

**Section sources**
- [Stop an agent.md](file://reference/elizaos/API Reference/Stop an agent.md)

### Update Agent

Updates an existing agent's configuration.

**HTTP Method**: PATCH  
**URL Pattern**: `/api/agents/{agentId}`

**Path Parameters**:
- `agentId`: ID of the agent to update (string, required, format: uuid)

**Request Body** (application/json):
- Any valid agent properties to update

**Response Schema**:
```json
{
  "success": true,
  "data": {
    "id": "string (uuid)",
    "name": "string",
    "status": "string (enum: active, inactive)"
  }
}
```

**HTTP Status Codes**:
- 200: Agent updated successfully
- 400: Invalid agent ID
- 404: Agent not found
- 500: Error updating agent

**Section sources**
- [Update agent.md](file://reference/elizaos/API Reference/Update agent.md)

### Delete Agent

Deletes an existing agent.

**HTTP Method**: DELETE  
**URL Pattern**: `/api/agents/{agentId}`

**Path Parameters**:
- `agentId`: ID of the agent to delete (string, required, format: uuid)

**Request Body**: Empty

**Response Schema**:
```json
{
  "success": true
}
```

**HTTP Status Codes**:
- 200: Agent deleted successfully
- 202: Agent deletion initiated
- 400: Invalid agent ID
- 404: Agent not found
- 408: Agent deletion operation timed out
- 409: Cannot delete agent due to active references
- 500: Error deleting agent

**Section sources**
- [Delete an agent.md](file://reference/elizaos/API Reference/Delete an agent.md)

## Agent State Machine

Agents in the 371OS platform transition through a well-defined state machine that governs their lifecycle and operational status.

```
[*] --> Created
Created --> Running : start
Running --> Stopped : stop
Stopped --> Running : start
Created --> Error : initialization_failed
Running --> Error : execution_error
Stopped --> Error : configuration_error
Error --> Created : reset
Error --> Stopped : reset
Running --> Initializing : startup_sequence
Initializing --> Running : ready
Initializing --> Error : startup_failed
```

The agent state machine consists of the following states:

- **Created**: The agent has been instantiated but is not yet running. This is the initial state after agent creation.
- **Initializing**: The agent is going through startup sequence, loading configuration, and initializing services.
- **Running**: The agent is actively processing tasks and responding to events. The agent can only transition to this state from Created, Stopped, or Initializing states.
- **Stopped**: The agent has been intentionally halted and is not processing any tasks. The agent can be restarted from this state.
- **Error**: The agent has encountered a critical failure that prevents normal operation. This could be due to configuration issues, resource constraints, or internal errors.

State transitions are controlled through the API endpoints:
- `POST /api/agents/{agentId}/start` transitions from Created/Stopped to Initializing, then to Running
- `POST /api/agents/{agentId}/stop` transitions from Running to Stopped

The state management system also includes caching mechanisms to optimize performance, with state caches automatically cleared for messages older than one hour.

**Section sources**
- [Get agent details.md](file://reference/elizaos/API Reference/Get agent details.md)

## Authentication and Security

The Agent Management API implements a multi-layered security approach that combines traditional authentication methods with blockchain-based identity verification.

### Authentication Methods

The platform supports multiple authentication mechanisms:

1. **Traditional API Keys/JWT**: For programmatic access and integration scenarios
2. **Blockchain-Based Identity**: Using decentralized identifiers (DIDs) and smart contracts for trustless verification
3. **OAuth2 Integration**: Enterprise-grade authentication through identity providers

### Role-Based Access Control

Agents operate under the principle of least privilege, with access controls enforced at multiple levels:

- **Credential Warehouse**: AES-encrypted storage with role-based access control between agents
- **Permission System**: Fine-grained permissions that determine which agents can access specific resources
- **Audit Logging**: Comprehensive audit trail for all security-related operations

The credential warehouse system ensures that agents can only access credentials they are explicitly authorized to use, preventing unauthorized access to sensitive resources.

**Section sources**
- [Get agent details.md](file://reference/elizaos/API Reference/Get agent details.md)

## Request and Response Examples

### Valid Agent Creation

**Request**:
```bash
curl -X POST https://api.371minds.com/api/agents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "characterJson": {
      "name": "TestAgent",
      "bio": "I am a test agent for the 371 OS system.",
      "system": "You are a test agent that validates ElizaOS integration.",
      "topics": ["nx workspace management", "agent self-awareness", "autonomous development"]
    }
  }'
```

**Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "character": {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "name": "TestAgent",
      "bio": "I am a test agent for the 371 OS system.",
      "settings": {},
      "system": "You are a test agent that validates ElizaOS integration.",
      "style": {
        "all": [
          "Be technical and precise when discussing workspace operations",
          "Show enthusiasm for autonomous agent capabilities",
          "Explain technical concepts clearly"
        ]
      },
      "lore": [
        "Created to test the revolutionary 371 OS autonomous agent system."
      ],
      "messageExamples": [
        [
          {
            "user": "{{user1}}",
            "content": {
              "text": "Can you analyze the workspace?"
            }
          },
          {
            "user": "TestAgent",
            "content": {
              "text": "I'll analyze the Nx workspace structure and show you the dependency graph."
            }
          }
        ]
      ],
      "topics": [
        "nx workspace management",
        "agent self-awareness",
        "autonomous development"
      ],
      "plugins": []
    }
  }
}
```

### Agent Start Operation

**Request**:
```bash
curl -X POST https://api.371minds.com/api/agents/a1b2c3d4-e5f6-7890-1234-567890abcdef/start \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "name": "TestAgent",
    "status": "active"
  }
}
```

### Invalid Configuration Error

**Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CONFIG",
    "message": "Agent configuration is invalid",
    "details": "Required field 'name' is missing from character configuration"
  }
}
```

**Section sources**
- [Create a new agent.md](file://reference/elizaos/API Reference/Create a new agent.md)
- [Start an agent.md](file://reference/elizaos/API Reference/Start an agent.md)
- [Stop an agent.md](file://reference/elizaos/API Reference/Stop an agent.md)

## Error Handling

The API provides comprehensive error handling with standardized error payloads across all endpoints.

### Error Response Schema
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "string"
  }
}
```

### Common Error Conditions

- **Invalid Configuration**: When agent configuration is missing required fields or contains invalid values
- **Agent Not Found**: When attempting to operate on an agent that does not exist
- **Agent Already Running**: When attempting to start an agent that is already in the running state
- **Permission Denied**: When the requesting entity lacks sufficient privileges
- **Resource Limit Exceeded**: When system limits prevent agent creation

### HTTP Status Codes

| Status Code | Meaning | Description |
|-----------|--------|-------------|
| 400 | Bad Request | Invalid request parameters or body |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |

**Section sources**
- [Get agent details.md](file://reference/elizaos/API Reference/Get agent details.md)
- [Stop an agent.md](file://reference/elizaos/API Reference/Stop an agent.md)

## Performance Considerations

The Agent Management API is designed for high performance and scalability, with considerations for both individual operations and bulk processing.

### Bulk Operations

For provisioning multiple agents, consider the following approaches:

1. **Sequential Processing**: Simple but slower, suitable for small batches
2. **Parallel Processing**: Faster execution by making concurrent requests
3. **Batch Endpoints**: When available, use dedicated batch endpoints to minimize network overhead

### Health Monitoring Integration

The system includes health monitoring endpoints that should be used to ensure service availability:

- **System Health**: `GET /api/server/hello` - Basic health check endpoint
- **Sessions Health**: `GET /api/messaging/sessions/health` - Returns active session statistics and service status

These endpoints provide critical insights into system performance and should be monitored regularly in production environments.

### Rate Limiting

Rate limits are applied at multiple levels:
- Per API key
- Per IP address
- Per agent type
- Global system limits

### Performance Best Practices

- Cache agent metadata when possible to reduce API calls
- Use connection pooling for high-frequency operations
- Implement exponential backoff for retry logic
- Batch related operations to minimize round trips
- Monitor response times and adjust concurrency accordingly
- Regularly check health endpoints to ensure system stability

**Section sources**
- [Get agent details.md](file://reference/elizaos/API Reference/Get agent details.md)
- [Sessions Health Check.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Sessions Health Check.md)
- [Basic health check.md](file://reference/elizaos/API Reference/System/Basic health check.md)

## Validation Rules

The API enforces strict validation rules to ensure data integrity and system stability.

### Required Fields

- **Agent Name**: Must be provided and non-empty
- **Character Configuration**: Must include essential properties like name and system prompt
- **Agent ID**: Must be a valid UUID format when provided

### Naming Conventions

- Agent names should be descriptive and follow the pattern: `[Role]_[Name]` (e.g., CEO_Mimi, CFO_Cash)
- Names must be 3-50 characters long
- Only alphanumeric characters, underscores, and spaces are allowed
- Names must be unique within the organization

### Configuration Validation

- JSON configuration must be well-formed and valid
- Required fields must be present
- Data types must match expected formats
- Enumerated values must be from allowed sets

**Section sources**
- [Create a new agent.md](file://reference/elizaos/API Reference/Create a new agent.md)

## Sample curl Commands

### Provision a New Agent
```bash
curl -X POST https://api.371minds.com/api/agents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-api-token>" \
  -d '{
    "characterJson": {
      "name": "CTO_Alex",
      "bio": "Technical lead for development teams",
      "system": "You are responsible for technology strategy...",
      "topics": ["software development", "cloud infrastructure", "devops"]
    }
  }'
```

### Start an Agent
```bash
curl -X POST https://api.371minds.com/api/agents/3c90c3cc-0d44-4b50-8888-8dd25736052a/start \
  -H "Authorization: Bearer <your-api-token>"
```

### Retrieve Agent Information
```bash
curl -X GET https://api.371minds.com/api/agents/3c90c3cc-0d44-4b50-8888-8dd25736052a \
  -H "Authorization: Bearer <your-api-token>"
```

### Update Agent Configuration
```bash
curl -X PATCH https://api.371minds.com/api/agents/3c90c3cc-0d44-4b50-8888-8dd25736052a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-api-token>" \
  -d '{
    "characterJson": {
      "topics": ["software development", "cloud infrastructure", "devops", "ai"]
    }
  }'
```

### Stop an Agent
```bash
curl -X POST https://api.371minds.com/api/agents/3c90c3cc-0d44-4b50-8888-8dd25736052a/stop \
  -H "Authorization: Bearer <your-api-token>"
```

### Delete an Agent
```bash
curl -X DELETE https://api.371minds.com/api/agents/3c90c3cc-0d44-4b50-8888-8dd25736052a \
  -H "Authorization: Bearer <your-api-token>"
```