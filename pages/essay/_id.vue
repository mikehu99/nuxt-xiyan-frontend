<template>
  <div class="main-container">
    <div class="user-view">
      <div class="content-area">
        <section class="article-page">
          <article class="entry module-bg module-radius">
            <header class="post-header color-border">
              <h1> {{ essay.essay.titleZh }} </h1>
              <div class="post-metas color-meta">
                <span class="author">
                  <a href="https://westudying.com/user/74" title="东方">
                    <img class="avatar lazyload"
                         :src="essay.source.coverUrl"
                         :alt="essay.source.nameEn"
                         width="18" height="18">
                    <b class="color-meta">{{ essay.source.nameEn }}</b>
                  </a>
                </span>
                <span class="category">
                  <a href="https://westudying.com/category/reading"
                     class="color-meta">{{ essay.type.typeName }}</a></span>
                <span class="date">{{ essay.essay.createTime | timeFormat }}</span>
                <span class="separate"></span>
                <!--                <span class="view">362</span>-->
              </div>
            </header>
            <div class="content-post">
              <div v-for="section in essay.sectionList">
                <div v-if="section.sectionType===1">
                  <div class="langs_en">{{section.content}}</div>
                  <div class="langs_zh">{{section.transContent}}</div>
                </div>
                <p></p>
                <div align="center" v-if="section.sectionType===2">
                  <img :src="section.content" alt="500">
                  <figcaption>{{section.transContent}}</figcaption>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
      <div class="side-area"></div>
    </div>
  </div>
</template>
<script>
import Article from "@/pages/article";

export default {
  name: 'EssayDetail',
  components: {Article},
  async fetch() {
    const data = await this.$api.essay.essay(this.$route.params.id);
    this.essay = data;
  },
  data() {
    return {
      essay: {},
    }
  },
}
</script>
<style lang="less">
.module-bg {
  background-color:var(--bg-topic);
}

.entry {
  padding: 40px;
  margin-bottom: 20px;
  position: relative;
}

.module-radius {
  border-radius: 6px;
}

.color-border {
  border-color: var(--color-basic-200);
}

.post-header {
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

h1 {
  font-size: 26px;
  line-height: 32px;
  color: var(--primary-text);
}

.post-header .post-metas {
  margin-top: 12px;
}

.color-meta {
  color: var(--color-basic-800);
}

.post-metas span {
  margin-right: 12px;
  font-size: inherit;
  white-space: nowrap;
}

.post-metas img {
  width: 16px;
  height: 16px;
  display: inline-block !important;
  vertical-align: middle;
  border-radius: 100%;
  margin: 0 6px 2px 0;
}

.post-metas b {
  font-weight: 300;
  display: inline-block;
}

.post-metas span.separate {
  flex-grow: 1;
  margin: 0;
}

.post-metas span:last-child {
  margin-right: 0;
}

.content-post {
  line-height: 36px;
  font-size: 16px;
  font-weight: normal;
  text-align: justify;
  font-variant: normal;
  text-transform: none;
  text-decoration: none;
  letter-spacing: 0px;
  word-spacing: 0px;
  color: #333;
}
.content-post p {
  margin-bottom: 10px;
}
.langs_zh {
  color: #006200;
}
figcaption {
  text-align: center;
  color: var(--secondary-text);
  margin-bottom: 20px;
  font-size: .875em;
  line-height: 1.875em;
}
</style>
