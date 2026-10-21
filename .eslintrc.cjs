module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Desabilita exigência de PropTypes
    // react-three-fiber renders three.js objects as JSX intrinsics (mesh,
    // bufferAttribute, ambientLight, etc.) whose props aren't real DOM
    // attributes, which this rule otherwise flags as unknown.
    'react/no-unknown-property': [
      'error',
      {
        ignore: [
          'args',
          'attach',
          'count',
          'array',
          'itemSize',
          'transparent',
          'intensity',
          'toneMapped',
        ],
      },
    ],
  },
}
