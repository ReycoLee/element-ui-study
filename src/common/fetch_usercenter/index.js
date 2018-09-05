/**
 * @file: index.
 * @intro: 数据请求统一封装.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 14:52.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入模块
import axios from "axios";
import { port_code } from "common/port_uri";
import router from "src/router";
import { Message } from "element-ui";
import store from "store";
import { SET_USER_INFO } from "store/actions/type";
import { server_base_url_usercenter } from "common/config";
import { getToken, setToken } from "common/auth";

//设置用户信息action
const setUserInfo = function(user) {
  store.dispatch(SET_USER_INFO, user);
};

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    let token = getToken();
    const reg = new RegExp("(^|&)system=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象;
    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: server_base_url_usercenter,
      //设置请求超时设置
      timeout: 20000,
      //设置请求时的header
      headers: {
        "Doit-Token": token
      }
    });
    //请求处理
    instance(options)
      .then(({ data: { code, message, data } }) => {
        //请求成功时,根据业务判断状态
        if (code === port_code.success) {
          resolve({ code, message, data });
          return false;
        } else if (code === port_code.unlogin) {
          setUserInfo(null);
          let hash = window.location.hash;
          if (hash.indexOf("?") >= 0) {
            hash = hash.split("?")[1];
          }

          let r = hash.match(reg); //匹配目标参数
          let system = null;
          if (r != null) {
            system = unescape(r[2]);
          }
          if (system) {
            router.replace({ name: "login", query: { system: system } });
          } else {
            router.replace({ name: "login" });
          }
        }
        Message.warning(message);
        reject({ code, message, data });
      })
      .catch(error => {
        //请求失败时,根据业务判断状态
        if (error.response) {
          let resError = error.response;
          let resCode = resError.status;
          let resMsg = error.message;
          Message.error("操作失败！错误原因 " + resMsg);
          reject({ code: resCode, message: resMsg });
        } else {
          Message.error("服务器繁忙，请稍候重试…");
          reject({ code: port_code.error, message: "服务器繁忙，请稍候重试…" });
        }
      });
  });
}
