"use strict";

var chalk = require('chalk');

var moment = require('moment');

var pkg = require('../package.json');

var log = console.log;

var getCurDate = function getCurDate() {
  return moment().format('YYYY-MM-DD hh:mm:ss');
};

var getMessage = function getMessage(type, msg, color, tab) {
  if (color === void 0) {
    color = 'yellow';
  }

  return log((tab ? '\n\n' : '') + chalk[color]("\u3010" + pkg.name.toUpperCase() + " " + getCurDate() + "\u3011" + type.toUpperCase() + ": " + msg));
};

exports.success = function (msg, tab) {
  return getMessage('success', msg, 'green', tab);
};

exports.error = function (msg, tab) {
  return getMessage('error', msg, 'red', tab);
};

exports.info = function (msg, tab) {
  return getMessage('info', msg, 'yellow', tab);
};

exports.flat = function (msg, color, tab) {
  if (color === void 0) {
    color = 'yellow';
  }

  return log((tab ? '\n\n' : '') + chalk[color](msg));
};