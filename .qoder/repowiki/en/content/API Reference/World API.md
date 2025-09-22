# World API

<cite>
**Referenced Files in This Document**   
- [Create a world for an agent.md](file://elizaos/API Reference/Create a world for an agent.md)
- [Get all worlds.md](file://elizaos/API Reference/Get all worlds.md)
- [Update a world.md](file://elizaos/API Reference/Update a world.md)
- [Real-World Plugin and Project Patterns.md](file://elizaos/Deep Dive/Real-World Plugin and Project Patterns.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [World Management Endpoints](#world-management-endpoints)
   - [Create World](#create-world)
   - [Get All Worlds](#get-all-worlds)
   - [Update World](#update-world)
3. [World Data Model](#world-data-model)
4. [Authentication and Access Control](#authentication-and-access-control)
5. [Error Handling](#error-handling)
6. [Usage Examples](#usage-examples)
7. [Performance Considerations](#performance-considerations)

## Introduction
The World API in the 371OS platform enables the creation, retrieval, and modification of virtual worlds assigned to autonomous agents. These worlds represent isolated environments where agents can operate, interact, and maintain state across different platforms such as Discord, Telegram, or custom integrations. This documentation provides comprehensive details on the available endpoints, request/response schemas, authentication requirements, and usage patterns for managing agent worlds.

## World Management Endpoints

### Create World
Creates a new virtual world for a specified agent.

**HTTP Method**: `POST`  
**URL Pattern**: `/api/agents/{agentId}/worlds`

#### Request Parameters
**Path Parameters**:
- **agentId**: 
  - Type: string
  - Format: uuid
  - Required: true
  - Description: ID of the agent for which the world is being created

**Request Body (application/json)**:
```json
{
  "name": "string",
  "sourceType": "string",
  "sourceId": "string",
  "metadata": {}
}
```

**Body Properties**:
- **name**: Name of the world (required)
- **sourceType**: Type of source platform (e.g., discord, telegram)
- **sourceId**: Platform-specific identifier for the world
- **metadata**: Additional metadata as key-value pairs

#### Response Schema
**201 Created** - World created successfully:
```json
{
  "success": true,
  "data": {
    "world": {
      "id": "string",
      "name": "string",
      "agentId": "string",
      "sourceType": "string",
      "sourceId": "string",
      "metadata": {}
    }
  }
}
```

**Error Responses**:
- **400 Bad Request**: Invalid agent ID or request payload
- **404 Not Found**: Agent not found
- **500 Internal Server Error**: Error creating world

**Section sources**
- [Create a world for an agent.md](file://elizaos/API Reference/Create a world for an agent.md)

### Get All Worlds
Retrieves all available worlds across all agents.

**HTTP Method**: `GET`  
**URL Pattern**: `/api/agents/worlds`

#### Request Parameters
No path, query, or body parameters required.

#### Response Schema
**200 OK** - Worlds retrieved successfully:
```json
{
  "success": true,
  "data": {
    "worlds": [
      {
        "id": "string",
        "name": "string",
        "agentId": "string",
        "sourceType": "string",
        "sourceId": "string",
        "metadata": {}
      }
    ]
  }
}
```

**Error Responses**:
- **500 Internal Server Error**: Error retrieving worlds

**Section sources**
- [Get all worlds.md](file://elizaos/API Reference/Get all worlds.md)

### Update World
Updates properties of an existing world.

**HTTP Method**: `PATCH`  
**URL Pattern**: `/api/agents/{agentId}/worlds/{worldId}`

#### Request Parameters
**Path Parameters**:
- **agentId**: 
  - Type: string
  - Format: uuid
  - Required: true
  - Description: ID of the agent that owns the world
- **worldId**: 
  - Type: string
  - Format: uuid
  - Required: true
  - Description: ID of the world to update

**Request Body (application/json)**:
```json
{
  "name": "string",
  "metadata": {}
}
```

**Body Properties**:
- **name**: Updated name for the world
- **metadata**: Updated metadata (merged with existing metadata)

#### Response Schema
**200 OK** - World updated successfully:
```json
{
  "success": true,
  "data": {
    "world": {
      "id": "string",
      "name": "string",
      "agentId": "string",
      "sourceType": "string",
      "sourceId": "string",
      "metadata": {}
    }
  }
}
```

**Error Responses**:
- **400 Bad Request**: Invalid agent ID or world ID
- **404 Not Found**: Agent or world not found
- **500 Internal Server Error**: Error updating world

**Section sources**
- [Update a world.md](file://elizaos/API Reference/Update a world.md)

## World Data Model
The World object represents a virtual environment assigned to an agent.

**World Schema**:
```json
{
  "id": "string",
  "name": "string",
  "agentId": "string",
  "sourceType": "string",
  "sourceId": "string",
  "metadata": "object"
}
```

**Field Descriptions**:
- **id**: Unique identifier for the world (UUID format)
- **name**: Display name of the world
- **agentId**: ID of the agent that owns this world (UUID format)
- **sourceType**: Type of source platform (e.g., discord, telegram, etc.)
- **sourceId**: Platform-specific identifier for the world
- **metadata**: Additional metadata stored as an object

**Section sources**
- [Create a world for an agent.md](file://elizaos/API Reference/Create a world for an agent.md)
- [Get all worlds.md](file://elizaos/API Reference/Get all worlds.md)
- [Update a world.md](file://elizaos/API Reference/Update a world.md)

## Authentication and Access Control
The World API requires appropriate authentication and authorization for access.

**Authentication Requirements**:
- Admin-level permissions OR
- Agent owner permissions (user who owns the agent)

**Required Headers**:
- Authorization: Bearer {token}
- Content-Type: application/json

**Access Control Rules**:
- Users can only modify worlds for agents they own
- Admin users can access all worlds across all agents
- World creation requires agent ownership or admin privileges
- Metadata updates follow merge semantics (existing metadata is preserved unless explicitly overwritten)

**Security Implementation**:
The system implements role-based access control and comprehensive audit logging for all world operations, ensuring compliance with security policies.

**Section sources**
- [Real-World Plugin and Project Patterns.md](file://elizaos/Deep Dive/Real-World Plugin and Project Patterns.md)

## Error Handling
The World API returns standardized error responses for all error conditions.

**Error Response Schema**:
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

**Common Error Codes**:
- **INVALID_REQUEST**: Invalid request parameters or payload
- **RESOURCE_NOT_FOUND**: Agent or world does not exist
- **PERMISSION_DENIED**: Insufficient permissions to perform the operation
- **INTERNAL_ERROR**: Server-side error occurred

**Validation Rules**:
- Agent ID and world ID must be valid UUIDs
- World names must be non-empty strings
- Metadata must be a valid JSON object
- Source type and source ID must be provided during world creation

**Section sources**
- [Create a world for an agent.md](file://elizaos/API Reference/Create a world for an agent.md)
- [Update a world.md](file://elizaos/API Reference/Update a world.md)

## Usage Examples
### Create a World (curl)
```bash
curl -X POST "http://localhost:3000/api/agents/3c90c3cc-0d44-4b50-8888-8dd25736052a/worlds" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Discord Community",
    "sourceType": "discord",
    "sourceId": "123456789",
    "metadata": {
      "region": "us-west",
      "language": "en"
    }
  }'
```

### Get All Worlds (curl)
```bash
curl -X GET "http://localhost:3000/api/agents/worlds" \
  -H "Authorization: Bearer your-token"
```

### Update a World (curl)
```bash
curl -X PATCH "http://localhost:3000/api/agents/3c90c3cc-0d44-4b50-8888-8dd25736052a/worlds/3c90c3cc-0d44-4b50-8888-8dd25736052a" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Discord Community",
    "metadata": {
      "theme": "dark"
    }
  }'
```

**Section sources**
- [Create a world for an agent.md](file://elizaos/API Reference/Create a world for an agent.md)
- [Get all worlds.md](file://elizaos/API Reference/Get all worlds.md)
- [Update a world.md](file://elizaos/API Reference/Update a world.md)

## Performance Considerations
### World Initialization
- World creation is optimized for fast initialization
- Metadata operations use efficient merge algorithms
- Database indexing is applied to agentId and worldId fields for quick lookups

### Loading Times
- Retrieving all worlds uses pagination in production environments
- Caching layer implemented for frequently accessed worlds
- Batch operations available for managing multiple worlds efficiently

### Scalability
- Stateless architecture allows for horizontal scaling
- Database connections are pooled for optimal performance
- Rate limiting applied to prevent abuse of world management endpoints

### Best Practices
- Cache world configurations client-side when possible
- Use specific world retrieval endpoints instead of fetching all worlds when only one world is needed
- Implement retry logic with exponential backoff for failed world operations
- Monitor API usage patterns to identify performance bottlenecks

**Section sources**
- [Real-World Plugin and Project Patterns.md](file://elizaos/Deep Dive/Real-World Plugin and Project Patterns.md)