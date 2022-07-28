export default $axios => ({
  getList(pageNo, size, tab,categoryId) {
    return $axios.$get(
      '/youtuber/list',
      {params: {pageNo: pageNo, size: size, tab: tab,categoryId:categoryId}})
  },
  getYoutuber(id) {
    return $axios.$get(
      `/youtuber`,
      {
        params: {id: id}
      }
    )
  },
  praise(praise) {
    return $axios.$post(
      `/youtuber/praise`,
      praise
    )
  },
})
