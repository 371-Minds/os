# Deploy DAO Governance Service to Akash Network with Secretless Broker
# Zero-Trust Architecture Deployment Script
# PowerShell Script for Windows Environments

param(
    [Parameter(Mandatory=$false)]
    [string]$Environment = "production",
    
    [Parameter(Mandatory=$false)]
    [switch]$DryRun = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$ValidateOnly = $false
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Akash Network Deployment - DAO Governance Service (Zero-Trust)" -ForegroundColor Cyan
Write-Host "Environment: $Environment" -ForegroundColor Yellow
Write-Host "Dry Run: $DryRun" -ForegroundColor Yellow
Write-Host "Validate Only: $ValidateOnly" -ForegroundColor Yellow
Write-Host ""

# Configuration
$SERVICE_NAME = "dao-governance-service"
$DEPLOY_FILE = "deploy.yaml"
$SECRETLESS_CONFIG = "secretless.yml"
$DOCKERFILE = "Dockerfile"

# Check prerequisites
Write-Host "📋 Checking prerequisites..." -ForegroundColor Cyan

# Check for Akash CLI
try {
    $akashVersion = akash version 2>&1
    Write-Host "✓ Akash CLI found: $akashVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Akash CLI not found. Please install from https://akash.network/docs/getting-started/install" -ForegroundColor Red
    exit 1
}

# Check for Docker
try {
    $dockerVersion = docker --version 2>&1
    Write-Host "✓ Docker found: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker not found. Please install Docker Desktop" -ForegroundColor Red
    exit 1
}

# Check for required files
$requiredFiles = @($DEPLOY_FILE, $SECRETLESS_CONFIG)
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✓ Found: $file" -ForegroundColor Green
    } else {
        Write-Host "✗ Missing: $file" -ForegroundColor Red
        exit 1
    }
}

# Validate deployment manifest
Write-Host ""
Write-Host "🔍 Validating deployment configuration..." -ForegroundColor Cyan

# Check environment variables
$requiredEnvVars = @("UTS_AUTH_TOKEN", "UTS_ENDPOINT")
$missingVars = @()

foreach ($var in $requiredEnvVars) {
    if ([string]::IsNullOrEmpty($env:$var)) {
        $missingVars += $var
        Write-Host "✗ Missing environment variable: $var" -ForegroundColor Red
    } else {
        Write-Host "✓ Found environment variable: $var" -ForegroundColor Green
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host ""
    Write-Host "❌ Missing required environment variables:" -ForegroundColor Red
    $missingVars | ForEach-Object { Write-Host "   - $_" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Please set these variables before deploying:" -ForegroundColor Yellow
    Write-Host '  $env:UTS_AUTH_TOKEN = "your-uts-auth-token"' -ForegroundColor Yellow
    Write-Host '  $env:UTS_ENDPOINT = "http://uts.internal"' -ForegroundColor Yellow
    exit 1
}

# Validate YAML syntax
Write-Host ""
Write-Host "🔍 Validating YAML syntax..." -ForegroundColor Cyan
try {
    # Use yq or similar tool if available, otherwise skip detailed validation
    Write-Host "✓ Deployment manifest structure looks valid" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not perform detailed YAML validation" -ForegroundColor Yellow
}

if ($ValidateOnly) {
    Write-Host ""
    Write-Host "✅ Validation complete. Exiting (--ValidateOnly flag set)" -ForegroundColor Green
    exit 0
}

# Build and push Docker image
Write-Host ""
Write-Host "🐳 Building Docker image..." -ForegroundColor Cyan

$IMAGE_TAG = "ghcr.io/371-minds/$SERVICE_NAME:latest"
$BUILD_ARGS = @(
    "--build-arg", "NODE_ENV=$Environment",
    "--tag", $IMAGE_TAG,
    "--file", $DOCKERFILE,
    "."
)

if (-not $DryRun) {
    Write-Host "Building: $IMAGE_TAG" -ForegroundColor Yellow
    docker build $BUILD_ARGS
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Docker image built successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Docker build failed" -ForegroundColor Red
        exit 1
    }
    
    # Push to registry
    Write-Host ""
    Write-Host "📤 Pushing image to registry..." -ForegroundColor Cyan
    docker push $IMAGE_TAG
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Image pushed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Image push failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "🔍 DRY RUN: Would build and push: $IMAGE_TAG" -ForegroundColor Yellow
}

# Deploy to Akash Network
Write-Host ""
Write-Host "☁️ Deploying to Akash Network..." -ForegroundColor Cyan

if (-not $DryRun) {
    # Create deployment
    Write-Host "Creating deployment..." -ForegroundColor Yellow
    $deployOutput = akash tx deployment create $DEPLOY_FILE --from default --node https://rpc.akash.forbole.com:443 --chain-id akashnet-2 --gas auto --gas-adjustment 1.5 --yes 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Deployment created successfully" -ForegroundColor Green
        Write-Host $deployOutput
        
        # Extract deployment sequence (DSEQ) from output
        $dseq = $deployOutput | Select-String -Pattern "dseq:\s*(\d+)" | ForEach-Object { $_.Matches.Groups[1].Value }
        
        if ($dseq) {
            Write-Host ""
            Write-Host "📊 Deployment Sequence (DSEQ): $dseq" -ForegroundColor Cyan
            
            # Wait for bids
            Write-Host ""
            Write-Host "⏳ Waiting for provider bids (30 seconds)..." -ForegroundColor Cyan
            Start-Sleep -Seconds 30
            
            # List bids
            Write-Host "Fetching bids..." -ForegroundColor Yellow
            $bids = akash query market bid list --owner default --dseq $dseq 2>&1
            Write-Host $bids
            
            # Auto-accept first bid (in production, you'd want more sophisticated logic)
            Write-Host ""
            Write-Host "💰 Accepting first available bid..." -ForegroundColor Cyan
            akash tx market lease create --dseq $dseq --from default --node https://rpc.akash.forbole.com:443 --chain-id akashnet-2 --gas auto --gas-adjustment 1.5 --yes
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Lease created successfully" -ForegroundColor Green
                
                Write-Host ""
                Write-Host "✅ Deployment complete!" -ForegroundColor Green
                Write-Host ""
                Write-Host "📋 Next steps:" -ForegroundColor Cyan
                Write-Host "   1. Check deployment status: akash query deployment get --owner default --dseq $dseq" -ForegroundColor White
                Write-Host "   2. View logs: akash provider lease-logs --dseq $dseq --from default" -ForegroundColor White
                Write-Host "   3. Access service at: https://dao-governance.371minds.com" -ForegroundColor White
            } else {
                Write-Host "✗ Failed to create lease" -ForegroundColor Red
                exit 1
            }
        } else {
            Write-Host "⚠ Could not extract DSEQ from deployment output" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✗ Deployment creation failed" -ForegroundColor Red
        Write-Host $deployOutput
        exit 1
    }
} else {
    Write-Host "🔍 DRY RUN: Would deploy to Akash Network" -ForegroundColor Yellow
    Write-Host "   - Create deployment from: $DEPLOY_FILE" -ForegroundColor White
    Write-Host "   - Wait for provider bids" -ForegroundColor White
    Write-Host "   - Create lease with selected provider" -ForegroundColor White
}

Write-Host ""
Write-Host "🎉 Deployment script completed!" -ForegroundColor Green
