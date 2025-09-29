# Development Environment Validation

<cite>
**Referenced Files in This Document**   
- [test-setup.ps1](file://scripts/test-setup.ps1)
- [quick-start.ps1](file://scripts/quick-start.ps1)
- [package.json](file://package.json)
- [nx.json](file://nx.json)
- [IMPLEMENTATION_GUIDE.md](file://IMPLEMENTATION_GUIDE.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Purpose of test-setup.ps1](#purpose-of-test-setupps1)
3. [Validation Checks Performed](#validation-checks-performed)
4. [Usage Instructions](#usage-instructions)
5. [Integration with Development Workflow](#integration-with-development-workflow)
6. [Troubleshooting Common Issues](#troubleshooting-common-issues)

## Introduction
The Development Environment Validation process is a critical first step in setting up the 371 OS system. This documentation focuses on the `test-setup.ps1` script, which serves as a diagnostic tool to verify that the development environment meets the necessary requirements before proceeding with full system setup and deployment. The script provides immediate feedback on the state of the environment, helping developers identify and resolve configuration issues early in the process.

## Purpose of test-setup.ps1
The `test-setup.ps1` script is designed to perform a quick validation of the development environment to ensure all prerequisites are met before proceeding with the full setup process. Unlike the comprehensive `quick-start.ps1` script that automates the entire installation and configuration process, `test-setup.ps1` functions as a lightweight diagnostic tool that checks the current state of the environment without making any changes.

The primary purposes of this script include:
- Verifying basic PowerShell execution capabilities
- Confirming the presence of essential configuration files
- Checking for required dependencies and tools
- Providing immediate feedback on environment readiness

This script is particularly useful for developers who want to validate their environment before running the more extensive setup process, or for troubleshooting issues that may arise during development.

**Section sources**
- [test-setup.ps1](file://scripts/test-setup.ps1#L1-L10)

## Validation Checks Performed
The `test-setup.ps1` script performs several validation checks to ensure the development environment is properly configured. These checks are executed sequentially and provide color-coded output to indicate the status of each test.

### Basic Environment Verification
The script begins by testing basic PowerShell functionality and displaying the current directory location. This ensures that PowerShell is functioning correctly and helps verify that the user is executing the script from the correct directory.

```powershell
Write-Host "Testing basic PowerShell execution..." -ForegroundColor Yellow
$currentLocation = Get-Location
Write-Host "Current directory: $currentLocation" -ForegroundColor White
```

### Configuration File Checks
The script verifies the presence of key configuration files that define the Nx workspace structure:

- **nx.json check**: Confirms the presence of the Nx workspace configuration file, which is essential for the monorepo structure
- **package.json check**: Validates that the main package configuration exists and attempts to parse it to display the project name and version

```powershell
if (Test-Path "nx.json") {
    Write-Host "SUCCESS: Found nx.json - we're in an Nx workspace!" -ForegroundColor Green
} else {
    Write-Host "WARNING: nx.json not found" -ForegroundColor Yellow
}
```

### Dependency Verification
The script checks for the presence of essential development tools and dependencies:

- **node_modules directory**: Verifies that npm dependencies have been installed
- **PowerShell scripts**: Confirms that key setup scripts (`quick-start.ps1` and `deploy-akash.ps1`) are present in the scripts directory

### Tool Availability Checks
The script attempts to verify the availability of critical development tools by checking their version information:

- **Node.js**: Tests whether Node.js is available in the system PATH
- **npm**: Checks for the presence of the npm package manager

These checks are performed using try-catch blocks to handle cases where the tools might not be installed or accessible.

**Section sources**
- [test-setup.ps1](file://scripts/test-setup.ps1#L15-L75)

## Usage Instructions
The `test-setup.ps1` script is designed to be simple and straightforward to use. It can be executed with optional parameters to customize its behavior.

### Basic Execution
To run the script with default settings, navigate to the repository root directory and execute:

```powershell
.\scripts\test-setup.ps1
```

This will perform all validation checks and display the results with color-coded output indicating success, warnings, or errors.

### Optional Parameters
The script supports two optional switch parameters:

- **-SkipDependencyCheck**: Skips the dependency verification checks (Node.js and npm availability)
- **-SkipBuild**: Although defined in the parameter list, this parameter is not used in the current implementation

Example usage with parameter:
```powershell
.\scripts\test-setup.ps1 -SkipDependencyCheck
```

### Interpreting Results
The script output uses a color-coded system to indicate the status of each check:
- **Green (SUCCESS)**: The check passed successfully
- **Yellow (WARNING)**: The check produced a warning but is not critical
- **Red (ERROR)**: The check failed and requires attention

The script concludes with a summary message indicating whether the environment appears to be ready based on the results of the checks.

**Section sources**
- [test-setup.ps1](file://scripts/test-setup.ps1#L1-L75)

## Integration with Development Workflow
The `test-setup.ps1` script plays a specific role in the overall development workflow of the 371 OS system, serving as an initial validation step before more comprehensive setup processes.

### Relationship to quick-start.ps1
While `test-setup.ps1` only validates the environment, the `quick-start.ps1` script performs the actual setup and configuration. The relationship between these scripts follows a logical progression:

1. **Validation phase**: Use `test-setup.ps1` to check the current environment state
2. **Setup phase**: Run `quick-start.ps1` to install dependencies and configure the system
3. **Verification phase**: Re-run `test-setup.ps1` to confirm successful setup

This approach allows developers to identify and resolve issues before committing to the full setup process.

### Position in Implementation Guide
According to the IMPLEMENTATION_GUIDE.md, the development process follows a phased approach. The `test-setup.ps1` script aligns with the early stages of this process, particularly the Foundation Setup phase. It serves as a quick verification tool that corresponds to the initial setup steps outlined in the guide.

The script's checks map directly to the prerequisites specified in the implementation guide, including Node.js installation, Git configuration, and the presence of essential configuration files.

``mermaid
flowchart TD
A[Clone Repository] --> B[Run test-setup.ps1]
B --> C{Environment Valid?}
C --> |Yes| D[Run quick-start.ps1]
C --> |No| E[Fix Environment Issues]
E --> B
D --> F[Configure Agents]
F --> G[Deploy to Akash]
```

**Diagram sources**
- [test-setup.ps1](file://scripts/test-setup.ps1#L1-L75)
- [quick-start.ps1](file://scripts/quick-start.ps1#L1-L371)
- [IMPLEMENTATION_GUIDE.md](file://IMPLEMENTATION_GUIDE.md#L1-L761)

**Section sources**
- [test-setup.ps1](file://scripts/test-setup.ps1#L1-L75)
- [quick-start.ps1](file://scripts/quick-start.ps1#L1-L371)
- [IMPLEMENTATION_GUIDE.md](file://IMPLEMENTATION_GUIDE.md#L1-L761)

## Troubleshooting Common Issues
When the `test-setup.ps1` script reports issues, they typically fall into several common categories. This section provides guidance on interpreting and resolving these issues.

### Configuration File Missing
If the script reports that `nx.json` or `package.json` is not found:

- Verify you are running the script from the repository root directory
- Check that you have cloned the complete repository
- Ensure no files were accidentally deleted

### Dependency Issues
When Node.js or npm are not found in the PATH:

- Verify Node.js is installed (version 18 or higher as specified in package.json)
- Check that the installation directory is added to the system PATH
- Restart your terminal/PowerShell session after installing Node.js

### Permission Issues
If you encounter execution policy errors when running the script:

```powershell
# Run PowerShell as Administrator and execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This allows the execution of local PowerShell scripts while maintaining security for downloaded scripts.

### node_modules Directory Missing
If the node_modules directory is not found:

- Run `npm install` to install dependencies
- Ensure you have a stable internet connection
- Verify sufficient disk space is available

The `test-setup.ps1` script serves as an effective first line of defense in identifying these common setup issues, allowing developers to resolve them before proceeding with more complex configuration steps.

**Section sources**
- [test-setup.ps1](file://scripts/test-setup.ps1#L1-L75)
- [package.json](file://package.json#L1-L82)
- [IMPLEMENTATION_GUIDE.md](file://IMPLEMENTATION_GUIDE.md#L1-L761)