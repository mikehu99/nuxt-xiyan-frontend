<template>
  <header class="header">
    <div class="head-box head-container">
      <nuxt-link to="/" class="logo">翻趣</nuxt-link>
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="main-nav-list">
            <ul class="phone-hide">
              <li class="nav-item link-item">
                <nuxt-link to="/" :class="{'active':$route.path === '/'}">首页</nuxt-link>
              </li>
              <li class="nav-item link-item">
                <nuxt-link :to="{ path: '/ytber' ,query:{category:0}}"
                           :class="{'active':$route.path === '/ytber'}">油管
                </nuxt-link>
              </li>
              <li class="nav-item link-item">
                <nuxt-link to="/talk" :class="{'active':$route.path === '/talk'}">讨论</nuxt-link>
              </li>
            </ul>
          </li>
          <ul class="right-side-nav">
            <li v-show="token == null || token === ''" class="nav-item">
              <a  @click="showLoginModel">登录</a>
              <span style="margin: auto 5px">/</span>
              <a  @click="showRegisterModel">注册</a>
            </li>
            <li v-show="token != null && token !== ''" class="nav-item menu" @click="showDropDown">
              <img :src="user.avatar" class="avatar">
              <ul class="dropdown-ul pull-right" v-show="showDropDownMenu">
                <li>
                  <nuxt-link :to="`/member/${user.id}`"><i class="iconfont icon-geren1"/>个人中心</nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/member/setting`"><i class="iconfont icon-shezhi1"/>设置</nuxt-link>
                </li>
                <li>
                  <a v-show="!darkMode" @click="changeMode"><i class="iconfont icon-moon"/>深色主题</a>
                  <a v-show="darkMode" @click="changeMode"><i class="iconfont icon-taiyang-copy"/>浅色主题</a>
                </li>
                <li class="divider"></li>
                <li>
                  <nuxt-link :to="`/ytber/create`"><i class="iconfont icon-fenxiang2"/>分享</nuxt-link>
                </li>
                <li>
                  <a @click="logout"><i class="iconfont icon-dengchu"/>退出登录</a>
                </li>
              </ul>
            </li>
          </ul>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        logoUrl: require('@/assets/logo.png'),
        doubaoImg: require('@/assets/image/doubao.png'),
        searchKey: '',
        darkMode: false,
        showDropDownMenu: false
      }
    },
    computed: {
      ...mapGetters(['token', 'user']),
      getDarkMode(){
        return !(undefined === this.$cookies.get('dark_mode') || false === this.$cookies.get('dark_mode'));
      },
    },
    watch: {
      // 监听Theme模式
      darkMode(val) {
        if (val) {
          this.enableDarkMode({})
        } else {
          this.disableDarkMode()
        }
        this.setDarkMode(this.darkMode)
      }
    },
    async fetch() {
      var token = this.$cookies.get('u_token');
      if (token){
        this.$store.commit('user/SET_TOKEN_STATE', token);
        await this.$store.dispatch('user/getInfo');
      }else {
        this.$store.commit('user/SET_TOKEN_STATE', '');
        this.$store.commit('user/SET_USER_STATE', '');
      }
    },
    mounted() {
      console.log("cookie的token:"+this.$cookies.get('u_token'))
      console.log("token:"+this.token)
      // 获取cookie中的夜间还是白天模式
      this.darkMode = this.getDarkMode;
      if (this.darkMode) {
        this.enableDarkMode({})
      } else {
        this.disableDarkMode()
      }
      document.addEventListener('click', this.handlerClick)  // 监听 document 点击事件
    },
    beforeRouteLeave(to, from, next) {
      window.removeEventListener('click', this.handlerClick, true)
      next()
    },
    methods: {
      async logout() {
        this.$store.dispatch('user/logout').then(() => {
          this.$message.info('退出登录成功');
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
      },
      showDropDown() {
        console.log(this.showDropDownMenu);
        this.showDropDownMenu = !this.showDropDownMenu;
      },
      //点击编辑框外部区域关闭编辑框
      handlerClick(event) {
        if (event.target.classList.contains('menu')) {
          return;
        }
        var menu = document.getElementsByClassName('menu')[0];
        if (menu) {
          let isSelf = menu.contains(event.target);  // 这个是自己的区域
          if (!isSelf) {
            this.showDropDownMenu = false;
          }
        }
      },
      //切换日夜模式
      changeMode(){
        this.darkMode = !this.darkMode;
      },
      setDarkMode(mode){
        this.$cookies.set('dark_mode', mode, { maxAge: 60 * 60 * 24 * 365 ,path:"/"})
      },
      enableDarkMode(){
        document.querySelector('body').setAttribute('theme', 'dark')
        document.querySelector('html').setAttribute('theme', 'dark')
        document.querySelector('#app').setAttribute('theme', 'dark')
      },
      disableDarkMode(){
        document.querySelector('body').setAttribute('theme', 'light')
        document.querySelector('html').setAttribute('theme', 'light')
        document.querySelector('#app').setAttribute('theme', 'light')
      }
    },

  }
</script>

<style lang="less" scoped>
input {
  width: 80%;
  height: 86%;
}

  .head-box {
    display: flex;
    align-items: center;
    height: 100%;
    margin: auto;
  }

  .logo {
    margin-right: 1rem;
    display: inline-block;
    width: auto;
    font-size: 22px;
    letter-spacing: 3px;
    color: var(--primary-text);
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

  .nav-item.link-item {
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

  .nav-item > a:hover {
    border-bottom: 2px solid #007fff;
  }

  .active {
    color: #007fff;
    border-bottom: 2px solid #007fff;
  }

  .right-side-nav {
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
  }

  .avatar {
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

  .dropdown-ul {
    min-width: 115px;
    padding: 5px 0;
    position: absolute;
    background-color: var(--bg-topic);
    top: 4rem;
    left: 0;
    z-index: 1000;
    float: left;
    margin: 2px 0 0;
    font-size: 13px;
    list-style: none;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 12%), 0 1px 3px rgba(0 ,0, 0,  10%);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 12%), 0 1px 3px rgba(0 ,0, 0,  10%);
  }

  .dropdown-ul.pull-right {
    right: 0;
    left: auto;
  }

  .dropdown-ul > li > a {
    padding: 2px 10px;
    margin: 5px 0;
    border-radius: 3px;
    display: block;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    color: var(--secondary-text);
    white-space: nowrap;
  }

  .dropdown-ul > li > a:hover {
    color: #fff;
    background-color: #0c64eb;
  }

  .dropdown-ul i {
    width: 1.33rem;
    height: 1.33rem;
    margin-right: .8rem;
    font-size: 1.2em;
    vertical-align: middle;
  }

  .dropdown-ul > li.divider {
    margin: 10px;
  }

  .dropdown-ul .divider {
    height: 1px;
    margin: 9px 0;
    overflow: hidden;
    background-color: #eee;
  }

  .divider {
    border-left: 1px solid #e5e5e5;
  }
  .head-container {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
  }
</style>
