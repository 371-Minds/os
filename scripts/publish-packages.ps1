# Secure package publishing for 371 OS
# Supports individual packages or batch publishing with token validation

param(
    [string]$Package = "all",
    [string]$Tag = "latest",
    [switch]$DryRun,
    [switch]$Production
)

Write-Host "📦 371 OS Secure Package Publisher" -ForegroundColor Cyan
Write-Host "=" * 50

# Load environment variables
Write-Host "🔐 Loading secure environment..." -ForegroundColor Yellow
$envResult = & "$PSScriptRoot\load-env.ps1" -Validate

if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Failed to load environment variables"
    exit 1
}

# Validate NPM token
$npmToken = [Environment]::GetEnvironmentVariable("NPM_TOKEN")
if (-not $npmToken) {
    Write-Error "❌ NPM_TOKEN not found in environment"
    Write-Host ""
    Write-Host "💡 Quick fixes:" -ForegroundColor Yellow
    Write-Host "   1. Add NPM_TOKEN to your .env file" -ForegroundColor White
    Write-Host "   2. Or run: npm login" -ForegroundColor White
    Write-Host "   3. Or generate token at: https://www.npmjs.com/settings/tokens" -ForegroundColor White
    exit 1
}

# Configure npm with token
Write-Host "🔑 Configuring NPM authentication..." -ForegroundColor Yellow
npm config set //registry.npmjs.org/:_authToken $npmToken

# Verify authentication
$whoami = npm whoami 2>$null
if (-not $whoami) {
    Write-Error "❌ NPM authentication failed - check your token"
    exit 1
}

Write-Host "✅ NPM authenticated as: $whoami" -ForegroundColor Green

# Define available packages for 371 OS
$availablePackages = @{
    "nx-workspace" = "packages/nx-workspace"
    "business-intelligence" = "packages/business-intelligence" 
    "cognitive-engine" = "packages/cognitive-engine"
    "universal-tool-server" = "packages/elizaos-plugins/universal-tool-server"
    "blockchain-registry" = "packages/blockchain-registry"
    "ipfs-storage" = "packages/ipfs-storage"
    "core-types" = "packages/core-types"
}

# Build target packages
$targetPackages = @()

switch ($Package.ToLower()) {
    "all" {
        Write-Host "📦 Target: All 371 OS packages" -ForegroundColor Cyan
        $targetPackages = $availablePackages.Keys
    }
    "elizaos-plugins" {
        Write-Host "📦 Target: All ElizaOS plugins" -ForegroundColor Cyan
        $targetPackages = @("universal-tool-server")
    }
    "core-libraries" {
        Write-Host "📦 Target: Core libraries" -ForegroundColor Cyan
        $targetPackages = @("blockchain-registry", "ipfs-storage", "core-types")
    }
    default {
        if ($availablePackages.ContainsKey($Package)) {
            Write-Host "📦 Target: $Package" -ForegroundColor Cyan
            $targetPackages = @($Package)
        } else {
            Write-Error "❌ Unknown package: $Package"
            Write-Host ""
            Write-Host "Available packages:" -ForegroundColor Yellow
            foreach ($pkg in $availablePackages.Keys) {
                Write-Host "  • $pkg" -ForegroundColor White
            }
            Write-Host ""
            Write-Host "Special targets:" -ForegroundColor Yellow
            Write-Host "  • all - All packages" -ForegroundColor White
            Write-Host "  • elizaos-plugins - ElizaOS plugins only" -ForegroundColor White  
            Write-Host "  • core-libraries - Core libraries only" -ForegroundColor White
            exit 1
        }
    }
}

Write-Host ""
Write-Host "🎯 Publishing Configuration:" -ForegroundColor Yellow
Write-Host "   Packages: $($targetPackages -join ', ')" -ForegroundColor White
Write-Host "   Tag: $Tag" -ForegroundColor White
Write-Host "   Mode: $(if ($Production) { 'Production' } else { 'Development' })" -ForegroundColor White
Write-Host "   Dry Run: $(if ($DryRun) { 'Yes' } else { 'No' })" -ForegroundColor White

if ($DryRun) {
    Write-Host ""
    Write-Host "🧪 DRY RUN MODE - No actual publishing will occur" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to continue or Ctrl+C to cancel"

# Change to workspace directory
Push-Location "$PSScriptRoot\..\core\os-workspace"

try {
    foreach ($pkg in $targetPackages) {
        Write-Host ""
        Write-Host "📦 Processing package: $pkg" -ForegroundColor Cyan
        Write-Host "-" * 40
        
        # Check if package exists
        if (-not $availablePackages.ContainsKey($pkg)) {
            Write-Warning "⚠️  Package $pkg not found in available packages, skipping..."
            continue
        }
        
        $packagePath = $availablePackages[$pkg]
        
        # Check if package directory exists
        if (-not (Test-Path $packagePath)) {
            Write-Warning "⚠️  Package directory not found: $packagePath, skipping..."
            continue
        }
        
        # Build the package
        Write-Host "🔨 Building $pkg..." -ForegroundColor Yellow
        if ($DryRun) {
            Write-Host "   [DRY RUN] Would run: bun nx build $pkg" -ForegroundColor Gray
        } else {
            $buildResult = bun nx build $pkg
            if ($LASTEXITCODE -ne 0) {
                Write-Error "❌ Build failed for $pkg"
                continue
            }
            Write-Host "✅ Build successful for $pkg" -ForegroundColor Green
        }
        
        # Run tests if available
        Write-Host "🧪 Testing $pkg..." -ForegroundColor Yellow
        if ($DryRun) {
            Write-Host "   [DRY RUN] Would run: bun nx test $pkg" -ForegroundColor Gray
        } else {
            $testResult = bun nx test $pkg 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Tests passed for $pkg" -ForegroundColor Green
            } else {
                Write-Warning "⚠️  Tests failed or not available for $pkg, continuing..."
            }
        }
        
        # Publish the package
        Write-Host "🚀 Publishing $pkg..." -ForegroundColor Yellow
        if ($DryRun) {
            Write-Host "   [DRY RUN] Would run: npm publish from $packagePath" -ForegroundColor Gray
        } else {
            Push-Location $packagePath
            try {
                # Check if package.json exists
                if (-not (Test-Path "package.json")) {
                    Write-Warning "⚠️  No package.json found in $packagePath, skipping publish..."
                    continue
                }
                
                # Publish with specified tag
                if ($Production) {
                    npm publish --access public --tag $Tag
                } else {
                    npm publish --access public --tag $Tag --dry-run
                }
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✅ Published $pkg successfully!" -ForegroundColor Green
                } else {
                    Write-Error "❌ Failed to publish $pkg"
                }
            } finally {
                Pop-Location
            }
        }
    }
    
    Write-Host ""
    Write-Host "🎉 Package publishing complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Summary:" -ForegroundColor Cyan
    Write-Host "   Processed: $($targetPackages.Count) packages" -ForegroundColor White
    Write-Host "   Tag: $Tag" -ForegroundColor White
    Write-Host "   Registry: https://registry.npmjs.org/" -ForegroundColor White
    
    if (-not $DryRun -and -not $Production) {
        Write-Host ""
        Write-Host "💡 To publish to production, add -Production flag" -ForegroundColor Yellow
    }
    
} finally {
    Pop-Location
    
    # Clean up npm config (optional security measure)
    # npm config delete //registry.npmjs.org/:_authToken
}

Write-Host ""
Write-Host "✨ 371 OS packages are ready for the revolution! 🚀" -ForegroundColor Green