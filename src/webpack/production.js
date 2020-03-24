const baseConfig = require('./base')
const webpack = require('webpack')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), './package.json'))
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')


module.exports = (options) => {
  const { header, footer, title } = options || {}
  const config = baseConfig(options)
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../assets/template.ejs'),
      inject: 'body',
      chunks:['index'],
      templateParameters:{
        title: title ? title : `${pkg.name}@${pkg.version}`,
        development: false,
        header,
        footer
      }
    }),
    new HtmlWebpackPlugin({
      title: title ? title : `${pkg.name}@${pkg.version}`,
      filename: 'iframe.html',
      template: path.resolve(__dirname, '../assets/template.ejs'),
      inject: 'body',
      chunks:['iframe'],
      templateParameters:{
        title: title ? title : `${pkg.name}@${pkg.version}`,
        development: false,
        header,
        footer
      }
    }),
    new GenerateSW({
      maximumFileSizeToCacheInBytes:20 * 1024 * 1024
    })
  )
  return {
    ...config,
    mode: 'production'
  }
}
