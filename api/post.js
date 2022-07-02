export default $axios => ({
  getList (pageNo, size, tab) {
    return $axios.$get(
      '/post/list',
      { params: {pageNo: pageNo, size: size, tab: tab }})
  },
})


