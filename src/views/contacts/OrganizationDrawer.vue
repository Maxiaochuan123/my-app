<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 11:20:09
 * @LastEditTime: 2019-08-29 17:35:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="organizationDrawer">
    <!-- <div class="header"> -->
      <AppBar pageTitle="公司部门"/>
    <!-- </div> -->

    <div class="content">
      <!-- 公司列表 -->
      <p v-for="i in 200" :key="i">{{i}}</p>

      <!-- 部门抽屉 -->
      <mu-button color="primary" @click="drawerDepartment = !drawerDepartment">部门抽屉</mu-button>
      <mu-drawer docked right :open.sync="drawerDepartment">
        
      </mu-drawer>
      <!-- 联系人抽屉 -->
      <mu-drawer docked right :open.sync="drawerContacts">
        
      </mu-drawer>
    </div>
    

  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
export default {
  name:'organizationDrawer',
  components:{ AppBar },
  data(){
    return{
      drawerDepartment: false, //部门抽屉
      drawerContacts: false, //联系人抽屉
    }
  },
  methods:{
    department(){
      this.drawerDepartment = true;
    },
    contacts(){
      this.drawerContacts = true;
    }
  }
}
</script>

<style scoped lang="less">
  .organizationDrawer{
    height: 100vh;
    background-color: cornflowerblue;
    
    .content{
      padding-top: 50px;
      .mu-drawer{
        height: calc(100% - 50px);
        margin-top: 50px;
      }
    }
  }
</style>