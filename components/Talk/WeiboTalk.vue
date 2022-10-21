<template>
  <div class="item">
    <div class="topic">
      <div class="HjKIPg">
        <div class="XpwFHo">
          <span class="MNowkr">
            <span class="muncfL">
              <router-link :to="{path:`/member/${talk.userId}`}">
                <img class="avatar-img" :src="talk.avatar"/>
              </router-link>
            </span>
          </span>
          <div class="sFPAmX">
            <span>
              <router-link :to="{path:`/member/${talk.userId}`}" class="oTXgEq">
              {{talk.alias|talk.username}}
              </router-link>
            </span>
            <div class="meta-row">

              <a :href="'/talk/'+talk.id" target="_blank">
                <time>{{talk.createTime | timeFormat}}</time>
              </a>
              <div v-if="talk.location" class="dot">·</div>
              <div v-if="talk.location" class="location">{{locationText}}</div>

            </div>
          </div>
        </div>

        <div v-if="token" class="zgcSiu">
          <div v-if="talk.userId === user.id" class="TRwxMk">
            <el-dropdown>
              <div class="more-button el-dropdown-link">
                <i class="el-icon-arrow-down" style="font-size: 16px"></i>
                <el-dropdown-menu slot="dropdown">
                  <router-link :to="{name:'talk-edit',params: {id:talk.id}}">
                    <el-dropdown-item icon="el-icon-edit">编辑</el-dropdown-item>
                  </router-link>
                  <el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </div>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="NCrEND">
        <div class="content-box">
          <span class="content" v-html="title"></span>
        </div>
      </div>

      <div v-if="imgList.length>0">
        <PicList :imgs="imgList"></PicList>
      </div>
      <div v-if="talk.community!=null" class="community-row middle-row">
        <div class="community-box">
          <router-link :to="{path:'/community/'+talk.community.id}" class="community">
            <img class="community-avatar" :src="talk.community.avatar"/>
            <span>{{talk.community.communityName}}</span>
          </router-link>
        </div>
        <div data-v-489993b0="" style="flex: 1 1 auto;"></div>
      </div>
      <TalkHandle :talk="talk"></TalkHandle>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import EmojiList from "@/assets/js/emoji";

  import TalkHandle from "@/components/Talk/TalkHandle"
  import PicList from "@/components/Talk/PicList"

  import {showtime} from "@/assets/js/date"

  export default {
    name: 'WeiboTalk',
    components: {
      TalkHandle, PicList
    },
    props: {
      talk: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        fit: 'contain'
      }
    },
    filters:{
      timeFormat(value) {
        return showtime(value)
      },
    },
    computed: {
      ...mapGetters(['token', 'user','praiseList']),
      imgList() {
        if (this.talk.img) {
          return this.talk.img.split(',');
        } else {
          return [];
        }
      },
      title() {
        //标签
        var reg = /#.+?#/g;
        let weiboContent = this.talk.title.replace(reg, str => {
          let tagName = str.substring(1,str.length-1);
          console.log("tags");
          console.log(this.talk.tags);
          if (this.talk.tags!=null){
            let tag = this.talk.tags.filter(item => {
              return tagName === item.name;
            });
            if (tag.length>0){
              str = '<span onclick="tagTalkPage(' + tag[0].id + ')" contenteditable="false" id="' + tag[0].id + '" style="color: #1E80FF;">#' + tag[0].name + '#</span> ';
            }
          }
          return str;
        });
        //标签绑定点击时间
        if (process.client) {
          window.tagTalkPage = function (id) {
            console.log(id);
            if (this) {
              this.stopPropagation();
              this.preventDefault();
            } else {
              window.event.returnValue = false;
              window.event.cancelBubble = true;
            }
          }
        }

        //换行符
        weiboContent = weiboContent.replace(/[\n]/g, '<br>');

        //链接
        if (this.talk.link) {
          weiboContent += `<a href="${this.talk.link}" target="_blank" contenteditable="false" style="color: #1E80FF;margin-left: 5px"><i class="el-icon-link"/>${this.shortLink}</a>`
        }

        return weiboContent;
      },
      shortLink() {
        if (this.talk.link) {
          let url = this.talk.link.replace('https://', '')
            .replace('http://', '')
            .replace('www.', '');
          if (url.indexOf('/') !== -1) {
            url = url.substr(0, url.indexOf('/'));
          }
          return url;
        }
      },
      locationText() {
        console.log(this.talk.location);
        return this.talk.location.replace(/[,]/g, ' ')
      },
    },
  }
</script>
<style scoped>
  a {
    text-decoration: none;
    color: #909090;
  }

  .item {
    box-shadow: unset;
    transition: all .3s ease-in;
    margin-bottom: 8px;
  }

  .topic {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    position: relative;
  }

  .HjKIPg {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .XpwFHo {
    display: flex;
    align-items: center
  }

  .MNowkr {
    display: flex;
  }

  .sFPAmX {
    margin-left: 12px;
  }

  .oTXgEq {
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    color: #333;
  }

  .meta-row {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 24px;
    color: #8a919f;
    cursor: default;
  }

  .zgcSiu {
    display: flex;
  }

  .TRwxMk {
    margin-left: 16px;
    position: relative;
  }

  .more-button {
    margin-right: 6px;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    padding: 4px;
    cursor: pointer;
  }

  .NCrEND {
    position: relative;
    margin: 12px 0 0 60px;
  }

  .content-box {
    font-size: 14px;
    line-height: 1.6;
    color: #17181a;
    overflow: hidden;
  }

  .content {
    white-space: pre-line;
    font-size: 14px;
    color: #17181a;
    overflow: hidden;
    line-height: 1.6;
  }

  .community-row {
    margin-top: 12px;
    display: flex;
  }

  .community {
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 6px 2px 0px;
    background-color: #eaf2ff;
    font-size: 12px;
    line-height: 20px;
    color: #1e80ff;
    border-radius: 50px;
  }

  .community-avatar {
    display: inline-block;
    height: 20px;
    margin-right: 4px;
    vertical-align: middle;
    width: 20px;
    border-radius: 100%;
  }

  .middle-row {
    position: relative;
    margin: 12px 0 0 60px;
  }

  .location {
    max-width: 24rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dot {
    margin: 0 0.5em;
  }

  @media (max-width: 600px) {
    .NCrEND {
      margin-left: 0rem;
      margin-right: 0rem;
    }

    .middle-row {
      margin-left: 0rem;
      margin-right: 0rem;
    }

    .meta-row {
      font-size: 12px;
      line-height: 15px;
    }
  }

</style>
