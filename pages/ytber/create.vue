<template>
  <div class="main-container">
    <el-card class="box-card" shadow="never">

      <div slot="header" class="clearfix">
        <span><i class="fa fa fa-book"> youtuber / 推荐</i></span>
      </div>
      <div>
        <p class="mb-1 ml-4">请直接复制该youtuber的<span style="color: red">某个视频</span>的链接,然后点击生成按钮</p>
        <el-input placeholder="请输入视频网址" v-model="videoUrl">
          <el-button slot="append" @click="fetchChannelInfo()">生成</el-button>
        </el-input>
        <div v-if="ruleForm.avatar" class="block">
          <img style="width: 100px; height: 100px;" :src="ruleForm.avatar"></img>
        </div>
        <p>{{ruleForm.youtuberName}}</p>
        <p>{{ruleForm.description}}</p>
        <p>{{ruleForm.country}}</p>
        <!--Markdown-->
        <p v-for="topic in ruleForm.categories">{{topic}}</p>
        <el-button v-if="spdSuccess" type="primary" @click="submit()" style="margin-top: 15px">立即创建</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getChannelInfo} from "@/api/spd";
  import {post} from '@/api/youtuber'
  import { Loading } from 'element-ui';


  export default {
    name: 'YoutuberPost',
    data() {
      return {
        spdSuccess: false,
        videoUrl: '',
        ruleForm: {
          channelId: '',
          youtuberName: '',
          avatar: '',
          description: '',
          adderId: '',
          country: '',
          categories: [] // 标签
        }
      }
    },
    mounted() {
    },
    methods: {
      submit() {
        if (this.ruleForm.youtuberName == null || this.ruleForm.youtuberName === '') {
          alert('数据生成失败，请重新生成')
          return false
        }
        if (this.ruleForm.channelId == null || this.ruleForm.channelId === '') {
          alert('数据生成失败，请重新生成')
          return false
        }
        let loadingInstance = Loading.service({
          lock: true,
          text: '创建中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        setTimeout(() => {
          loadingInstance.close();
        }, 3000);
        this.$api.youtuber.post(this.ruleForm).then((response) => {
          loadingInstance.close();
          this.$message.success('创建成功')
        })
      },
      fetchChannelInfo() {
        console.log(this.videoUrl);
        let loadingInstance = Loading.service({
          lock: true,
          text: '生成中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        setTimeout(() => {
          loadingInstance.close();
        }, 3000);
        this.$api.spd.getChannelInfo(this.videoUrl).then((data) => {
          let channel = data.items[0];
          this.spdSuccess = true;
          this.ruleForm.channelId = channel.id;
          this.ruleForm.youtuberName = channel.snippet.title;
          this.ruleForm.avatar = channel.snippet.thumbnails.medium.url;
          this.ruleForm.banner = channel.brandingSettings.image.bannerExternalUrl + '=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj';
          this.ruleForm.description = channel.snippet.description;
          this.ruleForm.country = channel.snippet.country;
          this.ruleForm.categories = channel.topicDetails.topicCategories;
          loadingInstance.close();
          console.log(this.ruleForm);
        });
      }
    }
  }
</script>

<style>

</style>
