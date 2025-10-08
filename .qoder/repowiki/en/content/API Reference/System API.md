# System API

<cite>
**Referenced Files in This Document**   
- [Basic health check.md](file://elizaos/API Reference/System/Basic health check.md)
- [Ping health check.md](file://elizaos/API Reference/System/Ping health check.md)
- [Get system status.md](file://elizaos/API Reference/System/Get system status.md)
- [Get server debug info.md](file://elizaos/API Reference/System/Get server debug info.md)
- [Get local environment variables.md](file://elizaos/API Reference/System/Get local environment variables.md)
- [Update local environment variables.md](file://elizaos/API Reference/System/Update local environment variables.md)
- [Stop the server.md](file://elizaos/API Reference/System/Stop the server.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Health Check Endpoints](#health-check-endpoints)
3. [System Status and Diagnostic Endpoints](#system-status-and-diagnostic-endpoints)
4. [Environment Variable Management](#environment-variable-management)
5. [Administrative Operations](#administrative-operations)
6. [Authentication and Access Control](#authentication-and-access-control)
7. [Error Handling and Status Codes](#error-handling-and-status-codes)
8. [Usage Examples and curl Commands](#usage-examples-and-curl-commands)
9. [Rate Limiting and Security Policies](#rate-limiting-and-security-policies)

## Introduction
The System API in the 371OS platform provides a suite of endpoints for monitoring, diagnosing, and administering the server environment. These endpoints enable system administrators and automated monitoring tools to verify server health, retrieve diagnostic information, manage environment variables, and perform critical administrative operations such as server shutdown. All endpoints are designed to support operational reliability and system observability in production environments.

The API endpoints are organized into functional categories including health checks, system status reporting, debug information retrieval, environment configuration, and server control. While the documentation indicates no explicit security requirements in the OpenAPI specifications, production deployments typically enforce admin-level authentication via API keys. This document details each endpoint's HTTP method, URL pattern, request parameters, response schema, and operational behavior.

**Section sources**
- [Basic health check.md](file://elizaos/API Reference/System/Basic health check.md)
- [Ping health check.md](file://elizaos/API Reference/System/Ping health check.md)

## Health Check Endpoints
The health check endpoints provide lightweight methods to verify server availability and responsiveness. These endpoints are typically used by load balancers, monitoring systems, and container orchestration platforms to determine service readiness and liveness.

### Basic Health Check
The basic health check endpoint returns a simple "Hello World!" message to confirm the server is running and able to process requests.

**Endpoint Details**
- **HTTP Method**: GET
- **URL Pattern**: `/api/server/hello`
- **Authentication**: None specified (typically public in development)
- **Request Parameters**: None
- **Request Headers**: None required

**Response Schema (200 OK)**
```json
{
  "message": "Hello World!"
}
```

This endpoint serves as a minimal "hello world" test to verify the server is operational at the application layer.

**Section sources**
- [Basic health check.md](file://elizaos/API Reference/System/Basic health check.md)

### Ping Health Check
The ping health check endpoint provides a timestamped response to verify server responsiveness and measure latency.

**Endpoint Details**
- **HTTP Method**: GET
- **URL Pattern**: `/api/server/ping`
- **Authentication**: None specified
- **Request Parameters**: None
- **Request Headers**: None required

**Response Schema (200 OK)**
```json
{
  "pong": true,
  "timestamp": 123
}
```

**Response Fields**
- `pong`: Boolean value always set to `true` when server is responsive
- `timestamp`: Integer representing current time in milliseconds

Unlike the basic health check, this endpoint includes timing information that can be used to calculate round-trip latency and monitor server responsiveness over time.

**Section sources**
- [Ping health check.md](file://elizaos/API Reference/System/Ping health check.md)

## System Status and Diagnostic Endpoints
These endpoints provide detailed information about the current system state, active components, and runtime environment.

### Get System Status
Retrieves comprehensive system status including agent count and current timestamp.

**Endpoint Details**
- **HTTP Method**: GET
- **URL Pattern**: `/api/server/status`
- **Authentication**: None specified
- **Request Parameters**: None
- **Request Headers**: None required

**Response Schema (200 OK)**
```json
{
  "status": "ok",
  "agentCount": 123,
  "timestamp": "2023-11-07T05:31:56Z"
}
```

**Response Fields**
- `status`: String indicating system health (e.g., "ok")
- `agentCount`: Integer representing number of active agents
- `timestamp`: ISO 8601 formatted date-time string

This endpoint provides a more comprehensive health assessment than the simple ping, including information about the workload (agent count) and precise timestamp.

**Section sources**
- [Get system status.md](file://elizaos/API Reference/System/Get system status.md)

### Get Server Debug Info
Retrieves detailed debug information about active servers and their associated agents.

**Endpoint Details**
- **HTTP Method**: GET
- **URL Pattern**: `/api/server/debug/servers`
- **Authentication**: None specified
- **Request Parameters**: None
- **Request Headers**: None required

**Response Schema (200 OK)**
```json
{
  "servers": [
    {
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "name": "<string>",
      "status": "<string>",
      "agents": [
        "3c90c3cc-0d44-4b50-8888-8dd25736052a"
      ]
    }
  ]
}
```

**Response Fields**
- `servers`: Array of server objects containing:
  - `id`: UUID identifier for the server
  - `name`: Server name
  - `status`: Current operational status
  - `agents`: Array of UUIDs representing active agents on the server

This debug endpoint is intended for troubleshooting and monitoring complex deployments with multiple server instances.

**Section sources**
- [Get server debug info.md](file://elizaos/API Reference/System/Get server debug info.md)

## Environment Variable Management
These endpoints allow for runtime inspection and modification of environment variables, enabling dynamic configuration management.

### Get Local Environment Variables
Retrieves the current environment variables configured in the system.

**Endpoint Details**
- **HTTP Method**: GET
- **URL Pattern**: `/api/server/servers`
- **Authentication**: None specified
- **Request Parameters**: None
- **Request Headers**: None required

**Response Schema (200 OK)**
```json
{
  "servers": [
    {
      "id": "<string>",
      "name": "<string>",
      "status": "<string>",
      "agents": [
        "<string>"
      ]
    }
  ]
}
```

**Note**: Despite the filename suggesting environment variable retrieval, the actual endpoint returns server information. This appears to be a documentation inconsistency.

**Section sources**
- [Get local environment variables.md](file://elizaos/API Reference/System/Get local environment variables.md)

### Update Local Environment Variables
Modifies environment variables in the `.env` file, allowing for dynamic configuration updates without manual file editing.

**Endpoint Details**
- **HTTP Method**: POST
- **URL Pattern**: `/api/system/environment/local`
- **Authentication**: None specified
- **Request Parameters**: None
- **Request Headers**: `Content-Type: application/json`

**Request Body Schema**
```json
{
  "content": {
    "KEY_NAME": "value",
    "ANOTHER_KEY": "another_value"
  }
}
```

**Request Fields**
- `content`: Object containing key-value pairs of environment variables to update

**Response Schema (200 OK)**
```json
{
  "success": true,
  "message": "Local env updated"
}
```

**Error Response (400 Bad Request)**
```json
{
  "success": false,
  "error": {
    "code": "<string>",
    "message": "<string>",
    "details": "<string>"
  }
}
```

**Error Response (500 Internal Server Error)**
```json
{
  "success": false,
  "error": {
    "code": "<string>",
    "message": "<string>",
    "details": "<string>"
  }
}
```

This endpoint enables automated configuration management and dynamic environment adjustments in response to operational requirements.

**Section sources**
- [Update local environment variables.md](file://elizaos/API Reference/System/Update local environment variables.md)

## Administrative Operations
These endpoints provide critical administrative functions for server management and control.

### Stop the Server
Initiates a graceful server shutdown process.

**Endpoint Details**
- **HTTP Method**: POST
- **URL Pattern**: `/api/server/stop`
- **Authentication**: None specified
- **Request Parameters**: None
- **Request Headers**: None required

**Request Body**: None

**Response Schema (200 OK)**
```json
{
  "message": "Server stopping..."
}
```

This endpoint triggers the server shutdown sequence, allowing for orderly termination of services and cleanup of resources. It should be used with caution in production environments.

**Section sources**
- [Stop the server.md](file://elizaos/API Reference/System/Stop the server.md)

## Authentication and Access Control
Based on the available documentation, none of the system endpoints specify security requirements in their OpenAPI definitions. However, in production deployments, these administrative endpoints typically require authentication and authorization controls.

**Expected Security Implementation**
- **Authentication**: Admin-level API keys or JWT tokens
- **Authorization**: Role-based access control (RBAC) with administrator privileges required
- **Transport Security**: HTTPS with TLS encryption
- **Access Restrictions**: Limited to trusted networks or IP ranges

The absence of security specifications in the documentation suggests these controls may be implemented at the infrastructure level (reverse proxy, API gateway) rather than within the application code itself.

**Section sources**
- [Basic health check.md](file://elizaos/API Reference/System/Basic health check.md)
- [Stop the server.md](file://elizaos/API Reference/System/Stop the server.md)

## Error Handling and Status Codes
The system endpoints use standard HTTP status codes to communicate operational outcomes. While most endpoints only document 200 OK responses, the Update Environment Variables endpoint provides comprehensive error handling documentation.

**HTTP Status Codes**
- **200 OK**: Operation completed successfully
- **400 Bad Request**: Invalid request format or parameters
- **500 Internal Server Error**: Server encountered an error while processing the request

The Update Local Environment Variables endpoint explicitly defines error responses with structured error objects containing code, message, and details fields, providing clear diagnostic information for troubleshooting configuration issues.

**Section sources**
- [Update local environment variables.md](file://elizaos/API Reference/System/Update local environment variables.md)

## Usage Examples and curl Commands
The following examples demonstrate how to interact with the System API using curl commands.

### Health Check Examples
```bash
# Basic health check
curl -X GET http://localhost:3000/api/server/hello

# Ping health check
curl -X GET http://localhost:3000/api/server/ping

# Get system status
curl -X GET http://localhost:3000/api/server/status
```

### Diagnostic and Management Examples
```bash
# Get server debug information
curl -X GET http://localhost:3000/api/server/debug/servers

# Update environment variables
curl -X POST http://localhost:3000/api/system/environment/local \
  -H "Content-Type: application/json" \
  -d '{
    "content": {
      "LOG_LEVEL": "debug",
      "MAINTENANCE_MODE": "false"
    }
  }'
```

### Administrative Operations
```bash
# Stop the server (use with caution)
curl -X POST http://localhost:3000/api/server/stop
```

**Section sources**
- [Basic health check.md](file://elizaos/API Reference/System/Basic health check.md)
- [Update local environment variables.md](file://elizaos/API Reference/System/Update local environment variables.md)
- [Stop the server.md](file://elizaos/API Reference/System/Stop the server.md)

## Rate Limiting and Security Policies
While not explicitly documented, production deployments should implement rate limiting and security policies to protect system endpoints from abuse and denial-of-service attacks.

**Recommended Policies**
- **Rate Limiting**: 100 requests per minute per IP address for diagnostic endpoints
- **Burst Limit**: 20 requests allowed in a short burst
- **Monitoring**: Log all access to administrative endpoints
- **Alerting**: Trigger alerts for repeated failed attempts to access protected endpoints
- **Read-Only Mode**: When server is in read-only mode, administrative endpoints (update, stop) should return 403 Forbidden

Diagnostic endpoints like health checks and status queries are typically rate-limited to prevent resource exhaustion, while administrative endpoints require stricter controls and audit logging.

**Section sources**
- [Get system status.md](file://elizaos/API Reference/System/Get system status.md)
- [Stop the server.md](file://elizaos/API Reference/System/Stop the server.md)