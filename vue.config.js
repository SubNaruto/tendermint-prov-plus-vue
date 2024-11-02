const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    proxy: {

      '/api': {
        target: 'http://10.46.120.20:9090', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置 （本机启动）
        pathRewrite: {
          '^/api': ''
        }
      },

      '/test': {
        target: 'http://10.46.120.20:9091', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置 （服务器启动，与tendermint在一起）
        pathRewrite: {
          '^/test': ''
        }
      },

    },
  },
})