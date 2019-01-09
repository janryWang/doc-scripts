const getConfig = require('../webpack/config')
const webpack = require('webpack')
const log = require('../log')

module.exports = async (options, webpackConfig) => {
  const config = await getConfig('production', options, webpackConfig)

  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        log.error(err.stack || err)
        if (err.details) {
          log.error(err.details)
        }
        return
      }

      if (stats.hasErrors()) {
        const info = stats.toJson()
        reject(info.errors)
      } else {
        log.success('The document has been built successfully 🎉🎉')
        resolve()
      }
    })
  })
}
