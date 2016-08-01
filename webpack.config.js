var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/javascripts'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: __dirname
      }, {
        test: require.resolve('./js/index.js'),
        loader: 'expose?game!babel'
      }, {
        test: require.resolve('./js/model/index.js'),
        loader: 'expose?model!babel'
      }, {
        test: /\.css$/,
        loader: 'style!css?modules'
      }
    ]
  }
}
