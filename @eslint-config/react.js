module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/self-closing-comp': 'error',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-no-constructed-context-values': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.*'],
      rules: {
        'react/jsx-no-constructed-context-values': 'off',
      },
    },
  ],
};
