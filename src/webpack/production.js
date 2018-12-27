const baseConfig = require('./base')
const webpack = require('webpack')
const path = require('path')
const react = require(require.resolve('react'))
const pkg = require(path.resolve(process.cwd(), './package.json'))
const HtmlWebpackPlugin = require('html-webpack-plugin')

baseConfig.plugins.push(
  new HtmlWebpackPlugin({
    title: `${pkg.name}@${pkg.version}`,
    filename: 'index.html',
    template: path.resolve(__dirname, '../assets/template.ejs'),
    inject: 'body',
    reactVersion: react.version,
    hot: false
  })
)


module.exports = {
  ...baseConfig,
  mode:'production'
}