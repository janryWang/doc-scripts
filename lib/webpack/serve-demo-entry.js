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
    code: "\nimport React from 'react'\nimport ReactDOM from 'react-dom'\nconst readMeDocs = [" + readmes.map(function (path) {
      return "require(\"" + path + "\")";
    }).join(',') + "]\nconst docs = [" + docs.map(function (path) {
      return "require(\"" + path + "\")";
    }).join(',') + "]\n\nconst renderComponents = components=>components.reduce((buf,fn,key)=>{\n  if(typeof fn === 'function'){\n    return buf.concat(React.createElement(fn,{key}))\n  } else {\n    return buf\n  }\n},[])\n\nconst DocRender = ()=>{\n  return (\n    <div className=\"doc-wrapper markdown-body\">\n       {renderComponents(docs)}\n       {renderComponents(readMeDocs)}\n    </div>\n  )\n}\n\nReactDOM.render(<DocRender/>,document.getElementById('root'))\n\n"
  };
};