import store from '@/store'
import {getToken} from '@/utils/auth'
// 不重定向白名单 [路由守卫]
const whiteList = ['/login', '/', '/regist', "/youtuber/list","/talk"]
export default ({app, $cookies, store}) => {
  app.router.beforeEach((to, from, next) => {
    //服务端直接放行，只做客户端处理
    let isClient = process.client
    if (isClient) {
      const hasToken = getToken();
      if (hasToken) {
        if (to.path === '/login') {
          next({path: '/'})
        } else {
          next()
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else {
          next('/login')
        }
      }
    }
    next()
  })
}
