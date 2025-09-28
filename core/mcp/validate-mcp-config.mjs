// 371 OS MCP Configuration Validator
// Validates MCP configuration files and server connectivity

import { readFileSync } from 'fs';
import { URL } from 'url';

console.log('🔍 371 OS MCP Configuration Validator');
console.log('=====================================');

async function validateMCPConfig(configPath) {
    try {
        console.log(`\n📄 Reading configuration: ${configPath}`);
        const configContent = readFileSync(configPath, 'utf8');
        const config = JSON.parse(configContent);
        
        console.log('✅ JSON syntax is valid');
        
        // Check for required structure
        if (!config.mcpServers) {
            throw new Error('Missing mcpServers configuration');
        }
        
        console.log(`📊 Found ${Object.keys(config.mcpServers).length} MCP servers configured`);
        
        // Validate each server configuration
        for (const [serverName, serverConfig] of Object.entries(config.mcpServers)) {
            console.log(`\n🔧 Validating ${serverName} server:`);
            
            // Check required fields
            if (!serverConfig.command) {
                console.log(`  ❌ Missing 'command' field`);
                continue;
            }
            if (!serverConfig.args || !Array.isArray(serverConfig.args)) {
                console.log(`  ❌ Missing or invalid 'args' field`);
                continue;
            }
            if (!serverConfig.env || !serverConfig.env.MCP_SERVER_URL) {
                console.log(`  ❌ Missing MCP_SERVER_URL in env`);
                continue;
            }
            
            console.log(`  ✅ Command: ${serverConfig.command}`);
            console.log(`  ✅ Args: ${serverConfig.args.join(' ')}`);
            
            // Validate URL
            try {
                const url = new URL(serverConfig.env.MCP_SERVER_URL);
                console.log(`  ✅ URL: ${serverConfig.env.MCP_SERVER_URL}`);
                console.log(`  📡 Port: ${url.port || (url.protocol === 'https:' ? 443 : 80)}`);
            } catch (urlError) {
                console.log(`  ❌ Invalid URL: ${serverConfig.env.MCP_SERVER_URL}`);
            }
            
            // Check if script file exists (for node servers)
            if (serverConfig.command === 'node' && serverConfig.args.length > 0) {
                const scriptPath = serverConfig.args[0];
                try {
                    readFileSync(scriptPath, 'utf8');
                    console.log(`  ✅ Script exists: ${scriptPath}`);
                } catch {
                    console.log(`  ❌ Script not found: ${scriptPath}`);
                }
            }
        }
        
        return true;
        
    } catch (error) {
        console.log(`❌ Configuration validation failed: ${error.message}`);
        return false;
    }
}

async function testServerConnectivity(url, timeout = 5000) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const response = await fetch(url, {
            signal: controller.signal,
            method: 'GET'
        });
        
        clearTimeout(timeoutId);
        return { success: true, status: response.status, statusText: response.statusText };
        
    } catch (error) {
        if (error.name === 'AbortError') {
            return { success: false, error: 'Connection timeout' };
        }
        return { success: false, error: error.message };
    }
}

async function validateConnectivity() {
    console.log('\n🌐 Testing Server Connectivity');
    console.log('==============================');
    
    const endpoints = [
        { name: 'Documentation MCP Health', url: 'http://localhost:39301/health' },
        { name: 'Cognition MCP Health', url: 'http://localhost:39300/health' },
        { name: 'Documentation MCP Endpoint', url: 'http://localhost:39301/model_context_protocol/2024-11-05/documentation' },
        { name: 'Cognition MCP SSE Endpoint', url: 'http://localhost:39300/model_context_protocol/2024-11-05/sse' }
    ];
    
    for (const endpoint of endpoints) {
        console.log(`\n🔍 Testing ${endpoint.name}:`);
        const result = await testServerConnectivity(endpoint.url);
        
        if (result.success) {
            console.log(`  ✅ Connected successfully (HTTP ${result.status})`);
        } else {
            console.log(`  ❌ Connection failed: ${result.error}`);
        }
    }
}

// Main execution
async function main() {
    console.log('');
    
    // Validate configuration files
    const configFiles = [
        'f:/os-main/core/mcp/qoder-mcp-config.json',
        'f:/os-main/core/mcp/cognition-layer-mcp.json'
    ];
    
    for (const configFile of configFiles) {
        await validateMCPConfig(configFile);
    }
    
    // Test server connectivity
    await validateConnectivity();
    
    console.log('\n🏁 Validation Complete');
    console.log('======================');
    console.log('');
    console.log('💡 Troubleshooting Tips:');
    console.log('  1. If servers are not responding, run: powershell -ExecutionPolicy Bypass -File restart-mcp-servers.ps1');
    console.log('  2. Check that no other processes are using ports 39300-39302');
    console.log('  3. Verify all script files exist and are readable');
    console.log('  4. Use the fixed qoder-mcp-config.json in Qoder IDE');
}

main().catch(console.error);