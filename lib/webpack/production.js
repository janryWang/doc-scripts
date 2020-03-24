"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var baseConfig = require('./base');

var webpack = require('webpack');

var path = require('path');

var pkg = require(path.resolve(process.cwd(), './package.json'));

var HtmlWebpackPlugin = require('html-webpack-plugin');

var _require = require('workbox-webpack-plugin'),
    GenerateSW = _require.GenerateSW;

module.exports = function (options) {
  var _ref = options || {},
      header = _ref.header,
      footer = _ref.footer,
      title = _ref.title;

  var config = baseConfig(options);
  config.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../assets/template.ejs'),
    inject: 'body',
    chunks: ['index'],
    templateParameters: {
      title: title ? title : pkg.name + "@" + pkg.version,
      development: false,
      header: header,
      footer: footer
    }
  }), new HtmlWebpackPlugin({
    title: title ? title : pkg.name + "@" + pkg.version,
    filename: 'iframe.html',
    template: path.resolve(__dirname, '../assets/template.ejs'),
    inject: 'body',
    chunks: ['iframe'],
    templateParameters: {
      title: title ? title : pkg.name + "@" + pkg.version,
      development: false,
      header: header,
      footer: footer
    }
  }), new GenerateSW({
    maximumFileSizeToCacheInBytes: 20 * 1024 * 1024
  }));
  return (0, _extends2["default"])({}, config, {
    mode: 'production'
  });
};