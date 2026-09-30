import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js',
  external: ['dragee'],
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/index.min.js',
      format: 'iife',
      name: 'DrageeWidgets',
      globals: { dragee: 'Dragee' },
      plugins: [terser()]
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'DrageeWidgets',
      globals: { dragee: 'Dragee' },
      plugins: [terser()]
    }
  ],
  plugins: [
    babel({ babelHelpers: 'bundled' })
  ]
}
