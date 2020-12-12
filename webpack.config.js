/**
 * Created by mapbar_front on 2019-01-15.
 */
var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  mode: 'production',
  entry: {
    'infra.common': './src/index.js',
    'infra.upload': './packages/Upload/index.js',
    'input.field': './packages/Mobile/InputField/index.js',
    'input.phone': './packages/Mobile/InputPhone/index.js',
    'input.radio': './packages/Mobile/InputRadio/index.js',
    'infra.textarea': './packages/Mobile/InfraTextarea/index.js',
    'spicker': './packages/Mobile/Spicker/index.js',
    'tpicker': './packages/Mobile/Tpicker/index.js',
    'async.upload': './packages/Mobile/AsyncUpload/index.js',
    'infra.calendar': './packages/Calendar/index.js',
    'infra.bubble': './packages/Bubble/index.js',
    'infra.carouselPreview': './packages/Mobile/CarouselPreview/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    library: 'infra-vue-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
        exclude: /dist/
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#none'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
