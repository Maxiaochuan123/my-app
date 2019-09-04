<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime: 2019-09-04 17:27:03
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="contacts">
    <AppBar leftLink="/home" pageTitle="联系人" rightIcon="icon-tianjia" rightLink="/addContacts"></AppBar>
    
    <div class="content">
      <SearchBar :list="userList" placeholderText="搜索联系人"></SearchBar>
      <div class="organization">
        <mu-list>
          <mu-list-item v-waves button @click="goPage('/organization')">
            <mu-list-item-action>
              <mu-avatar>
                <img src="../../../static/images/公司部门.png">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>公司部门</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item v-waves button @click="goPage('/teamContacts')">
            <mu-list-item-action>
              <mu-avatar>
                <img src="../../../static/images/团队联系人.png">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>团队联系人</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
      <!-- <div class="index-List"> -->
        <IndexsList :tagTop="242" :tagTopoffsetTop="250" :listSpacing="198" :list="userList"></IndexsList>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import IndexsList from "../../components/IndexsList";
import SearchBar from "../../components/SearchBar";

import userList from '../../../static/json/userList'
export default {
  components: {
    AppBar,
    IndexsList,
    SearchBar
  },
  data() {
    return {
      userList:userList
    };
  },
  created(){
    this.$store.commit('setUserList',userList)
  },
};
</script>

<style scoped lang="less">
.contacts {
  .content {
    width: 100vw;
    height: 100vh;
    padding-top: 44px;
    position: fixed;
    bottom: 0;

    .organization{
      position: fixed;
      top: 104px;
      width: 100vw;
      height: 120px;
      background-color: #FFF;
      .shallow-inset{
        margin-left: 72px;
      }
    }
    // .index-List{
    //   margin-top: 250;
    //   padding-bottom: 250;
    //   overflow-y: scroll;
    //   height: 100%;
    // }
  }
}
</style>