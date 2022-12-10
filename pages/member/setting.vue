<template>
  <div class="main-container">
    <div class="user-view">
      <div class="side-column">
        <div class="nav-list">
          <div class="nav-item active">
            <i class="el-icon-user-solid"/> 个人资料
          </div>
        </div>
      </div>

      <div class="content-area">
        <el-card shadow="never">
          <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>设置</el-breadcrumb-item>
                <el-breadcrumb-item>个人资料</el-breadcrumb-item>
              </el-breadcrumb>
          <el-divider></el-divider>
          <div class="info-form">
            <el-form :label-position="labelPosition" label-width="60px" :model="userInfo">
              <el-form-item label="账号">
                <el-input v-model="userInfo.username" disabled/>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model.trim="userInfo.alias"/>
              </el-form-item>
              <el-form-item label="简介">
                <el-input type="textarea" v-model.trim="userInfo.bio"></el-input>
              </el-form-item>
              <el-divider></el-divider>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Setting',
    data() {
      return {
        activeName: 'first',
        labelPosition: 'left',
        userInfo: {
          id: '',
          username: '',
          alias: '',
          bio: '',
          email: '',
          mobile: '',
          avatar: ''
        }
      }
    },
    computed: {
      ...mapGetters(['token', 'user'])
    },
    mounted() {
      this.fetchInfo()
    },
    methods: {
      fetchInfo() {
        if (this.token == null || this.token === '') {
          this.$message({message:'该功能需要登录',type:'error',showClose: true});
          this.$router.push({path:"/"});
        }else {
          this.$api.user.getInfo().then(data => {
            this.userInfo = data
          })
        }

      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      submitForm(formName) {
        console.log(this.userInfo)
        this.$api.user.update(this.userInfo).then(res => {
          this.$message.success('信息修改成功')
          this.fetchInfo()
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .setting-header {
    background: #fff;
    padding: 8px;
  }
  .side-column{
    width: 230px;
    height: auto;
    margin-right: 20px;
  }
  .nav-list {
    box-sizing: border-box;
    padding: 8px;
    border: 1px solid var(--color-basic-200);
    background: var(--bg-topic);
  }

  .nav-item {
    display: flex;
    align-items: center;
    font-weight: 400;
    height: 48px;
    width: 214px;
    font-size: 16px;
    color: #4e5969;
    position: relative;
    cursor: pointer;
  }

  .nav-item i {
    margin-left: 20px;
    margin-right: 10px;
  }
  .active {
    background: var(--bg-app);
    color: #1d7dfa;
  }
  .info-form{
    max-width: 460px;
    margin: 20px auto;
  }
  @media (max-width: 768px) {
    .side-column{
      display: none;
    }
  }
</style>
