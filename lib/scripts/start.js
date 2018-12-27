"use strict";

var serverConfig = require('../webpack/server');

var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');

var openBrowser = require('react-dev-utils/openBrowser');

var log = require('../log');

var DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
var HOST = process.env.HOST || 'localhost';

module.exports = function () {
  var complier = webpack(serverConfig(DEFAULT_PORT));
  new WebpackDevServer(complier, {
    publicPath: '/',
    quiet: true,
    hot: true
  }).listen(DEFAULT_PORT, HOST, function (err) {
    if (err) {
      return log.error(err);
    }

    openBrowser("http://" + HOST + ":" + DEFAULT_PORT);
  });
};