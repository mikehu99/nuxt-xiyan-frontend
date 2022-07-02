export default $axios => ({
  getTodayTip () {
    return $axios.$get('/tip/today')
  },
})
