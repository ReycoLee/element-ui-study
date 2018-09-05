<template>
  <div id="jump">
    {{message}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "请稍候，正在为您跳转……"
    };
  },

  //挂载方法
  created() {
    let system = this.$route.query.system;
    this.$fetch.api_user
      .getToken(system)
      .then(({ data }) => {
        console.log(data);
        let ret = data.data;
        if (ret) {
          let url = ret.url;
          if (ret.url.indexOf("?") >= 0) {
            location.href = ret.url + "&token=" + ret.token;
          } else {
            location.href = ret.url + "?token=" + ret.token;
          }
        } else {
          alert("无法获取当前系统登陆权限，请输入该系统的账号密码登陆！");
        }
      })
      .catch(({ message, code }) => {});
  },
  methods: {}
};
</script>
<style>
#jump {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 9999999;
  padding: 20px;
}
</style>
