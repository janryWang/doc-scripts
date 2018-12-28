const baseConfig = require('./base')
const webpack = require('webpack')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ header, footer } = {}) => {
  baseConfig.plugins.push(
    new HtmlWebpackPlugin({
      title: `${pkg.name}@${pkg.version}`,
      filename: 'index.html',
      template: path.resolve(__dirname, '../assets/template.ejs'),
      inject: 'body',
      header,
      footer,
      hot: false
    })
  )
  return {
    ...baseConfig,
    mode: 'production'
  }
}
