#!/usr/bin/env node

/**
 * Phase 18 Demo Script
 * 
 * Quick demonstration of the C-Suite Voting Simulation & Governance Integration
 */

console.log(`
🎯 371 OS - Phase 18: C-Suite Voting Simulation Demo
================================================

This demo showcases the world's first autonomous C-Suite governance system
where AI agents autonomously propose, debate, vote on, and execute strategic 
business decisions.

🎭 Meet the C-Suite Agents:
• CEO Mimi  - Strategic visionary with balanced risk approach  
• CTO Zara  - Technical innovator with high risk tolerance
• CFO Maya  - Financial analyst with conservative approach
• CLO Alex  - Legal compliance with security focus

📋 Demo Scenario:
CTO Zara identifies technical debt in legacy-python-utils and proposes
refactoring to modern core-utils package with Bun + TypeScript for
10x performance improvement and enhanced maintainability.

🔄 Complete Governance Cycle:
1. Technical debt identification & proposal creation
2. Nextcloud discussion setup & Novu notifications  
3. C-Suite deliberation with financial & legal analysis
4. Autonomous voting with personality-driven decisions
5. GraphBit workflow execution with real-time tracking
6. Completion validation with budget compliance

⚡ To run the full simulation:
   cd os-workspace
   bun apps/phase18-voting-simulation/src/index.ts

🌐 To run with GUI Dashboard:
   bun dashboard              # Start web server
   # OR
   bun launch-dashboard.js    # Auto-install & open browser
   # OR
   powershell -ExecutionPolicy Bypass -File start-phase18-dashboard.ps1

📊 Expected Results:
• End-to-end execution in 15-20 seconds
• 100% C-Suite participation (4 agents)
• Unanimous approval (4 FOR, 0 AGAINST)  
• 96%+ budget efficiency with CFO oversight
• Complete 3-phase execution workflow
• Revolutionary autonomous business operations!

🎆 ACHIEVEMENT: World's First Autonomous C-Suite Governance System! 🎆
`);

// Check if we're in the right directory
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const simulationPath = path.join(__dirname, 'os-workspace', 'apps', 'phase18-voting-simulation');

if (fs.existsSync(simulationPath)) {
  console.log(`
✅ Phase 18 simulation detected at: ${simulationPath}
🚀 Ready to run autonomous C-Suite governance demonstration!

💡 Quick Start Commands:
   cd os-workspace
   bun apps/phase18-voting-simulation/src/index.ts

📚 Documentation: 
   cat os-workspace/apps/phase18-voting-simulation/README.md
`);
} else {
  console.log(`
⚠️  Phase 18 simulation not found. 
📁 Expected location: ${simulationPath}
🔧 Please ensure you're running from the 371 OS root directory.
`);
}

console.log(`
🌟 371 OS represents the future of autonomous business operations!
🏢 Ready for enterprise deployment and revolutionary market impact.

---
371 Minds OS - Cognitive Operating Environment
https://github.com/371-Minds/os
`);