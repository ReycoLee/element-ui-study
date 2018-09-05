<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-input style="padding-top:22px;" size="medium" clearable placeholder="角色名称/编码" v-model="params.query">
            <el-button slot="append" @click.stop="onRefresh" icon="el-icon-search" type="primary" size="medium">查询</el-button>
          </el-input>
        </el-col>
        <el-col :span="5" style="text-align:right">
          <router-link :to="{name: 'roleAdd'}" tag="span">
            <el-button type="primary" icon="el-icon-plus" size="medium">新增角色</el-button>
          </router-link>
        </el-col>
      </el-row>
    </panel-title>
    <div class="panel-body el-col el-col-24">
      <el-table :data="table_data" stripe v-loading="load_data" element-loading-text="正在加载中" @selection-change="onBatchSelect" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="角色编码" width="150px" sortable>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" sortable>
        </el-table-column>
        <el-table-column label="包含功能菜单" sortable>
          <template slot-scope="props">
            <el-button type="text" @click="showFunctionDetail(props.row)">{{ props.row.menu_count }}个菜单, {{ props.row.button_count }}个按钮</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="props">
            <router-link :to="{name: 'roleView', query: {code:props.row.code}}" tag="span">
              <el-button size="mini" type="info">查看</el-button>
            </router-link>
            <router-link :to="{name: 'roleUpdate', query: {code:props.row.code}}" tag="span">
              <el-button size="mini" type="info">修改</el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="deleteData(props.row)">删除</el-button>
            <router-link :to="{name: 'rolePermission', query: {code:props.row.code,name:props.row.name}}" tag="span">
              <el-button size="mini" type="info">授权</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button plain icon="el-icon-delete" size="small" :disabled="batchSelect.length === 0" @click="onBatchDel" slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10,20,30,40,50]" :total="totalRow">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
    <el-dialog title="菜单预览" :visible.sync="dialogFormVisible">
      <el-tree :data="treeData" :props="defaultProps"></el-tree>
    </el-dialog>
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
      batchSelect: [],
      //弹出框
      dialogFormVisible: false,
      showItem: {},
      params: {
        query: ""
      },
      // 树的数据
      treeData: [{}],
      defaultProps: {
        children: "children",
        label: "label"
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
      this.load_data = true;
      this.$fetch.api_role
        .roleList({
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          query: this.params.query
        })
        .then(({ data: { list, pageNumber, pageSize, totalRow } }) => {
          this.table_data = list;
          this.currentPage = pageNumber;
          this.pageSize = pageSize;
          this.totalRow = totalRow;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //获取功能菜单数据
    getFuncMenuTableData() {
      this.$fetch.api_role
        .roleMenu(this.showItem)
        .then(({ data }) => {
          this.treeData = data;
        })
        .catch(() => {});
    },
    //单个删除
    deleteData(item) {
      this.$confirm(
        "删除角色将导致该角色的对应授权失效, 是否继续操作?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.load_data = true;
          this.$fetch.api_role
            .roleDelete(item)
            .then(({ message }) => {
              this.getTableData();
              this.$message.success(message);
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
      this.$confirm(
        "删除角色将导致该角色的对应授权失效, 是否继续操作?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.load_data = true;
          this.$fetch.api_role
            .roleDelete({
              code: ids
            })
            .then(({ message }) => {
              this.getTableData();
              this.$message.success(message);
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
    // 包含功能菜单
    showFunctionDetail(item) {
      // this.showItem = item
      // this.getFuncMenuTableData()
      // this.dialogFormVisible = true
    }
  }
};
</script>
