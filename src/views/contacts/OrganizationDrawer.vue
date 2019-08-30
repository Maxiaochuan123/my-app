<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 11:20:09
 * @LastEditTime: 2019-08-30 11:24:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="organizationDrawer">
    <!-- <div class="header"> -->
      <AppBar leftLink="/contacts" pageTitle="公司部门"/>
    <!-- </div> -->

    <div class="content">
      <!-- 公司列表 -->
      <mu-paper :z-depth="3">
        <mu-list>
          <mu-sub-header>成都众汇车服集团有限公司</mu-sub-header>
          <div v-for="(item ,index) in companyList" :key="index">
            <mu-list-item button v-waves @click="drawerDepartment = !drawerDepartment">
              <mu-list-item-action>
                <mu-icon size="24" value=":iconfont icon-gongsi"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== companyList.length"></mu-divider>
          </div>
        </mu-list>
      </mu-paper>
    

      <!-- 部门抽屉 -->
      <mu-drawer class="department" right :open.sync="drawerDepartment">
        <mu-list>
          <mu-sub-header>四川公司</mu-sub-header>
          <div v-for="(item ,index) in companyList" :key="index">
            <mu-list-item button v-waves @click="drawerContacts = !drawerContacts">
              <mu-list-item-action>
                <mu-icon size="24" value=":iconfont icon-gongsi"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== companyList.length"></mu-divider>
          </div>
        </mu-list>
      </mu-drawer>

      <!-- 联系人抽屉 -->
      <mu-drawer class="contacts" right :open.sync="drawerContacts">
        <mu-list textline="two-line">
          <mu-sub-header>总经办</mu-sub-header>
          <div v-for="(item ,index) in userList" :key="index">
            <mu-list-item button v-waves @click="drawerContacts = false;drawerDepartment = false; goPage('/personalInfo')">
              <mu-list-item-action>
                <mu-icon size="24" value=":iconfont icon-touxiang"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{item.name}}</mu-list-item-title>
                <mu-list-item-sub-title>Jan 9, 2014</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== companyList.length"></mu-divider>
          </div>
        </mu-list>
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
      companyList:[{
        title:'集团公司'
      },{
        title:'北京公司'
      },{
        title:'四川公司'
      },{
        title:'重庆公司'
      },{
        title:'贵州公司'
      },{
        title:'海南公司'
      },{
        title:'广西公司'
      }],
      userList:[{
        name:'张三'
      },{
        name:'李四'
      },{
        name:'王二'
      },{
        name:'麻子'
      },{
        name:'老王'
      }]
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
    // background-color: cornflowerblue;
    
    .content{
      padding: 60px 4px;

      .mu-list{
        .mu-icon{
          height: 38px !important;
        }
      }

      .mu-drawer{
        // width: 100vw;
        &.department{
          width: 90vw;
        }
        &.contacts{
          width: 80vw;
        }

      }
    }
  }
</style>