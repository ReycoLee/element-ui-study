/**
 * @file: file.
 * @intro: file请求数据配置.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:31.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import fetch from 'common/fetch_usercenter'

//图片上传 测试下git提交
export function image_upload(data) {
  return fetch({
    url: '/api/image/upload',
    method: 'post',
    data
  })
}
