const prodConfig = require('../webpack/production')
const webpack = require('webpack')
const log = require('../log')

module.exports = () => {
  webpack(prodConfig, (err,stats) => {
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
