"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var baseConfig = require('./base');

var webpack = require('webpack');

var path = require('path');

var pkg = require(path.resolve(process.cwd(), './package.json'));

var HtmlWebpackPlugin = require('html-webpack-plugin');

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
      development: true,
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
      development: true,
      header: header,
      footer: footer
    }
  }));
  return (0, _extends2["default"])({}, config, {
    mode: 'production'
  });
};