const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const {resolve} = require("@babel/core/lib/vendor/import-meta-resolve");


module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: config => {
    const plugins = []
    plugins.push(new NodePolyfillPlugin())

    // 配置路径别名 如 src/assets 可用 @assets表示
    // config.resolve.alias['assets'] = resolve('src/assets')
    // config.resolve.alias['components'] = resolve('src/components')
    // config.resolve.alias['views'] = resolve('src/views')
  }
}
