<template>
  <div>
    <div class="commnet-box">
      <!-- 评论框 -->
      <div  class="comment-input-wrapper">
        <div style="display:flex">
          <img class="comment-avatar-img" :src="user.avatar"></img>
          <div style="width:100%" class="ml-3">
            <div class="comment-input">
            <textarea
              id="comment-input"
              class="comment-textarea"
              v-model="comment.content"
              placeholder="留下点什么吧..."
              auto-grow
              dense
              @focus="focus"
            />
            </div>
            <!-- 操作按钮 -->
            <div class="emoji-container" v-if="showEmojiContainer">
              <el-popover
                placement="bottom-start"
                width="300"
                trigger="click">
                <Emoji @addEmoji="addEmoji"/>
                <div slot="reference" class="emoji-box">
                  <i class="iconfont icon-biaoqing" style="font-size: 22px;color: var(--secondary-text)"/>
                </div>
              </el-popover>
              <el-button style="margin-left:auto" size="small" type="primary" @click="insertComment" v-preventReClick="1500">提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论详情 -->
    <div v-if="commentList.length > 0" class="list-view">
      <!-- 评论数量 -->
      <div class="count">{{ page.total }} 评论</div>
      <!-- 评论列表 -->
      <div
        style="display:flex"
        class="pt-5 comment-col"
        v-for="(item, index) of commentList"
        :key="item.id"
      >
        <!-- 头像 -->
        <img class="comment-avatar comment-avatar-img" :src="item.avatar"/>
        <div class="comment-meta">
          <!-- 用户名 -->
          <div class="comment-user">
            <span>{{ item.username }}</span>
            <!-- 发表时间 -->
            <span class="comment-info" style="margin-right:10px">{{ item.createTime | date }}</span>
          </div>

          <!-- 评论内容 -->
          <p v-html="item.content" class="comment-content"></p>
          <!-- 信息 -->
          <div class="comment-info">
            <!-- 点赞 -->
            <span
              :class="isLike(item.id)"
              @click="like(item,$event)"
            >
             {{item.praiseCount>0?item.praiseCount:''}}</span>
            <!-- 回复 -->

            <span v-if="replyCommentId===item.id" class="reply-btn blue" @click="cancleReply">
              取消回复
            </span>
            <span v-else class="reply-btn" @click="replyCommentClick(item)">
              回复
            </span>
          </div>
          <!-- 回复框 -->
          <Reply v-if="replyCommentId===item.id" :parentComment="item" :toComment="item" ref="reply"
                 @cancleReply="cancleReply" @reloadReply="reloadReply"/>
          <!-- 子评论 -->
          <div v-if="item.childComments.length>0" style="background: var(--color-basic-100);padding: 10px;">
            <div
            style="display:flex;margin-top: 10px"
            v-for="reply of item.childComments"
            :key="reply.id"
          >
            <!-- 头像 -->
            <img class="comment-avatar comment-avatar-img" :src="reply.avatar"></img>
            <div class="reply-meta">
              <!-- 用户名 -->
              <div class="comment-user">
                <span>{{ reply.username }}</span>
                <span class="comment-info" style="margin-right:10px">
                  {{ reply.createTime | date }}
                </span>
              </div>

              <!-- 回复内容 -->
              <p class="comment-content">
                <!-- 回复用户名 -->
                <template v-if="reply.toCommentId != item.id">
                  <span class="ml-1">
                    @{{ reply.toUserName }}
                  </span>
                  ，
                </template>
                <span v-html="reply.content"/>
                <!-- 信息 -->
              </p>
              <div class="comment-info">
                <!-- 点赞 -->
                <span
                  :class="isLike(reply.id)"
                  @click="like(reply,$event)"
                />
                <span v-show="reply.praiseCount > 0"> {{ reply.praiseCount }}</span>
                <!-- 回复 -->
                <span v-if="replyCommentId===reply.id" class="reply-btn blue" @click="cancleReply">
                  取消回复
                </span>
                <span v-else class="reply-btn" @click="replyCommentClick(reply)">
                  回复
                </span>
              </div>
              <Reply v-if="replyCommentId===reply.id" :parentComment="item" :toComment="reply" ref="reply"
                     @cancleReply="cancleReply" @reloadReply="reloadReply"/>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 没有评论提示 -->
    <div v-else style="padding:1.25rem;text-align:center;color: var(--secondary-text)">
      来发评论吧~
    </div>
    <!--分页-->
    <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
      <div slot="spinner">
        <el-skeleton :rows="6" animated />
      </div>
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script>
  import Reply from "./Reply";
  import Emoji from "@/components/Emoji";
  import EmojiList from "@/assets/js/emoji";

  import {mapGetters} from 'vuex'


  export default {
    name: "CommentList",
    components: {
      Reply, Emoji
    },
    props: {
      topicId: {
        type: String,
        require: true
      },
      topicOwnerId: {
        type: String,
        require: true
      },
      type: {
        type: Number
      },
    },
    data: function () {
      return {
        infiniteId: +new Date(),
        showEmojiContainer:false,
        replyCommentId: 0,
        commentList: [],
        comment: {
          topicId: this.topicId,
          content: '',
          toUserId: '',
          parentId: '',
          commentType: 1
        },
        page: {
          current: 1,
          size: 10,
          total: 0,
          tab: 'latest'
        },
        praise: {}
      };
    },
    computed: {
      ...mapGetters(['token', 'user','praiseList']),
      isLike() {
        return function (commentId) {
          return this.praiseList.indexOf(commentId) != -1 ? "like-active iconfont icon-dianzan4" : "like iconfont icon-dianzan3";
        };
      }
    },
    methods: {
      infiniteHandler($state) {
        this.$api.comment.fetchCommentsByTopicId(
          this.topicId,
          this.page.current,
          this.page.size
        ).then((data) => {
          if (data.records.length) {
            this.page.current += 1;
            this.page.total = data.total;
            this.commentList.push(...data.records);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
      },
      changeType() {
        this.page.current = 1;
        this.commentList = [];
        this.infiniteId += 1;
      },
      replyCommentClick(item) {
        if (this.token==null || this.token === ''){
          this.$store.commit('common/setLoginFlag',true);
          return false;
        }
        this.replyCommentId = item.id;
        console.log(item.id);
      },
      addEmoji(icon) {
        if (process.client) {
          // 获取文本输入框元素节点
          let ele = document.getElementById('comment-input');
          // 获取光标
          let cursor = ele.selectionStart
          // 设置文本内容
          ele.setRangeText(icon)
          // 移动光标并聚焦
          ele.selectionStart = cursor + 2
          ele.focus()
          // 使文本输入框的内容等于当前的值
          this.comment.content = ele.value
        }
      },
      async insertComment() {
        //判断登录
        if (this.token==null || this.token === ''){
          this.$store.commit('common/setLoginFlag',true);
          return false;
        }
        //判空

        //解析表情

        //发送请求
        await this.$api.comment.pushComment(this.comment);
        this.changeType();
        this.$message.success("评论成功");
        this.cancleReply();
        this.comment.content='';
      },
      like(comment, e) {
        this.praise.itemId = comment.id;
        this.praise.itemType = 2;
        this.praise.itemOwnerId = comment.userId;
        this.$api.praise.praiseItem(this.praise).then(data => {
          if (data.status === 1) {
            this.$message.success('点赞成功');
            this.$store.commit('common/praise',comment.id)
            e.target.classList.add("like-active");
            e.target.classList.remove("like");
            comment.praiseCount++;
          }
          if (data.status === 0) {
            this.$message.success('取消点赞成功');
            this.$store.commit('common/praise',comment.id)
            e.target.classList.remove("like-active");
            e.target.classList.add("like");
            comment.praiseCount--;
          }
        }).catch(err => {  });
      },
      reloadReply() {
        this.changeType();
      },
      cancleReply() {
        this.replyCommentId = 0;
        this.comment.content='';
      },
      //点击编辑框外部区域关闭编辑框
      handlerClick(event) {
        if (event.target.classList.contains('reply-btn')){
          return;
        }
        var commnetArea = document.getElementsByClassName('reply-input-wrapper')[0];
        if (commnetArea){
          let isSelf = commnetArea.contains(event.target);  // 这个是自己的区域
          if(!isSelf) {
            this.cancleReply();
          }
        }
      },
      focus(){
        if (this.token == null || this.token === ''){
          this.$store.commit('common/setLoginFlag',true);
          return false;
        }
        this.showEmojiContainer=true;
        console.log("focus")
        console.log(this.showEmojiContainer)
      }
    },
    watch: {
      commentList() {
        this.reFresh = false;
        this.$nextTick(() => {
          this.reFresh = true;
        });
      }
    },
    mounted() {
      document.addEventListener('click', this.handlerClick)  // 监听 document 点击事件
    },
  };
</script>

<style lang="less" scoped>
  .comment-title {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 40px;
    margin-bottom: 10px;
  }

  .comment-title i {
    font-size: 1.5rem;
    margin-right: 5px;
  }

  .comment-input-wrapper {
    border-radius: 4px;
    padding: 10px;
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
    border-bottom: 1px dashed var(--color-basic-200);
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
    color: #1abc9c !important;
    font-weight: 500;
    transition: 0.3s all;
  }

  .comment-nickname {
    text-decoration: none;
    color: #1abc9c !important;
    font-weight: 500;
  }

  .comment-info {
    line-height: 1.75;
    font-size: 1rem;
    color: var(--secondary-text);
  }

  .reply-btn {
    cursor: pointer;
    margin-left: 5px;
  }
  .reply-btn:hover{
    color: #1e80ff;
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
  .commnet-box{
    background-color: var(--bg-topic);
    padding: 10px 10px;
    border-radius: 5px;
    margin-top: 1rem;
  }
  .emoji-box{
    cursor: pointer;
  }
  .emoji-box:hover{
    color: #1e80ff;
  }

  .like {
    cursor: pointer;
    font-size: 14px;
  }

  .like:hover {
    color: #1e80ff;
  }

  .like-active {
    cursor: pointer;
    font-size: 14px;
    color: #1e80ff;
  }

  .load-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .load-wrapper button {
    background-color: #49b1f5;
    color: #fff;
  }
  .list-view{
    background-color: var(--bg-topic);
    margin-top: 1rem;
    padding: 20px;
    color: var(--primary-text);
  }
  .comment-col{
  }
</style>
