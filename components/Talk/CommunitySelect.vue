<template>
  <el-tabs v-model="activeName" :tab-position="tabPosition" style="height: 200px; width: 360px" @tab-click="handleClick">
    <el-tab-pane label="推荐" name="default">
      <div v-for="advise in adviseLsit" class="media" @click="selectCommunity(advise)">
        <div class="media-left">
          <figure class="image is-24x24">
            <img :src="advise.avatar" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="subtitle  is-6">{{advise.communityName}}</p>
        </div>
      </div>
    </el-tab-pane>

    <el-tab-pane v-for="parentCommunity in parentCommunityList" :label="parentCommunity.communityName"
                 :name="parentCommunity.id">
      <div class="media-list">
        <div v-for="(community,index) in filterList" class="media" :key="index" @click="selectCommunity(community)">
          <div class="media-left">
            <figure class="image is-24x24">
              <img :src="community.avatar" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="subtitle  is-6">{{community.communityName}}</p>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  export default {
    name: 'CommunitySelect',
    props: {
      communityList: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        activeName: 'default',
        tabPosition: 'left',
        defaultCommunity: {
          id: '',
          communityName: '广场',
          avatar: 'http://localhost:8080/img/doubao.c92179fd.png'
        },
        filterList: []

      }
    },
    computed: {
      parentCommunityList() {
        return this.communityList.filter(item => {
          return item.parentId === '';
        })
      },
      adviseLsit(){
        let advise = [];
        advise.push(this.defaultCommunity);
        advise.push(...this.parentCommunityList);
        return advise;
      }
    },
    methods: {
      handleClick(tab) {
        this.filterList = [];
        let parentCommunity = this.parentCommunityList.filter(item => {
          return item.id === tab.name;
        });
        this.filterList.push(...parentCommunity);
        let community = this.communityList.filter(item => {
          return item.parentId === tab.name;
        });
        this.filterList.push(...community);
      },
      selectCommunity(community){
        this.$emit('selectCommunity', community)
      }
    },
    mounted() {
      console.log(this.parentCommunityList);
    }
  }
</script>
<style scoped>
  .media {
    cursor: pointer;
  }
  .media-list{
    max-height: 200px;
    overflow-y: auto;
  }
  .media-list::-webkit-scrollbar-thumb {
    background-color: #49b1f5;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.4) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.4) 75%,
      transparent 75%,
      transparent
    );
    border-radius: 2em;
  }
</style>