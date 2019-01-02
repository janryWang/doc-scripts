"use strict";

var path = require('path');

var fs = require('fs-extra');

var cwd = process.cwd();

module.exports = function (options) {
  var rendererPath = options.renderer ? options.renderer : path.resolve(cwd, './doc-scripts.renderer.js');
  var hasRenderer = false;

  try {
    fs.accessSync(rendererPath);
    hasRenderer = true;
  } catch (e) {}

  var code = "\n  var React = require('react')\n  var ReactDOM = require('react-dom')\n  var ReactDocRenderer = require('" + (hasRenderer ? rendererPath : 'react-doc-renderer') + "')\n\n  ReactDocRenderer = ReactDocRenderer.__esModule ? ReactDocRenderer.default : ReactDocRenderer\n\n  var docs = [\n    " + options.docs.map(function (path) {
    return "(function(){\n          var component = require(\"" + path + "\");\n          return {\n            path:\"" + path + "\",\n            component:component,\n            meta:component.meta\n          }\n        })()";
  }).join(',') + "\n  ];\n  \n  ReactDOM.render(\n     React.createElement(ReactDocRenderer,{docs:docs}),\n     document.getElementById('root')\n  );\n  ";
  return {
    code: code
  };
};