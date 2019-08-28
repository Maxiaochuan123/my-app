<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:21:55
 * @LastEditTime: 2019-08-27 12:31:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="homeChild">
    
    <div class="heder">
      
    </div>
    <div class="content">
      <h1 v-for="i in 20" :key="i">Child{{i}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    
  }
};
</script>

<style scoped lang='less'>
.homeChild {
  position: fixed;
  overflow-y: scroll;
  height: 100vh;
  background-color: #ff6600;
  .heder{
    width: 100vw;
    background-color: cornflowerblue;
    position: fixed;

    h2{
      color: aliceblue;
      margin: 0;
    }
  }
}
</style>