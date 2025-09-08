# Biome Migration Guide

This document explains how we've migrated from ESLint and Prettier to Biome to significantly reduce our dependency count.

## Why Biome?

Biome is an all-in-one linter and formatter written in Rust. It's incredibly fast and has zero dependencies, which helps us reduce our dependency count from over 2200 to a much more manageable number.

## Changes Made

1. **Added Biome**: Installed `@biomejs/biome` as a dev dependency
2. **Created Configuration**: Added `biome.json` with our formatting and linting rules
3. **Updated Scripts**: 
   - Replaced `"lint": "bun nx run-many -t lint"` with `"lint": "bunx @biomejs/biome check --write ."`
   - Added `"format": "bunx @biomejs/biome format --write ."`
4. **Removed Dependencies**: Removed the following packages:
   - `eslint`
   - `@typescript-eslint/eslint-plugin`
   - `@typescript-eslint/parser`
   - `eslint-config-prettier`
   - `prettier`
   - `@nx/eslint`
   - `@nx/eslint-plugin`
   - `jsonc-eslint-parser`

## Benefits

- **Reduced Dependency Count**: Eliminated hundreds of dependencies
- **Faster Execution**: Biome is significantly faster than ESLint + Prettier
- **Simplified Configuration**: One tool instead of multiple tools
- **Better Performance**: Written in Rust for optimal performance

## Usage

To lint and fix issues:
```bash
bun run lint
```

To format code:
```bash
bun run format
```

## Configuration

The `biome.json` file contains our configuration:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.2.3/schema.json",
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "all"
    }
  }
}
```

This configuration:
- Enables the linter with recommended rules
- Configures the formatter to use 2-space indentation
- Sets JavaScript formatting to use single quotes and trailing commas