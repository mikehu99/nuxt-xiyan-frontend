<template>
  <header class="header has-background-white has-text-black">
    <b-navbar
      class="container is-white"
      :fixed-top="true"
    >
      <template slot="brand">
        <b-navbar-item tag="div">
          <img :src="doubaoImg" alt="logo">
        </b-navbar-item>

        <b-navbar-item
          class="is-hidden-desktop"
          tag="router-link"
          :to="{ path: '/' }"
        >
          主页
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/' }"
        >
          🌐 主页
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/youtuber/list' }"
        >
          youtuber
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/talk' }"
        >
          talk
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <b-field position="is-centered">
            <b-input
              v-model="searchKey"
              class="s_input"
              width="80%"
              placeholder="搜索帖子、标签和用户"
              rounded
              clearable
              @keyup.enter.native="search()"
            />

            <p class="control">
              <b-button
                class="is-info"
                @click="search()"
              >检索
              </b-button>
            </p>
          </b-field>
        </b-navbar-item>

        <b-navbar-item tag="div">
          <b-switch
            v-model="darkMode"
            passive-type="is-warning"
            type="is-dark"
          >
            {{ darkMode ? "夜" : "日" }}
          </b-switch>
        </b-navbar-item>

        <b-navbar-item
          v-if="token == null || token === ''"
          tag="div"
        >
          <div class="buttons">
            <button
              class="is-light"
              tag="router-link"
              @click="showRegisterModel"
            >
              注册
            </button>
            <button
              class="is-light"
              tag="router-link"
              @click="showLoginModel"
            >
              登录
            </button>
          </div>
        </b-navbar-item>

        <b-navbar-dropdown
          v-else
          :label="user.alias"
        >
          <b-navbar-item
            tag="router-link"
            :to="{ path: `/member/${user.id}/home` }"
          >
            🧘 个人中心
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
            tag="router-link"
            :to="{ path: `/member/setting` }"
          >
            ⚙ 设置中心
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
            tag="a"
            @click="logout"
          > 👋 退出登录
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
  </header>
</template>

<script>
  import {getDarkMode, setDarkMode} from '@/utils/auth'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        logoUrl: require('@/assets/logo.png'),
        doubaoImg: require('@/assets/image/doubao.png'),
        searchKey: '',
        darkMode: false
      }
    },
    computed: {
      ...mapGetters(['token', 'user'])
    },
    watch: {
      // 监听Theme模式
      darkMode(val) {
        if (val) {
          this.enableDarkMode({})
        } else {
          this.disableDarkMode()
        }
        setDarkMode(this.darkMode)
      }
    },
    mounted() {
      // 获取cookie中的夜间还是白天模式
      this.darkMode = getDarkMode()
      if (this.darkMode) {
        this.enableDarkMode({})
      } else {
        this.disableDarkMode()
      }
    },
    methods: {
      async logout() {
        this.$store.dispatch('user/logout').then(() => {
          this.$message.info('退出登录成功')
          setTimeout(() => {
            this.$router.push({path: this.redirect || '/'})
          }, 500)
        })
      },
      search() {
        console.log(this.token)
        if (this.searchKey.trim() === null || this.searchKey.trim() === '') {
          this.$message.info({
            showClose: true,
            message: '请输入关键字搜索！',
            type: 'warning'
          })
          return false
        }
        this.$router.push({path: '/search?key=' + this.searchKey})
      },
      showLoginModel() {
        this.$store.commit('common/setRegisterFlag', false);
        this.$store.commit('common/setLoginFlag', true);
      },
      showRegisterModel() {
        this.$store.commit('common/setLoginFlag', false);
        this.$store.commit('common/setRegisterFlag', true);
      }
    }
  }
</script>

<style scoped>
  input {
    width: 80%;
    height: 86%;
  }
</style>
