import fetch from 'common/fetch_usercenter'

// 保存
export function save(data) {
    return fetch({
        url: "/api/tagLogSetting",
        method: "post",
        data
    });
}

// 查询所有
export function all() {
    return fetch({
        url: "/api/tagLogSetting/all",
        method: "get"
    });
}