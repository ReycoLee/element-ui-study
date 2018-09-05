<template>
  <div class="login-body">
    <div class="loginWarp" v-loading="load_data" element-loading-text="正在登陆中..." @keyup.enter="submit_form">
      <div class="login-title">
        <div class="login-logo">
        </div>
        <div class="system-name">
          测试<br/>管理系统
        </div>
      </div>
      <div class="login-form">
        <div class="login-form-warp">
          <el-form ref="form" :model="form" :rules="rules" label-width="0">
            <el-form-item prop="login_name" class="login-item">
              <el-input v-model="form.login_name" placeholder="请输入用户编码" class="form-input" :autofocus="true"></el-input>
            </el-form-item>
            <el-form-item prop="password" class="login-item">
              <el-input type="password" v-model="form.password" placeholder="请输入密码" class="form-input"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="captcha" class="login-item">
              <el-row :gutter="10">
                <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" class="login-left">
                  <el-input v-model="form.captcha" placeholder="验证码" class="form-input"></el-input>
                </el-col>
                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <div class="captchaWarp" title="点击刷新验证码">
                    <img @click="updateVeriImgClick" :src="captchaImg" alt="验证码载入中…" style="width:100px; height:40px;">
                  </div>
                </el-col>
              </el-row>
            </el-form-item> -->
            <el-form-item class="login-item">
              <el-button size="large" class="form-submit" @click="submit_form">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapActions } from "vuex";
import { port_user, port_code } from "common/port_uri";
import { SET_USER_INFO } from "store/actions/type";
import { setToken } from "common/auth";
import { server_base_url_usercenter } from "common/config";
import user_permissionVue from "../user/user_permission.vue";

export default {
  data() {
    return {
      captchaImg: null,
      form: {
        login_name: null,
        password: null
        //captcha: null,
        //captchaId: null
      },
      rules: {
        login_name: [
          { required: true, message: "请输入账户名！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入账户密码！", trigger: "blur" }
        ]
      },
      //请求时的loading效果
      load_data: false
    };
  },
  created() {
    //this.refreshCaptcha();
    let query = this.$route.query;
    let ln = query.username;
    let pwd = query.password;
    if (ln && pwd && ln !== "" && pwd !== "") {
      this.form.login_name = ln;
      this.form.password = pwd;
      setTimeout(() => {
        this.submit_form();
      }, 200);
    }
  },
  methods: {
    ...mapActions({
      set_user_info: SET_USER_INFO
    }),
    updateVeriImgClick() {
      this.refreshCaptcha();
    },
    refreshCaptcha() {
      //刷新验证码
      /* this.$fetch.api_login.captchaId().then(({ data }) => {
        this.form.captchaId = data.captchaId;
        this.captchaImg =
          server_base_url_usercenter +
          "/api/login/captcha?captchaId=" +
          data.captchaId +
          "&r=" +
          Math.random();
        this.captcha = "";
      }); */
    },
    //提交
    submit_form() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;
        this.load_data = true;
        //登录提交
        this.$fetch.api_login
          .login(this.form)
          .then(({ data, message }) => {
            setToken(data.token);
            data.token = null;
            this.set_user_info({
              user: data,
              login: true
            });
            this.$message.success(message);
            if (this.$route.query && this.$route.query.system) {
              setTimeout(
                this.$router.push({
                  path: "/sso",
                  query: { system: this.$route.query.system }
                }),
                500
              );
            } else {
              setTimeout(this.$router.push({ path: "/" }), 500);
            }
          })
          .catch(({ code }) => {
            this.load_data = false;
            this.refreshCaptcha();
          });
      });
    }
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.login-body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(./images/login_bg.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .loginWarp {
    position: absolute;
    left: 50%;
    width: 600px;
    margin-left: -300px;
    margin-top: -150px;
    top: 50%;
    height: 300px;
    background-color: #fefefe;
    box-shadow: 0 0 20px #000;
    border-radius: 0px;
    .login-title {
      display: block;
      float: left;
      width: 40%;
      text-align: center;
      box-shadow: 2px 0 15px rgba(0, 0, 0, 0.05);
      height: 100%;
      .login-logo {
        height: 130px;
        background-image: url(./images/petdog.jpeg);
        background-repeat: no-repeat;
        background-position: center;
        padding: 30px;
        margin-left: 30px;
        margin-right: 30px;
        border-bottom: 1px solid #d7d7d7;
      }
      .system-name {
        font-size: 24px;
        font-weight: 600;
        padding-top: 20px;
      }
    }
    .login-form {
      display: block;
      float: left;
      height: 300px;
      width: 60%;
      .login-form-warp {
        margin: 30px 60px;
        .login-item {
          margin-bottom: 35px;
          padding-top: 5px;
        }
      }
    }
    .login-item {
      .el-input__inner {
        margin: 0 !important;
      }
    }
    .captchaWarp {
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
    }
    .form-input {
      input {
        margin-bottom: 15px;
        font-size: 16px;
        height: 50px;
        border: 1px solid #eaeaec;
        background: #eaeaec;
        border-radius: 25px;
        color: #555;
      }
    }
    .el-form-item__error {
      font-size: 16px;
      padding-top: 8px;
      padding-left: 1em;
    }
    .form-submit {
      width: 100%;
      font-size: 18px;
      color: #fff;
      border-color: #e25a5a;
      background: #e25a5a;
      &:active,
      &:hover {
        border-color: #e25a5a;
        background: #e25a5a;
      }
    }
  }
}
</style>
