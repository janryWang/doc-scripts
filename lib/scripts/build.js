"use strict";

var prodConfig = require('../webpack/production');

var webpack = require('webpack');

var log = require('../log');

module.exports = function () {
  webpack(prodConfig, function (err, stats) {
    if (err) {
      log.error(err.stack || err);

      if (err.details) {
        log.error(err.details);
      }

      return;
    }

    process.stdout.write(stats.toString() + '\n');
  });
};