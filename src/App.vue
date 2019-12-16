<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2019-12-16 10:10:43
 * @LastEditors: shenah
 -->
<template>
  <div id="app">
    <!-- <keep-alive v-if="$route.meta.keepAlive"> -->
      <router-view/>
    <!-- </keep-alive> -->
    
    <!-- <router-view v-if="!$route.meta.keepAlive"/> -->

    <BottomNav v-if="showBotNav" />
  </div>
</template>

<script>
import BottomNav from "./components/BottomNav";
import Theme from "muse-ui/lib/theme";
import myTheme from "../static/json/myTheme.json";
import VConsole from "vConsole";
import tool from "../static/js/tool.js";
import Api from "@api";
export default {
  components: {
    BottomNav
  },
  data() {
    return {
      showBotNav: true
    };
  },
  created() {
    new VConsole();
    let activTheme = this.storage.localGet("theme");
    if (activTheme) {
      Theme.add("theme_one", activTheme, "light");
      Theme.use("theme_one");
    } else {
      this.storage.localSet("theme", myTheme[0]);
      Theme.add("theme_one", myTheme[0], "light");
      Theme.use("theme_one");
    }
  },
  mounted() {
    const userObj = tool.decUserInfo();
    if (userObj.accessToken) {
      this.$store.commit("setToken", userObj);
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/home" || to.path == "/myInfo") {
        this.showBotNav = true;
      } else {
        this.showBotNav = false;
      }
    }
  },
  methods: {
   
  }
};
</script>

<style lang="less">
@import url("../static/css/resetAmap.less");
@import url("../static/css/resetMuseUI.less");
@import url("../static/css/public.less");
@import url("../static/css/loading.less");
* {
  margin: 0px;
  padding: 0px;
}
#app::-webkit-scrollbar {
  width: 0;
  display: none;
}
body{
  padding-top: constant(safe-area-inset-top);   //为导航栏+状态栏的高度 88px            
  padding-left: constant(safe-area-inset-left);   //如果未竖屏时为0                
  padding-right: constant(safe-area-inset-right); //如果未竖屏时为0                
  padding-bottom: constant(safe-area-inset-bottom);//为底下圆弧的高度 34px
}
@media only screen and (width: 375px) and (min-height: 690px) {
  body {
      height: 100vh;
  }
}
</style>