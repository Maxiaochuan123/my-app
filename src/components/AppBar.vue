<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 11:48:12
 * @LastEditTime: 2019-08-29 17:37:01
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-bar">
    <mu-appbar z-depth="3" color="primary">
      <mu-button icon slot="left" @click="goPage(leftLink)">
        <mu-icon :size="iconSize" :value="`:iconfont ${leftIcon}`"></mu-icon>
      </mu-button>
      {{pageTitle}}
      
      <mu-button icon v-if="isDrawer" @click="opeDrawer = true">
        <mu-icon :size="iconSize" :value="`:iconfont ${drawerIcon}`"></mu-icon>
      </mu-button>

      <mu-menu slot="right" cover>
        <mu-button icon @click="!isMenu ? goPage(rightLink) : ''">
          <mu-icon :size="iconSize" :value="`:iconfont ${rightIcon}`"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button v-for="(item, index) in menuList" :key="index" @click="goPage(item.link)">
            <mu-list-item-content>
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>

    </mu-appbar>
    <mu-drawer :open.sync="opeDrawer" right>
      <slot name="drawerContent"></slot>
      <mu-list>
        <mu-list-item  @click="opeDrawer = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
export default {
  name: "app-bar",
  props: {
    leftIcon: {
      type: String
    },
    iconSize: {
      type: String,
      default: "30"
    },
    leftLink: {
      type: String
    },

    pageTitle: {
      type: String,
      default: "pageTitle"
    },

    rightIcon: {
      type: String
    },
    rightLink: {
      type: String
    },

    isDrawer: {
      type: Boolean,
      default: false
    },
    drawerIcon: {
      type: String
    },

    isMenu: { //为 true 时 menuList 是必须的
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      opeDrawer:false,
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.app-bar {
  width: 100%;
  // height: 50px;
  position: fixed;
  z-index: 99;
  // bottom: 0;
  .mu-appbar {
    height: 50px;
    
    .mu-appbar-title {
      text-align: center;
      position: relative;
      
      .mu-button{
        position: absolute;
        right: 0;
        bottom: 5px;
      }
    }
  }
  .mu-popover {
    top: 52px !important;
    right: 2px !important;
  }
}
</style>
