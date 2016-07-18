var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var isDev = false;

module.exports = {
  context: __dirname,
  entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './project/static/js/index'
  ],

  output: {
      path: path.resolve('./project/static/bundles/'),
      filename: 'main.js',
      publicPath: 'http://localhost:3000/static/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
      // filename: '[name]-[hash].js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin("style.css", {allChunks: true}),
  ],

  externals: {
    'React': 'react'
  },

  module: {
    loaders: [     

      { test: /\.js?$/, loader: 'babel', exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy' ],
          presets: ['es2015', 'stage-0', 'react', 'react-hmre']
        }
      },

      { test: /\.styl$/, loader: isDev
        ? "style-loader!css-loader!stylus-loader"
        : ExtractTextPlugin.extract("stylus", "css-loader!stylus-loader")
      },

      { test: /\.css$/, loader: isDev
        ? "style-loader!css-loader"
        : ExtractTextPlugin.extract("css", "css-loader")
      },

    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx', '.styl', 'css']
  }
}