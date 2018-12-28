module.exports = function(options) {
  const { readmes, docs } = options.demos.reduce(
    ({ readmes, docs }, path) => {
      const isReadMe = /readme/i.test(path)
      return {
        readmes: isReadMe ? readmes.concat(path) : readmes,
        docs: isReadMe ? docs : docs.concat(path)
      }
    },
    {
      readmes: [],
      docs: []
    }
  )
  return {
    code: `
var React = require('react')
var ReactDOM = require('react-dom')
var readMeDocs = [${readmes
      .map(path => {
        return `require("${path}")`
      })
      .join(',')}]
var docs = [${docs
      .map(path => {
        return `require("${path}")`
      })
      .join(',')}]

var renderComponents = function(components){
  return components.reduce(function(buf,fn,key){
    if(typeof fn === 'function'){
      return buf.concat(React.createElement(fn,{key}))
    } else {
      return buf
    }
  },[])
}

var DocRender = function(){
  return React.createElement('div',{
        className:"doc-wrapper markdown-body"
      },
      renderComponents(docs),
      renderComponents(readMeDocs)
    )
  
}

ReactDOM.render(React.createElement(DocRender),document.getElementById('root'))

`
  }
}
