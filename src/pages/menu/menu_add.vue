<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">
      <el-form ref="form" :model="form" size="medium" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="8" :lg="12" :md="12" :sm="12" :xs="12">
            <fieldset>
              <legend>机构/部门信息</legend>
              <el-form-item label="菜单编码" prop="code">
                <el-input v-model="form.code" :readonly="isReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="菜单名称" prop="name">
                <el-input v-model="form.name" :readonly="isReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="菜单uri" prop="uri">
                <el-input v-model="form.uri" :readonly="isReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="排序号" prop="sort">
                <el-input-number v-model="form.sort" :disabled="isReadOnly" :min="0" label="排序号"></el-input-number>
              </el-form-item>
              <el-form-item label="上级菜单">
                <el-input v-model="form.parent_name" v-if="!isReadOnly" clearable readonly placeholder="请在右侧选择"></el-input>
                <el-input v-model="form.parent_name" v-if="isReadOnly" clearable readonly placeholder=""></el-input>
              </el-form-item>
            </fieldset>
          </el-col>
          <el-col :xl="8" :lg="12" :md="12" :sm="12" :xs="12">
            <fieldset>
              <legend>选择上级菜单</legend>
              <div class="fixedwrapper" style="height:290px;">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                <el-tree ref="tree" @node-click="handleNodeClick" :data="datatree" node-key="id" :default-expanded-keys='parent_code' :props="defaultProps" :filter-node-method="filterNode">
                </el-tree>
              </div>
            </fieldset>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="22" :lg="22" :md="22" :sm="22" :xs="22">
            <el-row type="flex" justify="center">
              <el-form-item>
                <el-button type="primary" @click="onSubmit" v-show="!isReadOnly">保存</el-button>
                <el-button v-if="!isReadOnly" @click="cancel">取消</el-button>
                <el-button type="primary" v-if="isReadOnly" @click="cancel">确定</el-button>
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

export default {
  data() {
    return {
      code: this.$route.query.code,
      rules: {
        sort: [
          {
            required: true,
            message: "排序号不能为空",
            trigger: "blur"
          }
        ],
        uri: [
          {
            required: true,
            message: "菜单uri不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "菜单编码不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "菜单名称不能为空",
            trigger: "blur"
          }
        ]
      },
      isReadOnly: false,
      load_data: false,
      form: {
        id: "",
        code: "",
        name: "",
        uri: "",
        parent_code: "",
        parent_name: "",
        sort: ""
      },
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
    if (this.$route.name !== "menuAdd") {
      this.get_data();
    }
    if (this.$route.name === "menuView") {
      this.isReadOnly = true;
      this.get_tree_data();
    } else {
      this.isReadOnly = false;
      this.get_tree_data();
    }
  },
  methods: {
    // 当前菜单数据
    get_data() {
      this.load_data = true;
      this.$fetch.api_menu
        .menuDetail({
          code: this.code
        })
        .then(({ data }) => {
          // console.log(data)
          this.load_data = false;
          this.form.code = data.code;
          this.form.name = data.name;
          this.form.uri = data.uri;
          this.form.parent_code = data.parent_code ? data.parent_code : "";
          this.form.parent_name = data.parent_name ? data.parent_name : "";
          this.form.sort = data.sort.toString();
          this.form.id = data.id;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    // 树数据
    get_tree_data() {
      this.load_data = true;
      this.$fetch.api_menu
        .menuTree({})
        .then(({ data }) => {
          // console.log(data)
          var dataNew = data;
          dataNew.push({
            id: "",
            value: "",
            label: "无上级菜单"
          });
          this.datatree = dataNew;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    post_data() {
      this.load_data = true;
      this.$fetch.api_menu
        .menuManageAdd({
          code: this.form.code,
          name: this.form.name,
          uri: this.form.uri,
          parent_code: this.form.parent_code,
          parent_name: this.form.parent_name,
          sort: parseInt(this.form.sort)
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
    update_data() {
      this.load_data = true;
      let data = {
        id: this.form.id,
        code: this.form.code,
        name: this.form.name,
        uri: this.form.uri,
        parent_code: this.form.parent_code,
        parent_name: this.form.parent_name,
        sort: parseInt(this.form.sort)
      };
      this.$fetch.api_menu
        .menuUpdate(data)
        .then(({ data, message }) => {
          this.load_data = false;
          this.$router.back();
          this.$message.success(message);
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    handleNodeClick(data) {
      if (this.$route.name !== "menuView") {
        this.form.parent_code = data.value;
        this.form.parent_name = data.label;
      }
    },
    cancel() {
      this.$router.back();
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.$route.name === "menuAdd") {
            this.post_data();
          } else if (this.$route.name === "menuUpdate") {
            this.update_data();
          }
        } else {
          return false;
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>
