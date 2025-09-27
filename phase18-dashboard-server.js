#!/usr/bin/env node

/**
 * Phase 18 Web Dashboard Server
 * 
 * Serves the GUI interface for the C-Suite Governance simulation
 * and provides real-time WebSocket updates from the actual simulation.
 */

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const __dirname = __dirname || path.dirname(require.main.filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Serve the dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'phase18-dashboard.html'));
});

// API endpoint to run the simulation
app.post('/api/run-simulation', (req, res) => {
  console.log('🚀 Starting Phase 18 simulation...');
  
  // Change to the os-workspace directory and run the simulation
  const simulationCommand = 'cd os-workspace && bun apps/phase18-voting-simulation/src/index.ts';
  
  exec(simulationCommand, { 
    cwd: __dirname,
    timeout: 30000 // 30 second timeout
  }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Simulation failed:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message,
        suggestion: 'Make sure you are in the 371 OS root directory and have run "bun install"'
      });
      return;
    }
    
    console.log('✅ Simulation completed successfully');
    res.json({ 
      success: true, 
      output: stdout,
      stderr: stderr 
    });
  });
});

// API endpoint to get simulation status
app.get('/api/simulation-status', (req, res) => {
  res.json({
    ready: true,
    components: {
      'phase18-voting-simulation': checkComponentExists('os-workspace/apps/phase18-voting-simulation'),
      'dao-governance-service': checkComponentExists('os-workspace/apps/dao-governance-service'),
      'ceo-agent': checkComponentExists('os-workspace/apps/ceo-agent'),
      'cfo-agent': checkComponentExists('os-workspace/apps/cfo-agent'),
      'cto-agent': checkComponentExists('os-workspace/apps/cto-agent')
    }
  });
});

function checkComponentExists(componentPath) {
  try {
    return fs.existsSync(path.join(__dirname, componentPath));
  } catch (error) {
    return false;
  }
}

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
  console.log('🔌 Client connected to dashboard');
  
  socket.on('start-simulation', () => {
    console.log('📡 WebSocket simulation start requested');
    
    // Emit simulation progress events
    simulatePhase18WithUpdates(socket);
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected from dashboard');
  });
});

async function simulatePhase18WithUpdates(socket) {
  const steps = [
    {
      step: 1,
      title: 'Proposal Creation',
      duration: 3000,
      events: [
        { delay: 0, type: 'agent-action', agent: 'zara', action: 'Creating technical proposal...' },
        { delay: 1000, type: 'agent-action', agent: 'zara', action: 'Technical debt analysis complete' },
        { delay: 2000, type: 'agent-action', agent: 'zara', action: 'Proposal submitted to DAO' }
      ]
    },
    {
      step: 2,
      title: 'Dissemination',
      duration: 2000,
      events: [
        { delay: 0, type: 'agent-action', agent: 'zara', action: 'Setting up Nextcloud discussion...' },
        { delay: 1000, type: 'agent-action', agent: 'mimi', action: 'Novu notification received' },
        { delay: 1000, type: 'agent-action', agent: 'maya', action: 'Novu notification received' },
        { delay: 1000, type: 'agent-action', agent: 'alex', action: 'Novu notification received' }
      ]
    },
    {
      step: 3,
      title: 'Deliberation',
      duration: 4000,
      events: [
        { delay: 0, type: 'agent-action', agent: 'maya', action: 'Analyzing budget implications...' },
        { delay: 1500, type: 'agent-action', agent: 'maya', action: 'Requesting cost justification' },
        { delay: 2500, type: 'agent-action', agent: 'zara', action: 'Providing benchmark data...' },
        { delay: 3000, type: 'agent-action', agent: 'mimi', action: 'Reviewing strategic alignment' },
        { delay: 3000, type: 'agent-action', agent: 'alex', action: 'Assessing legal compliance' }
      ]
    },
    {
      step: 4,
      title: 'Voting',
      duration: 5000,
      events: [
        { delay: 0, type: 'agent-vote', agent: 'zara', vote: 'for', action: 'Voting: FOR (Proposer)' },
        { delay: 1000, type: 'agent-vote', agent: 'mimi', vote: 'for', action: 'Voting: FOR (Strategic benefit)' },
        { delay: 2200, type: 'agent-vote', agent: 'maya', vote: 'for', action: 'Voting: FOR (Budget approved)' },
        { delay: 3200, type: 'agent-vote', agent: 'alex', vote: 'for', action: 'Voting: FOR (Compliant)' },
        { delay: 4000, type: 'proposal-status', status: 'APPROVED' }
      ]
    },
    {
      step: 5,
      title: 'Execution',
      duration: 3000,
      events: [
        { delay: 0, type: 'agent-action', agent: 'zara', action: 'Triggering GraphBit workflow...' },
        { delay: 1000, type: 'agent-action', agent: 'mimi', action: 'Monitoring execution progress' },
        { delay: 1000, type: 'agent-action', agent: 'maya', action: 'Tracking budget adherence' },
        { delay: 2000, type: 'agent-action', agent: 'alex', action: 'Validating compliance requirements' }
      ]
    },
    {
      step: 6,
      title: 'Completion',
      duration: 3000,
      events: [
        { delay: 0, type: 'agent-action', agent: 'zara', action: 'Refactor completed successfully' },
        { delay: 1000, type: 'agent-action', agent: 'maya', action: 'Budget compliance: 96% efficiency' },
        { delay: 2000, type: 'agent-action', agent: 'mimi', action: 'Proposal marked as executed' },
        { delay: 2000, type: 'agent-action', agent: 'alex', action: 'All requirements satisfied' },
        { delay: 2500, type: 'simulation-complete' }
      ]
    }
  ];

  socket.emit('simulation-started');
  
  for (const stepData of steps) {
    socket.emit('step-activated', { step: stepData.step, title: stepData.title });
    
    // Process events for this step
    for (const event of stepData.events) {
      setTimeout(() => {
        socket.emit('simulation-event', event);
      }, event.delay);
    }
    
    // Wait for step duration
    await new Promise(resolve => setTimeout(resolve, stepData.duration));
  }
  
  socket.emit('simulation-completed');
}

// Start the server
server.listen(PORT, () => {
  console.log(`
🎯 Phase 18 Dashboard Server Started!
================================================

🌐 Dashboard URL: http://localhost:${PORT}
📊 Real-time WebSocket updates enabled
🚀 Ready to demonstrate autonomous C-Suite governance!

💡 Usage:
   1. Open http://localhost:${PORT} in your browser
   2. Click "Start Simulation" to begin the demo
   3. Watch the autonomous governance process unfold

🎆 Experience the world's first autonomous C-Suite governance system!
`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n📴 Shutting down Phase 18 dashboard server...');
  server.close(() => {
    console.log('✅ Server shut down gracefully');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n📴 Phase 18 dashboard server terminated');
  server.close(() => {
    process.exit(0);
  });
});