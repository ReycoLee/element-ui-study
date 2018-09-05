<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">
      <div>
        <el-form :inline="true" :rules="rules" label-width="120px">
          <el-form-item label="菜单编号:" prop="code">
            <el-input :disabled="true" v-model="code" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称:" prop="name">
            <el-input :disabled="true" v-model="name" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <fieldset>
        <legend>API管理</legend>
        <el-table :data="dataform" style="width: 100%;">
          <el-table-column prop="code" label="菜单/按钮编码">
          </el-table-column>
          <el-table-column prop="name" label="菜单/按钮名称">
          </el-table-column>
          <el-table-column label="API数量">
            <template slot-scope="props">
              {{ props.row.api_list?props.row.api_list.split('-').length + "个": "0个" }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props">
              <router-link :to="{name: 'menuApiList', query: {name: props.row.name, code:props.row.code, type:props.row.code==$route.query.code ? 'menu' : 'button'}}" tag="span">
                <el-button type="text">API配置</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </fieldset>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle } from "components";

export default {
  data() {
    return {
      dataform: [],
      name: this.$route.query.name,
      code: this.$route.query.code,
      load_data: false,
      rules: {
        name: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "菜单编号不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    //获取数据
    getFormData() {
      this.load_data = true;
      this.$fetch.api_menu
        .menuButtonList({
          code: this.code
        })
        .then(({ data }) => {
          let loadedData = data;
          this.dataform = loadedData;

          this.$fetch.api_menu
            .menuDetail({ code: this.code })
            .then(({ data }) => {
              this.dataform.push({
                code: data.code,
                name: data.name,
                api_list: data.api_list
              });
              this.load_data = false;
            })
            .catch(() => {
              this.load_data = false;
            });
        })
        .catch(() => {
          this.load_data = false;
        });
    }
  },
  components: {
    panelTitle
  }
};
</script>
