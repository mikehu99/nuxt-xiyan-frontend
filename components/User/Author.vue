<template>
  <div class="author-box" id="author">
    <nav class="level" style="padding: 18px 20px;">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">关注</p>
          <p class="title">{{ topicUser.followCount }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">粉丝</p>
          <p class="title">{{ topicUser.followerCount }}</p>
        </div>
      </div>
    </nav>
    <div>
      <p class="content">积分：<code>{{ topicUser.score }}</code></p>
      <p class="content">入驻：{{ dayjs(topicUser.createTime).format("YYYY/MM/DD HH:MM:ss") }}</p>
    </div>
    <div v-if="user.id !== topicUser.id" style="margin-top: 1rem">
      <button
        v-if="hasFollow"
        class="button is-success is-light button-center is-fullwidth"
        @click="handleUnFollow(topicUser.id)"
      >
        已关注
      </button>

      <button v-else class="button is-light button-center is-fullwidth" @click="handleFollow(topicUser.id)">
        关注TA
      </button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Author',
    props: {
      topicUser: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        hasFollow: false
      }
    },
    mounted() {
      this.fetchInfo()
    },
    computed: {
      ...mapGetters([
        'token', 'user'
      ])
    },
    methods: {
      fetchInfo() {
        if (this.token != null && this.token !== '') {
          this.$api.follow.hasFollow(this.topicUser.id).then(data => {
            this.hasFollow = data.hasFollow
          })
        }
      },
      handleFollow: function (id) {
        if (this.token == null || this.token === '') {
          this.$message({message:'该功能需要登录',type:'error',showClose: true});
          this.$store.commit('common/setLoginFlag',true);
          return false;
        }
        this.$api.follow.follow(id).then(response => {
          const {message} = response
          this.$message.success(message)
          this.hasFollow = !this.hasFollow
          this.topicUser.followerCount = parseInt(this.topicUser.followerCount) + 1
        })

      },
      handleUnFollow: function (id) {
        this.$api.follow.unFollow(id).then(response => {
          const {message} = response
          this.$message.success(message)
          this.hasFollow = !this.hasFollow
          this.topicUser.followerCount = parseInt(this.topicUser.followerCount) - 1
        }).catch(error => {
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .author-box {
    background-color: var(--bg-topic);
    color: var(--primary-text);
    border-radius: 3px;
    padding: 20px;
  }
</style>
