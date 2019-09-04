<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime: 2019-09-04 15:33:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="clue">
    <AppBar leftLink="/home" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" isMenu :menuList="menuList"></AppBar>
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
        link: "",
        isLink: true
      },{
        title: "新建车贷线索",
        link: "",
        isLink: true
      },{
        title: "新建车险线索",
        link: "",
        isLink: true
      }],
      
      tabsList:[{
        title:'我的线索',
        link:'/myClue'
      },{
        title:'团队线索',
        link:'/teamClue'
      }]
    }
  }
}
</script>

<style scoped lang="less">
  .clue{
    .content{
      padding-top: 98px;
    }
  }
</style>