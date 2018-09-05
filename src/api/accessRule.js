import fetch from 'common/fetch_usercenter'

//新增规则设置信息
export function add(data) {
  return fetch({
    url: "/api/accessruleset",
    method: "post",
    data
  });
}

//查询规则设置信息
export function getAccessRule(params){
    return fetch({
      url: "/api/accessruleset/" + params.ccqbh,
      method: "get"
    });
  }

