<template>
  <div class="action-row">
    <div class="action-box">
      <div class="tip">
        <div class="tip-box">
          <el-dropdown placement="bottom" @command="handleCommand">
            <span class="iconfont icon-gengduo1 tip-icon"></span>
            <!--<span class="el-icon-more tip-icon"></span>-->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled="">举报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="comment-action action">
        <div class="action-title-box" @click="detailPage(talk.id)">
          <span class="iconfont icon-pinglun3 bottom-icon"></span>
          <span class="action-title">{{talk.commentNum}}</span>
        </div>
      </div>
      <div class="like-action action">
        <div class="action-title-box" @click="praiseFuc()" v-preventReClick="1500"
             :style="{color:(praiseFlag?'#1e80ff':'#86909c')}">
          <span :class="[thumb,'bottom-icon']"></span>
          <span class="action-title">{{talk.praiseNum}}</span>
        </div>
      </div>
      <div class="share-action action">
        <div class="action-title-box">
          <el-dropdown placement="bottom-end" trigger="click" @command="handleCommand">
            <span class="iconfont icon-share bottom-icon"></span>
            <!--<span class="el-icon-more tip-icon"></span>-->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="weibo">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weibo2"></use>
                </svg>
                微博
              </el-dropdown-item>
              <el-dropdown-item command="weixin" class="weixin">
                <vue-qr class="qrCode" :text="url"></vue-qr>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin2"></use>
                </svg>
                微信
              </el-dropdown-item>
              <el-dropdown-item command="copy">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-lianjie7"></use>
                </svg>
                链接
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import urlencode from 'urlencode';

  export default {
    name: 'TalkHandle',
    props: {
      talk: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        praise: {},
        url: process.env.browserBaseUrl + '/talk/' + this.talk.id,
      }
    },
    computed: {
      ...mapGetters(['token', 'user', 'praiseList']),
      praiseFlag() {
        return this.praiseList.indexOf(this.talk.id) >= 0
      },
      thumb() {
        return this.praiseFlag ? 'iconfont icon-dianzan1-mianxing' : 'iconfont icon-dianzan1'
      }
    },
    methods: {
      detailPage(id) {
        let routeData = this.$router.resolve({path: `/talk/${id}`});
        window.open(routeData.href, '_blank');
      },
      praiseFuc() {
        if (this.token == null || this.token === '') {
          this.$message.success('该功能需要登录');
          return false;
        }
        this.praise.itemId = this.talk.id;
        this.praise.itemType = 1;
        this.praise.itemOwnerId = this.talk.userId;
        this.$api.praise.praiseItem(this.praise).then(data => {
          if (data.status === 1) {
            this.$message.success('点赞成功')
            this.talk.praiseNum++;
            this.$store.commit('common/praise', this.talk.id)
          }
          if (data.status === 0) {
            this.$message.success('取消点赞成功')
            this.talk.praiseNum--;
            this.$store.commit('common/praise', this.talk.id)
          }
          //后续样式变化
        }).catch(err => {
        });
      },
      handleCommand(command) {
        if (command == "copy"){
          if (process.client) {
            //使用textarea的原因是能进行换行，input不支持换行
            var copyTextArea = document.createElement("textarea");
            //自定义复制内容拼接
            copyTextArea.value = this.url;
            document.body.appendChild(copyTextArea);
            copyTextArea.select();
            try {
              var copyed = document.execCommand("copy");
              if (copyed) {
                document.body.removeChild(copyTextArea);
                //这里是封装的提示框，可以换成自己使用的提示框
                this.$message.success('复制成功')
              }
            } catch {
              this.$message.error('复制失败');
            }
          }
        }
        if (command == "weibo") {
          let target = 'https://service.weibo.com/share/share.php' +
            '?title='
            +urlencode(this.talk.title+'#翻趣#')
            +'&url='
            +urlencode(this.url);
          window.open(target,'_blank');
        }
        if (command == "qq") {
          let target = 'https://connect.qq.com/widget/shareqq/index.html' +
            '?url='
            +urlencode(this.url)
            +'&title='
            +urlencode(this.talk.title)
            +'&site='
            +'掘金';
          window.open(target,'_blank');
        }
      },
    },

  }

</script>
<style scoped>
  .icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.3em;
    fill: currentColor;
    overflow: hidden;
    margin-right: 10px;
  }

  .action-row {
    position: relative;
    margin: 12px 0 0 60px;
  }

  .action-box {
    display: flex;
    position: relative;
    color: #86909c;
    justify-content: space-between;
  }

  .tip {
    flex: 1 1 55%;
    justify-content: left;
  }

  .tip-icon {
    font-size: 20px;
    cursor: pointer;
    color: rgba(0, 0, 0, .3);
    padding: 2px 5px;
    margin-left: -5px;
  }

  .tip-icon:hover {
    color: #000;
    background: rgba(148, 108, 230, .05);
  }

  .action {
    margin-left: 20px;
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .action-title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .action-title-box .action-title {
    margin-left: 0.3em;
    font-size: 12px;
    font-weight: 400;
    display: inline-block;
  }

  .bottom-icon {
    font-size: 20px;
  }

  .bottom-icon:hover {
    color: #1E80FF;
  }

  .qrCode{
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: -104px;
  }
  .weixin:hover .qrCode{
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 600px) {
    .action-row {
      margin-left: 0rem;
      margin-right: 0rem;
    }
  }
</style>
