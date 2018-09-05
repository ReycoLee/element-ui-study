<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">
      <div>
        <el-form :inline="true" :rules="rules" label-width="120px">
          <el-form-item label="菜单编号:" prop="code">
            <el-input :disabled="true" v-model="code" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称:" prop="name">
            <el-input :disabled="true" v-model="name" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <fieldset>
        <legend>按钮配置</legend>
        <el-table :data="dataform" style="width: 100%;">
          <el-table-column prop="code" label="按钮编码">
          </el-table-column>
          <el-table-column prop="name" label="按钮名称">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props">
              <el-button type="text" @click="deleteData(props.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button plain @click="addButtonClick" style="float:right; margin-top:20px; margin-right:20px;">添加按钮</el-button>
      </fieldset>
      <div style="margin-top:20px; text-align:center;">
        <el-button type="info" @click="resetClick">重置</el-button>
        <el-button type="primary" @click="saveClick" :loading="on_submit_loading">保存</el-button>
        <el-button @click="backClick">返回</el-button>
      </div>
    </div>
    <el-dialog title="添加按钮" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="按钮编码" :label-width="formLabelWidth">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="按钮名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
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
      load_data: false,
      on_submit_loading: false,
      rules: {
        name: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "菜单编号不能为空", trigger: "blur" }]
      },
      dialogFormVisible: false,
      form: {
        name: "",
        code: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    //获取数据
    getFormData() {
      this.load_data = true;
      this.$fetch.api_menu
        .menuButtonList({
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
    //上传数据
    putFormData() {
      this.load_data = true;
      this.$fetch.api_menu
        .menuButtonListUpdate({
          code: this.code,
          buttons: this.dataform
        })
        .then(data => {
          // console.log(data)
          this.load_data = false;
          this.on_submit_loading = false;
          this.$router.back();
          if (data.message.indexOf("修改失败") != -1) {
            this.$message.warning(data.message);
          } else {
            this.$message.success(data.message);
          }
        })
        .catch(error => {
          // console.log(error)
          this.load_data = false;
          this.on_submit_loading = false;
        });
    },
    //单个删除
    deleteData(item) {
      this.dataform.splice(this.dataform.indexOf(item), 1);
    },
    // 添加功能
    addButtonClick() {
      this.dialogFormVisible = true;
    },
    checkButtonClick(val) {
      this.dialogFormVisible = false;
      if (val) {
        if (this.form.code == "" || this.form.name == "") {
          this.$message.error("请填写完整的按钮信息");
          return;
        }
        let button = { code: this.form.code, name: this.form.name };
        this.dataform.push(button);
        this.form = { name: "", code: "" };
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
          this.on_submit_loading = true;
          // console.log(this.dataform)
          this.putFormData();
          // setTimeout(()=>{this.on_submit_loading = false}, 1500)
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
