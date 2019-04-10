import React from 'react'
import resolvePathName from 'resolve-pathname'
const traverseSummary = (summary, traverse) => {
  if (Array.isArray(summary)) {
    return summary.map(node => {
      return traverseSummary(node, traverse)
    })
  } else {
    if (typeof traverse === 'function') {
      traverse(summary)
    }
    if (summary.children) {
      summary.children = summary.children.map(node => {
        return traverseSummary(node, traverse)
      })
    }
    return summary
  }
}
const isMarkdown = text => /\.md/.test(text)

const pageURL = new URL(window.location)

const lowercase = str => str.toLocaleLowerCase()

export default (docs, isSummary, deps = {}) => {
  const componentPath = pageURL.searchParams.get('path')
  if (componentPath) {
    const lowerComponentPath = lowercase(
      resolvePathName(componentPath, window.__dirname)
    )
    const finded = Object.keys(deps || {}).find(
      key =>
        lowercase(key).indexOf(lowerComponentPath) > -1 ||
        lowerComponentPath.indexOf(lowercase(key)) > -1
    )
    return [
      {
        path: componentPath,
        component: finded
          ? deps[finded]
          : React.createElement('div', {}, 'No component found'),
        meta: {
          index: 0
        }
      }
    ]
  }
  if (isSummary) {
    return traverseSummary(docs, node => {
      node.meta = node.meta || {}
      if (node.link) {
        if (deps[node.link] && node.depth <= 1) {
          node.component = deps[node.link]
          if (deps[node.link].meta) {
            node.meta = deps[node.link].meta
          }
          delete node.link
        } else if (
          node.type === 'html' ||
          node.depth > 1 ||
          (node.depth <= 1 && node.children && node.children.length > 0)
        ) {
          const remoteUrl = node.link
          node.component = () => {
            return React.createElement('iframe', {
              className: 'doc-scripts-iframe',
              src: !node.isRemoteUrl
                ? `./iframe.html?path=${node.path}`
                : remoteUrl
            })
          }
          delete node.link
        } else {
          node.path = node.link
        }
      }
    })
  } else {
    return docs.map(path => {
      const component = deps[path]
      const meta = component.meta || {}
      return {
        path,
        component,
        meta
      }
    })
  }
}
