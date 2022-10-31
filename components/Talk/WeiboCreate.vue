<template>
  <div>
    <div class="editor-dialog">
      <div class="editor-body">
        <div class="content">
          <div class="editor">
            <div class="auth-card">
              <textarea
                id="weibo-input"
                ref="myeditor"
                class="rich-editor"
                v-model="weibo.title"
                placeholder="快来一起分享新鲜事！">
              </textarea>
            </div>
          </div>
          <div class="topicwrapper">
          <span style="display: flex;">
     <!--       <el-popover
              placement="bottom-start"
              width="360"
              trigger="click">
              <CommunitySelect :communityList="communityList" @selectCommunity="selectCommunity"></CommunitySelect>
            <div slot="reference" class="new_topic" @click="initCommunity">
              <i style="margin-right: 4px;" class="iconfont icon-quanzi2"/>{{communityNameTemp}}
            </div>
            </el-popover>-->
            <el-popconfirm
              v-if="weibo.location"
              title="您确定要隐藏定位吗？"
              @confirm="deleteLocation"
            >
            <div slot="reference" class="new_topic">
              <i style="margin-right: 4px;" class="iconfont icon-dingwei1"/>{{weibo.location}}
            </div>
            </el-popconfirm>
          </span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="toolbar">
          <div class="tool">
            <el-popover
              placement="bottom-start"
              width="300"
              trigger="click">
              <Emoji @addEmoji="addEmoji"/>
              <div slot="reference" class="picker emojipicker" style="position: relative">
                <i class="iconfont icon-biaoqing"/><span>表情</span>
              </div>
            </el-popover>
            <div class="picker filepicker" @click="uploadImgClik()">
              <i class="iconfont icon-tupian2"/><span>图片</span>
            </div>
            <div class="picker linkpicker" @click="showUrl=!showUrl">
              <i class="iconfont icon-lianjie1"/><span>链接</span>
            </div>
      <!--      <el-popover
              placement="bottom-start"
              width="200"
              heigh="200"
              trigger="click">
              <ul class="tag-list">
                <li v-for="item in tagList" @click="selectTag(item.id)">#{{item.name}}</li>
              </ul>
              <div slot="reference" class="topicpicker picker" @click="initTagList">
                <i class="el-icon-collection-tag"/><span>话题</span>
              </div>
            </el-popover>-->

          </div>
          <div class="submit">
            <el-button size="small" type="primary" @click.native="createWeibo">发布</el-button>
          </div>
        </div>
        <!--图片-->
        <el-upload
          :action="action"
          :headers="headers"
          list-type="picture-card"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <!--链接-->
        <b-field v-if="showUrl" style="width:100%">
          <b-input v-model="weibo.link" placeholder="URL" type="url"></b-input>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
  import Emoji from "@/components/Emoji";
  import CommunitySelect from "@/components//Talk/CommunitySelect";
  import {mapGetters} from 'vuex';


  export default {
    name: 'WeiboCreate',
    components: {
      Emoji, CommunitySelect
    },
    props: {
      communityId: {
        type: String,
        default: ''
      },
      communityName: {
        type: String,
        default: '广场'
      }
    },
    data() {
      return {
        action:process.env.baseUrl+"/oss/uploadImageOrVideo",
        headers:{
          Authorization:'Bearer ' + this.$cookies.get("u_token")
        },
        communityIdTemp: this.communityId,
        communityNameTemp: this.communityName,
        dialogImageUrl: '',
        dialogVisible: false,
        showUrl: false,
        fileList: [],
        emojis: [],
        tagList: [],
        communityList: [],
        tag: '',
        weibo: {
          title: '',
          tags: [],
          talkType: 1,
          img: '',
          link: '',
          location: ''
        }
      };
    },
    watch: {
      tag(val) {
        let tagAdd = this.tagList.filter(item => {
          return val === item.id;
        });
        if (process.client) {
          // 获取文本输入框元素节点
          let ele = document.getElementById('weibo-input');
          // 获取光标
          let cursor = ele.selectionStart
          // 设置文本内容
          ele.setRangeText(`#${tagAdd[0].name}#`);
          // 移动光标并聚焦
          ele.selectionStart = cursor + `#${tagAdd[0].name}#`.length;
          ele.focus();
          // 使文本输入框的内容等于当前的值
          this.weibo.title = ele.value
        }
      },
      imgNum(newVal, oldVal) {
        if (process.client) {
          if (newVal === 0) {
            document.querySelectorAll('div.el-upload--picture-card')[0].style.display = "none";
          } else {
            document.querySelectorAll('div.el-upload--picture-card')[0].style.display = "inline-block";
          }
        }

      },
      communityId(newVal, oldVal) {
        this.communityIdTemp = newVal;
      },
      communityName(newVal, oldVal) {
        this.communityNameTemp = newVal;
      }
    },
    computed: {
      ...mapGetters(['token', 'user']),
      imgNum() {
        return this.fileList.length;
      },

    },
    methods: {
      addEmoji(icon) {
        if (process.client) {
          // 获取文本输入框元素节点
          let ele = document.getElementById('weibo-input');
          // 获取光标
          let cursor = ele.selectionStart
          // 设置文本内容
          ele.setRangeText(icon)
          // 移动光标并聚焦
          ele.selectionStart = cursor + 2
          ele.focus();
          // 使文本输入框的内容等于当前的值
          this.weibo.title = ele.value
        }
      },// 文件上传
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      beforeUpload(file){
        if (this.token == null || this.token === '') {
          this.$message({message:'该功能需要登录',type:'error',showClose: true});
          this.$store.commit('common/setLoginFlag',true);
          return false;
        }
        // image/jpg,image/jpeg,image/png,image/gif
        const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png' || 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('不被接受的文件格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response, file, fileList) {
        file.url = response.data;
        this.fileList = fileList;
      },
      uploadImgClik() {
      },
      createWeibo() {
        if (this.token == null || this.token === '') {
          this.$message({message:'该功能需要登录',type:'error',showClose: true});
          this.$store.commit('common/setLoginFlag',true);
          return false;
        }
        //链接link
        if (!this.showUrl) {
          this.weibo.link = '';
        }
        //设置tag
        this.weibo.tags = [];
        //标签
        var reg = /#.+?#/g;
        this.weibo.title.replace(reg,  str=> {
          let tagName = str.substring(1,str.length-1);
          let tagAdd = this.tagList.filter(item => {
            return tagName === item.name;
          });
          console.log("添加标签");
          if (tagAdd.length>0) {
            console.log(tagAdd[0].id);
            if (this.weibo.tags.indexOf(tagAdd[0].id)===-1){
              this.weibo.tags.push(tagAdd[0].id);
            }
          }
          return str;
        });
        //解析图片
        let arr = [];
        for (let item of this.fileList) {
          //name
          arr.push(item.url)
        }
        this.weibo.img = arr.join();

        //设置communityId
        this.weibo.communityId = this.communityIdTemp;
        this.$api.talk.talk(this.weibo).then((response) => {
          this.clearWeibo();
          this.$message.success("发布成功");
          setTimeout(() => {
            this.$emit('changeType');
          }, 800);

        })
      },
      // 监听输入框内容的实时变化，然后及时赋值给对应的变量
      changeWeiboContent() {
        RangeUtil.saveRange();
      },
      myeditorenter(e) {
        RangeUtil.insertHtmlAtCaret('<br>');  // 在当前光标插入文本
        e.preventDefault();
      },
      initCommunity() {
        if (this.communityList.length === 0) {
          this.$api.community.getCommunityList().then((data) => {
            this.communityList = data;
          });
        }
      },
      selectCommunity(community) {
        this.communityIdTemp = community.id;
        this.communityNameTemp = community.communityName;
        if (process.browser) {
          document.getElementsByClassName('new_topic')[0].click();
        }
      },
      initTagList() {
        if (this.tagList.length === 0) {
          this.$api.tag.getTagList().then((data) => {
            this.tagList = data;
          })
        }
      },
      selectTag(id) {
        this.tag = id;
        if (process.browser) {
          document.getElementsByClassName('topicpicker')[0].click();
        }
      },
      clearWeibo() {
        this.weibo = {};
        this.$refs.myeditor.innerHTML = '';
        this.fileList = [];
        this.tag = '';
      },
      setLocation() {
        this.$api.talk.location().then((data) => {
          this.weibo.location = data;
        })
      },
      deleteLocation() {
        this.weibo.location = '';
      }
    },
    mounted() {
      document.querySelectorAll('div.el-upload--picture-card')[0].style.display = "none";

      this.uploadImgClik = function () {
        document.getElementsByClassName("el-upload")[0].click();
      };
      //复制监听
      let element = document.getElementById('weibo-input');
      //focus获取光标
      element.addEventListener("paste", function (e) {
        e.stopPropagation();
        e.preventDefault();
        let text = '', event = (e.originalEvent || e);
        if (event.clipboardData && event.clipboardData.getData) {
          text = event.clipboardData.getData('text/plain');
        } else if (window.clipboardData && window.clipboardData.getData) {
          text = window.clipboardData.getData('Text');
        }

        text = text.replace(/<[^>]+>/g, '');

        if (document.queryCommandSupported('insertText')) {
          document.execCommand('insertText', false, text);
        } else {
          document.execCommand('paste', false, text);
        }
      });
      //获取定位
      this.setLocation();
    },
  };
</script>

<style scoped>

  .editor-dialog {
    margin-bottom: 12px;
    position: relative;
    background: #fff;
    border-radius: 4px;
  }

  .editor-body {
    padding: 20px 20px 0;
    position: relative;
  }

  .content {
    position: relative;
    border-radius: 4px;
    border: 1px solid #f6f6f6;
    background-color: #f6f6f6;
    box-sizing: border-box;
    padding-right: 4px;
  }

  .editor {
    position: relative;
    margin-bottom: 2px;
    max-height: 180px;
    overflow-y: auto;
  }

  .auth-card {
    position: relative;

  }

  .rich-editor_abandon {
    position: relative;
    font-size: 14px;
    line-height: 24px;
    color: #252933;
    min-height: 80px;
    outline: none;
    padding: 5px 12px;
    box-sizing: border-box;
    white-space: pre-wrap;
  }
  .rich-editor {
    white-space: pre-wrap;
    font-size: 0.875rem;
    color: #333 !important;
    outline: none;
    padding: 10px 12px;
    resize: none;
    width: 100%;
    border-radius: 4px;
    min-height: 64px;
    background-color: #f6f6f6;
    border: none;
  }
  .content:focus-within {
    border: 1px solid #1e80ff;
    background-color: #fff;
  }
  .rich-editor:focus{
    background-color: #fff;
  }

  .content:focus-within .new_topic{
     background-color: #f6f6f6;
   }
  .content:focus-within .rich-editor{
    background-color: #fff;
  }

  .topicwrapper {
    display: flex;
  }

  .new_topic {
    margin-left: 12px;
    margin-bottom: 8px;
    padding: 0 6px;
    line-height: 24px;
    border-radius: 50px;
    border-bottom-left-radius: 0;
    background: #fff;
    color: #1e80ff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .bottom {
    padding: 19px 20px 27px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .toolbar {
    display: flex;
    color: #007fff;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 19px;
  }

  .tool {
    display: flex;
    align-items: center;
  }

  .picker {
    z-index: 12;
    margin-right: 24px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }

  .filepicker {
    color: #4e5969;
    display: flex;
    align-items: center;
    color: #8a919f;
    z-index: 3;
  }

  .emojipicker {
    position: relative;
    display: flex;
    align-items: center;
  }

  .linkpicker {
    position: relative;
    display: flex;
    align-items: center;
  }

  .topicpicker {
    position: relative;
    display: flex;
    align-items: center;
  }

  .editor-dialog i {
    font-size: 16px;
  }

  .bottom i {
    margin-right: 4px;
    color: #4e5969;
  }

  .picker span {
    color: #4e5969;
    font-size: 14px;
    line-height: 22px;
    transition: color .3s;
  }

  .submit {
    position: relative;
    z-index: 12;
  }

  .tag-list {
    padding: 16px 20px;
    width: 200px;
    max-height: 200px;
    overflow-y: auto;
  }

  .tag-list li {
    cursor: pointer;
    padding: 6px 0;
    line-height: 24px;
    font-size: 14px;
    color: #515767
  }

  .tag-list::-webkit-scrollbar-thumb {
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
