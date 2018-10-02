<template>
  <el-container>
  <el-header  align="right">
    <el-row>
      <el-col :span="8"><div style="background-color: rgb(246, 248, 250);">&nbsp;</div></el-col>
      <el-col :span="12">
        <el-menu :default-active="activeIndex" style="background-color: rgb(246, 248, 250);" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">热门</el-menu-item>
          <el-menu-item index="2">病例</el-menu-item>
          <el-menu-item index="3">视频</el-menu-item>
          <el-menu-item index="4">会议</el-menu-item> 
          <el-menu-item index="5">文库</el-menu-item>
          <el-menu-item index="6">进修</el-menu-item>
          <el-menu-item index="7">患者互动</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4"><div style="background-color: rgb(246, 248, 250);">&nbsp;</div></el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="350px">
      <div style="margin: 20px;"></div>
      <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
          <el-card class="box-card" style="background-color: white;">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-row>
                <el-col :span=12>
                  <el-menu-item class="active-home" index="1">登录</el-menu-item>
                </el-col>
                <el-col :span=12>
                  <el-menu-item index="2">注册</el-menu-item>
                </el-col>
              </el-row>
            </el-menu>
            <div style="margin: 20px;"></div>
            <el-form ref="form" :model="form">
              <el-form-item label="">
                <el-input v-model="form.userName"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <div style="margin: 20px;"></div>
          <el-card class="box-card" style="background-color: white;">
            <div slot="header" class="clearfix">
              <span>全部动态</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>

</template>
<style>
  .el-header {
    background-color: hsl(210, 29%, 97%);
    color: rgb(89, 162, 180);
    text-align: center;
    line-height: 60px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  
  .el-aside {
    background-color: rgb(232, 237, 241);
    color: #333;
    text-align: center;
  }

  .el-footer {
    background-color: rgb(232, 237, 241);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {
    background-color: rgb(232, 237, 241);
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  
</style>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        form: {
          userName: '',
          password: ''
        }
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>