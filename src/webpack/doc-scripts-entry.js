const path = require('path')
const fs = require('fs-extra')
const cwd = process.cwd()
const toArr = val => (Array.isArray(val) ? val : val ? [val] : [])

const getDocs = dir => {
  let list = []
  try {
    list = fs.readdirSync(dir)
    list = list.reduce((buf, _path) => {
      _path = path.resolve(dir, _path)
      let stat = fs.statSync(_path)
      if (_path.indexOf('node_modules') > -1) {
        return buf
      } else if (stat.isDirectory()) {
        return buf.concat(getDocs(_path))
      } else if (/\.md$/.test(_path)) {
        return buf.concat(_path)
      } else {
        return buf
      }
    }, [])
  } catch (e) {
    log.error(e)
  }
  return list
}

module.exports = function(options) {
  const rendererPath = options.renderer
    ? options.renderer
    : path.resolve(cwd, './doc-scripts.renderer.js')
  let hasRenderer = false
  try {
    fs.accessSync(rendererPath)
    hasRenderer = true
  } catch (e) {}
  const docs = getDocs(options.input ? options.input : cwd)
  const code = `
  var React = require('react')
  var ReactDOM = require('react-dom')
  var ReactDocRenderer = require('${
    hasRenderer ? rendererPath : 'react-doc-renderer'
  }')
  ${toArr(options.requires).map(path => {
    return `require("${path}")`
  })}
  ReactDocRenderer = ReactDocRenderer.__esModule ? ReactDocRenderer.default : ReactDocRenderer

  var docs = [
    ${docs
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
