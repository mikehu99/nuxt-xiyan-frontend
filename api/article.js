export default $axios => ({
  getTagList () {
    return $axios.$get('/tag/tagList')
  },
  // 其它接口
})
