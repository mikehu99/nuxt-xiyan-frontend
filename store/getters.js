const getters = {
  token: state => state.user.token,   //TOKEN
  user: state => state.user.user,     // 用户对象
  praiseList: state => state.common.praiseList,     // 点赞列表
}
export default getters
