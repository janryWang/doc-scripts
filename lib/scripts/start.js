"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var getConfig = require('../webpack/config');

var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');

var openBrowser = require('react-dev-utils/openBrowser');

var getPort = require('get-port');

var log = require('../log');

module.exports = _async(function (options, webpackConfig) {
  var HOST = process.env.HOST || 'localhost';
  return _await(getPort({
    host: HOST,
    port: 3000
  }), function (DEFAULT_PORT) {
    return _await(getConfig('development', (0, _extends2["default"])({}, options, {
      port: DEFAULT_PORT
    }), webpackConfig), function (_getConfig) {
      var complier = webpack(_getConfig);
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
    });
  });
});