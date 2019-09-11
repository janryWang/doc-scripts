const path = require('path')
const fs = require('fs-extra')
const { parseToc } = require('./markdown')
const cwd = process.cwd()
const toArr = val => (Array.isArray(val) ? val : val ? [val] : [])
let pkg = {}

try {
  pkg = require(path.resolve(cwd, './package.json'))
} catch (e) {}
const getDocs = async dir => {
  let list = []
  let newList = []
  try {
    list = await fs.readdir(dir)
    for (let i = 0; i < list.length; i++) {
      let _path = path.resolve(dir, list[i])
      let stat = await fs.stat(_path)
      if (_path.indexOf('node_modules') > -1) {
      } else if (stat.isDirectory()) {
        newList = newList.concat(await getDocs(_path))
      } else if (/\.md$/gi.test(_path) && !/summary\.md/gi.test(_path)) {
        newList.push(_path)
      } else {
      }
    }
  } catch (e) {
    console.error(e)
  }
  return newList
}

const parseSummary = async filePath => {
  const file = await fs.readFile(filePath, 'utf8')
  return await parseToc(file, node => {
    if (node.link && !node.isRemoteUrl) {
      node.link = path.resolve(path.dirname(filePath), node.link)
      node.path = node.link
    }
    return node
  })
}

const importTemplate = (path, lazy = true) => {
  const importPath = `import('${path}')`
  return lazy ? `React.lazy(function(){return ${importPath}})`
    : importPath
}

const createDeps = (docs, lazy) => {
  const paths = {}
  const _createDeps = docs => {
    let deps = []
    if (Array.isArray(docs)) {
      docs.forEach(path => {
        if (typeof path === 'string' && !paths[path] && !path.isRemoteUrl) {
          deps.push(
            `"${path}":${importTemplate(path)}`
          )
          paths[path] = true
        } else {
          if (
            path.link &&
            !paths[path.link] &&
            path.depth <= 1 &&
            !path.isRemoteUrl &&
            (!path.children || (path.children && !path.children.length))
          ) {
            deps.push(
              `"${path.link}":${importTemplate(path.link)}`
            )
            paths[path.link] = true
          }
          if (path && path.children) {
            deps = deps.concat(_createDeps(path.children))
          }
        }
      })
    } else {
      if (
        docs.link &&
        !paths[docs.link] &&
        docs.depth <= 1 &&
        !docs.isRemoteUrl &&
        (!docs.children || (docs.children && !docs.children.length))
      ) {
        deps.push(
          `"${docs.link}":${importTemplate(docs.link)}`
        )
        paths[docs.link] = true
      }
      if (Array.isArray(docs.children)) {
        deps = deps.concat(_createDeps(docs.children))
      }
    }
    return deps
  }
  return _createDeps(docs).join(',')
}

module.exports = async function(options) {
  const lazy = options.lazy
  const inputPath = options.input ? options.input : cwd
  const rendererPath = options.renderer
    ? options.renderer
    : path.resolve(cwd, './doc-scripts.renderer.js')
  const summaryPath = options.summaryPath
    ? options.summaryPath
    : path.resolve(inputPath, './SUMMARY.md')
  let hasRenderer = false
  let hasSummary = false
  let docs = []
  try {
    await fs.access(rendererPath)
    hasRenderer = true
  } catch (e) {}
  try {
    await fs.access(summaryPath)
    hasSummary = true
  } catch (e) {}
  if (!hasSummary) {
    docs = await getDocs(inputPath)
  } else {
    docs = await parseSummary(summaryPath)
  }
  const code = `
  import React from 'react'
  import ReactDOM from 'react-dom'
  import ReactDocRenderer from '${
    hasRenderer
      ? rendererPath
      : hasSummary
      ? 'react-site-renderer'
      : 'react-doc-renderer'
  }'
  import createDocs from '${path.resolve(__dirname, './docs')}'
  import '${path.resolve(__dirname, './markdown.css')}'
  ${toArr(options.requires)
    .map(path => {
      return `import '${path}'`
    })
    .join('\n')}
  const dependencies = {${createDeps(docs, lazy)}}
  ReactDOM.render(
    React.createElement(React.Suspense,{
      fallback:React.createElement('div')
    },
     React.createElement(
       ReactDocRenderer,
       {
        logo:React.createElement('span',{},'${pkg.name || 'This is Logo'}'),
        docs:createDocs(${JSON.stringify(docs)},${JSON.stringify(
    hasSummary
  )},dependencies)
       })),
     document.getElementById('root')
  );
  `

  return {
    code
  }
}
