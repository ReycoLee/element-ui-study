<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="loadData" element-loading-text="加载中">
      <div>
        <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="字典编码:" prop="code">
            <el-input :readonly="$route.query.code?true:false" v-model="form.code" size="medium" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="字典名称:" prop="name">
            <el-input :readonly="$route.query.code?true:false" v-model="form.name" size="medium" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
          <div style="float:right; margin-right:20px;">
            <el-button type="primary" icon="el-icon-plus" @click="addEntryClick" size="medium" v-show="!isView">添加条目</el-button>
          </div>
        </el-form>
      </div>
      <div>
        <el-table :data="tableData" v-loading="loadData" element-loading-text="数据加载中" border @selection-change="onBatchSelect" style="width: 100%;">
          <el-table-column type="selection" width="55" fixed="left">
          </el-table-column>
          <el-table-column label="序号" width="80" fixed="left">
            <template slot-scope="scope">
              <span>{{ (currentPage-1)*pageSize + scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="条目名称" show-overflow-tooltip width="120px" fixed="left">
          </el-table-column>
          <el-table-column prop="code" label="条目编码" show-overflow-tooltip width="120px" fixed="left">
          </el-table-column>
          <el-table-column prop="parent_name" label="上级条目名称" show-overflow-tooltip width="120px">
          </el-table-column>
          <el-table-column prop="parent_code" label="上级条目编码" show-overflow-tooltip width="120px">
          </el-table-column>
          <el-table-column prop="gltmbm" label="关联条目编码" show-overflow-tooltip width="120px">
          </el-table-column>
          <el-table-column prop="gltm_name" label="关联条目名称" show-overflow-tooltip width="120px">
          </el-table-column>
          <el-table-column prop="sort" label="排序号" width="120">
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="props">
              <router-link :to="{name: 'dictEntryView', query: {code:props.row.code,zdbm:$route.query.code}}" tag="span">
                <el-button size="mini" type="info">查看</el-button>
              </router-link>
              <router-link :to="{name: 'dictEntryUpdate', query: {code:props.row.code,zdbm:$route.query.code}}" tag="span">
                <el-button size="mini" type="info" v-if="!isView">修改</el-button>
              </router-link>
              <el-button size="mini" type="danger" @click="deleteData(props.row,$route.query.code)" v-if="!isView">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <bottom-tool-bar>
          <el-button icon="delete" size="small" :disabled="batchSelect.length === 0" @click="onBatchDel" slot="handler">
            <span>批量删除</span>
          </el-button>
          <div slot="page">
            <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10,20,30,40,50]" :total="totalRow">
            </el-pagination>
          </div>
        </bottom-tool-bar>
      </div>
      <div style="margin-top:20px; text-align:center;">
        <el-button size="medium" @click="backClick">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      zdbms: this.$route.query.code,
      allReadOnly: false,
      onSubmitLoading: false,
      isView: false,
      form: {},
      rules: {
        name: [
          { required: true, message: "字典名称不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "字典编号不能为空", trigger: "blur" }]
      },
      tableData: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      totalRow: 0,
      //每页显示多少条数据
      pageSize: 10,
      //请求时的loading效果
      loadData: false,
      //批量选择数组
      batchSelect: [],
      params: {
        query: ""
      }
    };
  },
  created() {
    this.form = this.$route.query;
    this.isView = this.$route.name == "dictView";
    this.getTableData();
  },
  methods: {
    //获取数据
    getTableData() {
      this.loadData = true;
      this.$fetch.api_dictionary
        .dictionaryEntryList({
          code: this.form.code,
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          query: this.params.query
        })
        .then(({ data: { list, pageNumber, pageSize, totalRow } }) => {
          // console.log(list);
          if(list) {
            for(let i = 0; i < list.length; i++) {
              if(list[i].gltm_name) {
                let gltmbm = list[i].gltmbm;
                list[i].gltm_name = list[i].gltm_name.name;
              }
            }
          }
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
    deleteData(item, zdbm) {
      item.zdbm = zdbm;
      this.$confirm("此操作将删除该字典, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loadData = true;
          this.$fetch.api_dictionary
            .dictionaryEntryDelete(item)
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
      this.$confirm("此操作将批量删除选择数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = "";
          this.batchSelect.map(item => {
            if (ids === "") {
              ids += item.code;
            } else {
              ids += "-" + item.code;
            }
          });
          this.loadData = true;
          this.$fetch.api_dictionary
            .dictionaryEntryDelete({
              code: ids,
              zdbm: this.zdbms
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
    },
    addEntryClick() {
      // console.log("添加条目");
      this.$router.push({
        name: "dictEntryAdd",
        query: { code: this.$route.query.code }
      });
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
          // 保存操作
          this.$refs.form.validate(valid => {
            if (valid) {
              this.createRoleData(); // 新增
              this.onSubmitLoading = true;
              setTimeout(() => {
                this.onSubmitLoading = false;
              }, 1500);
            } else {
              this.onSubmitLoading = false;
              // console.log("保存失败", this.form)
              return false;
            }
          });
        })
        .catch(() => {
          this.onSubmitLoading = false;
        });
    },
    // 返回
    backClick() {
      setTimeout(this.$router.back(), 500);
    }
  },
  components: {
    panelTitle,
    bottomToolBar
  }
};
</script>
