# 371 OS MCP Servers Startup Script - Simple Version
# Starts both Documentation and Cognition MCP servers for Qoder integration

param(
    [switch]$Status,
    [switch]$Test
)

$PROJECT_ROOT = "f:\os-main"
$MCP_DIR = "$PROJECT_ROOT\mcp"
$DOC_PORT = 39301
$COG_PORT = 39300

function Test-Port {
    param([int]$Port)
    try {
        $connection = Test-NetConnection -ComputerName "localhost" -Port $Port -WarningAction SilentlyContinue
        return $connection.TcpTestSucceeded
    } catch {
        return $false
    }
}

function Show-Status {
    Write-Host ""
    Write-Host "=== 371 OS MCP Server Status ===" -ForegroundColor Cyan
    Write-Host ""
    
    $docRunning = Test-Port -Port $DOC_PORT
    $cogRunning = Test-Port -Port $COG_PORT
    
    Write-Host "Documentation MCP Server (port $DOC_PORT): " -NoNewline
    if ($docRunning) {
        Write-Host "RUNNING" -ForegroundColor Green
    } else {
        Write-Host "STOPPED" -ForegroundColor Red
    }
    
    Write-Host "Cognition MCP Server (port $COG_PORT): " -NoNewline
    if ($cogRunning) {
        Write-Host "RUNNING" -ForegroundColor Green
    } else {
        Write-Host "STOPPED" -ForegroundColor Red
    }
    
    if ($docRunning -and $cogRunning) {
        Write-Host ""
        Write-Host "Both MCP servers are running!" -ForegroundColor Green
        Write-Host "Qoder MCP Configuration: $MCP_DIR\qoder-mcp-config.json" -ForegroundColor Cyan
    }
    Write-Host ""
}

function Test-Servers {
    Write-Host ""
    Write-Host "=== Testing MCP Servers ===" -ForegroundColor Cyan
    Write-Host ""
    
    # Test Documentation Server
    Write-Host "Testing Documentation MCP Server..." -ForegroundColor Yellow
    try {
        if (Test-Port -Port $DOC_PORT) {
            $response = Invoke-RestMethod -Uri "http://localhost:$DOC_PORT/health" -TimeoutSec 5
            Write-Host "Documentation server is healthy" -ForegroundColor Green
            Write-Host "Service: $($response.service)" -ForegroundColor Gray
            Write-Host "Documents loaded: $($response.documentsLoaded)" -ForegroundColor Gray
        } else {
            Write-Host "Documentation server not responding" -ForegroundColor Red
        }
    } catch {
        Write-Host "Documentation server test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    
    # Test Cognition Server
    Write-Host "Testing Cognition MCP Server..." -ForegroundColor Yellow
    try {
        if (Test-Port -Port $COG_PORT) {
            $response = Invoke-RestMethod -Uri "http://localhost:$COG_PORT/health" -TimeoutSec 5
            Write-Host "Cognition server is healthy" -ForegroundColor Green
            Write-Host "Service: $($response.service)" -ForegroundColor Gray
            Write-Host "Version: $($response.version)" -ForegroundColor Gray
        } else {
            Write-Host "Cognition server not responding" -ForegroundColor Red
        }
    } catch {
        Write-Host "Cognition server test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

# Main execution
if ($Status) {
    Show-Status
} elseif ($Test) {
    Test-Servers
} else {
    Write-Host ""
    Write-Host "=== 371 OS MCP Servers Management ===" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\mcp-status.ps1 -Status    # Show server status" -ForegroundColor Gray
    Write-Host "  .\mcp-status.ps1 -Test      # Test running servers" -ForegroundColor Gray
    Write-Host ""
    Write-Host "To start servers manually:" -ForegroundColor Yellow
    Write-Host "  Terminal 1: node $MCP_DIR\documentation-mcp-server.js" -ForegroundColor Gray
    Write-Host "  Terminal 2: node $MCP_DIR\mock-cognition-server.js" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Configuration file: $MCP_DIR\qoder-mcp-config.json" -ForegroundColor Cyan
    Write-Host ""
}