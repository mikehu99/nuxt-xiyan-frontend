export default $axios => ({
  getChannelInfo(videoUrl) {
    return $axios.$get(
      '/spd/channelInfo',
      {
        params: {videoUrl: videoUrl}
      }
    )
  },
  // 其它接口
})

