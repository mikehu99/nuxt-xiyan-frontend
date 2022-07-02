<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>🥂 推广</span>
    </div>
    <div>
      <p v-for="(item, index) in list" :key="index" class="block">
        <a :href="item.link" target="_blank">{{ item.title }}</a>
      </p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Promotion',
  data() {
    return {
      list: []
    }
  },
  async asyncData ({ $api }) {
    const data = await $api.promote.getList();
    console.log(data);
    return  {list:data};
  },
  methods: {
    fetchList() {
      getList().then((response) => {
        const { data } = response
        this.list = data
      })
    }
  }
}
</script>

<style scoped>
</style>
