<template>
  <div class="reply-input-wrapper" ref="reply">
    <textarea
      id="reply-input"
      v-focus
      class="comment-textarea"
      :placeholder="'回复 @' + toComment.username + '：'"
      auto-grow
      dense
      v-model="comment.content"
    />
    <div class="emoji-container">
      <el-popover
        placement="bottom-start"
        width="300"
        trigger="click">
        <Emoji @addEmoji="addEmoji"/>
        <div slot="reference" class="emoji-box">
          <i class="iconfont icon-biaoqing" style="font-size: 22px;color: var(--secondary-text)"/>
        </div>
      </el-popover>
      <div style="margin-left:auto">
        <button @click="cancleReply" class="cancle-btn v-comment-btn">
          取消
        </button>
        <button v-preventReClick="10000" @click="insertComment" class="upload-btn v-comment-btn">
          提交
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Emoji from "@/components/Emoji";

  export default {
    components: {
      Emoji
    },
    props: {
      parentComment:{
        type:Object,
        default:{}
      },
      toComment:{
        type:Object,
        default:{}
      },
      type: {
        type: Number
      }
    },
    data: function () {
      return {
        index: 0,
        chooseEmoji: false,
        replyUserId: null,
        parentId: null,
        comment:{
          topicId:this.$route.params.id,
          content:'',
          toUserId:this.toComment.userId,
          parentId:this.parentComment.id,
          toCommentId:this.toComment.id,
          commentType:1
        }
      };
    },
    methods: {
      cancleReply() {
        this.$emit("cancleReply");
      },
      async insertComment() {
        //判断登录

        //判空

        //解析表情

        //发送请求
        await this.$api.comment.pushComment(this.comment);
        this.$message.success("评论成功");
        this.comment.content='';
        this.$emit("cancleReply");
        this.$emit("reloadReply");
      },
      addEmoji(icon) {
        if (process.client) {
          // 获取文本输入框元素节点
          let ele = document.getElementById('reply-input');
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
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
  };
</script>

<style scoped>
  .reply-input-wrapper {
    position: relative;
    padding: 10px 10px;
  }
  .emoji-box{
    cursor: pointer;
  }
  .emoji-box:hover{
    color: #1e80ff;
  }
</style>
