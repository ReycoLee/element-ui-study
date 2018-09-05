//获取url参数
const parseQueryString = (url) => {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {}
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1], result;
    while ((result = reg_para.exec(str_para)) !== null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

import Mock from 'mockjs'
import { port_code } from 'common/port_uri'

// 姓名	性别	年龄	生日	地址

const data_list = [{
  'id|+1': 1,
  'category': '@pick("内置规则", "自定规则")',
  'code|1000-10000': 1000,
  'name': '@pick(["全部", "组织及下级", "机构及下级", "仅机构", "机构及上级"])',
  'priority|1-8': 1,
  'operation': ["查看", "修改"]  
  // 'operation': '@pick(["查看", "修改"], ["修改", "新增"], ["删除", "新增"], ["新增", "查看"])'
}]

Mock.mock(/\/api\/data-permission\/viewTree/, "get", ({ url, type, body }) => {
  const params = parseQueryString(url);
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
  })
})

Mock.mock(/\/api\/data-permission\/view/, "get", ({ url, type, body }) => {
  const params = parseQueryString(url);
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: [{
      code: '选项1',
      name: '机构1'
    }, {
      code: '选项2',
      name: '机构2'
    }, {
      code: '选项3',
      name: '机构3'
    }, {
      code: '选项4',
      name: '机构4'
    }, {
      code: '选项5',
      name: '机构5'
    }]
  })
})

Mock.mock(/\/api\/data-permission\/list/, "get", ({ url, type, body }) => {
  const params = parseQueryString(url);
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: {
      [`list|${params.pageSize}`]: data_list,
      pageNumber: Number.parseInt(params.pageNumber),
      'totalRow': 200,
      pageSize: Number.parseInt(params.pageSize)
    }
  })
})

Mock.mock(/\/api\/data-permission/, "get", ({ url, type, body }) => {
  const params = parseQueryString(url);
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: {
      "code|1000-10000": 1000,
      name: "@cname",
      "sort|1-10": 1
    }
  })
})
