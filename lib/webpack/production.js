"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var baseConfig = require('./base');

var webpack = require('webpack');

var path = require('path');

var react = require(require.resolve('react'));

var pkg = require(path.resolve(process.cwd(), './package.json'));

var HtmlWebpackPlugin = require('html-webpack-plugin');

baseConfig.plugins.push(new HtmlWebpackPlugin({
  title: pkg.name + "@" + pkg.version,
  filename: 'index.html',
  template: path.resolve(__dirname, '../assets/template.ejs'),
  inject: 'body',
  reactVersion: react.version,
  hot: false
}));
module.exports = (0, _extends2.default)({}, baseConfig, {
  mode: 'production'
});