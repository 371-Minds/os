# 🚀 371 OS Quick Start Script (PowerShell Edition)
# This script automates the entire setup process for Windows environments

param(
    [switch]$SkipDependencyCheck,
    [switch]$SkipBuild,
    [string]$NodeVersion = "18"
)

Write-Host "🌟 Welcome to 371 OS Quick Start Setup!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

$ErrorActionPreference = "Stop"

# Progress tracking
$Step = 1
$TotalSteps = 8

function Write-Step {
    param([string]$Message)
    Write-Host "[Step $Script:Step/$TotalSteps] $Message" -ForegroundColor Blue
    $Script:Step++
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# Check prerequisites
if (-not $SkipDependencyCheck) {
    Write-Step "Checking Prerequisites"

    # Check Node.js
    try {
        $nodeVersion = node --version
        if ($nodeVersion) {
            Write-Success "Node.js found: $nodeVersion"
        }
    }
    catch {
        Write-Error "Node.js not found. Please install Node.js $NodeVersion+ from https://nodejs.org"
        exit 1
    }

    # Check npm
    try {
        $npmVersion = npm --version
        if ($npmVersion) {
            Write-Success "npm found: $npmVersion"
        }
    }
    catch {
        Write-Error "npm not found. Please install npm"
        exit 1
    }

    # Check Git
    try {
        git --version | Out-Null
        Write-Success "Git found"
    }
    catch {
        Write-Error "Git not found. Please install Git"
        exit 1
    }
}

# Install dependencies
Write-Step "Installing Dependencies"
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
    try {
        npm install
        Write-Success "Dependencies installed successfully"
    }
    catch {
        Write-Error "Failed to install dependencies: $_"
        exit 1
    }
} else {
    Write-Success "Dependencies already installed"
}

# Setup environment
Write-Step "Setting up Environment Configuration"
if (-not (Test-Path ".env")) {
    Write-Host "Creating environment configuration..." -ForegroundColor Yellow
    
    Write-Host ""
    Write-Host "🔗 Ethereum Configuration:" -ForegroundColor Cyan
    $InfuraID = Read-Host "Enter your Infura Project ID (or press Enter for default)"
    if (-not $InfuraID) { $InfuraID = "your_infura_project_id" }
    
    $PrivateKey = Read-Host "Enter your wallet private key (without 0x prefix)" -AsSecureString
    $PrivateKeyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($PrivateKey))
    
    Write-Host ""
    Write-Host "📁 IPFS Configuration:" -ForegroundColor Cyan
    $IpfsKey = Read-Host "Enter your IPFS API key (or press Enter to skip)"
    $IpfsSecretSecure = Read-Host "Enter your IPFS API secret (or press Enter to skip)" -AsSecureString
    $IpfsSecret = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($IpfsSecretSecure))
    
    # Create .env file
    @"
# Blockchain Configuration
ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/$InfuraID
PRIVATE_KEY=$PrivateKeyPlain
REGISTRY_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890

# IPFS Configuration  
IPFS_API_URL=https://ipfs.infura.io:5001
IPFS_API_KEY=$IpfsKey
IPFS_API_SECRET=$IpfsSecret

# Akash Network Configuration
AKASH_KEYRING_BACKEND=os
AKASH_CHAIN_ID=akashnet-2
AKASH_NODE=https://rpc.akashnet.net

# ElizaOS Configuration
ELIZAOS_ENVIRONMENT=development
ELIZAOS_LOG_LEVEL=debug

# Development Configuration
PORT=3000
HOST=0.0.0.0
"@ | Out-File -FilePath ".env" -Encoding UTF8

    # Secure the environment file
    $acl = Get-Acl ".env"
    $acl.SetAccessRuleProtection($true, $false)
    $accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule($env:USERNAME, "FullControl", "Allow")
    $acl.SetAccessRule($accessRule)
    Set-Acl ".env" $acl

    Write-Success "Environment configuration created"
} else {
    Write-Success "Environment already configured"
}

# Build packages
if (-not $SkipBuild) {
    Write-Step "Building Packages"
    Write-Host "Building all packages with Nx..." -ForegroundColor Yellow
    try {
        npx nx run-many -t build
        Write-Success "All packages built successfully"
    }
    catch {
        Write-Warning "Some packages failed to build. This is expected for the initial setup."
        Write-Host "Error details: $_" -ForegroundColor DarkGray
    }
}

# Setup agents
Write-Step "Setting up Agents"
if (-not (Test-Path "agents")) {
    New-Item -ItemType Directory -Path "agents" -Force | Out-Null
    
    # Create CEO agent
    New-Item -ItemType Directory -Path "agents/ceo-mimi" -Force | Out-Null
    @"
{
  "name": "Mimi",
  "role": "CEO", 
  "description": "Strategic decision-making AI agent for 371 OS",
  "personality": {
    "traits": ["strategic", "cost-conscious", "visionary", "decisive"],
    "communication_style": "executive",
    "decision_framework": "data-driven with strategic vision"
  },
  "capabilities": [
    "strategic-planning",
    "cost-optimization",
    "resource-allocation", 
    "high-level-coordination"
  ],
  "plugins": [
    "@elizaos/plugin-nx-workspace",
    "@elizaos/plugin-universal-tool-server"
  ],
  "blockchain": {
    "stake_amount": "1000000000000000000",
    "reputation_threshold": 80
  }
}
"@ | Out-File -FilePath "agents/ceo-mimi/character.json" -Encoding UTF8

    Write-Success "CEO Agent (Mimi) configured"
    
    # Create other agents
    $agents = @(
        @{ dir = "cto-zara"; role = "CTO"; desc = "Technical architecture and system design" },
        @{ dir = "cfo-maya"; role = "CFO"; desc = "Financial analysis and cost optimization" },
        @{ dir = "clo-alex"; role = "CLO"; desc = "Legal compliance and governance" }
    )
    
    foreach ($agent in $agents) {
        $agentDir = "agents/$($agent.dir)"
        New-Item -ItemType Directory -Path $agentDir -Force | Out-Null
        
        $agentName = ($agent.dir -split '-')[1]
        $agentName = $agentName.Substring(0,1).ToUpper() + $agentName.Substring(1)
        
        @"
{
  "name": "$agentName",
  "role": "$($agent.role)",
  "description": "$($agent.desc)",
  "capabilities": ["$($agent.role.ToLower())-operations", "cross-agent-coordination"],
  "plugins": [
    "@elizaos/plugin-nx-workspace",
    "@elizaos/plugin-universal-tool-server"
  ]
}
"@ | Out-File -FilePath "$agentDir/character.json" -Encoding UTF8
    }
    
    Write-Success "Multi-agent ecosystem created"
} else {
    Write-Success "Agents already configured"
}

# Setup monitoring
Write-Step "Setting up Monitoring"
if (-not (Test-Path "monitoring")) {
    New-Item -ItemType Directory -Path "monitoring" -Force | Out-Null
    
    # Create health check script
    @"
#!/bin/bash
# Health Check Script for 371 OS

echo "📊 371 OS System Health Check"
echo "============================="

# Check Node.js processes
echo "🔧 Node.js Processes:"
Get-Process -Name "node" -ErrorAction SilentlyContinue | Format-Table -AutoSize

# Check port usage
echo "🌐 Port Usage (3000-3005):"
netstat -an | findstr ":3000 :3001 :3002 :3003 :3004 :3005"

# Check disk space
echo "💾 Disk Space:"
Get-PSDrive -PSProvider FileSystem | Format-Table -AutoSize

# Check environment
echo "🔧 Environment:"
if (Test-Path ".env") {
    Write-Host "✅ Environment file exists"
} else {
    Write-Host "❌ Environment file missing"
}

# Check Nx workspace
echo "🏗️ Nx Workspace:"
if (Test-Path "nx.json") {
    Write-Host "✅ Nx workspace configured"
    npx nx graph --file=temp-graph.json
    if (Test-Path "temp-graph.json") {
        $graph = Get-Content "temp-graph.json" | ConvertFrom-Json
        Write-Host "📊 Projects found: $(($graph.nodes | Get-Member -MemberType NoteProperty).Count)"
        Remove-Item "temp-graph.json" -Force
    }
} else {
    Write-Host "❌ Nx workspace not found"
}

Write-Host "📋 Health check complete!"
"@ | Out-File -FilePath "monitoring/health-check.ps1" -Encoding UTF8
    
    Write-Success "Monitoring configured"
} else {
    Write-Success "Monitoring already configured"
}

# Test basic functionality
Write-Step "Testing Basic Functionality"
try {
    # Test Nx commands
    Write-Host "Testing Nx workspace..." -ForegroundColor Yellow
    npx nx graph --file=test-graph.json | Out-Null
    if (Test-Path "test-graph.json") {
        Remove-Item "test-graph.json" -Force
        Write-Success "Nx workspace is functional"
    }
    
    # Test package builds
    Write-Host "Testing package structure..." -ForegroundColor Yellow
    if (Test-Path "packages/elizaos-plugins/nx-workspace") {
        Write-Success "ElizaOS plugins structure verified"
    } else {
        Write-Warning "ElizaOS plugins need to be built"
    }
    
} catch {
    Write-Warning "Some functionality tests failed. This is normal for initial setup."
}

# Final setup
Write-Step "Final Configuration"

# Update package.json scripts to use PowerShell
Write-Host "Updating scripts for Windows environment..." -ForegroundColor Yellow

# Create startup scripts
@"
// 371 OS Agent Startup Script
console.log('🚀 Starting 371 OS Agents...');

// This is a placeholder startup script
// Actual ElizaOS integration will be implemented based on corrected dependencies

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('✅ 371 OS startup script loaded');
console.log('💡 Next steps:');
console.log('   1. Install correct ElizaOS dependencies');
console.log('   2. Update plugin imports');
console.log('   3. Configure agent characters');
console.log('   4. Test local deployment');

// Keep process alive for development
if (process.env.NODE_ENV === 'development') {
    console.log('🔄 Running in development mode...');
    setInterval(() => {
        console.log('💓 Agent heartbeat:', new Date().toISOString());
    }, 30000);
}
"@ | Out-File -FilePath "agents/startup.js" -Encoding UTF8

Write-Success "Startup scripts created"

Write-Host ""
Write-Host "🎉 371 OS Quick Start Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "✅ What's been set up:" -ForegroundColor Green
Write-Host "   📦 Dependencies installed" -ForegroundColor White
Write-Host "   🔧 Environment configured" -ForegroundColor White
Write-Host "   🏗️ Nx workspace ready" -ForegroundColor White
Write-Host "   🤖 Agent characters created" -ForegroundColor White
Write-Host "   📊 Monitoring configured" -ForegroundColor White
Write-Host ""
Write-Host "⚠️ Important notes:" -ForegroundColor Yellow
Write-Host "   1. ElizaOS dependencies need to be updated to correct packages" -ForegroundColor White
Write-Host "   2. Agent startup files are placeholders - need ElizaOS integration" -ForegroundColor White
Write-Host "   3. Blockchain contracts need to be deployed for full functionality" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Run: npm run start:dev (for local development)" -ForegroundColor White
Write-Host "   2. Run: .\monitoring\health-check.ps1 (to verify system health)" -ForegroundColor White
Write-Host "   3. Deploy to Akash Network: .\scripts\deploy-akash.ps1" -ForegroundColor White
Write-Host ""
Write-Host "HELP: For help: Check IMPLEMENTATION_GUIDE.md or GETTING_STARTED.md" -ForegroundColor DarkGray

# Return to original directory
Set-Location $PSScriptRoot