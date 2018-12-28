"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var getConfig = require('../webpack/config');

var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');

var openBrowser = require('react-dev-utils/openBrowser');

var getPort = require('get-port');

var log = require('../log');

module.exports =
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  var DEFAULT_PORT, HOST, complier;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getPort({
            port: 3000
          });

        case 2:
          DEFAULT_PORT = _context.sent;
          HOST = process.env.HOST || 'localhost';
          _context.t0 = webpack;
          _context.next = 7;
          return getConfig('development', {
            port: DEFAULT_PORT
          });

        case 7:
          _context.t1 = _context.sent;
          complier = (0, _context.t0)(_context.t1);
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

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));