import request from '@/utils/request'

export function fetchCommentsByTopicId(topicId,pageNo,size) {
  return request({
    url: '/comment/get_comments',
    method: 'get',
    params: {
      topicid: topicId, pageNo: pageNo, size: size
    }
  })
}

export function fetchCommentsByUserId(userId,pageNo,size) {
  return request({
    url: '/comment/user_comments',
    method: 'get',
    params: {
      userId: userId, pageNo: pageNo, size: size
    }
  })
}

export function pushComment(data) {
  return request({
    url: '/comment/add_comment',
    method: 'post',
    data: data
  })
}

//查询点赞talk
export function praiseCommentList(userId,pageNo,pageSize) {
  return request({
    url: '/comment/praise',
    method: 'get',
    params:{userId:userId,pageNo:pageNo,pageSize:pageSize}
  })
}

