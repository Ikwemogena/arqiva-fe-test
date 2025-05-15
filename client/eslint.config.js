import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  rules: {
    'unicorn/prefer-number-properties': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    'func-style': ['error', 'expression'],
  },
})
