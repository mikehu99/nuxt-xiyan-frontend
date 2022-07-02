<template>
  <div>
    <div class="box">🔔 {{ billboard.content }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
  import CardBar from "@/components/card/CardBar"
  import PostList from '@/components/post/Index'

  export default {
    components: {CardBar, TopicList: PostList},
    head() {
      return {
        title: "夕颜源码 - 专注于技术|源码分享的IT技术平台",
        meta: [
          {
            hid: "keywords",
            name: "keywords",
            content:
              "夕颜博客,夕颜源码,夕颜社区,夕颜技术社区,,夕颜IT社区,IT社区,技术社区,Java技术分享,Spring教程,开发者社区,Java毕设,Java博客,Java项目,Java源码,Vue博客,代码,教程,web编程,前端开发,后端开发",
          },
          {
            hid: "description",
            name: "description",
            content:
              "一个专注于技术|源码分享的IT技术平台，大家以共同学习，乐于分享，拥抱开源的价值观进行学习交流",
          },
        ],
      };
    },
    data() {
      return {
        billboard: {
          content: "",
        },
      };
    },
    async asyncData ({ $api }) {
      let data = await $api.billboard.getBillboard();
      console.log(data);
      return  {billboard:data};
    },
    methods:{
      getTag(){
        this.$api.article.getTagList().then((data) => {
          this.tagList = data;
        })
      }
    }
  };
</script>
