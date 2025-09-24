# Sessions API

<cite>
**Referenced Files in This Document**   
- [Sessions Health Check.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Sessions Health Check.md)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md)
- [Sessions Architecture Deep Dive.md](file://reference/elizaos/Deep Dive/Sessions Architecture Deep Dive.md)
- [Create Session.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Create Session.md) - *Updated in recent commit*
- [Get Session.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Get Session.md) - *Updated in recent commit*
- [List Sessions.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/List Sessions.md) - *Updated in recent commit*
- [End Session.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/End Session.md) - *Updated in recent commit*
- [Send Session Message.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Send Session Message.md) - *Updated in recent commit*
- [Get Session Messages.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Get Session Messages.md) - *Updated in recent commit*
- [Renew Session.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Renew Session.md) - *Updated in recent commit*
- [Session Heartbeat.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Session Heartbeat.md) - *Updated in recent commit*
</cite>

## Update Summary
**Changes Made**   
- Updated all endpoint documentation with enhanced timeout configurations and renewal mechanisms
- Added comprehensive health monitoring details for the Sessions API service
- Enhanced request/response schemas with detailed examples and parameter descriptions
- Improved error handling documentation with specific error classes and recovery strategies
- Added rate limiting information and WebSocket event integration details
- Updated sample requests with complete curl and Postman examples

## Table of Contents
1. [Introduction](#introduction)
2. [Authentication and Headers](#authentication-and-headers)
3. [Session Lifecycle Management](#session-lifecycle-management)
   - [Create Session](#create-session)
   - [Get Session](#get-session)
   - [List Sessions](#list-sessions)
   - [End Session](#end-session)
4. [Session Messaging](#session-messaging)
   - [Send Session Message](#send-session-message)
   - [Get Session Messages](#get-session-messages)
5. [Session Management Operations](#session-management-operations)
   - [Renew Session](#renew-session)
   - [Update Session Timeout](#update-session-timeout)
6. [Session Heartbeat Mechanism](#session-heartbeat-mechanism)
7. [Health Monitoring](#health-monitoring)
   - [Sessions Health Check](#sessions-health-check)
8. [Error Handling](#error-handling)
9. [Session Configuration and Policies](#session-configuration-and-policies)
   - [Timeout Policies](#timeout-policies)
   - [Message Retention](#message-retention)
   - [Rate Limiting](#rate-limiting)
10. [Data Validation](#data-validation)
11. [Sample Requests](#sample-requests)
    - [curl Examples](#curl-examples)
    - [Postman Examples](#postman-examples)

## Introduction
The Sessions API in the 371OS platform provides a comprehensive interface for managing conversational sessions between users and AI agents. This API enables the creation, maintenance, and termination of sessions while providing robust messaging capabilities and health monitoring. The system is designed to abstract away the complexity of server and channel management by automatically creating dedicated channels for each session, managing participants, handling message routing, and cleaning up resources upon session termination.

The API supports various operations including session creation, message sending and retrieval, session renewal, timeout configuration updates, and health monitoring. It implements sophisticated session management features such as automatic renewal, expiration warnings, and hierarchical configuration that allows for global, agent-specific, and session-specific settings.

**Section sources**
- [Sessions Architecture Deep Dive.md](file://reference/elizaos/Deep Dive/Sessions Architecture Deep Dive.md#L50-L124)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L127-L192)

## Authentication and Headers
The Sessions API requires authentication via session tokens or API keys. All requests must include appropriate authentication headers to access protected endpoints.

### Required Headers
```
Content-Type: application/json
Authorization: Bearer <token>
```

### Authentication Mechanisms
- **Session Tokens**: Generated upon session creation and included in the response. These tokens are tied to the specific session and must be included in subsequent requests.
- **API Keys**: System-level keys that can be used for administrative operations or when session tokens are not applicable.

### Permission Scopes
Different operations require specific permission scopes:
- `sessions:create` - Required for creating new sessions
- `sessions:read` - Required for retrieving session information and messages
- `sessions:write` - Required for sending messages and updating session state
- `sessions:manage` - Required for terminating sessions and updating timeout configurations
- `sessions:health` - Required for accessing health check endpoints

**Section sources**
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L127-L192)
- [Sessions Architecture Deep Dive.md](file://reference/elizaos/Deep Dive/Sessions Architecture Deep Dive.md#L50-L124)

## Session Lifecycle Management

### Create Session
Creates a new session between a user and an agent.

**HTTP Method**: `POST`  
**URL**: `/api/messaging/sessions`

**Request Parameters**
- **Body (JSON)**:
```json
{
  "agentId": "string",
  "userId": "string",
  "metadata": {},
  "timeoutConfig": {
    "timeoutMinutes": 30,
    "autoRenew": true,
    "maxDurationMinutes": 180,
    "warningThresholdMinutes": 5
  }
}
```

**Response Schema (201 Created)**
```json
{
  "sessionId": "string",
  "agentId": "string",
  "userId": "string",
  "createdAt": "string",
  "expiresAt": "string",
  "timeoutConfig": {
    "timeoutMinutes": 30,
    "autoRenew": true,
    "maxDurationMinutes": 180,
    "warningThresholdMinutes": 5
  },
  "renewalCount": 0,
  "metadata": {}
}
```

**Status Codes**
- `201 Created`: Session successfully created
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Agent not found
- `500 Internal Server Error`: Unexpected server error

**Section sources**
- [Create Session.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Create Session.md)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L127-L192)

### Get Session
Retrieves information about a specific session.

**HTTP Method**: `GET`  
**URL**: `/api/messaging/sessions/{sessionId}`

**Path Parameters**
- `sessionId`: The unique identifier of the session

**Response Schema (200 OK)**
```json
{
  "sessionId": "string",
  "agentId": "string",
  "userId": "string",
  "createdAt": "string",
  "lastActivity": "string",
  "expiresAt": "string",
  "timeRemaining": 0,
  "isNearExpiration": false,
  "timeoutConfig": {
    "timeoutMinutes": 30,
    "autoRenew": true,
    "maxDurationMinutes": 180,
    "warningThresholdMinutes": 5
  },
  "renewalCount": 0,
  "metadata": {}
}
```

**Status Codes**
- `200 OK`: Session information retrieved successfully
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Session does not exist
- `410 Gone`: Session has expired
- `500 Internal Server Error`: Unexpected server error

**Section sources**
- [Get Session.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Get Session.md)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L331-L390)

### List Sessions
Retrieves a list of active sessions.

**HTTP Method**: `GET`  
**URL**: `/api/messaging/sessions`

**Query Parameters**
- `agentId`: Filter by agent ID
- `userId`: Filter by user ID
- `status`: Filter by status (active, expired, all)
- `limit`: Maximum number of results to return
- `offset`: Number of results to skip

**Response Schema (200 OK)**
```json
{
  "sessions": [
    {
      "sessionId": "string",
      "agentId": "string",
      "userId": "string",
      "createdAt": "string",
      "expiresAt": "string",
      "timeRemaining": 0,
      "isNearExpiration": false,
      "renewalCount": 0
    }
  ],
  "total": 0,
  "limit": 0,
  "offset": 0,
  "stats": {
    "totalSessions": 0,
    "activeSessions": 0,
    "expiredSessions": 0
  }
}
```

**Status Codes**
- `200 OK`: Sessions retrieved successfully
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `500 Internal Server Error`: Unexpected server error

**Section sources**
- [List Sessions.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/List Sessions.md)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L331-L390)

### End Session
Terminates a session and cleans up associated resources.

**HTTP Method**: `DELETE`  
**URL**: `/api/messaging/sessions/{sessionId}`

**Path Parameters**
- `sessionId`: The unique identifier of the session

**Response Schema (200 OK)**
```json
{
  "success": true,
  "message": "Session {sessionId} deleted successfully"
}
```

**Status Codes**
- `200 OK`: Session terminated successfully
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Session does not exist
- `500 Internal Server Error`: Unexpected server error

**Section sources**
- [End Session.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/End Session.md)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L331-L390)

## Session Messaging

### Send Session Message
Sends a message within a session context.

**HTTP Method**: `POST`  
**URL**: `/api/messaging/sessions/{sessionId}/messages`

**Path Parameters**
- `sessionId`: The unique identifier of the session

**Request Parameters**
- **Body (JSON)**:
```json
{
  "content": "string",
  "attachments": [
    {
      "type": "string",
      "url": "string",
      "name": "string"
    }
  ],
  "metadata": {}
}
```

**Response Schema (201 Created)**
```json
{
  "id": "string",
  "content": "string",
  "authorId": "string",
  "createdAt": "string",
  "metadata": {},
  "sessionStatus": {
    "expiresAt": "string",
    "renewalCount": 0,
    "wasRenewed": false,
    "isNearExpiration": false
  }
}
```

**Status Codes**
- `201 Created`: Message sent successfully
- `400 Bad Request`: Invalid message content or metadata
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Session not found
- `410 Gone`: Session has expired
- `500 Internal Server Error`: Unexpected server error

**Section sources**
- [Send Session Message.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Send Session Message.md)
- [Sessions Architecture Deep Dive.md](file://reference/elizaos/Deep Dive/Sessions Architecture Deep Dive.md#L175-L224)

### Get Session Messages
Retrieves message history for a session with cursor-based pagination.

**HTTP Method**: `GET`  
**URL**: `/api/messaging/sessions/{sessionId}/messages`

**Path Parameters**
- `sessionId`: The unique identifier of the session

**Query Parameters**
- `limit`: Number of messages to return (default: 50, max: 100)
- `before`: Timestamp for retrieving older messages
- `after`: Timestamp for retrieving newer messages

**Response Schema (200 OK)**
```json
{
  "messages": [
    {
      "id": "string",
      "content": "string",
      "authorId": "string",
      "isAgent": false,
      "createdAt": "string",
      "metadata": {}
    }
  ],
  "hasMore": false,
  "cursors": {
    "before": 0,
    "after": 0
  }
}
```

**Status Codes**
- `200 OK`: Messages retrieved successfully
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Session not found
- `410 Gone`: Session has expired
- `500 Internal Server Error`: Unexpected server error

**Section sources**
- [Get Session Messages.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Get Session Messages.md)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L261-L312)

## Session Management Operations

### Renew Session
Manually renews a session, extending its expiration time.

**HTTP Method**: `POST`  
**URL**: `/api/messaging/sessions/{sessionId}/renew`

**Path Parameters**
- `sessionId`: The unique identifier of the session

**Response Schema (200 OK)**
```json
{
  "sessionId": "string",
  "agentId": "string",
  "userId": "string",
  "createdAt": "string",
  "lastActivity": "string",
  "expiresAt": "string",
  "timeoutConfig": {
    "timeoutMinutes": 30,
    "autoRenew": true,
    "maxDurationMinutes": 180,
    "warningThresholdMinutes": 5
  },
  "renewalCount": 0,
  "timeRemaining": 0,
  "isNearExpiration": false
}
```

**Status Codes**
- `200 OK`: Session renewed successfully
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Session not found
- `410 Gone`: Session has expired
- `422 Unprocessable Entity`: Session cannot be renewed (e.g., max duration reached)
- `500 Internal Server Error`: Unexpected server error

**Section sources**
- [Renew Session.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Renew Session.md)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L261-L312)

### Update Session Timeout
Updates the timeout configuration for an active session.

**HTTP Method**: `PATCH`  
**URL**: `/api/messaging/sessions/{sessionId}/timeout`

**Path Parameters**
- `sessionId`: The unique identifier of the session

**Request Parameters**
- **Body (JSON)**:
```json
{
  "timeoutMinutes": 120,
  "autoRenew": false,
  "maxDurationMinutes": 480
}
```

**Response Schema (200 OK)**
```json
{
  "sessionId": "string",
  "timeoutConfig": {
    "timeoutMinutes": 120,
    "autoRenew": false,
    "maxDurationMinutes": 480,
    "warningThresholdMinutes": 5
  },
  "expiresAt": "string",
  "renewalCount": 0
}
```

**Status Codes**
- `200 OK`: Timeout configuration updated successfully
- `400 Bad Request`: Invalid timeout parameters
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Session not found
- `410 Gone`: Session has expired
- `500 Internal Server Error`: Unexpected server error

**Section sources**
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L312-L333)

## Session Heartbeat Mechanism
The session heartbeat mechanism allows clients to keep sessions alive and receive status updates without sending messages.

**HTTP Method**: `POST`  
**URL**: `/api/messaging/sessions/{sessionId}/heartbeat`

**Path Parameters**
- `sessionId`: The unique identifier of the session

**Response Schema (200 OK)**
```json
{
  "sessionId": "string",
  "agentId": "string",
  "userId": "string",
  "createdAt": "string",
  "lastActivity": "string",
  "expiresAt": "string",
  "timeoutConfig": {
    "timeoutMinutes": 30,
    "autoRenew": true,
    "maxDurationMinutes": 180,
    "warningThresholdMinutes": 5
  },
  "renewalCount": 0,
  "timeRemaining": 0,
  "isNearExpiration": false
}
```

**Implementation Example**
```javascript
class SessionManager {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.heartbeatInterval = null;
    this.warningShown = false;
  }
  
  startHeartbeat(intervalMs = 5 * 60 * 1000) {
    this.heartbeatInterval = setInterval(async () => {
      try {
        const response = await this.sendHeartbeat();
        
        if (response.isNearExpiration && !this.warningShown) {
          this.onExpirationWarning(response.timeRemaining);
          this.warningShown = true;
        }
        
        if (response.timeRemaining > response.timeoutConfig.warningThresholdMinutes * 60000) {
          this.warningShown = false; // Reset warning flag
        }
      } catch (error) {
        this.stopHeartbeat();
        this.onSessionLost(error);
      }
    }, intervalMs);
  }
  
  async sendHeartbeat() {
    const response = await fetch(
      `/api/messaging/sessions/${this.sessionId}/heartbeat`,
      { method: 'POST' }
    );
    
    if (!response.ok) {
      throw new Error(`Heartbeat failed: ${response.status}`);
    }
    
    return response.json();
  }
}
```

**Status Codes**
- `200 OK`: Heartbeat successful, session status returned
- `401 Unauthorized`: Authentication failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Session not found
- `410 Gone`: Session has expired
- `500 Internal Server Error`: Unexpected server error

**Section sources**
- [Session Heartbeat.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Session Heartbeat.md)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L495-L558)

## Health Monitoring

### Sessions Health Check
Checks the health status of the sessions service and retrieves active session statistics.

**HTTP Method**: `GET`  
**URL**: `/api/messaging/sessions/health`

**Response Schema (200 OK)**
```json
{
  "status": "healthy",
  "activeSessions": 123,
  "timestamp": "2023-11-07T05:31:56Z",
  "expiringSoon": 123,
  "invalidSessions": 123,
  "uptime": 123
}
```

**Status Codes**
- `200 OK`: Health check successful
- `503 Service Unavailable`: Service is unhealthy

**Section sources**
- [Sessions Health Check.md](file://reference/elizaos/API Reference/Sessions API/Sessions API Reference/Sessions Health Check.md)

## Error Handling
The Sessions API uses specific error classes for precise error handling and recovery.

### Error Response Schema
```json
{
  "error": "string",
  "code": "string",
  "message": "string",
  "details": {}
}
```

### Common Error Types
- **SessionNotFoundError**: Returned when a session cannot be found (404)
- **SessionExpiredError**: Returned when a session has expired (410)
- **SessionRenewalError**: Returned when a session cannot be renewed (422)
- **ValidationError**: Returned when request parameters are invalid (400)

### Recovery Strategies
```javascript
class ResilientSessionClient {
  async sendMessage(content) {
    await this.ensureSession();
    
    const response = await fetch(
      `/api/messaging/sessions/${this.sessionId}/messages`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      }
    );
    
    if (!response.ok && (response.status === 404 || response.status === 410)) {
      // Session was lost, recreate and retry
      await this.createSession();
      return this.sendMessage(content);
    }
    
    return response.json();
  }
}
```

**Section sources**
- [Sessions Architecture Deep Dive.md](file://reference/elizaos/Deep Dive/Sessions Architecture Deep Dive.md#L421-L473)
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L434-L493)

## Session Configuration and Policies

### Timeout Policies
The system implements a hierarchical configuration system with three tiers:

1. **Session-specific config**: Per-session overrides
2. **Agent-specific config**: Agent defaults
3. **Global defaults**: System-wide defaults

**Configuration Hierarchy**
```typescript
const finalConfig = {
  ...globalDefaults,
  ...agentConfig,
  ...sessionConfig
};
```

**Timeout Parameters**
- `timeoutMinutes`: Inactivity timeout before session expires (5-1440 minutes)
- `autoRenew`: Whether the session automatically renews on each message
- `maxDurationMinutes`: Maximum total duration of the session
- `warningThresholdMinutes`: Time before expiration to trigger warnings

**Section sources**
- [Sessions Architecture Deep Dive.md](file://reference/elizaos/Deep Dive/Sessions Architecture Deep Dive.md#L50-L124)

### Message Retention
Messages are stored within the session's associated channel and are retained according to the following policies:

- Messages persist for the duration of the session
- When a session is terminated, all associated messages are cleaned up
- Message history is available via the Get Session Messages endpoint with cursor-based pagination
- No permanent message storage beyond session lifecycle

**Section sources**
- [Sessions Architecture Deep Dive.md](file://reference/elizaos/Deep Dive/Sessions Architecture Deep Dive.md#L50-L124)

### Rate Limiting
The API implements rate limiting to prevent abuse:

- **Per-session limits**: 60 requests per minute per session
- **Per-user limits**: 1000 requests per hour per user
- **Per-agent limits**: 5000 requests per hour per agent

Exceeding rate limits results in a 429 Too Many Requests response with a Retry-After header.

**Section sources**
- [Sessions API Guide.md](file://reference/elizaos/Guides/Sessions API Guide.md#L434-L493)

## Data Validation
The API performs comprehensive validation on all inputs:

### Session Metadata Validation
- Maximum size: 16KB
- Allowed types: string, number, boolean, object, array
- Nested objects limited to 5 levels deep

### Message Content Validation
- Maximum length: 10,000 characters
- Content must be non-empty
- Prohibited content: executable code, scripts, or malicious payloads

### Configuration Validation
- `timeoutMinutes`: 5-1440 (5 minutes to 24 hours)
- `maxDurationMinutes`: 1-4320 (1-72 hours)
- `warningThresholdMinutes`: 1-60

**Section sources**
- [Sessions Architecture Deep Dive.md](file://reference/elizaos/Deep Dive/Sessions Architecture Deep Dive.md#L421-L473)

## Sample Requests

### curl Examples

**Create Session**
```bash
curl -X POST "http://localhost:3000/api/messaging/sessions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "agentId": "agent-123",
    "userId": "user-456",
    "timeoutConfig": {
      "timeoutMinutes": 30,
      "autoRenew": true,
      "maxDurationMinutes": 180,
      "warningThresholdMinutes": 5
    }
  }'
```

**Send Message**
```bash
curl -X POST "http://localhost:3000/api/messaging/sessions/session-789/messages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "content": "Hello, how can I help you today?"
  }'
```

**Get Messages**
```bash
curl -X GET "http://localhost:3000/api/messaging/sessions/session-789/messages?limit=50" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Postman Examples

**Create Session Request**
- Method: POST
- URL: `{{base_url}}/api/messaging/sessions`
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer {{token}}
- Body (raw, JSON):
```json
{
  "agentId": "{{agent_id}}",
  "userId": "{{user_id}}",
  "timeoutConfig": {
    "timeoutMinutes": 30,
    "autoRenew": true,
    "maxDurationMinutes": 180,
    "warningThresholdMinutes": 5
  }
}
```

**Send Message Request**
- Method: POST
- URL: `{{base_url}}/api/messaging/sessions/{{session_id}}/messages`
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer {{token}}
- Body (raw, JSON):
```json
{
  "content": "This is a test message"
}
```