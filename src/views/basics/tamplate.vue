<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime: 2019-08-27 12:38:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="templateBox">
    <div class="hader">
      <AppBar :iconSize="iconSize" :leftIcon="leftIcon" :leftLink="leftLink" :pageTitle="title"></AppBar>
    </div>
    <div class="content">
      
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
export default {
  components:{
    AppBar
  },
  data(){
    return{
      iconSize:'20',
      leftIcon:'icon-fanhui',
      leftLink:'/home',
      title:'联系人'
    }
  }
};
</script>

<style scoped lang="less">
.templateBox {
  overflow-y: scroll;
  height: 100vh;
  background-color: #ff6600;
  .heder{
    background-color: cornflowerblue;
    position: fixed;

    h2{
      color: aliceblue;
      margin: 0;
    }
  }
  .content{
    padding-top: 54px;
  }
}
</style>