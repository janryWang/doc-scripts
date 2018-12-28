const getConfig = require('../webpack/config')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const openBrowser = require('react-dev-utils/openBrowser')
const getPort = require('get-port')
const log = require('../log')

module.exports = async () => {


  const DEFAULT_PORT = await getPort({port: 3000})

  const HOST = process.env.HOST || 'localhost'

  const complier = webpack(
    await getConfig('development', { port: DEFAULT_PORT })
  )
  new WebpackDevServer(complier, {
    publicPath: '/',
    quiet: true,
    hot: true
  }).listen(DEFAULT_PORT, HOST, err => {
    if (err) {
      return log.error(err)
    }
    openBrowser(`http://${HOST}:${DEFAULT_PORT}`)
  })
}
