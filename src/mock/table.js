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

// 姓名	性别	年龄	生日	地址

const data_list = [{
  'id|10-100': 1,
  'name': '@cname',
  'sex': '@pick([1, 2])',//1男，2女
  'age|20-25': 20,
  'birthday': '@date("yyyy-MM-dd")',
  'address': '@county(true)',
  'zip': '@zip'
}]

Mock.mock(/\/api\/table\/list/, "get", ({ url, type, body }) => {
  console.log(url)
  console.log(type)
  console.log(body)
  const params = parseQueryString(url)
  return Mock.mock({
    code: port_code.success,
    message: '获取成功',
    data: {
      [`result|${params.length}`]: data_list,
      page: Number.parseInt(params.page),
      'total': 200
    }
  })
})

Mock.mock(/\/api\/table\/.*?/, "get", {
  code: port_code.success,
  message: '获取成功',
  data: data_list[0]
})

Mock.mock(/\/api\/table\/.*?/, "delete", {
  code: port_code.success,
  message: '删除成功'
})

Mock.mock(new RegExp("/api/table"), "post", {
  code: port_code.success,
  message: '操作成功'
})