<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime: 2019-09-05 11:06:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="clueDetails">
    <AppBar leftLinkName="clue" pageTitle="线索详情" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" isMenu :menuList="menuList"></AppBar>
    <div class="content">
      <!-- <Tabs :tabsList="tabsList"></Tabs> -->
      <h1>{{data}}</h1>
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
      data:this.$route.params.data,
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
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>

<style scoped lang="less">
  .clueDetails{
    .content{
      padding-top: 98px;
    }
  }
</style>