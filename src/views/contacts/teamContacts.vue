<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime: 2019-09-05 11:00:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="teamContacts">
    <AppBar :leftLinkName="leftLinkName" :pageTitle="title"></AppBar>
    
    <div class="content">
      <SearchBar :list="userList"></SearchBar>
        <IndexsList :list="userList"></IndexsList>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import IndexsList from "../../components/IndexsList";
import SearchBar from "../../components/SearchBar";

import { mapState } from 'vuex'
export default {
  components: {
    AppBar,
    IndexsList,
    SearchBar
  },
  data() {
    return {
      leftLinkName: "contacts",
      title: "联系人"
    };
  },
  computed:{
    ...mapState(['userList'])
  }
};
</script>

<style scoped lang="less">
.teamContacts {
  .content {
    width: 100vw;
    height: 100vh;
    padding-top: 44px;
    position: fixed;
    bottom: 0;
  }
}
</style>