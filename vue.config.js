const path = require("path");

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/" : "/",
  configureWebpack: {
    resolve: {
      alias: {
        // If using the runtime only build
        vue$: "vue/dist/vue.runtime.esm.js" // 'vue/dist/vue.runtime.common.js' for webpack 1
        // Or if using full build of Vue (runtime + compiler)
        // vue$: 'vue/dist/vue.esm.js'      // 'vue/dist/vue.common.js' for webpack 1
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .tap(options => {
        options.configFile = path.resolve(__dirname, ".eslintrc.js");
        return options;
      });
  },
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: __dirname
        }
      },
      scss: {
        prependData: `@import "@/assets/sass/vendors/vue/vuetify/variables.scss";`
      }
    }
  },
  transpileDependencies: ["vuetify"],
  
  devServer:{
    proxy:{
      '/api2':{
        target:'http://192.168.0.103:3000/',
        changeOrigin: true,
        pathRewrite:{
          '^/api2':'/api/users'
        }
      },
      '/api3':{
        target:'http://jinpeng.wiseweb.com.cn/',
        changeOrigin: true,
        pathRewrite:{
          '^/api3':''
        }
      },
      '/api':{
        target:'http://123.56.104.22:8083/',
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      },
    }
  }
};
