//获取url参数
const parseQueryString = (url) => {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {}
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1], result;
    while ((result = reg_para.exec(str_para)) !==null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

import Mock from 'mockjs'
import { port_code } from 'common/port_uri'

const role_list = [{
  'id|+1': 1,
  'code|1000-10000': 1000,
  'name': '@pick(["超级管理员", "操作员", "人事管理员", "公共"])',
  "fun_num|1-10": 1,
  "menu_num|1-10": 1
}]

const role_info = [{
  'code|1000-10000': 1000,
  'name': '@pick("用户管理", "机构管理")',
  'functionlist': '@pick("全部", "查询", "删除", "新增", "修改")',
  'level': '@pick(全部数据, 本部门及下级数据, 机构下所有数据, 个人数据)'
}]

const role_permission_person = [{
  'role|1000-10000': 1000,
  'name': '@cname'
}]

// 权限列表
Mock.mock(/\/api\/data-permission\/lists/, "get", {"code":200,"data":[{"children":[{"id":"M0002","label":"用户管理","value":"M0002"}],"id":"M0001","label":"系统管理","value":"M0001"},{"id":"M0003","label":"人员维护","value":"M0003"},{"id":"M3333","label":"newMenu","value":"M3333"},{"id":"M12232","label":"fadsc","value":"M12232"}],"message":null})

// 角色授权
Mock.mock(/\/api\/role\/permission/, "get", {
  code: port_code.success,
  msg: '获取成功',
  data: {
    [`list|${8}`]: role_permission_person,
  }
})

// 角色列表
Mock.mock(/\/api\/role\/list/, "get", ({ url, type, body }) => {
  const params = parseQueryString(url);
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: {
      [`list|${params.pageSize}`]: role_list,
      pageNumber: Number.parseInt(params.pageNumber),
      pageSize: Number.parseInt(params.pageSize),
      'totalRow': 200
    }
  })
})

// 角色下菜单预览
Mock.mock(/\/api\/role\/.*?\/menu/, "get", ({ url, type, body }) => {
  const params = parseQueryString(url);
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: [{
      label: '系统管理',
      children: [{
        label: '组织机构人员',
        children: [{
          label: '集团财务部(管理、查看)'
        }]
      }, {
        label: '角色权限',
        children: [{
          label: '角色管理(管理、查看)'
        }, {
          label: '角色授权管理(管理、查看)'
        }]
      }, {
        label: '系统日志',
        children: [{
          label: '系统日志(管理、查看)'
        }]
      }]
    }]
  })
})

// 角色下菜单列表
Mock.mock(/\/api\/role\/.*?\/mmenuList/, "get", {
  code: port_code.success,
  msg: '获取成功',
  data: {
    [`result|${5}`]: role_info
  }
})

// 角色信息
Mock.mock(/\/api\/role\/.*?/, "get", {"code":200,"data":{"role":"R0001","name":"操作员","id":"1","M0002":[{"code":"F0003","create_time":"2017-11-15 15:01:09","api_list":null,"modify_time":null,"modifier":null,"name":"查询","creater":"a","description":null,"menu_code":"M0002","id":"113131"},{"code":"F0005","create_time":"2017-11-30 10:38:11","api_list":null,"modify_time":null,"modifier":null,"name":"新增","creater":"a","description":null,"menu_code":"M0002","id":"141414"}],"roleMenus":[{"name":"系统管理","menu_code":"M0001","data_code":"qwer","button_blacklist":"F0002"},{"name":"用户管理","menu_code":"M0002","data_code":"qwer","button_blacklist":"F0003"}],"M0001":[{"code":"F0001","create_time":"2017-11-15 15:00:12","api_list":null,"modify_time":null,"modifier":null,"name":"查询","creater":"a","description":null,"menu_code":"M0001","id":"11111"},{"code":"F0002","create_time":"2017-11-15 15:00:38","api_list":null,"modify_time":null,"modifier":null,"name":"新增","creater":"a","description":null,"menu_code":"M0001","id":"111221"},{"code":"F0004","create_time":"2017-11-30 10:37:48","api_list":null,"modify_time":null,"modifier":null,"name":"修改","creater":"a","description":null,"menu_code":"M0001","id":"141141"}]},"message":null})

Mock.mock(/\/api\/role\/.*?/, "delete", {
  code: port_code.success,
  msg: '删除成功'
})

Mock.mock(new RegExp("/api/role"), "post", {
  code: port_code.success,
  msg: '操作成功'
})
