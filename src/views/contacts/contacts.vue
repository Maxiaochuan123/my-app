<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime: 2019-08-29 17:37:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="contacts">
    <AppBar :iconSize="iconSize" :leftIcon="leftIcon" :leftLink="leftLink" :pageTitle="title"></AppBar>
    
    <div class="content">
      <div class="serch">
        <mu-icon size="20" value=":iconfont icon-sousuo"></mu-icon>
        <mu-select filterable full-width v-model="filterable.value1" placeholder="搜索联系人">
          <mu-option v-for="(item,index) in filterUserList" :key="index" :label="item.userName" :value="item.userName" @click.native="goTag(item.tag)"></mu-option>
        </mu-select>
      </div>
      <div class="organization">
        <Organization></Organization>
      </div>
      <div class="indexList">
        <IndexsList></IndexsList>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import IndexsList from "./IndexsList";
import Organization from "./Organization";

import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    AppBar,
    Organization,
    IndexsList
  },
  data() {
    return {
      iconSize: "20",
      leftIcon: "icon-fanhui",
      leftLink: "/home",
      title: "联系人",

      filterUserList:[],
      filterable: {
        value1: ''
      }
    };
  },
  mounted(){
    this.userList.forEach( item => {
      item.userList.forEach( itemUser => {
        this.filterUserList.push({userName:itemUser.Fsinger_name,tag:item.Findex})
      })
    })
  },
  methods:{
    goTag(tag){
      document.querySelector(`#${tag}`).scrollIntoView(true);
    }
  },
  computed:{
    ...mapState(['userList'])
  }
};
</script>

<style scoped lang="less">
.contacts {
  background-color: #ff6600;

  .content {
    width: 100vw;
    height: calc(100vh - 50px);
    position: fixed;
    bottom: 0;
    background-color: aquamarine;
    .serch {
      position: fixed;
      top: 50px;
      z-index: 99;
      width: 100%;
      height: 50px;
      background-color: #ff6600;

      .mu-icon{
        font-size: 24px !important;
        position: absolute;
        top: 4px;
        left: 8vw;
      }
      .mu-input{
        position: absolute;
        right: 6vw;
        width: 78vw;
      }
    }

    .organization{
      position: fixed;
      top: 100px;
      width: 100vw;
      height: 50px;
      background-color: cornflowerblue
    }

    .indexList {
      margin-top: 100px;
      height: calc(100% - 100px);
    }
  }
}
</style>