# QuestFlow API Server for 371-Minds/os

## Overview
The QuestFlow API Server provides RESTful endpoints for orchestrating workflows, coordinating C-Suite agents, and managing deployments within the 371OS ecosystem.

## Getting Started

### Prerequisites
- Bun package manager installed
- Node.js (Bun compatible)

### Installation
```bash
cd questflow
bun install
```

### Running the Server
```bash
# Development mode with hot reloading
bun run dev

# Production mode
bun run serve
```

The server will start on port 3001.

## API Endpoints

### 1. Workflow Management

#### Get Active Workflows
```http
GET /api/workflows/status
```

Returns a list of active workflows with their status and progress.

**Response:**
```json
[
  {
    "id": "workflow-1",
    "name": "Plugin Development",
    "status": "running",
    "progress": 75,
    "startTime": "2025-09-13T17:28:17.400Z"
  }
]
```

### 2. C-Suite Agent Coordination

#### Conduct C-Suite Meeting
```http
POST /api/agents/csuite/meeting
```

Initiates a coordination meeting between C-Suite agents.

**Response:**
```json
{
  "meetingId": "meeting-1757784629042",
  "participants": ["CEO", "CTO", "CFO", "CMO"],
  "agenda": ["Review quarterly performance", "Discuss new initiatives"],
  "outcomes": ["Agreed on Q4 priorities", "Allocated budget for new projects"],
  "duration": "45 minutes",
  "status": "completed",
  "timestamp": "2025-09-13T17:30:29.042Z"
}
```

### 3. Deployment Management

#### Deploy to Akash Network
```http
POST /api/deploy/akash
```

Initiates a deployment to the Akash Network with the provided configuration.

**Request Body:**
```json
{
  "name": "my-deployment",
  "config": {
    "cpu": 1,
    "memory": "1GB",
    "storage": "10GB"
  }
}
```

**Response:**
```json
{
  "success": true,
  "deploymentId": "akash-deployment-1757784629046",
  "status": "initiated",
  "message": "Deployment to Akash initiated successfully",
  "config": {
    "name": "my-deployment",
    "config": {
      "cpu": 1,
      "memory": "1GB",
      "storage": "10GB"
    }
  }
}
```

## Project Structure
```
questflow/
├── src/
│   ├── server.js          # Main server entry point
│   ├── orchestrator.js    # Workflow orchestration logic
│   └── agents/
│       └── csuite.js      # C-Suite agent coordination
├── package.json           # Project configuration
└── tsconfig.json          # TypeScript configuration
```

## Development

### Adding New Endpoints
1. Add the endpoint in `src/server.js`
2. Implement the logic in the appropriate module
3. Test with the provided test scripts

### Testing
```bash
# Test all API endpoints
bun test-api.js
```

## Integration with 371OS

The QuestFlow API Server integrates with 371OS by:
1. Coordinating C-Suite agents (CEO, CTO, CFO, CMO)
2. Managing workflow execution and monitoring
3. Handling deployments to the Akash Network for 97.6% cost reduction
4. Providing real-time status updates for all operations

## Troubleshooting

### Server Not Starting
- Ensure Bun is properly installed
- Check that port 3001 is not already in use
- Verify all dependencies are installed with `bun install`

### API Endpoints Not Responding
- Ensure the server is running
- Check the console logs for errors
- Verify the endpoint URL and HTTP method