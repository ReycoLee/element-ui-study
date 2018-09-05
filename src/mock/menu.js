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
    'id|+1': 1,
    'code|1000-10000': 1000,
    'name': '@cname',
    'parent_code|1000-10000': 1000,
    'parent_name': '@cname',
    'uri': '@cname',
    'button_names': '@cname'
  }]

  const button_list = [{
    'code|1000-10000': 1000,
    'name': '@cname',
    'api_list': null
  }]

  Mock.mock(/\/api\/menu\/tree/, "get", ({ url, type, body }) => {
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

  Mock.mock(/\/api\/menu\/list/, "get", ({ url, type, body }) => {
    const params = parseQueryString(url);
    return Mock.mock({
      code: port_code.success,
      msg: '获取成功',
      data: {
        [`list|${params.pageSize}`]: data_list,
        pageNumber: Number.parseInt(params.pageNumber),
        'totalRow': 200
      }
    })
  })

  Mock.mock(/\/api\/menu\/.*?\/button/, "get", ({ url, type, body }) => {
    const params = parseQueryString(url);
    console.log(url);
    return Mock.mock({
      code: port_code.success,
      msg: '获取成功',
      data: {
        [`buttons|${5}`]: button_list,
      }
    })
  })

  Mock.mock(/\/api\/menu\/.*?\/menuAndbuttonApiList/, "get", ({ url, type, body }) => {
    const params = parseQueryString(url);
    console.log(url);
    return Mock.mock({
      code: port_code.success,
      msg: '获取成功',
      data: {
        [`buttons|${5}`]: button_list,
        'code|1000-10000': 1000,
        'name': '@cname',
        'api_list': null
      }
    })
  })

  Mock.mock(/\/api\/menu\/.*?\/menuOrbuttonApiList/, "get", ({ url, type, body }) => {
    const params = parseQueryString(url);
    console.log(url);
    return Mock.mock({
      code: port_code.success,
      msg: '获取成功',
      data: {
        [`buttons|${5}`]: button_list,
      }
    })
  })

  Mock.mock(/\/api\/menu\/.*?/, "get", ({ url, type, body }) => {
    const params = parseQueryString(url);
    console.log(url);
    return Mock.mock({
      code: port_code.success,
      msg: '获取成功',
      data: {
        'id': 1,
        'code': 1000,
        'name': '@cname',
        'parent_code': 1000,
        'parent_name': '@cname',
        'uri': '@cname',
        'sort': 2,
        'button_names': '@cname'
      }
    })
  })

  Mock.mock(/\/api\/menu\/.*?\/button/, "put", ({ url, type, body }) => {
    console.log(url);
    console.log(body);
    return Mock.mock({
      code: port_code.success,
      msg: '上传成功',
    })
  })
  
  Mock.mock(/\/api\/menu/, "post", ({ url, type, body }) => {
    return Mock.mock({
      code: port_code.success,
      msg: '获取成功',
    })
  })