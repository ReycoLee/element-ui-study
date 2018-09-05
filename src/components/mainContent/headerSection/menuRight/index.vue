<template>
  <div class="menu-right" v-if="get_user_info.login">
    <div class="user_oper logout" @click="user_out()">
      <i class="fa fa-sign-out" aria-hidden="true"></i>
    </div>
    <div class="user_oper settings" @click="user_setting()">
      <i class="el-icon-setting" aria-hidden="true"></i>
    </div>
    <div class="user">
      <img src="./images/userimg.png" />
      <span v-text="get_user_info.user.name"></span>
    </div>
    <!--  <el-dropdown trigger="click" class="notification-list">
        <div class="notification-btn">

          <span v-text="get_user_info.user.name"></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click(1)">
              <i class="icon fa fa-user"></i>
              <span>个人信息</span>
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click(2)">
              <i class="icon fa fa-cog"></i>
              <span>设置</span>
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click(0)">
              <i class="icon fa fa-sign-out"></i>
              <span>安全退出</span>
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import { GET_USER_INFO } from "store/getters/type";
import { SET_USER_INFO } from "store/actions/type";
import connector from "../../../../connector.js";

const USER_OUT = 0;
const USER_INFO = 1;
const USER_SETTING = 2;

export default {
  computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    })
  },
  methods: {
    ...mapActions({
      set_user_info: SET_USER_INFO
    }),
    //退出
    user_out() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$fetch.api_login.logout().then(({ message }) => {
            this.$message.success(message);
            this.set_user_info(null);
            setTimeout(this.$router.replace({ name: "login" }), 500);
          });
        })
        .catch(() => {});
    },
    user_info() {
      //个人信息
    },
    user_setting() {
      setTimeout(this.$router.push({ name: "userInfo" }), 500);
    }
  }
};
</script>
