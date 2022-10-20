export default $axios => ({
  login(data){
    return $axios.$post(
      '/ums/user/login',
      data
      )
  },
  logout(){
    return $axios.$get(
      '/ums/user/logout'
    )
  },
  getUserInfo(){
    return $axios.$get(
      '/ums/user/info'
    )
  },
  userRegister(data){
    return $axios.post(
      '/ums/user/register',
      data
    )
  }
})
// 注册
export function userRegister(userDTO) {
  return request({
    url: '/ums/user/register',
    method: 'post',
    data: userDTO
  })
}

// 前台用户登录
export function login(data) {
  return request({
    url: '/ums/user/login',
    method: 'post',
    data
  })
}
// 登录后获取前台用户信息
export function getUserInfo() {
  return request({
    url: '/ums/user/info',
    method: 'get'
  })
}
// 前台用户注销
export function logout() {
  return request({
    url: '/ums/user/logout'
  })
}
