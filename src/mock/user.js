//获取url参数
const parseQueryString = url => {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {};
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1],
      result;
    while ((result = reg_para.exec(str_para)) !== null) {
      ret[result[1]] = result[2];
    }
  }
  return ret;
};

import Mock from "mockjs";
import { port_code } from "common/port_uri";

// 姓名	性别	年龄	生日	地址

const data_list = [
  {
    "id|10-100": 1,
    login_name: "@cname",
    "login_password|10000-99999": 1,
    code: "@pick([1, 2])",
    "name|10-100": 1,
    "org_name|10-100": 1,
    "role_name|1-10": 1
  }
];

Mock.mock(/\/api\/user\/list/, "get", ({ url, type, body }) => {
  const params = parseQueryString(url);

  return Mock.mock({
    code: port_code.success,
    message: "获取成功",
    data: {
      [`list|${params.pageSize}`]: data_list,
      pageNumber: Number.parseInt(params.pageNumber),
      totalRow: 200
    }
  });
});


Mock.mock(new RegExp("/api/user/menu"), "get", {
  code: 200,
  data: [
    {
      api_list: "A000103-A000101-A000102",
      buttonblacklist: "",
      code: "M_01_01",
      name: "机构管理",
      parent_code: "M_01",
      sort: 0,
      uri: "/org/list"
    },
    {
      api_list: "A000701",
      buttonblacklist: "",
      code: "M_01_07",
      name: "日志管理",
      parent_code: "M_01",
      sort: 7,
      uri: "/log/list"
    },
    {
      api_list: "A000201-A000202-A0002012-A000206",
      buttonblacklist: "",
      code: "M_01_02",
      name: "用户管理",
      parent_code: "M_01",
      sort: 3,
      uri: "/user/list"
    },
    {
      api_list: "",
      buttonblacklist: "",
      code: "M_01",
      name: "系统管理",
      parent_code: "",
      sort: 1,
      uri: "#"
    },
    {
      api_list: "A000401-A000402-A000405",
      buttonblacklist: "",
      code: "M_01_05",
      name: "菜单管理",
      parent_code: "M_01",
      sort: 6,
      uri: "/menu/list"
    },
    {
      api_list: "A000601-A000605",
      buttonblacklist: "",
      code: "M_01_06",
      name: "API管理",
      parent_code: "M_01",
      sort: 6,
      uri: "/api/list"
    },
    {
      api_list: "A000501-A000502-A000503",
      buttonblacklist: "",
      code: "M_01_03",
      name: "角色管理",
      parent_code: "M_01",
      sort: 4,
      uri: "/role/list"
    },
    {
      api_list: "A000301-A000306",
      buttonblacklist: "",
      code: "M_01_04",
      name: "数据权限",
      parent_code: "M_01",
      sort: 5,
      uri: "/dataPermission/list"
    }
  ],
  message: null
});


Mock.mock(/\/api\/user\/.*?/, "get", {
  code: port_code.success,
  message: "获取成功",
  data: data_list[0]
});

Mock.mock(/\/api\/user\/.*?/, "delete", {
  code: port_code.success,
  message: "删除成功"
});

Mock.mock(new RegExp("/api/user"), "post", {
  code: port_code.success,
  message: "post成功"
});

Mock.mock(new RegExp("/api/user"), "put", {
  code: port_code.success,
  message: "update成功"
});
