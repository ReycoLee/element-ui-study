<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">

      <div style="margin-bottom:20px;margin-left:20px;">当前用户：{{ $route.query.name }}</div>
      <el-transfer filterable :filter-method="filterMethod" filter-placeholder="角色编号/角色名称" :titles="['当前用户角色', '未授予角色']" @change="handleChange" v-model="unSelectedRoles" :data="userPermissionData">

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
      selectedRoles: [], //[array<string>] 穿梭框左侧已选用户的ID
      unSelectedRoles: [] //[array<string>] 穿梭框右侧未选用户的ID
    };

    initData.code = this.$route.params.code;
    initData.userPermissionData = [];

    this.getData(initData);
    return initData;
  },
  methods: {
    getData(initData) {
      initData.load_data = false;
      //获取左侧数据
      this.$fetch.api_user
        .getUserroleleft({
          code: initData.code
        })
        .then(({ data }) => {
          //前端数据格式转换，转换为组件需要的数据
          this.changeData(data);
          //userPermissionData:所有数据JSON，即后台传递给前台的数据
          initData.userPermissionData = data;

          //已选的角色列表，列表内容为左侧角色的ID集合
          initData.selectedRoles = [];
          data.forEach(function(item) {
            initData.selectedRoles.push(item.key);
          });

          //查询右侧数据
          this.$fetch.api_user
            .getUserroleright({
              code: initData.code
            })
            .then(({ data }) => {
              //转换数据格式
              this.changeData(data);

              //左侧和右侧数据直接合并（后台数据为已授权和未授权的角色集合，因此不存在交集）
              let fullUserPermissionData = initData.userPermissionData;
              this.userPermissionData = fullUserPermissionData.concat(data);

              //计算右侧未多选择的角色集合
              initData.unSelectedRoles = [];
              data.forEach(function(item) {
                initData.unSelectedRoles.push(item.key);
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    //前端数据转换，转化为内前端需要的数据
    changeData(roleList) {
      for (let i in roleList) {
        //将code、name的格式转为key、label的格式
        let newRole = {
          key: roleList[i].code,
          label: roleList[i].name,
          disabled: false,
          code: roleList[i].code
        };
        roleList[i] = newRole;
      }
    },

    filterMethod(query, item) {
      return item.label.indexOf(query) > -1 || item.key.indexOf(query) > -1;
    },
    // 操作
    handleChange(value, direction, movedKeys) {
      for (let i in this.userPermissionData) {
        let user = this.userPermissionData[i];
        if (movedKeys.includes(user.key)) {
          if ("left" === direction) {
            this.selectedRoles.push(user.key);
          } else {
            this.selectedRoles.splice(this.selectedRoles.indexOf(user.key), 1);
          }
        }
      }
    },
    // 重置
    resetClick() {
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
          this.on_submit_loading = true;

          let roleCode = this.selectedRoles.join("-");
          let bcdata = { code: this.code, roleCode: roleCode };

          this.$fetch.api_user
            .saverole(bcdata)
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
