<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">

      <el-row :gutter="10">
        <el-col :span="16">
          <el-input style="padding-top:22px;" size="medium" clearable placeholder="API名称/编码" v-model="params.query">
            <el-button @click.stop="onRefresh" slot="append" icon="el-icon-search" type="primary" size="medium">查询</el-button>
          </el-input>
        </el-col>
        <el-col :span="5" style="text-align:right">
          <router-link :to="{name: 'apiAdd'}" tag="span">
            <el-button type="primary" icon="el-icon-plus" size="medium">新增API </el-button>
          </router-link>
        </el-col>
      </el-row>

    </panel-title>
    <div class="panel-body el-col el-col-24">
      <el-table :data="tableData" stripe v-loading="loadData" element-loading-text="数据加载中" @selection-change="onBatchSelect" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="API编码" sortable>
        </el-table-column>
        <el-table-column prop="name" label="API名称" sortable>
        </el-table-column>
        <el-table-column prop="url" label="API地址" sortable>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="props">
            <router-link :to="{name: 'apiView', query: {code:props.row.code, name:props.row.name, url:props.row.url}}" tag="span">
              <el-button size="mini" type="info">查看</el-button>
            </router-link>
            <router-link :to="{name: 'apiUpdate', query: {id:props.row.id, code:props.row.code, name:props.row.name, url:props.row.url}}" tag="span">
              <el-button size="mini" type="info">修改</el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="deleteData(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button size="small" plain icon="el-icon-delete" :disabled="batchSelect.length === 0" @click="onBatchDel" slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10,20,30,40,50]" :total="totalRow">
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
      tableData: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      totalRow: 0,
      //每页显示多少条数据
      pageSize: 10,
      //请求时的loading效果
      loadData: true,
      //批量选择数组
      batchSelect: [],
      params: {
        query: ""
      }
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    this.getTableData();
  },
  methods: {
    //刷新
    onRefresh() {
      this.currentPage = 1;
      this.getTableData();
    },
    //获取数据
    getTableData() {
      this.loadData = true;
      this.$fetch.api_api
        .apiList({
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          query: this.params.query
        })
        .then(({ data: { list, pageNumber, pageSize, totalRow } }) => {
          // console.log("列表数据", list)
          this.tableData = list;
          this.currentPage = pageNumber;
          this.pageSize = pageSize;
          this.totalRow = totalRow;
          this.loadData = false;
        })
        .catch(() => {
          this.loadData = false;
        });
    },
    //单个删除
    deleteData(item) {
      this.$confirm("此操作将删除该API, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loadData = true;
          this.$fetch.api_api
            .apiDelete(item)
            .then(({ message }) => {
              this.getTableData();
              this.$message.success(message);
              this.loadData = false;
            })
            .catch(() => {
              this.loadData = false;
            });
        })
        .catch(() => {
          this.loadData = false;
        });
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getTableData();
    },
    //批量选择
    onBatchSelect(val) {
      this.batchSelect = val;
    },
    //批量删除
    onBatchDel() {
      let ids = "";
      this.batchSelect.map(item => {
        if (ids === "") {
          ids += item.code;
        } else {
          ids += "-" + item.code;
        }
      });
      this.$confirm("此操作将批量删除选择数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loadData = true;
          this.$fetch.api_api
            .apiDelete({
              code: ids
            })
            .then(({ message }) => {
              this.getTableData();
              this.$message.success(message);
              this.loadData = false;
            })
            .catch(() => {
              this.loadData = false;
            });
        })
        .catch(() => {
          this.loadData = false;
        });
    }
  }
};
</script>
