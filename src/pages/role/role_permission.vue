<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">
      <div style="margin-bottom:20px;margin-left:20px;">当前角色：{{ $route.query.name }}</div>
      <el-transfer filterable :filter-method="filterMethod" filter-placeholder="姓名/拼音" :titles="['已授权', '未授权']" @change="handleChange" v-model="unSelectedUsers" :data="roleUserData">
        <div slot="left-footer">
        </div>
        <div slot="right-footer" style="padding-top:6px;">
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="9" :offset="2">
              <el-cascader :options="roleData" size="mini" placeholder="机构" v-model="roleSelected" change-on-select filterable clearable></el-cascader>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="9">
              <el-input v-model="input" size="mini" placeholder="姓名/拼音"></el-input>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4">
              <el-button class="transfer-footer" @click="queryroleUserData" size="mini">查询</el-button>
            </el-col>
          </el-row>
        </div>
      </el-transfer>
      <div style="margin-top:20px; text-align:center; margin-right:10%">
        <el-button type="info" @click="resetClick">重置</el-button>
        <el-button type="primary" @click="saveClick" :loading="on_submit_loading">保存</el-button>
        <el-button @click="backClick">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle } from "components";

export default {
  data() {
    let initData = {
      load_data: false, //element组件内置状态
      on_submit_loading: false, //element组件内置状态
      input: "", //查询输入框
      roleData: [], // [array<json>]角色树的所有选项的数据
      roleSelected: [""], //roleSelected [string]角色数据选择数据，默认无角色

      roleId: this.$route.query.code, // [string]当前角色的ID

      roleUserData: [], // [array<json>]当前角色的用户信息和待选用户的信息
      selectedUsers: [], // [array<string>] 穿梭框左侧已选用户的ID
      unSelectedUsers: [] // [array<string>] 穿梭框右侧未选用户的ID
    };

    //载入当前角色用户数据和无角色用户数据
    this.getData(initData);
    //计算左侧和右侧数据
    //this.calculateLeftAndRight(initData);
    return initData;
  },
  methods: {
    filterMethod(query, item) {
      return (
        item.pinyin.indexOf(query) > -1 ||
        item.fullPinyin.indexOf(query) > -1 ||
        item.label.indexOf(query) > -1
      );
    },
    getData(initData) {
      //获取机构树
      this.$fetch.api_org
        .getOrgTree({})
        .then(({ data }) => {
          initData.roleData = data;
          //initData.roleData.push({ id: "[null]", value: "[null]", label: "无组织" });
        })
        .catch(() => {});

      //获取左侧用户
      this.$fetch.api_role
        .roleHasPermission({
          code: initData.roleId
        })
        .then(({ data }) => {
          // console.log("已授权", data)
          this._changeUserData(data);
          //设置用户数据
          initData.roleUserData = data;

          //设置被选中的数据
          data.forEach(function(item) {
            initData.selectedUsers.push(item.key);
          });

          //加载完左侧数据后，加载右侧数据
          this.$fetch.api_role
            .roleHasNoPermission({
              orgCode: "",
              code: initData.roleId
            })
            .then(({ data }) => {
              // console.log("未授权", data)
              //转换后台数据为前台数据
              this._changeUserData(data);

              for (let i in data) {
                initData.unSelectedUsers.push(data[i].key);
              }
              initData.roleUserData = initData.roleUserData.concat(data);
            })
            .catch(() => {});
        })
        .catch(() => {});
      //获取右侧用户
    },

    //转换用户数据为穿梭框用的数据
    _changeUserData(userList) {
      for (let i in userList) {
        let newUser = {
          key: userList[i].code,
          label: userList[i].name,
          disabled: false,
          pinyin: userList[i].pinyin,
          fullPinyin: userList[i].full_pinyin,
          roleId: userList[i].org_id
        };
        userList[i] = newUser;
      }
    },

    queryroleUserData() {
      //从后台获取机构下用户的数据
      let org = "";
      if (this.roleSelected !== "") {
        org = this.roleSelected[this.roleSelected.length - 1];
      }

      this.$fetch.api_role
        .roleHasNoPermission({
          code: this.roleId,
          orgCode: org,
          query: this.input
        })
        .then(({ data }) => {
          //转换后台数据为前台数据
          this._changeUserData(data);
          // console.log(data);

          let newroleUserData = [];
          let newUnSelectedUsers = [];

          for (let i in this.roleUserData) {
            let user = this.roleUserData[i];
            if (this.selectedUsers.includes(user.key)) {
              newroleUserData.push(user);
            }
          }

          for (let i in data) {
            let user = data[i];
            if (!this.selectedUsers.includes(user.key)) {
              newroleUserData.push(user);
              newUnSelectedUsers.push(user.key);
            }
          }

          this.unSelectedUsers = newUnSelectedUsers;
          this.roleUserData = newroleUserData;
        })
        .catch(() => {});
    },
    // 操作
    handleChange(value, direction, movedKeys) {
      for (let i in this.roleUserData) {
        let user = this.roleUserData[i];
        if (movedKeys.includes(user.key)) {
          if ("left" === direction) {
            user.roleId = this.roleId;
            this.selectedUsers.push(user.key);
          } else {
            user.roleId = "";
            this.selectedUsers.splice(this.selectedUsers.indexOf(user.key), 1);
          }
        }
      }

      // console.log(this.selectedUsers);
      // console.log(this.unSelectedUsers);
    },
    // 重置
    resetClick() {
      // this.$alert("重置", "提示")
      this.$router.go(0);
    },
    // 保存
    saveClick() {
      this.$confirm("保存修改内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //TODO6，保存左侧数据

          this.on_submit_loading = true;

          let userCode = this.selectedUsers.join("-");
          let bcdata = { code: this.roleId, userCode: userCode };

          this.$fetch.api_role
            .roleChangePermission(bcdata)
            .then(({ message }) => {
              this.$message.success(message);
              this.on_submit_loading = false;
            })
            .catch(() => {
              this.$message.error(message);
              this.on_submit_loading = false;
            });
        })
        .catch(() => {
          this.on_submit_loading = false;
        });
    },
    // 返回
    backClick() {
      this.$router.back();
    }
  },
  components: {
    panelTitle
  }
};
</script>

<style lang="scss">
.el-transfer-panel {
  width: 40% !important;
}
</style>
