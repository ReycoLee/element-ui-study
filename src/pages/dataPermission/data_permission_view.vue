<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">
      <div style="margin-left:20%; color: #5a5e66; font-size:14px;">数据权限: {{ dataPermission.name }}</div>
      <!-- <div style="margin-top:10px; margin-left:20px; color: #5a5e66; font-size:14px;">功   能: {{ dataPermission.type }}</div> -->
      <div style="margin-top:10px; margin-left:20%; color: #5a5e66; font-size:14px;">用户所在机构: {{ user.org_name }}</div>
      <!-- <el-form>
        <el-form-item label="用户所在机构:">
          <div>{{ userOrgName }}</div> -->
          <!-- <el-select v-model="selectValue" placeholder="请选择活动区域" @change="selectClick">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select> -->
        <!-- </el-form-item> -->
        <div style="width:50%; margin-top:10px; margin-left:20%;">
          <fieldset>
            <legend>允许访问的数据范围</legend>
            <el-tree 
              :data="tree_data" 
              :props="defaultProps"
              ref="orgTree"
              default-expand-all
              :filter-node-method="filterNode">
            </el-tree>
          </fieldset>
        </div>
      <!-- </el-form> -->
    </div>
  </div>
</template>

<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      //请求时的loading效果
      code: this.$route.query.code,
      load_data: false,
      // selectValue: '',
      // options: [],
      user:{},
      dataPermission:{},
      tree_data: [{}],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created(){
    this.get_tree_data()
  },
  methods: {
    get_data(){
      this.load_data = true
      this.$fetch.api_dataPermission
        .dataPermissionView({
          code: this.code
        })
        .then(({ data }) => {
          // console.log(data)
          this.dataPermission = data.dataPermission
          this.user = data.user
          this.$refs.orgTree.filter(this.user.org_name)
          this.load_data = false
        })
        .catch(() => {
          this.load_data = false
        });
    },
    get_tree_data(){
      this.load_data = true
      this.$fetch.api_dataPermission
        .dataPermissionViewTree({
          code: this.code
        })
        .then(({ data }) => {
          // console.log("机构树", data)
          this.tree_data = data
          this.code && this.get_data()
          this.load_data = false
        })
        .catch(() => {
          this.load_data = false
        });
    },
    filterNode(value, data) {
      // console.log(value, data)
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // selectClick(value){
    //   console.log("选择项为：", value)
    //   this.get_tree_data()
    // }
  }
}
</script>