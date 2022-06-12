<template>
  <div id="app">
    <Header></Header>
    <!-- nuxt中使用局部刷新reload必须这样写，不然没有效果 -->
    <router-view v-if="isRouterALive"> <Nuxt /></router-view>
  </div>
</template>
<script>
  import Header from "@/components/Layout/Header";

export default {
  components: { Header},
  name: "app",
  data() {
    return { isRouterALive: true };
  }
};
</script>


