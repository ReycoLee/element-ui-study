import Vue from "vue";
import VueRouter from "vue-router";
import store from "store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//import components

//系统
import viewPageComponent from "pages/App";
import homeComponent from "pages/home";
import noPageComponent from "pages/error/404";
import loginComponent from "pages/login/login";

//机构管理
import orgComponent from "pages/org/org_base";
import orgAddComponent from "pages/org/org_add";
import orgUserComponent from "pages/org/org_user";
import orgPermissionComponent from "pages/org/org_permission";

//用户管理
import userComponent from "pages/user/user_base";
import userAddComponent from "pages/user/user_add";
import userPermissionComponent from "pages/user/user_permission";

//角色管理
import roleComponent from "pages/role/role_base";
import roleEditComponent from "pages/role/role_edit";
import roleAddComponent from "pages/role/role_add";
import rolePermissionComponent from "pages/role/role_permission";

//数据权限
import dataPermissionComponent from "pages/dataPermission/data_permission_base";
import dataPermissionViewComponent from "pages/dataPermission/data_permission_view";
import dataPermissionAddComponent from "pages/dataPermission/data_permission_add";

//菜单管理
import menuComponent from "pages/menu/menu_base";
import menuAddComponent from "pages/menu/menu_add";
import menuButtonComponent from "pages/menu/menu_button";
import menuAPIComponent from "pages/menu/menu_api";
import menuAPIListComponent from "pages/menu/menu_api_list";

//采番
import saibongComponent from "pages/saibong/saibong_base";
import saibongEditComponent from "pages/saibong/saibong_edit";
import saibongAddComponent from "pages/saibong/saibong_add";

//数据字典
import dictComponent from "pages/dictionary/dict_base";
import dictAddComponent from "pages/dictionary/dict_add";
import dictEditComponent from "pages/dictionary/dict_edit";
import dictEntryAddComponent from "pages/dictionary/dict_entry_add";

// api管理
import apiComponent from "pages/api/api_base";
import apiEditComponent from "pages/api/api_edit";

// 日志管理
import logComponent from "pages/log/log_base";

// 个人信息
import userInfoComponent from "pages/userInfo/user_info";

// SSO
import ssoComponent from "pages/userInfo/sso";

Vue.use(VueRouter);

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: "/404",
  name: "notPage",
  component: noPageComponent
},
{
  path: "*",
  redirect: "/404"
},
//SSO
{
  path: "/sso",
  name: "sso",
  component: ssoComponent
},
{
  path: "/login",
  name: "login",
  component: loginComponent
},
{
  path: "/",
  redirect: "/home",
  component: viewPageComponent,
  children: [
    //主页
    {
      path: "/home",
      name: "home",
      component: homeComponent,
      meta: {
        title: "主页",
        auth: true
      }
    },

    //机构管理
    {
      path: "/org/list",
      activePath: "/org/list",
      name: "orgBase",
      component: orgComponent,
      meta: {
        title: "机构管理",
        auth: true
      }
    },
    {
      path: "/org/view/:code",
      activePath: "/org/list",
      name: "orgView",
      component: orgAddComponent,
      meta: {
        title: "机构查看",
        type: "view",
        auth: true
      }
    },
    {
      path: "/org/add",
      activePath: "/org/list",
      name: "orgAdd",
      component: orgAddComponent,
      meta: {
        title: "机构新增",
        type: "add",
        auth: true
      }
    },
    {
      path: "/org/update/:code",
      activePath: "/org/list",
      name: "orgUpdate",
      component: orgAddComponent,
      meta: {
        title: "机构修改",
        type: "update",
        auth: true
      }
    },

    //用户管理
    {
      path: "/org/user/:code",
      activePath: "/org/list",
      name: "orgUser",
      component: orgUserComponent,
      meta: {
        title: "用户管理",
        auth: true
      }
    },
    {
      path: "/org/permission/:code",
      activePath: "/org/list",
      name: "orgPermission",
      component: orgPermissionComponent,
      meta: {
        title: "机构授权",
        auth: true
      }
    },
    {
      path: "/user/list",
      activePath: "/user/list",
      name: "userBase",
      component: userComponent,
      meta: {
        title: "用户管理",
        auth: true
      }
    },
    {
      path: "/user/view/:code",
      activePath: "/user/list",
      name: "userView",
      component: userAddComponent,
      meta: {
        title: "用户查看",
        type: "view",
        auth: true
      }
    },
    {
      path: "/user/add",
      activePath: "/user/list",
      name: "userAdd",
      component: userAddComponent,
      meta: {
        title: "用户新增",
        type: "add",
        auth: true
      }
    },
    {
      path: "/user/update/:code",
      activePath: "/user/list",
      name: "userUpdate",
      component: userAddComponent,
      meta: {
        title: "用户修改",
        type: "update",
        auth: true
      }
    },
    {
      path: "/user/permission/:code",
      activePath: "/user/list",
      name: "userPermission",
      component: userPermissionComponent,
      meta: {
        title: "用户授权",
        auth: true
      }
    },

    //角色管理
    {
      path: "/role/list",
      activePath: "/role/list",
      name: "roleBase",
      component: roleComponent,
      meta: {
        title: "角色管理",
        auth: true
      }
    },
    {
      path: "/role/Permission/",
      activePath: "/role/list",
      name: "rolePermission",
      component: rolePermissionComponent,
      meta: {
        title: "角色授权",
        auth: true
      }
    },
    {
      path: "/role/update/",
      activePath: "/role/list",
      name: "roleUpdate",
      component: roleEditComponent,
      meta: {
        title: "角色修改",
        auth: true
      }
    },
    {
      path: "/role/view/",
      activePath: "/role/list",
      name: "roleView",
      component: roleEditComponent,
      meta: {
        title: "查看角色",
        auth: true
      }
    },
    {
      path: "/role/add",
      activePath: "/role/list",
      name: "roleAdd",
      component: roleAddComponent,
      meta: {
        title: "新增角色",
        auth: true
      }
    },

    //数据权限
    {
      path: "/dataPermission/list",
      activePath: "/dataPermission/list",
      name: "dataPermissionBase",
      component: dataPermissionComponent,
      meta: {
        title: "数据权限",
        auth: true
      }
    },
    {
      path: "/dataPermission/view",
      activePath: "/dataPermission/list",
      name: "dataPermissionView",
      component: dataPermissionViewComponent,
      meta: {
        title: "数据权限查看",
        auth: true
      }
    },
    {
      path: "/dataPermission/add",
      activePath: "/dataPermission/list",
      name: "dataPermissionAdd",
      component: dataPermissionAddComponent,
      meta: {
        title: "新增自定义数据权限",
        auth: true
      }
    },
    {
      path: "/dataPermission/update",
      activePath: "/dataPermission/list",
      name: "dataPermissionUpdate",
      component: dataPermissionAddComponent,
      meta: {
        title: "修改自定义数据权限",
        auth: true
      }
    },

    //菜单
    {
      path: "/menu/list",
      activePath: "/menu/list",
      name: "menuBase",
      component: menuComponent,
      meta: {
        title: "菜单管理",
        auth: true
      }
    },
    {
      path: "/menuManagement/view",
      activePath: "/menu/list",
      name: "menuView",
      component: menuAddComponent,
      meta: {
        title: "查看菜单",
        auth: true
      }
    },
    {
      path: "/menu/update",
      activePath: "/menu/list",
      name: "menuUpdate",
      component: menuAddComponent,
      meta: {
        title: "修改菜单",
        auth: true
      }
    },
    {
      path: "/menu/add",
      activePath: "/menu/list",
      name: "menuAdd",
      component: menuAddComponent,
      meta: {
        title: "新增菜单",
        auth: true
      }
    },
    {
      path: "/menu/button",
      activePath: "/menu/list",
      name: "menuButton",
      component: menuButtonComponent,
      meta: {
        title: "菜单按钮配置",
        auth: true
      }
    },
    {
      path: "/menu/api",
      activePath: "/menu/list",
      name: "menuApi",
      component: menuAPIComponent,
      meta: {
        title: "菜单API管理",
        auth: true
      }
    },
    {
      path: "/menu/api/list",
      activePath: "/menu/list",
      name: "menuApiList",
      component: menuAPIListComponent,
      meta: {
        title: "API配置",
        auth: true
      }
    },

    //API
    {
      path: "/api/list",
      activePath: "/api/list",
      name: "apiList",
      component: apiComponent,
      meta: {
        title: "API管理",
        auth: true
      }
    },
    {
      path: "/api/update",
      activePath: "/api/list",
      name: "apiUpdate",
      component: apiEditComponent,
      meta: {
        title: "API修改",
        auth: true
      }
    },
    {
      path: "/api/view",
      activePath: "/api/list",
      name: "apiView",
      component: apiEditComponent,
      meta: {
        title: "API查看",
        auth: true
      }
    },
    {
      path: "/api/add",
      activePath: "/api/list",
      name: "apiAdd",
      component: apiEditComponent,
      meta: {
        title: "新增API",
        auth: true
      }
    },

    //日志
    {
      path: "/log/list",
      activePath: "/log/list",
      name: "logList",
      component: logComponent,
      meta: {
        title: "日志管理",
        auth: true
      }
    },

    //修改密码
    {
      path: "/userInfo",
      activePath: "/userInfo",
      name: "userInfo",
      component: userInfoComponent,
      meta: {
        title: "个人信息",
        auth: true
      }
    },

    //采番
    {
      path: "/saibong/list",
      activePath: "/saibong/list",
      name: "saibongList",
      component: saibongComponent,
      meta: {
        title: "采番管理",
        auth: true
      }
    },
    {
      path: "/saibong/edit",
      activePath: "/saibong/list",
      name: "saibongEdit",
      component: saibongEditComponent,
      meta: {
        title: "采番修改",
        auth: true
      }
    },
    {
      path: "/saibong/add",
      activePath: "/saibong/list",
      name: "saibongAdd",
      component: saibongAddComponent,
      meta: {
        title: "采番注册",
        auth: true
      }
    },

    //字典
    {
      path: "/dictionary/list",
      activePath: "/dictionary/list",
      name: "dictBase",
      component: dictComponent,
      meta: {
        title: "字典管理",
        auth: true
      }
    },
    {
      path: "/dictionary/add",
      activePath: "/dictionary/list",
      name: "dictAdd",
      component: dictAddComponent,
      meta: {
        title: "新增字典",
        auth: true
      }
    },
    {
      path: "/dictionary/edit",
      activePath: "/dictionary/list",
      name: "dictEdit",
      component: dictEditComponent,
      meta: {
        title: "字典修改",
        auth: true
      }
    },
    {
      path: "/dictionary/view",
      activePath: "/dictionary/list",
      name: "dictView",
      component: dictEditComponent,
      meta: {
        title: "字典查看",
        auth: true
      }
    },

    //字典条目
    {
      path: "/dictionary/entry/add",
      activePath: "/dictionary/list",
      name: "dictEntryAdd",
      component: dictEntryAddComponent,
      meta: {
        title: "新增条目",
        auth: true
      }
    },
    {
      path: "/dictionary/entry/view",
      activePath: "/dictionary/list",
      name: "dictEntryView",
      component: dictEntryAddComponent,
      meta: {
        title: "条目查看",
        auth: true
      }
    },
    {
      path: "/dictionary/entry/update",
      activePath: "/dictionary/list",
      name: "dictEntryUpdate",
      component: dictEntryAddComponent,
      meta: {
        title: "条目修改",
        auth: true
      }
    }
  ]
}
];

const router = new VueRouter({
  routes,
  mode: "hash", //default: hash ,history
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start();
  let toName = to.name;
  // let fromName = from.name
  let is_login = store.state.user_info.login;

  if (!is_login && toName !== "login" && toName !== "sso") {
    next({
      name: "login"
    });
  } else {
    if (is_login && toName === "login" && toName !== "sso") {
      next({
        path: "/"
      });
    } else {
      next();
    }
  }
});

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done();
});

export default router;
