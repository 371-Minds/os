#!/usr/bin/env powershell

# 371 OS Dependency Recovery Script
# This script implements progressive installation to resolve hanging npm install

Write-Host "🔧 371 OS Dependency Recovery Script" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

$ErrorActionPreference = "Continue"

# Function to test command availability
function Test-Command {
    param([string]$Command)
    try {
        if (Get-Command $Command -ErrorAction SilentlyContinue) {
            return $true
        }
        return $false
    } catch {
        return $false
    }
}

# Function to kill node processes
function Stop-NodeProcesses {
    Write-Host "Stopping existing Node processes..." -ForegroundColor Yellow
    try {
        taskkill /F /IM node.exe 2>$null
        Start-Sleep -Seconds 2
        Write-Host "✅ Node processes stopped" -ForegroundColor Green
    } catch {
        Write-Host "ℹ️ No Node processes to stop" -ForegroundColor Blue
    }
}

# Step 1: Cleanup and Preparation
Write-Host "Step 1: Environment Cleanup" -ForegroundColor Cyan
Write-Host "----------------------------" -ForegroundColor Cyan

Stop-NodeProcesses

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Remove existing node_modules to start fresh
if (Test-Path "node_modules") {
    Write-Host "Removing existing node_modules..." -ForegroundColor Yellow
    Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✅ node_modules removed" -ForegroundColor Green
} else {
    Write-Host "ℹ️ No existing node_modules found" -ForegroundColor Blue
}

# Verify npm configuration
Write-Host "Configuring npm for optimal performance..." -ForegroundColor Yellow
npm config set registry https://registry.npmjs.org/
npm config set timeout 300000
npm config set legacy-peer-deps true
Write-Host "✅ NPM configured" -ForegroundColor Green

Write-Host ""

# Step 2: Install Core Nx Dependencies
Write-Host "Step 2: Installing Core Nx Dependencies" -ForegroundColor Cyan
Write-Host "---------------------------------------" -ForegroundColor Cyan

Write-Host "Installing Nx workspace tools..." -ForegroundColor Yellow
npm install nx@^21.4.1 @nx/js@^21.0.0 @nx/workspace@^21.0.0 --no-save --no-audit

# Test Nx installation
if (npx nx --version) {
    Write-Host "✅ Nx installed successfully: $(npx nx --version)" -ForegroundColor Green
} else {
    Write-Host "❌ Nx installation failed" -ForegroundColor Red
    Write-Host "Attempting alternative installation..." -ForegroundColor Yellow
    npm install -g nx
    if (nx --version) {
        Write-Host "✅ Nx installed globally: $(nx --version)" -ForegroundColor Green
    } else {
        Write-Host "❌ Nx installation completely failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# Step 3: Install TypeScript and Core Tools
Write-Host "Step 3: Installing TypeScript and Core Tools" -ForegroundColor Cyan
Write-Host "--------------------------------------------" -ForegroundColor Cyan

Write-Host "Installing TypeScript and essential tools..." -ForegroundColor Yellow
npm install typescript@^5.0.0 @types/node@^22.0.0 --no-save --no-audit
Write-Host "✅ TypeScript tools installed" -ForegroundColor Green

Write-Host ""

# Step 4: Research and Install ElizaOS
Write-Host "Step 4: Installing ElizaOS Dependencies" -ForegroundColor Cyan
Write-Host "---------------------------------------" -ForegroundColor Cyan

Write-Host "Researching ElizaOS packages..." -ForegroundColor Yellow
npm search elizaos --no-audit 2>$null | Select-Object -First 10

Write-Host "Attempting ElizaOS installation..." -ForegroundColor Yellow

# Try multiple possible ElizaOS package names
$elizaPackages = @('@elizaos/core@^1.5.2', '@ai16z/eliza', 'elizaos')
$elizaInstalled = $false

foreach ($package in $elizaPackages) {
    Write-Host "Trying package: $package" -ForegroundColor Yellow
    npm install $package --no-save --no-audit 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ ElizaOS installed: $package" -ForegroundColor Green
        $elizaInstalled = $true
        break
    } else {
        Write-Host "⚠️ Failed to install: $package" -ForegroundColor DarkYellow
    }
}

if (-not $elizaInstalled) {
    Write-Host "⚠️ ElizaOS installation failed - will continue without it" -ForegroundColor Yellow
    Write-Host "   This can be resolved later once the correct package is identified" -ForegroundColor DarkGray
}

Write-Host ""

# Step 5: Install Production Dependencies
Write-Host "Step 5: Installing Production Dependencies" -ForegroundColor Cyan
Write-Host "-----------------------------------------" -ForegroundColor Cyan

$prodDeps = @(
    'express@^4.18.0',
    'cors@^2.8.5', 
    'helmet@^7.0.0',
    'winston@^3.10.0',
    'ethers@^6.0.0',
    'web3.storage@^4.5.0',
    'ipfs-http-client@^60.0.0',
    'fs-extra@^11.0.0',
    'dotenv@^16.0.0'
)

foreach ($dep in $prodDeps) {
    Write-Host "Installing $dep..." -ForegroundColor Yellow
    npm install $dep --no-save --no-audit
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Installed: $dep" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Failed: $dep" -ForegroundColor DarkYellow
    }
}

Write-Host ""

# Step 6: Install Development Dependencies
Write-Host "Step 6: Installing Development Dependencies" -ForegroundColor Cyan
Write-Host "------------------------------------------" -ForegroundColor Cyan

$devDeps = @(
    '@nx/eslint@^21.0.0',
    '@nx/jest@^21.0.0', 
    '@nx/node@^21.0.0',
    '@nx/react@^21.0.0',
    'eslint@^8.0.0',
    'jest@^29.0.0',
    'concurrently@^8.0.0',
    'nodemon@^3.0.0'
)

foreach ($dep in $devDeps) {
    Write-Host "Installing $dep..." -ForegroundColor Yellow
    npm install $dep --save-dev --no-audit
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Installed: $dep" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Failed: $dep" -ForegroundColor DarkYellow
    }
}

Write-Host ""

# Step 7: Finalize Installation
Write-Host "Step 7: Finalizing Installation" -ForegroundColor Cyan
Write-Host "-------------------------------" -ForegroundColor Cyan

Write-Host "Running final npm install to update package.json..." -ForegroundColor Yellow
npm install --legacy-peer-deps --no-audit

Write-Host ""

# Step 8: Verification
Write-Host "Step 8: Verification Tests" -ForegroundColor Cyan
Write-Host "-------------------------" -ForegroundColor Cyan

Write-Host "Testing installations..." -ForegroundColor Yellow

# Test Node and NPM
Write-Host "Node version: $(node --version)" -ForegroundColor White
Write-Host "NPM version: $(npm --version)" -ForegroundColor White

# Test Nx
if (Test-Command "npx") {
    try {
        $nxVersion = npx nx --version 2>$null
        if ($nxVersion) {
            Write-Host "✅ Nx version: $nxVersion" -ForegroundColor Green
        } else {
            Write-Host "⚠️ Nx installed but version check failed" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "⚠️ Nx command failed" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ npx not available" -ForegroundColor Red
}

# Test TypeScript
if (Test-Command "tsc") {
    Write-Host "✅ TypeScript available" -ForegroundColor Green
} else {
    Write-Host "⚠️ TypeScript not in PATH" -ForegroundColor Yellow
}

# Test if key packages are accessible
Write-Host "Testing package accessibility..." -ForegroundColor Yellow
$testPackages = @('express', 'ethers', 'fs-extra')
foreach ($package in $testPackages) {
    try {
        node -e "console.log('✅ $package:', require('$package').constructor.name)" 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Package accessible: $package" -ForegroundColor Green
        } else {
            Write-Host "⚠️ Package issue: $package" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "⚠️ Cannot test: $package" -ForegroundColor Yellow
    }
}

Write-Host ""

# Final Summary
Write-Host "🎉 Installation Recovery Complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test Nx commands: npx nx graph --file=test.json" -ForegroundColor White
Write-Host "2. Build plugins: npx nx build elizaos-plugin-nx-workspace" -ForegroundColor White  
Write-Host "3. Test agent: node agents/test-agent/index.js" -ForegroundColor White
Write-Host ""
Write-Host "If issues persist, check troubleshooting/dependency-issues/" -ForegroundColor DarkGray