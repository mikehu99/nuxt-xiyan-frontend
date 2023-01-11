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
                  <div class="langs_en" @mouseup="handleMouseSelect($event)">{{ section.content }}</div>
                  <div class="langs_zh" @mouseup="canselMouseSelect($event)">{{ section.transContent }}</div>
                </div>
                <p></p>
                <div align="center" v-if="section.sectionType===2">
                  <img :src="section.content" alt="500">
                  <figcaption>{{ section.transContent }}</figcaption>
                </div>
              </div>
            </div>
          </article>
        </section>
        <div id="tip" class="dict-picker-tips" style="position: absolute;">
          <span class="tips-search">查词</span>
          <span class="tips-copy">复制</span>
        </div>
      </div>
      <div class="side-area"></div>
    </div>
  </div>
</template>
<script src="https://cdn.bootcdn.net/ajax/libs/crypto-js/4.0.0/crypto-js.js"></script>
<script>
import CryptoJS from 'crypto-js'

export default {
  name: 'EssayDetail',
  async fetch() {
    const data = await this.$api.essay.essay(this.$route.params.id);
    this.essay = data;
  },
  data() {
    return {
      key:"UeSDs2NoWAVp1Eq5S9vENVGEK3F41az5",
      essay: {},
      youdaoJson:{
        q: '',
        appKey: '64d11511ff3dcb80',
        salt: '',
        from: 'en',
        to: 'zh-CHS',
        sign: '',
        signType: "v3",
        curtime: '',
        vocabId: '您的用户词表ID'
      }
    }
  },
  methods: {
    handleMouseSelect(ev) {
      let tip=document.getElementById("tip");
      tip.style.visibility = 'hidden';
      let text = window.getSelection().toString()
      if (!text){
        return;
      }
      if (!text.replace(/\s/g,"")){
        return;
      }
      var oEvent = ev || window.event;
      tip.style.left = oEvent.pageX-35 + 'px';  // 指定创建的DIV在文档中距离左侧的位置
      tip.style.top = oEvent.pageY+20 + 'px';  // 指定创建的DIV在文档中距离顶部的位置
      tip.style.visibility = 'visible';
    },
    canselMouseSelect(){
      let tip=document.getElementById("tip");
      tip.style.visibility = 'hidden';
    },
    reloadTips(){
      console.log(document);
      let tip=document.getElementById("tip");
      console.log(tip);
      tip.parentNode.removeChild(tip);
      document.body.appendChild(tip);
    },
    truncate(q){
      var len = q.length;
      if(len<=20) return q;
      return q.substring(0, 10) + len + q.substring(len-10, len);
    },
    translate(word){
      this.youdaoJson.q = word;
      this.youdaoJson.salt = (new Date).getTime();
      this.youdaoJson.curtime = Math.round(new Date().getTime()/1000);
      var str1 = this.youdaoJson.appKey + this.truncate(word) + this.youdaoJson.salt + this.youdaoJson.curtime + this.youdaoJson.key;
      this.youdaoJson.sign =  CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
      this.$axios.post(
        '/transword',
        this.youdaoJson
      );
    }
  },
  mounted() {
    setTimeout(() => {
      this.reloadTips();
    }, 1000);
   this.translate("hello");
  }
}
</script>
<style lang="less">
.module-bg {
  background-color: var(--bg-topic);
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
.dict-picker-tips{
  z-index: 2000;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 6px 12px;
  background: var(--bg-app);
  box-shadow: 0 0 5px 0 rgba(0 ,0, 0, 10%), 0 0 1px 0 rgba(0, 0, 0, 30%);
  border-radius: 4px;
  visibility:hidden;
}
.dict-picker-tips::before {
  content: '';
  display: block;
  left: 30px;
  top: -5px;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  background: var(--bg-app);
  position: absolute;
}
.dict-picker-tips::after {
  content: '';
  display: block;
  left: 25px;
  top: 0;
  width: 20px;
  height: 10px;
  background: var(--bg-app);
  position: absolute;
}
.dict-picker-tips .tips-search {
  padding-right: 10px;
  border-right: 1px solid var(--color-basic-200);
}
.dict-picker-tips .tips-copy {
  padding-left: 10px;
  margin-left: -5px;
}
.dict-picker-tips .tips-search, .dict-picker-tips .tips-copy {
  font-size: 14px;
  color: var(--secondary-text);
  cursor: pointer;
  line-height: 20px;
}
</style>
