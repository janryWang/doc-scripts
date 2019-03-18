import React from 'react'
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

export default (docs, isSummary, deps = {}) => {
  if (isSummary) {
    return traverseSummary(docs, node => {
      node.meta = node.meta || {}
      if (node.link) {
        if (deps[node.link]) {
          node.component = deps[node.link]
          if (deps[node.link].meta) {
            node.meta = deps[node.link].meta
          }
          delete node.link
        } else if (node.type === 'html') {
          node.component = () => {
            return React.createElement('iframe', { src: node.link })
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
