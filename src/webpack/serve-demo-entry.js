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
import React from 'react'
import ReactDOM from 'react-dom'
const readMeDocs = [${readmes
      .map(path => {
        return `require("${path}")`
      })
      .join(',')}]
const docs = [${docs
      .map(path => {
        return `require("${path}")`
      })
      .join(',')}]

const renderComponents = components=>components.reduce((buf,fn,key)=>{
  if(typeof fn === 'function'){
    return buf.concat(React.createElement(fn,{key}))
  } else {
    return buf
  }
},[])

const DocRender = ()=>{
  return (
    <div className="doc-wrapper">
       {renderComponents(docs)}
       {renderComponents(readMeDocs)}
    </div>
  )
}

ReactDOM.render(<DocRender/>,document.getElementById('root'))

`
  }
}
