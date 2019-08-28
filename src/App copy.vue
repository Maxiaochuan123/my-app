<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2019-08-28 10:23:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <div class="appBox">
      <div class="content">
          <router-view/>
      </div>
      <div class="bottomnav" v-show="showBotNav">
        <BottomNav/>
      </div>
    </div>
  </div>
</template>

<script>
import BottomNav from "./components/BottomNav";
export default {
  components: {
    BottomNav
  },
  data() {
    return {
      showBotNav: true
    };
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

<style scoped lang="less">
* {
  margin: 0px;
  padding: 0px;
}
#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  // overflow: hidden;

  .appBox {
    width: 100vw;
    position: fixed;
    .content {
      height: calc(100vh - 50px);
      background-color: cornflowerblue;
      overflow: scroll;
    }
    .bottomnav {
      height: 50px;
      background-color: darkcyan;
    }
    .child-view {
      position: absolute;
      width: 100%;
      transition: all .2s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .slide-left-enter,
    .slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(50px, 0);
      transform: translate(50px, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-50px, 0);
      transform: translate(-50px, 0);
    }
  }

  // .slide-left-enter,
  // .slide-right-leave-active {
  //   opacity: 0;
  //   -webkit-transform: translate(100%, 0);
  //   transform: translate(100%, 0);
  // }

  // .slide-left-leave-active,
  // .slide-right-enter {
  //   opacity: 0;
  //   -webkit-transform: translate(-50%, 0);
  //   transform: translate(-50% 0);
  // }
}
</style>