"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.command = exports.execute = void 0;

var _commander = _interopRequireDefault(require("commander"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _log = _interopRequireDefault(require("./log"));

function _continueIgnored(value) {
  if (value && value.then) {
    return value.then(_empty);
  }
}

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

function _continue(value, then) {
  return value && value.then ? value.then(then) : then(value);
}

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

function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty) : Promise.resolve();
  }
}

function _empty() {}

var execute = _async(function (cmd, options, webpackConfig) {
  var _exit = false;
  var script = "./scripts/" + cmd + ".js";
  return _continue(_catch(function () {
    return _awaitIgnored(_fsExtra.default.access(_path.default.resolve(__dirname, script)));
  }, function () {
    throw _chalk.default.red("\"doc-scripts " + cmd + "\" is invalid command.");
  }), function (_result) {
    return _exit ? _result : _catch(function () {
      return _awaitIgnored(require(script)(options, webpackConfig));
    }, function (e) {
      throw e && (e.stack || e.message) ? e.stack ? e.stack : e.message : e;
    });
  });
});

exports.execute = execute;

var command = function command(options, webpackConfig) {
  if (options === void 0) {
    options = {};
  }

  _commander.default.option("-i, --input <dir>", "Entry Directory").option("-o, --output <dir>", "Output Directory").arguments("<script>").action(_async(function (script, cmd) {
    return _continueIgnored(_catch(function () {
      if (cmd.input) options.input = _path.default.resolve(process.cwd(), cmd.input);
      if (cmd.output) options.output = _path.default.resolve(process.cwd(), cmd.output);
      return _awaitIgnored(execute(script, options, webpackConfig));
    }, function (e) {
      console.log(e);
    }));
  }));

  _commander.default.parse(process.argv);
};

exports.command = command;