# UTS CLI - Quick Reference Guide

A simple command-line tool for managing secrets locally during development of the DAO Governance Service.

---

## 🚀 Quick Start

### 1. Set Up Default Secrets (Recommended for First Time)

```bash
cd f:\os-main\core\os-workspace\apps\dao-governance-service
node uts-cli.js quick-setup
```

This will create default development secrets for:
- Database connection (username, password, host, port)
- Novu API (api-key, api-url)
- Blockchain RPC (rpc-url, api-key)

### 2. View All Secrets

```bash
node uts-cli.js list
```

---

## 📋 Available Commands

### Store a Secret
```bash
node uts-cli.js set <key> <value> [--encrypted]
```

**Examples:**
```bash
# Basic secret
node uts-cli.js set dao-governance-db/username "my_database_user"

# Encrypted secret (marked as encrypted, encryption not implemented in dev mode)
node uts-cli.js set dao-governance-db/password "MySecurePassword123" --encrypted

# Novu API key
node uts-cli.js set novu/api-key "novu_abc123xyz"
```

### Retrieve a Secret
```bash
node uts-cli.js get <key>
```

**Example:**
```bash
node uts-cli.js get dao-governance-db/username
```

**Output:**
```
🔑 Secret: dao-governance-db/username
   Value: my_database_user
   Updated: 2025-10-12T02:32:07.173Z
```

### List All Secrets
```bash
node uts-cli.js list
```

Shows all stored secrets with their values (truncated if long) and metadata.

### Delete a Secret
```bash
node uts-cli.js delete <key>
```

**Example:**
```bash
node uts-cli.js delete dao-governance-db/old-key
```

### Export Secrets to .env Format
```bash
node uts-cli.js export
```

**Example - Export to file:**
```bash
node uts-cli.js export > .env.local
```

**Output format:**
```env
# UTS Secrets Export
# Generated: 2025-10-12T02:32:07.176Z
# WARNING: Keep this file secure!

DAO_GOVERNANCE_DB_USERNAME=test_user
DAO_GOVERNANCE_DB_PASSWORD=test_password
DAO_GOVERNANCE_DB_HOST=test-database
DAO_GOVERNANCE_DB_PORT=5432
NOVU_API_KEY=test_novu_api_key
NOVU_API_URL=https://api.novu.co
BLOCKCHAIN_RPC_URL=http://localhost:8545
BLOCKCHAIN_API_KEY=test_blockchain_api_key
```

---

## 🔑 Standard Secret Keys

### Database Secrets
```
dao-governance-db/username       # Database username
dao-governance-db/password       # Database password
dao-governance-db/host           # Database host/IP
dao-governance-db/port           # Database port (usually 5432)
```

### Novu Notification Service
```
novu/api-key                     # Novu API authentication key
novu/api-url                     # Novu API endpoint (usually https://api.novu.co)
```

### Blockchain RPC
```
blockchain/rpc-url               # Blockchain RPC endpoint
blockchain/api-key               # RPC provider API key (if required)
```

---

## 🛠️ Common Workflows

### Initial Setup for Development
```bash
# 1. Quick setup with defaults
node uts-cli.js quick-setup

# 2. Verify secrets were created
node uts-cli.js list

# 3. Update with real credentials (if needed)
node uts-cli.js set dao-governance-db/password "YourRealPassword" --encrypted

# 4. Export to .env for docker-compose
node uts-cli.js export > .env.local
```

### Production Secret Management
```bash
# 1. Set production database credentials
node uts-cli.js set dao-governance-db/username "prod_dao_user"
node uts-cli.js set dao-governance-db/password "SecureProductionPassword" --encrypted
node uts-cli.js set dao-governance-db/host "tidb.production.371minds.com"

# 2. Set production Novu API key
node uts-cli.js set novu/api-key "novu_prod_key_abc123" --encrypted

# 3. Verify all production secrets
node uts-cli.js list

# 4. These secrets would then be uploaded to the real UTS
# (This CLI is for local development only)
```

### Updating Existing Secrets
```bash
# Just use 'set' again - it will overwrite
node uts-cli.js set dao-governance-db/password "NewPassword123" --encrypted
```

### Rotating Credentials
```bash
# 1. Set new credentials with new key
node uts-cli.js set dao-governance-db/password-new "NewRotatedPassword" --encrypted

# 2. Test application with new credentials

# 3. Once verified, update the main key
node uts-cli.js set dao-governance-db/password "NewRotatedPassword" --encrypted

# 4. Delete the temporary key
node uts-cli.js delete dao-governance-db/password-new
```

---

## 📁 Storage Location

Secrets are stored locally in:
```
f:\os-main\core\os-workspace\apps\dao-governance-service\.uts-secrets.json
```

**⚠️ IMPORTANT:** This file is excluded from git via `.gitignore`. Never commit this file!

---

## 🔒 Security Notes

### Development Mode
- This CLI stores secrets in **plain text JSON** locally
- It's designed for **development and testing only**
- The `--encrypted` flag just marks secrets as encrypted but doesn't actually encrypt them

### Production Mode
- In production, secrets should be stored in the **actual Universal Tool Server (UTS)**
- Use the UTS API or web interface to manage production secrets
- Enable encryption at rest in UTS
- Implement automated rotation policies
- Enable audit logging for all secret access

---

## 🐳 Using with Docker Compose

### Option 1: Export to .env file
```bash
# Export secrets to .env.local
node uts-cli.js export > .env.local

# Update docker-compose.yml to use .env.local
# Then start services
docker-compose --env-file .env.local up -d
```

### Option 2: Direct environment variables
```bash
# Export secrets and pass to docker-compose
node uts-cli.js export | docker-compose up -d
```

---

## 🧪 Testing the CLI

### Test Individual Commands
```bash
# Set a test secret
node uts-cli.js set test/key "test-value"

# Retrieve it
node uts-cli.js get test/key

# Delete it
node uts-cli.js delete test/key

# Verify it's gone
node uts-cli.js list
```

---

## 🆘 Troubleshooting

### "No secrets stored" after quick-setup
**Solution:** Check that you're in the correct directory:
```bash
cd f:\os-main\core\os-workspace\apps\dao-governance-service
pwd  # Should show: F:\os-main\core\os-workspace\apps\dao-governance-service
```

### Secrets file is corrupted
**Solution:** Delete and recreate:
```bash
rm .uts-secrets.json
node uts-cli.js quick-setup
```

### Want to reset all secrets
**Solution:** 
```bash
rm .uts-secrets.json
node uts-cli.js quick-setup
```

### Export command shows no output
**Solution:** Make sure you have secrets stored first:
```bash
node uts-cli.js list  # Check if secrets exist
```

---

## 🔗 Related Documentation

- [ZERO_TRUST_README.md](./ZERO_TRUST_README.md) - Complete zero-trust architecture
- [UTS_SECRETS_CONFIG.md](./UTS_SECRETS_CONFIG.md) - Production UTS configuration
- [README.md](./README.md) - DAO Governance Service overview

---

## ✨ Quick Command Reference

| Command | Description |
|---------|-------------|
| `quick-setup` | Create all default development secrets |
| `set <key> <value>` | Store or update a secret |
| `get <key>` | Retrieve a secret |
| `list` | Show all secrets |
| `delete <key>` | Remove a secret |
| `export` | Export to .env format |
| `help` | Show help message |

---

**Last Updated:** October 12, 2025  
**Version:** 1.0.0  
**Status:** ✅ Development Tool Ready  
**Note:** For local development only - use actual UTS for production
