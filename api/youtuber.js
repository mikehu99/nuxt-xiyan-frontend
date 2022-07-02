export default $axios => ({
  getList (pageNo, size, tab) {
    return $axios.$get(
      '/youtuber/list',
      { params: {pageNo: pageNo, size: size, tab: tab }})
  },
})

/*

// 列表
export function getList(pageNo, size, tab) {
    return request(({
        url: '/youtuber/list',
        method: 'get',
        params: { pageNo: pageNo, size: size, tab: tab }
    }))
}

// 详情
export function getYoutuber(id) {
    return request({
        url: `/youtuber`,
        method: 'get',
        params: {
            id: id
        }
    })
}*/
