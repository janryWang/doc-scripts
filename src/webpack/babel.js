module.exports = {
  plugins: [
    // https://github.com/babel/babel/issues/8562
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        style: true
      },
      'antd'
    ],
    [
      'babel-plugin-import',
      {
        libraryName: 'antd-mobile',
        style: true
      },
      'antd-mobile'
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@alife/next',
        style: true
      },
      '@alife/next'
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@alifd/next',
        style: true
      },
      '@alifd/next'
    ]
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '65'
        },
        modules: 'commonjs',
        loose: true,
        useBuiltIns: 'usage'
      }
    ].filter(Boolean),
    '@babel/preset-react'
  ]
}
