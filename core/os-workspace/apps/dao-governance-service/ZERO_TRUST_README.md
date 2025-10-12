# Zero-Trust Architecture Implementation
## DAO Governance Service with Secretless Broker

This document describes the complete zero-trust security architecture for the DAO Governance Service, implementing the Secretless Broker pattern as outlined in the 371 OS Phase 20 roadmap.

---

## 🎯 Overview

The DAO Governance Service implements a **zero-trust architecture** where:
- ✅ **No credentials stored in application code**
- ✅ **No environment variables containing secrets**
- ✅ **All credentials fetched dynamically from Universal Tool Server (UTS)**
- ✅ **Secretless Broker handles credential injection transparently**
- ✅ **Application connects only to localhost proxies**

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Akash Network Pod                        │
│                                                             │
│  ┌────────────────────────┐   ┌─────────────────────────┐ │
│  │  DAO Governance        │   │  Secretless Broker      │ │
│  │  Service               │   │  (Sidecar)              │ │
│  │                        │   │                         │ │
│  │  - Connects to         │◄──┤  - Intercepts requests │ │
│  │    localhost:5432      │   │  - Fetches credentials │ │
│  │  - Uses dummy creds    │   │    from UTS             │ │
│  │  - Zero secrets in code│   │  - Injects real creds  │ │
│  └────────────────────────┘   └──────────┬──────────────┘ │
│                                           │                 │
└───────────────────────────────────────────┼─────────────────┘
                                            │
                                            ▼
                           ┌────────────────────────────┐
                           │ Universal Tool Server (UTS)│
                           │                            │
                           │ - Stores all secrets       │
                           │ - Provides secure API      │
                           │ - Audit logging            │
                           │ - Automated rotation       │
                           └────────────────────────────┘
                                            │
                                            ▼
                           ┌────────────────────────────┐
                           │  External Services         │
                           │                            │
                           │ - TiDB Database            │
                           │ - Novu Notifications       │
                           │ - Blockchain RPC           │
                           └────────────────────────────┘
```

---

## 📁 File Structure

```
dao-governance-service/
├── src/
│   ├── main.ts                    # Application entry with Zero-Trust validation
│   ├── database-config.ts         # Zero-Trust database configuration
│   ├── governance-service.ts      # Core governance logic
│   ├── api-routes.ts              # REST API endpoints
│   └── types.ts                   # TypeScript type definitions
├── secretless.yml                 # Production broker config (UTS)
├── secretless-local.yml           # Local broker config (env vars)
├── deploy.yaml                    # Akash deployment manifest
├── docker-compose.yml             # Local testing environment
├── Dockerfile                     # Production container image
├── init-db.sql                    # Database initialization
├── deploy-akash.ps1               # Akash deployment script
├── validate-config.ps1            # Configuration validation script
├── UTS_SECRETS_CONFIG.md          # UTS secrets documentation
└── ZERO_TRUST_README.md           # This file
```

---

## 🚀 Quick Start

### Local Development & Testing

1. **Set up development secrets:**
   ```powershell
   cd f:\os-main\core\os-workspace\apps\dao-governance-service
   node uts-cli.js quick-setup
   ```
   This creates default test credentials for local development.

2. **Verify services are running:**
   ```powershell
   docker-compose up -d
   docker-compose ps
   docker logs dao-governance-service
   ```

3. **Test the API:**
   ```powershell
   curl http://localhost:3000/api/governance/health
   ```

4. **View logs:**
   ```powershell
   docker-compose logs -f dao-governance-service
   ```

5. **Stop the environment:**
   ```powershell
   docker-compose down
   ```

### Setting Up Production Credentials

**Important:** The `quick-setup` command creates **test credentials only**. For production deployment, you need to replace them with real credentials.

#### Method 1: Interactive Setup (Recommended for First Time)
```powershell
cd f:\os-main\core\os-workspace\apps\dao-governance-service
node setup-production-secrets.js
```
This will prompt you for each credential interactively.

#### Method 2: Manual Setup (Individual Commands)
```powershell
# Database credentials
node uts-cli.js set dao-governance-db/username "your_prod_db_user"
node uts-cli.js set dao-governance-db/password "YourSecurePassword123!" --encrypted
node uts-cli.js set dao-governance-db/host "tidb-prod.371minds.com"
node uts-cli.js set dao-governance-db/port "4000"

# Novu API credentials
node uts-cli.js set novu/api-key "novu_sk_abc123..." --encrypted
node uts-cli.js set novu/api-url "https://api.novu.co"

# Blockchain RPC credentials (if needed)
node uts-cli.js set blockchain/rpc-url "https://mainnet.infura.io/v3/YOUR-PROJECT-ID"
node uts-cli.js set blockchain/api-key "your-api-key" --encrypted

# Verify all secrets
node uts-cli.js list
```

#### Method 3: Import from Existing .env File
```powershell
# 1. Copy the example file and fill in your credentials
cd f:\os-main\core\os-workspace\apps\dao-governance-service
cp .env.example .env.production

# 2. Edit .env.production with your real credentials
# See .env.example for complete documentation and format

# 3. Import using the dedicated script (recommended)
powershell -ExecutionPolicy Bypass -File .\import-env-to-uts.ps1 -EnvFile .env.production

# Or use the manual PowerShell command:
Get-Content .env.production | ForEach-Object {
    if ($_ -match '^([A-Z_][A-Z0-9_]*)=(.+)$' -and $_ -notmatch '^\s*#') {
        $key = $matches[1].Trim().ToLower().Replace('_', '/')
        $value = $matches[2].Trim()
        $encrypted = if ($key -match 'password|key|secret|token') { '--encrypted' } else { '' }
        node uts-cli.js set $key $value $encrypted
    }
}
```

**📝 .env File Format:**
- Use `#` for comments (at the beginning of a line)
- Format: `KEY=value` (no spaces around `=`)
- Don't use quotes around values (they'll be included)
- Use `UPPERCASE_WITH_UNDERSCORES` for variable names
- See [`.env.example`](./.env.example) for a complete template

**📋 Credential Checklist:**
- [ ] Database username set
- [ ] Database password set (with --encrypted flag)
- [ ] Database host set (production hostname)
- [ ] Database port set (usually 5432 or 4000)
- [ ] Novu API key set (with --encrypted flag)
- [ ] Novu API URL set
- [ ] Blockchain RPC URL set (if using)
- [ ] Blockchain API key set (if required, with --encrypted flag)
- [ ] Verified all secrets with `node uts-cli.js list`

#### Where to Get Production Credentials

**Database Credentials:**
- **Host/Port:** From your database provider (TiDB Cloud, DigitalOcean, AWS RDS, etc.)
- **Username/Password:** Created in your database admin panel
- **Example providers:**
  - TiDB Cloud: https://tidbcloud.com/
  - DigitalOcean Managed PostgreSQL: https://cloud.digitalocean.com/databases
  - Supabase: https://supabase.com/

**Novu API Credentials:**
- **Sign up:** https://novu.co/
- **Get API key:** Dashboard → Settings → API Keys
- **API URL:** Usually `https://api.novu.co` (or your self-hosted URL)

**Blockchain RPC Credentials:**
- **Infura:** https://infura.io/ (Ethereum/Polygon)
- **Alchemy:** https://www.alchemy.com/ (Multiple chains)
- **QuickNode:** https://www.quicknode.com/ (Multiple chains)
- **Or use your own node**

**Security Best Practices:**
1. ✅ Never share credentials in plain text
2. ✅ Use strong, unique passwords (20+ characters)
3. ✅ Enable 2FA on all admin accounts
4. ✅ Use the `--encrypted` flag for sensitive values
5. ✅ Rotate credentials every 90 days
6. ✅ Never commit `.uts-secrets.json` to git

### Production Deployment to Akash

1. **Validate configuration:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\validate-config.ps1 -Verbose
   ```

2. **Set required environment variables:**
   ```powershell
   $env:UTS_AUTH_TOKEN = "your-uts-authentication-token"
   $env:UTS_ENDPOINT = "http://uts.internal"
   ```

3. **Populate UTS with secrets:**
   See [`UTS_SECRETS_CONFIG.md`](./UTS_SECRETS_CONFIG.md) for detailed instructions.

4. **Build and deploy:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\deploy-akash.ps1
   ```

5. **Dry run (test without deploying):**
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\deploy-akash.ps1 -DryRun
   ```

---

## 🔐 Security Implementation Details

### How It Works

#### Step 1: Application Makes Connection Request
```typescript
// In database-config.ts
const config = getDatabaseConfig();
// Returns: { host: '127.0.0.1', port: 5432, user: 'broker-user', password: 'broker-pass' }

// Application thinks it's connecting to localhost with dummy credentials
const connection = await createDatabaseConnection(config);
```

#### Step 2: Secretless Broker Intercepts
The Secretless Broker listens on `127.0.0.1:5432` and intercepts the connection request.

#### Step 3: Broker Fetches Real Credentials
```yaml
# From secretless.yml
credentials:
  - name: "username"
    provider: "http"
    get: "http://uts.internal/secrets/dao-governance-db/username"
  - name: "password"
    provider: "http"
    get: "http://uts.internal/secrets/dao-governance-db/password"
```

The broker makes authenticated requests to UTS to fetch the real credentials.

#### Step 4: Broker Establishes Real Connection
The broker uses the real credentials to connect to the actual database and proxies traffic transparently.

#### Step 5: Application Uses Connection Normally
The application receives a working database connection without ever seeing the real credentials.

---

## 📊 Configuration Files

### secretless.yml (Production)
- **Purpose:** Production configuration for UTS integration
- **Credential Source:** Universal Tool Server HTTP API
- **Usage:** Deployed to Akash Network
- **Location:** Mounted into broker container at `/etc/secretless/secretless.yml`

### secretless-local.yml (Development)
- **Purpose:** Local testing configuration
- **Credential Source:** Environment variables
- **Usage:** Docker Compose local development
- **Location:** Mounted into broker container for local testing

### deploy.yaml (Akash Manifest)
- **Purpose:** Defines Akash Network deployment
- **Key Features:**
  - Sidecar container pattern
  - Zero-Trust environment variables
  - Health checks for both containers
  - Resource allocation
  - Domain configuration

---

## 🧪 Testing & Validation

### Pre-Deployment Validation

Run the validation script to ensure everything is configured correctly:

```powershell
powershell -ExecutionPolicy Bypass -File .\validate-config.ps1 -Verbose
```

**What it checks:**
- ✓ Required files exist
- ✓ YAML syntax is valid
- ✓ Sidecar container is configured
- ✓ Environment variables are set
- ✓ Zero-Trust mode is enabled
- ✓ Localhost configuration is correct
- ✓ UTS connectivity (if reachable)

### Local Testing Workflow

1. **Start environment:**
   ```powershell
   docker-compose up -d
   ```

2. **Check container health:**
   ```powershell
   docker-compose ps
   # All services should show "healthy" status
   ```

3. **Test database connectivity through broker:**
   ```powershell
   docker exec dao-governance-service curl -f http://localhost:3000/api/governance/health
   ```

4. **Verify broker is intercepting:**
   ```powershell
   docker logs secretless-broker | Select-String "connection"
   # Should show broker intercepting and proxying connections
   ```

5. **Test API endpoints:**
   ```powershell
   # Health check
   curl http://localhost:3000/api/governance/health

   # List proposals
   curl http://localhost:3000/api/governance/proposals

   # Create proposal
   curl -X POST http://localhost:3000/api/governance/proposals `
     -H "Content-Type: application/json" `
     -d '{"title": "Test Proposal", "type": "STRATEGIC", "description": "Test", "proposer": "test"}'
   ```

---

## 🔧 Troubleshooting

### Application Cannot Connect to Database

**Symptom:** Application logs show database connection errors

**Possible Causes:**
1. Secretless Broker not running
2. Broker cannot reach UTS
3. Secrets not populated in UTS
4. Network configuration issue

**Solution:**
```powershell
# Check broker status
docker logs secretless-broker

# Verify broker health
curl http://localhost:5335/ready

# Check UTS connectivity
curl http://uts.internal/health

# Verify secrets exist in UTS
curl -H "Authorization: Bearer $UTS_AUTH_TOKEN" http://uts.internal/secrets/dao-governance-db/username
```

### Secretless Broker Fails to Start

**Symptom:** Broker container exits immediately or shows health check failures

**Possible Causes:**
1. Invalid `secretless.yml` syntax
2. Missing environment variables
3. Cannot reach UTS

**Solution:**
```powershell
# Validate YAML syntax
powershell -ExecutionPolicy Bypass -File .\validate-config.ps1

# Check broker logs
docker logs secretless-broker

# Test configuration manually
docker run --rm -v ${PWD}/secretless.yml:/secretless.yml cyberark/secretless-broker:latest -f /secretless.yml
```

### UTS Authentication Fails

**Symptom:** Broker logs show 401/403 errors when fetching secrets

**Solution:**
```powershell
# Verify UTS_AUTH_TOKEN is set correctly
echo $env:UTS_AUTH_TOKEN

# Test authentication manually
curl -H "Authorization: Bearer $env:UTS_AUTH_TOKEN" http://uts.internal/health

# Regenerate token if needed
# (Contact UTS administrator)
```

### Application Uses Wrong Configuration

**Symptom:** Application connects directly to database instead of through broker

**Possible Causes:**
1. `ZERO_TRUST_MODE` not set to `true`
2. Wrong environment (development vs production)
3. Old environment variables overriding configuration

**Solution:**
```powershell
# Check environment variables
docker exec dao-governance-service env | Select-String "DATABASE"
docker exec dao-governance-service env | Select-String "ZERO_TRUST"

# Should see:
# DATABASE_HOST=127.0.0.1
# ZERO_TRUST_MODE=true
```

---

## 📈 Monitoring & Observability

### Health Checks

**Application Health:**
```bash
curl http://localhost:3000/api/governance/health
```

**Broker Health:**
```bash
curl http://localhost:5335/ready
```

**UTS Health:**
```bash
curl http://uts.internal/health
```

### Logging

**Application Logs:**
```powershell
docker logs dao-governance-service -f
```

**Broker Logs:**
```powershell
docker logs secretless-broker -f
```

**Structured Logging:**
All logs are in JSON format for easy parsing:
```json
{
  "timestamp": "2025-10-11T10:30:00Z",
  "level": "info",
  "service": "dao-governance",
  "message": "Database connection established via broker"
}
```

---

## 🔐 Automatic Encryption Detection

The import script **automatically encrypts** values containing these keywords in their variable names:

### Authentication & Security
- `password` - Database passwords, user passwords
- `secret` - API secrets, shared secrets
- `key` - API keys, encryption keys, private keys
- `token` - Auth tokens, access tokens, refresh tokens
- `api_key` - Service API keys
- `auth` - Authentication credentials
- `keyring` - Keyring identifiers, keyring secrets

### Network & Infrastructure
- `host` - Database hosts, service hosts, remote hosts
- `url` - API URLs, service URLs, webhook URLs
- `uri` - Resource identifiers, connection URIs
- `rpc` - RPC endpoints, blockchain RPC URLs
- `endpoint` - API endpoints, service endpoints
- `websocket` - WebSocket URLs, WS endpoints
- `registry` - Container registries, service registries

### Blockchain & Contracts
- `contract` - Smart contract addresses
- `chain_id` - Blockchain chain identifiers
- `identifier` - Unique identifiers, resource identifiers

### Configuration & Modes
- `enable` - Feature flags, enable/disable settings
- `mode` - Operating modes, configuration modes
- `cloude` - Cloud-specific configurations

### Examples

**Will be encrypted (🔐):**
```bash
DAO_GOVERNANCE_DB_PASSWORD=MySecurePass123      # Contains "password"
NOVU_API_KEY=novu_sk_abc123                     # Contains "key"
BLOCKCHAIN_RPC_URL=https://eth.llamarpc.com    # Contains "rpc" and "url"
DATABASE_HOST=db.production.com                # Contains "host"
BLOCKCHAIN_CONTRACT_ADDRESS=0xabc123           # Contains "contract"
ETHEREUM_CHAIN_ID=1                            # Contains "chain_id"
WEBSOCKET_ENDPOINT=wss://api.example.com       # Contains "websocket" and "endpoint"
DOCKER_REGISTRY_URL=ghcr.io/371-minds          # Contains "registry" and "url"
AUTH_TOKEN=bearer_xyz789                       # Contains "auth" and "token"
ENABLE_FEATURE_X=true                          # Contains "enable"
```

**Will NOT be encrypted:**
```bash
DAO_GOVERNANCE_DB_USERNAME=admin               # No matching keywords
LOG_LEVEL=info                                 # No matching keywords
PORT=3000                                      # No matching keywords
NODE_ENV=production                            # No matching keywords
```

**Note:** The script checks if the **variable name** (KEY) contains any of these patterns, not the value. This ensures sensitive configuration is always encrypted, regardless of the actual value content.

---

## 🔄 Migration from Direct Credentials

If migrating from a system that uses direct credentials:

### Step 1: Identify Current Secrets
```powershell
# Review .env file or environment variables
cat .env
```

### Step 2: Populate UTS
See [`UTS_SECRETS_CONFIG.md`](./UTS_SECRETS_CONFIG.md) for detailed instructions.

### Step 3: Update Application Configuration
- Set `ZERO_TRUST_MODE=true`
- Change database host to `127.0.0.1`
- Remove real credentials from environment

### Step 4: Test Locally
```powershell
docker-compose up -d
# Test application functionality
```

### Step 5: Deploy to Production
```powershell
powershell -ExecutionPolicy Bypass -File .\deploy-akash.ps1
```

### Step 6: Cleanup Old Secrets
```powershell
# Remove .env files (DO NOT COMMIT)
# Rotate credentials in production database
# Update UTS with new rotated credentials
```

---

## 🎓 Best Practices

1. **Never Commit Secrets:** Use `.gitignore` to exclude `.env` and secret files
2. **Rotate Credentials Regularly:** Implement automated rotation in UTS
3. **Monitor Broker Health:** Set up alerts for broker failures
4. **Audit Secret Access:** Review UTS audit logs regularly
5. **Test Locally First:** Always test in docker-compose before deploying to Akash
6. **Use Least Privilege:** Grant minimal permissions to service accounts
7. **Encrypt Secrets at Rest:** Ensure UTS encrypts all stored secrets
8. **Backup UTS:** Regular encrypted backups of UTS data

---

## 📚 Additional Resources

- [Secretless Broker Documentation](https://docs.cyberark.com/Product-Doc/OnlineHelp/AAM-DAP/Latest/en/Content/Integrations/k8s-ocp/secretless-broker.htm)
- [Akash Network Documentation](https://docs.akash.network/)
- [Universal Tool Server API](../../../integrations/akash/universal-tool-server/README.md)
- [371 OS Zero-Trust Architecture](../../../documentation/security/zero-trust-architecture.md)

---

## 🤝 Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section above
2. Review logs for error details
3. Run validation: `.\validate-config.ps1 -Verbose`
4. Contact the 371 Minds infrastructure team

---

**Last Updated:** October 11, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Owner:** 371 Minds Infrastructure Team
