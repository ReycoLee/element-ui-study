<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">
      <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="120px">
        <fieldset>
          <legend>角色基本信息</legend>
          <el-form-item label="角色编号:" prop="code">
            <el-input :disabled="$route.query.code?true:false" v-model="form.code" placeholder="角色编号" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="角色名称:" prop="name">
            <el-input :disabled="$route.query.code?true:false" v-model="form.name" placeholder="角色名称" style="width: 250px;"></el-input>
          </el-form-item>
        </fieldset>

        <fieldset>
          <legend>角色权限</legend>
          <el-table :data="dataform" style="width: 100%; margin-top: 20px">
            <el-table-column prop="menu_code" label="菜单编号">
            </el-table-column>
            <el-table-column prop="name" label="显示名称">
            </el-table-column>
            <el-table-column label="包含功能">
              <template slot-scope="props">
                <el-button type="text" :disabled="$route.name=='roleView'" @click="showFunctionDetail(props.row)">{{ props.row.button_list }}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="数据权限">
              <template slot-scope="props">
                <el-select v-model="props.row.data_code" placeholder="请选择">
                  <el-option v-for="item in props.row.permissionOptions" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="props">
                <el-button type="text" @click="deleteData(props.row)" :disabled="$route.name=='roleView'">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top:20px;">
            <div style="float:left; margin-right:20px;">
              <el-button plain @click="addMultiFunctionClick" v-show="$route.name!='roleView'">批量添加</el-button>
            </div>
            <div style="float:right; margin-right:20px;">
              <el-button plain @click="addFunctionClick" v-show="$route.name!='roleView'">添加菜单</el-button>
            </div>
            <div style="float:right; margin-right:20px;">
              <el-cascader clearable filterable :options="selectOptions" v-model="selectValue" v-show="$route.name!='roleView'">
              </el-cascader>
            </div>
          </div>
        </fieldset>

      </el-form>

      <div style="margin-top:80px; text-align:center;">
        <el-button type="info" @click="resetClick">重置</el-button>
        <el-button type="primary" @click="saveClick" :loading="on_submit_loading" :disabled="$route.name=='roleView'">保存</el-button>
        <el-button @click="backClick">返回</el-button>
      </div>
    </div>
    <el-dialog title="请选择功能" :visible.sync="dialogFormVisible">
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedFuncs" @change="handleCheckedFuncChange">
        <el-checkbox v-for="func in checkFunctions" :label="func" :key="func">{{func}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkButtonClick(false)">取 消</el-button>
        <el-button type="primary" @click="checkButtonClick(true)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量添加功能" :visible.sync="openMultiAddDialog" width="50%" center>
      <div style="text-align :center">
        <el-tree ref="tree" :data="selectOptions" node-key="value" :default-checked-keys="multiAddTreeChecked" show-checkbox>
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doMultiAdd">确 定</el-button>
        <el-button @click="openMultiAddDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { panelTitle } from "components";

export default {
  data() {
    return {
      form: {},
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "角色编号不能为空", trigger: "blur" }]
      },
      dataform: [],
      code: this.$route.query.code,
      dialogFormVisible: false,
      load_data: false,
      on_submit_loading: false,
      selectOptions: [],
      selectValue: [],
      // check
      selectRowCheckFunc: null,
      checkAll: false,
      permissionOptions: [],
      checkedFuncs: [],
      checkFunctions: [],
      checkTempItems: [], // 当前的按钮数组
      openMultiAddDialog: false, //是否显示批量添加的弹出窗口
      multiAddTreeChecked: []
    };
  },
  created() {
    this.getPermissionListData();
    this.getTreeData();
  },
  methods: {
    // 获取权限菜单
    getPermissionListData() {
      this.load_data = true;
      this.$fetch.api_role
        .rolePermissionList()
        .then(({ data }) => {
          // console.log("权限列表", data);
          this.permissionOptions = data;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    // 树数据
    getTreeData() {
      this.load_data = true;
      this.$fetch.api_menu
        .menuTree({})
        .then(({ data }) => {
          this.load_data = false;
          this.selectOptions = data;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    // 新增角色
    createRoleData() {
      this.load_data = true;
      this.$fetch.api_role
        .roleAdd({
          code: this.form.code,
          name: this.form.name,
          roleMenus: this.dataform
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
    // 添加菜单
    addFunctionClick() {
      if (this.selectValue.length === 0) {
        this.$message.error("请先选择菜单");
        return;
      }
      this.getMenuData();
      this.selectValue = [];
    },

    /* ↓可通用方法开始↓ */
    //通过code更改一个节点的disabled状态
    changeDisabled(code, state) {
      let rlt = this.recursiveQueryNode(this.selectOptions, code);
      if (rlt) {
        rlt.disabled = state;
      }
      this.changeParentState(this.selectOptions);
    },
    //当所有子节点被禁用时，父节点同样被禁用，此方法为递归调用
    changeParentState(data) {
      //计数器，多少字节点的状态为disabled
      let count = 0;
      for (let index in data) {
        let node = data[index];
        if (node.children && node.children.length > 0) {
          //当有至少一个子节点时，判断子节点是否全部为true，全部为true，则当前节点也为true，否则为false
          //此处用了递归调用
          if (this.changeParentState(node.children)) {
            node.disabled = true;
            count++;
          } else {
            node.disabled = false;
          }
        } else if (
          (node.children && node.children.length === 0) ||
          !node.children
        ) {
          //没有子节点时，递归终止，按照当前节点的状态判断是否为disabled
          if (node.disabled) {
            count++;
          }
        }
      }
      //当所有节点均为true时，返回true，否则返回false，供上一级判断
      if (count === data.length) {
        return true;
      } else {
        return false;
      }
    },
    //递归查询数据
    recursiveQueryNode(data, code) {
      for (let index in data) {
        let node = data[index];
        if (node.value === code) {
          return node;
        } else if (node.children) {
          let rlt = this.recursiveQueryNode(node.children, code);
          if (rlt) {
            return rlt;
          }
        }
      }
      return null;
    },
    /* ↑可通用方法结束↑ */

    // 当前菜单数据
    getMenuData() {
      let strCode = this.selectValue[this.selectValue.length - 1];
      this.changeDisabled(strCode, true);

      /* for (let i in this.dataform) {
        if (this.dataform[i].menu_code === strCode) {
          this.$message.error("菜单已存在");
          return;
        }
      } */
      this.load_data = true;
      this.$fetch.api_menu
        .menuDetail({
          code: strCode
        })
        .then(({ data }) => {
          // console.log(data);

          this.load_data = false;
          let btnNameArr = data.button_names
            ? data.button_names.split("-")
            : [];
          let btnCodeArr = data.button_codes
            ? data.button_codes.split("-")
            : [];
          let checkFunctions = [];
          for (let i in btnNameArr) {
            checkFunctions.push({
              name: btnNameArr[i],
              code: btnCodeArr[i]
            });
          }
          this.dataform.push({
            menu_code: data.code,
            name: data.name,
            data_code: this.permissionOptions[0].code,
            permissionOptions: this.permissionOptions,
            button_list: "全部",
            button_blacklist: "",
            buttonSelectOptions: checkFunctions
          });
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //批量添加菜单
    addMultiFunctionClick() {
      this.multiAddTreeChecked = [];
      this.recursiveChangeCheckedNode(this.selectOptions);
      this.openMultiAddDialog = true; //打开批量添加的窗口
    },
    //递归设置已选择的节点状态
    recursiveChangeCheckedNode(data) {
      for (let i in data) {
        var node = data[i];
        if (node.disabled) {
          this.multiAddTreeChecked.push(node.value);
        }
        if (node.children && node.children.length > 0) {
          this.recursiveChangeCheckedNode(node.children);
        }
      }
    },
    //进行批量操作
    doMultiAdd() {
      let data = this.$refs.tree.getCheckedNodes();
      for (let i in data) {
        let node = data[i];
        if (!node.disabled && (!node.children || node.children.length === 0)) {
          this.selectValue = [node.value];
          this.getMenuData();
          this.selectValue = [];
        }
      }
      this.openMultiAddDialog = false; //关闭批量添加的窗口
    },
    //单个删除
    deleteData(item) {
      this.$confirm("删除角色菜单, 是否继续操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.changeDisabled(item.menu_code, false);
          this.dataform.splice(this.dataform.indexOf(item), 1);
        })
        .catch(() => {});
    },
    // 查看功能
    showFunctionDetail(item) {
      // console.log(item);
      this.checkTempItems = item.buttonSelectOptions;
      let checkFunctions = [];
      item.buttonSelectOptions.map(item => {
        checkFunctions.push(item.name);
      });
      this.checkFunctions = checkFunctions;
      this.selectRowCheckFunc = this.dataform.indexOf(item);
      if (item.button_blacklist === "") {
        this.checkedFuncs = this.checkFunctions;
        this.checkAll = true;
      } else {
        let checkedFuncs = [];
        for (let i in item.buttonSelectOptions) {
          if (
            !item.button_blacklist.includes(item.buttonSelectOptions[i].code)
          ) {
            checkedFuncs.push(item.buttonSelectOptions[i].name);
          }
        }
        this.checkedFuncs = checkedFuncs;
        this.checkAll = false;
      }
      this.dialogFormVisible = true;
    },
    handleCheckAllChange(val) {
      this.checkedFuncs = val ? this.checkFunctions : [];
    },
    handleCheckedFuncChange(value) {
      this.checkAll = value.length === this.checkFunctions.length;
    },
    checkButtonClick(val) {
      this.dialogFormVisible = false;
      if (val) {
        if (this.checkedFuncs.length === this.checkFunctions.length) {
          this.dataform[this.selectRowCheckFunc].button_list = "全部";
          this.dataform[this.selectRowCheckFunc].button_blacklist = "";
        } else if (this.checkedFuncs.length === 0) {
          this.dataform[this.selectRowCheckFunc].button_list = "请选择";
          this.checkButtonFuncs();
        } else {
          this.dataform[
            this.selectRowCheckFunc
          ].button_list = this.checkedFuncs.join("-");
          this.checkButtonFuncs();
        }
      }
      // console.log(
      //   "button_blacklist",
      //   this.dataform[this.selectRowCheckFunc].button_blacklist
      // );
    },
    checkButtonFuncs() {
      this.dataform[this.selectRowCheckFunc].button_blacklist = "";
      this.checkTempItems.map(item => {
        if (!this.checkedFuncs.includes(item.name)) {
          if (this.dataform[this.selectRowCheckFunc].button_blacklist === "") {
            this.dataform[this.selectRowCheckFunc].button_blacklist +=
              item.code;
          } else {
            this.dataform[this.selectRowCheckFunc].button_blacklist +=
              "-" + item.code;
          }
        }
      });
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
          this.$refs.form.validate(valid => {
            if (valid) {
              this.createRoleData(); // 新增
              this.on_submit_loading = true;
              setTimeout(() => {
                this.on_submit_loading = false;
              }, 1500);
            } else {
              // console.log("保存失败", this.form)
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
    panelTitle
  }
};
</script>
