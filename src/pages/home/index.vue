<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
    </panel-title>
    <div class="panel-body">
      <p><img src="./img/main3.jpg" /></p>
      <p>刘亦菲，1987年8月25日出生于湖北省武汉市，华语影视女演员、歌手，毕业于北京电影学院2002级表演系本科班。</p>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle } from "components";

export default {
  data() {
    return {
      message: "home page"
    };
  },
  components: {
    panelTitle
  }
};
</script>
<style>
p {
  word-wrap: break-word;
  margin-bottom: 15px;
  text-indent: 2em;
  line-height: 24px;
}
</style>
