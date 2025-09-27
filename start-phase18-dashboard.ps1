#!/usr/bin/env powershell

<#
.SYNOPSIS
Phase 18 Dashboard Launcher

.DESCRIPTION
Quick launcher for the Phase 18 C-Suite Governance Dashboard with GUI visualization.
This script will install dependencies, start the web server, and open the dashboard.

.EXAMPLE
./start-phase18-dashboard.ps1
#>

Write-Host ""
Write-Host "🎯 Phase 18: C-Suite Governance Dashboard Launcher" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the 371 OS root directory." -ForegroundColor Red
    exit 1
}

# Check if bun is available
try {
    $bunVersion = bun --version
    Write-Host "✅ Bun detected: $bunVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Bun not found. Please install Bun first: https://bun.sh" -ForegroundColor Red
    exit 1
}

# Install dependencies if needed
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
try {
    bun install
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Error installing dependencies" -ForegroundColor Red
    exit 1
}

# Check if Phase 18 simulation exists
$simulationPath = "os-workspace\apps\phase18-voting-simulation"
if (Test-Path $simulationPath) {
    Write-Host "✅ Phase 18 simulation detected" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: Phase 18 simulation not found at $simulationPath" -ForegroundColor Yellow
    Write-Host "   Dashboard will still work with local simulation" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Starting Phase 18 Dashboard Server..." -ForegroundColor Cyan
Write-Host "📊 Dashboard will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host "🔄 Real-time WebSocket updates enabled" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Usage Instructions:" -ForegroundColor Yellow
Write-Host "   1. Dashboard will open automatically in your browser" -ForegroundColor White
Write-Host "   2. Click 'Start Simulation' to begin the demo" -ForegroundColor White
Write-Host "   3. Watch the autonomous C-Suite governance process!" -ForegroundColor White
Write-Host ""
Write-Host "🎆 Experience the world's first autonomous C-Suite governance system!" -ForegroundColor Magenta
Write-Host ""

# Start the dashboard server in background
$dashboardJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    bun phase18-dashboard-server.js
}

# Wait a moment for server to start
Start-Sleep -Seconds 3

# Open the dashboard in default browser
Write-Host "🌐 Opening dashboard in browser..." -ForegroundColor Cyan
try {
    Start-Process "http://localhost:3000"
    Write-Host "✅ Dashboard opened successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Could not auto-open browser. Please navigate to http://localhost:3000" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Phase 18 Dashboard is now running!" -ForegroundColor Green
Write-Host "📊 Monitor the job with: Get-Job" -ForegroundColor Cyan
Write-Host "🛑 Stop the server with: Stop-Job -Id $($dashboardJob.Id)" -ForegroundColor Cyan
Write-Host ""

# Keep the script running and show server output
Write-Host "📡 Server Output (Press Ctrl+C to stop):" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Gray

try {
    # Monitor the background job
    do {
        Receive-Job -Job $dashboardJob -Keep
        Start-Sleep -Seconds 1
    } while ($dashboardJob.State -eq "Running")
} catch {
    Write-Host ""
    Write-Host "🛑 Dashboard server stopped" -ForegroundColor Yellow
} finally {
    # Clean up the job
    Stop-Job -Job $dashboardJob -ErrorAction SilentlyContinue
    Remove-Job -Job $dashboardJob -ErrorAction SilentlyContinue
    
    Write-Host ""
    Write-Host "✅ Phase 18 Dashboard session ended" -ForegroundColor Green
    Write-Host "🎯 Thank you for experiencing the future of autonomous governance!" -ForegroundColor Cyan
}