module.exports = {
  plugins: [
    // https://github.com/babel/babel/issues/8562
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('babel-plugin-react-docgen')
  ],
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          chrome: '65'
        },
        modules: 'commonjs',
        loose: true,
        useBuiltIns: 'usage'
      }
    ].filter(Boolean),
    require.resolve('@babel/preset-react')
  ]
}
