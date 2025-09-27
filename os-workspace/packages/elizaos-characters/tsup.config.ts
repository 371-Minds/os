import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/ceo-mimi.character.ts',
    'src/cto-zara.character.ts', 
    'src/cfo-maya.character.ts',
    'src/clo-alex.character.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  minify: false,
  external: ['@elizaos/core'],
  outDir: 'dist'
})