# Deploy MongoDB on Akash Network for 371 OS
# PowerShell script for Windows environment

param(
    [switch]$Production = $false,
    [string]$KeyringBackend = "test",
    [string]$ChainId = "akashnet-2",
    [string]$Node = "https://rpc.akashnet.net:443"
)

Write-Host "🚀 371 OS - MongoDB Akash Deployment Script" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Check if Akash CLI is installed
if (!(Get-Command "akash" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Akash CLI not found. Please install Akash CLI first." -ForegroundColor Red
    Write-Host "Download: https://github.com/akash-network/provider/releases" -ForegroundColor Yellow
    exit 1
}

# Check environment variables
if (!$env:MONGODB_PUBLIC_KEY -or !$env:MONGODB_PRIVATE_KEY) {
    Write-Host "❌ MongoDB keys not found in environment variables." -ForegroundColor Red
    Write-Host "Please set MONGODB_PUBLIC_KEY and MONGODB_PRIVATE_KEY" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Environment variables configured" -ForegroundColor Green

# Create deployment directory
$deployDir = "akash-deployments/mongodb"
if (!(Test-Path $deployDir)) {
    New-Item -ItemType Directory -Force -Path $deployDir | Out-Null
}

# Create MongoDB SDL file
$sdlContent = @"
version: "2.0"

services:
  mongo:
    image: mongo:7.0
    expose:
      - port: 27017 
        to:
          - global: true
    env:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=rootpassword371
      - MONGO_INITDB_DATABASE=os371
    params:
      storage:
        data:
          mount: /data/db
          readOnly: false

profiles:
  compute:
    mongo:
      resources:
        cpu:
          units: 1.0
        memory:
          size: 2Gi
        storage:
          - size: 5Gi
            attributes:
              persistent: true
              class: beta3
  placement:
    akash:
      attributes:
        host: akash
      signedBy:
        anyOf:
          - "akash1365yvmc4s7awdyj3n2sav7xfx76adc6dnmlx63"
      pricing:
        mongo: 
          denom: uakt
          amount: 50000

deployment:
  mongo:
    akash:
      profile: mongo
      count: 1
"@

$sdlFile = "$deployDir/mongodb-deploy.yml"
$sdlContent | Out-File -FilePath $sdlFile -Encoding UTF8

Write-Host "📝 MongoDB SDL file created: $sdlFile" -ForegroundColor Green

# Create deployment
Write-Host "🚀 Creating MongoDB deployment on Akash Network..." -ForegroundColor Yellow

try {
    # Set Akash configuration
    $env:AKASH_KEYRING_BACKEND = $KeyringBackend
    $env:AKASH_CHAIN_ID = $ChainId
    $env:AKASH_NODE = $Node
    $env:AKASH_FROM = $env:MONGODB_PUBLIC_KEY

    Write-Host "Using Akash account: $env:MONGODB_PUBLIC_KEY" -ForegroundColor Cyan

    # Check account balance
    Write-Host "💰 Checking account balance..." -ForegroundColor Yellow
    $balance = akash query bank balances $env:MONGODB_PUBLIC_KEY --output json | ConvertFrom-Json
    
    if ($balance.balances.Count -eq 0) {
        Write-Host "❌ Insufficient balance. Please fund your Akash account." -ForegroundColor Red
        Write-Host "Faucet: https://faucet.akashnet.net/" -ForegroundColor Yellow
        exit 1
    }

    $aktBalance = ($balance.balances | Where-Object { $_.denom -eq "uakt" }).amount
    Write-Host "✅ AKT Balance: $($aktBalance / 1000000) AKT" -ForegroundColor Green

    # Create deployment
    Write-Host "📤 Submitting deployment transaction..." -ForegroundColor Yellow
    $deployResult = akash tx deployment create $sdlFile --from $env:MONGODB_PUBLIC_KEY --gas-prices 0.025uakt --gas-adjustment 1.5 --gas auto --yes --output json | ConvertFrom-Json
    
    if ($deployResult.code -ne 0) {
        Write-Host "❌ Deployment creation failed: $($deployResult.raw_log)" -ForegroundColor Red
        exit 1
    }

    $dseq = $deployResult.logs[0].events | Where-Object { $_.type -eq "akash.v1beta3.EventDeploymentCreated" } | ForEach-Object { $_.attributes | Where-Object { $_.key -eq "dseq" } | Select-Object -ExpandProperty value }
    
    Write-Host "✅ Deployment created successfully!" -ForegroundColor Green
    Write-Host "🆔 Deployment Sequence (DSEQ): $dseq" -ForegroundColor Cyan

    # Wait for bids
    Write-Host "⏳ Waiting for provider bids (30 seconds)..." -ForegroundColor Yellow
    Start-Sleep -Seconds 30

    # List bids
    Write-Host "📋 Checking available bids..." -ForegroundColor Yellow
    $bids = akash query market bid list --owner $env:MONGODB_PUBLIC_KEY --dseq $dseq --output json | ConvertFrom-Json
    
    if ($bids.bids.Count -eq 0) {
        Write-Host "❌ No bids received. Deployment may need adjustments." -ForegroundColor Red
        Write-Host "💡 Try increasing the pricing in the SDL file." -ForegroundColor Yellow
        exit 1
    }

    # Select the lowest bid
    $selectedBid = $bids.bids | Sort-Object { [double]$_.bid.price.amount } | Select-Object -First 1
    $provider = $selectedBid.bid.bid_id.provider
    $gseq = $selectedBid.bid.bid_id.gseq
    $oseq = $selectedBid.bid.bid_id.oseq

    Write-Host "✅ Selected provider: $provider" -ForegroundColor Green
    Write-Host "💰 Bid price: $($selectedBid.bid.price.amount) $($selectedBid.bid.price.denom)" -ForegroundColor Cyan

    # Create lease
    Write-Host "🤝 Creating lease with selected provider..." -ForegroundColor Yellow
    $leaseResult = akash tx market lease create --dseq $dseq --gseq $gseq --oseq $oseq --provider $provider --from $env:MONGODB_PUBLIC_KEY --gas-prices 0.025uakt --gas-adjustment 1.5 --gas auto --yes --output json | ConvertFrom-Json

    if ($leaseResult.code -ne 0) {
        Write-Host "❌ Lease creation failed: $($leaseResult.raw_log)" -ForegroundColor Red
        exit 1
    }

    Write-Host "✅ Lease created successfully!" -ForegroundColor Green

    # Wait for deployment
    Write-Host "⏳ Waiting for MongoDB deployment (60 seconds)..." -ForegroundColor Yellow
    Start-Sleep -Seconds 60

    # Get lease status
    Write-Host "📊 Checking deployment status..." -ForegroundColor Yellow
    $leaseStatus = akash provider lease-status --dseq $dseq --gseq $gseq --oseq $oseq --provider $provider --from $env:MONGODB_PUBLIC_KEY --output json | ConvertFrom-Json

    if ($leaseStatus.services.mongo.available -gt 0) {
        $mongoUri = $leaseStatus.forwarded_ports.mongo[0].externalPort
        $mongoHost = $leaseStatus.forwarded_ports.mongo[0].host
        
        Write-Host "🎉 MongoDB deployment successful!" -ForegroundColor Green
        Write-Host "===============================================" -ForegroundColor Green
        Write-Host "📍 MongoDB Connection Details:" -ForegroundColor Cyan
        Write-Host "   Host: $mongoHost" -ForegroundColor White
        Write-Host "   Port: $mongoUri" -ForegroundColor White
        Write-Host "   Username: root" -ForegroundColor White
        Write-Host "   Password: rootpassword371" -ForegroundColor White
        Write-Host "   Database: os371" -ForegroundColor White
        Write-Host "" -ForegroundColor White
        Write-Host "🔗 Connection URI: mongodb://root:rootpassword371@${mongoHost}:${mongoUri}/os371" -ForegroundColor Yellow
        Write-Host "===============================================" -ForegroundColor Green

        # Save connection details
        $connectionDetails = @{
            dseq = $dseq
            gseq = $gseq
            oseq = $oseq
            provider = $provider
            host = $mongoHost
            port = $mongoUri
            uri = "mongodb://root:rootpassword371@${mongoHost}:${mongoUri}/os371"
            deployed_at = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        }

        $connectionDetails | ConvertTo-Json | Out-File -FilePath "$deployDir/connection-details.json" -Encoding UTF8
        Write-Host "💾 Connection details saved to: $deployDir/connection-details.json" -ForegroundColor Green

        # Update .env file
        $envFile = ".env"
        if (Test-Path $envFile) {
            $envContent = Get-Content $envFile
            $envContent = $envContent | Where-Object { $_ -notmatch "^MONGODB_AKASH_URI=" }
            $envContent += "MONGODB_AKASH_URI=mongodb://root:rootpassword371@${mongoHost}:${mongoUri}/os371"
            $envContent | Out-File -FilePath $envFile -Encoding UTF8
        } else {
            "MONGODB_AKASH_URI=mongodb://root:rootpassword371@${mongoHost}:${mongoUri}/os371" | Out-File -FilePath $envFile -Encoding UTF8
        }

        Write-Host "✅ Environment file updated with Akash MongoDB URI" -ForegroundColor Green
        
        # Test connection
        Write-Host "🧪 Testing MongoDB connection..." -ForegroundColor Yellow
        node scripts/test-mongodb-connection.js

    } else {
        Write-Host "❌ MongoDB deployment failed or not ready" -ForegroundColor Red
        Write-Host "📋 Lease status:" -ForegroundColor Yellow
        $leaseStatus | ConvertTo-Json -Depth 5 | Write-Host
    }

} catch {
    Write-Host "❌ Deployment failed with error: $_" -ForegroundColor Red
    exit 1
}

Write-Host "" -ForegroundColor White
Write-Host "🎯 371 OS MongoDB deployment complete!" -ForegroundColor Green
Write-Host "📚 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Test connection: bun run mongodb:connect" -ForegroundColor White  
Write-Host "   2. Start full system: bun run system:full-start" -ForegroundColor White
Write-Host "   3. Monitor deployment: akash provider lease-status --dseq $dseq --provider $provider" -ForegroundColor White