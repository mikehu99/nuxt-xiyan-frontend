export default $axios => ({
  praiseItem (data) {
    return $axios.$post(
      '/praise/item',
      { params: data})
  },
})


// 点赞
export function praiseItem(praise) {
  return request({
    url: '/praise/item',
    method: 'post',
    data: praise
  })
}

// 查询一个
export function praiseList() {
  return request({
    url: '/praise/list',
    method: 'get'
  })
}
