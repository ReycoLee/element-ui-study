/**
 * @file: index.
 * @intro: 全局配置文件.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 16:38.
 * @Copyright(©) 2017 by thinkive.
 *
 */

//本地存储的前缀
export const storage_prefix = 'doit_storage_'
//base64加密前缀
export const base64_prefix = 'doit_base64_'
//接入服务器接口地址根目录(userCenter)
export const server_base_url_usercenter = process.env.USERCENTER_API_PATH
//接入服务器接口地址根目录(采番)
export const server_base_url_saibong = process.env.SAIBONG_API_PATH