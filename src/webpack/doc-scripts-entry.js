const path = require('path')
const fs = require('fs-extra')
const cwd = process.cwd()

module.exports = function(options) {
  const rendererPath = options.renderer
    ? options.renderer
    : path.resolve(cwd, './doc-scripts.renderer.js')
  let hasRenderer = false
  try {
    fs.accessSync(rendererPath)
    hasRenderer = true
  } catch (e) {}

  const code = `
  var React = require('react')
  var ReactDOM = require('react-dom')
  var ReactDocRenderer = require('${
    hasRenderer ? rendererPath : 'react-doc-renderer'
  }')

  ReactDocRenderer = ReactDocRenderer.__esModule ? ReactDocRenderer.default : ReactDocRenderer

  options.docs = options.docs.map((tPath)=>{
    return tPath.replace(/\\/g,"/");
  });

  var docs = [
    ${options.docs
      .map(path => {
        return `(function(){
          var component = require("${path}");
          return {
            path:"${path}",
            component:component,
            meta:component.meta
          }
        })()`
      })
      .join(',')}
  ];
  
  ReactDOM.render(
     React.createElement(ReactDocRenderer,{docs:docs}),
     document.getElementById('root')
  );
  `

  return {
    code
  }
}
