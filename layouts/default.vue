<template>
  <div id="app" :theme="theme">
    <Header></Header>
    <!-- nuxt中使用局部刷新reload必须这样写，不然没有效果 -->
    <div class="context">
      <router-view v-if="isRouterALive"><Nuxt /></router-view>
    </div>
    <!--登入框-->
    <div>
      <Login></Login>
    </div>
    <!--注册框-->
    <div>
      <Register></Register>
    </div>
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
  import Header from "@/components/Layout/Header";
  import Footer from "@/components/Layout/Footer";
  import Login from "@/components/User/Login";
  import Register from "@/components/User/Register";

export default {
  components: { Header, Footer ,Login,Register},
  name: "app",
  beforeCreate() {
    var dark = !(undefined === this.$cookies.get('dark_mode') || false === this.$cookies.get('dark_mode'));
    var theme = dark?'dark':'light';
    //这里不能把值赋给this.theme,不然会在渲染之后生效
    if (process.client){
      document.querySelector('html').setAttribute('theme', theme)
      document.querySelector('body').setAttribute('theme', theme)
    }
  },
  async fetch () {
    console.log("defaul fetch 执行")
    var dark = !(undefined === this.$cookies.get('dark_mode') || false === this.$cookies.get('dark_mode'));
    this.theme = dark?'dark':'light'
  },
  data() {
    return { isRouterALive: true ,theme:''};
  }
};
</script>
<style>
.context{
  padding-top: 6rem;
}
div[theme='dark']{
  background-color: #131415;
}
</style>


