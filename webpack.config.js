var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: process.env.NODE_ENV != 'production' ?
           ['webpack-hot-middleware/client', './js/index'] :
           ['./js/index']
  ,
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: 'bundle.js',
    publicPath: '/public/javascripts'
  },
  plugins: process.env.NODE_ENV != 'production' ?
             [new webpack.optimize.OccurenceOrderPlugin(), new webpack.HotModuleReplacementPlugin()] :
             [new webpack.optimize.OccurenceOrderPlugin()]
  ,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'js')
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
