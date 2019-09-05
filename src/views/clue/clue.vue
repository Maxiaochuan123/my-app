<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime: 2019-09-05 18:06:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="clue">
    <AppBar pageTitle="线索" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" isMenu :menuList="menuList"></AppBar>
    <div class="content">
      <Tabs :tabsList="tabsList"></Tabs>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Tabs from '../../components/Tabs'
export default {
  components:{
    AppBar,Tabs
  },
  data(){
    return{
      menuList:[{
        title: "新建买车线索",
        linkName: "",
        isLink: true
      },{
        title: "新建车贷线索",
        linkName: "",
        isLink: true
      },{
        title: "新建车险线索",
        linkName: "",
        isLink: true
      }],
      
      tabsList:[{
        title:'我的线索',
        linkName:'myClue'
      },{
        title:'团队线索',
        linkName:'teamClue'
      }]
    }
  }
}
</script>

<style scoped lang="less">
  .clue{
    .content{
      padding-top: 98px;
      /deep/ .mu-tabs{
        position: fixed;
        top: 44px;
        z-index: 9;
      }
    }
  }
</style>