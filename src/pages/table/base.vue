<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <div class="inline-query">
        <el-input size="small" placeholder="姓名/编号" suffix-icon="el-icon-date">
        </el-input>
      </div>
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
        查询
      </el-button>
      <router-link :to="{name: 'tableAdd'}" tag="span">
        <el-button type="success" plain icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table :data="table_data" v-loading="load_data" element-loading-text="数据加载中" @selection-change="on_batch_select" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="id" width="80">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100">
          <template slot-scope="props">
            <span v-text="props.row.sex === 1 ? '男' : '女'"></span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" width="120">
        </el-table-column>
        <el-table-column prop="zip" label="邮编" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="props">
            <router-link :to="{name: 'tableUpdate', params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button icon="delete" size="small" :disabled="batch_select.length === 0" @click="on_batch_del" slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      table_data: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 15,
      //请求时的loading效果
      load_data: true,
      //批量选择数组
      batch_select: []
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    this.get_table_data();
  },
  methods: {
    //刷新
    on_refresh() {this.currentPage=1;this.get_table_data();},
    //获取数据
    get_table_data() {
      this.load_data = true;
      this.$fetch.api_table
        .list({
          page: this.currentPage,
          length: this.length
        })
        .then(({ data: { result, page, total } }) => {
          this.table_data = result;
          this.currentPage = page;
          this.total = total;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //单个删除
    delete_data(item) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$fetch.api_table
            .del(item)
            .then(({ message }) => {
              this.get_table_data();
              this.$message.success(message);
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data();
    },
    //批量选择
    on_batch_select(val) {
      this.batch_select = val;
    },
    //批量删除
    on_batch_del() {
      this.$confirm("此操作将批量删除选择数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$fetch.api_table
            .batch_del(this.batch_select)
            .then(({ message }) => {
              this.get_table_data();
              this.$message.success(message);
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>
