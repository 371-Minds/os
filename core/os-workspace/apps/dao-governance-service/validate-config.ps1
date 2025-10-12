# Validate Zero-Trust Configuration for DAO Governance Service
# Ensures Secretless Broker setup is correct before deployment

param(
    [Parameter(Mandatory=$false)]
    [switch]$Verbose = $false
)

$ErrorActionPreference = "Stop"

Write-Host "🔐 Zero-Trust Configuration Validation" -ForegroundColor Cyan
Write-Host "DAO Governance Service - Secretless Broker Setup" -ForegroundColor Cyan
Write-Host ""

$validationErrors = @()
$validationWarnings = @()

# Function to validate file exists
function Test-ConfigFile {
    param([string]$FilePath, [string]$Description)
    
    if (Test-Path $FilePath) {
        Write-Host "✓ Found $Description`: $FilePath" -ForegroundColor Green
        return $true
    } else {
        Write-Host "✗ Missing $Description`: $FilePath" -ForegroundColor Red
        $script:validationErrors += "Missing required file: $FilePath"
        return $false
    }
}

# Function to validate YAML structure
function Test-YamlStructure {
    param([string]$FilePath)
    
    try {
        $content = Get-Content $FilePath -Raw
        
        # Basic YAML validation (check for required keys)
        if ($FilePath -match "secretless\.yml") {
            $requiredKeys = @("version", "services")
            foreach ($key in $requiredKeys) {
                if ($content -match $key) {
                    Write-Host "  ✓ Contains '$key' section" -ForegroundColor Green
                } else {
                    Write-Host "  ✗ Missing '$key' section" -ForegroundColor Red
                    $script:validationErrors += "Missing '$key' in $FilePath"
                }
            }
            
            # Check for specific services
            $requiredServices = @("dao-governance-db", "novu-api")
            foreach ($service in $requiredServices) {
                if ($content -match $service) {
                    Write-Host "  ✓ Service configured: $service" -ForegroundColor Green
                } else {
                    Write-Host "  ⚠ Service not configured: $service" -ForegroundColor Yellow
                    $script:validationWarnings += "Service not configured: $service"
                }
            }
        }
        
        if ($FilePath -match "deploy\.yaml") {
            $requiredKeys = @("version", "services", "profiles", "deployment")
            foreach ($key in $requiredKeys) {
                if ($content -match $key) {
                    Write-Host "  ✓ Contains '$key' section" -ForegroundColor Green
                } else {
                    Write-Host "  ✗ Missing '$key' section" -ForegroundColor Red
                    $script:validationErrors += "Missing '$key' in $FilePath"
                }
            }
            
            # Check for sidecar container
            if ($content -match "secretless-broker") {
                Write-Host "  ✓ Secretless Broker sidecar configured" -ForegroundColor Green
            } else {
                Write-Host "  ✗ Secretless Broker sidecar NOT configured" -ForegroundColor Red
                $script:validationErrors += "Missing Secretless Broker sidecar in deploy.yaml"
            }
            
            # Check for Zero-Trust environment variable
            if ($content -match "ZERO_TRUST_MODE") {
                Write-Host "  ✓ ZERO_TRUST_MODE environment variable set" -ForegroundColor Green
            } else {
                Write-Host "  ✗ ZERO_TRUST_MODE environment variable NOT set" -ForegroundColor Red
                $script:validationErrors += "Missing ZERO_TRUST_MODE in deploy.yaml"
            }
            
            # Check for localhost database configuration
            if ($content -match "127\.0\.0\.1") {
                Write-Host "  ✓ Localhost configuration detected (correct for broker)" -ForegroundColor Green
            } else {
                Write-Host "  ⚠ No localhost configuration found" -ForegroundColor Yellow
                $script:validationWarnings += "Database should use localhost (127.0.0.1) to connect through broker"
            }
        }
        
        return $true
    } catch {
        Write-Host "  ✗ Failed to parse YAML: $_" -ForegroundColor Red
        $script:validationErrors += "YAML parsing error in $FilePath`: $_"
        return $false
    }
}

# Function to validate environment variables
function Test-EnvironmentVariables {
    Write-Host ""
    Write-Host "🌍 Checking environment variables..." -ForegroundColor Cyan
    
    $requiredVars = @{
        "UTS_AUTH_TOKEN" = "Authentication token for Universal Tool Server"
        "UTS_ENDPOINT" = "Universal Tool Server endpoint URL"
    }
    
    foreach ($var in $requiredVars.Keys) {
        if ([string]::IsNullOrEmpty((Get-Item -Path Env:$var -ErrorAction SilentlyContinue).Value)) {
            Write-Host "  ✗ Missing: $var ($($requiredVars[$var]))" -ForegroundColor Red
            $script:validationErrors += "Missing environment variable: $var"
        } else {
            Write-Host "  ✓ Set: $var" -ForegroundColor Green
            if ($Verbose) {
                $value = (Get-Item -Path Env:$var).Value
                $masked = $value.Substring(0, [Math]::Min(10, $value.Length)) + "..."
                Write-Host "    Value: $masked" -ForegroundColor Gray
            }
        }
    }
}

# Function to validate UTS connectivity
function Test-UTSConnectivity {
    Write-Host ""
    Write-Host "🌐 Testing Universal Tool Server connectivity..." -ForegroundColor Cyan
    
    $utsEndpoint = $env:UTS_ENDPOINT
    if ([string]::IsNullOrEmpty($utsEndpoint)) {
        Write-Host "  ⚠ Cannot test UTS connectivity - UTS_ENDPOINT not set" -ForegroundColor Yellow
        return
    }
    
    try {
        # Test basic connectivity
        $healthUrl = "$utsEndpoint/health"
        Write-Host "  Testing: $healthUrl" -ForegroundColor Gray
        
        $response = Invoke-WebRequest -Uri $healthUrl -Method GET -TimeoutSec 5 -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✓ UTS is reachable and healthy" -ForegroundColor Green
        } else {
            Write-Host "  ⚠ UTS responded with status: $($response.StatusCode)" -ForegroundColor Yellow
            $script:validationWarnings += "UTS health check returned non-200 status: $($response.StatusCode)"
        }
    } catch {
        Write-Host "  ✗ Cannot reach UTS: $_" -ForegroundColor Red
        $script:validationWarnings += "UTS connectivity test failed - this may be expected in local development"
    }
}

# Function to validate Docker image
function Test-DockerImage {
    Write-Host ""
    Write-Host "🐳 Checking Docker configuration..." -ForegroundColor Cyan
    
    if (Test-Path "Dockerfile") {
        Write-Host "  ✓ Dockerfile found" -ForegroundColor Green
        
        # Check Dockerfile for ZERO_TRUST_MODE awareness
        $dockerContent = Get-Content "Dockerfile" -Raw
        if ($dockerContent -match "ZERO_TRUST" -or $dockerContent -match "broker") {
            Write-Host "  ✓ Dockerfile appears to be Zero-Trust aware" -ForegroundColor Green
        } else {
            Write-Host "  ⚠ Dockerfile may not be Zero-Trust aware" -ForegroundColor Yellow
            $script:validationWarnings += "Dockerfile should reference Zero-Trust configuration"
        }
    } else {
        Write-Host "  ⚠ Dockerfile not found (will use default from registry)" -ForegroundColor Yellow
    }
}

# Start validation
Write-Host "📋 Validating configuration files..." -ForegroundColor Cyan
Write-Host ""

# Check required files
Test-ConfigFile "secretless.yml" "Secretless Broker configuration" | Out-Null
Test-ConfigFile "deploy.yaml" "Akash deployment manifest" | Out-Null
Test-ConfigFile "src/database-config.ts" "Database configuration module" | Out-Null
Test-ConfigFile "UTS_SECRETS_CONFIG.md" "UTS secrets documentation" | Out-Null

# Validate YAML structure
Write-Host ""
Write-Host "📝 Validating YAML structure..." -ForegroundColor Cyan
if (Test-Path "secretless.yml") {
    Test-YamlStructure "secretless.yml" | Out-Null
}
if (Test-Path "deploy.yaml") {
    Test-YamlStructure "deploy.yaml" | Out-Null
}

# Check environment variables
Test-EnvironmentVariables

# Test UTS connectivity
Test-UTSConnectivity

# Validate Docker setup
Test-DockerImage

# Summary
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "VALIDATION SUMMARY" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($validationErrors.Count -eq 0 -and $validationWarnings.Count -eq 0) {
    Write-Host "🎉 ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host "Zero-Trust configuration is valid and ready for deployment" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Ensure UTS has all required secrets populated (see UTS_SECRETS_CONFIG.md)" -ForegroundColor White
    Write-Host "  2. Build Docker image: docker build -t ghcr.io/371-minds/dao-governance-service:latest ." -ForegroundColor White
    Write-Host "  3. Deploy to Akash: .\deploy-akash.ps1" -ForegroundColor White
    exit 0
} else {
    if ($validationErrors.Count -gt 0) {
        Write-Host "❌ VALIDATION FAILED - $($validationErrors.Count) Error(s)" -ForegroundColor Red
        Write-Host ""
        Write-Host "Errors:" -ForegroundColor Red
        foreach ($error in $validationErrors) {
            Write-Host "  ✗ $error" -ForegroundColor Red
        }
    }
    
    if ($validationWarnings.Count -gt 0) {
        Write-Host ""
        Write-Host "⚠️  $($validationWarnings.Count) Warning(s)" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Warnings:" -ForegroundColor Yellow
        foreach ($warning in $validationWarnings) {
            Write-Host "  ⚠ $warning" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    if ($validationErrors.Count -gt 0) {
        Write-Host "Please fix the errors above before deploying" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "Warnings detected but configuration is acceptable" -ForegroundColor Yellow
        exit 0
    }
}
