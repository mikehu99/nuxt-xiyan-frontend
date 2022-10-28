<template>
  <div>
    <div>
    <span
      :style="{background: 'url(' + this.community.banner + ') center center / cover no-repeat rgb(255, 255, 255)',height:'164px'}"
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
              :src="community.avatar"
              class="avatar-img u0UgpXN5r-VO6PP9OAViq"/>
            <div class="mayH8s">
              <div class="bQhFI7"><h1 class="name">{{community.communityName}}</h1>
              </div>
            </div>
          </div>
          <!--选项-->
          <div class="_1gVVmSnHZpkUgVShsn7-ua _15Pk_bZ2XZNa9zBvnxq6HX" style="position: static; background: inherit;">
            <div class="_1_TJAX-8zAT3vVN1Iz7cys" style="max-width: 1200px;">
              <div>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                  <el-menu-item index="1">帖子</el-menu-item>
                  <el-menu-item index="3" disabled>视频</el-menu-item>
                </el-menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="user-view">
        <div class="content-area">
          <div class="input-box">
            <img :src="user.avatar" class="user-avatar" loading="lazy"/>
            <div class="input-div" @click="showEditor" >参与讨论！</div>
          </div>
          <el-dialog :visible.sync="isEditorActive">
            <WeiboCreate :communityId="community.id" :communityName="community.communityName" @changeType="changeType"></WeiboCreate>
          </el-dialog>
          <TalkList :talkList="talkList"></TalkList>
          <!--分页-->
          <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
            <div slot="spinner">
              <el-skeleton :rows="6" animated />
            </div>
            <div slot="no-more"></div>
            <div slot="no-results"><el-empty description="还没有人发布话题"></el-empty></div>
          </infinite-loading>
        </div>
        <div class="side-area">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import WeiboCreate from "@/components/Talk/WeiboCreate"
  import TalkList from '@/components/Talk/TalkList';

  import {getList} from '@/api/talk';
  import {getOneCommunity} from '@/api/community'
  import { mapGetters } from 'vuex'





  export default {
    components: {WeiboCreate,TalkList},
    data() {
      return {
        infiniteId: +new Date(),
        isEditorActive:false,
        talkList: [],
        community: {},
        activeIndex: '1',
        queryVo: {
          pageNo: 1,
          pageSize: 10,
          tab: 'latest',
          communityId:this.$route.params.id
        },
      }
    },
    computed:{
      ...mapGetters(['token', 'user']),
    },
    created() {
      this.$watch(
        () => this.$route.params,
        (toParams, previousParams) => {
          // 对路由变化做出响应...
          this.queryVo.communityId = toParams.id;
          this.fetchCommunityInfo();
          this.changeType()
        }
      );
    },
    async fetch(){
      let data =await this.$api.community.getOneCommunity(this.$route.params.id);
      this.community = data;
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      infiniteHandler($state) {
        this.$api.talk.getList(this.queryVo).then(data => {
          if (data.records.length) {
            this.queryVo.pageNo += 1;
            this.talkList.push(...data.records);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
      },
      changeType() {
        this.isEditorActive = false;
        this.queryVo.pageNo = 1;
        this.talkList = [];
        this.infiniteId += 1;
      },
      fetchCommunityInfo(){
        this.$api.community.getOneCommunity(this.$route.params.id).then(data=>{
          this.community = data;
        });
      },
      showEditor(){
        if (this.token == null || this.token === '') {
          this.$message({message:'该功能需要登录',type:'error',showClose: true});
          this.$store.commit('common/setLoginFlag',true);
          return false;
        }
        this.isEditorActive = true;

        setInterval(()=>{
          let element = document.getElementById('weibo-input');
          element.focus();},1000);
      }
    }
  }

</script>
<style scoped>
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
    background-color: #ffffff;
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
    color: #1c1c1c;
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

  @media (min-width: 640px) {
    ._1_TJAX-8zAT3vVN1Iz7cys {
      padding: 0 16px;
    }
  }


</style>
