# WebSocket API

<cite>
**Referenced Files in This Document**   
- [Socket.IO Real-time Connection.md](file://elizaos/API Reference/WebSocket/Socket.IO Real-time Connection.md)
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md)
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md)
- [Sessions API Reference.md](file://elizaos/API Reference/Sessions API/Sessions API Reference/Sessions API Reference.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Connection Establishment](#connection-establishment)
3. [Authentication Mechanism](#authentication-mechanism)
4. [Connection Lifecycle Events](#connection-lifecycle-events)
5. [Available Events](#available-events)
6. [Reconnection Strategy](#reconnection-strategy)
7. [Heartbeat Mechanism](#heartbeat-mechanism)
8. [Error Handling](#error-handling)
9. [Message Acknowledgment and Delivery](#message-acknowledgment-and-delivery)
10. [Code Examples](#code-examples)
11. [Disconnection Codes](#disconnection-codes)
12. [Connection Scaling and Performance](#connection-scaling-and-performance)
13. [Security Considerations](#security-considerations)

## Introduction
The WebSocket API in the 371OS platform provides real-time communication capabilities through Socket.IO, enabling bidirectional, low-latency messaging between clients and servers. This documentation details the complete WebSocket API implementation, including connection protocols, event handling, authentication, and integration patterns. The API supports both direct WebSocket communication and session-based interactions, with comprehensive error handling and reconnection strategies to ensure reliable real-time experiences.

## Connection Establishment
The WebSocket API uses Socket.IO for real-time communication between clients and the Eliza server. The connection is established through a standard WebSocket handshake that upgrades from HTTP to the WebSocket protocol.

**Connection URL**
- **Development**: `http://localhost:3000`
- **Production**: `wss://your-production-domain.com`

Clients connect to the WebSocket endpoint using the Socket.IO client library, which handles the underlying transport negotiation (supporting both WebSocket and HTTP long-polling as fallbacks).

```javascript
const socket = io(SOCKET_URL, {
  'force new connection': true,
  'reconnection': true,
  'reconnectionDelay': 1000,
  'reconnectionAttempts': 5,
  'timeout': 20000,
  'transports': ['polling', 'websocket']
});
```

The connection process follows these steps:
1. Client initiates connection to the WebSocket server
2. Server responds with connection established event
3. Client must join a specific room/channel to receive broadcasts
4. Real-time communication is established

**Section sources**
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md#L0-L51)
- [Socket.IO Real-time Connection.md](file://elizaos/API Reference/WebSocket/Socket.IO Real-time Connection.md#L104-L135)

## Authentication Mechanism
The WebSocket API implements authentication through entity and room identifiers rather than traditional API keys or tokens. Authentication is handled by including specific identifiers in the connection and message payloads.

**Authentication Parameters**
- **entityId**: Unique identifier for the connecting entity (e.g., extension, application)
- **roomId**: Identifier for the room or channel to join (typically matches agent or channel ID)

Authentication occurs in two phases:

1. **Connection Authentication**: When joining a room, the client sends its entityId and roomId:
```javascript
socket.emit('message', {
  type: 1, // ROOM_JOINING
  payload: {
    roomId: roomId,
    entityId: entityId
  }
});
```

2. **Message Authentication**: Each message includes the sender's credentials:
```javascript
{
  type: 2, // SEND_MESSAGE
  payload: {
    senderId: entityId,
    senderName: 'Extension User',
    message: text,
    roomId: roomId,
    messageId: generateUUID(),
    source: 'extension',
    attachments: [],
    metadata: {}
  }
}
```

This approach ensures that only authorized entities can join specific rooms and send messages, with the server validating the entityId and roomId against known agents and channels.

**Section sources**
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md#L97-L243)

## Connection Lifecycle Events
The WebSocket API exposes several lifecycle events that clients can listen to for connection state management.

### Client-Side Events
```javascript
// Connection established
socket.on('connect', function() {
  console.log('[SUCCESS] Connected to Eliza, socket ID:', socket.id);
});

// Connection error
socket.on('connect_error', function(error) {
  console.error('[ERROR] Connection error:', error);
});

// Disconnection
socket.on('disconnect', function(reason) {
  console.log('[DISCONNECTED] Reason:', reason);
});

// Connection established (specific event)
socket.on('connection_established', function(data) {
  console.log('[SUCCESS] Connection established:', data);
});
```

### Server-Side Events
The server emits lifecycle events to notify clients of connection status changes:
- **connect**: Emitted when the connection is successfully established
- **connect_error**: Emitted when connection fails
- **disconnect**: Emitted when the connection is closed
- **connection_established**: Confirmation that the connection is fully operational

The connection lifecycle follows this sequence:
1. Client attempts connection
2. Server validates connection parameters
3. Connection established event emitted
4. Client joins specific room/channel
5. Bidirectional communication enabled
6. On error or timeout, disconnect event emitted
7. Reconnection attempts begin (if configured)

**Section sources**
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md#L97-L243)

## Available Events
The WebSocket API supports bidirectional communication through a comprehensive event system.

### Client-to-Server Events
Clients can emit the following events to the server:

**Join Room**
```javascript
socket.emit('message', {
  type: 1, // ROOM_JOINING
  payload: {
    roomId: roomId,
    entityId: entityId
  }
});
```

**Send Message**
```javascript
socket.emit('message', {
  type: 2, // SEND_MESSAGE
  payload: {
    senderId: entityId,
    senderName: 'Extension User',
    message: text,
    roomId: roomId,
    messageId: generateUUID(),
    source: 'extension',
    attachments: [],
    metadata: {}
  }
});
```

### Server-to-Client Events
Servers broadcast the following events to clients:

**Receive Message Broadcast**
```javascript
socket.on('messageBroadcast', function(data) {
  if (data.roomId === roomId || data.channelId === roomId) {
    console.log('Received message:', data.text);
    console.log('From:', data.senderName);
  }
});
```

**Message Processing Complete**
```javascript
socket.on('messageComplete', function(data) {
  console.log('Message processing complete:', data);
});
```

**Session Expiration Warning**
```javascript
socket.on('sessionExpirationWarning', (data) => {
  console.warn(`Session expires in ${data.minutesRemaining} minutes`);
});
```

**Session Expired**
```javascript
socket.on('sessionExpired', (data) => {
  console.error('Session has expired');
});
```

**Session Renewed**
```javascript
socket.on('sessionRenewed', (data) => {
  console.log('Session renewed until:', data.expiresAt);
});
```

**Event Payload Structures**

*messageBroadcast Event*
```json
{
  "roomId": "string",
  "channelId": "string",
  "senderId": "string",
  "senderName": "string",
  "text": "string",
  "messageId": "string",
  "timestamp": "ISO 8601 datetime",
  "attachments": [],
  "metadata": {}
}
```

*sessionExpirationWarning Event*
```json
{
  "sessionId": "string",
  "minutesRemaining": "number"
}
```

*sessionExpired Event*
```json
{
  "sessionId": "string",
  "expiredAt": "ISO 8601 datetime"
}
```

*sessionRenewed Event*
```json
{
  "sessionId": "string",
  "expiresAt": "ISO 8601 datetime",
  "renewalCount": "number"
}
```

**Section sources**
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md#L97-L243)
- [Sessions API Reference.md](file://elizaos/API Reference/Sessions API/Sessions API Reference/Sessions API Reference.md#L374-L423)

## Reconnection Strategy
The WebSocket API implements a robust reconnection strategy to maintain reliable communication in unstable network conditions.

### Client-Side Reconnection Configuration
```javascript
const socket = io(SOCKET_URL, {
  'reconnection': true,
  'reconnectionDelay': 1000,
  'reconnectionAttempts': 5,
  'timeout': 20000
});
```

**Reconnection Parameters**
- **reconnection**: Enables automatic reconnection (default: true)
- **reconnectionDelay**: Initial delay between reconnection attempts in milliseconds (default: 1000)
- **reconnectionAttempts**: Maximum number of reconnection attempts before giving up (default: Infinity)
- **timeout**: Connection timeout in milliseconds

### Reconnection Process
1. Connection lost due to network issues or server restart
2. Client automatically attempts reconnection with exponential backoff
3. After successful reconnection, client must rejoin the room
4. Server may send missed events or require client to resynchronize state

### Manual Reconnection Handling
```javascript
// Listen for disconnect events
socket.on('disconnect', function(reason) {
  if (reason === 'io server disconnect') {
    // Server has disconnected, need to reconnect manually
    socket.connect();
  }
  // Else, the disconnection was initiated by the client or was a network error
  // and automatic reconnection is in progress
});

// Handle reconnection success
socket.on('reconnect', function(attemptNumber) {
  console.log(`Reconnected after ${attemptNumber} attempts`);
  // Rejoin room after reconnection
  socket.emit('message', {
    type: 1,
    payload: {
      roomId: roomId,
      entityId: entityId
    }
  });
});
```

The reconnection strategy ensures that transient network issues do not permanently disrupt the real-time communication channel, with configurable parameters to balance responsiveness and network load.

**Section sources**
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md#L97-L243)

## Heartbeat Mechanism
The WebSocket API implements a heartbeat mechanism to maintain connection health and manage session state.

### Session-Based Heartbeat
For session-managed interactions, clients implement periodic heartbeat requests:

```javascript
class SessionManager {
  startHeartbeat(intervalMs = 60000) {
    this.heartbeatInterval = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/messaging/sessions/${this.sessionId}/heartbeat`,
          { method: 'POST' }
        );
        
        const status = await response.json();
        
        if (status.isNearExpiration && !this.warningShown) {
          this.onExpirationWarning(status.timeRemaining);
          this.warningShown = true;
        }
      } catch (error) {
        this.stopHeartbeat();
        this.onSessionLost(error);
      }
    }, intervalMs);
  }
}
```

### WebSocket Heartbeat Events
The server also emits heartbeat-related events through the WebSocket connection:

```javascript
// Session expiration warning
socket.on('sessionExpirationWarning', (data) => {
  console.warn(`Session expires in ${data.minutesRemaining} minutes`);
});

// Session expired
socket.on('sessionExpired', (data) => {
  console.error('Session has expired');
});

// Session renewed
socket.on('sessionRenewed', (data) => {
  console.log('Session renewed until:', data.expiresAt);
});
```

### Heartbeat Configuration
- **Interval**: Typically 60 seconds for active sessions
- **Purpose**: 
  - Maintain session activity
  - Receive expiration warnings
  - Trigger automatic session renewal (if configured)
  - Monitor connection health

The heartbeat mechanism prevents session timeouts during active conversations and provides clients with advance warning of impending session expiration, allowing for graceful handling of session state.

**Section sources**
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md#L669-L750)
- [Sessions API Reference.md](file://elizaos/API Reference/Sessions API/Sessions API Reference/Sessions API Reference.md#L374-L423)

## Error Handling
The WebSocket API implements comprehensive error handling for both connection issues and application-level errors.

### Connection Errors
```javascript
// Connection error handling
socket.on('connect_error', function(error) {
  console.error('[ERROR] Connection error:', error);
});

socket.on('disconnect', function(reason) {
  console.log('[DISCONNECTED] Reason:', reason);
});
```

### API Error Classes
The Sessions API uses specific error classes for different scenarios:

- **SessionNotFoundError**: Session does not exist
- **SessionExpiredError**: Session has exceeded its timeout
- **SessionCreationError**: Failed to create session
- **AgentNotFoundError**: Specified agent not found
- **InvalidUuidError**: Invalid UUID format
- **MissingFieldsError**: Required fields missing
- **InvalidContentError**: Message content validation failed
- **InvalidMetadataError**: Metadata exceeds size limit
- **InvalidPaginationError**: Invalid pagination parameters
- **InvalidTimeoutConfigError**: Invalid timeout configuration
- **SessionRenewalError**: Cannot renew session
- **MessageSendError**: Failed to send message

### Error Handling Pattern
```javascript
try {
  const response = await fetch(`/api/messaging/sessions/${sessionId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message })
  });

  if (!response.ok) {
    const error = await response.json();
    
    switch (response.status) {
      case 404:
        // Session not found
        console.error('Session not found:', error.details);
        break;
        
      case 410:
        // Session expired
        console.error('Session expired at:', error.details.expiresAt);
        break;
        
      case 400:
        // Validation error
        if (error.error.includes('content')) {
          console.error('Invalid message content');
        }
        break;
        
      case 422:
        // Session cannot be renewed
        console.error('Max duration reached:', error.details);
        break;
        
      default:
        console.error('Error:', error.message);
    }
  }
} catch (error) {
  console.error('Network error:', error);
}
```

### Common Issues and Solutions
1. **Session Not Found (404)**: Create a new session and retry
2. **Session Expired (410)**: Create a new session or adjust timeout configuration
3. **Cannot Renew Session (422)**: Session has reached maximum duration limit; create a new session
4. **Invalid Timeout Configuration (400)**: Ensure timeout values are within allowed range (5-1440 minutes)
5. **Agent Not Available**: Verify agent is started and agent ID is correct

**Section sources**
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md#L400-L600)
- [Sessions API Reference.md](file://elizaos/API Reference/Sessions API/Sessions API Reference/Sessions API Reference.md#L374-L423)

## Message Acknowledgment and Delivery
The WebSocket API implements message acknowledgment patterns to ensure reliable message delivery.

### Message Structure with Acknowledgment
```javascript
{
  type: 2, // SEND_MESSAGE
  payload: {
    senderId: entityId,
    senderName: 'Extension User',
    message: text,
    roomId: roomId,
    messageId: generateUUID(), // Unique message identifier
    source: 'extension',
    attachments: [],
    metadata: {}
  }
}
```

### Server Acknowledgment
The server acknowledges message receipt through the `messageComplete` event:

```javascript
socket.on('messageComplete', function(data) {
  console.log('[SUCCESS] Message processing complete:', data);
});
```

### Guaranteed Delivery Pattern
For critical messages requiring guaranteed delivery, implement a retry mechanism:

```javascript
class ResilientMessageSender {
  async sendMessage(content, maxRetries = 3) {
    const messageId = generateUUID();
    let attempts = 0;
    
    while (attempts < maxRetries) {
      try {
        const response = await this.attemptSendMessage(content, messageId);
        
        if (response.success) {
          return response;
        }
      } catch (error) {
        attempts++;
        if (attempts >= maxRetries) {
          throw new Error(`Failed to send message after ${maxRetries} attempts`);
        }
        
        // Exponential backoff
        await this.delay(Math.pow(2, attempts) * 1000);
      }
    }
  }
  
  async attemptSendMessage(content, messageId) {
    const response = await fetch(
      `/api/messaging/sessions/${this.sessionId}/messages`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content, 
          messageId 
        })
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

The message acknowledgment system ensures that clients can verify message delivery and implement retry logic for critical communications, providing a reliable messaging foundation.

**Section sources**
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md#L244-L265)
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md#L669-L750)

## Code Examples
This section provides complete examples of WebSocket API integration in JavaScript and Python.

### JavaScript Example
```javascript
// Complete WebSocket integration example
const SOCKET_URL = 'http://localhost:3000';

class WebSocketClient {
  constructor(entityId, roomId) {
    this.entityId = entityId;
    this.roomId = roomId;
    this.socket = null;
    this.sessionId = null;
    this.heartbeatInterval = null;
  }
  
  connect() {
    this.socket = io(SOCKET_URL, {
      'force new connection': true,
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionAttempts': 5,
      'timeout': 20000,
      'transports': ['polling', 'websocket']
    });
    
    this.setupEventHandlers();
  }
  
  setupEventHandlers() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.joinRoom();
    });
    
    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
    
    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
    });
    
    this.socket.on('messageBroadcast', (data) => {
      if (data.roomId === this.roomId || data.channelId === this.roomId) {
        console.log('Received message:', data.text);
      }
    });
    
    this.socket.on('sessionExpirationWarning', (data) => {
      console.warn(`Session expires in ${data.minutesRemaining} minutes`);
    });
    
    this.socket.on('sessionExpired', (data) => {
      console.error('Session has expired');
    });
  }
  
  joinRoom() {
    this.socket.emit('message', {
      type: 1, // ROOM_JOINING
      payload: {
        roomId: this.roomId,
        entityId: this.entityId
      }
    });
  }
  
  sendMessage(text) {
    const messagePayload = {
      type: 2, // SEND_MESSAGE
      payload: {
        senderId: this.entityId,
        senderName: 'Web Client',
        message: text,
        roomId: this.roomId,
        messageId: this.generateUUID(),
        source: 'web',
        attachments: [],
        metadata: {}
      }
    };
    
    this.socket.emit('message', messagePayload);
  }
  
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

// Usage
const client = new WebSocketClient('user-123', 'agent-456');
client.connect();

// Send a message after connection
client.socket.on('connect', () => {
  client.sendMessage('Hello from JavaScript client!');
});
```

### Python Example
```python
import socketio
import asyncio
import uuid
import time

class WebSocketClient:
    def __init__(self, entity_id, room_id):
        self.entity_id = entity_id
        self.room_id = room_id
        self.sio = socketio.AsyncClient()
        self.session_id = None
        self.setup_event_handlers()
    
    def setup_event_handlers(self):
        @self.sio.event
        async def connect():
            print('Connected to server')
            await self.join_room()
        
        @self.sio.event
        async def connect_error(self, error):
            print(f'Connection error: {error}')
        
        @self.sio.event
        async def disconnect():
            print('Disconnected from server')
        
        @self.sio.on('messageBroadcast')
        async def on_message_broadcast(data):
            if data.get('roomId') == self.room_id or data.get('channelId') == self.room_id:
                print(f'Received message: {data.get("text")}')
        
        @self.sio.on('sessionExpirationWarning')
        async def on_session_expiration_warning(data):
            minutes_remaining = data.get('minutesRemaining', 0)
            print(f'Session expires in {minutes_remaining} minutes')
        
        @self.sio.on('sessionExpired')
        async def on_session_expired(data):
            print(f'Session has expired: {data}')
    
    async def join_room(self):
        await self.sio.emit('message', {
            'type': 1,  # ROOM_JOINING
            'payload': {
                'roomId': self.room_id,
                'entityId': self.entity_id
            }
        })
    
    async def send_message(self, text):
        message_payload = {
            'type': 2,  # SEND_MESSAGE
            'payload': {
                'senderId': self.entity_id,
                'senderName': 'Python Client',
                'message': text,
                'roomId': self.room_id,
                'messageId': str(uuid.uuid4()),
                'source': 'python',
                'attachments': [],
                'metadata': {}
            }
        }
        
        await self.sio.emit('message', message_payload)
    
    async def connect(self):
        await self.sio.connect('http://localhost:3000')
        await self.sio.wait()
    
    async def disconnect(self):
        await self.sio.disconnect()

# Usage
async def main():
    client = WebSocketClient('user-123', 'agent-456')
    
    # Run client in background
    task = asyncio.create_task(client.connect())
    
    # Wait for connection
    await asyncio.sleep(2)
    
    # Send a message
    await client.send_message('Hello from Python client!')
    
    # Keep connection alive for a while
    await asyncio.sleep(10)
    
    # Disconnect
    await client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
```

**Section sources**
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md#L97-L243)

## Disconnection Codes
The WebSocket API uses standard Socket.IO disconnection codes to indicate the reason for connection termination.

### Standard Disconnection Reasons
- **io server disconnect**: The server has forcefully disconnected the client
- **io client disconnect**: The client has voluntarily disconnected
- **ping timeout**: The client did not respond to a ping from the server
- **transport close**: The underlying transport has been closed
- **transport error**: The underlying transport has encountered an error

### Handling Disconnection Codes
```javascript
socket.on('disconnect', function(reason) {
  switch (reason) {
    case 'io server disconnect':
      // Server has disconnected, need to reconnect manually
      console.log('Server disconnected the client');
      socket.connect();
      break;
      
    case 'io client disconnect':
      // Client has disconnected voluntarily
      console.log('Client disconnected voluntarily');
      break;
      
    case 'ping timeout':
      // Network issues - client didn't respond to ping
      console.log('Ping timeout - possible network issues');
      // Reconnection will be attempted automatically
      break;
      
    case 'transport close':
    case 'transport error':
      // Transport layer issues
      console.log('Transport layer issue:', reason);
      // Reconnection will be attempted automatically
      break;
      
    default:
      console.log('Disconnected:', reason);
  }
});
```

Understanding these disconnection codes helps clients implement appropriate reconnection strategies and provide meaningful feedback to users about connection status changes.

**Section sources**
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md#L97-L243)

## Connection Scaling and Performance
The WebSocket API supports connection scaling and performance optimization for high-concurrency scenarios.

### Connection Limits
- **Per Client**: No explicit limit on concurrent connections per client
- **Per Server**: Depends on server resources and configuration
- **Rate Limiting**: Currently not implemented in the Sessions API

### Performance Optimization
```javascript
// Optimize connection configuration
const socket = io(SOCKET_URL, {
  // Reduce reconnection delay for faster recovery
  'reconnectionDelay': 500,
  // Limit reconnection attempts to prevent infinite loops
  'reconnectionAttempts': 10,
  // Use WebSocket transport only for better performance
  'transports': ['websocket'],
  // Disable unnecessary features
  'upgrade': true,
  'autoConnect': true
});
```

### Scaling Recommendations
1. **Connection Pooling**: Maintain persistent connections rather than creating new ones for each interaction
2. **Batching**: Combine multiple messages into single transmissions when possible
3. **Compression**: Enable WebSocket compression if supported by the client and server
4. **Load Balancing**: Use a load balancer with sticky sessions for multi-server deployments
5. **Monitoring**: Implement connection monitoring to detect and address performance bottlenecks

### Session Management for Performance
For session-based interactions, optimize session configuration:

```javascript
// Configure appropriate timeouts
const sessionConfig = {
  timeoutMinutes: 30,           // Shorter for quick interactions
  autoRenew: true,              // Enable auto-renewal for active conversations
  maxDurationMinutes: 180,      // Prevent indefinite sessions
  warningThresholdMinutes: 5    // Notify before expiration
};
```

These optimization strategies ensure that the WebSocket API can handle high volumes of concurrent connections while maintaining responsive real-time communication.

**Section sources**
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md#L669-L750)

## Security Considerations
The WebSocket API implements several security measures to protect real-time communication.

### Origin Restrictions
- **CORS Configuration**: The server should be configured to accept connections only from trusted origins
- **Origin Validation**: Validate the Origin header on connection requests
- **Whitelisting**: Maintain a whitelist of approved domains for WebSocket connections

### Message Validation
All incoming messages are validated for:
- **Structure**: Ensuring required fields are present
- **Content**: Validating message content and metadata
- **Size**: Enforcing limits on message and metadata size
- **Format**: Validating UUIDs and other structured data

### Authentication and Authorization
- **Entity Verification**: Validate entityId against known entities
- **Room Access Control**: Ensure clients can only join rooms they are authorized to access
- **Message Source Verification**: Verify senderId matches the connecting entity

### Secure Communication
- **Encryption**: Use WSS (WebSocket Secure) in production environments
- **Secure Cookies**: If using cookies for authentication, ensure they are marked as secure
- **Input Sanitization**: Sanitize all message content to prevent XSS attacks

### Best Practices
1. **Use Secure Connections**: Always use WSS in production
2. **Validate All Input**: Never trust client-provided data
3. **Implement Rate Limiting**: Prevent abuse and denial-of-service attacks
4. **Monitor Connections**: Log and monitor connection attempts for suspicious activity
5. **Keep Dependencies Updated**: Regularly update Socket.IO and related dependencies

These security considerations ensure that the WebSocket API provides a secure foundation for real-time communication while protecting against common web vulnerabilities.

**Section sources**
- [Socket.IO Integration Guide.md](file://elizaos/Guides/Socket.IO Integration Guide.md#L447-L454)
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md#L669-L750)