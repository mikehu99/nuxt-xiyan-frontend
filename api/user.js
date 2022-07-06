export default $axios => ({
  getInfoByName(username, pageNo, size) {
    return $axios.$get(
      '/ums/user/' + username,
      {params: {pageNo: pageNo, size: size}})
  },
  getInfo() {
    return $axios.$get(
      '/ums/user/info',
    )
  },
  update(user) {
    return $axios.$post(
      '/ums/user/update',
      user
    )
  },
  getUserInfo(userId) {
    return $axios.$get(
      '/ums/user/userInfo',
      {params: {userId: userId}}
    )
  },
  getUserProfile(userId) {
    return $axios.$get(
      '/ums/user/profile',
      {params: {userId: userId}}
    )
  }
})


