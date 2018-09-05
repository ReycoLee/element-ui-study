<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-row :gutter="10">
        <el-col :span="16">
          <el-input style="padding-top:22px;" size="medium" placeholder="机构名称/编码" clearable v-model='codeorname'>
            <el-button slot="append" @click.stop="on_refresh" plain size="medium" type="primary" icon="el-icon-search">查询</el-button>
          </el-input>
        </el-col>
        <el-col :span="5" style="text-align:right">
          <router-link :to="{name: 'orgAdd'}" tag="span">
            <el-button type="primary" icon="el-icon-plus" size="medium">新增机构</el-button>
          </router-link>
        </el-col>
      </el-row>
    </panel-title>
    <div class="panel-body  el-col el-col-24">
      <el-table :data="table_data" v-loading="load_data" element-loading-text="数据加载中" stripe @sort-change="on_sort_change" @selection-change="on_batch_select" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="id" label="id" v-if='hidden'>
        </el-table-column>

        <el-table-column prop="type" label="机构类别" width="120px" sortable="custom">
          <template slot-scope="props">
            <span v-text="props.row.type === 'org' ? '机构' : '下设部门'"></span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="机构编码" width="120px" sortable="custom">
        </el-table-column>
        <el-table-column prop="name" label="机构名称" sortable="custom">
        </el-table-column>
        <el-table-column prop="fullname" label="全称" sortable="custom">
        </el-table-column>
        <el-table-column prop="parent_name" label="上级机构" sortable="custom">
        </el-table-column>

        <el-table-column label="操作" width="320px">
          <template slot-scope="props">
            <router-link :to="{name: 'orgView', params: {code: props.row.code}}" tag="span">
              <el-button size="mini" type="info">查看</el-button>
            </router-link>
            <router-link :to="{name: 'orgUpdate', params: {id: props.row.id,code: props.row.code}}" tag="span">
              <el-button size="mini" type="info">修改</el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="delete_data(props.row)">删除</el-button>
            <router-link v-if="!RYGL" :to="{name: 'orgUser', params: {code: props.row.code,name: props.row.name},query:{name :props.row.name}}" tag="span">
              <el-button size="mini" type="info">人员管理</el-button>
            </router-link>
            <router-link v-if="!JGSQ" :to="{name: 'orgPermission', params: {code: props.row.code,name: props.row.name},query:{name :props.row.name}}" tag="span">
              <el-button size="mini" type="info">机构授权</el-button>
            </router-link>
          </template>
        </el-table-column>

      </el-table>
      <bottom-tool-bar>
        <el-button icon="el-icon-delete" size="small" plain :disabled="batch_select.length === 0" @click="on_batch_del" slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10,20,30,40,50]" @size-change="handleSizeChange" :total="totalRow">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
import { getBtnBList } from "common/auth";

export default {
  data() {
    return {
      codeorname: "",
      hidden: false,
      table_data: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      totalRow: 10,
      //每页显示多少条数据
      pageSize: 10,
      //请求时的loading效果
      load_data: true,
      //批量选择数组
      batch_select: [],
      //排序列
      orderBy: null,
      //排序方向
      orderDirection: null,
      //排序字段映射
      orderFieldMapping: { parent_name: "parent_code" }
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  //挂载方法
  created() {
    this.btnRightInit();
    this.get_table_data();
  },
  methods: {
    btnRightInit() {
      let btnblist = getBtnBList();
      for (let i in btnblist) {
        this[i] = btnblist[i];
      }
      console.log(btnblist);
    },
    //刷新
    on_refresh() {
      this.currentPage = 1;
      this.get_table_data();
    },
    //获取数据
    get_table_data() {
      this.load_data = true;
      this.$fetch.api_org
        .list({
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          orderBy: this.orderBy,
          orderDirection: this.orderDirection,
          query: this.codeorname
        })
        .then(({ data: { list, pageNumber, totalRow, pageSize } }) => {
          this.pageSize = pageSize;
          this.table_data = list;
          this.currentPage = pageNumber;
          this.totalRow = totalRow;
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
          this.$fetch.api_org
            .del(item)
            .then(({ message }) => {
              this.get_table_data();
              this.$message.success(message);
              this.load_data = false;
            })
            .catch(() => {
              this.load_data = false;
            });
        })
        .catch(() => {
          this.loadData = false;
        });
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data();
    },
    //每页数据条目个数选择
    handleSizeChange(size) {
      this.pageSize = size;
      this.get_table_data();
    },
    //批量选择
    on_batch_select(val) {
      this.batch_select = val;
    },
    on_sort_change(data) {
      this.orderDirection = data.order === "ascending" ? "asc" : "desc";
      if (this.orderFieldMapping && this.orderFieldMapping[data.prop]) {
        this.orderBy = this.orderFieldMapping[data.prop];
      } else {
        this.orderBy = data.prop;
      }

      this.get_table_data();
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
      let idmap = { code: ids };
      this.$confirm("此操作将批量删除选择数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$fetch.api_org
            .del(idmap)
            .then(({ message }) => {
              this.get_table_data();
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
    }
  }
};
</script>
