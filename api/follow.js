export default $axios => ({
  follow (id) {
    return $axios.get(
      `/relationship/subscribe/${id}`
    )
  },
  unFollow(id) {
    return $axios.get(
      `/relationship/unsubscribe/${id}`,
    )
  },
  hasFollow(topicUserId) {
    return $axios.$get(
      `/relationship/validate/${topicUserId}`
    )
  }
})

