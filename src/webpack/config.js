const fs = require('fs-extra')
const path = require('path')
const merge = require('webpack-merge')
const cwd = process.cwd()

module.exports = async function(mode, options) {
  const config = require(`./${mode}`)
  const userConfigPath = path.resolve(cwd, './doc-scripts.config.js')
  const headerPath = path.resolve(cwd, './doc-scripts.header.html')
  const footerPath = path.resolve(cwd, './doc-scripts.footer.html')
  try {
    await fs.access(userConfigPath)
    const userConfigContents = require(userConfigPath)
    try {
      await fs.access(headerPath)
      options.header = await fs.readFile(headerPath, 'utf-8')
    } catch (e) {}
    try {
      await fs.access(footerPath)
      options.footer = await fs.readFile(footerPath, 'utf-8')
    } catch (e) {}
    if (typeof userConfigContents === 'function') {
      return userConfigContents(config(options))
    } else {
      return merge.smart(config(options), userConfigContents)
    }
  } catch (e) {
    return config(options)
  }
}
