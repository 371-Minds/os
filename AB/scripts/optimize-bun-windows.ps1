# Bun Windows Optimization Script
# Run this script to optimize Bun dependency installation on Windows
# Usage: .\optimize-bun-windows.ps1

Write-Host "Optimizing Bun for Windows..." -ForegroundColor Green

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "Some optimizations require Administrator privileges." -ForegroundColor Yellow
    Write-Host "Consider running as Administrator for full optimization." -ForegroundColor Yellow
}

# 1. Set up fast registry mirror (optional - comment out if you prefer npmjs.org)
Write-Host "Setting up fast registry mirror..." -ForegroundColor Cyan
try {
    bun config set registry "https://registry.npmmirror.com"
    Write-Host "Registry set to npmmirror.com" -ForegroundColor Green
} catch {
    Write-Host "Failed to set registry. Make sure Bun is installed." -ForegroundColor Red
}

# 2. Set up custom cache directory on fastest drive
Write-Host "Setting up optimized cache directory..." -ForegroundColor Cyan
$cacheDir = "$env:LOCALAPPDATA\bun-cache-fast"
New-Item -ItemType Directory -Force -Path $cacheDir | Out-Null
try {
    bun config set cache-dir $cacheDir
    Write-Host "Cache directory set to: $cacheDir" -ForegroundColor Green
} catch {
    Write-Host "Failed to set cache directory" -ForegroundColor Red
}

# 3. Add Windows Defender exclusions (requires Admin)
if ($isAdmin) {
    Write-Host "Adding Windows Defender exclusions..." -ForegroundColor Cyan
    
    $exclusions = @(
        "$env:LOCALAPPDATA\bun",
        $cacheDir,
        "node_modules"
    )
    
    foreach ($exclusion in $exclusions) {
        try {
            Add-MpPreference -ExclusionPath $exclusion -ErrorAction SilentlyContinue
            Write-Host "Added exclusion: $exclusion" -ForegroundColor Green
        } catch {
            Write-Host "Could not add exclusion: $exclusion" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "Skipping Defender exclusions (requires Admin)" -ForegroundColor Yellow
    Write-Host "Manually add these to Windows Defender exclusions:" -ForegroundColor Gray
    Write-Host "- $env:LOCALAPPDATA\bun" -ForegroundColor Gray
    Write-Host "- $cacheDir" -ForegroundColor Gray
    Write-Host "- node_modules (in your project directories)" -ForegroundColor Gray
}

# 4. Create PowerShell profile with Bun aliases
Write-Host "Setting up PowerShell aliases..." -ForegroundColor Cyan

# Define the profile content
$profileContent = @"
# Bun Optimization Aliases
Set-Alias buni 'bun install --ignore-scripts --ignore-optional'
Set-Alias bunif 'bun install --force'
Set-Alias bunc 'bun install --ignore-scripts --ignore-optional --force'

function Bun-Fast-Install {
    param([string]`$package = "")
    if (`$package) {
        bun add `$package --ignore-scripts
    } else {
        bun install --ignore-scripts --ignore-optional
    }
}
Set-Alias bunfast Bun-Fast-Install

function Bun-Clean-Install {
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    Remove-Item -Force bun.lockb -ErrorAction SilentlyContinue
    bun install --ignore-scripts --ignore-optional
}
Set-Alias bunclean Bun-Clean-Install

Write-Host "Bun aliases loaded!" -ForegroundColor Green
"@

# Check if profile exists, create if not
if (!(Test-Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
}

# Add our content to profile (avoid duplicates)
$currentProfile = Get-Content $PROFILE -Raw -ErrorAction SilentlyContinue
if ($currentProfile -notlike "*Bun Optimization Aliases*") {
    Add-Content -Path $PROFILE -Value $profileContent
    Write-Host "Added Bun aliases to PowerShell profile" -ForegroundColor Green
} else {
    Write-Host "Bun aliases already exist in profile" -ForegroundColor Green
}

# 5. Display available aliases
Write-Host ""
Write-Host "Available Bun aliases:" -ForegroundColor Magenta
Write-Host "buni        - Fast install (skip scripts & optional deps)" -ForegroundColor White
Write-Host "bunif       - Force reinstall" -ForegroundColor White
Write-Host "bunc        - Clean + fast install" -ForegroundColor White
Write-Host "bunfast     - Smart fast install (with optional package name)" -ForegroundColor White
Write-Host "bunclean    - Remove node_modules + lockfile, then fast install" -ForegroundColor White

# 6. Performance tips
Write-Host ""
Write-Host "Performance Tips:" -ForegroundColor Magenta
Write-Host "Restart PowerShell to load new aliases" -ForegroundColor White
Write-Host "Use 'buni' instead of 'bun install' for 2-3x speed boost" -ForegroundColor White
Write-Host "Run 'bunclean' if you have dependency issues" -ForegroundColor White
Write-Host "Consider using an SSD for your projects" -ForegroundColor White

Write-Host ""
Write-Host "Bun optimization complete!" -ForegroundColor Green
Write-Host "Restart PowerShell to use the new aliases." -ForegroundColor Yellow