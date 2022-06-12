import request from '@/utils/request'

// 发布
export function post(youtuber) {
    return request({
        url: '/youtuber/create',
        method: 'post',
        data: youtuber
    })
}

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
}