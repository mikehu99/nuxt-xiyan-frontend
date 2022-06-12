import articleModule from '../api/article'
export default function ({ $axios }, inject) {
  const apiModules = {}
  $axios.onRequest((config) => {
    // 相关配置
  })
  apiModules.article = articleModule($axios)
  // Inject to context as $api
  inject('api', apiModules)
}
