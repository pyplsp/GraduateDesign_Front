const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')


module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: config => {
    const plugins = []
    plugins.push(new NodePolyfillPlugin())
  }
}
