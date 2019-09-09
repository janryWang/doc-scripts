"use strict";

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var fs = require('fs-extra');

function _empty() {}

var path = require('path');

function _invokeIgnored(body) {
  var result = body();

  if (result && result.then) {
    return result.then(_empty);
  }
}

var merge = require('webpack-merge');

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var log = require('../log');

function _continue(value, then) {
  return value && value.then ? value.then(then) : then(value);
}

var cwd = process.cwd();

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

module.exports = _async(function (mode, options, webpackConfig) {
  var _exit = false;

  if (options === void 0) {
    options = {};
  }

  var config = require("./" + mode);

  var userConfigPath = path.resolve(cwd, './doc-scripts.config.js');
  var headerPath = path.resolve(cwd, './doc-scripts.header.html');
  var footerPath = path.resolve(cwd, './doc-scripts.footer.html');
  return _continue(_catch(function () {
    var userConfigContents = webpackConfig;
    return _continue(_catch(function () {
      return _invokeIgnored(function () {
        if (!userConfigContents) {
          return _await(fs.access(userConfigPath), function () {
            userConfigContents = require(userConfigPath);
          });
        }
      });
    }, _empty), function () {
      return _continue(_catch(function () {
        return _invokeIgnored(function () {
          if (!options.header) {
            return _await(fs.access(headerPath), function () {
              return _await(fs.readFile(headerPath, 'utf-8'), function (_fs$readFile) {
                options.header = _fs$readFile;
              });
            });
          }
        });
      }, _empty), function () {
        return _continue(_catch(function () {
          return _invokeIgnored(function () {
            if (!options.footer) {
              return _await(fs.access(footerPath), function () {
                return _await(fs.readFile(footerPath, 'utf-8'), function (_fs$readFile2) {
                  options.footer = _fs$readFile2;
                });
              });
            }
          });
        }, _empty), function () {
          if (typeof userConfigContents === 'function') {
            _exit = true;
            return userConfigContents(config(options), mode);
          } else if (userConfigContents) {
            _exit = true;
            return merge.smart(config(options), userConfigContents);
          }

          _exit = true;
          return config(options);
        });
      });
    });
  }, function (e) {
    log.error(e.stack);
  }), function (_result) {
    return _exit ? _result : config(options);
  });
});