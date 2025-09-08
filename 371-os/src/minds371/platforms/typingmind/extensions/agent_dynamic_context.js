// Dynamic context configuration for agent coordination
const agentContextConfig = {
  contextName: 'Agent Coordination Context',
  httpMethod: 'GET',
  endpointURL: 'http://localhost:3001/agent-context',
  headers: {
    Authorization: 'Bearer ${ELECTRON_BRIDGE_TOKEN}',
    'Content-Type': 'application/json',
  },
  cachePolicy: {
    enabled: true,
    duration: 30, // seconds
  },
  variables: {
    agentId: '{characterID}',
    chatId: '{chatID}',
    lastMessage: '{lastUserMessage}',
  },
};
