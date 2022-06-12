import request from '@/utils/request'
export function getCommunityList() {
  return request({
    url: '/community/list',
    method: 'get'
  })
}

// 详情
export function getOneCommunity(id) {
  return request({
    url: '/community',
    method: 'get',
    params: {
      id: id
    }
  })
}