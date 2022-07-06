<template>
  <div>
    <TalkList :talkList="talkList">
    </TalkList>
    <!--分页-->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="spinner">
        <el-skeleton :rows="6" animated/>
      </div>
      <div slot="no-more">
      </div>
      <div slot="no-results"><el-empty description="没有更多内容了"></el-empty></div>
    </infinite-loading>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import TalkList from '@/components/Talk/TalkList.vue';


  export default {
    name: 'ProfileTalkList',
    components: {InfiniteLoading, TalkList},
    data(){
      return{
        talkList: [],
        page: {
          current: 1,
          size: 5,
          total: 0,
          tab: 'latest',
        }
      }
    },
    methods:{
      infiniteHandler($state) {
        this.$api.talk.getList({
          pageNo: this.page.current,
          pageSize: this.page.size,
          tab: this.tab,
          userId: this.$route.params.id
        }).then((data) => {
          if (data.records.length) {
            this.page.current += 1;
            this.talkList.push(...data.records);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
      },
    }
  }

</script>
