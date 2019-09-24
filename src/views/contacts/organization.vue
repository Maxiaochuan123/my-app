<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 11:20:09
 * @LastEditTime: 2019-09-05 11:05:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="organization">
    <AppBar pageTitle="公司部门"/>

    <div class="content">
      <SearchBar :list="userList" placeholderText="搜索联系人" :isGoPage="true" pageLinkName="personalInfo"></SearchBar>
      <!-- 公司列表 -->
      <mu-paper :z-depth="0">
        <div class="listTitle">成都众汇车服集团有限公司</div>
      </mu-paper>
      <mu-paper :z-depth="0">
        <mu-list>
          <div v-for="(item ,index) in companyList" :key="index">
            <mu-list-item button v-waves @click="getCompanyItem(item,'dept')">
              <mu-list-item-title :class="[item.children.length > 0 ? '' : 'isdisable']">{{item.name}}</mu-list-item-title>
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
          <div class="listTitle">{{deptTitleName}}</div>
        <!-- </mu-paper> -->
        <mu-list>
          <div v-for="(item ,index) in deptList" :key="index">
            <mu-list-item button v-waves @click="getCompanyItem(item, item.children.length > 0 ? 'group' : 'contacts')">
              <mu-list-item-title :class="[item.children.length > 0 ? '' : 'isdisable']">{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== deptList.length"></mu-divider>
          </div>
        </mu-list>
      </mu-drawer>

      <!-- 组抽屉 1 -->
      <mu-drawer class="group" right :open.sync="drawerGroup">
        <!-- <mu-paper :z-depth="0"> -->
          <!-- <div class="listTitle">{{groupTitleName}}</div> -->
          <div class="listTitle">group</div>
        <!-- </mu-paper> -->
        <mu-list>
          <div v-for="(item ,index) in groupList" :key="index">
            <mu-list-item button v-waves  @click="getCompanyItem(item, item.children.length > 0 ? 'group_1' : 'contacts')">
              <mu-list-item-title :class="[item.children.length > 0 ? '' : 'isdisable']">{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== groupList.length"></mu-divider>
          </div>
        </mu-list>
      </mu-drawer>

      <!-- 子组抽屉  1-1 -->
      <mu-drawer class="group_1" right :open.sync="drawerGroup_1">
        <!-- <mu-paper :z-depth="0"> -->
          <!-- <div class="listTitle">{{groupTitleName_1}}</div> -->
          <div class="listTitle">group_1</div>
        <!-- </mu-paper> -->
        <mu-list>
          <div v-for="(item ,index) in groupList_1" :key="index">
            <mu-list-item button v-waves  @click="getCompanyItem(item ,'contacts')">
              <mu-list-item-title :class="[item.children.length > 0 ? '' : 'isdisable']">{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== groupList_1.length"></mu-divider>
          </div>
        </mu-list>
      </mu-drawer>

      <!-- 联系人抽屉 -->
      <mu-drawer class="contacts" :style="`width:${drawerGroup_1 ? '60vw' : drawerGroup ? '70vw' : '80vw'}`" right :open.sync="drawerContacts">
        <div class="listTitle">联系人</div>
        <mu-list textline="two-line">
          <div v-for="(item ,index) in contactsList" :key="index">
            <mu-list-item button v-waves @click="drawerContacts = false;drawerDepartment = false; goPage('personalInfo')">
              <mu-avatar>
                <img :src="loadingImg('默认头像.png')">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{item.name}}</mu-list-item-title>
                <mu-list-item-sub-title>总经理</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== contactsList.length"></mu-divider>
          </div>
        </mu-list>
      </mu-drawer>
    </div>
    

  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import SearchBar from '../../components/SearchBar'
// import Api from '@api'
import { mapState } from 'vuex'
export default {
  name:'organization',
  components:{ AppBar,SearchBar },
  data(){
    return{
      drawerDepartment: false, //部门抽屉
      drawerGroup: false, //组抽屉
      drawerGroup_1: false, //子组抽屉
      drawerContacts: false, //联系人抽屉

      companyList:[],
      deptList:[],
      groupList:[],
      groupList_1:[],
      contactsList:[],

      deptTitleName:'',
      groupTitleName:'',
      groupTitleName_1:'',
    }
  },
  created(){
    this.api.getDeptTree({type:'tree'}).then(res => {
      this.companyList = res.data;
    })
    // this.api.getDeptContacts({groupId:18}).then(res => {
    //   console.log('部门联系人:',res)
    // })
    
  },
  methods:{
    getCompanyItem(item,type){
      if(type === 'dept'){
        this.drawerDepartment = !this.drawerDepartment;
        if(!this.drawerDepartment) this.drawerGroup=false; this.drawerGroup_1=false; this.drawerContacts=false;
        this.deptTitleName = item.name;
        this.deptList = item.children;
      }else if(type === 'group'){
        this.drawerGroup = !this.drawerGroup;
        if(!this.drawerGroup) this.drawerGroup_1=false;this.drawerContacts=false;

        this.groupTitleName = item.name;
        this.groupList = item.children;
      }else if(type === 'group_1'){
        this.drawerGroup_1 = !this.drawerGroup_1;
        if(!this.drawerGroup_1) this.drawerContacts=false;

        this.groupTitleName_1 = item.name;
        this.groupList_1 = item.children;
      }else if(type === 'contacts'){
        this.drawerContacts = !this.drawerContacts;
        // if(item.children.length === 0) this.drawerContacts = false;
        this.api.getContacts({deptId:item.id}).then(res => {
          console.log('联系人列表:',res)
          this.contactsList = res.data;
        })
      }

      if(type === 'group_1' || type === 'contacts'){
        
      }
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
        font-size: @primary-size;
        font-weight: 600;
        line-height: 60px;
        padding-left: @primary-size;
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
        &.group{
          width: 80vw;
        }
        &.group_1{
          width: 70vw;
        }
        &.contacts{
          width: 60vw;
        }

      }
    }
  }
</style>