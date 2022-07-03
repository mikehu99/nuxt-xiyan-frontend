<template>
  <div class="main-container">
    <div class="user-view">
      <div class="content-area">
        <WeiboTalk :talk="talk"></WeiboTalk>
        <CommentList :topicId="this.$route.params.id" :topicOwnerId="talk.userId">
        </CommentList>
      </div>
      <div class="side-area"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import EmojiList from "@/assets/js/emoji";
  import CommentList from "@/components/Comments/CommentList";
  import WeiboTalk from '@/components/Talk/WeiboTalk';



  export default {
    name: 'TalkDetail',
    components: {
      CommentList,WeiboTalk
    },
    data() {
      return {
        flag: false,
        talk: {},
      }
    },
    async fetch() {
     let data = await this.$api.talk.selectOne(this.$route.params.id);
     this.talk = data;
     this.flag = true
    },
    mounted(){
      this.fetchPraiseList();
    },
    computed: {
      ...mapGetters([
        'token', 'user'
      ]),
      imgList() {
        if (this.talk.img) {
          return this.talk.img.split(',');
        }
      },
      title() {
        var reg = /\[.+?\]/g;
        if (this.talk.title) {
          return this.talk.title.replace(reg, function (str) {
            return (
              "<img src= '" +
              EmojiList[str] +
              "' width='24'height='24' style='margin: 0 1px;vertical-align: text-bottom'/>"
            );
          });
        }
      }
    },
    methods: {
      fetchPraiseList() {
        if (this.token != null && this.token !== '') {
          this.$store.dispatch('common/getPraiseList');
        }
      },
    }

  }
</script>
