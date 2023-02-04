<template>
  <div class="ytb">
    <div>
      <span
      :style="{background: 'url(' + this.youtuber.banner + ') center center / cover no-repeat var(--bg-topic)',height:'205px'}"
      class="head-box">
        <div style="max-width:1200px" class="head-box-div">
          <div style="left:-8px;height:112px" class="head-box-div-div"></div>
        </div>
    </span>
      <div class="fn5v03">
        <div class="wJxZzl" style="max-width:984px">
          <!--头像 名字-->
          <div class="awL6gi">
            <img
              :src="youtuber.avatar"
              class="avatar-img u0UgpXN5r-VO6PP9OAViq"/>
            <div class="mayH8s">
              <div class="bQhFI7"><h1 class="name">{{youtuber.youtuberName}}</h1>
              </div>
            </div>
          </div>
          <!--选项-->
          <div class="_1gVVmSnHZpkUgVShsn7-ua _15Pk_bZ2XZNa9zBvnxq6HX" style="position: static; background: inherit;">
            <div class="_1_TJAX-8zAT3vVN1Iz7cys" style="max-width: 1200px;">
              <div>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                  <el-menu-item index="1">简介</el-menu-item>
                  <el-menu-item index="3" disabled>视频</el-menu-item>
                </el-menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ytb-container">
      <div class="user-view">
        <div class="content-area">
          <div class="ytb-breif">
            {{youtuber.description}}.
            <ul class="tag-list">
              <li v-for="category in youtuber.categories" @click="changeCategory(category.id)">
                <i class="iconfont icon-biaoqian biaoqian"/>{{category.categoryName}}
              </li>
            </ul>

          </div>

        </div>
        <div class="side-area">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    head() {
      return {
        title: this.youtuber.youtuberName + "_翻趣",
        meta: [
          {
            name: "keywords",
            content: this.youtuber.youtuberName + ",油管,youtuber,youtuber",
          },
          {
            name: "description",
            content: "在这里推荐你觉得值得推荐的youtuber吧！",
          },
        ],
      };
    },
    data() {
      return {
        youtuber: {},
        activeIndex: '1',
      }
    },
    computed: {
      ...mapGetters(['token', 'user']),
    },
    async fetch() {
      let data = await this.$api.youtuber.getYoutuber(this.$route.params.id);
      this.youtuber = data;
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      changeCategory(id) {
        this.$router.push({path: `/ytber`, query: {category: id}})

      },
    }
  }

</script>
<style lang="less" scoped>
  .ytb{
    min-height: calc(100vh - 182px);
    margin-top: -1rem;
  }
  .ytb-container {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
  }

  .detail-image {
    width: 20%;
    display: inline-block;
  }

  .detail-info {
    display: inline-block;
    max-width: 500px;
  }

  .head-box {
    display: block;
    -ms-flex-direction: row;
    flex-direction: row;
    margin: 0 auto;
    min-width: 260px;
    z-index: 3;
    width: 100%;
  }

  .head-box-div {
    height: 100%;
    margin: auto;
    position: relative;
    transform: translateY(-18px);
  }

  .head-box-div-div {
    ackground-position: 50%;
    background-repeat: no-repeat;
    background-size: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .fn5v03 {
    background-color: var(--bg-topic);
    display: block;
    width: 100%;
  }

  .wJxZzl, .awL6gi {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .wJxZzl {
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 984px;
    padding: 0 16px 0 24px;
  }

  .awL6gi {
    margin-bottom: 12px;
    margin-top: -14px;
  }

  .avatar-img {
    background-color: #fff;
    background-size: cover;
  }

  .avatar-img {
    border-radius: 100%;
    border: 4px solid #fff;
    display: inline-block;
    height: 72px;
    width: 72px;
  }

  .bQhFI7, .mayH8s {
    box-sizing: border-box;
  }

  .mayH8s {
    -ms-flex-align: start;
    align-items: flex-start;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex: 1;
    flex: 1;
    padding-left: 16px;
    margin-top: 24px;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: relative;
    width: calc(100% - 80px);
  }

  .bQhFI7 {
    display: inline-block;
    max-width: 500px;
    padding-right: 24px;
  }

  .name {
    color: var(--primary-text);
    display: inline-block;
    -ms-flex: 1;
    flex: 1;
    font-size: 28px;
    font-weight: 700;
    line-height: 32px;
    overflow: hidden;
    padding: 0 2px 4px 0;
    text-overflow: ellipsis;
    width: 100%;
  }

  button {
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: initial;
  }

  div._15Pk_bZ2XZNa9zBvnxq6HX {
    background: #ffffff;
    position: static;
    margin-left: -16px;
    margin-top: -4px;
  }

  ._1gVVmSnHZpkUgVShsn7-ua {
    margin: 0 auto;
    bottom: 0;
    left: 0;
    right: 0;
  }

  ._1_TJAX-8zAT3vVN1Iz7cys {
    -ms-flex-align: center;
    align-items: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin: 0 auto;
    min-width: 260px;
  }

  .input-box {
    background-color: #fff;
    display: flex;
    padding: 20px;
    border-radius: 2px;
    margin-bottom: 8px;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: relative;
    -o-object-fit: cover;
    object-fit: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    display: inline-block;
    position: relative;
    background-size: cover;
    background-color: #eee;
  }

  .input-div {
    flex: auto;
    margin-left: 20px;
    background-color: #f2f3f5;
    padding: 7px 12px;
    border-radius: 2px;
    color: #8a919f;
    cursor: pointer;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: .2px;
  }

  .input-div:hover {
    background-color: #ffffff;
    outline: 1px solid #0079d3;
  }

  .ytb-breif {
    background-color: var(--bg-topic);
    color:var(--primary-text);
    word-break: break-word;
    line-height: 1.6;
    font-size: 15px;
    padding: 20px 10px;
  }

  .biaoqian {
    margin-right: 10px;
    font-size: 12px;
  }

  .tag-list {
    margin-top: 10px;
    font-size: 12px;
    color: var(--secondary-text);
  }

  .tag-list li {
    cursor: pointer;
  }

  @media (min-width: 640px) {
    ._1_TJAX-8zAT3vVN1Iz7cys {
      padding: 0 16px;
    }
  }


</style>
