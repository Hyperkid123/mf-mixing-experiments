module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@redhat-cloud-services/eslint-config-redhat-cloud-services'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'rulesdir/forbid-pf-relative-imports': 'off',
  },
}
