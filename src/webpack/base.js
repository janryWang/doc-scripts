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
const pkg = require(path.resolve(cwd, './package.json'))
const warnImage = path.resolve(__dirname, '../assets/warn.png')
const errorImage = path.resolve(__dirname, '../assets/error.png')
const entryPath = path.resolve(__dirname, './doc-scripts-entry.js')
//const NpmInstallPlugin = require('npm-install-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const getDocs = dir => {
  let list = []
  try {
    list = fs.readdirSync(dir)
    list = list.reduce((buf, _path) => {
      _path = path.resolve(dir, _path)
      let stat = fs.statSync(_path)
      if (_path.indexOf('node_modules') > -1) {
        return buf
      } else if (stat.isDirectory()) {
        return buf.concat(getDocs(_path))
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

const getPkgPath = () => {
  try {
    const defaultPath = path.resolve(cwd, './src/index.js')
    const stat = fs.statSync(defaultPath)
    return defaultPath
  } catch (e) {
    return path.resolve(cwd, pkg.main || './index.js')
  }
}

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [entryPath],
  output: {
    path: path.resolve(cwd, './doc-site'),
    filename: 'bundle.[name].js'
  },
  stats: 'normal',
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../../node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-highlight$': 'react-highlight/lib/optimized',
      'styled-components': require.resolve('styled-components'),
      [pkg.name]: getPkgPath()
    }
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-is': 'ReactIs'
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
            title: 'React Doc Scripts',
            message: 'warn',
            contentImage: warnImage,
            sound: 'Glass'
          })
          return
        } else {
          const error = errors[0]
          notifier.notify({
            title: 'React Doc Scripts',
            message: `${severity} : ${error.name}`,
            subtitle: error.file || '',
            contentImage: errorImage,
            sound: 'Glass'
          })
        }
      }
    }),
    new webpack.ContextReplacementPlugin(
      /lib[/\\]languages$/,
      /javascript|htmlbars|scss|css|bash/
    )
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: babelConfig
      },
      {
        test: /\.tsx?$/,
        use: [
          require.resolve('ts-loader'),
          {
            loader: require.resolve('react-docgen-typescript-loader'),
            options: {
              propFilter: (prop) => {
                if (prop.parent == null) return true
                return !prop.parent.fileName.includes('node_modules')
              }
            }
          }
        ]
      },
      {
        test: entryPath,
        loader: require.resolve('val-loader'),
        options: {
          docs: getDocs(cwd)
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: require.resolve('style-loader'),
            options: {
              singleton: true
            }
          },
          require.resolve('css-loader')
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: require.resolve('style-loader'),
            options: {
              singleton: true
            }
          },
          require.resolve('css-loader'),
          require.resolve('less-loader')
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'application/font-woff'
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'application/vnd.ms-fontobject'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'image/svg+xml'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000
        }
      },
      {
        test: /\.html?$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]'
        }
      },
      {
        enforce: 'pre',
        test: /\.md$/,
        use: require.resolve('react-demo-loader')
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: require.resolve('style-loader'),
            options: {
              singleton: true
            }
          },
          require.resolve('css-loader'),
          require.resolve('fast-sass-loader')
        ]
      }
    ]
  }
}
