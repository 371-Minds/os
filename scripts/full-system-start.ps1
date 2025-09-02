# 371 OS Full System Startup Script
# Comprehensive startup including MongoDB and all agents

param(
    [switch]$Akash = $false,
    [switch]$Local = $true,
    [switch]$SkipMongo = $false,
    [switch]$Development = $true
)

Write-Host "🚀 371 OS - Full System Startup" -ForegroundColor Magenta
Write-Host "===============================" -ForegroundColor Magenta

# Check prerequisites
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow

# Check if Bun is installed
if (!(Get-Command "bun" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Bun not found. Installing dependencies with npm..." -ForegroundColor Yellow
    
    if (!(Get-Command "npm" -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Neither Bun nor npm found. Please install Node.js first." -ForegroundColor Red
        exit 1
    }
    
    $packageManager = "npm"
    $runCommand = "npm run"
} else {
    $packageManager = "bun"
    $runCommand = "bun run"
    Write-Host "✅ Bun package manager detected" -ForegroundColor Green
}

# Check if dependencies are installed
if (!(Test-Path "node_modules") -or !(Test-Path "node_modules/@elizaos")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    
    if ($packageManager -eq "bun") {
        bun install
    } else {
        npm install --legacy-peer-deps
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Dependency installation failed" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
}

# Setup environment
Write-Host "🔧 Setting up environment..." -ForegroundColor Yellow

if (!(Test-Path ".env")) {
    Write-Host "📝 Creating default .env file..." -ForegroundColor Yellow
    
    $defaultEnv = @"
# 371 OS Environment Configuration
NODE_ENV=development
PORT=3000

# MongoDB Configuration
MONGODB_DATABASE=os371
MONGODB_USERNAME=os371user
MONGODB_PASSWORD=os371pass
MONGODB_LOCAL_URI=mongodb://os371user:os371pass@localhost:27017/os371

# ElizaOS Configuration
ELIZAOS_LOG_LEVEL=info

# Agent Configuration
CEO_AGENT_NAME=Mimi
CTO_AGENT_NAME=Zara
CFO_AGENT_NAME=Maya
CLO_AGENT_NAME=Alex

# Blockchain Configuration (Optional)
ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/your-key-here
PRIVATE_KEY=your-private-key-here

# Akash Network Configuration (Optional)
AKASH_KEYRING_BACKEND=test
AKASH_CHAIN_ID=akashnet-2
AKASH_NODE=https://rpc.akashnet.net:443
"@

    $defaultEnv | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Default .env file created" -ForegroundColor Green
}

# Start MongoDB if not skipped
if (!$SkipMongo) {
    Write-Host "🍃 Starting MongoDB..." -ForegroundColor Green
    
    if ($Akash) {
        Write-Host "🌐 Using Akash Network MongoDB..." -ForegroundColor Cyan
        
        if (!$env:MONGODB_AKASH_URI) {
            Write-Host "⚠️  Akash MongoDB not deployed. Deploying now..." -ForegroundColor Yellow
            powershell -ExecutionPolicy Bypass -File "scripts/deploy-mongodb-akash.ps1"
            
            if ($LASTEXITCODE -ne 0) {
                Write-Host "❌ Akash MongoDB deployment failed" -ForegroundColor Red
                Write-Host "💡 Falling back to local MongoDB..." -ForegroundColor Yellow
                $Local = $true
                $Akash = $false
            }
        }
    }
    
    if ($Local) {
        Write-Host "🏠 Starting local MongoDB..." -ForegroundColor Cyan
        powershell -ExecutionPolicy Bypass -File "scripts/start-mongodb.ps1" -Docker
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Local MongoDB startup failed" -ForegroundColor Red
            Write-Host "💡 You can skip MongoDB with -SkipMongo and use external DB" -ForegroundColor Yellow
        } else {
            Write-Host "✅ Local MongoDB started successfully" -ForegroundColor Green
        }
    }
    
    # Test MongoDB connection
    Write-Host "🧪 Testing MongoDB connection..." -ForegroundColor Yellow
    node scripts/test-mongodb-connection.js
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  MongoDB connection test failed, continuing anyway..." -ForegroundColor Yellow
    } else {
        Write-Host "✅ MongoDB connection verified" -ForegroundColor Green
    }
}

# Build the system
Write-Host "🏗️  Building 371 OS components..." -ForegroundColor Yellow

Write-Host "   📦 Building cognitive engine..." -ForegroundColor Cyan
& $packageManager run cognitive-engine:build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Cognitive engine build failed" -ForegroundColor Red
    Write-Host "💡 Continuing with available components..." -ForegroundColor Yellow
}

Write-Host "   📦 Building business intelligence..." -ForegroundColor Cyan
try {
    & $packageManager run "nx" "build" "business-intelligence" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Business intelligence built successfully" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Business intelligence build skipped" -ForegroundColor Yellow
}

Write-Host "   📦 Building cognitive interface..." -ForegroundColor Cyan
try {
    & $packageManager run "nx" "build" "cognitive-interface" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Cognitive interface built successfully" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Cognitive interface build skipped" -ForegroundColor Yellow
}

Write-Host "✅ System build completed" -ForegroundColor Green

# Start the agents
Write-Host "🤖 Starting 371 OS Agents..." -ForegroundColor Magenta

# Create logs directory
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Force -Path "logs" | Out-Null
}

# Function to start agent in background
function Start-Agent {
    param($AgentName, $AgentScript)
    
    Write-Host "   🤖 Starting $AgentName agent..." -ForegroundColor Cyan
    
    if (Test-Path $AgentScript) {
        $job = Start-Job -ScriptBlock {
            param($script, $runCmd, $agentName)
            Set-Location $using:PWD
            & $runCmd $script 2>&1 | Tee-Object -FilePath "logs/$agentName.log"
        } -ArgumentList $AgentScript, $runCommand, $AgentName.ToLower()
        
        Write-Host "✅ $AgentName agent started (Job ID: $($job.Id))" -ForegroundColor Green
        return $job
    } else {
        Write-Host "⚠️  $AgentName agent script not found: $AgentScript" -ForegroundColor Yellow
        return $null
    }
}

# Start Test Agent (always available)
Write-Host "   🧪 Starting Test Agent..." -ForegroundColor Cyan
$testAgentJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    & $using:runCommand "start:test-agent" 2>&1 | Tee-Object -FilePath "logs/test-agent.log"
}

if ($testAgentJob) {
    Write-Host "✅ Test Agent started (Job ID: $($testAgentJob.Id))" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to start Test Agent" -ForegroundColor Red
}

# Start other agents if available
$agents = @()

if (Test-Path "agents/ceo-mimi") {
    $agents += Start-Agent "CEO-Mimi" "start:ceo"
}

if (Test-Path "agents/cto-zara") {
    $agents += Start-Agent "CTO-Zara" "start:cto"  
}

if (Test-Path "agents/cfo-maya") {
    $agents += Start-Agent "CFO-Maya" "start:cfo"
}

if (Test-Path "agents/clo-alex") {
    $agents += Start-Agent "CLO-Alex" "start:clo"
}

# Start cognitive interface if in development mode
if ($Development -and (Test-Path "apps/cognitive-interface")) {
    Write-Host "🖥️  Starting Cognitive Interface (Development Server)..." -ForegroundColor Magenta
    
    $interfaceJob = Start-Job -ScriptBlock {
        Set-Location $using:PWD
        & $using:runCommand "nx" "serve" "cognitive-interface" 2>&1 | Tee-Object -FilePath "logs/cognitive-interface.log"
    }
    
    if ($interfaceJob) {
        Write-Host "✅ Cognitive Interface started (Job ID: $($interfaceJob.Id))" -ForegroundColor Green
        Write-Host "🌐 Web Interface: http://localhost:4200" -ForegroundColor Cyan
    }
}

# System startup complete
Write-Host "" -ForegroundColor White
Write-Host "🎉 371 OS System Startup Complete!" -ForegroundColor Magenta
Write-Host "=================================" -ForegroundColor Magenta

# Display system status
Write-Host "📊 System Status:" -ForegroundColor Cyan
Write-Host "   🍃 MongoDB: " -NoNewline -ForegroundColor White
if ($SkipMongo) { 
    Write-Host "Skipped" -ForegroundColor Yellow
} elseif ($Akash) {
    Write-Host "Running on Akash Network" -ForegroundColor Green
} else {
    Write-Host "Running locally" -ForegroundColor Green
}

Write-Host "   🤖 Test Agent: Running (Job $($testAgentJob.Id))" -ForegroundColor Green

if ($Development) {
    Write-Host "   🖥️  Cognitive Interface: http://localhost:4200" -ForegroundColor Green
}

Write-Host "" -ForegroundColor White
Write-Host "📚 Available Commands:" -ForegroundColor Cyan
Write-Host "   📊 System health: $runCommand health-check" -ForegroundColor White
Write-Host "   📈 Cost analysis: $runCommand cost-analysis" -ForegroundColor White  
Write-Host "   🔧 MongoDB test: $runCommand mongodb:connect" -ForegroundColor White
Write-Host "   📋 View logs: Get-Content logs/test-agent.log -Tail 10 -Wait" -ForegroundColor White

Write-Host "" -ForegroundColor White
Write-Host "🏁 System Ready! " -NoNewline -ForegroundColor Green
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow

# Wait for user interruption
try {
    Write-Host "⏳ Monitoring system... (Press Ctrl+C to stop)" -ForegroundColor Cyan
    
    while ($true) {
        Start-Sleep -Seconds 5
        
        # Check job status
        $runningJobs = Get-Job | Where-Object { $_.State -eq "Running" }
        Write-Host "📊 Active services: $($runningJobs.Count)" -ForegroundColor Green
        
        # Show recent log entries
        if (Test-Path "logs/test-agent.log") {
            $recentLogs = Get-Content "logs/test-agent.log" -Tail 1 -ErrorAction SilentlyContinue
            if ($recentLogs) {
                Write-Host "📋 Latest: $recentLogs" -ForegroundColor Gray
            }
        }
    }
} catch {
    Write-Host "`n⚠️  Shutting down 371 OS..." -ForegroundColor Yellow
} finally {
    # Clean shutdown
    Write-Host "🛑 Stopping all services..." -ForegroundColor Yellow
    
    Get-Job | Stop-Job
    Get-Job | Remove-Job -Force
    
    Write-Host "✅ 371 OS shutdown complete" -ForegroundColor Green
}