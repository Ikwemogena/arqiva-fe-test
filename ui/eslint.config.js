import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  overrides: {
    // Force override func-style
    rules: {
      '@typescript-eslint/prefer-function-type': 'off',
      'func-style': ['error', 'expression', { allowArrowFunction: true }], // <--- This must be in overrides for Antfu configs
    },
  },
  rules: {
    'unicorn/prefer-number-properties': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
  },
})
