import { getToken } from "@/utils/auth";
const getters = {
  token: state => state.user.token || getToken(),   // token nuxt刷新页面有问题，所以||gettoken
  user: state => state.user.user,     // 用户对象
  praiseList: state => state.common.praiseList,     // 点赞列表
}
export default getters
