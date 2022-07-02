export default $axios => ({
  getBillboard () {
    return $axios.$get('/billboard/show')
  },
})
