import remark from 'remark'
import visit from 'unist-util-visit'
import find from 'unist-util-find'
import get from 'lodash.get'
import path from 'path'

const getter = name => v => get(v, name)

const getValue = getter('value')
const getUrl = getter('url')
const getByType = (node, type) => find(node, n => n.type === type)

const parseText = (text)=>{
  const matched = String(text).match(/\s*([^|]+)\s*\|?\s*([^|]+)?\s*/)
  return {
    title:matched && matched[1],
    type:matched && matched[2] || 'empty'
  }
}

const cleanTree = (tree, traverse,hasLink) => {
  if (!tree) return []

  const mapper = node => {
    const text = getByType(node, 'text')
    const link = getByType(node, 'link')
    const list = getByType(node, 'list')
    const child = {}
    if (text) {
      child.text = getValue(text)
      const { title, type } = parseText(child.text)
      child.title = title
      child.type = type
    }
    if (link) {
      child.link = getUrl(link)
      if(hasLink){
        hasLink(child.link)
      }
    }
    if (list && list.children && list.children.length) {
      child.children = cleanTree(list.children, traverse,(link)=>{
        if(link && child.link === link){
          delete child.link
        }
      })
    }
    if (typeof traverse === 'function') {
      traverse(child)
    }
    return child
  }

  if (Array.isArray(tree)) {
    return tree.map(mapper)
  } else {
    const list = find(tree, node => node.type === 'list')
    if (!list) return []
    if (!list.children) return []
    return cleanTree(list.children, traverse)
  }
}

export const parseToc = async (text, traverse) => {
  const { contents } = await remark()
    .use(function() {
      this.Compiler = root => {
        return cleanTree(root, traverse)
      }
    })
    .process(text)

  return contents
}
