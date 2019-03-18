"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var traverseSummary = function traverseSummary(summary, traverse) {
  if (Array.isArray(summary)) {
    return summary.map(function (node) {
      return traverseSummary(node, traverse);
    });
  } else {
    if (typeof traverse === 'function') {
      traverse(summary);
    }

    if (summary.children) {
      summary.children = summary.children.map(function (node) {
        return traverseSummary(node, traverse);
      });
    }

    return summary;
  }
};

var isMarkdown = function isMarkdown(text) {
  return /\.md/.test(text);
};

var _default = function _default(docs, isSummary, deps) {
  if (deps === void 0) {
    deps = {};
  }

  if (isSummary) {
    return traverseSummary(docs, function (node) {
      node.meta = node.meta || {};

      if (node.link) {
        if (deps[node.link]) {
          node.component = deps[node.link];

          if (deps[node.link].meta) {
            node.meta = deps[node.link].meta;
          }

          delete node.link;
        } else if (node.type === 'html') {
          node.component = function () {
            return _react.default.createElement('iframe', {
              src: node.link
            });
          };

          delete node.link;
        } else {
          node.path = node.link;
        }
      }
    });
  } else {
    return docs.map(function (path) {
      var component = deps[path];
      var meta = component.meta || {};
      return {
        path: path,
        component: component,
        meta: meta
      };
    });
  }
};

exports.default = _default;