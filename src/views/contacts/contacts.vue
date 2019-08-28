<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime: 2019-08-28 17:51:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="contacts">
    <div class="heder">
      <AppBar :iconSize="iconSize" :leftIcon="leftIcon" :leftLink="leftLink" :pageTitle="title"></AppBar>
    </div>
    <div class="content">
      <div class="serch">
        
      </div>
      <div class="indexList">
        <IndexsList></IndexsList>
      </div>
      
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import IndexsList from './IndexsList'
export default {
  components:{
    AppBar, IndexsList
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
.contacts {
  // overflow-y: scroll;
  // height: 100vh;
  background-color: #ff6600;
  .heder{
    background-color: cornflowerblue;
    position: fixed;
    z-index: 999;
  }
  .content{
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: calc(100vh - 50px);
    // padding: 100px 0 0;
    background-color: aquamarine;
    .serch{
      position: fixed;
      top: 50px;
      z-index: 999;
      width: 100%;
      height: 50px;
      background-color: #ff6600;
    }

    .indexList{
      // position: fiexd;
      // top: 100px;
      margin-top: 50px;
      height: calc(100% - 50px);
    }
  }
}
</style>