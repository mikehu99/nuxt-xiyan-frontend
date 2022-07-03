export default $axios => ({
  praiseItem (data) {
    return $axios.$post(
      '/praise/item',
      data
    )
  },
  praiseList() {
    return $axios.$get(
      '/praise/list'
    )
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
