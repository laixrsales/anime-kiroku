module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',

    // 🔥 integração Prettier
    'plugin:prettier/recommended',

    // 🔥 desativa regras do ESLint que conflitam com Prettier
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off', // React 17+
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
}
