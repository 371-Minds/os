# 371 OS MCP Servers Startup Script
# Starts both Documentation and Cognition MCP servers for Qoder integration

param(
    [switch]$Documentation = $false,
    [switch]$Cognition = $false,
    [switch]$Both = $false,
    [switch]$Test = $false,
    [switch]$Stop = $false,
    [switch]$Status = $false
)

$ErrorActionPreference = "Stop"

# Configuration
$PROJECT_ROOT = "f:\os-main"
$MCP_DIR = "$PROJECT_ROOT\mcp"
$DOCUMENTATION_SERVER = "$MCP_DIR\documentation-mcp-server.js"
$COGNITION_SERVER = "$MCP_DIR\mock-cognition-server.js"
$DOC_PORT = 39301
$COG_PORT = 39300

function Write-Header {
    param([string]$Title)
    Write-Host ""
    Write-Host "=" * 60 -ForegroundColor Cyan
    Write-Host " $Title" -ForegroundColor Yellow
    Write-Host "=" * 60 -ForegroundColor Cyan
    Write-Host ""
}

function Test-Port {
    param([int]$Port)
    try {
        $connection = Test-NetConnection -ComputerName "localhost" -Port $Port -WarningAction SilentlyContinue
        return $connection.TcpTestSucceeded
    } catch {
        return $false
    }
}

function Start-MCPServer {
    param(
        [string]$ServerPath,
        [int]$Port,
        [string]$Name
    )
    
    Write-Host "Starting $Name on port $Port..." -ForegroundColor Green
    
    if (Test-Port -Port $Port) {
        Write-Host "⚠️  Port $Port is already in use" -ForegroundColor Yellow
        return $false
    }
    
    if (-not (Test-Path $ServerPath)) {
        Write-Host "❌ Server file not found: $ServerPath" -ForegroundColor Red
        return $false
    }
    
    try {
        Start-Process -FilePath "node" -ArgumentList $ServerPath -WindowStyle Normal
        Start-Sleep -Seconds 2
        
        if (Test-Port -Port $Port) {
            Write-Host "✅ $Name started successfully" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ $Name failed to start" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ Failed to start $Name`: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

function Stop-MCPServers {
    Write-Host "Stopping MCP servers..." -ForegroundColor Yellow
    
    # Find and kill processes using the MCP ports
    $processes = @()
    $processes += Get-Process | Where-Object { $_.ProcessName -eq "node" }
    
    foreach ($process in $processes) {
        try {
            $connections = netstat -ano | Select-String ":$DOC_PORT|:$COG_PORT" | Select-String $process.Id
            if ($connections) {
                Write-Host "Stopping process $($process.Id) ($($process.ProcessName))" -ForegroundColor Yellow
                Stop-Process -Id $process.Id -Force
            }
        } catch {
            # Process might have already exited
        }
    }
    
    Start-Sleep -Seconds 2
    Write-Host "✅ MCP servers stopped" -ForegroundColor Green
}

function Test-MCPServers {
    Write-Header "Testing MCP Servers"
    
    # Test Documentation Server
    Write-Host "Testing Documentation MCP Server (port $DOC_PORT)..." -ForegroundColor Cyan
    try {
        if (Test-Port -Port $DOC_PORT) {
            $response = Invoke-RestMethod -Uri "http://localhost:$DOC_PORT/health" -TimeoutSec 5
            Write-Host "✅ Documentation server is healthy" -ForegroundColor Green
            Write-Host "   Service: $($response.service)" -ForegroundColor Gray
            Write-Host "   Documents loaded: $($response.documentsLoaded)" -ForegroundColor Gray
        } else {
            Write-Host "❌ Documentation server not responding" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Documentation server test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    
    # Test Cognition Server
    Write-Host "Testing Cognition MCP Server (port $COG_PORT)..." -ForegroundColor Cyan
    try {
        if (Test-Port -Port $COG_PORT) {
            $response = Invoke-RestMethod -Uri "http://localhost:$COG_PORT/health" -TimeoutSec 5
            Write-Host "✅ Cognition server is healthy" -ForegroundColor Green
            Write-Host "   Service: $($response.service)" -ForegroundColor Gray
            Write-Host "   Version: $($response.version)" -ForegroundColor Gray
        } else {
            Write-Host "❌ Cognition server not responding" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Cognition server test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

function Show-Status {
    Write-Header "MCP Server Status"
    
    $docRunning = Test-Port -Port $DOC_PORT
    $cogRunning = Test-Port -Port $COG_PORT
    
    Write-Host "Documentation MCP Server (port $DOC_PORT): " -NoNewline
    if ($docRunning) {
        Write-Host "✅ RUNNING" -ForegroundColor Green
    } else {
        Write-Host "❌ STOPPED" -ForegroundColor Red
    }
    
    Write-Host "Cognition MCP Server (port $COG_PORT): " -NoNewline
    if ($cogRunning) {
        Write-Host "✅ RUNNING" -ForegroundColor Green
    } else {
        Write-Host "❌ STOPPED" -ForegroundColor Red
    }
    
    if ($docRunning -and $cogRunning) {
        Write-Host ""
        Write-Host "🎉 Both MCP servers are running!" -ForegroundColor Green
        Write-Host "📋 Qoder MCP Configuration: $MCP_DIR\qoder-mcp-config.json" -ForegroundColor Cyan
    }
}

# Main execution
try {
    Write-Header "371 OS MCP Servers Management"
    
    if ($Stop) {
        Stop-MCPServers
        exit 0
    }
    
    if ($Status) {
        Show-Status
        exit 0
    }
    
    if ($Test) {
        Test-MCPServers
        exit 0
    }
    
    # Default to starting both if no specific flags
    if (-not $Documentation -and -not $Cognition -and -not $Both) {
        $Both = $true
    }
    
    $success = $true
    
    if ($Documentation -or $Both) {
        $result = Start-MCPServer -ServerPath $DOCUMENTATION_SERVER -Port $DOC_PORT -Name "Documentation MCP Server"
        $success = $success -and $result
    }
    
    if ($Cognition -or $Both) {
        $result = Start-MCPServer -ServerPath $COGNITION_SERVER -Port $COG_PORT -Name "Cognition MCP Server"
        $success = $success -and $result
    }
    
    if ($success) {
        Write-Host ""
        Write-Host "🎉 MCP servers started successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📋 Next steps:" -ForegroundColor Cyan
        Write-Host "1. Configure Qoder IDE with: $MCP_DIR\qoder-mcp-config.json" -ForegroundColor Gray
        Write-Host "2. Test servers with: .\start-mcp-servers.ps1 -Test" -ForegroundColor Gray
        Write-Host "3. Check status with: .\start-mcp-servers.ps1 -Status" -ForegroundColor Gray
        Write-Host ""
        Write-Host "🔗 Available endpoints:" -ForegroundColor Cyan
        if ($Documentation -or $Both) {
            Write-Host "   Documentation: http://localhost:$DOC_PORT/model_context_protocol/2024-11-05/documentation" -ForegroundColor Gray
        }
        if ($Cognition -or $Both) {
            Write-Host "   Cognition: http://localhost:$COG_PORT/model_context_protocol/2024-11-05/sse" -ForegroundColor Gray
        }
    } else {
        Write-Host ""
        Write-Host "❌ Some servers failed to start. Check the output above for details." -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ Script execution failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Usage information
if ($args.Count -eq 0 -or $args -contains "-h" -or $args -contains "--help") {
    Write-Host ""
    Write-Host "Usage Examples:" -ForegroundColor Yellow
    Write-Host "  .\start-mcp-servers.ps1                    # Start both servers" -ForegroundColor Gray
    Write-Host "  .\start-mcp-servers.ps1 -Documentation    # Start documentation server only" -ForegroundColor Gray
    Write-Host "  .\start-mcp-servers.ps1 -Cognition        # Start cognition server only" -ForegroundColor Gray
    Write-Host "  .\start-mcp-servers.ps1 -Both             # Start both servers explicitly" -ForegroundColor Gray
    Write-Host "  .\start-mcp-servers.ps1 -Test             # Test running servers" -ForegroundColor Gray
    Write-Host "  .\start-mcp-servers.ps1 -Status           # Show server status" -ForegroundColor Gray
    Write-Host "  .\start-mcp-servers.ps1 -Stop             # Stop all servers" -ForegroundColor Gray
    Write-Host ""
}