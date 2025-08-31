#!/usr/bin/env node

/**
 * 371 OS Quick Status Check
 * Run this for instant system health overview
 */

console.log('🔍 371 OS QUICK STATUS CHECK');
console.log('============================');
console.log(`Timestamp: ${new Date().toISOString()}`);
console.log('');

const { execSync } = require('child_process');
const fs = require('fs');

function runCommand(cmd, description) {
  try {
    const result = execSync(cmd, { encoding: 'utf8', timeout: 5000 });
    console.log(`✅ ${description}: ${result.trim()}`);
    return true;
  } catch (error) {
    console.log(`❌ ${description}: Failed`);
    return false;
  }
}

function checkFile(path, description) {
  const exists = fs.existsSync(path);
  console.log(`${exists ? '✅' : '❌'} ${description}: ${exists ? 'Present' : 'Missing'}`);
  return exists;
}

// Core Environment
console.log('🔧 CORE ENVIRONMENT');
console.log('-------------------');
runCommand('node --version', 'Node.js');
runCommand('npm --version', 'NPM');

// Dependencies
console.log('\n📦 DEPENDENCIES');
console.log('---------------');
const nodeModulesExists = checkFile('node_modules', 'node_modules');
if (nodeModulesExists) {
  runCommand('npx nx --version', 'Nx CLI');
} else {
  console.log('⚠️ node_modules missing - run AB/scripts/simple-install.ps1');
}

// Project Structure
console.log('\n🏗️ PROJECT STRUCTURE');
console.log('--------------------');
checkFile('nx.json', 'Nx workspace config');
checkFile('packages/elizaos-plugins/nx-workspace/src/index.ts', 'ElizaOS plugin');
checkFile('agents/test-agent/character.json', 'Test agent');

// Scripts
console.log('\n⚡ DEPLOYMENT SCRIPTS');
console.log('--------------------');
checkFile('scripts/quick-start.ps1', 'Quick start script');
checkFile('AB/scripts/simple-install.ps1', 'Dependency recovery script');

// Milestone Tracking
console.log('\n📊 MILESTONE TRACKING');
console.log('---------------------');
checkFile('AB/milestone-tracker.md', 'Milestone tracker');
checkFile('AB/README.md', 'AB folder guide');

console.log('\n🎯 NEXT STEPS');
console.log('=============');
if (!nodeModulesExists) {
  console.log('1. Complete dependency installation');
  console.log('2. Run: powershell AB/scripts/simple-install.ps1');
} else {
  console.log('1. Test Nx: npx nx graph --file=test.json');
  console.log('2. Build plugin: npx nx build elizaos-plugin-nx-workspace');
  console.log('3. Test agent: node agents/test-agent/index.js');
}

console.log('\n📚 RESOURCES');
console.log('============');
console.log('• Project guide: AB/README.md');
console.log('• Milestones: AB/milestone-tracker.md'); 
console.log('• Troubleshooting: troubleshooting/');
console.log('• Session logs: AB/sessions/');

console.log('\n🚀 System ready for revolutionary AI development! 🤖');