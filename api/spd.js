import request from '@/utils/request'

// 浏览
export function getChannelInfo(videoUrl) {
    return request({
        url: `/spd/channelInfo`,
        method: 'get',
        params: {
            videoUrl: videoUrl
        }
    })
}