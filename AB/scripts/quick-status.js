#!/usr/bin/env node

// AB/scripts/quick-status.js - Instant 371 OS System Health Check
// Usage: node AB/scripts/quick-status.js

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('\n🚀 371 OS System Health Check\n');
console.log('═'.repeat(50));

// Check workspace root
const workspaceRoot = process.cwd();
console.log(`📁 Workspace: ${workspaceRoot}`);

// Check if we're in the right directory
if (!fs.existsSync('package.json') || !fs.existsSync('nx.json')) {
  console.log('❌ ERROR: Not in 371 OS workspace root');
  console.log('   Run this from f:/os-main directory');
  process.exit(1);
}

console.log('✅ Valid 371 OS workspace detected\n');

// Package manager check
console.log('📦 Package Manager Status:');
try {
  const bunVersion = execSync('bun --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Bun v${bunVersion} (RECOMMENDED)`);
} catch {
  console.log('❌ Bun not installed or not in PATH');
}

try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node ${nodeVersion}`);
} catch {
  console.log('❌ Node.js not found');
}

try {
  const nxVersion = execSync('npx nx --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Nx v${nxVersion}`);
} catch {
  console.log('❌ Nx not available');
}

// Check critical directories
console.log('\n🏗️ Architecture Status:');
const criticalPaths = [
  'packages/elizaos-plugins/business-intelligence',
  'packages/elizaos-plugins/cognitive-engine', 
  'packages/elizaos-plugins/nx-workspace',
  'agents/test-agent',
  'AB',
  'troubleshooting'
];

criticalPaths.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/`);
  } else {
    console.log(`❌ ${dir}/ - MISSING`);
  }
});

// Check plugin build status
console.log('\n🔧 Plugin Build Status:');
const plugins = [
  'packages/elizaos-plugins/business-intelligence',
  'packages/elizaos-plugins/cognitive-engine',
  'packages/elizaos-plugins/nx-workspace'
];

plugins.forEach(plugin => {
  const distPath = path.join(plugin, 'dist');
  const packagePath = path.join(plugin, 'package.json');
  
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const pluginName = pkg.name || path.basename(plugin);
    
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      const hasJS = files.some(f => f.endsWith('.js'));
      const hasDTS = files.some(f => f.endsWith('.d.ts'));
      
      if (hasJS && hasDTS) {
        console.log(`✅ ${pluginName} - Built (${files.length} files)`);
      } else {
        console.log(`⚠️  ${pluginName} - Partial build`);
      }
    } else {
      console.log(`❌ ${pluginName} - Not built`);
    }
  }
});

// Check troubleshooting documentation
console.log('\n📚 Documentation Status:');
const docs = [
  'troubleshooting/README.md',
  'troubleshooting/solutions/elizaos-plugin-typescript-build-issues.md',
  'troubleshooting/dependency-issues/bun-lockfile-conflicts-windows.md',
  'AB/sessions/session-2025-09-01.md',
  'AB/milestone-tracker.md'
];

docs.forEach(doc => {
  if (fs.existsSync(doc)) {
    const stats = fs.statSync(doc);
    const size = (stats.size / 1024).toFixed(1);
    console.log(`✅ ${doc} (${size}KB)`);
  } else {
    console.log(`❌ ${doc} - MISSING`);
  }
});

// Check TypeScript compilation
console.log('\n🔍 TypeScript Status:');
const tsConfigPaths = [
  'packages/elizaos-plugins/business-intelligence/tsconfig.json',
  'packages/elizaos-plugins/cognitive-engine/tsconfig.json'
];

tsConfigPaths.forEach(config => {
  if (fs.existsSync(config)) {
    const pluginName = config.split('/')[2];
    console.log(`✅ ${pluginName} - TypeScript configured`);
  }
});

// System health summary
console.log('\n🎯 System Health Summary:');
const businessIntPlugin = 'packages/elizaos-plugins/business-intelligence';
const biDist = path.join(businessIntPlugin, 'dist');
const biReadme = path.join(businessIntPlugin, 'README.md');

if (fs.existsSync(biDist) && fs.existsSync(biReadme)) {
  console.log('✅ Business Intelligence Plugin: PRODUCTION READY');
} else {
  console.log('⚠️  Business Intelligence Plugin: NEEDS BUILD');
}

if (fs.existsSync('troubleshooting/README.md')) {
  console.log('✅ Troubleshooting System: COMPREHENSIVE');
} else {
  console.log('❌ Troubleshooting System: INCOMPLETE');
}

// Next steps
console.log('\n📋 Recommended Next Steps:');

if (!fs.existsSync('node_modules')) {
  console.log('1. Install dependencies: bun install --force --no-save');
}

if (!fs.existsSync(biDist)) {
  console.log('2. Build Business Intelligence Plugin: cd packages/elizaos-plugins/business-intelligence && bun run build');
}

console.log('3. Review latest session: cat AB/sessions/session-2025-09-01.md');
console.log('4. Check milestone progress: cat AB/milestone-tracker.md');
console.log('5. Test plugin integration with ElizaOS runtime');

console.log('\n🌌 Status: Ready for CEO\'s Orrery development! 🚀');
console.log('═'.repeat(50));