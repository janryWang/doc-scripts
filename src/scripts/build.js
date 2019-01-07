const getConfig = require('../webpack/config')
const webpack = require('webpack')
const log = require('../log')

module.exports = (options, webpackConfig) => {
  return new Promise(async (resolve, reject) => {
    webpack(
      await getConfig('production', options, webpackConfig),
      (err, stats) => {
        if (err) {
          log.error(err.stack || err)
          if (err.details) {
            log.error(err.details)
          }
          return
        }

        process.stdout.write(stats.toString() + '\n')
        if (stats.hasErrors()) {
          const info = stats.toJson()
          reject(info.errors)
        } else {
          log.success("The document has been built successfully 🎉🎉")
          resolve()
        }
      }
    )
  })
}
