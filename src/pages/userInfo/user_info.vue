<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" element-loading-text="加载中" label-width="120px">
      <fieldset>
        <legend>密码修改</legend>
        <el-row :gutter="20">
          <el-col :xs="24">
            <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="120px">
              <el-form-item label="原密码" prop="oldPassword">
                <el-input type="password" v-model="form.oldPassword"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="form.newPassword"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="form.confirmPassword"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24">
            <div style="margin-top:20px; text-align:center;">
              <el-button type="primary" @click="saveClick" :disabled="$route.name=='apiView'">保存</el-button>
              <el-button @click="backClick">返回</el-button>
            </div>
          </el-col>
        </el-row>
      </fieldset>

      <fieldset>
        <legend>三方系统账户密码维护</legend>
        <el-row :gutter="20">
          <el-col :xs="24">
            <el-table :data="tableData" v-loading="loadData" element-loading-text="数据加载中" style="width: 100%;">
              <el-table-column prop="system_code" label="编码" v-if='false'></el-table-column>
              <el-table-column prop="name" label="系统名称" width="90px"></el-table-column>
              <el-table-column prop="username" label="账号">
                <template slot-scope="props">
                  <el-input v-model="props.row.username"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="password" label="密码">
                <template slot-scope="props">
                  <el-input type="password" v-model="props.row.password"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24">
            <div style="margin-top:20px; text-align:center;">
              <el-button type="primary" @click="saveSystemList">确定</el-button>
              <el-button @click="backClick">返回</el-button>
            </div>
          </el-col>
        </el-row>
      </fieldset>
    </div>
  </div>
</template>
<style>
.main-content .panel .panel-body form {
  border: none;
}
</style>

<script>
import { panelTitle } from "components";
import connector from "../../connector.js";

export default {
  data() {
    return {
      title: "第三方账号管理",
      tableData: null,
      loadData: false,
      return: true,
      code: this.$route.query.code,
      rules: {
        oldPassword: [
          {
            required: true,
            message: "旧密码不能为空",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          }
        ]
      },
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    };
  },
  components: {
    panelTitle
  },

  created() {
    //页面加载的时候去后台进行查询 进行数据回显
    this.loadData = true;
    this.$fetch.api_user
      .systemList()
      .then(({ data }) => {
        this.tableData = data;
        this.loadData = false;
      })
      .catch(() => {
        this.loadData = false;
      });
  },
  methods: {
    post_data() {
      this.$fetch.api_user
        .changePassword(this.form)
        .then(({ message }) => {
          this.$message.success(message);
          this.$router.back();
        })
        .catch(() => {});
    },
    saveSystemList() {
      //空格校验
      //每次进来先将初始值设置为true
      this.return = true;
      //判断
      let systemList = this.tableData;
      systemList.forEach(element => {
        var reg = /\s/;
        //name 系统名称
        //username 用户名
        //password 用户密码
        //repepassword 重复密码
        //判断账号密码是否有一方为空 和 一方不为空
        if (
          (element.username != "" && element.password == "") ||
          (element.username == "" && element.password != "") ||
          (element.username != null && element.password == null) ||
          (element.username == null && element.password != null)
        ) {
          this.$message.error(element.name + "系统账号或密码有一方为空");
          this.return = false;
          return;
        }
        //判断密码和重复密码是否一致
        /*  if (element.password != element.repepassword) {
          this.$message.error(element.name + "系统两次输入的密码不一致");
          this.return = false;
          return;
        } */
        //判断账号和密码长度 以及 是否包含空格
        if (null != element.username && null != element.password) {
          /*  if (element.username.length < 6 || element.password.length < 6) {
              this.$message.error(element.name + "系统账号和密码不能小于六位");
              this.return = false;
              return;
            } */
          if (reg.test(element.username) || reg.test(element.password)) {
            this.$message.error(element.name + "系统账号和密码不能包含空格");
            this.return = false;
            return;
          }
        }
      });
      if (this.return) {
        this.doSaveSystemList();
      }
    },
    //确定更改第三方系统账号 saveSystemList
    doSaveSystemList() {
      this.$confirm("确认更改第三方账户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let systems = [];
          for (let i in this.tableData) {
            let row = this.tableData[i];
            systems.push(row);
          }

          this.$fetch.api_user
            .systemListAdd(systems)
            .then(({ message }) => {
              this.$message.success(message);
              this.$router.back();
            })
            .catch(() => {
              this.loadData = false;
            });
        })
        .catch(() => {});
    },
    // 重置
    resetClick() {
      this.$router.go(0);
    },
    // 保存
    saveClick() {
      this.$confirm("确认修改密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 保存操作
          this.$refs.form.validate(valid => {
            if (valid) {
              if (this.form.newPassword !== this.form.confirmPassword) {
                this.$message.error("两次输入的新密码不一致");
                return;
              }
              this.post_data();
            } else {
              return false;
            }
          });
        })
        .catch(() => {});
    },
    // 返回
    backClick() {
      setTimeout(this.$router.back(), 500);
    }
  }
};
</script>
