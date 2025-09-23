# Media API

<cite>
**Referenced Files in This Document**   
- [Upload media for agent.md](file://reference/elizaos/API Reference/Media/Upload media for agent.md) - *Updated in recent commit*
- [Upload media to channel.md](file://reference/elizaos/API Reference/Media/Upload media to channel.md) - *Updated in recent commit*
</cite>

## Update Summary
**Changes Made**   
- Updated documentation to reflect the latest Media API specifications
- Verified endpoint details, request parameters, and response schemas
- Confirmed authentication requirements and error handling procedures
- Validated supported media types and file size limits
- Updated curl command examples with proper multipart formatting

## Table of Contents
1. [Introduction](#introduction)
2. [Media Upload Endpoints](#media-upload-endpoints)
   - [Upload Media for Agent](#upload-media-for-agent)
   - [Upload Media to Channel](#upload-media-to-channel)
3. [Authentication and Security](#authentication-and-security)
4. [Supported Media Types and Limits](#supported-media-types-and-limits)
5. [Response Schema](#response-schema)
6. [Error Handling](#error-handling)
7. [Usage Examples](#usage-examples)
8. [Use Cases and Access Policies](#use-cases-and-access-policies)

## Introduction
The Media API in the 371OS platform enables agents and users to upload media files for various purposes, including agent-specific assets and shared channel content. This document provides comprehensive documentation for the two primary media upload operations: uploading media for agent use and uploading media to channels. The endpoints support multipart/form-data file uploads and return structured JSON responses containing media metadata.

## Media Upload Endpoints

### Upload Media for Agent
This endpoint allows uploading media files specifically for use by a designated agent.

**HTTP Method**: POST  
**URL Pattern**: `/api/media/{agentId}/upload-media`  

**Request Parameters**:
- **Path Parameters**:
  - `agentId`: (string, required, format: uuid) The unique identifier of the agent for whom the media is being uploaded.

**Request Body (multipart/form-data)**:
- `file`: (binary, required) The media file to upload.

**Response Schema (200 OK)**:
```json
{
  "id": "string (uuid)",
  "url": "string",
  "type": "string (enum: image, video)",
  "mimeType": "string",
  "size": "integer"
}
```

**Section sources**
- [Upload media for agent.md](file://reference/elizaos/API Reference/Media/Upload media for agent.md)

### Upload Media to Channel
This endpoint allows uploading media files to a specific communication channel.

**HTTP Method**: POST  
**URL Pattern**: `/api/messaging/channels/{channelId}/upload-media`  

**Request Parameters**:
- **Path Parameters**:
  - `channelId`: (string, required, format: uuid) The unique identifier of the channel where the media will be uploaded.

**Request Body (multipart/form-data)**:
- `file`: (binary, required) The media file to upload.
- `agentId`: (string, format: uuid) The ID of the agent performing the upload.

**Response Schema (200 OK)**:
```json
{
  "id": "string (uuid)",
  "url": "string",
  "channelId": "string (uuid)",
  "agentId": "string (uuid)",
  "type": "string (enum: image, video)",
  "mimeType": "string",
  "size": "integer"
}
```

**Section sources**
- [Upload media to channel.md](file://reference/elizaos/API Reference/Media/Upload media to channel.md)

## Authentication and Security
The 371OS platform employs a modern authentication approach that moves beyond traditional API key management. Instead of requiring users to manage API keys directly, the system implements agent identity delegation through cryptographically secure mechanisms. Users authenticate once using familiar methods (such as SSO or social login) and then delegate specific capabilities to agents through intuitive interfaces.

For enterprise deployments, the platform supports OAuth2-based authentication through a Secretless Broker configuration. The authentication flow includes:
- Token URL configuration via environment variables
- Client ID and secret for application identification
- Scoped permissions (e.g., "agent:execute", "blockchain:read")
- Bearer token authorization in the Authorization header

The system enforces least privilege access, ensuring agents are granted only the minimum required permissions for their specific tasks, with complete audit trails for all security-related operations.

**Section sources**
- [Upload media for agent.md](file://reference/elizaos/API Reference/Media/Upload media for agent.md)
- [Upload media to channel.md](file://reference/elizaos/API Reference/Media/Upload media to channel.md)

## Supported Media Types and Limits
The Media API supports the following media types:
- **Image**: Common image formats (JPEG, PNG, GIF, etc.)
- **Video**: Standard video formats (MP4, MOV, AVI, etc.)

**File Size Limits**:
- Maximum file size: 100MB
- Files exceeding this limit will result in a 413 (Payload Too Large) error response.

**Storage Duration**:
- Agent-specific media: Retained as long as the agent exists, with automatic cleanup upon agent deletion.
- Channel media: Retained according to channel retention policies, typically 90 days for standard channels.

## Response Schema
Both upload endpoints return a consistent response structure with the following fields:

**Success Response (200 OK)**:
- `id`: Unique identifier for the uploaded media (UUID format)
- `url`: Publicly accessible URL where the media can be retrieved
- `type`: Media type classification (image or video)
- `mimeType`: MIME type of the uploaded file
- `size`: File size in bytes
- `channelId` (channel upload only): ID of the channel where media was uploaded
- `agentId` (channel upload only): ID of the agent that performed the upload

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

## Error Handling
The Media API returns standardized error responses for various failure conditions:

**Common Status Codes**:
- **400 Bad Request**: Invalid request parameters or file type
- **404 Not Found**: Agent or channel not found (agent upload only)
- **413 Payload Too Large**: File exceeds maximum size limit (100MB)
- **415 Unsupported Media Type**: File format not supported
- **500 Internal Server Error**: Server-side error during upload processing

**Error Examples**:
- File size exceeded: `{"success": false, "error": {"code": "FILE_TOO_LARGE", "message": "File exceeds maximum size of 100MB", "details": "Uploaded file was 150MB"}}`
- Unsupported format: `{"success": false, "error": {"code": "UNSUPPORTED_MEDIA_TYPE", "message": "Unsupported media format", "details": "Format 'webp' is not supported"}}`
- Agent not found: `{"success": false, "error": {"code": "AGENT_NOT_FOUND", "message": "Agent does not exist", "details": "No agent found with ID: 3c90c3cc-0d44-4b50-8888-8dd25736052a"}}`

**Section sources**
- [Upload media for agent.md](file://reference/elizaos/API Reference/Media/Upload media for agent.md)
- [Upload media to channel.md](file://reference/elizaos/API Reference/Media/Upload media to channel.md)

## Usage Examples
**Sample curl command for uploading media for an agent**:
```bash
curl -X POST \
  http://localhost:3000/api/media/3c90c3cc-0d44-4b50-8888-8dd25736052a/upload-media \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/image.jpg"
```

**Sample curl command for uploading media to a channel**:
```bash
curl -X POST \
  http://localhost:3000/api/messaging/channels/3c90c3cc-0d44-4b50-8888-8dd25736052a/upload-media \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/video.mp4" \
  -F "agentId=3c90c3cc-0d44-4b50-8888-8dd25736052a"
```

**Required Headers**:
- `Content-Type: multipart/form-data`

## Use Cases and Access Policies
The Media API supports two distinct use cases with different access patterns:

**Agent-Specific Media**:
- Purpose: Store media assets for individual agent use (e.g., profile images, training materials, reference content)
- Access: Only the designated agent and authorized administrators can access these files
- Lifecycle: Tied to the agent's existence; deleted when the agent is removed
- Example: A marketing agent uploads brand guidelines and logo assets for campaign generation

**Channel Media**:
- Purpose: Share media content within communication channels (e.g., team chats, project rooms, broadcast channels)
- Access: Available to all participants in the channel according to channel permissions
- Lifecycle: Governed by channel retention policies; may be archived or deleted based on organizational rules
- Example: An agent uploads a product demo video to a customer support channel for team reference

The platform's credential warehouse system manages access control, ensuring that agents can only retrieve credentials and access media for which they have explicit permissions, following the principle of least privilege.

**Section sources**
- [Upload media for agent.md](file://reference/elizaos/API Reference/Media/Upload media for agent.md)
- [Upload media to channel.md](file://reference/elizaos/API Reference/Media/Upload media to channel.md)