"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _commander = _interopRequireDefault(require("commander"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _log = _interopRequireDefault(require("./log"));

_commander.default.arguments("<cmd>").action(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(cmd) {
    var script;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            script = "./scripts/" + cmd + ".js";
            _context.next = 4;
            return _fsExtra.default.access(_path.default.resolve(__dirname, script));

          case 4:
            require(script)();

            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            _log.default.error("Executed a command that does not exist.");

            _log.default.error(_context.t0.stack);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

_commander.default.parse(process.argv);