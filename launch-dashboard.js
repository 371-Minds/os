#!/usr/bin/env node

/**
 * Phase 18 Dashboard Quick Launcher
 * 
 * Cross-platform launcher for the C-Suite Governance Dashboard
 */

import { spawn } from 'child_process';
import { platform } from 'os';

console.log(`
🎯 Phase 18: C-Suite Governance Dashboard
==========================================

🚀 Starting the web-based GUI for autonomous C-Suite governance demonstration...

📊 Dashboard Features:
• Real-time visualization of C-Suite agents
• Interactive proposal timeline
• Live voting progress
• Workflow status tracking
• WebSocket-powered updates

🌐 Dashboard URL: http://localhost:3000
`);

// Install dependencies first
console.log('📦 Installing dependencies...');
const installProcess = spawn('bun', ['install'], { 
  stdio: 'inherit',
  shell: true 
});

installProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Dependencies installed successfully');
    console.log('🚀 Starting dashboard server...');
    
    // Start the dashboard server
    const serverProcess = spawn('bun', ['phase18-dashboard-server.js'], { 
      stdio: 'inherit',
      shell: true 
    });
    
    // Open browser after a delay
    setTimeout(() => {
      console.log('🌐 Opening dashboard in browser...');
      
      const openCommand = platform() === 'win32' ? 'start' : 
                         platform() === 'darwin' ? 'open' : 'xdg-open';
      
      spawn(openCommand, ['http://localhost:3000'], { 
        stdio: 'ignore',
        shell: true 
      });
    }, 3000);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down dashboard...');
      serverProcess.kill('SIGINT');
      process.exit(0);
    });
    
  } else {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
});