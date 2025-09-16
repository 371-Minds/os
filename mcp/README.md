# Cognition Layer MCP Configuration

This directory contains the configuration and testing tools for the Cognition Layer MCP (Model Context Protocol) server.

## Configuration

The [cognition-layer-mcp.json](file:///f:/os-main/mcp/cognition-layer-mcp.json) file contains the MCP server configuration for the cognition layer:

```json
{
  "mcpServers": {
    "cognition": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-http"],
      "env": {
        "MCP_SERVER_URL": "http://localhost:39300/model_context_protocol/2024-11-05/sse"
      }
    }
  }
}
```

## Testing

### Configuration Test

To verify the configuration is properly formatted:

```bash
node test-cognition-mcp.js
```

### Connection Test

To test the connection to the running cognition layer MCP server:

```bash
node connect-cognition-mcp.js
```

## Usage

The cognition layer MCP server provides context about the current cognitive state and can be used to enhance AI interactions with real-time cognitive awareness.

### Requirements

1. The cognition layer service must be running on `http://localhost:39300`
2. The endpoint `/model_context_protocol/2024-11-05/sse` must be accessible

### Integration

To integrate this MCP server with your application:

1. Ensure the cognition layer service is running
2. Use the configuration in your MCP client setup
3. Connect to the server using the Model Context Protocol

## Troubleshooting

If you encounter connection issues:

1. Verify the cognition layer service is running:
   ```bash
   curl http://localhost:39300/model_context_protocol/2024-11-05/sse
   ```

2. Check that no firewall is blocking the connection

3. Ensure the correct URL is being used in the configuration