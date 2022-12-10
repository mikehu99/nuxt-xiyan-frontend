<template>
  <div>
    <!-- 评论详情 -->
    <div v-if="commentList.length > 0" class="list-view">
      <!-- 评论列表 -->
      <div
        style="display:flex"
        class="p-5 comment-col"
        v-for="(item, index) of commentList"
        :key="item.id"
      >
        <!-- 头像 -->
        <nuxt-link :to="{path:`/member/${item.userId}`}" target="_blank">
        <img class="comment-avatar comment-avatar-img" :src="item.avatar"/>
        </nuxt-link>
        <div class="comment-meta">
          <!-- 用户名 -->
          <div class="comment-user">
            <!-- 发表时间 -->
            <span class="comment-info">{{item.createTime | timeFormat}}</span>
          </div>
          <p v-html="item.content" class="comment-content"></p>
          <div style="display: flex;justify-content: space-between">
            <nuxt-link :to="{path:`/talk/${item.topicId}`}" target="_blank">
              <span class="talk-title"><i class="iconfont icon-fenxiang22"/> {{ item.talkTitle | ellipsis }}</span>
            </nuxt-link>
            <!-- 点赞 -->
            <span :class="isLike(item.id)" @click="like(item,$event)">
             赞{{item.praiseCount>0?item.praiseCount:''}}
            </span>
          </div>
        </div>
      </div>
    </div>
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
  import EmojiList from "@/assets/js/emoji";

  import {mapGetters} from 'vuex'

  import {showtime} from "@/assets/js/date"


  export default {
    name: 'ProfilePraiseComment',
    components: {EmojiList},
    data(){
      return{
        commentList: [],
        praise: {},
        page: {
          current: 1,
          size: 5,
          total: 0,
        }
      }
    },
    computed: {
      ...mapGetters(['token', 'user','praiseList']),
      isLike() {
        return function (commentId) {
          return this.praiseList.indexOf(commentId) != -1 ? "like-active" : "like";
        };
      }
    },
    filters: {
      ellipsis(value) {
        if (!value) return '';
        if (value.length > 10) {
          return value.slice(0, 10) + '...'
        }
        return value
      },
    },
    methods:{
      infiniteHandler($state) {
        this.$api.comment.praiseCommentList(
          this.$route.params.id,
          this.page.current,
          this.page.size
        ).then((data) => {
          if (data.records.length) {
            this.page.current += 1;
            this.commentList.push(...data.records);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
      },
      like(comment, e) {
        if (this.token==null || this.token === ''){
          this.$store.commit('common/setLoginFlag',true);
          return false;
        }
        this.praise.itemId = comment.id;
        this.praise.itemType = 2;
        this.praise.itemOwnerId = comment.userId;
        this.$api.praise.praiseItem(this.praise).then(data => {
          if (data.status === 1) {
            this.$message.success('点赞成功');
            e.target.classList.add("like-active");
            e.target.classList.remove("like");
            comment.praiseCount++;
            this.$store.commit('common/praise',comment.id)
          }
          if (data.status === 0) {
            this.$message.success('取消点赞成功');
            e.target.classList.remove("like-active");
            e.target.classList.add("like");
            comment.praiseCount--;
            this.$store.commit('common/praise',comment.id)
          }
        });
      }
    }
  }

</script>
<style scoped>

  .comment-child{
    margin-bottom: 0.5rem;
    background: var(--color-basic-100);
    padding: 10px 0;
  }
  .count {
    padding: 5px;
    line-height: 1.75;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .comment-meta {
    margin-left: 0.8rem;
    width: 100%;
  }

  .reply-meta {
    margin-left: 0.8rem;
    width: 100%;
  }

  .comment-user {
    font-size: 14px;
    line-height: 1.75;
  }

  .comment-user a {
    /*color: #1abc9c !important;*/
    font-weight: 500;
    transition: 0.3s all;
  }

  .comment-info {
    line-height: 1.75;
    font-size: 1rem;
    color: #b3b3b3;
  }


  .comment-content {
    font-size: 14px;
    line-height: 1.5;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-all;
  }

  .comment-avatar {
    transition: all 0.5s;
  }

  .comment-avatar:hover {
    transform: rotate(360deg);
  }


  .like {
    cursor: pointer;
    font-size: 1rem;
    color: #b3b3b3;
  }

  .like:hover {
    color: #1e80ff;
  }

  .like-active {
    cursor: pointer;
    font-size: 1rem;
    color: #1e80ff;
  }

  .comment-col {
    background-color: var(--bg-topic);
    margin-bottom: 8px;
    color: var(--primary-text);
  }
  .talk-title{
    color: var(--secondary-text);
  }
  .talk-title:hover{
    color: #1e80ff;
  }
</style>
