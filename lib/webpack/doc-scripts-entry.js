"use strict";

module.exports = function (options) {
  return {
    code: "\nvar React = require('react')\nvar ReactDOM = require('react-dom')\nvar ReactDocRenderer = require('react-doc-renderer')\nvar docs = [\n  " + options.docs.map(function (path) {
      return "{\n          path:\"" + path + "\",\n          component:require(\"" + path + "\"),\n          meta:component.meta\n        }\n      }";
    }).join(',') + "\n];\n\nReactDOM.render(\n   React.createElement(ReactDocRenderer,{docs:docs}),\n   document.getElementById('root')\n);\n"
  };
};