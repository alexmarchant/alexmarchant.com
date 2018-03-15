const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const paths = require('./paths')

const makeConfig = (paths) => ({
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'eslint-loader',
      }]
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer],
            },
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      }),
    }]
  },
  plugins: [
    new ExtractTextPlugin({filename: 'styles/[name].css', disable: true}),
    new StyleLintPlugin({
      files: [path.resolve(paths.assetsSrc, 'styles', '**/*')],
    }),
  ],
  devServer: {
    contentBase: paths.assetsDist,
    port: 8001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  devtool: 'cheap-module-source-map',
})

const siteConfig = {
  ...makeConfig(paths.site),
  entry: {
    site: [
      path.resolve(paths.site.assetsSrc, 'scripts', 'site.js'),
      path.resolve(paths.site.assetsSrc, 'styles', 'site.scss'),
    ]
  },
  output: {
    filename: 'scripts/[name].js',
    path: paths.site.assetsDist,
  },
  plugins: [
    ...makeConfig(paths.site).plugins, 
    new CopyWebpackPlugin([
      {
        from: path.resolve(paths.site.assetsSrc, 'images'),
        to: path.resolve(paths.site.assetsDist, 'images'),
      },
    ]),
  ],
}

const moduleConfig = {
  ...makeConfig(paths.module),
  entry: {
    'module': [
      path.resolve(paths.module.assetsSrc, 'scripts', 'module.js'),
      path.resolve(paths.module.assetsSrc, 'styles', 'module.scss'),
    ]
  },
  output: {
    filename: 'scripts/[name].js',
    path: paths.module.assetsDist,
  },
  externals: {
    jquery: 'jQuery',
    craft: 'Craft',
    garnish: 'Garnish',
  },
}

module.exports = [siteConfig, moduleConfig]

