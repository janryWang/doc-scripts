"use strict";

var baseConfig = require('./base');

var webpack = require('webpack');

var path = require('path');

var pkg = require(path.resolve(process.cwd(), './package.json'));

var HtmlWebpackPlugin = require('html-webpack-plugin');

var log = require('../log');

module.exports = function (options) {
  var _ref = options || {},
      port = _ref.port,
      header = _ref.header,
      footer = _ref.footer,
      title = _ref.title;

  var config = baseConfig(options);
  config.plugins.push(new HtmlWebpackPlugin({
    title: title ? title : pkg.name + "@" + pkg.version,
    filename: 'index.html',
    template: path.resolve(__dirname, '../assets/template.ejs'),
    inject: 'body',
    port: port,
    hot: true,
    development: true,
    header: header,
    footer: footer
  }));
  config.entry.push(require.resolve('webpack/hot/dev-server'), require.resolve('webpack-dev-server/client') + "?http://localhost:" + port);
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  return config;
};