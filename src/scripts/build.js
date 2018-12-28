const getConfig = require('../webpack/config')
const webpack = require('webpack')
const log = require('../log')

module.exports = async () => {
  webpack(await getConfig('production'), (err, stats) => {
    if (err) {
      log.error(err.stack || err)
      if (err.details) {
        log.error(err.details)
      }
      return
    }

    process.stdout.write(stats.toString() + '\n')
  })
}
