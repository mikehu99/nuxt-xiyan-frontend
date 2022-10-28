<template>
  <div class="main-container">
    <div class="user-view">
      <div class="content-area"  style="min-height: 900px;">
        <div v-if="screenWidth>=640">
          <WeiboCreate @changeType="changeType"></WeiboCreate>
        </div>
        <div v-if="screenWidth<640">
          <div class="input-box">
            <img :src="user.avatar" class="user-avatar" loading="lazy"/>
            <div class="input-div" @click="showEditor" >分享新鲜事！</div>
          </div>
          <el-dialog :visible.sync="isEditorActive">
            <WeiboCreate @changeType="changeType"></WeiboCreate>
          </el-dialog>
        </div>

        <TalkList :talkList="talkList"></TalkList>
        <!--分页-->
        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
          <div slot="spinner">
            <el-skeleton :rows="6" animated />
          </div>
          <div slot="no-more"></div>
        </infinite-loading>
      </div>
      <div class="side-area">
      </div>
    </div>
  </div>

</template>
<script>
import TalkList from '@/components/Talk/TalkList';
import WeiboCreate from "@/components/Talk/WeiboCreate"
import { mapGetters } from 'vuex'


export default {
  name: 'TalkIndex',
  components: { TalkList, WeiboCreate},
  head() {
    return {
      title: "翻趣",
      meta: [
        {
          name: "keywords",
          content: "翻趣,油管,脸书,外网",
        },
        {
          name: "description",
          content: "翻趣社区",
        },
      ],
    };
  },
  data() {
    return {
      screenWidth:768,
      isEditorActive:false,
      infiniteId: +new Date(),
      talkList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
        tab: 'latest'
      },
    }
  },
  created(){
    if (process.client) {
      this.screenWidth = document.body.clientWidth;
    }
  },
  computed:{
    ...mapGetters(['token','user'])
  },
  methods: {
    async infiniteHandler($state) {
      let data = await this.$api.talk.getList({
        pageNo:this.page.current,
        pageSize:this.page.size,
        tab:this.tab
      });
      if (data.records.length) {
        this.page.current += 1;
        this.talkList.push(...data.records);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    changeType() {
      this.page.current = 1;
      this.talkList = [];
      this.infiniteId += 1;
    },
    showEditor(){
      if (this.token == null || this.token === '') {
        this.$message({message:'该功能需要登录',type:'error',showClose: true});
        this.$store.commit('common/setLoginFlag',true);
        return false;
      }
      this.isEditorActive = true;
      if (process.client) {
        let element = document.getElementById('weibo-input');
        element.focus();
      }
    }
  },
  activated() {
    if (process.client) {
      let element = document.getElementById('weibo-input');
      element.focus();
    }
  }
}
</script>
<style>
.input-box{
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
.input-div{
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
.input-div:hover{
  background-color: #ffffff;
  outline: 1px solid #0079d3;
}
</style>
