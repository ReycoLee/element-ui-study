<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="加载中">
      <el-row>
        <el-col :offset="6" :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-form-item label="采番KEY" prop="cfzdm">
              <el-input v-model="form.cfzdm" placeholder="请输入采番KEY" @blur="saibongKeyChangeClick" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="采番说明" prop="cfsm">
               <el-input v-model="form.cfsm" placeholder="请输入采番说明" maxlength="25" style="width:250px;"></el-input>
            </el-form-item>
            <el-form-item label="头文字" prop="twz">
              <el-input v-model="form.twz" placeholder="请输入头文字" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="流水长度" prop="lscd">
              <el-input v-model="form.lscd" placeholder="请输入流水长度" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="分隔符" prop="fgf">
              <el-input v-model="form.fgf" placeholder="请输入分隔符" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="番号组成顺序1" prop="sx1">
              <el-select v-model="form.sx1" placeholder="请选择" style="width: 250px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="番号组成顺序2" prop="sx2">
              <el-select v-model="form.sx2" placeholder="请选择" style="width: 250px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="番号组成顺序3" prop="sx3">
              <el-select v-model="form.sx3" placeholder="请选择" style="width: 250px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="补0规则:">
              <el-radio-group v-model="form.isb0" style="width: 250px;">
                <el-radio label="1">不补</el-radio>
                <el-radio label="2">左补</el-radio>
                <el-radio label="3">右补</el-radio>
              </el-radio-group>
            </el-form-item>
             <el-form-item label="初始流水号" prop="dqlsh">
              <el-input v-model="form.dqlsh" placeholder="请输入初始流水号" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitForm" :loading="on_submit_loading">提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle } from "components";
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        cfzdm: "",
        twz: "",
        lscd: "",
        fgf: "",
        sx1: "",
        sx2: "",
        sx3: "",
        isb0: "1",
        cfsm:"",
        dqlsh:""
      },
      options: [{
        value: '1',
        label: '头文字'
      }, {
        value: '2',
        label: '中间值'
      }, {
        value: '3',
        label: '流水号'
      }],
      load_data: false,
      on_submit_loading: false,
      rules: {
        cfzdm: [{ required: true, message: "采番KEY不能为空", trigger: "blur" }],
        lscd: [{ required: true, message: "流水长度不能为空", trigger: "blur" }],
        sx1: [{ required: true, message: "番号组成顺序1不能为空", trigger: "blur" }],
        sx2: [{ required: true, message: "番号组成顺序2不能为空", trigger: "blur" }],
        sx3: [{ required: true, message: "番号组成顺序3不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
  },
  methods: {
    saibongKeyChangeClick(){
      this.getFormData()
    },
    //获取数据
    getFormData() {
      this.$fetch.api_saibong
        .saibongItem({
          cfzdm: this.form.cfzdm
        })
        .then(({ data }) => {
          // console.log(data)
          if(data.saibongRules!=null){
            this.$message.error("该采番KEY已存在,请重新输入")
            this.form.cfzdm = ""
          }
        })
        .catch(() => {
        });
    },
    //提交
    onSubmitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;
        this.on_submit_loading = true;
        this.$fetch.api_saibong
          .saibongAdd(this.form)
          .then(({ data }) => {
            this.$message.success(data.msg)
            this.on_submit_loading = false
            setTimeout(this.$router.back(), 500);
          })
          .catch(() => {
            this.on_submit_loading = false;
          });
      });
    }
  },
  components: {
    panelTitle
  }
};
</script>
