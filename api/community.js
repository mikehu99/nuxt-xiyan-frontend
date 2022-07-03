export default $axios => ({
  getCommunityList() {
    return $axios.$get(
      '/community/list',
    )
  },
  getOneCommunity(id) {
    return $axios.$get(
      '/community',
      {
        params: {id: id}
      }
    )
  }
})
