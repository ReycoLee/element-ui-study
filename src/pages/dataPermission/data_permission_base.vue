<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-row :gutter="10">
        <el-col :span="15">
          <el-input style="padding-top:22px;" size="medium" clearable placeholder="权限名称/编码" v-model="params.query">
            <el-button slot="append" @click.stop="on_refresh" icon="el-icon-search" type="primary" size="medium">查询</el-button>
          </el-input>
        </el-col>
        <el-col :span="5" style="text-align:right">
          <router-link :to="{name: 'dataPermissionAdd'}" tag="span">
            <el-button type="primary" icon="el-icon-plus" size="medium">新增数据权限</el-button>
          </router-link>
        </el-col>
      </el-row>
    </panel-title>
    <div class="panel-body el-col el-col-24">
      <el-table :data="table_data" stripe v-loading="load_data" element-loading-text="正在加载中" @sort-change="on_sort_change" @selection-change="on_batch_select" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类别" width="120px" sortable="custom">
          <template slot-scope="props">
            <span v-text="props.row.type == 'preset' ? '内置' : '自定义'"></span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="编码" width="120px" sortable="custom">
        </el-table-column>
        <el-table-column prop="name" label="名称" sortable="custom">
        </el-table-column>
        <el-table-column prop="sort" label="排序号" width="120" sortable="custom">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="props">
            <!-- <el-button type="text" v-for="operate in props.row.operation" :key="operate" @click="operateClick(operate, props.row)">{{operate}}</el-button> -->
            <router-link :to="{name: 'dataPermissionView', query: {code:props.row.code}}" tag="span">
              <el-button size="mini" type="info">查看</el-button>
            </router-link>
            <router-link v-if="props.row.type !== 'preset'" :to="{name: 'dataPermissionUpdate', query: {code:props.row.code}}" tag="span">
              <el-button size="mini" type="info">修改</el-button>
            </router-link>
            <el-button v-if="props.row.type !== 'preset'" size="mini" type="danger" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button plain icon="el-icon-delete" size="small" :disabled="batch_select.length === 0" @click="on_batch_del" slot="handler">
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
      table_data: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      totalRow: 0,
      //每页显示多少条数据
      pageSize: 10,
      //请求时的loading效果
      load_data: true,
      //批量选择数组
      batch_select: [],
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
    this.get_table_data();
  },
  methods: {
    //刷新
    on_refresh() {
      this.currentPage = 1;
      this.get_table_data();
    },
    //获取数据
    get_table_data() {
      this.load_data = true;
      this.$fetch.api_dataPermission
        .dataPermissionList({
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          query: this.params.query,
          orderBy: this.orderBy,
          orderDirection: this.orderDirection
        })
        .then(({ data: { list, pageNumber, totalRow, pageSize } }) => {
          // console.log(list, pageNumber, totalRow, pageSize)
          this.table_data = list;
          this.pageSize = pageSize;
          this.currentPage = pageNumber;
          this.totalRow = totalRow;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    operateClick(operate, item) {
      // console.log(operate, item);
      if (operate == "查看") {
        setTimeout(
          this.$router.push({
            name: "dataPermissionView",
            query: { code: item.code }
          }),
          500
        );
      } else {
        setTimeout(
          this.$router.push({
            name: "dataPermissionUpdate",
            query: { code: item.code }
          }),
          500
        );
      }
    },
    //单个删除
    delete_data(item) {
      this.$confirm("删除该数据权限, 是否继续操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$fetch.api_dataPermission
            .dataPermissionDelete(item)
            .then(({ msg }) => {
              this.get_table_data();
              this.$message.success(msg);
              this.load_data = false;
            })
            .catch(() => {
              this.load_data = false;
            });
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.get_table_data();
    },
    on_sort_change(data) {
      this.orderDirection = data.order === "ascending" ? "asc" : "desc";
      this.orderBy = data.prop;
      this.get_table_data();
    },
    //批量选择
    on_batch_select(val) {
      this.batch_select = val;
    },
    //批量删除
    on_batch_del() {
      let ids = "";
      this.batch_select.map(item => {
        if (ids === "") {
          ids += item.code;
        } else {
          ids += "-" + item.code;
        }
      });
      this.$confirm("删除数据权限, 是否继续操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$fetch.api_dataPermission
            .dataPermissionDelete({
              code: ids
            })
            .then(({ msg }) => {
              this.get_table_data();
              this.$message.success(msg);
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
