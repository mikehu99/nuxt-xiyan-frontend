import { getToken } from "@/utils/auth";
const getters = {
  token: state => getToken(),   // token
  user: state => state.user.user,     // 用户对象
  praiseList: state => state.common.praiseList,     // 点赞列表
}
export default getters
