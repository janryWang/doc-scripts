"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var getConfig = require('../webpack/config');

var webpack = require('webpack');

var log = require('../log');

module.exports =
/*#__PURE__*/
(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = webpack;
          _context.next = 3;
          return getConfig('production');

        case 3:
          _context.t1 = _context.sent;

          _context.t2 = function (err, stats) {
            if (err) {
              log.error(err.stack || err);

              if (err.details) {
                log.error(err.details);
              }

              return;
            }

            process.stdout.write(stats.toString() + '\n');
          };

          (0, _context.t0)(_context.t1, _context.t2);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));