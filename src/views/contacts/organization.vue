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
            <mu-list-item button v-waves :class="index === deptActive ? 'active' : '' " @click="getCompanyItem(item,'dept',index)">
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
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
          <!-- <div class="listTitle">部门抽屉</div> -->
        <!-- </mu-paper> -->
        <mu-list v-if="deptList.length > 0">
          <div v-for="(item ,index) in deptList" :key="index">
            <mu-list-item button v-waves :class="index === groupActive ? 'active' : '' " @click="getCompanyItem(item,'group', index)">
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== deptList.length"></mu-divider>
          </div>
        </mu-list>
        <Nothing  words="暂无子部门" v-else></Nothing>
      </mu-drawer>

      <!-- 组抽屉 1 -->
      <mu-drawer class="group" right :open.sync="drawerGroup">
        <!-- <mu-paper :z-depth="0"> -->
          <div class="listTitle">{{groupTitleName}}</div>
          <!-- <div class="listTitle">组抽屉 1</div> -->
        <!-- </mu-paper> -->
        <mu-list v-if="groupList.length > 0">
          <div v-for="(item ,index) in groupList" :key="index">
            <mu-list-item button v-waves :class="index === group_1_Active ? 'active' : '' " @click="getCompanyItem(item, item.children.length > 0 ? 'group_1' : 'contacts', index)">
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== groupList.length"></mu-divider>
          </div>
        </mu-list>
        <Nothing  words="暂无子部门" v-else></Nothing>
      </mu-drawer>

      <!-- 子组抽屉  1-1 -->
      <mu-drawer class="group_1" right :open.sync="drawerGroup_1">
        <!-- <mu-paper :z-depth="0"> -->
          <div class="listTitle">{{groupTitleName_1}}</div>
          <!-- <div class="listTitle">组抽屉 1-1</div> -->
        <!-- </mu-paper> -->
        <mu-list v-if="groupList_1.length > 0">
          <div v-for="(item ,index) in groupList_1" :key="index">
            <mu-list-item button v-waves :class="index === contactsActive ? 'active' : '' " @click="getCompanyItem(item ,'contacts',index)">
              <mu-list-item-title >{{item.name}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== groupList_1.length"></mu-divider>
          </div>
        </mu-list>
        <Nothing  words="暂无子部门" v-else></Nothing>
      </mu-drawer>

      <!-- 联系人抽屉 -->
      <mu-drawer class="contacts" :style="`width:${drawerGroup_1 ? '60vw' : drawerGroup ? '70vw' : '80vw'}`" right :open.sync="drawerContacts">
        <div class="listTitle">联系人</div>
        <mu-list textline="two-line" v-if="contactsList.length > 0">
          <div v-for="(item ,index) in contactsList" :key="index">
            <mu-list-item button v-waves @click="drawerContacts = false;drawerDepartment = false; goPage('personalInfo',item)">
              <mu-avatar>
                <img :src="loadingImg('defaultImg.png')">
              </mu-avatar>
              <mu-list-item-content>
                <mu-list-item-title>{{item.realname}}</mu-list-item-title>
                <mu-list-item-sub-title>{{item.post}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== contactsList.length"></mu-divider>
          </div>
        </mu-list>
        <Nothing  words="暂无联系人" v-else></Nothing>

      </mu-drawer>
    </div>
    

  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import SearchBar from '../../components/SearchBar'
import Nothing from '../../components/Nothing'
import { mapMutations } from 'vuex'
export default {
  name:'organization',
  components:{ AppBar,SearchBar,Nothing },
  data(){
    return{
      drawerDepartment: false, //部门抽屉
      drawerGroup: false, //组抽屉
      drawerGroup_1: false, //子组抽屉
      drawerContacts: false, //联系人抽屉
      userList:[],

      companyList:[],
      deptList:[],
      groupList:[],
      groupList_1:[],
      contactsList:[],

      deptTitleName:'',
      groupTitleName:'',
      groupTitleName_1:'',

      deptActive:'',
      groupActive:'',
      group_1_Active:'',
      contactsActive:''
    }
  },
  created(){
    this.api.getDeptTree({type:'tree'}).then(res => {
      this.companyList = res.data;
    })
    this.api.getDeptContacts({deptId:'',shearch:'',needGroup:0}).then(res => {
      this.userList = res.data;
      // this.$store.commit('setUserList',res.data)
    })
    
  },
  methods:{
    getCompanyItem(item,type,index){
      if(type === 'dept'){
        this.deptActive = index;
        this.drawerDepartment = !this.drawerDepartment;
        if(!this.drawerDepartment) this.drawerGroup=false; this.drawerGroup_1=false; this.drawerContacts=false; this.groupActive=''; this.group_1_Active=''; this.contactsActive='';
        this.deptTitleName = item.name;
        this.deptList = item.children;
      }else if(type === 'group'){
        this.groupActive = index;
        this.drawerGroup = !this.drawerGroup;
        if(!this.drawerGroup) this.drawerGroup_1=false;this.drawerContacts=false; this.group_1_Active=''; this.contactsActive='';
        this.groupTitleName = item.name;
        this.groupList = item.children;
      }else if(type === 'group_1'){
        this.drawerGroup_1 = !this.drawerGroup_1;
        if(!this.drawerGroup_1) this.drawerContacts=false;  this.contactsActive='';
        this.groupTitleName_1 = item.name;
        this.groupList_1 = item.children;
      }else if(type === 'contacts'){
        this.contactsActive = index;
        this.drawerContacts = !this.drawerContacts;
        this.api.getDeptContacts({deptId:item.id,shearch:'',needGroup:0}).then(res => {
          this.contactsList = res.data;
        })
      }

      if(type === 'group_1' || type === 'contacts'){
        this.group_1_Active = index;
      }
    }
  }
}
</script>

<style scoped lang="less">
  .organization{
    height: 100vh;
    
    .content{
      padding: 104px 0;

      .active{
        background-color: #d3d3d3;
      }
      .mu-list{
        padding: 0;
        /deep/ .mu-item{
          height:46px;
        }
      }
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
          .mu-avatar{
            background-color: transparent;
          }
          .mu-item-sub-title{
            line-height: 20px;
          }
        }
        .nothing{
          height: calc(100% - 72px);
        }
      }
    }
  }
</style>