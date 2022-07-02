export default $axios => ({
  getList (data) {
    return $axios.$get(
      '/talk/list',
      { params: data})
  },
})


// 发布
export function talk(talk) {
    return request({
        url: '/talk/create',
        method: 'post',
        data: talk
    })
}

// 修改
export function update(talk) {
  return request({
    url: '/talk/update',
    method: 'post',
    data: talk
  })
}


// 查询一个
export function selectOne(id) {
  return request({
    url: '/talk',
    method: 'get',
    params: {id:id}
  })
}

// 查询一个
export function location() {
  return request({
    url: '/talk/location',
    method: 'get',
  })
}

//查询点赞talk
export function praiseTalkList(userId,pageNo,pageSize) {
  return request({
    url: '/talk/praise',
    method: 'get',
    params:{userId:userId,pageNo:pageNo,pageSize:pageSize}
  })
}


