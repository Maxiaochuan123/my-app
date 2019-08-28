<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:21:55
 * @LastEditTime: 2019-08-27 14:00:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="myInfo">
    <div class="content">
      <h1>
        <router-link to="myInfoChild">toMyInfoChild</router-link>
      </h1>
      <h1 v-for="i in 20" :key="i">myInfo{{i}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>
<style scope lang="less">
.myInfo {
  position: fixed;
  overflow-y: scroll;
  height: calc(100vh - 50px);
  background-color: darkred;
  

  .heder{
    width: 100vw;
    background-color: cornflowerblue;
    position: fixed;

    h2{
      color: aliceblue;
      margin: 0;
    }
  }

  .content {
    padding-top: 40px;
  }
}
</style>