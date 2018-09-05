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

Mock.mock(/\/api\/org\/tree/, "get", ({ url, type, body }) => {
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: [{
      id: 1,
      value: 1,
      label: "一级 1",
      children: [{
        id: 4,
        value: 4,
        label: "二级 1-1",
        children: [{
            id: 9,
            value: 9,
            label: "三级 1-1-1"
          },
          {
            id: 10,
            value: 10,
            label: "三级 1-1-2"
          }
        ]
      }]
    }]
  })
})

const data_list = [{
  'id|10-100': 1,
  'type|1-2': 1,
  'code': '@pick([1, 2])',
  'name|10-100': 1,
  'fullname|10-100': 1,
  'parent_name|1-10': 1
}]

Mock.mock(/\/api\/org\/list/, "get", ({ url, type, body }) => {

  const params = parseQueryString(url)

  return Mock.mock({
    code: port_code.success,
    message: '获取成功',
    data: {
      [`list|${params.pageSize}`]: data_list,
      pageNumber: Number.parseInt(params.pageNumber),
      'totalRow': 200
    }
  })
})

Mock.mock(/\/api\/org\/.*?\/user/, "get", ({ url, type, body }) => {
  
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: [
      {
      key: 1,
      orgId: "OG0003",
      label: "张三",
      pinyin: "zhangsan",
      full_pinyin: "zs"
    },{
      key: 2,
      orgId: "OG0003",
      label: "赵四",
      pinyin: "zhaosi",
      full_pinyin: "zs"
    }
  ]
  })
})

Mock.mock(/\/api\/org\/user/, "get", ({ url, type, body }) => {
 
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: [
      {
      key: 9,
      orgId: "",
      label: "王五",
      pinyin: "wangwu",
      full_pinyin: "ww"
    }
  ]
  })
})

Mock.mock(/\/api\/org\/.*?/, "get", {
  code: port_code.success,
  message: '获取成功',
  data: data_list[0]
})

Mock.mock(/\/api\/org\/.*?/, "delete", {
  code: port_code.success,
  message: 'delete成功'
})

Mock.mock(new RegExp("/api/org"), "post", {
  code: port_code.success,
  message: 'post成功'
})

Mock.mock(new RegExp("/api/org"), "put", {
  code: port_code.success,
  message: 'update成功'
})


