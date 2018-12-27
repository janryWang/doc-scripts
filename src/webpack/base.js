const fs = require('fs-extra')
const path = require('path')
const log = require('../log')
const webpack = require('webpack')
const VirtualModulePlugin = require('virtual-module-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier')
const babelConfig = require('./babel')
const cwd = process.cwd()
const warnImage = path.resolve(__dirname, '../assets/warn.png')
const errorImage = path.resolve(__dirname, '../assets/error.png')
const entryPath = path.resolve(__dirname, './serve-demo-entry.js')
//const NpmInstallPlugin = require('npm-install-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const getDemos = dir => {
  let list = []
  try {
    list = fs.readdirSync(dir)
    list = list.reduce((buf, _path) => {
      _path = path.resolve(dir, _path)
      let stat = fs.statSync(_path)
      if (_path.indexOf('node_modules') > -1) {
        return buf
      } else if (stat.isDirectory()) {
        return buf.concat(getDemos(_path))
      } else if (/\.md$/.test(_path)) {
        return buf.concat(_path)
      } else {
        return buf
      }
    }, [])
  } catch (e) {
    log.error(e)
  }
  return list
}

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [entryPath],
  output: {
    path: path.resolve(cwd, './docs'),
    filename: 'bundle.[name].js'
  },
  stats: 'normal',
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../../node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-highlight$': 'react-highlight/lib/optimized'
    }
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-is':'ReactIs'
  },
  plugins: [
    // new NpmInstallPlugin({
    //   peerDependencies: true,
    //   npm:'tnpm'
    // }),
    new ProgressBarPlugin({
      clear: false
    }),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          notifier.notify({
            title: 'Serve Demo',
            message: 'warn',
            contentImage: warnImage,
            sound: 'Glass'
          })
          return
        } else {
          const error = errors[0]
          notifier.notify({
            title: 'Serve Demo',
            message: `${severity} : ${error.name}`,
            subtitle: error.file || '',
            contentImage: errorImage,
            sound: 'Glass'
          })
        }
      }
    }),
    new webpack.ContextReplacementPlugin(
      /highlight.js\/lib\/languages$/,
      new RegExp(`^./(javascript|jsx|bash)$`)
    )
  ],
  module: {
    noParse: [/moment.js/],
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelConfig
      },
      {
        test: entryPath,
        loader: 'val-loader',
        options: {
          demos: getDemos(cwd)
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader?singleton!css-loader!postcss-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader?singleton!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/font-woff'
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/vnd.ms-fontobject'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'image/svg+xml'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.html?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        enforce: 'pre',
        test: /\.md$/,
        exclude: /node_modules/,
        use: 'react-demo-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          'css-loader',
          'postcss-loader',
          'fast-sass-loader'
        ]
      }
    ]
  }
}
