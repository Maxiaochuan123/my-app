<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2019-09-04 14:21:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <router-view/>
    
    <BottomNav v-if="showBotNav"/>
  </div>
</template>

<script>
import BottomNav from "./components/BottomNav";
import Theme from 'muse-ui/lib/theme';
import myTheme from '../static/json/myTheme.json'
import VConsole from 'vConsole'
export default {
  components: {
    BottomNav
  },
  data() {
    return {
      showBotNav: true
    };
  },
  created(){
    // new VConsole();
    let activTheme = this.storage.localGet('theme');
    if(activTheme){
      Theme.add('theme_one',activTheme,'light')
      Theme.use('theme_one')
    }else{
      this.storage.localSet('theme',myTheme[0])
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
  }
};
</script>

<style lang="less">
  @import url('../static/css/resetMuseUI.less');
  @import url('../static/css/public.less');
  * {
    margin: 0px;
    padding: 0px;
  }
  #app::-webkit-scrollbar{
    width: 0;
    display:none;
  }
</style>