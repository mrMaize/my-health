module.exports = {
  rules: {
    'import/order': [
      'error',
      {
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          ['builtin', 'external'],
          ['internal'],
          ['parent'],
          ['sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-cycle': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/no-relative-packages': 'error',
    'import/no-useless-path-segments': 'error',

    // включить, когда будут алиасы
    // 'no-restricted-imports': [
    //   'error',
    //   {
    //     patterns: [
    //       {
    //         group: ['../../../*'],
    //         message: 'Слишком сложный путь. Используйте абсолютный импорт',
    //       },
    //     ],
    //   },
    // ],
  },
};
