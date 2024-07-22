import antfu from '@antfu/eslint-config'

const config = antfu({
  solid: !true,
  typescript: true,
  unocss: true,
  yaml: false,
  vue: false,
  formatters: true,

  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'unused-imports/no-unused-vars': 'warn',
    'style/jsx-one-expression-per-line': [0, { allow: 'non-jsx' }],
  },
})

export default config
