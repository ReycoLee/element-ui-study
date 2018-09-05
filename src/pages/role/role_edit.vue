<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="加载中">
      <div>
        <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="角色编号:" prop="code">
            <el-input :disabled="$route.query.code?true:false" v-model="form.code" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="角色名称:" prop="name">
            <el-input :disabled="$route.query.code?true:false" v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="dataform" style="width: 100%; margin-top: 20px">
          <el-table-column prop="menu_code" label="菜单编号">
          </el-table-column>
          <el-table-column prop="name" label="显示名称">
          </el-table-column>
          <el-table-column label="包含功能">
            <template slot-scope="props">
              <el-button type="text" @click="showFunctionDetail(props.row)">{{ props.row.button_list }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="data_name" label="数据权限">
            <template slot-scope="props">
              <el-select :disabled="$route.name=='roleView'" v-model="props.row.data_code" placeholder="请选择">
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
      </div>
      <div style="margin-top:20px;">
        <div style="float:right; margin-right:20px;">
          <el-button plain @click="addFunctionClick" v-show="$route.name!='roleView'">添加菜单</el-button>
        </div>
        <div style="float:right; margin-right:20px;">
          <el-cascader change-on-select clearable filterable :options="selectOptions" v-model="selectValue" v-show="$route.name!='roleView'">
          </el-cascader>
          </el-select>
        </div>
      </div>
      <div style="margin-top:80px; text-align:center;">
        <el-button type="info" @click="resetClick">重置</el-button>
        <el-button type="primary" @click="saveClick" :loading="on_submit_loading" :disabled="$route.name=='roleView'">保存</el-button>
        <el-button @click="backClick">返回</el-button>
      </div>
    </div>
    <el-dialog title="请选择功能" :visible.sync="dialogFormVisible">
      <el-checkbox :disabled="$route.name=='roleView'" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedFuncs" @change="handleCheckedFuncChange">
        <el-checkbox :disabled="$route.name=='roleView'" v-for="func in checkFunctions" :label="func" :key="func">{{func}}</el-checkbox>
      </el-checkbox-group>
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
      checkTempItems: [] // 当前的按钮数组
    };
  },
  created() {
    this.getPermissionListData();
  },
  methods: {
    // 获取权限菜单
    getPermissionListData() {
      this.load_data = true;
      this.$fetch.api_role
        .rolePermissionList()
        .then(({ data }) => {
          // console.log("权限列表",data)
          this.permissionOptions = data;
          this.load_data = false;
          this.code && this.getData();
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    // 获取角色数据
    getData() {
      this.load_data = true;
      this.$fetch.api_role
        .roleGet({
          code: this.code
        })
        .then(({ data }) => {
          this.form = {
            code: data.code,
            name: data.name,
            id: data.id
          };

          this.$fetch.api_role
            .roleMenuGet({
              code: this.code
            })
            .then(({ data }) => {
              let tempDataForm = [];
              for (let i in data) {
                let obj = data[i];
                if (!obj.menu) {
                  continue;
                }
                let item = {};
                item.permissionOptions = this.permissionOptions; // 数据权限选项列表[]
                item.menu_code = obj.menu_code; //菜单编号
                item.name = obj.menu.name; //菜单名
                item.data_code = obj.data_code; // 菜单的数据权限
                item.button_blacklist = obj.button_blacklist; // 按钮黑名单
                item.button_blacklist =
                  item.button_blacklist === null ? "" : item.button_blacklist;
                item.buttonSelectOptions = obj.buttons; // 全部的按钮[]

                let blackBtnStr = item.button_blacklist; // 按钮黑名单
                let menuButtons = obj.buttons;
                //如果黑名单为空，则代表全部按钮均有
                if (blackBtnStr == "") {
                  item.button_list = "全部";
                } else {
                  let blackBtns = blackBtnStr.split("-");
                  //如果黑名单等于当前按钮名单，代表所有按钮都在黑名单里，所有按钮都无法访问
                  if (blackBtns.length === menuButtons.length) {
                    item.button_list = "无";
                  } else {
                    let buttonListStr = "";
                    for (let j in menuButtons) {
                      let menuButton = menuButtons[j];
                      let code = menuButton.code;

                      let include = false;

                      for (let k in blackBtns) {
                        if (blackBtns[k] === code) {
                          include = true;
                          break;
                        }
                      }
                      if (!include) {
                        if (buttonListStr !== "") {
                          buttonListStr += "-";
                        }
                        buttonListStr += menuButton.name;
                      }
                    }
                    item.button_list = buttonListStr;
                  }
                }
                tempDataForm.push(item);
              }

              this.dataform = tempDataForm;
              if (this.$route.name != "roleView") {
                this.getTreeData();
              }
              this.load_data = false;
            })
            .catch(() => {
              this.load_data = false;
            });
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    // 所有菜单数据
    getTreeData() {
      this.load_data = true;
      this.$fetch.api_menu
        .menuTree({})
        .then(({ data }) => {
          this.load_data = false;
          this.selectOptions = data;
          this.checkDisabledMenu();
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    // 修改角色
    updateRoleData() {
      this.load_data = true;
      this.$fetch.api_role
        .roleChange({
          id: this.form.id,
          code: this.form.code,
          name: this.form.name,
          roleMenus: this.dataform
        })
        .then(({ message }) => {
          this.load_data = false;
          setTimeout(this.$router.back(), 500);
          this.$message.success(message);
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    // 添加功能
    addFunctionClick() {
      // console.log(this.selectValue)
      if (this.selectValue.length == 0) {
        this.$message.error("请先选择菜单");
        return;
      }
      this.getMenuData();
      this.selectValue = [];
    },
    // 当前菜单数据
    getMenuData() {
      let strCode = this.selectValue[this.selectValue.length - 1];
      for (let i in this.dataform) {
        if (this.dataform[i].menu_code == strCode) {
          this.$message.error("菜单已存在");
          return;
        }
      }
      this.load_data = true;
      this.$fetch.api_menu
        .menuDetail({
          code: this.selectValue[this.selectValue.length - 1]
        })
        .then(({ data }) => {
          // console.log("新增菜单", data, data.length)
          if (data.length) {
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                const element = data[key];
                this.menuTransformDataForDataform(element);
              }
            }
          } else {
            this.menuTransformDataForDataform(data);
          }
          this.checkDisabledMenu();
          this.load_data = false;
          // console.log("转化dataform", this.dataform)
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    menuTransformDataForDataform(data) {
      for (let i in this.dataform) {
        if (this.dataform[i].menu_code == data.code) {
          return;
        }
      }
      let btnNameArr = data.button_names ? data.button_names.split("-") : [];
      let btnCodeArr = data.button_codes ? data.button_codes.split("-") : [];
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
    },
    checkDisabledMenu() {
      for (const key in this.dataform) {
        if (this.dataform.hasOwnProperty(key)) {
          const element = this.dataform[key];
          for (const key2 in this.selectOptions) {
            if (this.selectOptions.hasOwnProperty(key2)) {
              let element2 = this.selectOptions[key2];
              if (element2.children) {
                for (const key3 in element2.children) {
                  if (element2.children.hasOwnProperty(key3)) {
                    let element3 = element2.children[key3];
                    if (element3.value == element.menu_code) {
                      element3.disabled = true;
                    }
                  }
                }
              } else {
                if (element2.value == element.menu_code) {
                  element2.disabled = true;
                }
              }
            }
          }
        }
      }
    },
    checkEnabledMenu(item) {
      for (const key in this.selectOptions) {
        if (this.selectOptions.hasOwnProperty(key)) {
          const element2 = this.selectOptions[key];
          if (element2.children) {
            for (const key3 in element2.children) {
              if (element2.children.hasOwnProperty(key3)) {
                const element3 = element2.children[key3];
                if (element3.value == item.menu_code) {
                  element3.disabled = false;
                }
              }
            }
          } else {
            if (element2.value == item.menu_code) {
              element2.disabled = false;
            }
          }
        }
      }
    },
    //单个删除
    deleteData(item) {
      this.$confirm("删除角色菜单, 是否继续操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(item);
          this.dataform.splice(this.dataform.indexOf(item), 1);
          this.checkEnabledMenu(item);
        })
        .catch(() => {});
    },
    // 查看功能
    showFunctionDetail(item) {
      this.checkTempItems = item.buttonSelectOptions;
      let checkFunctions = [];
      item.buttonSelectOptions.map(item => {
        checkFunctions.push(item.name);
      });
      this.checkFunctions = checkFunctions;
      this.selectRowCheckFunc = this.dataform.indexOf(item);
      if (item.button_blacklist == "") {
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
      this.checkAll = value.length == this.checkFunctions.length;
    },
    checkButtonClick(val) {
      this.dialogFormVisible = false;
      if (val) {
        if (this.checkedFuncs.length == this.checkFunctions.length) {
          this.dataform[this.selectRowCheckFunc].button_list = "全部";
          this.dataform[this.selectRowCheckFunc].button_blacklist = "";
        } else if (this.checkedFuncs.length == 0) {
          this.dataform[this.selectRowCheckFunc].button_list = "无";
          this.checkButtonFuncs();
        } else {
          this.dataform[
            this.selectRowCheckFunc
          ].button_list = this.checkedFuncs.join("-");
          this.checkButtonFuncs();
        }
      }
    },
    checkButtonFuncs() {
      this.dataform[this.selectRowCheckFunc].button_blacklist = "";
      this.checkTempItems.map(item => {
        if (!this.checkedFuncs.includes(item.name)) {
          if (this.dataform[this.selectRowCheckFunc].button_blacklist == "") {
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
              this.updateRoleData(); // 修改
              this.on_submit_loading = true;
              setTimeout(() => {
                this.on_submit_loading = false;
              }, 1500);
            } else {
              this.on_submit_loading = false;
              // console.log("保存失败", this.form)
              return false;
            }
          });
        })
        .catch(() => {
          this.on_submit_loading = false;
        });
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
