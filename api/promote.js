export default $axios => ({
  getList () {
    return $axios.$get('/promotion/all')
  },
})
