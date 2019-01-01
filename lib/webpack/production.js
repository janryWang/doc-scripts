"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var baseConfig = require('./base');

var webpack = require('webpack');

var path = require('path');

var pkg = require(path.resolve(process.cwd(), './package.json'));

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      header = _ref.header,
      footer = _ref.footer,
      title = _ref.title;

  baseConfig.plugins.push(new HtmlWebpackPlugin({
    title: title ? title : pkg.name + "@" + pkg.version,
    filename: 'index.html',
    template: path.resolve(__dirname, '../assets/template.ejs'),
    inject: 'body',
    header: header,
    footer: footer,
    hot: false
  }));
  return (0, _extends2.default)({}, baseConfig, {
    mode: 'production'
  });
};