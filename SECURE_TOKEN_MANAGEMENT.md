# 🔐 Secure Token Management Setup for 371 OS

## 🎯 Quick Setup Guide

### 1. **Create Your Local Environment File**
```powershell
# Copy the template to create your local environment
Copy-Item .env.example .env

# Edit the .env file with your actual tokens (never commit this file)
notepad .env
```

### 2. **NPM Token Setup**
```powershell
# Method 1: Generate new token via npm CLI
npm login
npm token create --read-only  # For CI/CD
npm token create             # For publishing

# Method 2: Get token from npm website
# Visit: https://www.npmjs.com/settings/tokens
```

### 3. **Configure NPM Registry**
```powershell
# Set npm registry (optional for scoped packages)
npm config set registry https://registry.npmjs.org/
npm config set @371minds:registry https://registry.npmjs.org/
```

## 🔧 **PowerShell Environment Setup (Windows)**

### **Secure Token Loading Script**
Create `scripts/load-env.ps1`:

```powershell
# Load environment variables securely
param(
    [string]$EnvFile = ".env"
)

if (Test-Path $EnvFile) {
    Get-Content $EnvFile | ForEach-Object {
        if ($_ -match '^([^#][^=]*?)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
            Write-Host "✅ Loaded: $name" -ForegroundColor Green
        }
    }
} else {
    Write-Error "❌ Environment file not found: $EnvFile"
    Write-Host "💡 Copy .env.example to .env and configure your tokens" -ForegroundColor Yellow
}
```

### **Enhanced Package Scripts**

Update your package.json scripts to use secure token loading:

```json
{
  "scripts": {
    "env:load": "powershell -ExecutionPolicy Bypass -File ./scripts/load-env.ps1",
    "publish:elizaos-plugins": "bun run env:load && bun nx run-many -t publish --tag=elizaos-plugin",
    "publish:secure": "bun run env:load && npm publish --access public",
    "deploy:with-secrets": "bun run env:load && bun run deploy:github:all"
  }
}
```

## 🏢 **Enterprise Security Integration**

### **Secretless Broker Integration**
For production deployments with your Secretless Broker pattern:

```yaml
# secretless.yml
version: "2"
services:
  - name: npm-publisher
    connector: generic_http
    authentication:
      - type: header
        config:
          header: "Authorization"
          value: "Bearer {{ .npmToken }}"
  
  - name: github-deployer
    connector: generic_http
    authentication:
      - type: header
        config:
          header: "Authorization"
          value: "Bearer {{ .githubToken }}"
```

### **ACI.dev Integration**
```yaml
# aci-config.yml
credentials:
  npm_token:
    source: "vault"
    path: "secret/371os/npm"
    key: "token"
  
  github_token:
    source: "vault" 
    path: "secret/371os/github"
    key: "token"
```

## 🚀 **Akash Network Deployment with Secrets**

### **Environment Variables for Akash SDL**
```yaml
# deploy.yml
services:
  universal-tool-server:
    image: ghcr.io/371-minds/universal-tool-server:latest
    env:
      - NPM_TOKEN
      - ETHEREUM_RPC_URL
      - IPFS_API_URL
    expose:
      - port: 3000
        as: 80
        to:
          - global: true
```

### **Secure Deployment Script**
```powershell
# scripts/secure-deploy-akash.ps1
param(
    [switch]$Production
)

# Load environment variables
. ./scripts/load-env.ps1

# Validate required tokens
$requiredVars = @("NPM_TOKEN", "ETHEREUM_RPC_URL", "AKASH_FROM")
foreach ($var in $requiredVars) {
    if (-not [Environment]::GetEnvironmentVariable($var)) {
        Write-Error "❌ Missing required environment variable: $var"
        exit 1
    }
}

Write-Host "✅ All tokens validated" -ForegroundColor Green

# Deploy to Akash Network
if ($Production) {
    Write-Host "🚀 Deploying to Akash Network (Production)" -ForegroundColor Cyan
    akash tx deployment create deploy.yml --from $env:AKASH_FROM --chain-id akashnet-2
} else {
    Write-Host "🧪 Deploying to Akash Network (Testnet)" -ForegroundColor Yellow  
    akash tx deployment create deploy.yml --from $env:AKASH_FROM --chain-id akash-testnet-2
}
```

## 📦 **Package Publishing Workflow**

### **Secure Publishing Script**
```powershell
# scripts/publish-packages.ps1
param(
    [string]$Package = "all",
    [string]$Tag = "latest"
)

# Load environment and validate NPM token
. ./scripts/load-env.ps1

if (-not $env:NPM_TOKEN) {
    Write-Error "❌ NPM_TOKEN not found in environment"
    Write-Host "💡 Run: npm login or set NPM_TOKEN in .env" -ForegroundColor Yellow
    exit 1
}

# Configure npm with token
npm config set //registry.npmjs.org/:_authToken $env:NPM_TOKEN

Write-Host "✅ NPM authentication configured" -ForegroundColor Green

# Publish packages
switch ($Package) {
    "all" {
        Write-Host "📦 Publishing all ElizaOS plugins..." -ForegroundColor Cyan
        bun nx run-many -t build --tag=elizaos-plugin
        bun nx run-many -t publish --tag=elizaos-plugin
    }
    "universal-tool-server" {
        Write-Host "📦 Publishing Universal Tool Server..." -ForegroundColor Cyan
        bun nx build elizaos-plugin-universal-tool-server
        bun nx publish elizaos-plugin-universal-tool-server --tag=$Tag
    }
    default {
        Write-Host "📦 Publishing $Package..." -ForegroundColor Cyan
        bun nx build $Package
        bun nx publish $Package --tag=$Tag
    }
}

Write-Host "✅ Publishing complete!" -ForegroundColor Green
```

## 🔒 **Security Best Practices**

### **Token Security Checklist**
- ✅ Never commit `.env` files to version control
- ✅ Use scoped tokens with minimal permissions
- ✅ Rotate tokens regularly (every 90 days)
- ✅ Use different tokens for development vs production
- ✅ Monitor token usage in npm dashboard
- ✅ Use automation tokens for CI/CD pipelines

### **PowerShell Security**
```powershell
# Enable secure execution policy for scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Verify script integrity before execution
Get-AuthenticodeSignature ./scripts/load-env.ps1
```

## 🎯 **Usage Examples**

### **Development Workflow**
```powershell
# 1. Setup environment
Copy-Item .env.example .env
# Edit .env with your tokens

# 2. Load environment and start development
bun run env:load
bun run start:dev

# 3. Build and test with environment
bun run affected:build
bun run affected:test
```

### **Publishing Workflow**  
```powershell
# 1. Publish specific package
./scripts/publish-packages.ps1 -Package "universal-tool-server" -Tag "beta"

# 2. Publish all packages  
./scripts/publish-packages.ps1 -Package "all" -Tag "latest"
```

### **Deployment Workflow**
```powershell
# 1. Deploy to testnet
./scripts/secure-deploy-akash.ps1

# 2. Deploy to production
./scripts/secure-deploy-akash.ps1 -Production
```

## 🆘 **Troubleshooting**

### **Common Issues**
1. **Token not found**: Ensure `.env` file exists and `NPM_TOKEN` is set
2. **Permission denied**: Check token scopes and package permissions
3. **Registry issues**: Verify registry URL and authentication
4. **PowerShell execution**: Ensure execution policy allows script running

### **Quick Fixes**
```powershell
# Reset npm configuration
npm config delete //registry.npmjs.org/:_authToken
npm login

# Verify token works
npm whoami

# Test package access
npm access list packages
```

---

## 🎉 **Next Steps**

1. **Copy `.env.example` to `.env`** and configure your tokens
2. **Run the environment loader** to test token loading
3. **Set up your first package publish** using the secure workflow
4. **Configure Akash deployment** with your environment variables

This secure token management system aligns with your 371 OS architecture and provides enterprise-grade security for your revolutionary agent ecosystem! 🚀🔐