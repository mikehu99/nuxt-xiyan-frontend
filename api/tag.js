import request from '@/utils/request'

export function getTopicsByTag(paramMap) {
  return request({
    url: '/tag' ,
    method: 'get',
    params: {
        name: paramMap.name,
        page: paramMap.page,
        size: paramMap.size
    }
  })
}
export function getTagList() {
    return request({
        url: '/tag/tagList',
        method: 'get'
    })
}