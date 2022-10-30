<template>
  <div id="app">
    <Header></Header>
    <!-- nuxt中使用局部刷新reload必须这样写，不然没有效果 -->
    <div class="context">
    <router-view v-if="isRouterALive"> <Nuxt /></router-view>
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
  async fetch () {
    var token = this.$cookies.get('u_token');
    if (token){
      this.$store.commit('user/SET_TOKEN_STATE', token);
      await this.$store.dispatch('user/getInfo');
    }
  },
  data() {
    return { isRouterALive: true };
  }
};
</script>
<style>
.context{
  margin-top: 6rem;
}
</style>


