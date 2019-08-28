<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 20:58:12
 * @LastEditTime: 2019-08-27 15:35:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <transition :name="transitionName">
    <router-view class="child-view"></router-view>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  watch:{
    $route(to, from){
      // if((to.path == '/home' && from.path !== '/homeChild') || to.path == '/myInfo' && from.path !== '/myInfoChild'){
        // this.transitionName = "";
      // }else{
        if(to.meta.zIndex < from.meta.zIndex){
          this.transitionName = "slide-left";
        }else{
          this.transitionName = "slide-right";
        }
      // }
    }
  }
};
</script>
