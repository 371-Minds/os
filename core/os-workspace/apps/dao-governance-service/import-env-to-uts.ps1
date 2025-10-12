# Import Environment Variables to UTS CLI
# Reads a .env file and imports all credentials into the UTS CLI
# Automatically detects sensitive values and marks them as encrypted

param(
    [Parameter(Mandatory=$false)]
    [string]$EnvFile = ".env.production",
    
    [Parameter(Mandatory=$false)]
    [switch]$DryRun = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$ShowDetails = $false
)

$ErrorActionPreference = "Stop"

Write-Host "UTS CLI - Import Environment Variables" -ForegroundColor Cyan
Write-Host "Source file: $EnvFile" -ForegroundColor Yellow
Write-Host "Dry run: $DryRun" -ForegroundColor Yellow
Write-Host ""

# Check if source file exists
if (-not (Test-Path $EnvFile)) {
    Write-Host "[ERROR] File not found: $EnvFile" -ForegroundColor Red
    Write-Host ""
    Write-Host "Available .env files in this directory:" -ForegroundColor Yellow
    Get-ChildItem -Filter ".env*" | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Usage: .\import-env-to-uts.ps1 -EnvFile .env.production" -ForegroundColor Yellow
    exit 1
}

# Read the file
Write-Host "Reading environment file..." -ForegroundColor Cyan
$content = Get-Content $EnvFile

# Statistics
$totalLines = $content.Count
$commentLines = 0
$emptyLines = 0
$validLines = 0
$importedSecrets = @()
$skippedLines = @()

# Sensitive key patterns that should be encrypted
$sensitivePatterns = @(
    'password',
    'secret',
    'key',
    'token',
    'api_key',
    'auth'
)

# Parse each line
Write-Host "Parsing configuration..." -ForegroundColor Cyan
Write-Host ""

foreach ($line in $content) {
    # Skip empty lines
    if ([string]::IsNullOrWhiteSpace($line)) {
        $emptyLines++
        continue
    }
    
    # Skip comments
    if ($line.Trim() -match '^\s*#') {
        $commentLines++
        if ($ShowDetails) {
            Write-Host "  [INFO] Comment: $($line.Substring(0, [Math]::Min(60, $line.Length)))" -ForegroundColor Gray
        }
        continue
    }
    
    # Parse KEY=value format
    if ($line -match '^([A-Z_][A-Z0-9_]*)=(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        
        # Skip if value is a placeholder
        if ($value -match 'your_.*_here' -or $value -match 'example\.com' -or [string]::IsNullOrWhiteSpace($value)) {
            $skippedLines += "Skipped (placeholder): $key"
            if ($ShowDetails) {
                Write-Host "  [SKIP] $key (placeholder value)" -ForegroundColor Yellow
            }
            continue
        }
        
        # Convert KEY_NAME to key/name format
        $utsKey = $key.ToLower().Replace('_', '/')
        
        # Determine if this should be encrypted
        $shouldEncrypt = $false
        foreach ($pattern in $sensitivePatterns) {
            if ($key.ToLower() -match $pattern) {
                $shouldEncrypt = $true
                break
            }
        }
        
        $validLines++
        
        # Display what will be imported
        if ($shouldEncrypt) {
            $encryptIcon = "[ENC]"
            $color = "Yellow"
        } else {
            $encryptIcon = "[ OK]"
            $color = "Green"
        }
        
        if ($shouldEncrypt) {
            $displayValue = "****** (encrypted, length: " + $value.Length + ")"
        } else {
            if ($value.Length -gt 40) {
                $displayValue = $value.Substring(0, 40) + "..."
            } else {
                $displayValue = $value
            }
        }
        
        Write-Host "$encryptIcon $utsKey" -ForegroundColor $color
        Write-Host "        Value: $displayValue" -ForegroundColor Gray
        Write-Host ""
        
        $importedSecrets += @{
            Key = $utsKey
            Value = $value
            Encrypted = $shouldEncrypt
            OriginalKey = $key
        }
    } else {
        $skippedLines += "Invalid format: $line"
        if ($ShowDetails) {
            Write-Host "  [WARN] Invalid format: $line" -ForegroundColor Yellow
        }
    }
}

# Summary
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "PARSING SUMMARY" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total lines read:      $totalLines" -ForegroundColor White
Write-Host "Comment lines:         $commentLines" -ForegroundColor Gray
Write-Host "Empty lines:           $emptyLines" -ForegroundColor Gray
Write-Host "Valid secrets:         $validLines" -ForegroundColor Green
Write-Host "Skipped lines:         $($skippedLines.Count)" -ForegroundColor Yellow
Write-Host ""

if ($skippedLines.Count -gt 0 -and $ShowDetails) {
    Write-Host "Skipped details:" -ForegroundColor Yellow
    $skippedLines | ForEach-Object {
        Write-Host "  - $_" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Show what will be imported
Write-Host "Secrets to import:" -ForegroundColor Cyan
Write-Host ""
$encryptedCount = ($importedSecrets | Where-Object { $_.Encrypted }).Count
$plainCount = $importedSecrets.Count - $encryptedCount
Write-Host "  [ENC] Encrypted secrets:  $encryptedCount" -ForegroundColor Yellow
Write-Host "  [ OK] Plain secrets:      $plainCount" -ForegroundColor Green
Write-Host ""

if ($importedSecrets.Count -eq 0) {
    Write-Host "[ERROR] No valid secrets found to import!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check your $EnvFile file for:" -ForegroundColor Yellow
    Write-Host "  - Correct KEY=value format (no spaces around =)" -ForegroundColor White
    Write-Host "  - Real values (not placeholders like 'your_xxx_here')" -ForegroundColor White
    Write-Host "  - Uncommented lines (remove # at the start)" -ForegroundColor White
    exit 1
}

# Confirm import
if (-not $DryRun) {
    Write-Host ""
    $confirm = Read-Host "Import these $($importedSecrets.Count) secrets? (yes/no)"
    
    if ($confirm.ToLower() -ne 'yes' -and $confirm.ToLower() -ne 'y') {
        Write-Host ""
        Write-Host "[INFO] Import cancelled" -ForegroundColor Yellow
        exit 0
    }
}

# Import secrets
Write-Host ""
Write-Host "=======================================================" -ForegroundColor Cyan
if ($DryRun) {
    Write-Host "DRY RUN - No secrets will be stored" -ForegroundColor Yellow
} else {
    Write-Host "IMPORTING SECRETS" -ForegroundColor Cyan
}
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($secret in $importedSecrets) {
    if ($secret.Encrypted) {
        $encryptedFlag = '--encrypted'
    } else {
        $encryptedFlag = ''
    }
    
    $cmd = "node uts-cli.js set `"$($secret.Key)`" `"$($secret.Value)`" $encryptedFlag".Trim()
    
    if ($DryRun) {
        Write-Host "  [DRY RUN] Would execute: $cmd" -ForegroundColor Gray
        $successCount++
    } else {
        try {
            $output = Invoke-Expression $cmd 2>&1
            
            if ($LASTEXITCODE -eq 0 -or $output -match 'Secret stored') {
                if ($secret.Encrypted) {
                    $icon = "[ENC]"
                } else {
                    $icon = "[ OK]"
                }
                Write-Host "$icon Imported: $($secret.Key)" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host "[FAIL] Failed: $($secret.Key)" -ForegroundColor Red
                Write-Host "        Error: $output" -ForegroundColor Red
                $failCount++
            }
        } catch {
            Write-Host "[FAIL] Failed: $($secret.Key)" -ForegroundColor Red
            Write-Host "        Error: $($_.Exception.Message)" -ForegroundColor Red
            $failCount++
        }
    }
}

# Final summary
Write-Host ""
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "IMPORT COMPLETE" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "[SUCCESS] Dry run successful!" -ForegroundColor Green
    Write-Host "          Would import: $successCount secrets" -ForegroundColor White
    Write-Host ""
    Write-Host "To perform actual import, run without -DryRun flag:" -ForegroundColor Yellow
    Write-Host "  .\import-env-to-uts.ps1 -EnvFile $EnvFile" -ForegroundColor White
} else {
    if ($failCount -eq 0) {
        Write-Host "[SUCCESS] All secrets imported successfully!" -ForegroundColor Green
        Write-Host "          Imported: $successCount secrets" -ForegroundColor White
    } else {
        Write-Host "[WARN] Import completed with errors" -ForegroundColor Yellow
        Write-Host "       Successful: $successCount secrets" -ForegroundColor Green
        Write-Host "       Failed:     $failCount secrets" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Verify secrets: node uts-cli.js list" -ForegroundColor White
    Write-Host "  2. Test locally: docker-compose up -d" -ForegroundColor White
    Write-Host "  3. Deploy to Akash: .\deploy-akash.ps1" -ForegroundColor White
}

Write-Host ""
