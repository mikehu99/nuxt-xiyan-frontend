const webpack = require('webpack')
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    // script: [
    //     //<!-- 51统计 -->
    //     {
    //         type: 'text/javascript',
    //         src: 'https://js.users.51.la/21038499.js'
    //     },
    //     // <!-- 百度统计 -->
    //     {
    //         src: 'https://hm.baidu.com/hm.js?88b551f7172ccc8bbee6f8928f5abbce'
    //     },
    //     //<!-- 360自动收录 -->
    //     {
    //         id: 'sozz',
    //         src: 'https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba'
    //     },
    // ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "buefy/dist/buefy.css",
    "@/assets/css/index.css",
    "@/assets/iconfont/iconfont.css",
    "@/assets/app.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      //axios
      src: "@/plugins/element-ui",
      ssr: true
    },
    {
      //axios
      src: "@/plugins/axios",
      ssr: true
    },
    //配置路由守卫
    {src: '@/plugins/permission', ssr: true},
    {
      src: "@/plugins/api",
      ssr: true
    },
    {
      src: "@/plugins/buefy",
      ssr: true
    },
    {
      src: "@/plugins/darkreader",
      ssr: false
    },
    {
      src: "@/plugins/scroll-to",
      ssr: false
    },
    {
      src: "@/plugins/day",
      ssr: true
    },
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    retry: false // 默认值，自动拦截失败的请求并在可能的情况下重试它们3次
  },
  // 客户端相关
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL // 浏览器请求
    }
  },
  // 服务端
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL // 服务器请求
    }
  },
  //设置接口地址环境变量
  env: {
    baseUrl: process.env.BASE_URL
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    //cookie
    'cookie-universal-nuxt',
    //axios
    '@nuxtjs/axios',
  ],
  //路由进度条配置
  loading: {
    color: '#19be6b',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //使用jquery
    plugins: [
    ],
  },
}
