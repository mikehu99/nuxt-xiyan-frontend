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
  import TalkList from '@/components/Talk/TalkList.vue';


  export default {
    name: 'ProfilePraiseTalk',
    components: {TalkList},
    data(){
      return{
        talkList: [],
        page: {
          current: 1,
          size: 5,
          total: 0,
        }
      }
    },
    methods:{
      infiniteHandler($state) {
        this.$api.talk.praiseTalkList(
          this.$route.params.id,
          this.page.current,
          this.page.size
        ).then((data) => {
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
