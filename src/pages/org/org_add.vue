<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" element-loading-text="加载中">
      <el-form ref="form" :model="form" size="medium" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="8" :lg="12" :md="12" :sm="12" :xs="12">
            <fieldset>
              <legend>机构/部门信息</legend>
              <el-input v-model="form.id" v-if='hidden'></el-input>
              <el-form-item label="类别" prop="type">
                <el-radio-group v-model="form.type" prop="type" :disabled="isReadOnly">
                  <el-radio-button label="机构"></el-radio-button>
                  <el-radio-button label="下设部门"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="机构编码" prop="code">
                <el-input v-model="form.code" :readonly="isReadOnly || clpReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="机构名称" prop="name">
                <el-input v-model="form.name" :readonly="isReadOnly"></el-input>
              </el-form-item>
              <el-form-item label="机构全称" prop="fullname">
                <el-input v-model="form.fullname" :readonly="isReadOnly"></el-input>
              </el-form-item>

              <el-form-item label="上级机构code" v-show='hidden'>
                <el-input v-model="form.parent_code"></el-input>
              </el-form-item>

              <el-form-item label="上级机构">
                <el-input v-model="form.parent_name" v-if="!isReadOnly" readonly="readonly" placeholder="请在右侧选择"></el-input>
                <el-input v-model="form.parent_name" v-if="isReadOnly" readonly="readonly" placeholder=""></el-input>
              </el-form-item>

              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark" :readonly="isReadOnly"></el-input>
              </el-form-item>
            </fieldset>
          </el-col>
          <el-col :xl="8" :lg="12" :md="12" :sm="12" :xs="12" v-if="!isReadOnly">
            <fieldset>
              <legend>选择上级机构/部门</legend>
              <div class="fixedwrapper" style="height:370px;">

                <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

                <el-tree ref="tree" @node-click="handleNodeClick" :data="datatree" :default-expanded-keys='parent_code' :props="defaultProps" :filter-node-method="filterNode">
                </el-tree>
              </div>
            </fieldset>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="4" :xl="14" :lg="14" :md="21" :sm="21" :xs="21">
            <el-row type="flex" justify="center">
              <el-form-item>
                <el-button type="primary" @click="onSubmit" v-if='showable'>{{buttonname}}</el-button>
                <el-button v-if="showable" @click="cancel">取消</el-button>
                <el-button type="primary" v-if="!showable" @click="cancel">确定</el-button>
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
      buttonname: "",
      rules: {
        type: [
          {
            required: true,
            message: "类别不能为空",
            trigger: "blur"
          }
        ],
        fullname: [
          {
            required: true,
            message: "机构全称不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "机构编码不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "机构名称不能为空",
            trigger: "blur"
          }
        ]
      },
      isReadOnly: "",
      clpReadOnly: false,
      showable: "",
      form: {
        id: "",
        type: "机构",
        code: "",
        name: "",
        fullname: "",
        parent_code: "",
        parent_name: "",
        remark: ""
      },
      hidden: false,
      parent_code: [],
      filterText: "",
      datatree: [],
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
  //挂载方法
  created() {
    if (this.$route.meta.type === "add") {
      this.buttonname = "新增";
    } else {
      this.buttonname = "修改";
    }
    if (this.$route.meta.type === "view") {
      //readonly 按钮显示
      this.showable = false;
      this.isReadOnly = true;
    } else {
      this.showable = true;
      this.isReadOnly = false;
    }
    if (this.$route.meta.type !== "add") {
      this.get_data();
      this.clpReadOnly = true;
    }
    this.get_tree_data();
  },
  methods: {
    get_data() {
      this.$fetch.api_org
        .getOrg({
          code: this.$route.params.code
        })
        .then(({ data }) => {
          this.form = data;
          if (data.type === "org") {
            this.form.type = "机构";
          } else {
            this.form.type = "下设部门";
          }

          this.parent_code.push(data.parent_code);
        })
        .catch(() => {});
    },

    get_tree_data() {
      this.$fetch.api_org
        .getOrgTree({})
        .then(({ data }) => {
          this.datatree = data;
          let nullorg = { value: "", label: "无上级机构" };
          this.datatree.push(nullorg);
        })
        .catch(() => {});
    },

    handleNodeClick(data) {
      if (this.$route.meta.type !== "view") {
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
          if (this.form.type === "机构") {
            this.form.type = "org";
          } else {
            this.form.type = "dept";
          }

          if (this.$route.meta.type === "add") {
            this.$fetch.api_org
              .add(this.form)
              .then(({ message }) => {
                this.$message.success(message);
                this.$router.back();
              })
              .catch(() => {
                this.$message.error(message);
              });
          } else {
            this.$fetch.api_org
              .edit(this.form)
              .then(({ message }) => {
                if (this.form.type === "org") {
                  this.form.type = "机构";
                } else {
                  this.form.type = "下设部门";
                }
                this.$message.success(message);
                this.$router.back();
              })
              .catch(() => {
                this.$message.error(message);
              });
          }
        } else {
          this.$message.error("请填写完整信息！");
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
