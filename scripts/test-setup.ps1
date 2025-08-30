# 371 OS Quick Start Test (PowerShell Edition)
param(
    [switch]$SkipDependencyCheck,
    [switch]$SkipBuild
)

Write-Host "371 OS Quick Start Test!" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green

# Test basic functionality
Write-Host "Testing basic PowerShell execution..." -ForegroundColor Yellow
$currentLocation = Get-Location
Write-Host "Current directory: $currentLocation" -ForegroundColor White

# Check if we're in the right directory
if (Test-Path "nx.json") {
    Write-Host "SUCCESS: Found nx.json - we're in an Nx workspace!" -ForegroundColor Green
} else {
    Write-Host "WARNING: nx.json not found" -ForegroundColor Yellow
}

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "SUCCESS: Found package.json" -ForegroundColor Green
    
    # Try to read it
    try {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        Write-Host "Package name: $($packageJson.name)" -ForegroundColor White
        Write-Host "Version: $($packageJson.version)" -ForegroundColor White
    } catch {
        Write-Host "WARNING: Could not parse package.json: $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "ERROR: package.json not found" -ForegroundColor Red
}

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "SUCCESS: node_modules directory exists" -ForegroundColor Green
} else {
    Write-Host "INFO: node_modules not found - dependencies not installed yet" -ForegroundColor Yellow
}

# Check if our PowerShell scripts exist
if (Test-Path "scripts/quick-start.ps1") {
    Write-Host "SUCCESS: PowerShell quick-start script exists" -ForegroundColor Green
}

if (Test-Path "scripts/deploy-akash.ps1") {
    Write-Host "SUCCESS: PowerShell Akash deployment script exists" -ForegroundColor Green
}

# Test if we can check Node.js
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "SUCCESS: Node.js is available: $nodeVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "WARNING: Node.js not found in PATH" -ForegroundColor Yellow
}

# Test if we can check npm
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "SUCCESS: npm is available: $npmVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "WARNING: npm not found in PATH" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "371 OS Quick Start Test Complete!" -ForegroundColor Green
Write-Host "If you see mostly SUCCESS messages above, the environment is ready!" -ForegroundColor Green