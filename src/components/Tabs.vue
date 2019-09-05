<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 15:09:11
 * @LastEditTime: 2019-09-05 17:42:14
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="tabs">
    <mu-tabs :value.sync="active" inverse color="primary"  indicator-color="primary"  center>
      <mu-tab :to="item.linkName" v-for="(item,index) in tabsList" :key="index">{{item.title}}</mu-tab>
    </mu-tabs>
    <div class="content">
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
  }
}
</script>

<style scoped lang="less">
  .tabs{
    .mu-tabs-center{
      justify-content: space-around;
      padding-top: 5px;
      /deep/ .mu-tab-wrapper{
        padding: 15px 0 9px;
      }
    }
  }
</style>