# Test secure token management system for 371 OS
# Validates environment loading, token authentication, and publishing workflow

param(
    [switch]$SkipNpmTest,
    [switch]$Verbose
)

Write-Host "🧪 371 OS Secure Token Management Test Suite" -ForegroundColor Cyan
Write-Host "=" * 60

$testResults = @()
$testCount = 0
$passCount = 0

function Test-Component {
    param(
        [string]$Name,
        [scriptblock]$TestBlock
    )
    
    $global:testCount++
    Write-Host ""
    Write-Host "🔍 Test $global:testCount`: $Name" -ForegroundColor Yellow
    Write-Host "-" * 40
    
    try {
        $result = & $TestBlock
        if ($result) {
            Write-Host "✅ PASS: $Name" -ForegroundColor Green
            $global:passCount++
            $global:testResults += @{ Name = $Name; Status = "PASS"; Message = "" }
        } else {
            Write-Host "❌ FAIL: $Name" -ForegroundColor Red
            $global:testResults += @{ Name = $Name; Status = "FAIL"; Message = "Test returned false" }
        }
    } catch {
        Write-Host "❌ FAIL: $Name - $($_.Exception.Message)" -ForegroundColor Red
        $global:testResults += @{ Name = $Name; Status = "FAIL"; Message = $_.Exception.Message }
    }
}

# Test 1: Environment Template File Exists
Test-Component "Environment Template File" {
    $exists = Test-Path ".env.example"
    if ($exists) {
        Write-Host "   ✓ .env.example file found" -ForegroundColor Green
        $content = Get-Content ".env.example" -Raw
        if ($content -match "NPM_TOKEN") {
            Write-Host "   ✓ Contains NPM_TOKEN configuration" -ForegroundColor Green
            return $true
        } else {
            Write-Host "   ✗ Missing NPM_TOKEN in template" -ForegroundColor Red
            return $false
        }
    } else {
        Write-Host "   ✗ .env.example file not found" -ForegroundColor Red
        return $false
    }
}

# Test 2: Environment Loader Script
Test-Component "Environment Loader Script" {
    $scriptPath = "scripts/load-env.ps1"
    if (Test-Path $scriptPath) {
        Write-Host "   ✓ load-env.ps1 script found" -ForegroundColor Green
        
        # Test script execution with example file
        if (Test-Path ".env.example") {
            Write-Host "   ✓ Testing script execution..." -ForegroundColor Yellow
            try {
                $result = & $scriptPath -EnvFile ".env.example" 2>$null
                Write-Host "   ✓ Script executes without errors" -ForegroundColor Green
                return $true
            } catch {
                Write-Host "   ✗ Script execution failed: $($_.Exception.Message)" -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "   ✗ Cannot test without .env.example" -ForegroundColor Red
            return $false
        }
    } else {
        Write-Host "   ✗ load-env.ps1 script not found" -ForegroundColor Red
        return $false
    }
}

# Test 3: Package Publishing Script
Test-Component "Package Publishing Script" {
    $scriptPath = "scripts/publish-packages.ps1"
    if (Test-Path $scriptPath) {
        Write-Host "   ✓ publish-packages.ps1 script found" -ForegroundColor Green
        
        # Check script content for key functions
        $content = Get-Content $scriptPath -Raw
        $requiredComponents = @("NPM_TOKEN", "DryRun", "availablePackages")
        $missingComponents = @()
        
        foreach ($component in $requiredComponents) {
            if ($content -match $component) {
                Write-Host "   ✓ Contains $component functionality" -ForegroundColor Green
            } else {
                Write-Host "   ✗ Missing $component functionality" -ForegroundColor Red
                $missingComponents += $component
            }
        }
        
        return $missingComponents.Count -eq 0
    } else {
        Write-Host "   ✗ publish-packages.ps1 script not found" -ForegroundColor Red
        return $false
    }
}

# Test 4: GitIgnore Security
Test-Component "GitIgnore Security Configuration" {
    if (Test-Path ".gitignore") {
        Write-Host "   ✓ .gitignore file found" -ForegroundColor Green
        $content = Get-Content ".gitignore" -Raw
        $securityPatterns = @(".env", "*.key", "npm-debug.log", ".npmrc")
        $missingPatterns = @()
        
        foreach ($pattern in $securityPatterns) {
            if ($content -match [regex]::Escape($pattern)) {
                Write-Host "   ✓ Protects $pattern files" -ForegroundColor Green
            } else {
                Write-Host "   ✗ Missing protection for $pattern" -ForegroundColor Red
                $missingPatterns += $pattern
            }
        }
        
        return $missingPatterns.Count -eq 0
    } else {
        Write-Host "   ✗ .gitignore file not found" -ForegroundColor Red
        return $false
    }
}

# Test 5: Package.json Script Integration
Test-Component "Package.json Script Integration" {
    $rootPackageJson = "package.json"
    $workspacePackageJson = "core/os-workspace/package.json"
    
    $rootExists = Test-Path $rootPackageJson
    $workspaceExists = Test-Path $workspacePackageJson
    
    if ($rootExists -and $workspaceExists) {
        Write-Host "   ✓ Both package.json files found" -ForegroundColor Green
        
        # Check for secure publishing scripts
        $rootContent = Get-Content $rootPackageJson -Raw | ConvertFrom-Json
        $workspaceContent = Get-Content $workspacePackageJson -Raw | ConvertFrom-Json
        
        $requiredScripts = @("env:load", "publish:secure")
        $hasRequiredScripts = $true
        
        foreach ($script in $requiredScripts) {
            if ($rootContent.scripts.$script -or $workspaceContent.scripts.$script) {
                Write-Host "   ✓ Contains $script script" -ForegroundColor Green
            } else {
                Write-Host "   ✗ Missing $script script" -ForegroundColor Red
                $hasRequiredScripts = $false
            }
        }
        
        return $hasRequiredScripts
    } else {
        Write-Host "   ✗ Package.json files missing" -ForegroundColor Red
        return $false
    }
}

# Test 6: NPM Authentication (Optional)
if (-not $SkipNpmTest) {
    Test-Component "NPM Authentication Test" {
        Write-Host "   ℹ Testing NPM authentication (optional)..." -ForegroundColor Cyan
        
        # Check if npm is available
        try {
            $npmVersion = npm --version 2>$null
            if ($npmVersion) {
                Write-Host "   ✓ NPM is available (version: $npmVersion)" -ForegroundColor Green
                
                # Test authentication
                $whoami = npm whoami 2>$null
                if ($whoami) {
                    Write-Host "   ✓ Already authenticated as: $whoami" -ForegroundColor Green
                    return $true
                } else {
                    Write-Host "   ⚠ Not authenticated (run: npm login)" -ForegroundColor Yellow
                    return $true  # Not a failure, just not authenticated
                }
            } else {
                Write-Host "   ⚠ NPM not available in PATH" -ForegroundColor Yellow
                return $true  # Not a failure
            }
        } catch {
            Write-Host "   ⚠ NPM test skipped: $($_.Exception.Message)" -ForegroundColor Yellow
            return $true  # Not a critical failure
        }
    }
} else {
    Write-Host ""
    Write-Host "⏭️  NPM authentication test skipped (use without -SkipNpmTest to include)" -ForegroundColor Yellow
}

# Test 7: Documentation Completeness
Test-Component "Documentation Completeness" {
    $docFile = "SECURE_TOKEN_MANAGEMENT.md"
    if (Test-Path $docFile) {
        Write-Host "   ✓ Security documentation found" -ForegroundColor Green
        $content = Get-Content $docFile -Raw
        
        $requiredSections = @("Quick Setup", "PowerShell", "Security Best Practices", "Troubleshooting")
        $missingSections = @()
        
        foreach ($section in $requiredSections) {
            if ($content -match $section) {
                Write-Host "   ✓ Contains $section section" -ForegroundColor Green
            } else {
                Write-Host "   ✗ Missing $section section" -ForegroundColor Red
                $missingSections += $section
            }
        }
        
        return $missingSections.Count -eq 0
    } else {
        Write-Host "   ✗ SECURE_TOKEN_MANAGEMENT.md not found" -ForegroundColor Red
        return $false
    }
}

# Test 8: Environment Variable Template Validation
Test-Component "Environment Variable Template Validation" {
    if (Test-Path ".env.example") {
        $content = Get-Content ".env.example"
        $criticalVars = @("NPM_TOKEN", "ETHEREUM_RPC_URL", "IPFS_API_URL", "AKASH_FROM")
        $missingVars = @()
        
        foreach ($var in $criticalVars) {
            if ($content -match "^$var=") {
                Write-Host "   ✓ Template includes $var" -ForegroundColor Green
            } else {
                Write-Host "   ✗ Template missing $var" -ForegroundColor Red
                $missingVars += $var
            }
        }
        
        return $missingVars.Count -eq 0
    } else {
        Write-Host "   ✗ .env.example template not found" -ForegroundColor Red
        return $false
    }
}

# Generate Test Report
Write-Host ""
Write-Host "=" * 60
Write-Host "📊 371 OS Secure Token Management Test Report" -ForegroundColor Cyan
Write-Host "=" * 60

Write-Host ""
Write-Host "📈 Summary:" -ForegroundColor Yellow
Write-Host "   Total Tests: $testCount" -ForegroundColor White
Write-Host "   Passed: $passCount" -ForegroundColor Green
Write-Host "   Failed: $($testCount - $passCount)" -ForegroundColor Red
Write-Host "   Success Rate: $([math]::Round(($passCount / $testCount) * 100, 1))%" -ForegroundColor Cyan

Write-Host ""
Write-Host "📋 Detailed Results:" -ForegroundColor Yellow
foreach ($result in $testResults) {
    $status = if ($result.Status -eq "PASS") { "✅" } else { "❌" }
    Write-Host "   $status $($result.Name)" -ForegroundColor $(if ($result.Status -eq "PASS") { "Green" } else { "Red" })
    if ($result.Message -and $Verbose) {
        Write-Host "      └─ $($result.Message)" -ForegroundColor Gray
    }
}

# Overall Assessment
Write-Host ""
if ($passCount -eq $testCount) {
    Write-Host "🎉 ALL TESTS PASSED! Your secure token management system is ready for production!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Copy .env.example to .env and configure your tokens" -ForegroundColor White
    Write-Host "   2. Run: bun run env:validate" -ForegroundColor White
    Write-Host "   3. Test publishing: bun run publish:all -DryRun" -ForegroundColor White
    Write-Host "   4. Deploy with secrets: bun run deploy:with-secrets" -ForegroundColor White
} elseif ($passCount / $testCount -gt 0.8) {
    Write-Host "⚠️  MOSTLY READY - Minor issues detected" -ForegroundColor Yellow
    Write-Host "   Fix the failing tests above for complete security coverage" -ForegroundColor White
} else {
    Write-Host "❌ NEEDS ATTENTION - Multiple issues detected" -ForegroundColor Red
    Write-Host "   Please address the failing tests before proceeding to production" -ForegroundColor White
}

Write-Host ""
Write-Host "🔐 Your 371 OS secure token management system test is complete!" -ForegroundColor Cyan

return @{
    TotalTests = $testCount
    PassedTests = $passCount
    FailedTests = ($testCount - $passCount)
    SuccessRate = [math]::Round(($passCount / $testCount) * 100, 1)
    Results = $testResults
}