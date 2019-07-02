

module.exports = {
  publicPath: '/',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  // disable source map in production
  productionSourceMap: false,
  devServer: {
    host: "0.0.0.0", //如果是真机测试，就使用这个IP
    port: 8911,
    https: false,
    hotOnly: false, //热更新（webpack已实现了，这里false即可）
    proxy: {
        //配置跨域
        '/api': {
            target: "http://dev.yijiuapp.com/api",
            ws:true,
            changOrigin:true,
            pathRewrite:{
                '^/api':'/'
            }
        }
    },
    // 忽略警告
    overlay: {
      warnings: false,
      errors: false
    },
    lintOnSave: false
  },
  css: {
    /* less 变量覆盖，用于自定义 ant design 主题 */
    loaderOptions: {
      less: {
        // modifyVars: {
        //   'primary-color': '#1DA57A',
        //   'link-color': '#1DA57A',
        //   'border-radius-base': '2px',
        // },
        javascriptEnabled: true
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
}