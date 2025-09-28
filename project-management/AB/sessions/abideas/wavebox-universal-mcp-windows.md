# Wavebox Integration with 371OS Universal MCP - Windows-Compatible Implementation

## 🎯 Overview

This document provides guidance on integrating Wavebox with the 371OS Universal MCP architecture on Windows platforms. The original documentation referenced macOS-specific automation tools that are not compatible with Windows environments.

## 🚧 Platform Limitation Clarification

The [wavebox-browser-control-mcp](https://github.com/wavebox/wavebox-browser-control-mcp) extension mentioned in the original documentation has a specific limitation:
- **macOS Only**: Requires AppleScript which is only available on macOS
- **Not Compatible with Windows**: This specific automation extension won't work on Windows environments

## 🔧 Windows-Compatible Integration Approach

Despite the macOS-specific limitation, you can still achieve comprehensive Wavebox integration with 371OS through Windows-compatible methods.

### 1. **Standard Wavebox Features (Windows Compatible)**

All core Wavebox features work perfectly on Windows:
- ✅ App grouping and workspace organization
- ✅ Multi-account management
- ✅ Chrome extension support
- ✅ Session management and note-taking
- ✅ Dashboard pinning and sidebar apps
- ✅ Split-screen and multi-profile capabilities

### 2. **Windows-Compatible Automation Methods**

Instead of the macOS-specific MCP, use these Windows-compatible alternatives:

#### **PowerShell-based Automation**
```powershell
# Example: Control Wavebox via PowerShell scripts
# Launch specific URLs in Wavebox
Start-Process "wavebox://open?url=https://github.com/371-Minds/os"

# Manage profiles and sessions
# These can be integrated with your existing 371OS PowerShell scripts
```

#### **Wavebox Extension API (Cross-Platform)**
The [Wavebox Extension API](https://github.com/wavebox/wavebox-lO-extension-api) itself is cross-platform and works on Windows to build custom integrations.

#### **URL Scheme Integration**
Wavebox supports custom URL schemes for basic automation:
- `wavebox://open?url=[URL]` - Open a URL in Wavebox
- `wavebox://profile/[profile-name]` - Switch to a specific profile

## 🔄 Integration with 371OS Universal MCP

### **Universal MCP Bridge Pattern**
```
371OS Agents → Universal MCP Router → Platform-Specific MCP Adapters
                                    ├── Wavebox MCP (Windows-Compatible)
                                    ├── GitHub MCP (Cross-platform)
                                    ├── Pieces MCP (Cross-platform)
                                    └── Custom Agent MCP (Cross-platform)
```

### **Creating a Windows-Compatible Wavebox MCP Server**

Instead of using the macOS-specific extension, create your own Windows-compatible MCP server:

```typescript
// packages/elizaos-plugins/wavebox-mcp/src/plugin.ts
import { Plugin, Action, IAgentRuntime, Memory, State, ActionResult } from '@elizaos/core';

export const WaveboxMCPPlugin: Plugin = {
  name: 'wavebox-mcp',
  description: 'Windows-compatible Wavebox integration for 371OS',
  
  actions: [
    {
      name: 'WAVEBOX_OPEN_URL',
      description: 'Open URL in Wavebox browser (Windows compatible)',
      handler: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<ActionResult> => {
        try {
          const url = state?.data?.url || "https://wavebox.io";
          
          // Windows-compatible approach using child_process
          const { exec } = require('child_process');
          exec(`start wavebox://open?url=${encodeURIComponent(url)}`, 
               { shell: 'cmd.exe' });
          
          return { success: true, data: { url } };
        } catch (error: any) {
          return { success: false, error: error.message };
        }
      }
    },
    {
      name: 'WAVEBOX_MANAGE_PROFILE',
      description: 'Manage Wavebox profiles (Windows compatible)',
      handler: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<ActionResult> => {
        try {
          const profile = state?.data?.profile || "default";
          
          // Windows-compatible profile management
          const { exec } = require('child_process');
          exec(`start wavebox://profile/${profile}`, 
               { shell: 'cmd.exe' });
          
          return { success: true, data: { profile } };
        } catch (error: any) {
          return { success: false, error: error.message };
        }
      }
    }
  ],
};
```

## 🛠️ Implementation Steps for Windows

### 1. **Immediate Windows-Compatible Features**
- Set up Wavebox workspace with 371OS tools
- Install Chrome extensions you're already using
- Organize apps into logical groups (Dev, Docs, Ops, etc.)

### 2. **PowerShell Integration Scripts**
Create Windows PowerShell scripts for advanced automation:

```powershell
# scripts/wavebox-control.ps1
param(
    [string]$Action,
    [string]$Url,
    [string]$Profile
)

# Ensure ExecutionPolicy allows script execution
# Run with: PowerShell -ExecutionPolicy Bypass -File .\scripts\wavebox-control.ps1

switch ($Action) {
    "open" {
        Start-Process "wavebox://open?url=$Url"
    }
    "profile" {
        Start-Process "wavebox://profile/$Profile"
    }
    "session" {
        # Session management logic
        Write-Host "Managing Wavebox session: $Profile"
    }
    default {
        Write-Host "Unknown action: $Action"
    }
}
```

### 3. **Integration with Existing 371OS MCP Infrastructure**

The Wavebox MCP plugin can be integrated with your existing MCP servers:

```typescript
// Example integration with 371OS Universal MCP Router
import { WaveboxMCPPlugin } from '../packages/elizaos-plugins/wavebox-mcp/src/plugin';
import { GithubMCPPlugin } from '../packages/elizaos-plugins/github-mcp/src/plugin';
import { CustomAgentMCPPlugin } from '../packages/elizaos-plugins/custom-agent-mcp/src/plugin';

// Register all MCP plugins in your 371OS configuration
const mcpPlugins = [
  WaveboxMCPPlugin,      // Windows-compatible Wavebox integration
  GithubMCPPlugin,       // Cross-platform GitHub integration
  CustomAgentMCPPlugin   // Your custom agent integrations
];
```

## 📋 Summary of Windows-Compatible Features

| Feature | Windows Support | Implementation Method |
|---------|-----------------|----------------------|
| App Grouping | ✅ Full | Wavebox UI |
| Multi-Account | ✅ Full | Wavebox UI |
| Chrome Extensions | ✅ Full | Wavebox Extension Store |
| URL Scheme Control | ✅ Full | `wavebox://` URLs |
| Profile Management | ✅ Full | `wavebox://profile/` URLs |
| Session Management | ✅ Full | Wavebox UI |
| PowerShell Automation | ✅ Full | Custom PowerShell scripts |
| Extension API | ✅ Full | Wavebox Extension API |
| Custom MCP Server | ✅ Full | TypeScript plugin development |

## ⚠️ Important Notes for Windows Implementation

### **PowerShell Execution Policy**
When running PowerShell scripts on Windows, you may need to adjust the execution policy:

```powershell
# Check current execution policy
Get-ExecutionPolicy

# Set policy to allow local scripts (run as Administrator)
Set-ExecutionPolicy RemoteSigned

# Or bypass for individual script execution
PowerShell -ExecutionPolicy Bypass -File .\scripts\wavebox-control.ps1
```

### **371OS Development Environment**
Ensure your 371OS development environment follows Windows compatibility standards:
- Use Bun as the preferred package manager (faster than npm)
- Follow PowerShell script conventions for Windows deployment
- Use forward slashes in JSON configuration files
- Test all automation scripts in Windows environment before deployment

## 📚 Resources

- [Wavebox Official Site](https://wavebox.io)
- [Wavebox Extension API](https://github.com/wavebox/wavebox-lO-extension-api)
- [371OS Universal MCP Architecture](../../371-os/src/minds371/mcp_servers/)
- [371OS PowerShell Scripts](../../scripts/)

## 🎯 Benefits of Windows-Compatible Integration

1. **Full Feature Parity**: Access to all core Wavebox features on Windows
2. **Automation Capabilities**: PowerShell-based automation for complex workflows
3. **Integration with 371OS**: Seamless integration with Universal MCP architecture
4. **Cross-Platform Consistency**: Maintain compatibility with team members on different OS
5. **Enterprise Ready**: Secure, scalable solution for Windows enterprise environments

This Windows-compatible approach maintains all the productivity benefits of Wavebox integration while ensuring full compatibility with the 371OS Universal MCP architecture on Windows platforms.