const baseConfig = require('./base')
const webpack = require('webpack')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (options) => {
  const { header, footer, title } = options || {}
  const config = baseConfig(options)
  config.plugins.push(
    new HtmlWebpackPlugin({
      title: title ? title : `${pkg.name}@${pkg.version}`,
      filename: 'index.html',
      template: path.resolve(__dirname, '../assets/template.ejs'),
      inject: 'body',
      header,
      footer,
      hot: false
    })
  )
  return {
    ...config,
    mode: 'production'
  }
}
