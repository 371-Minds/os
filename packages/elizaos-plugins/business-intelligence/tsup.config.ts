import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  external: ['@elizaos/core'],
  banner: {
    js: '// Business Intelligence Plugin for ElizaOS - Revolutionary AI-powered business analytics'
  }
});