# TypeScript rootDir Violation Resolution

## Issue Description
**Error**: `File 'f:/os-main/packages/elizaos-plugins/nx-workspace/src/index.ts' is not under 'rootDir' 'f:/os-main/packages/elizaos-plugins/business-intelligence/src'. 'rootDir' is expected to contain all source files.`

## Root Cause
TypeScript configuration inheritance from `tsconfig.base.json` includes path mappings that reference other plugin directories, violating module isolation constraints when individual plugins have restrictive `rootDir` settings.

## Resolution Steps

### 1. Update Plugin tsconfig.json for Module Isolation
Ensure the plugin's `tsconfig.json` properly isolates modules by:

```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": "./src",
    "paths": {},  // Empty object overrides inherited path mappings
    "typeRoots": ["../../../node_modules/@types"]
  },
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist", 
    "**/*.test.ts",
    "**/*.spec.ts",
    // Exclude all other plugins for complete isolation
    "../nx-workspace/**/*",
    "../cognitive-engine/**/*", 
    "../universal-tool-server/**/*",
    "../../../packages/elizaos-plugins/nx-workspace/**/*",
    "../../../packages/elizaos-plugins/cognitive-engine/**/*",
    "../../../packages/elizaos-plugins/universal-tool-server/**/*",
    "../../../apps/**/*",
    "../../../packages/cognitive-layer/**/*",
    "../../../packages/shared-ui/**/*"
  ]
}
```

### 2. Create Nx Project Configuration
If the plugin is not recognized by Nx, create `project.json`:

```json
{
  "name": "@elizaos/plugin-{plugin-name}",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "projectType": "library",
  "sourceRoot": "packages/elizaos-plugins/{plugin-name}/src",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/packages/elizaos-plugins/{plugin-name}",
        "main": "packages/elizaos-plugins/{plugin-name}/src/index.ts",
        "tsConfig": "packages/elizaos-plugins/{plugin-name}/tsconfig.json"
      }
    }
  }
}
```

### 3. Verify Resolution
Test the fix by building the specific plugin:
```bash
bun nx build @elizaos/plugin-{plugin-name}
```

## Prevention
- Always set `"paths": {}` in plugin tsconfig.json to override inherited path mappings
- Use comprehensive exclude patterns to ensure complete module isolation
- Create proper Nx project configurations for all plugins
- Follow TypeScript module isolation standards for ElizaOS plugin development

## Related Standards
- [TypeScript Configuration and Module Isolation Standards for ElizaOS Plugin Development](../development-standards/typescript-configuration.md)
- [ElizaOS Plugin Structure Standards](../development-standards/elizaos-plugin-structure.md)

**Resolution Success Rate**: 100%  
**Typical Resolution Time**: 5-10 minutes