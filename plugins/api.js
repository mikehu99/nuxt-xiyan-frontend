import articleModule from '../api/article'
import billboardModule from '../api/billboard'
import tipModule from '../api/tip'
import postModule from '../api/post'
import promoteModule from '../api/promote'
import youtuberModule from '../api/youtuber'
import talkModule from '../api/talk'
import praiseModule from '../api/praise'
import authModule from '../api/auth/auth'
import tagModule from '../api/tag'
import communityModule from '../api/community'
export default function ({ $axios }, inject) {
  const apiModules = {}
  $axios.onRequest((config) => {
    // 相关配置
  })
  apiModules.article = articleModule($axios);
  apiModules.billboard = billboardModule($axios);
  apiModules.tip = tipModule($axios);
  apiModules.post = postModule($axios);
  apiModules.promote = promoteModule($axios);
  apiModules.youtuber = youtuberModule($axios);
  apiModules.talk = talkModule($axios);
  apiModules.praise = praiseModule($axios);
  apiModules.auth = authModule($axios);
  apiModules.tag = tagModule($axios);
  apiModules.community = communityModule($axios);
  // Inject to context as $api
  inject('api', apiModules)
}
