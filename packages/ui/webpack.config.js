const { mode, output, devServer, devtool } = require('build-tools-webpack');
const { rules: babelRules } = require('build-tools-webpack-babel');
const { rules: scssRules, plugin: extractPlugin } = require('build-tools-webpack-sass/extract');
const { rules: fileRules } = require('build-tools-webpack-files');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode,
  entry: {
    main: './src/main.jsx'
  },
  output: {
    ...output,
    chunkFilename: 'chunk-[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      ...babelRules,
      ...scssRules,
      ...fileRules
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer,
  devtool,
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    }),
    new Dotenv()
  ]
};
