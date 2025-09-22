# Logs API

<cite>
**Referenced Files in This Document**   
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md)
- [Get agent logs.md](file://elizaos/API Reference/Logs/Get agent logs.md)
- [Clear system logs.md](file://elizaos/API Reference/Logs/Clear system logs.md)
- [Delete a specific log entry.md](file://elizaos/API Reference/Logs/Delete a specific log entry.md)
- [Get system logs (POST).md](file://elizaos/API Reference/Logs/Get system logs (POST).md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [System Logs Retrieval](#system-logs-retrieval)
3. [Agent-Specific Logs Retrieval](#agent-specific-logs-retrieval)
4. [Clearing System Logs](#clearing-system-logs)
5. [Deleting Individual Log Entries](#deleting-individual-log-entries)
6. [Log Entry Structure](#log-entry-structure)
7. [Authentication and Security](#authentication-and-security)
8. [Error Handling](#error-handling)
9. [Performance and Rate Limiting](#performance-and-rate-limiting)
10. [Usage Examples](#usage-examples)

## Introduction
The Logs API provides comprehensive access to system and agent-level logging data within the 371OS platform. This API enables administrators and monitoring systems to retrieve, filter, and manage log entries for debugging, auditing, and operational visibility. The API supports multiple retrieval methods, filtering options, and management operations including clearing logs and deleting specific entries.

**Section sources**
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md#L1-L147)
- [Get agent logs.md](file://elizaos/API Reference/Logs/Get agent logs.md#L1-L186)

## System Logs Retrieval
The system logs endpoint allows retrieval of platform-wide log entries with comprehensive filtering capabilities.

### GET /api/server/logs
Retrieves system logs with optional filtering parameters.

**HTTP Method**: `GET`  
**URL**: `/api/server/logs`

#### Request Parameters
**Query Parameters:**
- **since**: `integer` (optional) - Timestamp in milliseconds to retrieve logs from
- **level**: `enum<string>` (optional, default: "info") - Log level filter with options: "all", "trace", "debug", "info", "warn", "error", "fatal"
- **agentName**: `string` (optional) - Filter logs by agent name
- **agentId**: `string` (format: uuid, optional) - Filter logs by agent ID
- **limit**: `integer` (optional, default: 100, maximum: 1000) - Maximum number of log entries to return

#### Response Schema
**200 OK - Successful Response**
```json
{
  "logs": [
    {
      "level": 123,
      "time": 123,
      "msg": "string",
      "agentId": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "agentName": "string"
    }
  ],
  "count": 123,
  "total": 123,
  "level": "string",
  "levels": ["string"]
}
```

**500 Internal Server Error**
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

**Section sources**
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md#L1-L147)

### POST /api/server/logs
Alternative endpoint for retrieving system logs using POST method, allowing for more complex filtering in the request body.

**HTTP Method**: `POST`  
**URL**: `/api/server/logs`

#### Request Body
```json
{
  "since": 123,
  "level": "info",
  "agentName": "string",
  "agentId": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "limit": 100
}
```

#### Response Schema
Identical to the GET endpoint response schema.

**Section sources**
- [Get system logs (POST).md](file://elizaos/API Reference/Logs/Get system logs (POST).md#L1-L159)

## Agent-Specific Logs Retrieval
The agent logs endpoint provides access to logs associated with a specific agent.

### GET /api/agents/{agentId}/logs
Retrieves logs for a specific agent with filtering options.

**HTTP Method**: `GET`  
**URL**: `/api/agents/{agentId}/logs`

#### Path Parameters
- **agentId**: `string` (required, format: uuid) - ID of the agent to retrieve logs for

#### Request Parameters
**Query Parameters:**
- **since**: `integer` (optional) - Timestamp in milliseconds to retrieve logs from
- **until**: `integer` (optional) - Timestamp in milliseconds to retrieve logs until
- **level**: `enum<string>` (optional, default: "info") - Log level filter with options: "trace", "debug", "info", "warn", "error", "fatal"
- **limit**: `integer` (optional, default: 100, maximum: 1000) - Maximum number of log entries to return

#### Response Schema
**200 OK - Successful Response**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "level": 123,
        "time": 123,
        "msg": "string",
        "agentId": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
        "agentName": "string"
      }
    ],
    "count": 123
  }
}
```

**400 Bad Request**
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

**404 Not Found**
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

**500 Internal Server Error**
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

**Section sources**
- [Get agent logs.md](file://elizaos/API Reference/Logs/Get agent logs.md#L1-L186)

## Clearing System Logs
The clear logs endpoint allows administrators to remove all system logs.

### DELETE /api/server/logs
Clears all system logs from the platform.

**HTTP Method**: `DELETE`  
**URL**: `/api/server/logs`

#### Request Parameters
No parameters required.

#### Response Schema
**200 OK - Successful Response**
```json
{
  "status": "success",
  "message": "Logs cleared successfully"
}
```

**500 Internal Server Error**
```json
{
  "error": "string",
  "message": "string"
}
```

**Section sources**
- [Clear system logs.md](file://elizaos/API Reference/Logs/Clear system logs.md#L1-L64)

## Deleting Individual Log Entries
The delete log entry endpoint allows removal of specific log entries.

### DELETE /api/agents/{agentId}/logs/{logId}
Deletes a specific log entry for an agent.

**HTTP Method**: `DELETE`  
**URL**: `/api/agents/{agentId}/logs/{logId}`

#### Path Parameters
- **agentId**: `string` (required, format: uuid) - ID of the agent
- **logId**: `string` (required, format: uuid) - ID of the log entry to delete

#### Response Schema
**204 No Content** - Log entry deleted successfully (no response body)

**400 Bad Request**
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

**404 Not Found**
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

**500 Internal Server Error**
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

**Section sources**
- [Delete a specific log entry.md](file://elizaos/API Reference/Logs/Delete a specific log entry.md#L1-L123)

## Log Entry Structure
The LogEntry schema defines the structure of individual log entries returned by the API.

### LogEntry Schema
- **level**: `number` - Numeric representation of the log level
- **time**: `number` (format: int64) - Timestamp of the log entry in milliseconds
- **msg**: `string` - The log message content
- **agentId**: `string` (format: uuid) - ID of the related agent (if applicable)
- **agentName**: `string` - Name of the related agent (if applicable)

This structure is consistent across all log retrieval endpoints and provides essential information for debugging and monitoring system behavior.

**Section sources**
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md#L100-L147)
- [Get agent logs.md](file://elizaos/API Reference/Logs/Get agent logs.md#L130-L186)
- [Get system logs (POST).md](file://elizaos/API Reference/Logs/Get system logs (POST).md#L110-L159)

## Authentication and Security
Based on the available documentation, the Logs API endpoints do not specify security requirements in their OpenAPI specifications (security: []). This suggests that authentication mechanisms may be handled at the platform level or through external means. Given the sensitive nature of log data, it is expected that access to these endpoints requires administrative privileges, though specific authentication headers or token requirements are not documented in the provided files.

**Section sources**
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md#L6-L147)
- [Get agent logs.md](file://elizaos/API Reference/Logs/Get agent logs.md#L6-L186)

## Error Handling
The Logs API implements comprehensive error handling with standardized response formats for different error conditions.

### Common Error Responses
- **400 Bad Request**: Invalid parameters (e.g., malformed agent ID or log ID)
- **404 Not Found**: Resource not found (e.g., agent does not exist)
- **500 Internal Server Error**: Server-side errors during log retrieval or deletion operations

Error responses follow a consistent structure with success status, error code, message, and detailed information to facilitate troubleshooting.

**Section sources**
- [Get agent logs.md](file://elizaos/API Reference/Logs/Get agent logs.md#L60-L186)
- [Delete a specific log entry.md](file://elizaos/API Reference/Logs/Delete a specific log entry.md#L6-L123)

## Performance and Rate Limiting
While specific rate limiting policies are not documented in the available files, the API includes several performance-related constraints:

- Maximum limit of 1000 log entries per request
- Support for timestamp-based filtering to limit result sets
- Both GET and POST methods for log retrieval, allowing flexibility in query complexity

For optimal performance with large log datasets, clients should implement pagination using the limit parameter and timestamp filters to avoid overwhelming requests. The recommended polling interval for log monitoring is not specified but should be adjusted based on system load and monitoring requirements.

Log retention policies are not documented in the available files, but the presence of log clearing functionality suggests that administrators have control over log lifecycle management.

**Section sources**
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md#L30-L50)
- [Get agent logs.md](file://elizaos/API Reference/Logs/Get agent logs.md#L30-L50)

## Usage Examples
### Retrieve System Logs with Filtering
```bash
curl -X GET "http://localhost:3000/api/server/logs?since=1640995200000&level=error&limit=50"
```

### Retrieve Agent-Specific Logs
```bash
curl -X GET "http://localhost:3000/api/agents/3c90c3cc-0d44-4b50-8888-8dd25736052a/logs?since=1640995200000&until=1641081600000&level=warn&limit=100"
```

### Retrieve System Logs Using POST
```bash
curl -X POST "http://localhost:3000/api/server/logs" \
  -H "Content-Type: application/json" \
  -d '{
    "since": 1640995200000,
    "level": "error",
    "agentName": "cto_alex",
    "limit": 200
  }'
```

### Clear All System Logs
```bash
curl -X DELETE "http://localhost:3000/api/server/logs"
```

### Delete a Specific Log Entry
```bash
curl -X DELETE "http://localhost:3000/api/agents/3c90c3cc-0d44-4b50-8888-8dd25736052a/logs/a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8"
```

**Section sources**
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md#L1-L147)
- [Get agent logs.md](file://elizaos/API Reference/Logs/Get agent logs.md#L1-L186)
- [Clear system logs.md](file://elizaos/API Reference/Logs/Clear system logs.md#L1-L64)
- [Delete a specific log entry.md](file://elizaos/API Reference/Logs/Delete a specific log entry.md#L1-L123)
- [Get system logs (POST).md](file://elizaos/API Reference/Logs/Get system logs (POST).md#L1-L159)