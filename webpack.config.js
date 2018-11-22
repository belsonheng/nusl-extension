'use strict'

const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  entry: [
    './src/popup.js'
  ],
  output: {
    filename: 'popup.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|svg|jp(e*)g|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/img'
        }
      },
      {
        test: /\.(woff(2*)|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      './src/background.html',
      './src/background.js',
      './src/manifest.json',
      { from: './src/assets/icons', to: 'assets/icons' }
    ]),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: './src/popup.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery"
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    index: 'popup.html',
    compress: true
  }
};
