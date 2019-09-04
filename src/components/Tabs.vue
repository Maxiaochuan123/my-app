<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 15:09:11
 * @LastEditTime: 2019-09-04 17:40:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="tabs">
    <mu-tabs :value.sync="active" inverse color="primary"  indicator-color="primary"  center>
      <mu-tab :to="item.link" v-for="(item,index) in tabsList" :key="index">{{item.title}}</mu-tab>
    </mu-tabs>
    <div class="demo-text">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    tabsList: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
      active:0
    }
  },
  mounted(){
    let link = this.tabsList[0].link
    this.goPage(link)
  }
}
</script>

<style scoped lang="less">
  .tabs{
    .mu-tabs{
      position: fixed;
      top: 44px;
      z-index: 9;
    }
  }
</style>