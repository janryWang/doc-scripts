"use strict";

var path = require('path');

var fs = require('fs-extra');

var cwd = process.cwd();

var toArr = function toArr(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
};

var getDocs = function getDocs(dir) {
  var list = [];

  try {
    list = fs.readdirSync(dir);
    list = list.reduce(function (buf, _path) {
      _path = path.resolve(dir, _path);
      var stat = fs.statSync(_path);

      if (_path.indexOf('node_modules') > -1) {
        return buf;
      } else if (stat.isDirectory()) {
        return buf.concat(getDocs(_path));
      } else if (/\.md$/.test(_path)) {
        return buf.concat(_path);
      } else {
        return buf;
      }
    }, []);
  } catch (e) {
    log.error(e);
  }

  return list;
};

module.exports = function (options) {
  var rendererPath = options.renderer ? options.renderer : path.resolve(cwd, './doc-scripts.renderer.js');
  var hasRenderer = false;

  try {
    fs.accessSync(rendererPath);
    hasRenderer = true;
  } catch (e) {}

  var docs = getDocs(options.input ? options.input : cwd);
  var code = "\n  var React = require('react')\n  var ReactDOM = require('react-dom')\n  var ReactDocRenderer = require('" + (hasRenderer ? rendererPath : 'react-doc-renderer') + "')\n  " + toArr(options.requires).map(function (path) {
    return "require(\"" + path + "\")";
  }) + "\n  ReactDocRenderer = ReactDocRenderer.__esModule ? ReactDocRenderer.default : ReactDocRenderer\n\n  var docs = [\n    " + docs.map(function (path) {
    return "(function(){\n          var component = require(\"" + path + "\");\n          return {\n            path:\"" + path + "\",\n            component:component,\n            meta:component.meta\n          }\n        })()";
  }).join(',') + "\n  ];\n  ReactDOM.render(\n     React.createElement(ReactDocRenderer,{docs:docs}),\n     document.getElementById('root')\n  );\n  ";
  return {
    code: code
  };
};