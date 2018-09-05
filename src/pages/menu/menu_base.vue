<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">

      <el-row :gutter="10">
        <el-col :span="16">
          <el-input style="padding-top:22px;" size="medium" clearable placeholder="菜单名称/编码" v-model="params.query">
            <el-button slot="append" @click.stop="onRefresh" icon="el-icon-search" type="primary" size="medium">查询</el-button>
          </el-input>
        </el-col>
        <el-col :span="5" style="text-align:right">
          <router-link :to="{name: 'menuAdd'}" tag="span">
            <el-button type="primary" icon="el-icon-plus" size="medium">新增菜单</el-button>
          </router-link>
        </el-col>
      </el-row>

    </panel-title>
    <div class="panel-body el-col el-col-24">
      <el-table :data="tableData" v-loading="loadData" element-loading-text="正在加载中" stripe @sort-change="on_sort_change" @selection-change="onBatchSelect" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" sortable>
        </el-table-column>
        <el-table-column prop="uri" label="菜单uri" width="110" sortable>
        </el-table-column>
        <el-table-column prop="code" label="菜单编码" width="110" sortable>
        </el-table-column>
        <el-table-column prop="parent_name" label="上级菜单" width="110" sortable>
        </el-table-column>
        <el-table-column prop="parent_code" label="上级编码" width="130" sortable>
        </el-table-column>
        <el-table-column prop="button_names" width="130" label="包含按钮">
        </el-table-column>
        <el-table-column prop="sort" label="排序号" width="110" sortable>
        </el-table-column>
        <el-table-column label="操作" width="320">
          <template slot-scope="props">
            <router-link :to="{name: 'menuView', query: {code:props.row.code}}" tag="span">
              <el-button size="mini" type="info">查看</el-button>
            </router-link>
            <router-link :to="{name: 'menuUpdate', query: {code:props.row.code}}" tag="span">
              <el-button size="mini" type="info">修改</el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="deleteData(props.row)">删除</el-button>
            <router-link :to="{name: 'menuButton', query: {name: props.row.name, code:props.row.code}}" tag="span">
              <el-button size="mini" type="info">按钮管理</el-button>
            </router-link>
            <router-link :to="{name: 'menuApi', query: {name: props.row.name, code:props.row.code}}" tag="span">
              <el-button size="mini" type="info">API管理</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button size="small" :disabled="batchSelect.length === 0" @click="onBatchDel" plain icon="el-icon-delete" slot="handler">
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
      //弹出框
      dialogFormVisible: false,
      //排序列
      orderBy: null,
      //排序方向
      orderDirection: null,
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
      this.$fetch.api_menu
        .menuManageList({
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          query: this.params.query,
          orderBy: this.orderBy,
          orderDirection: this.orderDirection
        })
        .then(({ data: { list, pageNumber, totalRow, pageSize } }) => {
          // console.log(list);
          this.pageSize = pageSize;
          this.tableData = list;
          this.currentPage = pageNumber;
          this.totalRow = totalRow;
          this.loadData = false;
        })
        .catch(error => {
          // console.log("错误", error);
          this.loadData = false;
        });
    },
    //单个删除
    deleteData(item) {
      this.$confirm("删除该菜单, 是否继续操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loadData = true;
          this.$fetch.api_menu
            .menuDelete(item)
            .then(data => {
              this.loadData = false;
              this.getTableData();
              this.$message.success(data.message);
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
    on_sort_change(data) {
      this.orderDirection = data.order === "ascending" ? "asc" : "desc";
      this.orderBy = data.prop;
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
      // console.log(ids);
      this.$confirm("删除菜单, 是否继续操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loadData = true;
          this.$fetch.api_menu
            .menuDelete({
              code: ids
            })
            .then(data => {
              this.getTableData();
              this.$message.success(data.message);
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
