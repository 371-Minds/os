# Load environment variables securely for 371 OS
# Compatible with Windows PowerShell and cross-platform usage

param(
    [string]$EnvFile = ".env",
    [switch]$Validate,
    [switch]$ShowValues
)

Write-Host "🔐 371 OS Secure Environment Loader" -ForegroundColor Cyan
Write-Host "=" * 50

# Check if environment file exists
if (-not (Test-Path $EnvFile)) {
    Write-Error "❌ Environment file not found: $EnvFile"
    Write-Host ""
    Write-Host "💡 Quick Fix:" -ForegroundColor Yellow
    Write-Host "   Copy-Item .env.example .env" -ForegroundColor White
    Write-Host "   Then edit .env with your actual tokens" -ForegroundColor White
    exit 1
}

# Load environment variables
$envVars = @{}
$loadedCount = 0

Write-Host "📂 Loading environment from: $EnvFile" -ForegroundColor Green

Get-Content $EnvFile | ForEach-Object {
    $line = $_.Trim()
    
    # Skip empty lines and comments
    if ($line -and -not $line.StartsWith('#')) {
        if ($line -match '^([^=]+?)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            
            # Remove quotes if present
            if ($value.StartsWith('"') -and $value.EndsWith('"')) {
                $value = $value.Substring(1, $value.Length - 2)
            } elseif ($value.StartsWith("'") -and $value.EndsWith("'")) {
                $value = $value.Substring(1, $value.Length - 2)
            }
            
            # Set environment variable
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
            $envVars[$name] = $value
            $loadedCount++
            
            if ($ShowValues) {
                Write-Host "  ✅ $name = $value" -ForegroundColor Green
            } else {
                # Mask sensitive values
                $maskedValue = if ($value.Length -gt 8) { 
                    $value.Substring(0, 4) + "*" * ($value.Length - 8) + $value.Substring($value.Length - 4) 
                } else { 
                    "*" * $value.Length 
                }
                Write-Host "  ✅ $name = $maskedValue" -ForegroundColor Green
            }
        }
    }
}

Write-Host ""
Write-Host "📊 Summary: Loaded $loadedCount environment variables" -ForegroundColor Cyan

# Validation for critical 371 OS variables
if ($Validate) {
    Write-Host ""
    Write-Host "🔍 Validating critical 371 OS environment variables..." -ForegroundColor Yellow
    
    $criticalVars = @{
        "NPM_TOKEN" = "NPM package publishing"
        "ETHEREUM_RPC_URL" = "Blockchain integration"
        "IPFS_API_URL" = "Decentralized storage"
        "AKASH_FROM" = "Akash Network deployment"
    }
    
    $missingVars = @()
    
    foreach ($var in $criticalVars.Keys) {
        $value = [Environment]::GetEnvironmentVariable($var)
        if ($value) {
            Write-Host "  ✅ $var ($($criticalVars[$var]))" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $var ($($criticalVars[$var])) - MISSING" -ForegroundColor Red
            $missingVars += $var
        }
    }
    
    if ($missingVars.Count -gt 0) {
        Write-Host ""
        Write-Warning "⚠️  Missing critical environment variables for 371 OS:"
        foreach ($var in $missingVars) {
            Write-Host "   • $var - $($criticalVars[$var])" -ForegroundColor Yellow
        }
        Write-Host ""
        Write-Host "💡 Add these variables to your .env file for full functionality" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "🎉 All critical 371 OS environment variables are configured!" -ForegroundColor Green
    }
}

# Test NPM authentication if token is present
$npmToken = [Environment]::GetEnvironmentVariable("NPM_TOKEN")
if ($npmToken) {
    Write-Host ""
    Write-Host "🔐 Testing NPM authentication..." -ForegroundColor Yellow
    
    try {
        # Configure npm with token temporarily
        $originalRegistry = npm config get registry
        npm config set //registry.npmjs.org/:_authToken $npmToken 2>$null
        
        # Test authentication
        $whoami = npm whoami 2>$null
        if ($whoami) {
            Write-Host "  ✅ NPM authentication successful - logged in as: $whoami" -ForegroundColor Green
        } else {
            Write-Host "  ❌ NPM authentication failed - check your NPM_TOKEN" -ForegroundColor Red
        }
    } catch {
        Write-Host "  ⚠️  NPM test skipped - npm not available in PATH" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "🚀 Environment loaded successfully for 371 OS!" -ForegroundColor Green
Write-Host "   Ready for development, publishing, and deployment" -ForegroundColor White
Write-Host ""

# Export loaded variables for calling scripts
return $envVars