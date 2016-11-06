var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var isDev;

var config = {
  context: __dirname,
  entry: [
    // './project/static/js/index'
    './project/static/stylus/style.styl'
  ],

  output: {
      path: path.resolve('./project/static/bundles/'),
      filename: 'main.js',
      chunkFilename: "chunk.js",
      // publicPath: '/static/bundles/'
      // publicPath: 'http://localhost:3000/static/bundles/'
      // filename: '[name]-[hash]-[id].js',
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

      /*
      { test: /\.js?$/, loader: 'babel', exclude: /node_modules/,
        query: {
          plugins: ['transform-decorators-legacy', ],
          presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
          cacheDirectory: true,
        }
      },
      */

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
    // extensions: ['', '.js', '.jsx', '.styl', 'css'],
    extensions: ['', '.styl', 'css'],
    // alias: {
    //   'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min')
    // }
  },

  cache: true,
  debug: true
}

if(isDev){
  config.entry.push('webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server');
  config.output['publicPath'] = 'http://localhost:3000/static/bundles/'; // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
}

module.exports = config;
