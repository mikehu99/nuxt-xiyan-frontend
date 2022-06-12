const getters = {
  token: state => state.user.token,   // token
  user: state => state.user.user,     // 用户对象
  praiseList: state => state.common.praiseList,     // 点赞列表
}
export default getters