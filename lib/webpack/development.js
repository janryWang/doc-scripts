"use strict";

var baseConfig = require('./base');

var webpack = require('webpack');

var path = require('path');

var pkg = require(path.resolve(process.cwd(), './package.json'));

var HtmlWebpackPlugin = require('html-webpack-plugin');

var log = require('../log');

module.exports = function (_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      port = _ref.port,
      header = _ref.header,
      footer = _ref.footer;

  baseConfig.plugins.push(new HtmlWebpackPlugin({
    title: pkg.name + "@" + pkg.version,
    filename: 'index.html',
    template: path.resolve(__dirname, '../assets/template.ejs'),
    inject: 'body',
    port: port,
    hot: true,
    development: true,
    header: header,
    footer: footer
  }));
  baseConfig.entry.push('webpack/hot/dev-server', "webpack-dev-server/client?http://localhost:" + port);
  baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  return baseConfig;
};