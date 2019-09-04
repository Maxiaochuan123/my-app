<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 11:20:09
 * @LastEditTime: 2019-09-04 12:37:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="organization">
    <AppBar leftLink="/contacts" pageTitle="公司部门"/>

    <div class="content">
      <SearchBar :list="userList" :isGoPage="true" pageLink="/personalInfo"></SearchBar>
      <!-- 公司列表 -->
      <mu-paper :z-depth="0">
        <div class="listTitle">成都众汇车服集团有限公司</div>
      </mu-paper>
      <mu-paper :z-depth="0">
        <mu-list>
          <div v-for="(item ,index) in companyList" :key="index">
            <mu-list-item button v-waves @click="drawerDepartment = !drawerDepartment">
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== companyList.length"></mu-divider>
          </div>
        </mu-list>
      </mu-paper>
    

      <!-- 部门抽屉 -->
      <mu-drawer class="department" right :open.sync="drawerDepartment">
        <!-- <mu-paper :z-depth="0"> -->
          <div class="listTitle">四川公司</div>
        <!-- </mu-paper> -->
        <mu-list>
          <div v-for="(item ,index) in companyList" :key="index">
            <mu-list-item button v-waves @click="drawerContacts = !drawerContacts">
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== companyList.length"></mu-divider>
          </div>
        </mu-list>
      </mu-drawer>

      <!-- 联系人抽屉 -->
      <mu-drawer class="contacts" right :open.sync="drawerContacts">
        <div class="listTitle">四川公司</div>
        <mu-list textline="two-line">
          <div v-for="(item ,index) in userList2" :key="index">
            <mu-list-item button v-waves @click="drawerContacts = false;drawerDepartment = false; goPage('/personalInfo')">
              <mu-avatar>
                <img src="../../../static/images/默认头像.png">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{item.name}}</mu-list-item-title>
                <mu-list-item-sub-title>总经理</mu-list-item-sub-title>
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
import SearchBar from '../../components/SearchBar'
import { mapState } from 'vuex'
export default {
  name:'organization',
  components:{ AppBar,SearchBar },
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
      userList2:[{
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
  },
  computed:{
    ...mapState(['userList'])
  }
}
</script>

<style scoped lang="less">
  .organization{
    height: 100vh;
    // background-color: cornflowerblue;
    
    .content{
      padding: 104px 0;

      .listTitle{
        color: @primary-text;
        font-size: 16px;
        font-weight: 600;
        line-height: 60px;
        padding-left: 16px;
        margin-bottom: 12px;
      }
      .contacts{
        .shallow-inset{
          margin-left: 67px;
        }
        .mu-item-title{
          font-weight: 400;
        }
        .mu-item-content{
          padding-left: 12px;
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