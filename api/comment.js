export default $axios => ({
  fetchCommentsByTopicId (topicId,pageNo,size) {
    return $axios.$get(
      '/comment/get_comments',
      { params: { topicid: topicId, pageNo: pageNo, size: size}})
  },
  fetchCommentsByUserId(userId,pageNo,size) {
    return $axios.$get(
      '/comment/user_comments',
      {
        params: {userId: userId, pageNo: pageNo, size: size}
      }
    )
  },
  pushComment(data) {
    return $axios.$post(
      '/comment/add_comment',
      data
    )
  },
  praiseCommentList(userId,pageNo,pageSize) {
    return $axios.$get(
      '/comment/praise',
      {params:{userId:userId,pageNo:pageNo,pageSize:pageSize}}
    )
  }

})



