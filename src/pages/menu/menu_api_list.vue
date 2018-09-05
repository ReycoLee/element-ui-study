<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">
      <div>
        <el-form :inline="true" :rules="rules" label-width="150px">
          <el-form-item label="菜单/按钮编号:" prop="code">
            <el-input :disabled="true" v-model="code" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="菜单/按钮名称:" prop="name">
            <el-input :disabled="true" v-model="name" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <fieldset>
        <legend>API列表</legend>
        <el-table :data="dataform" style="width: 100%;">
          <el-table-column prop="name" label="API名称" width="150">
          </el-table-column>
          <el-table-column prop="url" label="API详情">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="props">
              <el-button type="text" @click="deleteData(props.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button plain @click="addButtonClick" style="float:right; margin-top:20px; margin-right:20px;">添加API</el-button>
      </fieldset>
      <div style="margin-top:20px; text-align:center;">
        <el-button @click="resetClick">重置</el-button>
        <el-button @click="saveClick" :loading="on_submit_loading">保存</el-button>
        <el-button @click="backClick">返回</el-button>
      </div>
    </div>
    <el-dialog title="添加API" :visible.sync="dialogFormVisible">
      <el-select v-model="selectedValue" filterable clearable :filter-method="filterMethod" placeholder="请输入关键信息进行搜索" style="width: 100%">
        <el-option v-for="item in apiOptions" :key="item.code" :label="item.name" :value="item.code">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkButtonClick(false)">取 消</el-button>
        <el-button type="primary" @click="checkButtonClick(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { panelTitle } from "components";

export default {
  data() {
    return {
      dataform: [],
      name: this.$route.query.name,
      code: this.$route.query.code,
      type: this.$route.query.type,
      load_data: false,
      on_submit_loading: false,
      rules: {
        name: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "菜单编号不能为空", trigger: "blur" }]
      },
      dialogFormVisible: false,
      // 弹出框
      apiList: [],
      apiOptions: [],
      selectedValue: ""
    };
  },
  created() {
    if (this.type == "menu") {
      this.getMenuFormData();
    } else {
      this.getButtonFormData();
    }
    this.getApiList();
  },
  methods: {
    getApiList() {
      this.load_data = true;
      this.$fetch.api_menu
        .allApi({
          code: this.code
        })
        .then(({ data }) => {
          this.apiList = data;
          this.apiOptions = data;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //获取菜单数据
    getMenuFormData() {
      this.load_data = true;
      this.$fetch.api_menu
        .menuApiList({
          code: this.code
        })
        .then(({ data }) => {
          this.dataform = data;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //获取按钮数据
    getButtonFormData() {
      this.load_data = true;
      this.$fetch.api_menu
        .buttonApiList({
          code: this.code
        })
        .then(({ data }) => {
          this.dataform = data;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //获取按钮数据
    updateMenuFormData() {
      let codes = "";
      this.dataform.map(item => {
        if (codes === "") {
          codes += item.code;
        } else {
          codes += "-" + item.code;
        }
      });
      this.load_data = true;
      this.$fetch.api_menu
        .menuApiUpdate({
          code: this.code,
          apiList: codes
        })
        .then(({ message }) => {
          this.$router.back();
          this.$message.success(message);
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //获取按钮数据
    updateButtonFormData() {
      let codes = "";
      this.dataform.map(item => {
        if (codes === "") {
          codes += item.code;
        } else {
          codes += "-" + item.code;
        }
      });
      this.load_data = true;
      this.$fetch.api_menu
        .buttonApiUpdate({
          code: this.code,
          apiList: codes
        })
        .then(({ message }) => {
          this.$router.back();
          this.$message.success(message);
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //单个删除
    deleteData(item) {
      this.$confirm("删除该菜单/按钮下面的API权限, 是否继续操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dataform.splice(this.dataform.indexOf(item), 1);
        })
        .catch(() => {});
    },
    // 添加功能
    addButtonClick() {
      this.dialogFormVisible = true;
    },
    filterMethod(query) {
      if (query !== "") {
        this.apiOptions = this.apiList.filter(item => {
          return (
            item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            item.code.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        });
      } else {
        this.apiOptions = this.apiList;
      }
    },
    checkButtonClick(val) {
      this.dialogFormVisible = false;
      if (val) {
        for (const key in this.dataform) {
          if (this.dataform.hasOwnProperty(key)) {
            const element = this.dataform[key];
            if (element.code === this.selectedValue) {
              this.selectedValue = "";
              this.$message.warning("已包含该url");
              return;
            }
          }
        }
        for (const item in this.apiList) {
          if (this.apiList.hasOwnProperty(item)) {
            const element = this.apiList[item];
            if (element.code === this.selectedValue) {
              this.dataform.push(element);
              this.selectedValue = "";
            }
          }
        }
      }
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
          // this.on_submit_loading = true
          if (this.type == "menu") {
            this.updateMenuFormData();
          } else {
            this.updateButtonFormData();
          }
        })
        .catch(() => {});
    },
    // 返回
    backClick() {
      setTimeout(this.$router.back(), 500);
    }
  },
  components: {
    panelTitle
  }
};
</script>
