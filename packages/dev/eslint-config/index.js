module.exports = {
  extends: [
    'eslint:recommended',
    // 'plugin:flowtype/recommended',
    'plugin:monorepo/recommended',
    'plugin:react/recommended',
    'prettier',
    // 'prettier/flowtype',
    'prettier/react',
  ],
  parser: '@babel/eslint-parser',
  plugins: [
    '@parcel',
    //'flowtype',
    'import',
    'monorepo',
    'react',
    'mocha',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
  },
  globals: {
    parcelRequire: true,
    define: true,
    SharedArrayBuffer: true,
  },
  // https://eslint.org/docs/user-guide/configuring#configuration-based-on-glob-patterns
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        'import/first': 'off',
        'import/newline-after-import': 'off',
        'import/no-extraneous-dependencies': 'off',
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-dupe-class-members": "error",
        "no-undef": "off",
        // "no-redeclare": "off",
      },
    },
    {
      files: ['**/test/**', '*.test.js', 'packages/core/integration-tests/**'],
      env: {
        mocha: true,
      },
      rules: {
        //'import/no-extraneous-dependencies': 'off',
        'monorepo/no-internal-import': 'off',
        'monorepo/no-relative-import': 'off',
        'mocha/no-exclusive-tests': 'error',
      },
    },
  ],
  rules: {
    '@parcel/no-self-package-imports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-self-import': 'error',
    'no-prototype-builtins': 'off',
    'no-console': 'error',
    'no-return-await': 'error',
    'require-atomic-updates': 'off',
    'require-await': 'error',
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
    react: {
      version: 'detect',
    },
  },
};
