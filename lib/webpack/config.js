"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require('fs-extra');

var path = require('path');

var merge = require('webpack-merge');

var cwd = process.cwd();

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(mode, options) {
    var config, userConfigPath, headerPath, footerPath, userConfigContents;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = require("./" + mode);
            userConfigPath = path.resolve(cwd, './doc-scripts.config.js');
            headerPath = path.resolve(cwd, './doc-scripts.header.html');
            footerPath = path.resolve(cwd, './doc-scripts.footer.html');
            _context.prev = 4;
            _context.next = 7;
            return fs.access(userConfigPath);

          case 7:
            userConfigContents = require(userConfigPath);
            _context.prev = 8;
            _context.next = 11;
            return fs.access(headerPath);

          case 11:
            _context.next = 13;
            return fs.readFile(headerPath, 'utf-8');

          case 13:
            options.header = _context.sent;
            _context.next = 18;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](8);

          case 18:
            _context.prev = 18;
            _context.next = 21;
            return fs.access(footerPath);

          case 21:
            _context.next = 23;
            return fs.readFile(footerPath, 'utf-8');

          case 23:
            options.footer = _context.sent;
            _context.next = 28;
            break;

          case 26:
            _context.prev = 26;
            _context.t1 = _context["catch"](18);

          case 28:
            if (!(typeof userConfigContents === 'function')) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", userConfigContents(config(options)));

          case 32:
            return _context.abrupt("return", merge.smart(config(options), userConfigContents));

          case 33:
            _context.next = 38;
            break;

          case 35:
            _context.prev = 35;
            _context.t2 = _context["catch"](4);
            return _context.abrupt("return", config(options));

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 35], [8, 16], [18, 26]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();