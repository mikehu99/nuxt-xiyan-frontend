<template>
  <el-dialog :visible.sync="registerFlag" v-show="registerFlag" width="336px">
    <el-card shadow="never">
          <div slot="header" class="has-text-centered has-text-weight-bold">
            新用户入驻
          </div>
          <div class="register-info">
            <el-form
              ref="ruleForm"
              v-loading="loading"
              :model="ruleForm"
              status-icon
              :rules="rules"
              class="demo-ruleForm"
              @submit.native.prevent
            >
              <el-form-item label="账号" prop="name">
                <el-input v-model="ruleForm.name"/>
              </el-form-item>

              <el-form-item label="密码" prop="pass">
                <el-input
                  v-model="ruleForm.pass"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>

              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  v-model="ruleForm.checkPass"
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" autocomplete="off"/>
              </el-form-item>

              <el-form-item>
                <button @click="submitRegisterForm('ruleForm')" class="button is-info is-fullwidth">立即注册</button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        ruleForm: {
          name: '',
          pass: '',
          checkPass: '',
          email: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {
              min: 2,
              max: 10,
              message: '长度在 2 到 15 个字符',
              trigger: 'blur'
            }
          ],
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ],
          checkPass: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ]
        }
      }
    },
    computed: {
      registerFlag: {
        set(value) {
          this.$store.state.common.registerFlag = value;
        },
        get() {
          return this.$store.state.common.registerFlag;
        }
      }
    },
    methods: {
      submitRegisterForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$api.auth.userRegister(this.ruleForm)
              .then((value) => {
                const {code, message} = value
                if (code === 200) {
                  this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                  setTimeout(() => {
                    this.loading = false;
                    this.showLoginModel();
                  }, 0.1 * 1000)
                } else {
                  this.$message.error('注册失败，' + message)
                }
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      showLoginModel(){
        this.$store.commit('common/setRegisterFlag',false);
        this.$store.commit('common/setLoginFlag',true);
      },
    }
  }
</script>

<style scoped>
  .register-info{
    margin: 0 auto;
  }
</style>
