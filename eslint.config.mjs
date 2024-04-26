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
  },
})

export default config
