"use strict";

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

var log = require('../log');

module.exports = _async(function (options, webpackConfig) {
  return _await(getConfig('production', options, webpackConfig), function (config) {
    return new Promise(function (resolve, reject) {
      webpack(config, function (err, stats) {
        if (err) {
          log.error(err.stack || err);

          if (err.details) {
            log.error(err.details);
          }

          return;
        }

        if (stats.hasErrors()) {
          var info = stats.toJson();
          reject(info.errors);
        } else {
          log.success('The document has been built successfully 🎉🎉');
          resolve();
        }
      });
    });
  });
});