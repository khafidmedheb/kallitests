#!/bin/bash

# =============================================================================
# Cross-Platform Kallitests Development Environment Installer (Bash)
# =============================================================================
# Author: Khalid HAFID-MEDHEB
# Created: June 04, 2025
# Last Updated: June 04, 2025
# Description: Universal installer script for Kallitests development environment.
#              Automatically detects OS (Windows/Linux/macOS) and installs/upgrades
#              required dependencies: Git, Node.js, npm, Python3, Cypress, and shell.
#              Uses appropriate package managers: Chocolatey (Windows), Homebrew (macOS),
#              apt/yum/pacman (Linux). Includes verification checks and logging.
# =============================================================================

# Set strict error handling
set -euo pipefail

# Color codes for output formatting
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m' # No Color

# Script constants
readonly SCRIPT_NAME="$(basename "$0")"
readonly TIMESTAMP=$(date +%Y%m%d_%H%M%S)
readonly LOG_FILE="kallitests_install_${TIMESTAMP}.log"

# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

# Function to print colored messages
print_message() {
    local color="$1"
    local message="$2"
    echo -e "${color}${message}${NC}" | tee -a "$LOG_FILE"
}

# Function to print info messages
print_info() {
    print_message "$CYAN" "[INFO] $1"
}

# Function to print success messages
print_success() {
    print_message "$GREEN" "[SUCCESS] $1"
}

# Function to print warning messages
print_warning() {
    print_message "$YELLOW" "[WARNING] $1"
}

# Function to print error messages
print_error() {
    print_message "$RED" "[ERROR] $1"
}

# Function to execute commands with logging
run_command() {
    local cmd="$1"
    local description="$2"
    
    print_info "Executing: $description"
    echo "Command: $cmd" >> "$LOG_FILE"
    
    if eval "$cmd" >> "$LOG_FILE" 2>&1; then
        print_success "$description completed successfully"
        return 0
    else
        print_error "$description failed"
        return 1
    fi
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to detect operating system
detect_os() {
    case "$(uname -s)" in
        Linux*)     echo "linux";;
        Darwin*)    echo "macos";;
        CYGWIN*|MINGW32*|MSYS*|MINGW64*) echo "windows";;
        *)          echo "unknown";;
    esac
}

# Function to detect Linux distribution
detect_linux_distro() {
    if command_exists apt-get; then
        echo "debian"
    elif command_exists yum; then
        echo "redhat"
    elif command_exists pacman; then
        echo "arch"
    elif command_exists zypper; then
        echo "suse"
    else
        echo "unknown"
    fi
}

# =============================================================================
# PACKAGE MANAGER INSTALLATION FUNCTIONS
# =============================================================================

# Function to install Chocolatey on Windows
install_chocolatey() {
    if ! command_exists choco; then
        print_info "Installing Chocolatey package manager for Windows..."
        powershell -NoProfile -ExecutionPolicy Bypass -Command \
            "Set-ExecutionPolicy Bypass -Scope Process -Force; \
             [System.Net.ServicePointManager]::SecurityProtocol = \
             [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; \
             iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
        
        # Add to PATH for current session
        export PATH="$PATH:/c/ProgramData/chocolatey/bin"
    else
        print_info "Chocolatey is already installed, upgrading..."
        run_command "choco upgrade chocolatey -y" "Upgrading Chocolatey"
    fi
}

# Function to install Homebrew on macOS
install_homebrew() {
    if ! command_exists brew; then
        print_info "Installing Homebrew package manager for macOS..."
        run_command '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' \
                    "Installing Homebrew"
        
        # Add Homebrew to PATH for current session
        if [[ -f "/opt/homebrew/bin/brew" ]]; then
            eval "$(/opt/homebrew/bin/brew shellenv)"
        elif [[ -f "/usr/local/bin/brew" ]]; then
            eval "$(/usr/local/bin/brew shellenv)"
        fi
    else
        print_info "Homebrew is already installed, updating..."
        run_command "brew update" "Updating Homebrew"
    fi
}

# =============================================================================
# PACKAGE INSTALLATION/UPGRADE FUNCTIONS
# =============================================================================

# Function to check if Chocolatey package is installed
is_choco_package_installed() {
    local package_name="$1"
    choco list --local-only | grep -q "^$package_name "
}

# Function to install or upgrade Chocolatey package
install_or_upgrade_choco_package() {
    local package_name="$1"
    local display_name="$2"
    
    if is_choco_package_installed "$package_name"; then
        print_info "$display_name is already installed, upgrading to latest version..."
        run_command "choco upgrade $package_name -y" "Upgrading $display_name"
    else
        print_info "Installing $display_name..."
        run_command "choco install $package_name -y" "Installing $display_name"
    fi
}

# Function to check if Homebrew package is installed
is_brew_package_installed() {
    local package_name="$1"
    brew list "$package_name" >/dev/null 2>&1
}

# Function to install or upgrade Homebrew package
install_or_upgrade_brew_package() {
    local package_name="$1"
    local display_name="$2"
    
    if is_brew_package_installed "$package_name"; then
        print_info "$display_name is already installed, upgrading to latest version..."
        run_command "brew upgrade $package_name" "Upgrading $display_name"
    else
        print_info "Installing $display_name..."
        run_command "brew install $package_name" "Installing $display_name"
    fi
}

# Function to check if npm package is installed globally
is_npm_package_installed() {
    local package_name="$1"
    npm list -g "$package_name" --depth=0 >/dev/null 2>&1
}

# Function to install or upgrade npm package globally
install_or_upgrade_npm_package() {
    local package_name="$1"
    local display_name="$2"
    
    if is_npm_package_installed "$package_name"; then
        print_info "$display_name is already installed globally, upgrading to latest version..."
        run_command "npm update -g $package_name" "Upgrading $display_name globally"
    else
        print_info "Installing $display_name globally..."
        run_command "npm install -g $package_name" "Installing $display_name globally"
    fi
}

# =============================================================================
# OS-SPECIFIC INSTALLATION FUNCTIONS
# =============================================================================

# Function to install packages on Windows
install_windows() {
    print_info "Installing/Upgrading packages for Windows using Chocolatey"
    
    # Install or upgrade Chocolatey
    install_chocolatey
    
    # Verify Chocolatey is available
    if ! command_exists choco; then
        print_error "Chocolatey installation failed or not in PATH"
        return 1
    fi
    
    # Install or upgrade packages via Chocolatey
    # install_or_upgrade_choco_package "git" "Git (including Git Bash)"
    install_or_upgrade_choco_package "nodejs-lts" "Node.js LTS"
    install_or_upgrade_choco_package "python3" "Python 3 (latest version)"
    
    # Refresh environment variables
    print_info "Refreshing environment variables..."
    sleep 3
    
    # Install or upgrade npm and Cypress
    if command_exists npm; then
        print_info "Upgrading npm to latest version..."
        run_command "npm install -g npm@latest" "Upgrading npm"
        
        install_or_upgrade_npm_package "cypress" "Cypress"
    else
        print_warning "npm not found in PATH. Please restart terminal and run script again."
    fi
}

# Function to install packages on Linux
install_linux() {
    print_info "Installing/Upgrading packages for Linux"
    local distro
    distro=$(detect_linux_distro)
    
    case "$distro" in
        "debian")
            print_info "Detected Debian/Ubuntu system"
            run_command "sudo apt-get update" "Updating package lists"
            
            # Install base packages
            run_command "sudo apt-get install -y git curl wget software-properties-common" "Installing base packages"
            
            # Install Python3
            if command_exists python3; then
                print_info "Python3 is already installed, upgrading..."
                run_command "sudo apt-get install -y --only-upgrade python3 python3-pip" "Upgrading Python3"
            else
                run_command "sudo apt-get install -y python3 python3-pip" "Installing Python3"
            fi
            
            # Install Node.js LTS via NodeSource repository
            if command_exists node; then
                print_info "Node.js is already installed, checking for updates..."
                run_command "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -" "Updating NodeSource repository"
                run_command "sudo apt-get install -y nodejs" "Upgrading Node.js"
            else
                run_command "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -" "Adding NodeSource repository"
                run_command "sudo apt-get install -y nodejs" "Installing Node.js"
            fi
            ;;
            
        "redhat")
            print_info "Detected RedHat/CentOS/Fedora system"
            
            if command_exists dnf; then
                run_command "sudo dnf update -y" "Updating package lists"
                run_command "sudo dnf install -y git curl wget python3 python3-pip" "Installing base packages"
                
                # Install Node.js
                if command_exists node; then
                    print_info "Node.js is already installed, checking for updates..."
                    run_command "curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -" "Updating NodeSource repository"
                    run_command "sudo dnf install -y nodejs" "Upgrading Node.js"
                else
                    run_command "curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -" "Adding NodeSource repository"
                    run_command "sudo dnf install -y nodejs" "Installing Node.js"
                fi
            else
                run_command "sudo yum update -y" "Updating package lists"
                run_command "sudo yum install -y git curl wget python3 python3-pip" "Installing base packages"
                
                # Install Node.js
                if command_exists node; then
                    print_info "Node.js is already installed, checking for updates..."
                    run_command "curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -" "Updating NodeSource repository"
                    run_command "sudo yum install -y nodejs" "Upgrading Node.js"
                else
                    run_command "curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -" "Adding NodeSource repository"
                    run_command "sudo yum install -y nodejs" "Installing Node.js"
                fi
            fi
            ;;
            
        "arch")
            print_info "Detected Arch Linux system"
            run_command "sudo pacman -Sy --noconfirm" "Updating package database"
            
            # Install or upgrade packages
            local packages=("git" "nodejs" "npm" "python" "python-pip")
            for package in "${packages[@]}"; do
                run_command "sudo pacman -S --noconfirm $package" "Installing/Upgrading $package"
            done
            ;;
            
        *)
            print_error "Unsupported Linux distribution: $distro"
            return 1
            ;;
    esac
    
    # Install or upgrade npm and Cypress
    if command_exists npm; then
        print_info "Upgrading npm to latest version..."
        run_command "sudo npm install -g npm@latest" "Upgrading npm"
        
        install_or_upgrade_npm_package "cypress" "Cypress"
    else
        print_warning "npm not found. Node.js installation may have failed."
    fi
}

# Function to install packages on macOS
install_macos() {
    print_info "Installing/Upgrading packages for macOS using Homebrew"
    
    # Install or update Homebrew
    install_homebrew
    
    # Verify Homebrew is available
    if ! command_exists brew; then
        print_error "Homebrew installation failed or not in PATH"
        return 1
    fi
    
    # Install or upgrade packages via Homebrew
    install_or_upgrade_brew_package "git" "Git"
    install_or_upgrade_brew_package "node" "Node.js (includes npm)"
    install_or_upgrade_brew_package "python@3.12" "Python 3.12"
    
    # Create symlinks for python3 if needed
    if ! command_exists python3; then
        if [[ -f "/opt/homebrew/bin/python3.12" ]]; then
            run_command "ln -sf /opt/homebrew/bin/python3.12 /opt/homebrew/bin/python3" "Creating python3 symlink"
        elif [[ -f "/usr/local/bin/python3.12" ]]; then
            run_command "ln -sf /usr/local/bin/python3.12 /usr/local/bin/python3" "Creating python3 symlink"
        fi
    fi
    
    # Install or upgrade npm and Cypress
    if command_exists npm; then
        print_info "Upgrading npm to latest version..."
        run_command "npm install -g npm@latest" "Upgrading npm"
        
        install_or_upgrade_npm_package "cypress" "Cypress"
    else
        print_warning "npm not found. Node.js installation may have failed."
    fi
}

# =============================================================================
# VERIFICATION FUNCTIONS
# =============================================================================

# Function to verify installation of a specific tool
verify_tool() {
    local tool="$1"
    local version_flag="${2:---version}"
    
    if command_exists "$tool"; then
        local version
        version=$($tool $version_flag 2>&1 | head -n1 || echo "Version unavailable")
        print_success "$tool is installed: $version"
        echo "$tool: $version" >> "$LOG_FILE"
        return 0
    else
        print_error "$tool is not installed or not in PATH"
        return 1
    fi
}

# Function to verify all installations
verify_installations() {
    print_info "Verifying installations and versions..."
    local failed_tools=()
    
    # Verify Git
    verify_tool "git" || failed_tools+=("git")
    
    # Verify Node.js
    verify_tool "node" || failed_tools+=("node")
    
    # Verify npm
    verify_tool "npm" || failed_tools+=("npm")
    
    # Verify Python (check both python and python3 commands)
    local python_found=false
    if command_exists python3; then
        verify_tool "python3" && python_found=true
    fi
    if command_exists python; then
        # Check if it's Python 3.x
        local python_version
        python_version=$(python --version 2>&1)
        if [[ $python_version == *"Python 3"* ]]; then
            verify_tool "python" && python_found=true
        else
            print_warning "Found Python 2.x, but Python 3.x is required"
        fi
    fi
    if [[ $python_found == false ]]; then
        print_error "Python 3 is not installed or not in PATH"
        failed_tools+=("python3")
    fi
    
    # Verify Cypress
    if command_exists npm; then
        if is_npm_package_installed "cypress"; then
            local cypress_version
            cypress_version=$(npm list -g cypress --depth=0 2>/dev/null | grep cypress || echo "Version unavailable")
            print_success "Cypress is installed globally: $cypress_version"
            echo "Cypress: $cypress_version" >> "$LOG_FILE"
        else
            print_error "Cypress is not installed globally"
            failed_tools+=("cypress")
        fi
    else
        print_error "Cannot verify Cypress without npm"
        failed_tools+=("cypress")
    fi
    
    # Verify shell (bash)
    verify_tool "bash" || print_warning "bash shell verification failed"
    
    # Check for Git Bash on Windows
    local os
    os=$(detect_os)
    if [[ $os == "windows" ]]; then
        if command_exists bash; then
            print_success "Git Bash is available"
        else
            print_warning "Git Bash may not be in current PATH"
            print_info "Git Bash is typically available at: /c/Program Files/Git/bin/bash"
        fi
    fi
    
    # Summary
    if [[ ${#failed_tools[@]} -eq 0 ]]; then
        print_success "All required tools are installed and verified!"
        return 0
    else
        print_error "The following tools failed verification: ${failed_tools[*]}"
        return 1
    fi
}

# =============================================================================
# MAIN FUNCTION
# =============================================================================

# Main installation function
main() {
    # Initialize log file
    {
        echo "=============================================================================="
        echo "Kallitests Installation Log - $(date)"
        echo "=============================================================================="
    } > "$LOG_FILE"
    
    print_info "Starting Kallitests development environment installation/upgrade"
    print_info "Log file: $LOG_FILE"
    
    # Detect operating system
    local os
    os=$(detect_os)
    print_info "Detected operating system: $os"
    
    # Install based on OS
    case "$os" in
        "windows")
            install_windows
            ;;
        "linux")
            install_linux
            ;;
        "macos")
            install_macos
            ;;
        *)
            print_error "Unsupported operating system: $os"
            exit 1
            ;;
    esac
    
    # Verify installations
    print_info "Installation/upgrade phase completed. Starting verification..."
    if verify_installations; then
        print_success "Kallitests development environment installation/upgrade completed successfully!"
        print_info "All required tools are installed and verified."
    else
        print_warning "Installation completed with some issues. Check the log file for details."
        print_info "You may need to restart your terminal or source your shell profile."
    fi
    
    # Final instructions
    print_info "Installation Summary:"
    print_info "- Log file saved as: $LOG_FILE"
    print_info "- Restart your terminal or source your shell profile to refresh PATH"
    print_info "- Run 'cypress --version' to verify Cypress installation"
    print_info "- Git Bash is available through Git installation (Windows)"
    
    {
        echo "=============================================================================="
        echo "Installation/Upgrade completed at $(date)"
        echo "=============================================================================="
    } >> "$LOG_FILE"
    
    echo
    print_success "Installation/Upgrade completed at $(date)"
    echo "=============================================================================="
}

# =============================================================================
# SCRIPT EXECUTION
# =============================================================================

# Trap to handle script interruption
trap 'print_error "Installation interrupted by user"; exit 1' INT TERM

# Check if script is being sourced or executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    # Script is being executed directly
    main "$@"
fi