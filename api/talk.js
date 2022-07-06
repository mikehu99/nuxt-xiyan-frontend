export default $axios => ({
  getList (data) {
    return $axios.$get(
      '/talk/list',
      { params: data})
  },
  location(){
    return $axios.$get(
      '/talk/location'
    )
  },
  praiseTalkList(userId,pageNo,pageSize){
    return $axios.$get(
      '/talk/praise',
      {params:{userId:userId,pageNo:pageNo,pageSize:pageSize}}
    )
  },
  talk(data) {
    return $axios.$post(
      '/talk/create',
      data
    )
  },
  selectOne(id) {
    return $axios.$get(
       '/talk',
      {params: {id:id}}
    )
  },
  update(talk) {
    return $axios.$post(
      '/talk/update',
      talk
    )
  },

})




