// agent-coordinator-extension.js
(function() {
  'use strict';

  // Extension for TypingMind to coordinate with Electron agents
  class ElectronBridge {
    constructor() {
      this.electronChannel = null;
      this.initializeBridge();
    }

    initializeBridge() {
      // Check if running in Electron context
      if (window.electronAPI) {
        this.electronChannel = window.electronAPI;
        this.setupEventListeners();
      } else {
        // Fallback to WebSocket communication
        this.initializeWebSocketBridge();
      }
    }

    initializeWebSocketBridge() {
      const ws = new WebSocket('ws://localhost:8080/agent-bridge');
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleElectronMessage(data);
      };

      this.electronChannel = {
        send: (message) => ws.send(JSON.stringify(message)),
        on: (event, callback) => {
          ws.addEventListener('message', (msg) => {
            const data = JSON.parse(msg.data);
            if (data.type === event) {
              callback(data.payload);
            }
          });
        }
      };
    }

    setupEventListeners() {
      this.electronChannel.on('agent-task', (task) => {
        this.executeAgentTask(task);
      });

      this.electronChannel.on('context-update', (context) => {
        this.updateAgentContext(context);
      });
    }

    async executeAgentTask(task) {
      try {
        // Execute task within TypingMind context
        const result = await this.processTask(task);
        
        // Send result back to Electron
        this.electronChannel.send({
          type: 'task-result',
          taskId: task.id,
          result: result
        });
      } catch (error) {
        this.electronChannel.send({
          type: 'task-error',
          taskId: task.id,
          error: error.message
        });
      }
    }

    updateAgentContext(context) {
      // Update TypingMind agent with new context
      if (window.typingMindAPI) {
        window.typingMindAPI.updateContext(context);
      }
    }
  }

  // Initialize bridge when TypingMind loads
  window.addEventListener('load', () => {
    window.electronBridge = new ElectronBridge();
  });

})();

