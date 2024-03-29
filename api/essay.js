export default $axios => ({
  essayList(params) {
    return $axios.$get(
      '/essay/list',
      {params: params}
    )
  },
  essay(id) {
    return $axios.$get(
      '/essay/detail/' + id,
    )
  },
  translate(data) {
      return $axios.$post(
      '/transword',
        data
    )
  }
})
