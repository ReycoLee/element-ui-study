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

  const saibong_list = [{
    "cfzdm": "@pick(CCJY, BMWH)",
    "twz": "@pick(CCJY, BMWH)",
    "lscd|1-10": 1,
    "isb0|1-3": 1,
    "sx1": "\u0000",
    "sx2": "\u0000",
    "sx3": "\u0000",
    "fgf": "",
    "dqlsh|1000-9999": 1000,
    "zjz": "201611",
    "cjsj": "2016-11-28 10:25:23.0",
    "gxsj": "2017-05-11 12:00:00.0"
}]
  
  import Mock from 'mockjs'
  import { port_code } from 'common/port_uri'
  
  // 修改采番信息
  Mock.mock(/\/saibong\/v1\/saibongs\/items\/.*?/, "put", ({ url, type, body }) =>  {
    console.log("修改采番", url, type, body)
    return Mock.mock({
      "msg": "修改采番信息成功",
    })
  })

  // 注册采番
  Mock.mock(/\/saibong\/v1\/saibongs\/items/, "post", ({ url, type, body }) =>  {
    console.log("注册采番", url, type, body)
    return Mock.mock({
      "msg": "采番注册成功",
    })
  })

  // 采番列表
  Mock.mock(/\/saibong\/v1\/saibongs/, "post", ({ url, type, body }) =>  {
    console.log(url, type, body)
    const page_size = body.pageSize
    return Mock.mock({
      "msg": "番号查询成功",
      "success": true,
      "saibongs": null,
      "pageUtil": {
          "start": 0,
          "pageSize": 10,
          "currPage": 1,
          "total": 21,
          "totalPage": 3,
          [`list|${21}`]: saibong_list,
          "pre": 1,
          "next": 2
      },
      "saibongRules": null
  })
  })

  // 采番信息
  Mock.mock(/\/saibong\/v1\/saibongs/, "get", ({ url, type, body }) =>  {
    console.log(url, type, body)
    return Mock.mock({
      "msg": "番号查询成功",
      "success": true,
      "saibongs": null,
      "pageUtil": null,
      "saibongRules": {
          "cfzdm": "CCJY",
          "twz": "CCJY",
          "lscd": 5,
          "isb0": 2,
          "sx1": "1",
          "sx2": "2",
          "sx3": "3",
          "fgf": "",
          "dqlsh": null,
          "zjz": null,
          "cjsj": null,
          "gxsj": null
      }
  })
  })
