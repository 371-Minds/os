# Socket.IO Real-time Connection

> Socket.IO connection for real-time bidirectional communication. The server uses Socket.IO v4.x for WebSocket transport with automatic fallback.

**Connection URL**: `ws://localhost:3000/socket.io/` (or `wss://` for secure connections)

**Socket.IO Client Connection Example**:
```javascript
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
```

**Events**:

### Client to Server Events:
- `join` - Join a room/channel
  ```json
  {
    "roomId": "uuid",
    "agentId": "uuid"
  }
  ```

- `leave` - Leave a room/channel
  ```json
  {
    "roomId": "uuid",
    "agentId": "uuid"
  }
  ```

- `message` - Send a message
  ```json
  {
    "text": "string",
    "roomId": "uuid",
    "userId": "uuid",
    "name": "string"
  }
  ```

- `request-world-state` - Request current state
  ```json
  {
    "roomId": "uuid"
  }
  ```

### Server to Client Events:
- `messageBroadcast` - New message broadcast
  ```json
  {
    "senderId": "uuid",
    "senderName": "string",
    "text": "string",
    "roomId": "uuid",
    "serverId": "uuid",
    "createdAt": "timestamp",
    "source": "string",
    "id": "uuid",
    "thought": "string",
    "actions": ["string"],
    "attachments": []
  }
  ```

- `messageComplete` - Message processing complete
  ```json
  {
    "channelId": "uuid",
    "serverId": "uuid"
  }
  ```

- `world-state` - World state update
  ```json
  {
    "agents": {},
    "users": {},
    "channels": {},
    "messages": {}
  }
  ```

- `logEntry` - Real-time log entry
  ```json
  {
    "level": "number",
    "time": "timestamp",
    "msg": "string",
    "agentId": "uuid",
    "agentName": "string"
  }
  ```

- `error` - Error event
  ```json
  {
    "error": "string",
    "details": {}
  }
  ```


## OpenAPI

````yaml get /websocket
paths:
  path: /websocket
  method: get
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path: {}
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '101':
      _mintlify/placeholder:
        schemaArray:
          - type: any
            description: Switching Protocols - WebSocket connection established
        examples: {}
        description: Switching Protocols - WebSocket connection established
  deprecated: false
  type: path
components:
  schemas: {}

````
