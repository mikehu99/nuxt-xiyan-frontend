import store from '@/store'
import { Message } from 'element-ui';


export default function ({store, redirect, app: {$axios, $cookies}}) {

  // 数据访问前缀,指定配置的环境变量接口地址
  $axios.defaults.baseURL = process.env.baseUrl;

  // request拦截器，我这里设置了一个token，当然你可以不要
  $axios.onRequest(config => {
    //请求超时时间 $cookies.get("token")
    config.timeout = 5000;
    if ($cookies.get('u_token')) {
      //如果有toekn才携带请求头中的token到后端
      config.headers['Authorization'] = 'Bearer ' + $cookies.get('u_token')
    }
  });
  // response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    // 如果自定义代码不是200，则将其判断为错误。
    if (res.code !== 200) {
      // 50008: 非法Token; 50012: 异地登录; 50014: Token失效;
      if (res.code === 401 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        Message({
          showClose: true,
          message: '会话失效，您可以留在当前页面，或重新登录',
          type: 'warning',
          duration: 3 * 1000
        })
      } else { // 其他异常直接提示
        console.log(res.message);
        Message({
          showClose: true,
          message: '⚠' + res.message || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  })
}
