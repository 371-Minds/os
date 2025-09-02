# Start Local MongoDB for 371 OS Development
# PowerShell script for Windows environment

param(
    [switch]$Docker = $true,
    [switch]$Install = $false,
    [string]$DataPath = "./data/mongodb",
    [int]$Port = 27017
)

Write-Host "🍃 371 OS - MongoDB Local Startup Script" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# Check if Docker is preferred and available
if ($Docker) {
    if (Get-Command "docker" -ErrorAction SilentlyContinue) {
        Write-Host "🐳 Using Docker for MongoDB..." -ForegroundColor Cyan
        
        # Check if MongoDB container exists
        $existingContainer = docker ps -a --filter "name=mongodb-371" --format "{{.Names}}"
        
        if ($existingContainer -eq "mongodb-371") {
            Write-Host "📦 Found existing MongoDB container" -ForegroundColor Yellow
            
            # Check if it's running
            $runningContainer = docker ps --filter "name=mongodb-371" --format "{{.Names}}"
            
            if ($runningContainer -eq "mongodb-371") {
                Write-Host "✅ MongoDB container is already running" -ForegroundColor Green
            } else {
                Write-Host "🚀 Starting existing MongoDB container..." -ForegroundColor Yellow
                docker start mongodb-371
            }
        } else {
            Write-Host "🚀 Creating new MongoDB container..." -ForegroundColor Yellow
            
            # Create data directory
            if (!(Test-Path $DataPath)) {
                New-Item -ItemType Directory -Force -Path $DataPath | Out-Null
                Write-Host "📁 Created data directory: $DataPath" -ForegroundColor Green
            }
            
            # Run MongoDB container
            docker run -d `
                --name mongodb-371 `
                --restart unless-stopped `
                -p ${Port}:27017 `
                -v "${PWD}/${DataPath}:/data/db" `
                -e MONGO_INITDB_ROOT_USERNAME=root `
                -e MONGO_INITDB_ROOT_PASSWORD=rootpassword371 `
                -e MONGO_INITDB_DATABASE=os371 `
                mongo:7.0
                
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ MongoDB container created and started successfully!" -ForegroundColor Green
            } else {
                Write-Host "❌ Failed to create MongoDB container" -ForegroundColor Red
                exit 1
            }
        }
        
        # Wait for MongoDB to be ready
        Write-Host "⏳ Waiting for MongoDB to be ready..." -ForegroundColor Yellow
        $maxAttempts = 30
        $attempt = 0
        
        do {
            Start-Sleep -Seconds 2
            $attempt++
            $mongoStatus = docker exec mongodb-371 mongosh --quiet --eval "db.runCommand('ping').ok" 2>$null
            
            if ($mongoStatus -eq "1") {
                Write-Host "✅ MongoDB is ready!" -ForegroundColor Green
                break
            }
            
            Write-Host "⏳ Attempt $attempt/$maxAttempts - MongoDB not ready yet..." -ForegroundColor Yellow
            
        } while ($attempt -lt $maxAttempts)
        
        if ($attempt -ge $maxAttempts) {
            Write-Host "❌ MongoDB failed to start within timeout" -ForegroundColor Red
            Write-Host "📋 Container logs:" -ForegroundColor Yellow
            docker logs mongodb-371 --tail 20
            exit 1
        }
        
        # Create initial database and user
        Write-Host "🔧 Setting up 371 OS database..." -ForegroundColor Yellow
        
        $setupScript = @"
use os371;
db.createUser({
  user: 'os371user',
  pwd: 'os371pass',
  roles: [
    { role: 'readWrite', db: 'os371' },
    { role: 'dbAdmin', db: 'os371' }
  ]
});

// Create collections
db.createCollection('agents');
db.createCollection('business_intelligence');
db.createCollection('communication_events');
db.createCollection('system_metrics');

// Create indexes
db.agents.createIndex({ agentId: 1 }, { unique: true });
db.agents.createIndex({ type: 1 });
db.agents.createIndex({ status: 1 });
db.business_intelligence.createIndex({ timestamp: 1 });
db.business_intelligence.createIndex({ agentId: 1 });
db.communication_events.createIndex({ eventId: 1 }, { unique: true });
db.communication_events.createIndex({ timestamp: 1 });

print('371 OS database setup complete!');
"@

        $setupScript | docker exec -i mongodb-371 mongosh --quiet -u root -p rootpassword371 --authenticationDatabase admin
        
        Write-Host "✅ Database setup complete!" -ForegroundColor Green
        
        # Update .env file
        $envFile = ".env"
        $mongoUri = "mongodb://os371user:os371pass@localhost:${Port}/os371"
        
        if (Test-Path $envFile) {
            $envContent = Get-Content $envFile
            $envContent = $envContent | Where-Object { $_ -notmatch "^MONGODB_LOCAL_URI=" }
            $envContent += "MONGODB_LOCAL_URI=$mongoUri"
            $envContent | Out-File -FilePath $envFile -Encoding UTF8
        } else {
            @"
# 371 OS MongoDB Configuration
MONGODB_LOCAL_URI=$mongoUri
MONGODB_DATABASE=os371
MONGODB_USERNAME=os371user
MONGODB_PASSWORD=os371pass
"@ | Out-File -FilePath $envFile -Encoding UTF8
        }
        
        Write-Host "💾 Environment file updated with local MongoDB URI" -ForegroundColor Green
        
        Write-Host "" -ForegroundColor White
        Write-Host "🎉 MongoDB is running successfully!" -ForegroundColor Green
        Write-Host "=================================" -ForegroundColor Green
        Write-Host "📍 Connection Details:" -ForegroundColor Cyan
        Write-Host "   Host: localhost" -ForegroundColor White
        Write-Host "   Port: $Port" -ForegroundColor White
        Write-Host "   Database: os371" -ForegroundColor White
        Write-Host "   Username: os371user" -ForegroundColor White
        Write-Host "   Password: os371pass" -ForegroundColor White
        Write-Host "" -ForegroundColor White
        Write-Host "🔗 Connection URI: $mongoUri" -ForegroundColor Yellow
        Write-Host "🐳 Container Name: mongodb-371" -ForegroundColor Cyan
        Write-Host "=================================" -ForegroundColor Green
        
    } else {
        Write-Host "❌ Docker not found. Please install Docker or use -Docker:`$false for native MongoDB" -ForegroundColor Red
        Write-Host "📥 Download Docker: https://docker.com/get-started" -ForegroundColor Yellow
        exit 1
    }
} else {
    # Native MongoDB installation
    if ($Install) {
        Write-Host "📥 Installing MongoDB Community Edition..." -ForegroundColor Yellow
        Write-Host "⚠️  This requires administrator privileges" -ForegroundColor Yellow
        
        # Check if running as administrator
        $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
        
        if (!$isAdmin) {
            Write-Host "❌ Please run this script as Administrator to install MongoDB" -ForegroundColor Red
            Write-Host "💡 Alternative: Use Docker with -Docker parameter" -ForegroundColor Yellow
            exit 1
        }
        
        # Install MongoDB via Chocolatey or manual download
        if (Get-Command "choco" -ErrorAction SilentlyContinue) {
            Write-Host "🍫 Installing MongoDB via Chocolatey..." -ForegroundColor Yellow
            choco install mongodb -y
        } else {
            Write-Host "📥 Please install MongoDB manually:" -ForegroundColor Yellow
            Write-Host "   1. Download: https://www.mongodb.com/try/download/community" -ForegroundColor White
            Write-Host "   2. Install the MSI package" -ForegroundColor White
            Write-Host "   3. Run this script again without -Install" -ForegroundColor White
            exit 1
        }
    }
    
    # Check if MongoDB is installed
    if (!(Get-Command "mongod" -ErrorAction SilentlyContinue)) {
        Write-Host "❌ MongoDB not found. Please install MongoDB first." -ForegroundColor Red
        Write-Host "💡 Use -Install parameter or -Docker for containerized version" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "🚀 Starting native MongoDB..." -ForegroundColor Yellow
    
    # Create data directory
    if (!(Test-Path $DataPath)) {
        New-Item -ItemType Directory -Force -Path $DataPath | Out-Null
        Write-Host "📁 Created data directory: $DataPath" -ForegroundColor Green
    }
    
    # Start MongoDB
    Start-Process -FilePath "mongod" -ArgumentList "--dbpath", $DataPath, "--port", $Port -NoNewWindow
    Write-Host "✅ MongoDB started on port $Port" -ForegroundColor Green
}

Write-Host "" -ForegroundColor White
Write-Host "🧪 Testing MongoDB connection..." -ForegroundColor Yellow
node scripts/test-mongodb-connection.js

Write-Host "" -ForegroundColor White
Write-Host "📚 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Start 371 OS system: bun run system:start" -ForegroundColor White
Write-Host "   2. Monitor MongoDB: docker logs -f mongodb-371" -ForegroundColor White
Write-Host "   3. Connect to database: docker exec -it mongodb-371 mongosh -u os371user -p os371pass os371" -ForegroundColor White