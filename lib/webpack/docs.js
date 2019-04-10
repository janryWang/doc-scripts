"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _resolvePathname = _interopRequireDefault(require("resolve-pathname"));

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

var pageURL = new URL(window.location);

var lowercase = function lowercase(str) {
  return str.toLocaleLowerCase();
};

var _default = function _default(docs, isSummary, deps) {
  if (deps === void 0) {
    deps = {};
  }

  var componentPath = pageURL.searchParams.get('path');

  if (componentPath) {
    var lowerComponentPath = lowercase((0, _resolvePathname["default"])(componentPath, window.__dirname));
    var finded = Object.keys(deps || {}).find(function (key) {
      return lowercase(key).indexOf(lowerComponentPath) > -1 || lowerComponentPath.indexOf(lowercase(key)) > -1;
    });
    return [{
      path: componentPath,
      component: finded ? deps[finded] : _react["default"].createElement('div', {}, 'No component found'),
      meta: {
        index: 0
      }
    }];
  }

  if (isSummary) {
    return traverseSummary(docs, function (node) {
      node.meta = node.meta || {};

      if (node.link) {
        if (deps[node.link] && node.depth <= 1) {
          node.component = deps[node.link];

          if (deps[node.link].meta) {
            node.meta = deps[node.link].meta;
          }

          delete node.link;
        } else if (node.type === 'html' || node.depth > 1 || node.depth <= 1 && node.children && node.children.length > 0) {
          var remoteUrl = node.link;

          node.component = function () {
            return _react["default"].createElement('iframe', {
              className: 'doc-scripts-iframe',
              src: !node.isRemoteUrl ? "./iframe.html?path=" + node.path : remoteUrl
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

exports["default"] = _default;