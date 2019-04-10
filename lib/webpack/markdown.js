"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.parseToc = void 0;

var _remark = _interopRequireDefault(require("remark"));

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _unistUtilFind = _interopRequireDefault(require("unist-util-find"));

var _lodash = _interopRequireDefault(require("lodash.get"));

var _path = _interopRequireDefault(require("path"));

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

var getter = function getter(name) {
  return function (v) {
    return (0, _lodash["default"])(v, name);
  };
};

var getValue = getter('value');
var getUrl = getter('url');

var getByType = function getByType(node, type) {
  return (0, _unistUtilFind["default"])(node, function (n) {
    return n.type === type;
  });
};

var parseText = function parseText(text) {
  var matched = String(text).match(/\s*([^|]+)\s*\|?\s*([^|]+)?\s*/);
  return {
    title: matched && matched[1],
    type: matched && matched[2] || 'empty'
  };
};

var cleanTree = function cleanTree(tree, traverse, hasLink, depth) {
  if (depth === void 0) {
    depth = 0;
  }

  if (!tree) return [];

  var mapper = function mapper(node) {
    var text = getByType(node, 'text') || getByType(node, 'html');
    var link = getByType(node, 'link');
    var list = getByType(node, 'list');
    var child = {};
    child.depth = depth;

    if (text) {
      child.text = getValue(text);

      var _parseText = parseText(child.text),
          title = _parseText.title,
          type = _parseText.type;

      child.title = title;
      child.type = type;
    }

    if (link) {
      child.link = getUrl(link);
      child.isRemoteUrl = /(https?:)?\/\//.test(child.link);

      if (hasLink) {
        hasLink(child.link);
      }
    }

    if (list && list.children && list.children.length) {
      child.children = cleanTree(list.children, traverse, function (link) {
        if (link && child.link === link) {
          delete child.link;
        }
      }, depth + 1);
    }

    if (typeof traverse === 'function') {
      traverse(child);
    }

    return child;
  };

  if (Array.isArray(tree)) {
    return tree.map(mapper);
  } else {
    var list = (0, _unistUtilFind["default"])(tree, function (node) {
      return node.type === 'list';
    });
    if (!list) return [];
    if (!list.children) return [];
    return cleanTree(list.children, traverse, false, depth + 1);
  }
};

var parseToc = _async(function (text, traverse) {
  return _await((0, _remark["default"])().use(function () {
    this.Compiler = function (root) {
      return cleanTree(root, traverse);
    };
  }).process(text), function (_ref) {
    var contents = _ref.contents;
    return contents;
  });
});

exports.parseToc = parseToc;