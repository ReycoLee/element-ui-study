<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" style="width: 60%;">
        <el-form-item label="数据权限编码" prop="code">
          <el-input v-model="form.code" :disabled="isChanged"></el-input>
        </el-form-item>
        <el-form-item label="数据权限名称" prop="name">
          <el-input v-model="form.name" :disabled="isChanged"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="SQL语句" prop="custom_rule">
          <el-input v-model="form.custom_rule" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="primary" @click="saveClick">保存</el-button>
          <el-button @click="backClick">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      //请求时的loading效果
      load_data: false,
      isChanged: false,
      code: this.$route.query.code,
      form: {
        id: "",
        name: "",
        code: "",
        sort: "",
        custom_rule: "",
        type: ""
      },
      rules: {
        name: [
          { required: true, message: "数据权限名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "数据权限编码不能为空", trigger: "blur" }
        ],
        sort: [{ required: true, message: "排序号不能为空", trigger: "blur" }]
        // custom_rule: [{required: true, message: 'SQL语句不能为空', trigger: 'blur'}]
      }
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    if (this.$route.name === "dataPermissionUpdate") {
      this.isChanged = true;
      this.getData();
    } else {
      this.isChanged = false;
    }
  },
  methods: {
    getData() {
      this.load_data = true;
      this.$fetch.api_dataPermission
        .dataPermissionDetail({
          code: this.code
        })
        .then(({ data }) => {
          this.load_data = false;
          // console.log(data);
          this.form.name = data.name;
          this.form.code = data.code;
          this.form.sort = data.sort.toString();
          this.form.id = data.id;
          this.form.custom_rule =
            data.type === "预设规则" ? data.preset_rule : data.custom_rule;
          this.form.type = data.type;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    updateData() {
      this.load_data = true;
      this.$fetch.api_dataPermission
        .dataPermissionUpdate(this.form)
        .then(({ data }) => {
          this.load_data = false;
          this.$router.back();
          this.$message.success(message);
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    createData() {
      this.load_data = true;
      this.$fetch.api_dataPermission
        .dataPermissionAdd(this.form)
        .then(({ message }) => {
          this.load_data = false;
          this.$router.back();
          this.$message.success(message);
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    saveClick() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.type = "custom";
          if (this.isChanged) {
            this.updateData(); // 修改
          } else {
            this.createData(); // 新增
          }
        } else {
          return false;
        }
      });
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>
