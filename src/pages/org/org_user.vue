<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">

      <div style="margin-bottom:20px;margin-left:20px;">当前机构：{{ $route.query.name }}</div>
      <el-transfer filterable :filter-method="filterMethod" filter-placeholder="姓名/拼音" :titles="['当前机构用户', '待调入']" @change="handleChange" v-model="unSelectedUsers" :data="orgUserData">
        <div slot="left-footer">
        </div>
        <div slot="right-footer" style="padding-top:6px;">
          <el-row :gutter="20">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="9" :offset="2">
              <el-cascader :options="orgData" size="mini" placeholder="机构" v-model="orgSelected" change-on-select filterable clearable></el-cascader>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="9">
              <el-input v-model="input" size="mini" placeholder="姓名/拼音"></el-input>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="4">
              <el-button class="transfer-footer" @click="queryOrgUserData" size="mini">查询</el-button>
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
      orgData: [], // [array<json>]机构树的所有选项的数据
      orgSelected: [""], //orgSelected [string]机构数据选择数据，默认无机构

      orgId: this.$route.params.code, // [string]当前机构的ID

      orgUserData: [], // [array<json>]当前机构的用户信息和待选用户的信息
      selectedUsers: [], // [array<string>] 穿梭框左侧已选用户的ID
      unSelectedUsers: [] // [array<string>] 穿梭框右侧未选用户的ID
    };

    //载入当前机构用户数据和无机构用户数据
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
          initData.orgData = data;
          //initData.orgData.push({ id: "[null]", value: "[null]", label: "无组织" });
        })

        .catch(() => {});

      //获取左侧用户
      this.$fetch.api_org
        .getOrgUser({
          code: initData.orgId
        })
        .then(({ data }) => {
          this._changeUserData(data);
          //设置用户数据
          initData.orgUserData = data;

          //设置被选中的数据
          data.forEach(function(item) {
            initData.selectedUsers.push(item.key);
          });

          //加载完左侧数据后，加载右侧数据
          this.$fetch.api_org
            .getOrgUser({
              code: ""
            })
            .then(({ data }) => {
              //转换后台数据为前台数据
              this._changeUserData(data);

              for (let i in data) {
                initData.unSelectedUsers.push(data[i].key);
              }
              initData.orgUserData = initData.orgUserData.concat(data);
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
          orgId: userList[i].org_id
        };
        userList[i] = newUser;
      }
    },

    queryOrgUserData() {
      //从后台获取机构下用户的数据
      let org = "";
      if (this.orgSelected !== "") {
        org = this.orgSelected[this.orgSelected.length - 1];
      }

      this.$fetch.api_org
        .getOrgUser({
          code: org,
          query: this.input
        })
        .then(({ data }) => {
          //转换后台数据为前台数据
          this._changeUserData(data);
          // console.log(data);

          let newOrgUserData = [];
          let newUnSelectedUsers = [];

          for (let i in this.orgUserData) {
            let user = this.orgUserData[i];
            if (this.selectedUsers.includes(user.key)) {
              newOrgUserData.push(user);
            }
          }

          for (let i in data) {
            let user = data[i];
            if (!this.selectedUsers.includes(user.key)) {
              newOrgUserData.push(user);
              newUnSelectedUsers.push(user.key);
            }
          }

          this.unSelectedUsers = newUnSelectedUsers;
          this.orgUserData = newOrgUserData;
        })
        .catch(() => {});
    },
    // 操作
    handleChange(value, direction, movedKeys) {
      for (let i in this.orgUserData) {
        let user = this.orgUserData[i];
        if (movedKeys.includes(user.key)) {
          if ("left" === direction) {
            user.orgId = this.orgId;
            this.selectedUsers.push(user.key);
          } else {
            user.orgId = "";
            this.selectedUsers.splice(this.selectedUsers.indexOf(user.key), 1);
          }
        }
      }
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
          let bcdata = { code: this.orgId, userCode: userCode };

          this.$fetch.api_org
            .save(bcdata)
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
