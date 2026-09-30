import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  external: ['dragee'],
  output: {
    file: 'dist/index.dev.js',
    format: 'iife',
    name: 'DrageeWidgets',
    globals: { dragee: 'Dragee' },
    sourcemap: 'inline'
  },
  plugins: [
    babel({ babelHelpers: 'bundled' })
  ]
}
