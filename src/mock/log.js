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

  const data_list = [{
    'api|1000-10000': 1000,
    'user_code': '@cname',
    'remark': '@cname',
    'record_time': '@cname',
    'level': '@cname',
    'params': '@cname'
  }]
Mock.mock(/\/api\/log\/list/, "get", ({ url, type, body }) => {
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

  Mock.mock(/\/api\/log/, "delete", ({ url, type, body }) => {
    const params = parseQueryString(url);
    return Mock.mock({
      code: port_code.success,
      msg: '获取成功',
      message: "删除成功"
    })
  })