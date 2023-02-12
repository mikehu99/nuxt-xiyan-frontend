<template>
  <div class="main-container">
    <div class="user-view">
      <div class="content-area">
        <section class="article-page">
          <div class="head-img" v-if="essay.headImg">
            <img :src="essay.headImg">
          </div>
          <article class="entry module-bg module-radius">
            <header class="post-header color-border">
              <h1> {{ essay.titleZh }} </h1>
              <div id="post-meta">
                <div class="post-meta-row">
                  <ul class="post-meta color-meta">
                    <li>
                      <div class="post-list-cat  b2-radius">
                        <a target="__blank" href="" class="post-list-cat-item b2-radius"
                           style="color: rgb(96, 125, 139);">
                          {{ type.typeName }}
                        </a>
                      </div>
                    </li>
                    <li class="single-date">
                      <span>
                        <time :datetime="essay.createTime" itemprop="datePublished"
                              class="b2timeago">{{ essay.createTime | timeFormat }}</time>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </header>
            <div class="content-post">
              <div v-for="section in sectionList">
                <div v-if="section.sectionType===1">
                  <div class="langs_en display-in-widescreen" @mouseup="handleMouseUp($event)">{{
                      section.content
                    }}
                  </div>
                  <div class="langs_en display-in-mobile" @click="mobileTranselate($event)"
                       v-html="wordHtml(section.content)"></div>
                  <div class="langs_zh" @mouseup="hideTip">{{ section.transContent }}</div>
                </div>
                <p></p>
                <div align="center" v-if="section.sectionType === 2">
                  <img :src="section.content" alt="500">
                  <figcaption>{{ section.transContent }}</figcaption>
                </div>
              </div>
              <p><em>本文译自 <a :href="source.officialWebsite" target="_blank">{{ source.nameEn }}</a></em></p>
            </div>
          </article>
        </section>
        <div id="tip" class="dict-picker-tips" style="position: absolute;">
          <span class="tips-search" @click="transWord($event)">查词</span>
          <span class="tips-copy">复制</span>
        </div>
        <div id="meaning" class="dict-picker" style="position: absolute;">
          <audio hidden="" id="dict-picker-audio"></audio>
          <div class="dict-picker-header">
            <h2>翻趣划词释义</h2>
            <div class="dict-picker-header-control">
              <div class="dict-picker-header-close" @click="hideTip"></div>
            </div>
          </div>
          <div class="dict-picker-content" v-loading="apiResultCode === -1" element-loading-background="var(--bg-app)">
            <div class="dict-picker-langs" v-if="apiResultCode === 0">
              <div class="dict-picker-word"><h2>{{ word.query }}</h2></div>
              <div class="dict-picker-langs-pronounces" v-if="word.isWord">
                <div>
                  <span>英</span>
                  <span class="pronounce-en">{{ word.basic['uk-phonetic'] }}</span>
                  <span class="dict-picker-audio" @click="bofangUk"></span>
                  <audio ref="audioUk" :src="word.basic['uk-speech']" controls="controls" hidden="true"></audio>
                </div>
                <div>
                  <span>美</span>
                  <span class="pronounce-en">{{ word.basic['us-phonetic'] }}</span>
                  <span class="dict-picker-audio" @click="bofangUs"></span>
                  <audio ref="audioUs" :src="word.basic['us-speech']" controls="controls" hidden="true"></audio>
                </div>
              </div>
              <div v-if="word.isWord" class="dict-picker-langs-definitions">
                <div v-for="explain in word.basic.explains">
                  <p>{{ explain }}</p>
                </div>
              </div>
              <div v-else class="dict-picker-langs-definitions">
                <div v-for="translation in word.translation">
                  <p>{{ translation }}</p>
                </div>
              </div>
            </div>
            <div class="dict-picker-not-include" v-if="apiResultCode === 1">
              <p>
                <span class="iconfont icon-biaoqing"></span>
                <span>该词未被收录，我们会尽快完善</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="side-area"></div>
    </div>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'

export default {
  name: 'EssayDetail',
  head() {
    return {
      title: this.essay.titleZh,
      meta: [
        {
          name: "keywords",
          content: "翻趣社区,翻趣,新闻,新媒体,评论,油管,youtube,脸书,facebook,twitter,推特",
        },
        {
          name: "description",
          content: this.essay.introduceZh,
        },
      ],
    };
  },
  async fetch() {
    const data = await this.$api.essay.essay(this.$route.params.id);
    this.essay = data.essay;
    this.source = data.source;
    this.type = data.type;
    this.sectionList = data.sectionList;
  },
  data() {
    return {
      essay: {},
      source: {},
      type: {},
      sectionList: [],
      word: {
        'basic': {}
      },
      apiResultCode: -1,
    }
  },
  methods: {
    handleMouseUp(ev) {
      let tip = document.getElementById("tip");
      tip.style.display = 'none';
      let meaning = document.getElementById("meaning");
      meaning.style.display = 'none';
      this.initWord();
      let text = window.getSelection().toString()
      if (!text) {
        return;
      }
      if (!text.replace(/\s/g, "")) {
        return;
      }
      var oEvent = ev || window.event;
      tip.style.left = oEvent.pageX - 35 + 'px';  // 指定创建的DIV在文档中距离左侧的位置
      tip.style.top = oEvent.pageY + 20 + 'px';  // 指定创建的DIV在文档中距离顶部的位置
      tip.style.display = 'block';
    },
    showMeaning(ev) {
      let meaning = document.getElementById("meaning");
      var oEvent = ev || window.event;
      meaning.style.left = oEvent.pageX - 35 + 'px';  // 指定创建的DIV在文档中距离左侧的位置
      meaning.style.top = oEvent.pageY + 20 + 'px';  // 指定创建的DIV在文档中距离顶部的位置
      meaning.style.display = 'block';
    },
    showMeaningMobile() {
      let meaning = document.getElementById("meaning");
      meaning.style.position = 'fixed';
      meaning.style.left = '0px';  // 指定创建的DIV在文档中距离左侧的位置
      meaning.style.bottom = '0px';  // 指定创建的DIV在文档中距离底部的位置
      meaning.style.display = 'block';
      meaning.style.width = '100%';
    },
    hideTip() {
      let tip = document.getElementById("tip");
      tip.style.display = 'none';
      let meaning = document.getElementById("meaning");
      meaning.style.display = 'none';
      this.initWord();
    },
    reloadTips() {
      let tip = document.getElementById("tip");
      tip.parentNode.removeChild(tip);
      document.body.appendChild(tip);

      let meaning = document.getElementById("meaning");
      meaning.parentNode.removeChild(meaning);
      document.body.appendChild(meaning);
    },
    truncate(q) {
      var len = q.length;
      if (len <= 20) return q;
      return q.substring(0, 10) + len + q.substring(len - 10, len);
    },
    transWord(ev) {
      let text = window.getSelection().toString()
      if (!text) {
        return;
      }
      if (!text.replace(/\s/g, "")) {
        return;
      }
      let tip = document.getElementById("tip");
      tip.style.display = 'none';
      this.translate(text.trim());
      this.showMeaning(ev);
    },
    translate(word) {
      var appKey = '64d11511ff3dcb80';
      var key = this.encode("UeSDs2NoWAVp1Eq5S9vENVGEK3F41az5");//注意：暴露appSecret，有被盗用造成损失的风险
      var salt = (new Date).getTime();
      var curtime = Math.round(new Date().getTime() / 1000);
      var query = word;
      // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
      var to = 'zh-CHS';
      var from = 'en';
      var str1 = appKey + this.truncate(query) + salt + curtime + this.decode(key);
      var vocabId = '您的用户词表ID';
      //console.log('---',str1);
      var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
      this.$axios.jsonp(
        'https://openapi.youdao.com/api',
        {
          q: query,
          appKey: appKey,
          salt: salt,
          from: from,
          to: to,
          sign: sign,
          signType: "v3",
          curtime: curtime,
          vocabId: vocabId,
        }
      ).then(res => {
        console.log(res);
        this.word = res;
        if (res.errorCode === "0") {
          this.apiResultCode = 0;
        } else {
          this.apiResultCode = 1;
        }
      }).catch(err => {
        this.apiResultCode = 1;
        console.log(err)
      });
    },
    encode(str) {
      var encodedWord = CryptoJS.enc.Utf8.parse(str);
      var encoded = CryptoJS.enc.Base64.stringify(encodedWord);
      return encoded;
    },
    bofangUk() {
      this.$refs.audioUk.play();
    },
    bofangUs() {
      this.$refs.audioUs.play();
    },
    decode(encoded) {
      var encodedWord = CryptoJS.enc.Base64.parse(encoded);
      var decoded = CryptoJS.enc.Utf8.stringify(encodedWord);
      return decoded;
    },
    initWord() {
      this.word = {
        'basic': {}
      };
      this.apiResultCode = -1;
    },
    wordHtml(oldHtml) {
      return oldHtml.replace(/\b(\w+?)\b/g, '<span class="word">$1</span>')
    },
    mobileTranselate(event) {
      var text = event.target.innerHTML;
      if (text.length > 20) {
        return;
      }
      if (!text) {
        return;
      }
      if (!text.replace(/\s/g, "")) {
        return;
      }
      if (text.indexOf(',') > 0) {
        return;
      }

      let tip = document.getElementById("tip");
      tip.style.display = 'none';
      this.translate(text.trim());
      this.showMeaningMobile();
    }
  },
  mounted() {
    setTimeout(() => {
      this.reloadTips();
    }, 1000);
  }
}
</script>
<style lang="less">
.module-bg {
  background-color: var(--bg-topic);
}

.entry {
  padding: 20px;
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
  margin-bottom: 12px;
}

.color-meta {
  color: var(--color-basic-800);
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

.dict-picker-tips {
  z-index: 2000;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 6px 12px;
  background: var(--bg-app);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 10%), 0 0 1px 0 rgba(0, 0, 0, 30%);
  border-radius: 4px;
  display: none;
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

.dict-picker {
  z-index: 2000;
  width: 400px;
  background: var(--bg-app);
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 20%), 0 0 1px 0 rgba(0, 0, 0, 30%);
  display: none;
}

.dict-picker-header {
  font-size: 13px;
  padding: 14px 19px;
  border-bottom: 1px solid #eee;
}

.dict-picker-header h2 {
  line-height: 18px;
  font-size: 13px;
  display: inline-block;
  margin: 0;
  color: var(--secondary-text);
  font-weight: normal;
}

.dict-picker-header-control {
  float: right;
  height: 18px;
}

.dict-picker-header-control div {
  float: right;
}

.dict-picker-content {
  overflow: auto;
  max-height: 800px;
  min-height: 100px;
  font-size: 14px;
  padding: 12px 19px 19px;
}

.dict-picker-word {
  margin-bottom: 4px;
}

.dict-picker-word h2 {
  margin: 0;
  line-height: 33px;
  font-size: 24px;
  color: var(--primary-text);
  font-weight: normal;
  display: inline-block;
}

.dict-picker-langs-pronounces {
  margin-bottom: 25px;
}

.dict-picker-langs-pronounces div:first-child {
  margin-right: 24px;
}

.dict-picker-langs-pronounces div {
  display: inline-block;
}

.dict-picker-langs-pronounces span {
  color: var(--secondary-text);
}

.dict-picker-langs-pronounces .pronounce-en {
  font-family: 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.dict-picker .dict-picker-audio {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  vertical-align: middle;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAAA0CAYAAAB/91HOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZDg2NTg3NC04Mzg3LTQ1MGItYmY3My0xODVlMTgwZWZlMjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDIyNzg4MDRCMEFGMTFFN0I2N0ZGQkVCRDRBNkU4RUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDIyNzg4MDNCMEFGMTFFN0I2N0ZGQkVCRDRBNkU4RUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplNDU0MTcwYi02NzIwLTRjOGMtOTYxNy05M2Q1OWFiNzA3NTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M2Q4NjU4NzQtODM4Ny00NTBiLWJmNzMtMTg1ZTE4MGVmZTI1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ArAG/QAABIxJREFUeNrsnV1oHFUYhr8zu+ScVF2NEDBGsYogVi+SqghWsKSCF1LBCL3yQqmo6V6JV70ogSLUK/FmU1EsXnghqBFREMG/ohb8qa2IiiKkYBqFgG3TYmeS3fn8TpqU2TG7O5NkZs4m7wsfc/bkMJln5z2/MydRzEwQlJc8fAUQDAfBcBAEw0EwHATBcBAMB21OlZMUuvtVou+fJho+HBCHTKwUUWT9TitDW/uJfp/1iUmR5zEN3GRoZkrKS1o1pHjFXFG5QD1fjtHZoYl57tvWQzt3Eo0XAJ0lTyeNbzAeq8ma3/JnP1ZN7i3ciMRX6nxwbi70/xmq+dPy+UBSszso8DjapWqJw9SgT6Wu7WDmks2U9PXM4cEzvwSTXdalgyevLnUV2np6KnhHmvW7WhUQwN3v1fwnxqvmSBfcnMQ8kmzLMx7rYrqdJ+2D0Sxq5O4wVD/8D0YpGVqof5vzaG8XmC0dj1o8to5NzrOehrNN8iGJ9wWmr5lF/VFW3j3cw3c21w51u8NGWxWPHZS3DAbPenWp1/02678lV/FAvJEVmElztX5yYW5hboV2u89Rs4EnI540LZxtQGXyTd9InF/qvhcjYP+vSzDRwqquPPW8JB+TuAQTOHUTwFMAT9IWbmCoFrzJxCNLzm9Prui0otIepsax5bx62HDp5oAnOx5eoSKkauFUfSEC07G0+sTrNcOSOuZo9wKeAnk6Gm54wn8qMYxodJ9+SA6z0byLZ31n7g54iuXpaDhpH/fGashHvdrc2GZiHMbWc5xqDsBTLE+5M5C6I9ota9LPyGG6Vfmm52oObpcAT7E8nScNzFfGcv6kblb+PG0H0ZuNJ/U6nEyxXVsOWJPA49ikAYJgOAiGgyAYDoLhIBgOgmA4CIZbVK82pEpmw3wB4HHNcEpdiOXc0NV3BDxuG04R/xz97M8Hr8hhsFX50aqh0hZDnirbt0nduz858diyS/F2NDYaz3J+UpUT/KIjzHzv8mdJP0wNf7qDicPohbr0hkUBPHvAk6KFOzGmX5OL+jzpCScngo/l0N80rrjGnTFFXjx5VTIXeNKwJpk0sGf049JwfpHojMwPhhf9E5K6z9FhBHgK5Ek6S505WdUjylNj0lt/u8JANcZEg8yNo5J87nLf7ZVcukm58OQ4lCiMJy1jmmURe2Y7ILXjhasosh1WKzMgqaPNhbksF/OSJN+VqNg87Tk1iQBPNjxtt0qv18Lv37f1m10y/nzR7uCO1YBR/1xwXJJ2p/ctsRHvGUe7qdXz2BlbJBg8mRjOyu4z2688eiRuJIG6tc7hd/NMP8Wm9L86vGS0Kp6V9qg78m66EzxZPNr60PN4u0Adj3X2SsC2xDqB18l9peO5vP04Hgweyu6vJ50avFnvmJkKXhaIZ1usH33w6D79BnWHwNNqmaWWbothlg/v7Zv1Y1SiXdL7fy0AjaUR5Ywi70DfNj1KsS1rjgs8OS6LrEWfSdxfLutKxTPXnqwa+6zvBYk6dafAs5YpLP7XFpSn8D4cBMNBMBwEwXAQDAdBMBwEw0GbVP8JMAAdIoU8hRXz0AAAAABJRU5ErkJggg==) no-repeat -40px 0/auto 100%;
}

.dict-picker-langs-definitions {
  margin-bottom: 25px;
}

.dict-picker-langs-definitions div {
  margin-bottom: 20px;
}

.dict-picker-langs-definitions h3 {
  color: var(--secondary-text);
  font-size: 14px;
  margin: 0;
  font-weight: normal;
  line-height: 24px;
}

.dict-picker-langs-definitions p {
  margin: 0;
  line-height: 24px;
  color: var(--primary-text);
}

.dict-picker-header-close {
  width: 12px;
  height: 12px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAkxJREFUWAm12D9PwkAUAHCLCV2IJpAQNr4AM7uamICTC3HoRNiMfgX9CrrAwNiBsLjB5Adwx9WEzcTQoZuDwfeavuZarr1/jy7HXe/e/dL70yveiXBNp9NnyPa73e7tcDj8FW6x/oR+XiBgu9VqBaPR6E8M7lEmxTyl+fWxUCnmMe1nUUQloAKGjOyoAob6yaG8EgxVZkOVYKifDFWDkj6VStLBdrt9W61WvuSedtFsNnuFyjRMsna9OI7P8UYN5wqka1mttMwJhU9mv98/VMTf+L5/OZlMIqyTzCF8AvgkID+oaGg8fIphwq4SzHg8/qF+s1XGjbLBICoDYYYLZYs5AHGgXDBSkAvKFVMKskFxYCpBJijP875gad9jm5LrYDWV1MtPalklzYkua0pl2hhskFtlFKGYOqCMMNogrGiBMsYYgUxQMKc+6/X6hbgDY3udC1+u2hce2nACqxrABP/udDqxqp7svhEIl7ZiNVEfV7anBK1Jjb1o7DOEEVPjF7IWyBJDMCOUcshUGJzA0PM79S5Jjc5TlSAVBjrf4GqCQ94N/GY55JUOmQ4GT3q0tDX3KeXwSUGmGBomDtQByBbDhcqBXDEcqAzEhXFFJSBujAsKv1zxw7/qI87qrW2Lwn2oTY0lqRMG4+ELWfUxCptrM4qi5Ou4hv8+QLvFMTAUswoFmI9Go3EdBEFyOkjm0HK5PN3tdiEEuEuDOD8ZwohpcZ8qYrButsoEVE/cgcWAHL8JhcMkPhlpbETN5/Om9CZjIaLCMDxjDHm8UP9p4LIoErrb4QAAAABJRU5ErkJggg==) 0 0/contain;
  margin: 3px 0 3px 30px;
  cursor: pointer;
}

.dict-picker-not-include p {
  margin: 20px 0;
  line-height: 40px;
  text-align: center;
}

.head-img img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border: 0;
  vertical-align: text-top;
}

.post-meta-row {
  display: flex;
  justify-content: space-between;
}

.entry-header .post-meta {
  justify-content: initial;
}

.post-meta, .post-meta-left {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.post-meta li {
  margin-right: 24px;
  list-style: none;
}

.single .post-list-cat {
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  flex-flow: wrap;
}

.b2-radius {
  border-radius: 5px;
}

.post-list-cat {
  font-size: 12px;
}

.post-list-cat a:first-child {
  display: block;
}

.post-list-cat a {
  height: 30px;
  line-height: 30px;
  padding: 0 16px;
  font-weight: 500;
  background-color: rgba(0, 132, 255, 0.1);
  color: #0084ff !important;
}

.post-meta li {
  margin-right: 24px;
  list-style: none;
}

.post-meta li span {
  margin: 0;
}

.post-meta li span {
  color: #8590A6;
}

.post-meta li span {
  margin-left: 0;
  margin-right: 10px;
  display: flex;
  line-height: 1;
}

.b2timeago {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-meta li span {
  color: #8590A6;
}

@media screen and (max-width: 768px) {
  .entry {
    padding: 20px 10px;
  }
}
</style>
