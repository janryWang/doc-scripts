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

module.exports = function (options, webpackConfig) {
  return new Promise(_async(function (resolve, reject) {
    return _await(getConfig('production', options, webpackConfig), function (_getConfig) {
      webpack(_getConfig, function (err, stats) {
        if (err) {
          log.error(err.stack || err);

          if (err.details) {
            log.error(err.details);
          }

          return;
        }

        process.stdout.write(stats.toString() + '\n');

        if (stats.hasErrors()) {
          var info = stats.toJson();
          reject(info.errors);
        } else {
          log.success("The document has been built successfully 🎉🎉");
          resolve();
        }
      });
    });
  }));
};