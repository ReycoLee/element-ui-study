import Mock from 'mockjs'
import {port_code} from 'common/port_uri'

Mock.mock(new RegExp("/api/image/upload"), {
  code: port_code.success,
  message: "图片上传成功",
  data: {
    'id|10-100': 1,
    "name": "@ctitle",
    "image": "@image"
  }
})
