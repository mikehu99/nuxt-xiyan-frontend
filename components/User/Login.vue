<template>
  <b-modal v-model="loginFlag" :width="336">
      <el-card shadow="never">
        <div slot="header" class="has-text-centered has-text-weight-bold">
          用户登录
        </div>
        <div class="login-form">
          <el-form
            v-loading="loading"
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            @submit.native.prevent
          >
            <el-form-item prop="name">
              <el-input v-model="ruleForm.name" placeholder="账号"></el-input>
            </el-form-item>

            <el-form-item prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                placeholder="密码"
              ></el-input>
            </el-form-item>

            <el-form-item prop="delivery">
              <el-switch v-model="ruleForm.rememberMe"></el-switch><span style="margin-left: 1rem">记住登入状态</span>
            </el-form-item>

            <div class="login-tip">
              <span class="">忘记密码？</span>
              <span style="color: #1e80ff" @click="showRegisterModel">->注册</span>
            </div>

            <el-form-item>
              <button @click="submitForm('ruleForm')" class="button is-info is-fullwidth is-rounded">快速登录</button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </b-modal>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        redirect: undefined,
        loading: false,
        ruleForm: {
          name: "",
          pass: "",
          rememberMe: true,
        },
        rules: {
          name: [
            { required: true, message: "请输入账号", trigger: "blur" },
            {
              min: 2,
              max: 15,
              message: "长度在 2 到 15 个字符",
              trigger: "blur",
            },
          ],
          pass: [
            { required: true, message: "请输入密码", trigger: "blur" },
            {
              min: 6,
              max: 20,
              message: "长度在 6 到 20 个字符",
              trigger: "blur",
            },
          ],
        },
      };
    },
    computed:{
      loginFlag:{
        set(value){
          this.$store.state.common.loginFlag = value;
        },
        get(){
          return this.$store.state.common.loginFlag;
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loading = false;
            await this.$store
              .dispatch("user/login", this.ruleForm)
              .then(() => {
                this.$message({
                  message: "登录成功",
                  type: "success",
                  duration: 2000,
                });
                this.$store.commit('common/setLoginFlag',false);
              })
              .catch(() => {
                this.loading = false;
              });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      showRegisterModel(){
        this.$store.commit('common/setLoginFlag',false);
        this.$store.commit('common/setRegisterFlag',true);
      }
    },
  };
</script>

<style scoped>
  .login-form{
    margin: 20px auto;
  }
  .login-tip{
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
</style>
