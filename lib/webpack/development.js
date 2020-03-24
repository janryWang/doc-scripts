"use strict";

var baseConfig = require('./base');

var webpack = require('webpack');

var path = require('path');

var pkg = require(path.resolve(process.cwd(), './package.json'));

var notifier = require('node-notifier');

var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var _require = require('workbox-webpack-plugin'),
    GenerateSW = _require.GenerateSW;

var log = require('../log');

var warnImage = path.resolve(__dirname, '../assets/warn.png');
var errorImage = path.resolve(__dirname, '../assets/error.png');

module.exports = function (options) {
  var _ref = options || {},
      port = _ref.port,
      header = _ref.header,
      footer = _ref.footer,
      title = _ref.title;

  var config = baseConfig(options);
  config.plugins.push(new FriendlyErrorsWebpackPlugin({
    onErrors: function onErrors(severity, errors) {
      if (severity === 'error') {
        var error = errors[0];
        notifier.notify({
          title: 'React Doc Scripts',
          message: severity + " : " + error.name,
          subtitle: error.file || '',
          contentImage: errorImage,
          sound: 'Glass'
        });
      }
    }
  }));
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
  config.entry.index.push(require.resolve('webpack/hot/dev-server'), require.resolve('webpack-dev-server/client') + "?http://localhost:" + port);
  config.entry.iframe.push(require.resolve('webpack/hot/dev-server'), require.resolve('webpack-dev-server/client') + "?http://localhost:" + port);
  config.plugins.push(new webpack.HotModuleReplacementPlugin(), new GenerateSW());
  return config;
};