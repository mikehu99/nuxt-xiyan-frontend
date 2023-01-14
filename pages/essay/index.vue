<template>
  <div class="main-container">
    <div class="user-view">
      <div class="content-area">
        <div class="home-post-module">
          <section class="article-list post-list-layout post">
            <ul class="article-ul">
              <li v-for="(essay,index) in essayList" :key="index" class="color-border">
                <article class="post-list-main color-border list post simple">
                  <div class="thumb" style="min-width: 30%; width: 30%;" v-if="essay.essay.headImg">
                    <nuxt-link target="_blank" :to="`/essay/${essay.essay.id}`" class="img-effect" :title="essay.essay.titleZh">
                      <img class="thumb lazyload" :src="essay.essay.headImg" :alt="essay.essay.titleZh"
                           width="600" height="338">
                    </nuxt-link>
                  </div>
                  <div class="list-content">
                    <nuxt-link target="_blank" :to="`/essay/${essay.essay.id}`" :title="essay.essay.titleZh" class="title">
                      <h3 style="-webkit-line-clamp: 2;">{{essay.essay.titleZh}}</h3>
                    </nuxt-link>
                    <div class="excerpt color-text">{{essay.essay.introduceZh}}</div>
                    <div class="post-metas color-meta">
<!--                      <span class="tooltip top author" title="文章作者">
                        <a>
                          <img class="avatar lazyload" :src="essay.source.coverUrl" :alt="essay.source.nameEn" width="18" height="18">
                          <b class="color-meta">{{essay.source.nameEn}}</b>
                        </a>
                      </span>-->
                      <span class="tooltip top category" title="文章分类">
                        <a class="color-meta">{{essay.type.typeName}}</a>
                      </span>
                      <span class="tooltip top date iconfont icon-date" title="发布日期">{{ essay.essay.createTime | timeFormat }}</span>
                      <span class="separate"></span>
<!--                      <span title="喜欢数量" class="tooltip top like iconfont icon-like">0</span>-->
<!--                      <span title="收藏数量" class="tooltip top collect iconfont icon-collect">0</span>-->
<!--                      <span class="tooltip top view iconfont icon-view" title="浏览数量">0</span>-->
<!--                      <span title="评分" class="tooltip top rate iconfont icon-rate">0</span>-->
                    </div>
                  </div>
                </article>
              </li>
            </ul>
          </section>
        </div>
        <!--分页-->
        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
          <div slot="spinner">
            <el-skeleton :rows="6" animated />
          </div>
          <div slot="no-more"></div>
        </infinite-loading>
      </div>
      <div class="side-area"></div>
    </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EssayIndex',
  head() {
    return {
      title: "翻趣",
      meta: [
        {
          name: "keywords",
          content: "翻趣社区,翻趣,新闻,新媒体,评论,油管,youtube,脸书,facebook,twitter,推特",
        },
        {
          name: "description",
          content: "翻趣社区，搜罗世界各地的有趣事情，打开视界，感受思想的碰撞。                                    ",
        },
      ],
    };
  },
  data() {
    return {
      infiniteId: +new Date(),
      query: {
        pageNo: 1,
        pageSize: 10
      },
      essayList:[],
    }
  },
  methods: {
    async infiniteHandler($state) {
      let data = await this.$api.essay.essayList(this.query);
      if (data.length) {
        this.query.pageNo += 1;
        this.essayList.push(...data);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },

}
</script>
<style lang="less">
.post-list-layout {
  padding: 20px;
}
.home-post-module{
  background:var(--bg-topic)
}
.post-list-layout {
  overflow: hidden;
}
.article-ul {
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(1, 1fr);
  justify-content: stretch;
  align-items: stretch;
}
.post-list-layout ul>li:not(:last-child) {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding-bottom: 12px;
}
.color-border {
  border-color: var(--color-basic-200);
}
.post-list-main.simple {
  display: flex;
  align-items: center;
}
.post-list-main.list div.thumb {
  margin-right: 12px;
  position: relative;
}
.img-effect {
  overflow: hidden;
  display: block;
}
.sidebar-module img {
  max-width: 100%;
  display: block;
  height: auto;
}
.img-effect img {
  display: block;
  width: 100%;
  height: auto;
}
.list-content {
  flex-grow: 1;
}
.color-text {
  color: var(--secondary-text);
}
.color-meta {
  color: var(--color-basic-800);
}
.list-content .post-metas, .list-content .excerpt {
  margin-top: 12px;
}
.list-content h3 {
  overflow: hidden;
  display: block;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  width: 100%;
}
h3 {
  font-size: 16px;
  line-height: 26px;
}
.post-metas {
  font-weight: 300;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  flex-wrap: wrap;
}
.post-metas span {
  margin-right: 12px;
  font-size: inherit;
  white-space: nowrap;
}
.tooltip {
  position: relative;
}
.post-metas span.separate {
  flex-grow: 1;
  margin: 0;
}
.post-metas img {
  width: 16px;
  height: 16px;
  display: inline-block !important;
  vertical-align: middle;
  border-radius: 100%;
  margin: 0 3px 2px 0;
}
.post-metas b {
  font-weight: 300;
  display: inline-block;
}
.post-metas span:last-child {
  margin-right: 0;
}
</style>
