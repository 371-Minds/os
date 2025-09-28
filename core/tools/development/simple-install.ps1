# 371 OS Simple Dependency Installation
# Fixed PowerShell script to resolve npm install issues

Write-Host "371 OS Dependency Recovery Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Stop existing processes
Write-Host "Stopping existing npm processes..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null

# Clear cache and cleanup
Write-Host "Cleaning up..." -ForegroundColor Yellow
npm cache clean --force
if (Test-Path "node_modules") {
    Remove-Item node_modules -Recurse -Force
}

# Configure npm
Write-Host "Configuring npm..." -ForegroundColor Yellow
npm config set registry https://registry.npmjs.org/
npm config set legacy-peer-deps true

# Install core Nx first
Write-Host "Installing Nx..." -ForegroundColor Yellow
npm install nx@21.4.1 --no-audit --legacy-peer-deps

# Test Nx
Write-Host "Testing Nx installation..." -ForegroundColor Yellow
$nxTest = npx nx --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "SUCCESS: Nx installed - $nxTest" -ForegroundColor Green
} else {
    Write-Host "ERROR: Nx installation failed" -ForegroundColor Red
    exit 1
}

# Install TypeScript
Write-Host "Installing TypeScript..." -ForegroundColor Yellow
npm install typescript @types/node --no-audit --legacy-peer-deps

# Install production dependencies in groups
Write-Host "Installing production dependencies..." -ForegroundColor Yellow
npm install express cors fs-extra dotenv --no-audit --legacy-peer-deps
npm install ethers web3.storage ipfs-http-client --no-audit --legacy-peer-deps

# Install Nx plugins
Write-Host "Installing Nx plugins..." -ForegroundColor Yellow
npm install @nx/js @nx/workspace @nx/node --no-audit --legacy-peer-deps

# Try ElizaOS (may fail - that's ok)
Write-Host "Attempting ElizaOS installation..." -ForegroundColor Yellow
npm install @elizaos/core --no-audit --legacy-peer-deps 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: ElizaOS installation failed - will continue" -ForegroundColor Yellow
}

# Final npm install to update package.json
Write-Host "Finalizing installation..." -ForegroundColor Yellow
npm install --legacy-peer-deps --no-audit

# Test results
Write-Host ""
Write-Host "INSTALLATION COMPLETE!" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host "Node: $(node --version)" -ForegroundColor White
Write-Host "NPM: $(npm --version)" -ForegroundColor White

$nxVersion = npx nx --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Nx: $nxVersion" -ForegroundColor Green
} else {
    Write-Host "Nx: Installation issue" -ForegroundColor Red
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test: npx nx graph --file=test.json" -ForegroundColor White
Write-Host "2. Build: npx nx build elizaos-plugin-nx-workspace" -ForegroundColor White
Write-Host "3. Test agent: node agents/test-agent/index.js" -ForegroundColor White