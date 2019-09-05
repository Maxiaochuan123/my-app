<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:21:55
 * @LastEditTime: 2019-09-05 11:04:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="myInfoChild">
    <h4 @click="goPage('myInfo')"> 返回 </h4>

    <div class="content">
      <h1 v-for="i in 20" :key="i">Child{{i}}</h1>
    </div>
  </div>
</template>

<script>
export default {

  methods:{
    
  }
};
</script>

<style scoped lang='less'>
.myInfoChild {
  position: fixed;
  overflow-y: scroll;
  height: 100vh;
  background-color: #ff6600;
}
</style>