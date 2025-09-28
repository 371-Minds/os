#!/usr/bin/env pwsh
# Simple MCP Server Restart Script

Write-Host "🔄 Restarting MCP Servers..." -ForegroundColor Cyan

# Kill existing processes on MCP ports
Write-Host "🛑 Stopping existing servers..." -ForegroundColor Yellow

$ports = @(39300, 39301)
foreach ($port in $ports) {
    try {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if ($connections) {
            foreach ($conn in $connections) {
                $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
                if ($process -and $process.ProcessName -eq "node") {
                    Write-Host "  ⚡ Stopping Node.js process $($process.Id) on port $port" -ForegroundColor Red
                    Stop-Process -Id $process.Id -Force
                }
            }
        }
    }
    catch {
        Write-Host "  ⚠️ Could not check port $port" -ForegroundColor Yellow
    }
}

Start-Sleep -Seconds 3

# Start servers
Write-Host "🚀 Starting servers..." -ForegroundColor Green

Write-Host "  📚 Starting Documentation MCP server on port 39301..." -ForegroundColor Cyan
Start-Process -FilePath "node" -ArgumentList "f:/os-main/core/mcp/documentation-mcp-server.js" -WindowStyle Hidden

Start-Sleep -Seconds 2

Write-Host "  🧠 Starting Cognition MCP server on port 39300..." -ForegroundColor Cyan
Start-Process -FilePath "node" -ArgumentList "f:/os-main/core/mcp/mock-cognition-server.js" -WindowStyle Hidden

Start-Sleep -Seconds 5

# Test connectivity
Write-Host "🔍 Testing servers..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "http://localhost:39300/health" -TimeoutSec 5 -ErrorAction SilentlyContinue
    Write-Host "  ✅ Cognition server is responding" -ForegroundColor Green
}
catch {
    Write-Host "  ❌ Cognition server not responding" -ForegroundColor Red
}

try {
    $response = Invoke-RestMethod -Uri "http://localhost:39301/health" -TimeoutSec 5 -ErrorAction SilentlyContinue
    Write-Host "  ✅ Documentation server is responding" -ForegroundColor Green
}
catch {
    Write-Host "  ❌ Documentation server not responding" -ForegroundColor Red
}

Write-Host ""
Write-Host "✅ MCP Server restart complete!" -ForegroundColor Green
Write-Host "💡 Use the updated qoder-mcp-config.json with Qoder IDE" -ForegroundColor Yellow