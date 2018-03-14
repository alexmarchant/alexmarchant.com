const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin') 

const paths = require('./paths')
let [siteConfig, moduleConfig] = require('./webpack.config')

const sharedConfig = {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
}

siteConfig = {
  ...siteConfig,
  ...sharedConfig,
  output: {
    ...siteConfig.output,
    filename: 'scripts/[name]-[hash:6].js',
  },
  plugins: [
    ...sharedConfig.plugins,
    new ExtractTextPlugin('styles/[name]-[contenthash:6].css'),
    new CopyWebpackPlugin([
      {
        from: path.resolve(paths.site.assetsSrc, 'images'),
        to: path.resolve(paths.site.assetsDist, 'images'),
      },
    ]),
    new ManifestPlugin({
      map: manifestFormatter,
    }),
  ],
}

moduleConfig = {
  ...moduleConfig,
  ...sharedConfig,
  plugins: [
    ...sharedConfig.plugins,
    new ExtractTextPlugin('styles/[name].css'),
  ],
}

// Adds dest folder names to asset keys
// e.g. scripts/bundle.js instead of
// bundle.js
function manifestFormatter(input) {
  const sourcePath = path.dirname(input.name)
  const targetPath = path.dirname(input.path)

  if (sourcePath !== targetPath) {
    input.name = `${targetPath}/${input.name}`
  }

  return input
}

module.exports = [siteConfig, moduleConfig]
