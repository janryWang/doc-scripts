"use strict";

module.exports = function (options) {
  var _options$demos$reduce = options.demos.reduce(function (_ref, path) {
    var readmes = _ref.readmes,
        docs = _ref.docs;
    var isReadMe = /readme/i.test(path);
    return {
      readmes: isReadMe ? readmes.concat(path) : readmes,
      docs: isReadMe ? docs : docs.concat(path)
    };
  }, {
    readmes: [],
    docs: []
  }),
      readmes = _options$demos$reduce.readmes,
      docs = _options$demos$reduce.docs;

  return {
    code: "\nvar React = require('react')\nvar ReactDOM = require('react-dom')\nvar readMeDocs = [" + readmes.map(function (path) {
      return "require(\"" + path + "\")";
    }).join(',') + "]\nvar docs = [" + docs.map(function (path) {
      return "require(\"" + path + "\")";
    }).join(',') + "]\n\nvar renderComponents = function(components){\n  return components.reduce(function(buf,fn,key){\n    if(typeof fn === 'function'){\n      return buf.concat(React.createElement(fn,{key}))\n    } else {\n      return buf\n    }\n  },[])\n}\n\nvar DocRender = function(){\n  return React.createElement('div',{\n        className:\"doc-wrapper markdown-body\"\n      },\n      renderComponents(docs),\n      renderComponents(readMeDocs)\n    )\n  \n}\n\nReactDOM.render(React.createElement(DocRender),document.getElementById('root'))\n\n"
  };
};