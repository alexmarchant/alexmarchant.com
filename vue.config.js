module.exports = {
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.html$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
