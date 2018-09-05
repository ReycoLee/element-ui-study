<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中" style="text-align:center;">
      <el-form ref="form" :model="form" size="medium" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="8" :lg="12" :md="12" :sm="12" :xs="12">
            <fieldset>
              <legend>条目信息</legend>
              <el-form-item label="条目编码" prop="code">
                <el-input v-model="form.code" :disabled="isCodeReadOnly" :readonly="allReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="条目名称" prop="name">
                <el-input v-model="form.name" :disabled="isNameReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="条目全称" prop="fullname">
                <el-input v-model="form.fullname" :disabled="isNameReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="条目排序" prop="sort">
                <el-input v-model="form.sort" :disabled="isReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="录入码" prop="pinyin">
                <el-input v-model="form.pinyin" :disabled="isReadOnly" placeholder="如不填，默认为拼音"></el-input>
              </el-form-item>
              <el-form-item label="上级条目">
                <el-input v-model="form.parent_name" v-on:input="clearParentCode" clearable readonly placeholder="请在右侧选择"></el-input>
              </el-form-item>
              <el-form-item label="关联条目">
                <el-input v-model="form.gltm_name" v-on:input="clearGltmbm" clearable readonly placeholder="请在右侧选择"></el-input>
              </el-form-item>
            </fieldset>
          </el-col>
          <el-col :xl="8" :lg="12" :md="12" :sm="12" :xs="12">
            <fieldset>
              <legend>
                <el-select v-model="xztm">
                  <el-option key="0" value="0" label="选择上级条目"/>
                  <el-option key="1" value="1" label="选择关联条目"/>
                </el-select>
              </legend>
              <div class="fixedwrapper" style="height:348px;">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                <el-tree ref="tree" @node-click="handleNodeClick" :data="datatree" node-key="value + label" :default-expanded-keys='parent_code' :props="defaultProps" :filter-node-method="filterNode">
                </el-tree>
              </div>
            </fieldset>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="22" :lg="22" :md="22" :sm="22" :xs="22">
            <el-row type="flex" justify="center">
              <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="isReadOnly">保存</el-button>
                <el-button @click="cancel">返回</el-button>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { panelTitle } from "components";
import connector from "../../connector.js";

export default {
  data() {
    return {
      code: this.$route.query.code,
      rules: {
        sort: [
          {
            required: true,
            message: "条目排序不能为空",
            trigger: "blur"
          },{
            max: 11,
            message: "条目排序最大长度为11"
          }
          
        ],
        fullname: [
          {
            required: true,
            message: "条目全称不能为空",
            trigger: "blur"
          },{
            max: 1000,
            message: "条目全称最大长度为1000"
          }
        ],
        code: [
          {
            required: true,
            message: "条目编码不能为空",
            trigger: "blur"
          },{
            max: 50,
            message: "条目编码最大长度为50"
          }
        ],
        name: [
          {
            required: true,
            message: "条目名称不能为空",
            trigger: "blur"
          },{
            max: 50,
            message: "条目名称最大长度为50"
          }
        ]
      },
      isReadOnly: false,
      isCodeReadOnly: false,
      isNameReadOnly: false,
      load_data: false,
      form: {
        id: "",
        code: "",
        name: "",
        fullname: "",
        parent_code: "",
        parent_name: "",
        sort: "",
        pinyin: "",
        gltm_name: "",
        gltmbm: "",
        gltmfbm: ""
      },
      xztm: "0",
      parent_code: [],
      filterText: "",
      datatree: [{}],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  components: {
    panelTitle
  },

  created() {
    if (this.$route.name !== "dictEntryAdd") {
      // 查看与修改
      this.getData();
      if(this.$route.name === "dictEntryUpdate"){
        this.allReadOnly = true
      }
    }
    if (this.$route.name === "dictEntryView") {
      // 查看
      this.isReadOnly = true;
    } else {
      this.isReadOnly = false;
      this.getTreeData();
    }
  },
  methods: {
    // 当前条目数据
    getData() {
      this.load_data = true;
      this.$fetch.api_dictionary
        .dictionaryEntryDetail({
          code: this.code,
          zdbm: this.$route.query.zdbm
        })
        .then(({ data }) => {
          this.load_data = false;
          this.form.code = data.code;
          this.form.name = data.name;
          this.form.fullname = data.fullname;
          this.form.parent_code = data.parent_code ? data.parent_code : "";
          this.form.parent_name = data.parent_name ? data.parent_name : "";
          this.form.pinyin = data.pinyin;
          this.form.pinyin = data.pinyin;
          this.form.sort = data.sort.toString();
          this.form.id = data.id;
          if(data.gltm_name) {
            data.gltm_name = data.gltm_name.name;
          }
          this.form = data;
          this.isCodeReadOnly = Boolean(
            (data.is_editable === "code_readonly" ||
              data.is_editable === "readonly") | this.isReadOnly
          );
          this.isNameReadOnly = Boolean(
            (data.is_editable === "readonly") | this.isReadOnly
          );
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    // 树数据
    getTreeData() {
      this.load_data = true;
      this.$fetch.api_dictionary
        .dictionaryEntryTree({})
        .then(({ data }) => {
          this.load_data = false;
          this.datatree = data.filter(item => {
            return item.value !== this.code;
          });
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    postData() {
      //新增
      this.load_data = true;
      this.$fetch.api_dictionary
        .dictionaryEntryAdd({
          catalog_code: this.code,
          code: this.form.code,
          name: this.form.name,
          fullname: this.form.fullname,
          parent_code:
            this.form.parent_code == "" ? "null" : this.form.parent_code,
          parent_name: this.form.parent_name,
          pinyin: this.form.pinyin,
          sort: parseInt(this.form.sort),
          gltmbm: this.form.gltmbm
        })
        .then(({ data, message }) => {
          this.load_data = false;
          this.$router.back();
          this.$message.success(message);
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    updateData() {
      //修改
      this.load_data = true;
      let data = {
        id: this.form.id,
        code: this.form.code,
        name: this.form.name,
        fullname: this.form.fullname,
        parent_code:
          this.form.parent_code == "" ? "null" : this.form.parent_code,
        parent_name: this.form.parent_name,
        pinyin: this.form.pinyin,
        sort: parseInt(this.form.sort),
        catalog_code: this.$route.query.zdbm,
        gltmbm: this.form.gltmbm
      };
      this.$fetch.api_dictionary
        .dictionaryEntryUpdate(data)
        .then(({ data, message }) => {
          this.load_data = false;
          this.$router.back();
          this.$message.success(message);
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    handleNodeClick(data, node) {
      //TODO:检查此处
      if (this.$route.name != "menuView") {
        if(node.level === 1) {
          if(this.xztm == '1') {
            this.form.gltmbm = data.value;
            this.form.gltm_name = data.label;
            this.xztm = '0';
            this.xztm = '1';
          }
        }else if(node.level === 2) {
          if(this.xztm == '0') {
            this.form.parent_code = data.value;
            this.form.parent_name = data.label;
          }else{
            this.form.gltmbm = data.value;
            this.form.gltm_name = data.label;
            this.setGltmbm(node.parent);
            this.xztm = '0';
            this.xztm = '1';
          }
        }
      }
    },

    setGltmbm(node) {
      if(node && node.data && node.data.value) {
        this.form.gltmbm = node.data.value + "/" + this.form.gltmbm;
        this.setGltmbm(node.parent);
      }
      /* let node = this.$refs.tree.getNode(value);
      if(node) {
        let parent_node = node.parent;
        if(parent_node && parent_node.data && parent_node.data.value) {
          this.form.gltmbm = parent_node.data.value + "/" + this.form.gltmbm;
          this.setGltmbm(parent_node.data.value + parent_node.data.label);
        }
      } */
    },

    cancel() {
      this.$router.back();
    },
    onSubmit() {
      // connector.$emit('phone', {"name":"条目1","code":"条目编码1"})
      // setTimeout(this.$router.back(), 500)
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.$route.name == "dictEntryAdd") {
            this.postData();
          } else if (this.$route.name == "dictEntryUpdate") {
            this.updateData();
          }
        } else {
          return false;
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    clearParentCode() {
      if(!this.form.parent_name) {
        this.form.parent_code = null;
      }
    },
    clearGltmbm() {
      if(!this.form.gltm_name) {
        this.form.gltmbm = null;
      }
    }
  }
};
</script>
