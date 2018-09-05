<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="loadData" element-loading-text="加载中">
      <el-row :gutter="20">
        <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="12">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="API编码:" prop="code">
              <el-input :readonly="($route.name === 'apiView'|| $route.name =='apiEdit')? true : false" v-model="form.code" placeholder="请输入内容" style="width: 250px;">
              </el-input>
            </el-form-item>
            <el-form-item label="API名称:" prop="name">
              <el-input :readonly="$route.name === 'apiView'?true:false" v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="API地址:" prop="url">
              <el-input :readonly="$route.name === 'apiView'?true:false" v-model="form.url" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <div style="margin-top:20px; text-align:center;">
          <el-button type="primary" @click="saveClick" :loading="onSubmitLoading" v-if="$route.name!='apiView'">保存</el-button>
          <el-button @click="backClick">返回</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      onSubmitLoading: false,
      load_data: false,
      form: {
        name: "",
        code: "",
        url: "",
        id: ""
      },
      rules: {
        name: [{ required: true, message: "API名称不能为空", trigger: "blur" }],
        code: [{ required: true, message: "API编号不能为空", trigger: "blur" }],
        url: [{ required: true, message: "API地址不能为空", trigger: "blur" }]
      },
      //请求时的loading效果
      loadData: false
    };
  },
  created() {
    if (this.$route.name != "apiAdd") {
      this.form.name = this.$route.query.name;
      this.form.code = this.$route.query.code;
      this.form.url = this.$route.query.url;
      this.form.id = this.$route.query.id;
    }
  },
  methods: {
    post_data() {
      this.load_data = true;
      this.$fetch.api_api
        .apiAdd(this.form)
        .then(({ data, message }) => {
          this.load_data = false;
          this.$router.back();
          this.$message.success(message);
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    update_data() {
      this.load_data = true;
      this.$fetch.api_api
        .apiUpdate(this.form)
        .then(({ data, message }) => {
          this.load_data = false;
          this.$router.back();
          this.$message.success(message);
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    // 重置
    resetClick() {
      this.$router.go(0);
    },
    // 保存
    saveClick() {
      // 保存操作
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.$route.name == "apiAdd") {
            this.post_data();
          } else if (this.$route.name == "apiUpdate") {
            this.update_data();
          }
        } else {
          // console.log("保存失败", this.form)
          return false;
        }
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
