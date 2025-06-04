# =============================================================================
# Cross-Platform Kallitests Development Environment Installer (PowerShell)
# =============================================================================
# Author: Khalid HAFID-MEDHEB
# Created: June 04, 2025
# Last Updated: June 04, 2025
# =============================================================================

param()

# ░█▀▀░█░█░█░█░█▀█░█░█░█▀▄░▀█▀░█▀█
# ░█░█░░█░░█░█░█░█░█░█░█▀▄░░█░░█░█
# ░▀▀▀░░▀░░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░░▀░▀

# 1. Vérifie que l'on est bien sur Windows
$IsWindows = $env:OS -eq "Windows_NT"

# Set log file
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$LogFile = "kallitests_install_$timestamp.log"

# Output formatting colors
function Write-Info    { Write-Host "[INFO] $args"    -ForegroundColor Cyan    | Tee-Object -FilePath $LogFile -Append }
function Write-Success { Write-Host "[SUCCESS] $args" -ForegroundColor Green   | Tee-Object -FilePath $LogFile -Append }
function Write-Warn    { Write-Host "[WARNING] $args" -ForegroundColor Yellow  | Tee-Object -FilePath $LogFile -Append }
function Write-Error   { Write-Host "[ERROR] $args"   -ForegroundColor Red     | Tee-Object -FilePath $LogFile -Append }

# Run command with logging
function Run-Command {
    param (
        [string]$Command,
        [string]$Description
    )
    Write-Info "Executing: $Description"
    Add-Content $LogFile "Command: $Command"
    try {
        Invoke-Expression $Command | Tee-Object -FilePath $LogFile -Append
        Write-Success "$Description completed successfully"
    } catch {
        Write-Error "$Description failed: $_"
    }
}

# Check if command exists
function Command-Exists {
    param ([string]$cmd)
    return (Get-Command $cmd -ErrorAction SilentlyContinue) -ne $null
}

# Upgrade or install a Chocolatey package
function Install-Or-Upgrade-ChocoPackage($packageName, $displayName) {
    if (choco list --local-only | Select-String -Pattern "^$packageName ") {
        Run-Command "choco upgrade $packageName -y" "Upgrading $displayName"
    } else {
        Run-Command "choco install $packageName -y" "Installing $displayName"
    }
}

# Install dependencies on Windows using Chocolatey
function Install-Windows {
    Write-Info "Installing packages for Windows using Chocolatey"

    if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
        Write-Host "Installing Chocolatey..."
        Set-ExecutionPolicy Bypass -Scope Process -Force
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        
        # Ajoute Chocolatey au PATH temporairement pour la session en cours
        $env:PATH += ";$env:ALLUSERSPROFILE\chocolatey\bin"
    }

    # Maintenant, choco devrait être reconnu
    if (Get-Command choco -ErrorAction SilentlyContinue) {
        choco upgrade chocolatey -y
        # Suite des commandes choco install ...
    } else {
        Write-Error "Chocolatey installation failed or choco command not found."
    }

    # 1) Git (git + git bash via package git)
    Install-Or-Upgrade-ChocoPackage "git" "Git"
    
    # 2) Node.js LTS (installe aussi npm)
    Install-Or-Upgrade-ChocoPackage "nodejs-lts" "Node.js LTS"

    # 3) Python3 (last version)
    Install-Or-Upgrade-ChocoPackage "python3" "Python3"

    # 4) npm : vient avec nodejs, mais vérifie la version
    if (Command-Exists "npm") {
        Write-Host "Upgrading npm globally..."
        Run-Command "npm install -g npm" "Upgrading npm"
    } else {
        Write-Warning "npm not found, it should have been installed with Node.js LTS"
    }

    # 5) Cypress (installé via npm global)
    if (Command-Exists "cypress") {
        Write-Host "Upgrading Cypress globally..."
        Run-Command "npm install -g cypress" "Upgrading Cypress"
    } else {
        Write-Host "Installing Cypress globally..."
        Run-Command "npm install -g cypress" "Installing Cypress"
    }

    # Run-Command "choco install git nodejs-lts python3 -y" "Installing Git, Node.js and Python"
    #Run-Command "npm install -g cypress" "Installing Cypress globally"
}

# Verify tool installation
function Verify-Tool {
    param (
        [string]$Tool,
        [string]$VersionFlag = "--version"
    )
    if (Command-Exists $Tool) {
        try {
            $version = & $Tool $VersionFlag
            Write-Success "$Tool is installed: $version"
            Add-Content $LogFile "${Tool}: $version"
        } catch {
            Write-Error "$Tool is installed but version retrieval failed"
        }
    } else {
        Write-Error "$Tool is not installed or not in PATH"
    }
}

# Verify all installations
function Verify-Installations {
    Write-Info "Verifying installations..."

    Verify-Tool "git"
    Verify-Tool "node"
    Verify-Tool "npm"

    if (Command-Exists "python") {
        Verify-Tool "python"
    } elseif (Command-Exists "python3") {
        Verify-Tool "python3"
    } else {
        Write-Error "Python is not installed"
    }

    try {
        $cypressVersion = npm list -g cypress | Select-String "cypress"
        if ($cypressVersion) {
            Write-Success "Cypress is installed: $cypressVersion"
            Add-Content $LogFile "Cypress: $cypressVersion"
        } else {
            throw "Cypress not found"
        }
    } catch {
        Write-Error "Cypress is not installed globally"
    }

    if (Command-Exists "bash") {
        Verify-Tool "bash"
    } else {
        Write-Warn "bash shell is not available"
    }
}

# Main function
function Main {
    Write-Host "=============================================================================="
    Write-Host "Kallitests Development Environment Installation - $(Get-Date)"
    Write-Host "=============================================================================="
    Write-Info "Log file: $LogFile"

    if ($IsWindows) {
        Install-Windows
    } else {
        Write-Host "❌ Ce script PowerShell ne supporte actuellement que Windows." -ForegroundColor Red
        exit 1
    }


    Verify-Installations

    Write-Info "Installation Summary:"
    Write-Info "- Log file saved as: $LogFile"
    Write-Info "- Restart your terminal if needed"
    Write-Info "- Run 'cypress --version' to verify Cypress installation"

    Write-Host "=============================================================================="
    Write-Host "Installation completed at $(Get-Date)"
    Write-Host "=============================================================================="
}

# Run script
try {
    Main
} catch {
    Write-Error "Installation interrupted: $_"
    exit 1
}
