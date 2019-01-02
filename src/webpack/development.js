const baseConfig = require('./base')
const webpack = require('webpack')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))
const HtmlWebpackPlugin = require('html-webpack-plugin')
const log = require('../log')

module.exports = options => {
  const { port, header, footer, title } = options || {}
  const config = baseConfig(options)
  config.plugins.push(
    new HtmlWebpackPlugin({
      title: title ? title : `${pkg.name}@${pkg.version}`,
      filename: 'index.html',
      template: path.resolve(__dirname, '../assets/template.ejs'),
      inject: 'body',
      port: port,
      hot: true,
      development: true,
      header,
      footer
    })
  )

  config.entry.push(
    require.resolve('webpack/hot/dev-server'),
    `${require.resolve('webpack-dev-server/client')}?http://localhost:${port}`
  )
  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  return config
}
