<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" element-loading-text="加载中">
      <el-form ref="form" :model="form" size="medium" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="8" :lg="12" :md="12" :sm="12" :xs="12">
            <fieldset>
              <legend>用户基本信息</legend>
              <el-input v-model="form.id" v-if='hidden'></el-input>
              <el-form-item label="用户编码" prop="code">
                <el-input v-model="form.code" placeholder="无法更改，请慎重填写" :readonly="clpReadOnly"></el-input>
              </el-form-item>
              <!--  <el-form-item label="登录名" prop="login_name">
                <el-input v-model="form.login_name" placeholder="无法更改，请慎重填写" :readonly="clpReadOnly"></el-input>
              </el-form-item> -->
              <el-form-item label="登录密码" prop="login_password">
                <el-input v-model="form.login_password" placeholder="6到24位的初始登录密码" v-show="passwordShow" :readonly="clpReadOnly"></el-input>
                <span v-show="!passwordShow" class="passwordTips">请在列表页面重置密码</span>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" :readonly="allReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="所属机构" prop="org_code" v-if='allReadOnly'>
                <el-input v-model="form.org_name" :readonly="allReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="所属机构" prop="org_code" v-if='showable'>
                <el-cascader :readonly="allReadOnly" :options="options" change-on-select v-model='form.org_code' filterable clearable> </el-cascader>
              </el-form-item>
              <el-form-item label="状态" prop="state">
                <el-radio-group v-model="form.state" prop="state" :disabled="allReadOnly">
                  <el-radio-button label="启用"></el-radio-button>
                  <el-radio-button label="停用"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </fieldset>
          </el-col>
          <el-col :xl="8" :lg="12" :md="12" :sm="12" :xs="12">
            <fieldset class="row-right">
              <legend>更多信息</legend>

              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="form.gender" prop="gender" :disabled="allReadOnly">
                  <el-radio-button label="男"></el-radio-button>
                  <el-radio-button label="女"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker type="date" :editable="false" default-value="1980-01-01" :picker-options="birthdayPickupOptions" value-format="yyyy-MM-dd" v-model="form.birthday" style="width: 100%;" :readonly="allReadOnly"></el-date-picker>
              </el-form-item>
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="form.phone" :readonly="allReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" :readonly="allReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark" :readonly="allReadOnly"></el-input>
              </el-form-item>
            </fieldset>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :xl="14" :lg="14" :md="21" :sm="21" :xs="21">
            <el-row type="flex" justify="center">
              <el-form-item>
                <el-button type="primary" @click="onSubmit" v-if='showable'>{{buttonname}}</el-button>
                <el-button v-if='showable' @click="cancel">取消</el-button>
                <el-button type="primary" v-if='!showable' @click="cancel">确定</el-button>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<style>
.row-right {
  min-height: 370px;
}

.passwordTips {
  color: #aaa;
}
</style>


<script>
import { panelTitle, buttonRight } from "components";

export default {
  data() {
    return {
      hidden: false,
      form: {
        id: "",
        code: "",
        name: "",
        login_name: "",
        login_password: "",
        org_code: [],
        org_name: "",
        state: "启用",
        remark: "",
        gender: "男",
        birthday: "",
        phone: "",
        email: "",
        remark: ""
      },
      birthdayPickupOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      options: [],
      allReadOnly: false,
      clpReadOnly: false,
      showable: "",
      rules: {
        login_password: [
          {
            required: true,
            message: "登录密码不能为空",
            trigger: "blur"
          }
        ],
        login_name: [
          {
            required: true,
            message: "登录名不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "用户编码不能为空",
            trigger: "blur"
          }
        ],
        org_code: [
          {
            required: true,
            message: "用户必须有一个机构",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: "状态不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },

  components: {
    panelTitle
  },
  //挂载方法
  created() {
    if (this.$route.meta.type === "add") {
      this.buttonname = "新增";
    } else {
      this.rules = {
        login_name: [
          {
            required: true,
            message: "登录名不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "用户编码不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
        state: [
          {
            required: true,
            message: "状态不能为空",
            trigger: "blur"
          }
        ]
      };
      this.buttonname = "修改";
    }
    this.passwordShow = true;
    if (this.$route.meta.type === "view") {
      //readonly 按钮显示
      this.showable = false;
      this.allReadOnly = true;
      this.clpReadOnly = true;
      this.passwordShow = false;
    } else {
      this.showable = true;
      this.allReadOnly = false;
    }
    if (this.$route.meta.type !== "add") {
      this.get_data();
      this.clpReadOnly = true;
      this.passwordShow = false;
    }
    this.get_tree_data();
  },
  methods: {
    get_data() {
      this.$fetch.api_user
        .getUser({
          code: this.$route.params.code
        })
        .then(({ data }) => {
          this.form = data;
          if (data.gender !== "1") {
            this.form.gender = "男";
          } else {
            this.form.gender = "女";
          }
          if (data.state === "normal") {
            this.form.state = "启用";
          } else {
            this.form.state = "停用";
          }
          if (this.$route.meta.type === "view") {
            this.form.login_password = "******";
          }
          if (data.org_ccm != null) {
            let codes = data.org_ccm.split("-");
            //console.log(codes)
            this.form.org_code = [];
            for (let i in codes) {
              let code = codes[i];
              this.form.org_code.push(code);
            }
          } else {
            this.form.org_code = [""];
          }
        })
        .catch(() => {});
    },

    get_tree_data() {
      this.$fetch.api_org
        .getOrgTree({})
        .then(({ data }) => {
          this.options = data;
          //let nullorg = { id: "[null]", value: "[null]", label: "无组织" };
          // this.options.push(nullorg);
        })
        .catch(() => {});
    },

    cancel() {
      this.$router.back();
    },

    onSubmit() {
      this.form.login_name = this.form.code;
      this.$refs.form.validate(valid => {
        if (valid) {
          let submitData = {};
          submitData = JSON.parse(JSON.stringify(this.form));

          if (submitData.gender === "男") {
            submitData.gender = "0";
          } else {
            submitData.gender = "1";
          }
          if (submitData.state === "启用") {
            submitData.state = "normal";
          } else {
            submitData.state = "locked";
          }
          let orgcode = "";
          if (submitData.org_code !== "") {
            orgcode = submitData.org_code.pop();
            if (orgcode === "") {
              orgcode = "";
            }
            //submitData.org_code = orgcode;
          }
          submitData.org_code = orgcode;

          if (this.$route.meta.type === "add") {
            this.$fetch.api_user
              .add(submitData)
              .then(({ message }) => {
                this.$message.success(message);
                this.$router.back();
              })
              .catch(() => {
                this.$message.error(message);
              });
          } else {
            this.$fetch.api_user
              .edit(submitData)
              .then(({ message }) => {
                this.$message.success(message);
                this.$router.back();
              })
              .catch(() => {
                this.$message.error(message);
              });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-cascader {
  width: 100%;
}
</style>