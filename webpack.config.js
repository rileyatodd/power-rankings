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
    publicPath: '/javascripts'
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
  },
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'js', 'actions'),
      components: path.resolve(__dirname, 'js', 'components'),
      containers: path.resolve(__dirname, 'js', 'containers'),
      model: path.resolve(__dirname, 'js', 'model'),
      reducers: path.resolve(__dirname, 'js', 'reducers'),
      store: path.resolve(__dirname, 'js', 'store'),
      util: path.resolve(__dirname, 'js', 'util')
    }
  }
}
