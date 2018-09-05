<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <div class="inline-query">
        <el-date-picker size="medium" value-format="yyyy-MM-dd-HH-mm-ss" v-model="timeValue" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker>
      </div>
      <el-button @click.stop="onRefresh" icon="el-icon-search" type="primary" size="medium">查询</el-button>
      <el-button @click="onClear()" icon="el-icon-search" type="primary" size="medium">清理日志</el-button>
    </panel-title>
    <div class="panel-body el-col el-col-24">
      <el-table :data="tableData" v-loading="loadData" stripe element-loading-text="数据加载中" @selection-change="onBatchSelect" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="api" label="API" sortable>
        </el-table-column>
        <el-table-column prop="user_code" label="用户" sortable>
        </el-table-column>
        <el-table-column prop="remark" label="操作记录" sortable>
        </el-table-column>
        <el-table-column prop="record_time" label="记录时间" sortable>
        </el-table-column>
        <el-table-column prop="level" label="优先级" sortable>
        </el-table-column>
        <el-table-column prop="params" label="参数" sortable>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="props">
            <el-button size="mini" type="danger" @click="deleteData(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="title" :visible.sync="dialogclear" width="35%" center>

        <div style="text-align :center">
          <el-date-picker size="medium" value-format="yyyy-MM-dd-HH-mm-ss" v-model="timeValue2" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="clear">确 定</el-button>
          <el-button @click="dialogclear = false">取 消</el-button>
        </span>
      </el-dialog>
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
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      title: "",
      dialogclear: false,
      //弹窗
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
      endtime: "",
      startime: "",
      cendtime: "",
      cstartime: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      timeValue: "",
      pickerOptions2: {
        shortcuts: [
          {
            text: "一周前",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "一个月前",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "三个月前",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      timeValue2: ""
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
      if (this.timeValue) {
        this.startime = this.timeValue[0];
        this.endtime = this.timeValue[1];
      } else {
        this.startime = "";
        this.endtime = "";
      }
      this.getTableData();
    },
    //获取数据
    getTableData() {
      this.loadData = true;
      this.$fetch.api_log
        .logList({
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          startime: this.startime,
          endtime: this.endtime
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
      this.$confirm("此操作将删除该日志, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loadData = true;
          this.$fetch.api_log
            .logDelete(item)
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

    //清理日志弹窗
    onClear() {
      this.dialogclear = true;
    },
    //清理日志
    clear() {
      if (this.timeValue2) {
        this.cstartime = this.timeValue2[0];
        this.cendtime = this.timeValue2[1];
        let cleartime = { cstartime: this.cstartime, cendtime: this.cendtime };
        this.$fetch.api_log
          .clear(cleartime)
          .then(({ message }) => {
            this.dialogclear = false;
            this.loadData = true;
            this.$message.success(message);
            this.onRefresh();
          })
          .catch(() => {
            this.dialogclear = false;
            this.$message.error(message);
          });
      } else {
        let cleartime = { cstartime: this.cstartime, cendtime: this.cendtime };
        this.$confirm("此操作将删除所有的日志, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.loadData = true;
            this.$fetch.api_log.clear(cleartime).then(({ message }) => {
              this.dialogclear = false;
              this.loadData = true;
              this.$message.success(message);
              this.onRefresh();
            });
          })
          .catch(() => {
            this.dialogclear = false;
            this.$message.error(message);
          });
      }
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
          ids += item.id;
        } else {
          ids += "-" + item.id;
        }
      });
      this.$confirm("此操作将批量删除选择数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loadData = true;
          this.$fetch.api_log
            .logDelete({
              id: ids
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
