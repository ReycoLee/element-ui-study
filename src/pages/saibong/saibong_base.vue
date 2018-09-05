<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <div class="inline-query">
        <el-input size="medium" clearable placeholder="采番KEY" v-model="params.query">
          <el-button slot="append" @click.stop="onRefresh" icon="el-icon-search" type="primary" size="medium">查询</el-button>
        </el-input>
      </div>
      <router-link :to="{name: 'saibongAdd'}" tag="span">
        <el-button type="primary" icon="el-icon-plus" size="medium">注册</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body el-col el-col-24">
      <el-table :data="table_data" stripe v-loading="load_data" element-loading-text="数据加载中" style="width: 100%;">
        <el-table-column prop="cfzdm" label="采番KEY" width="120">
        </el-table-column>
          <el-table-column prop="cfsm" label="采番说明" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="dqlsh" label="当前流水号" width="120">
        </el-table-column>
        <el-table-column prop="zjz" label="中间值" width="120">
        </el-table-column>
        <el-table-column prop="twz" label="头文字" width="120">
        </el-table-column>
        <el-table-column prop="lscd" label="流水长度" width="120">
        </el-table-column>
        <el-table-column label="补0规则" width="120">
          <template slot-scope="props">
            {{ props.row.isb0=='1' ? '不补' : props.row.isb0=='2' ? '左补' : '右补' }}
          </template>
        </el-table-column>
        <el-table-column prop="fgf" width="120" label="分隔符">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="props">
            <router-link :to="{name: 'saibongEdit', query: {cfzdm: props.row.cfzdm}}" tag="span">
              <el-button type="text" v-if="props.row.dqlsh===null" >修改</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <div slot="page">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="totalRow">
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
    onRefresh() {this.currentPage=1;this.getTableData();},
    //获取数据
    getTableData() {
      this.load_data = true;
      this.$fetch.api_saibong
        .saibongList({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          cfzdm: this.params.query
        })
        .then(({ data: { pageUtil } }) => {
           //console.log(pageUtil)
          this.currentPage = pageUtil.currPage;
          this.pageSize = pageUtil.pageSize;
          this.totalRow = pageUtil.total;
          this.table_data = pageUtil.list;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    }
  }
};
</script>
