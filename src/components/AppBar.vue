<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 11:48:12
 * @LastEditTime: 2019-08-30 17:21:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-bar">
    <mu-appbar z-depth="0">
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
      type: String,
      default:'icon-fanhui'
    },
    iconSize: {
      type: String,
      default: "24"
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
  .mu-popover {
    top: 52px !important;
    right: 2px !important;
  }
}
</style>
