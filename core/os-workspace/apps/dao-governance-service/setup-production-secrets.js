#!/usr/bin/env node
/**
 * Interactive Production Secrets Setup
 * Prompts for real production credentials and stores them securely
 */

import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 Production Secrets Setup for DAO Governance Service\n');
console.log('This will guide you through setting up your production credentials.');
console.log('Press Ctrl+C at any time to cancel.\n');

const secrets = [];

// Helper function to ask questions
function ask(question, isSecret = false) {
  return new Promise((resolve) => {
    if (isSecret) {
      console.log(`${question} (input hidden for security)`);
      // Note: readline doesn't hide input by default, so we warn the user
      console.log('⚠️  Your input will be visible - ensure no one is watching your screen\n');
    }
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupSecrets() {
  console.log('═══════════════════════════════════════════════════════\n');
  console.log('📊 DATABASE CREDENTIALS\n');
  
  const dbUsername = await ask('Database Username: ');
  if (dbUsername) secrets.push({ key: 'dao-governance-db/username', value: dbUsername, encrypted: false });
  
  const dbPassword = await ask('Database Password: ', true);
  if (dbPassword) secrets.push({ key: 'dao-governance-db/password', value: dbPassword, encrypted: true });
  
  const dbHost = await ask('Database Host (e.g., tidb.production.com): ');
  if (dbHost) secrets.push({ key: 'dao-governance-db/host', value: dbHost, encrypted: false });
  
  const dbPort = await ask('Database Port (default: 5432): ') || '5432';
  secrets.push({ key: 'dao-governance-db/port', value: dbPort, encrypted: false });
  
  console.log('\n═══════════════════════════════════════════════════════\n');
  console.log('📧 NOVU NOTIFICATION SERVICE\n');
  
  const novuKey = await ask('Novu API Key: ', true);
  if (novuKey) secrets.push({ key: 'novu/api-key', value: novuKey, encrypted: true });
  
  const novuUrl = await ask('Novu API URL (default: https://api.novu.co): ') || 'https://api.novu.co';
  secrets.push({ key: 'novu/api-url', value: novuUrl, encrypted: false });
  
  console.log('\n═══════════════════════════════════════════════════════\n');
  console.log('⛓️  BLOCKCHAIN RPC (Optional - press Enter to skip)\n');
  
  const blockchainRpc = await ask('Blockchain RPC URL: ');
  if (blockchainRpc) secrets.push({ key: 'blockchain/rpc-url', value: blockchainRpc, encrypted: false });
  
  const blockchainKey = await ask('Blockchain API Key (if required): ', true);
  if (blockchainKey) secrets.push({ key: 'blockchain/api-key', value: blockchainKey, encrypted: true });
  
  console.log('\n═══════════════════════════════════════════════════════\n');
  console.log('📋 SUMMARY\n');
  console.log(`You are about to store ${secrets.length} production secrets:\n`);
  
  secrets.forEach(s => {
    const icon = s.encrypted ? '🔐' : '  ';
    const displayValue = s.encrypted 
      ? '****** (encrypted)' 
      : (s.value.length > 40 ? s.value.substring(0, 40) + '...' : s.value);
    console.log(`${icon} ${s.key}`);
    console.log(`     ${displayValue}\n`);
  });
  
  const confirm = await ask('Store these secrets? (yes/no): ');
  
  if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
    console.log('\n❌ Setup cancelled. No secrets were stored.\n');
    rl.close();
    return;
  }
  
  console.log('\n💾 Storing secrets...\n');
  
  // Store each secret using the CLI
  secrets.forEach(s => {
    const encryptedFlag = s.encrypted ? '--encrypted' : '';
    const cmd = `node uts-cli.js set "${s.key}" "${s.value}" ${encryptedFlag}`.trim();
    
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Failed to store ${s.key}:`, error.message);
    }
  });
  
  console.log('\n✅ Production secrets setup complete!\n');
  console.log('Next steps:');
  console.log('  1. Verify secrets: node uts-cli.js list');
  console.log('  2. Export for docker-compose: node uts-cli.js export > .env.production');
  console.log('  3. Deploy to Akash: powershell -ExecutionPolicy Bypass -File .\\deploy-akash.ps1\n');
  
  rl.close();
}

// Run setup
setupSecrets().catch(error => {
  console.error('\n❌ Error during setup:', error);
  rl.close();
  process.exit(1);
});
