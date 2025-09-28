// Context API endpoint for cross-agent memory
app.get('/agent-context', (req, res) => {
  const { agentId, chatId } = req.query;

  // Retrieve shared context from memory store
  const sharedContext = memoryStore.getSharedContext({
    agentId,
    chatId,
    includeHistory: true,
    maxTokens: 1000,
  });

  res.json({
    context: sharedContext,
    timestamp: Date.now(),
    source: 'electron-agent-manager',
  });
});
