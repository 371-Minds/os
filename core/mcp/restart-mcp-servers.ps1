#!/usr/bin/env pwsh
# 371 OS MCP Server Restart Script
# Restarts all MCP servers with proper error handling and validation

Write-Host "🔄 371 OS MCP Server Restart Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

# Function to check if port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("127.0.0.1", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Function to kill process on port
function Stop-ProcessOnPort {
    param([int]$Port)
    Write-Host "🔍 Checking for processes on port $Port..." -ForegroundColor Yellow
    
    try {
        $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        if ($connections) {
            foreach ($conn in $connections) {
                $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
                if ($process -and $process.ProcessName -eq "node") {
                    Write-Host "⚡ Stopping Node.js process $($process.Id) on port $Port..." -ForegroundColor Red
                    Stop-Process -Id $process.Id -Force
                    Start-Sleep -Seconds 2
                }
            }
        }
    }
    catch {
        Write-Host "⚠️  Error checking port $Port`: $_" -ForegroundColor Yellow
    }
}

# Function to start MCP server with validation
function Start-MCPServer {
    param(
        [string]$Name,
        [string]$Script,
        [int]$Port,
        [string]$HealthEndpoint = "/health"
    )
    
    Write-Host "🚀 Starting $Name server on port $Port..." -ForegroundColor Green
    
    # Check if script exists
    if (-not (Test-Path $Script)) {
        Write-Host "❌ Server script not found: $Script" -ForegroundColor Red
        return $false
    }
    
    # Stop any existing process on the port
    Stop-ProcessOnPort -Port $Port
    
    # Start the server in background
    $process = Start-Process -FilePath "node" -ArgumentList $Script -PassThru -WindowStyle Hidden
    
    # Wait for server to start
    Write-Host "⏳ Waiting for $Name server to start..." -ForegroundColor Yellow
    $timeout = 30
    $elapsed = 0
    
    while ($elapsed -lt $timeout) {
        Start-Sleep -Seconds 1
        $elapsed++
        
        if (Test-Port -Port $Port) {
            Write-Host "✅ $Name server started successfully on port $Port" -ForegroundColor Green
            
            # Test health endpoint if available
            try {
                $response = Invoke-RestMethod -Uri "http://localhost:$Port$HealthEndpoint" -TimeoutSec 5 -ErrorAction SilentlyContinue
                if ($response) {
                    Write-Host "🏥 Health check passed for $Name server" -ForegroundColor Green
                }
            }
            catch {
                Write-Host "⚠️  Health check failed for $Name server (server may not support /health endpoint)" -ForegroundColor Yellow
            }
            
            return $true
        }
    }
    
    Write-Host "❌ $Name server failed to start within $timeout seconds" -ForegroundColor Red
    return $false
}

# Main execution
Write-Host ""
Write-Host "📋 Restarting MCP Servers..." -ForegroundColor Cyan

# Server configurations
$servers = @(
    @{
        Name = "Documentation MCP"
        Script = "f:/os-main/core/mcp/documentation-mcp-server.js"
        Port = 39301
        HealthEndpoint = "/health"
    },
    @{
        Name = "Cognition MCP"
        Script = "f:/os-main/core/mcp/mock-cognition-server.js"
        Port = 39300
        HealthEndpoint = "/health"
    }
)

$successCount = 0
$totalServers = $servers.Count

foreach ($server in $servers) {
    Write-Host ""
    if (Start-MCPServer -Name $server.Name -Script $server.Script -Port $server.Port -HealthEndpoint $server.HealthEndpoint) {
        $successCount++
    }
}

Write-Host ""
Write-Host "📊 Restart Summary:" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan
Write-Host "✅ Successful: $successCount/$totalServers servers" -ForegroundColor Green

if ($successCount -eq $totalServers) {
    Write-Host ""
    Write-Host "🎉 All MCP servers restarted successfully!" -ForegroundColor Green
    Write-Host "🔗 Available endpoints:" -ForegroundColor Cyan
    Write-Host "   📚 Documentation: http://localhost:39301/model_context_protocol/2024-11-05/documentation" -ForegroundColor White
    Write-Host "   🧠 Cognition SSE: http://localhost:39300/model_context_protocol/2024-11-05/sse" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 You can now use the qoder-mcp-config.json configuration with Qoder IDE" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "⚠️  Some servers failed to start. Check the logs above for details." -ForegroundColor Yellow
    Write-Host "💡 Try running individual server scripts manually to debug issues." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🔧 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Verify MCP configuration in Qoder IDE" -ForegroundColor White
Write-Host "2. Test connection with: curl http://localhost:39300/health" -ForegroundColor White
Write-Host "3. Check server logs if connection issues persist" -ForegroundColor White