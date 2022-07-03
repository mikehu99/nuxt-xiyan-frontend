<template>
  <div class="action-row">
    <div class="action-box">
      <div class="tip">
        <div class="tip-box">
          <span class="iconfont icon-gengduo1 tip-icon"></span>
          <!--<span class="el-icon-more tip-icon"></span>-->
        </div>
      </div>
      <div class="comment-action action">
        <div class="action-title-box" @click="detailPage">
          <span class="iconfont icon-pinglun3 bottom-icon"></span>
          <span class="action-title">{{talk.commentNum}}</span>
        </div>
      </div>
      <div class="like-action action">
        <div class="action-title-box" @click="praiseFuc()" v-preventReClick="1500"
             :style="{color:(praiseFlag?'#1e80ff':'#86909c')}">
          <span :class="[thumb,'bottom-icon']"></span>
          <span class="action-title">{{talk.praiseNum}}</span>
        </div>
      </div>
      <div class="share-action action">
        <div class="action-title-box">
          <span class="iconfont icon-share bottom-icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'


  export default {
    name: 'TalkHandle',
    props: {
      talk: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        praise: {},
      }
    },
    computed: {
      ...mapGetters(['token', 'user','praiseList']),
      praiseFlag(){
        return this.praiseList.indexOf(this.talk.id) >= 0
      },
      thumb() {
        return this.praiseFlag ? 'iconfont icon-dianzan1-mianxing' : 'iconfont icon-dianzan1'
      }
    },
    methods: {
      detailPage() {
        this.$router.push({name: 'talk-detail', params: {id: this.talk.id}})
      },
      praiseFuc() {
        if(this.token == null || this.token === ''){
          this.$message.success('该功能需要登录');
          return false;
        }
        this.praise.itemId = this.talk.id;
        this.praise.itemType = 1;
        this.praise.itemOwnerId = this.talk.userId;
        this.$api.praise.praiseItem(this.praise).then(data => {
          if (data.status === 1) {
            this.$message.success('点赞成功')
            this.talk.praiseNum++;
            this.$store.commit('common/praise',this.talk.id)
          }
          if (data.status === 0) {
            this.$message.success('取消点赞成功')
            this.talk.praiseNum--;
            this.$store.commit('common/praise',this.talk.id)
          }
          //后续样式变化
        }).catch(err => {  });
      }
    }
  }

</script>
<style scoped>
  .action-row {
    position: relative;
    margin: 12px 0 0 60px;
  }


  .action-box {
    display: flex;
    position: relative;
    color: #86909c;
    justify-content: space-between;
  }

  .tip{
    flex: 1 1 55%;
    justify-content: left;
  }

  .tip-icon{
    font-size: 20px;
    cursor: pointer;
    color: rgba(0,0,0,.3);
    padding:2px 5px;
    margin-left: -5px;
  }
  .tip-icon:hover{
    color: #000;
    background: rgba(148,108,230,.05);
  }
  .action {
    margin-left: 20px;
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .action-title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .action-title-box .action-title {
    margin-left: 0.3em;
    font-size: 12px;
    font-weight: 400;
    display: inline-block;
  }

  .bottom-icon {
    font-size: 20px;
  }
  .bottom-icon:hover{
    color:#1E80FF;
  }
  @media (max-width: 600px) {
    .action-row {
      margin-left: 0rem;
      margin-right: 0rem;
    }
  }
</style>
