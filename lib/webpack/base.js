"use strict";

var _alias;

var fs = require('fs-extra');

var path = require('path');

var log = require('../log');

var webpack = require('webpack');

var VirtualModulePlugin = require('virtual-module-webpack-plugin');

var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var notifier = require('node-notifier');

var babelConfig = require('./babel');

var cwd = process.cwd();

var pkg = require(path.resolve(cwd, './package.json'));

var warnImage = path.resolve(__dirname, '../assets/warn.png');
var errorImage = path.resolve(__dirname, '../assets/error.png');
var entryPath = path.resolve(__dirname, './serve-demo-entry.js'); //const NpmInstallPlugin = require('npm-install-webpack-plugin')

var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var getDemos = function getDemos(dir) {
  var list = [];

  try {
    list = fs.readdirSync(dir);
    list = list.reduce(function (buf, _path) {
      _path = path.resolve(dir, _path);
      var stat = fs.statSync(_path);

      if (_path.indexOf('node_modules') > -1) {
        return buf;
      } else if (stat.isDirectory()) {
        return buf.concat(getDemos(_path));
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
  plugins: [// new NpmInstallPlugin({
  //   peerDependencies: true,
  //   npm:'tnpm'
  // }),
  new ProgressBarPlugin({
    clear: false
  }), new CaseSensitivePathsPlugin(), new FriendlyErrorsWebpackPlugin({
    onErrors: function onErrors(severity, errors) {
      if (severity !== 'error') {
        notifier.notify({
          title: 'React Doc Scripts',
          message: 'warn',
          contentImage: warnImage,
          sound: 'Glass'
        });
        return;
      } else {
        var error = errors[0];
        notifier.notify({
          title: 'React Doc Scripts',
          message: severity + " : " + error.name,
          subtitle: error.file || '',
          contentImage: errorImage,
          sound: 'Glass'
        });
      }
    }
  }), new webpack.ContextReplacementPlugin(/lib[/\\]languages$/, /javascript|htmlbars|scss|css|bash/)],
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: require.resolve('babel-loader'),
      exclude: /node_modules/,
      options: babelConfig
    }, {
      test: entryPath,
      loader: require.resolve('val-loader'),
      options: {
        demos: getDemos(cwd)
      }
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