export default $axios => ({
  essayList(params) {
    return $axios.$get(
      '/essay/list',
      { params: params}
    )
  },
})
