import express from 'express';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));
app.use(express.json());

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
      'phase18-voting-simulation': fs.existsSync(path.join(__dirname, 'os-workspace/apps/phase18-voting-simulation')),
      'dao-governance-service': fs.existsSync(path.join(__dirname, 'os-workspace/apps/dao-governance-service')),
      'ceo-agent': fs.existsSync(path.join(__dirname, 'os-workspace/apps/ceo-agent')),
      'cfo-agent': fs.existsSync(path.join(__dirname, 'os-workspace/apps/cfo-agent')),
      'cto-agent': fs.existsSync(path.join(__dirname, 'os-workspace/apps/cto-agent'))
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`
🎯 Phase 18 Dashboard Server Started!
================================================

🌐 Dashboard URL: http://localhost:${PORT}
📊 Interactive C-Suite Governance Visualization
🚀 Ready to demonstrate autonomous governance!

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
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n📴 Phase 18 dashboard server terminated');
  process.exit(0);
});