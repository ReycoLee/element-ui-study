<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="loadData"
         element-loading-text="加载中">
      <el-row :gutter="20">
        <el-col  :xl="12" :lg="12" :md="12" :sm="12" :xs="12">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="字典编码:" prop="code">
              <el-input :disabled="$route.query.code?true:false" v-model="form.code" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="字典名称:" prop="name">
              <el-input :disabled="$route.query.code?true:false" v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <div style="margin-top:20px; text-align:center;">
          <el-button type="primary" @click="saveClick" :loading="onSubmitLoading" :disabled="$route.name=='roleView'">保存</el-button>
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
      form: {},
      rules: {
        name: [{ required: true, message: "字典名称不能为空", trigger: "blur" },{max: 50,message: "字典名称最大长度为50"}],
        code: [{ required: true, message: "字典编码不能为空", trigger: "blur" },{max: 32,message: "字典名称最大长度为32"}]
      },
      //请求时的loading效果
      loadData: false
    };
  },
  created() {
  },
  methods: {
    // 新增角色
    createDictData() {
      this.load_data = true;
      this.$fetch.api_dictionary
        .dictionaryAdd({
          code: this.form.code,
          name: this.form.name
        })
        .then(({ data }) => {
          this.load_data = false;
          setTimeout(this.$router.back(), 500);
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
      this.$confirm("保存所填内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 保存操作
          this.$refs.form.validate(valid => {
            if (valid) {
              this.createDictData()
            } else {
              return false;
            }
          });
        })
        .catch(() => {});
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
