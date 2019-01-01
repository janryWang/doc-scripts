const baseConfig = require('./base')
const webpack = require('webpack')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))
const HtmlWebpackPlugin = require('html-webpack-plugin')
const log = require('../log')

module.exports = ({ port, header, footer, title } = {}) => {
  baseConfig.plugins.push(
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

  baseConfig.entry.push(
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://localhost:${port}`
  )

  baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

  return baseConfig
}
