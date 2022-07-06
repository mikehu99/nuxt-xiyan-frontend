<template>
  <div class="main-container">
    <template v-if="token && user.id===topicUser.id">
      <div class="profile-head">
        <div class="banner-wrapper" @click.self="isBannerActive = true"
             :style="{backgroundImage:'url('+topicUser.banner+'?x-oss-process=image/resize,m_fill,h_264,w_1320/sharpen,120'+')'}">
          <el-upload
            action="http://192.168.31.76:8000/upload/uploadFile"
            :show-file-list="false"
            :on-success="handleBannerSuccess"
            :before-upload="beforeAvatarUpload">
            <div class="banner-button">
              <label class="banner-button-label">
                <i class="el-icon-picture"/><span>上传封面图片</span>
              </label>
            </div>
          </el-upload>
        </div>
        <div class="user-wrapper">
          <el-upload
            action="http://192.168.31.76:8000/upload/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <div class="user-avatar" :style="{backgroundImage:'url('+topicUser.avatar+')'}">
              <label class="avatar-label">
                <i class="el-icon-picture"/><span>修改我的头像</span>
              </label>
            </div>
          </el-upload>
          <div class="user-info">
            <div>
              <h1>
                <span>{{ topicUser.alias || topicUser.username }}</span>
                <p v-if="topicUser.bio">{{ topicUser.bio}}</p>
                <router-link :to="{path:'/member/setting'}">
                  <div v-if="topicUser.bio == null || topicUser.bio===''" class="bio">
                    {{bioTip}}
                  </div>
                </router-link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="profile-head">
        <div class="banner-wrapper" @click="isBannerActive = true"
             :style="{backgroundImage:'url('+topicUser.banner+'?x-oss-process=image/resize,m_fill,h_264,w_1320/sharpen,120'+')'}">
        </div>
        <div class="user-wrapper">
          <div class="user-avatar" @click="isAvatarActive = true"
               :style="{backgroundImage:'url('+topicUser.avatar+')'}">
          </div>
          <div class="user-info">
            <div>
              <h1>
                <span>{{ topicUser.alias || topicUser.username }}</span>
                <p v-if="topicUser.bio">{{ topicUser.bio}}</p>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="user-view">
      <div class="content-area">
        <!--用户发布的话题-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">
            <div class="item-title">帖子</div>
          </el-menu-item>
          <el-menu-item index="2">
            <div class="item-title">评论</div>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">点赞</template>
            <el-menu-item index="3-1">说说</el-menu-item>
            <el-menu-item index="3-2">评论</el-menu-item>
          </el-submenu>
        </el-menu>
        <router-view :key="this.$route.fullPath"></router-view>
      </div>

      <div class="side-area">
        <Author
          v-if="flag"
          :topicUser="topicUser"
        />
      </div>

    </div>
    <el-dialog :visible.sync="isBannerActive">
      <img width="100%" :src="topicUser.banner" alt="">
    </el-dialog>
    <el-dialog :visible.sync="isAvatarActive">
      <img width="100%" :src="topicUser.avatar" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {deleteTopic} from '@/api/post'
  import {mapGetters} from 'vuex'

  import Author from '@/components/User/Author'


  export default {
    name: 'Profile',
    components: {Author},
    data() {
      return {
        flag: false,
        isBannerActive: false,
        isAvatarActive: false,
        topicUser: {},
        topics: {},
        bioIndex:0,
        bioTips: ['你爱看哪位up主', '你的爱好是什么', '说说你离不开的三件事情', '来介绍一下自己吧！']
      }
    },
    created(){
      this.$watch(
        () => this.$route.params,
        (toParams, previousParams) => {
          // 对路由变化做出响应...
          this.fetchUserInfo();
        }
      );
    },
    computed: {
      ...mapGetters(['token', 'user','praiseList']),
      activeIndex() {
        if(this.$route.name === 'profile-comment'){
          return '2';
        }
        if(this.$route.name === 'profile-praise-talk'){
          return '3-1';
        }
        if(this.$route.name === 'profile-praise-comment'){
          return '3-2';
        }
        return '1';
      },
      bioTip(){
        return this.bioTips[this.bioIndex];
      }
    },
    methods: {
      handleDelete(id) {
        deleteTopic(id).then(value => {
          const {code, message} = value
          alert(message)

          if (code === 200) {
            setTimeout(() => {
              this.$router.push({path: '/'})
            }, 500)
          }
        })
      },
      handleSelect(key, keyPath) {
        console.log(key);
        if (key === '2') {
          this.$router.push({path: '/member/' + this.$route.params.id + '/comment'})
        }
        if (key === '1') {
          this.$router.push({path: '/member/' + this.$route.params.id})
        }
        if (key === '3-1') {
          this.$router.push({path: '/member/' + this.$route.params.id + '/ptalk'})
        }
        if (key === '3-2') {
          this.$router.push({path: '/member/' + this.$route.params.id + '/pcomment'})
        }
      },
      handleAvatarSuccess(res, file) {
        this.topicUser.avatar = res.data;
        this.$api.user.update(this.topicUser).then(res => {
          this.$message.success('头像修改成功')
        });
      },
      handleBannerSuccess(res, file) {
        this.topicUser.banner = res.data;
        this.$api.user.update(this.topicUser).then(res => {
          this.$message.success('封面修改成功')
        });
      },
      beforeAvatarUpload(file) {
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
      async fetchUserInfo() {
        this.$api.user.getUserProfile(this.$route.params.id).then((data) => {
          console.log(data);
          this.topicUser = data;
          this.flag = true;
        })
      },
    },
    mounted() {
      this.fetchUserInfo();
      setInterval(() =>{
        if (this.bioIndex === 3){
          this.bioIndex = 0;
        } else {
          this.bioIndex++;
        }
      }, 3000);
    }
  }
</script>

<style scoped>
  .profile-head {
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 0px 2px rgb(98 124 153 / 10%);
    position: relative;
  }

  .banner-wrapper {
    cursor: pointer;
    width: 100%;
    height: 0;
    padding-top: 20%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: flex-end;
    background-color: #ccc;
  }

  .banner-button {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 5;
  }

  .banner-button-label {
    border: 1px solid #fff;
    cursor: pointer;
    background: none;
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    line-height: 1;
    padding: 7px 10px;
  }

  .user-wrapper {
    position: relative;
    width: 100%;
    margin-top: -73px;
    padding: 0 20px 20px 20px;
    display: flex;
    box-sizing: border-box;
  }

  .user-avatar {
    cursor: pointer;
    border: 4px solid #fff;
    background: #ccc;
    width: 152px;
    height: 152px;
    flex-grow: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    max-width: 152px;
    min-width: 152px;
    border-radius: 4px;
  }

  .avatar-label {
    display: flex;
    align-items: center;
    flex-flow: column;
    height: 100%;
    position: absolute;
    width: 100%;
    justify-content: center;
    background: rgba(41, 44, 47, .4);
    color: #fff;
    font-size: 13px;
    opacity: 0;
    visibility: hidden;
    cursor: pointer;
  }

  .user-avatar:hover .avatar-label {
    opacity: 1;
    visibility: visible;
  }

  .user-info {
    font-size: 24px;
    font-weight: 600;
    padding-top: 45px;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    align-items: flex-end;
  }

  .user-info p {
    align-items: center;
    font-size: 13px;
    color: #797C80;
    font-weight: 400;
    margin-top: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-justify: inter-ideograph;
    word-break: break-all;
  }

  .bio {
    color: #4a68ad;
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1.5;
  }

  .bio:before {
    content: "+ ";
  }

  @media screen and (max-width: 768px) {
    .banner-wrapper {
      padding-top: 38%;
    }

    .user-info p {
      margin-top: 0px;
    }

    .user-wrapper {
      padding: 0 12px 12px;
      margin-top: -24px;
    }

    .user-info {
      padding-left: 12px;
      padding-top: 29px;
      align-items: initial;
    }

    .user-info h1 {
      display: flex;
      flex-flow: column;
      font-size: 18px;
    }

    .user-avatar {
      width: 80px;
      height: 80px;
      max-width: 80px;
      min-width: 80px;
      cursor: pointer;
      border: 5px solid #ffffff;
      position: relative;
      z-index: 4;
    }
  }
</style>
