<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-cascader placeholder="所属机构" size="medium" :options="options" change-on-select v-model='orgselect' filterable clearable></el-cascader>
        </el-col>
        <el-col :span="11">
          <el-input style="padding-top:22px;" size="medium" clearable placeholder="用户姓名/编码" v-model='codeorname'>
            <el-button slot="append" @click.stop="on_refresh" size="medium" type="primary" icon="el-icon-search">查询</el-button>
          </el-input>
        </el-col>
        <el-col :span="5" style="text-align:right">
          <router-link :to="{name: 'userAdd'}" tag="span">
            <el-button type="primary" icon="el-icon-plus" size="medium">新增用户</el-button>
          </router-link>
        </el-col>
      </el-row>
    </panel-title>
    <div class="panel-body  el-col el-col-24">
      <el-table :data="table_data" v-loading="load_data" element-loading-text="数据加载中" stripe @sort-change="on_sort_change" @selection-change="on_batch_select" style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column fixed="left" label="序号" width="80">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="id" fixed="left" label="id" v-if='hidden'>
        </el-table-column>

        <el-table-column prop="code" fixed="left" label="编码" width="120px" sortable="custom">
        </el-table-column>
        <el-table-column prop="name" fixed="left" label="姓名" sortable="custom">
        </el-table-column>
      <!--   <el-table-column prop="login_name" fixed="left" width="120px" label="登录名" sortable="custom">
        </el-table-column> -->
        <el-table-column prop="org_name" label="所属机构" width="150px" sortable="custom">
        </el-table-column>
        <el-table-column prop="role_names" show-overflow-tooltip label="角色">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="120px" sortable="custom">
          <template slot-scope="props">
            <span style="font-weight:600" v-bind:style="{ color: props.row.state === 'normal' ? '#4b9ce1' : '#e25a5a' }" v-text="props.row.state === 'normal' ? '启用' : '停用'"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="350px">
          <template slot-scope="props">
            <router-link :to="{name: 'userView', params: {code: props.row.code}}" tag="span">
              <el-button size="mini" type="info">查看</el-button>
            </router-link>
            <router-link :to="{name: 'userUpdate', params: {id: props.row.id,code: props.row.code}}" tag="span">
              <el-button size="mini" type="info">修改</el-button>
            </router-link>
            <el-button size="mini" type="danger" @click="delete_data(props.row)">删除</el-button>
            <el-button size="mini" type="info" @click="openEditorg(props.row)">
              调动
            </el-button>
            <router-link :to="{name: 'userPermission', params: {code: props.row.code,name: props.row.name},query:{name :props.row.name}} " tag="span">
              <el-button size="mini" type="info">用户授权</el-button>
            </router-link>
            <el-button size="mini" type="info" @click="openPassword (props.row) ">
              密码重置</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog :title="title" :visible.sync="dialogorg" width="25%" center>

        <div style="text-align :center">
          <el-cascader size="small" :options="options" change-on-select v-model='roworgselect' filterable clearable></el-cascader>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editOrg">确 定</el-button>
          <el-button @click="dialogorg = false">取 消</el-button>
        </span>
      </el-dialog>

      <el-dialog title="密码重置" :visible.sync="dialogpassword" width="30%">
        <span>新密码：{{passwordmessage}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogpassword = false">确 定</el-button>
        </span>
      </el-dialog>

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

export default {
  data() {
    return {
      title: "",
      usercode: "",
      passwordmessage: "",
      dialogorg: false,
      dialogpassword: false,
      orgselect: [],
      roworgselect: [],
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
      //排序列映射
      orderFieldMapping: {
        org_name: "org_code"
      },
      options: []
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  //挂载方法
  created() {
    this.get_tree_data();
    this.get_table_data();
  },
  methods: {
    //刷新
    on_refresh() {
      this.currentPage = 1;
      this.get_table_data();
    },
    get_tree_data() {
      this.$fetch.api_org
        .getOrgTree({})
        .then(({ data }) => {
          this.options = data;
          //let nullorg = { id: "[null]", value: "[null]", label: "无组织" };
          //this.options.push(nullorg);
        })
        .catch(() => {});
    },
    //获取数据
    get_table_data() {
      let org = "";

      if (this.orgselect !== "") {
        org = this.orgselect.pop();
        this.orgselect.push(org);
      }

      this.load_data = true;
      this.$fetch.api_user
        .list({
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          orderBy: this.orderBy,
          orderDirection: this.orderDirection,
          query: this.codeorname,
          code: org
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
          this.$fetch.api_user
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
          this.load_data = false;
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
          this.$fetch.api_user
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
    },
    //重置密码
    openPassword(item) {
      this.$confirm("此操作将重置密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let passworddata = { code: item.code };

        this.$fetch.api_user
          .resetpassword(passworddata)
          .then(({ message }) => {
            this.passwordmessage = message;
            this.dialogpassword = true;
          })
          .catch(() => {
            this.$message.error(message);
          });
      });
    },

    //打开调动
    openEditorg(item) {
      this.dialogorg = true;
      this.title = "调整用户" + item.name + "所在机构";

      if (item.org_ccm != null) {
        let codes = item.org_ccm.split("-");
        this.roworgselect = [];
        for (let i in codes) {
          let code = codes[i];
          this.roworgselect.push(code);
        }
      } else {
        this.roworgselect = [""];
      }
      this.usercode = item.code;
    },

    //调动
    editOrg() {
      let org = this.roworgselect[this.roworgselect.length - 1];

      let editorgdata = { code: this.usercode, orgcode: org };
      this.$fetch.api_user
        .editOrg(editorgdata)
        .then(({ message }) => {
          this.dialogorg = false;
          this.$message.success(message);
          this.get_table_data();
        })
        .catch(() => {
          this.dialogorg = false;
          this.$message.error(message);
        });
    }
  }
};
</script>
