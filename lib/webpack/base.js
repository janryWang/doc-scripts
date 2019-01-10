"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var fs = require('fs-extra');

var path = require('path');

var log = require('../log');

var webpack = require('webpack');

var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

var ProgressBarPlugin = require('./bar');

var babelConfig = require('./babel');

var cwd = process.cwd();

var pkg = require(path.resolve(cwd, './package.json'));

var entryPath = path.resolve(__dirname, './doc-scripts-entry.js');

var getDocs = function getDocs(dir) {
  var list = [];

  try {
    list = fs.readdirSync(dir);
    list = list.reduce(function (buf, _path) {
      _path = path.resolve(dir, _path);
      var stat = fs.statSync(_path);

      if (_path.indexOf('node_modules') > -1) {
        return buf;
      } else if (stat.isDirectory()) {
        return buf.concat(getDocs(_path));
      } else if (/\.md$/.test(_path)) {
        return buf.concat(_path);
      } else {
        return buf;
      }
    }, []);
  } catch (e) {
    log.error(e);
  }

  return list;
};

var getPkgPath = function getPkgPath() {
  try {
    var defaultPath = path.resolve(cwd, './src/index.js');
    var stat = fs.statSync(defaultPath);
    return defaultPath;
  } catch (e) {
    return path.resolve(cwd, pkg.main || './index.js');
  }
};

module.exports = function (options) {
  var _alias;

  return {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: [entryPath],
    output: {
      path: path.resolve(cwd, './doc-site'),
      filename: 'bundle.[name].js'
    },
    stats: 'errors-only',
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, '../../node_modules')],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: (_alias = {
        'react-highlight$': 'react-highlight/lib/optimized',
        'styled-components': require.resolve('styled-components')
      }, _alias[pkg.name] = getPkgPath(), _alias)
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-is': 'ReactIs'
    },
    plugins: [new ProgressBarPlugin({
      clear: true
    }), new CaseSensitivePathsPlugin(), new webpack.ContextReplacementPlugin(/lib[/\\]languages$/, /javascript|htmlbars|typescript|scss|css|bash/)],
    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: babelConfig
      }, {
        test: /\.tsx?$/,
        use: [require.resolve('ts-loader'), {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            propFilter: function propFilter(prop) {
              if (prop.parent == null) return true;
              return !prop.parent.fileName.includes('node_modules');
            }
          }
        }]
      }, {
        test: entryPath,
        loader: require.resolve('val-loader'),
        options: (0, _extends2.default)({}, options, {
          docs: getDocs(cwd)
        })
      }, {
        test: /\.css$/,
        use: [{
          loader: require.resolve('style-loader'),
          options: {
            singleton: true
          }
        }, require.resolve('css-loader')]
      }, {
        test: /\.less$/,
        use: [{
          loader: require.resolve('style-loader'),
          options: {
            singleton: true
          }
        }, require.resolve('css-loader'), require.resolve('less-loader')]
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'application/font-woff'
        }
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'application/font-woff'
        }
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'application/octet-stream'
        }
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'application/vnd.ms-fontobject'
        }
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          minetype: 'image/svg+xml'
        }
      }, {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000
        }
      }, {
        test: /\.html?$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]'
        }
      }, {
        enforce: 'pre',
        test: /\.md$/,
        use: require.resolve('react-demo-loader')
      }, {
        test: /\.scss$/,
        use: [{
          loader: require.resolve('style-loader'),
          options: {
            singleton: true
          }
        }, require.resolve('css-loader'), require.resolve('fast-sass-loader')]
      }]
    }
  };
};