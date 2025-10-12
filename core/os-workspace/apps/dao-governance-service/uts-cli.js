#!/usr/bin/env node
/**
 * UTS CLI - Universal Tool Server Command Line Interface
 * Simple tool for managing secrets locally during development
 * 
 * Usage:
 *   node uts-cli.js set <key> <value>     # Store a secret
 *   node uts-cli.js get <key>             # Retrieve a secret
 *   node uts-cli.js list                  # List all secrets
 *   node uts-cli.js delete <key>          # Delete a secret
 *   node uts-cli.js export                # Export secrets to .env format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local secrets storage file (for development only)
const SECRETS_FILE = path.join(__dirname, '.uts-secrets.json');

// Initialize secrets storage
function loadSecrets() {
  if (!fs.existsSync(SECRETS_FILE)) {
    return {};
  }
  try {
    const data = fs.readFileSync(SECRETS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error loading secrets:', error.message);
    return {};
  }
}

function saveSecrets(secrets) {
  try {
    fs.writeFileSync(SECRETS_FILE, JSON.stringify(secrets, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('❌ Error saving secrets:', error.message);
    return false;
  }
}

// Commands
function setSecret(key, value) {
  const secrets = loadSecrets();
  secrets[key] = {
    value,
    updated_at: new Date().toISOString()
  };
  
  if (saveSecrets(secrets)) {
    console.log(`✅ Secret stored: ${key}`);
  }
}
function getSecret(key) {
  const secrets = loadSecrets();
  if (secrets[key]) {
    console.log(`🔑 Secret: ${key}`);
    console.log(`   Value: ${secrets[key].value}`);
    console.log(`   Updated: ${secrets[key].updated_at}`);
    if (secrets[key].encrypted) {
      console.log('   🔐 Encrypted: Yes');
    }
  } else {
    console.log(`❌ Secret not found: ${key}`);
  }
}

function listSecrets() {
  const secrets = loadSecrets();
  const keys = Object.keys(secrets);
  
  if (keys.length === 0) {
    console.log('📋 No secrets stored');
    return;
  }
  
  console.log(`📋 Stored secrets (${keys.length}):\n`);
  keys.forEach(key => {
    const secret = secrets[key];
    const encrypted = secret.encrypted ? '🔐' : '  ';
    const value = secret.value.length > 30 
      ? secret.value.substring(0, 30) + '...' 
      : secret.value;
    console.log(`${encrypted} ${key}`);
    console.log(`     Value: ${value}`);
    console.log(`     Updated: ${secret.updated_at}\n`);
  });
}

function deleteSecret(key) {
  const secrets = loadSecrets();
  if (secrets[key]) {
    delete secrets[key];
    if (saveSecrets(secrets)) {
      console.log(`✅ Secret deleted: ${key}`);
    }
  } else {
    console.log(`❌ Secret not found: ${key}`);
  }
}

function exportSecrets() {
  const secrets = loadSecrets();
  const keys = Object.keys(secrets);
  
  if (keys.length === 0) {
    console.log('📋 No secrets to export');
    return;
  }
  
  console.log('# UTS Secrets Export');
  console.log('# Generated: ' + new Date().toISOString());
  console.log('# WARNING: Keep this file secure!\n');
  
  keys.forEach(key => {
    const envKey = key.toUpperCase().replace(/[\/\-]/g, '_');
    console.log(`${envKey}=${secrets[key].value}`);
  });
}

// Quick setup for DAO Governance Service
function quickSetup() {
  console.log('🚀 Quick Setup for DAO Governance Service\n');
  console.log('This will set up development secrets for local testing.\n');
  
  const defaultSecrets = {
    'dao-governance-db/username': 'test_user',
    'dao-governance-db/password': 'test_password',
    'dao-governance-db/host': 'test-database',
    'dao-governance-db/port': '5432',
    'novu/api-key': 'test_novu_api_key',
    'novu/api-url': 'https://api.novu.co',
    'blockchain/rpc-url': 'http://localhost:8545',
    'blockchain/api-key': 'test_blockchain_api_key'
  };
  
  const secrets = loadSecrets();
  let updated = 0;
  let skipped = 0;
  
  Object.entries(defaultSecrets).forEach(([key, value]) => {
    if (!secrets[key]) {
      secrets[key] = {
        value,
        encrypted: false,
        updated_at: new Date().toISOString()
      };
      console.log(`✅ Added: ${key}`);
      updated++;
    } else {
      console.log(`⏭️  Skipped (already exists): ${key}`);
      skipped++;
    }
  });
  
  if (saveSecrets(secrets)) {
    console.log(`\n🎉 Quick setup complete!`);
    console.log(`   Added: ${updated} secrets`);
    console.log(`   Skipped: ${skipped} existing secrets`);
    console.log('\n📝 To view all secrets, run: node uts-cli.js list');
  }
}

// Main CLI
const args = process.argv.slice(2);
const command = args[0];

console.log('🔐 UTS CLI - Universal Tool Server (Development Mode)\n');

switch (command) {
  case 'set':
    if (args.length < 3) {
      console.log('❌ Usage: node uts-cli.js set <key> <value> [--encrypted]');
      process.exit(1);
    }
    setSecret(args[1], args[2], args.includes('--encrypted'));
    break;
    
  case 'get':
    if (args.length < 2) {
      console.log('❌ Usage: node uts-cli.js get <key>');
      process.exit(1);
    }
    getSecret(args[1]);
    break;
    
  case 'list':
    listSecrets();
    break;
    
  case 'delete':
    if (args.length < 2) {
      console.log('❌ Usage: node uts-cli.js delete <key>');
      process.exit(1);
    }
    deleteSecret(args[1]);
    break;
    
  case 'export':
    exportSecrets();
    break;
    
  case 'quick-setup':
    quickSetup();
    break;
    
  case 'help':
  case '--help':
  case '-h':
  default:
    console.log('Usage:');
    console.log('  node uts-cli.js set <key> <value> [--encrypted]  # Store a secret');
    console.log('  node uts-cli.js get <key>                        # Retrieve a secret');
    console.log('  node uts-cli.js list                             # List all secrets');
    console.log('  node uts-cli.js delete <key>                     # Delete a secret');
    console.log('  node uts-cli.js export                           # Export to .env format');
    console.log('  node uts-cli.js quick-setup                      # Set up default secrets');
    console.log('  node uts-cli.js help                             # Show this help\n');
    console.log('Examples:');
    console.log('  node uts-cli.js quick-setup');
    console.log('  node uts-cli.js set dao-governance-db/username "myuser"');
    console.log('  node uts-cli.js set dao-governance-db/password "secret123" --encrypted');
    console.log('  node uts-cli.js get dao-governance-db/username');
    console.log('  node uts-cli.js list');
    console.log('  node uts-cli.js export > .env.local');
    break;
}
