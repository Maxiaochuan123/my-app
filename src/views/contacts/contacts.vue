<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime: 2019-08-30 18:10:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="contacts">
    <AppBar :leftLink="leftLink" :pageTitle="title"></AppBar>
    
    <div class="content">
      <div class="serch">
        <div class="serchInput">
          <mu-icon size="16" value=":iconfont icon-sousuo"></mu-icon>
          <mu-select filterable full-width v-model="filterable.value1" placeholder="搜索联系人">
            <mu-option v-for="(item,index) in filterUserList" :key="index" :label="item.userName" :value="item.userName" @click.native="goTag(item.tag)"></mu-option>
          </mu-select>
        </div>
      </div>
      <div class="moreContacts">
        <mu-list>
          <mu-list-item v-waves button @click="goPage('/moreContactsDrawer')">
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
      <div class="indexList">
        <IndexsList></IndexsList>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import IndexsList from "./IndexsList";

import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    AppBar,
    IndexsList
  },
  data() {
    return {
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
  // background-color: #ff6600;

  .content {
    width: 100vw;
    height: 100vh;
    padding-top: 44px;
    position: fixed;
    bottom: 0;
    // background-color: aquamarine;
    .serch {
      position: fixed;
      top: 44px;
      z-index: 99;
      width: 100%;
      height: 60px;
      padding: 12px 15px;
      background-color: #FFF;

      .serchInput{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        padding: 7px 10px;
        display: flex;
        color: #9f9f9f;
        background-color: #EDEDED;

        /deep/ .mu-input{
          min-height: 32px;
          margin-bottom: 0;
          padding-bottom: 0;
          padding-top: 0;

          /deep/ .mu-select-action, .mu-input-line, .mu-input-focus-line{
            display: none;
          }
          .mu-select-input.is-enable{
            padding-left: 12px;
          }
          .mu-select-content input{
            position: absolute;
            top: -5px;
          }
        }
        
      }

      // .mu-icon{
      //   font-size: 24px !important;
      //   position: absolute;
      //   top: 4px;
      //   left: 8vw;
      // }
      // .mu-input{
      //   position: absolute;
      //   right: 6vw;
      //   width: 78vw;
      // }
    }

    .moreContacts{
      position: fixed;
      top: 104px;
      width: 100vw;
      height: 120px;
      background-color: #FFF;
    }
    // .teamContacts{
    //   top: 150px;
    // }

    .indexList {
      height: 100%;
      margin-top: 198px;
      padding-bottom: 198px;
    }
  }
}
</style>