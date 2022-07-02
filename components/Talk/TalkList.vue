<template>
  <div>
    <div v-for="talk in talkList">
      <div v-if="talk.talkType==1">
        <WeiboTalk :talk="talk"></WeiboTalk>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import WeiboTalk from '@/components/Talk/WeiboTalk';

  export default {
    name: 'TalkList',
    components: {
      WeiboTalk
    },
    props: {
      talkList: {
        type: Array,
        required: true
      }
    },
    data(){
      return{
        praise:{},
      }
    },
    computed: {
      ...mapGetters(['token', 'user'])
    },
    methods:{
      fetchPraiseList() {
        if (this.token != null && this.token !== '') {
          this.$store.dispatch('common/getPraiseList');
        }
      },
    },
    mounted(){
      this.fetchPraiseList();
    }
  }
</script>
