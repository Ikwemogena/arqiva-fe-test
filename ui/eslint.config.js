import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  rules: {
    'unicorn/prefer-number-properties': 'off',
    'antfu/top-level-function': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
  },
  overrides: {
    // Force override func-style
    rules: {
      '@typescript-eslint/prefer-function-type': 'off',
      'func-style': ['error', 'expression', { allowArrowFunction: true }],
    },
  },
})
