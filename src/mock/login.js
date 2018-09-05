import Mock from 'mockjs'
import {
  port_code
} from 'common/port_uri'

Mock.mock(new RegExp("/api/login"), "post", ({
  body
}) => {
  const {
    login_name,
    password
  } = JSON.parse(body)
  if (login_name === 'admin' && password === 'admin') {
    return Mock.mock({
      code: port_code.success,
      message: "登录成功",
      data: {
        'name': '@cname',
        'avatar': 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
        'age|20-25': 20,
        'desc': '@csentence()'
      }
    })
  } else {
    return Mock.mock({
      code: port_code.error,
      message: "账号或密码错误"
    })
  }
})

Mock.mock(new RegExp("/api/logout"), "post", () => {
  return Mock.mock({
    code: port_code.success,
    message: "成功退出"
  })
})
