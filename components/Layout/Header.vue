<template>
  <header class="header has-background-white has-text-black">
    <div class="head-box container">
      <nuxt-link to="/" class="logo">logo</nuxt-link>
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="main-nav-list">
            <ul class="phone-hide">
              <li class="nav-item link-item">
                <nuxt-link to="/" :class="{'active':$route.path === '/'}">首页</nuxt-link>
              </li>
              <li class="nav-item link-item">
                <nuxt-link :to="{ path: '/youtuber' ,query:{category:0}}" :class="{'active':$route.path === '/youtuber'}">油管</nuxt-link>
              </li>
            </ul>
          </li>
          <ul class="right-side-nav">
            <li v-if="token == null || token === ''" class="nav-item menu">

            </li>
            <li v-else class="nav-item menu">
                <img :src="user.avatar" class="avatar">
            </li>
          </ul>

        </ul>
      </nav>
    </div>
<!--    <b-navbar
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
          :to="{ path: '/youtuber' ,query:{category:0}}"
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
            :to="{ path: `/member/${user.id}`}"
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
    </b-navbar>-->
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
.head-box{
  display: flex;
  align-items: center;
  height: 100%;
  margin: auto;
}
.logo {
  margin-right: 1rem;
  display: inline-block;
  height: 22px;
  width: auto;
}

.main-nav {
  height: 100%;
  flex: 1 0 auto;
}

.nav-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  flex-direction: row-reverse;
  height: 100%;
  margin: 0;
}

.main-nav-list {
  display: flex;
  order: 99;
}

.phone-hide {
  display: flex;
}
.nav-item.link-item{
  padding: 0;
  height: 5rem;
}
.nav-item {
  color: #86909c;
  font-size: 1.167rem;
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.phone-hide .nav-item.link-item :not(.no-hover) {
  display: inline-block;
  height: 5rem;
  margin: 0 1rem;
  line-height: 5rem;
}
.nav-item a:hover{
  border-bottom: 2px solid #007fff;
}
.active{
  color: #007fff;
  border-bottom: 2px solid #007fff;
}
.right-side-nav{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100%;
  margin: 0;
  order: 0;
}
.nav-item.menu {
  position: relative;
  padding-left: 0;
  background-color: #fff;
}
.avatar{
  position: relative;
  -o-object-fit: cover;
  object-fit: cover;
  display: inline-block;
  background-size: cover;
  background-color: #eee;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
}
</style>
