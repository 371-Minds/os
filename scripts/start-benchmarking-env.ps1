#!/usr/bin/env pwsh
# This script is responsible for starting the benchmarking environment.

# Set strict mode
Set-StrictMode -Version Latest

# Exit on error
$ErrorActionPreference = "Stop"

# --- Helper Functions ---

# Function to print a formatted message
function Write-Log {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Message,
        [string]$Level = "INFO"
    )
    Write-Output "[$Level] $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Message"
}

# Function to check if a command exists
function Test-CommandExists {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Command
    )
    return (Get-Command $Command -ErrorAction SilentlyContinue) -ne $null
}

# --- Main Script ---

# Set the working directory to the project root (one level up from the script directory)
Set-Location -Path (Get-Item -Path "$PSScriptRoot/..").FullName

Write-Log "Starting benchmarking environment setup..."

# 1. Verify Dependencies
Write-Log "Verifying dependencies..."
if (-not (Test-CommandExists "bun")) {
    Write-Log "ERROR: bun.js is not installed. Please install it before running this script."
    exit 1
}
Write-Log "Dependencies verified."

# 2. Start Core Services
Write-Log "Starting core services in parallel..."

$services = @(
    "c-suite-agent-runner",
    "enhanced-mail-conduit",
    "cognitive-interface"
)

foreach ($service in $services) {
    Write-Log "Starting service: $service"
    Start-Job -ScriptBlock {
        param($serviceName)
        cd ./core/os-workspace
        bun nx serve $serviceName
    } -ArgumentList $service
}

Write-Log "All services have been launched in the background."

# 3. Wait for Services to Initialize
Write-Log "Waiting for services to initialize (15 seconds)..."
Start-Sleep -Seconds 15

# 4. Run Health Checks
Write-Log "Running health checks..."

# Health check for MCP server connectivity
Write-Log "Checking MCP server connectivity..."
try {
    $mcpResponse = node ./core/mcp/test-mcp-connection.js
    Write-Log "MCP server connection successful: $mcpResponse"
}
catch {
    Write-Log "ERROR: MCP server connection failed."
    # Optionally, stop the script if a health check fails
    # exit 1
}

# Health check for enhanced mail-conduit
Write-Log "Checking enhanced-mail-conduit service..."
try {
    $mailConduitResponse = Invoke-RestMethod -Uri "http://localhost:3001/health"
    Write-Log "Enhanced-mail-conduit health check successful: $($mailConduitResponse | ConvertTo-Json -Depth 3)"
}
catch {
    Write-Log "ERROR: Enhanced-mail-conduit health check failed."
    # exit 1
}

Write-Log "Benchmarking environment is ready."
Write-Log "You can view the logs for each service using 'bun nx view-logs <service-name>'"
Write-Log "To stop all services, you may need to manually stop the background jobs."
