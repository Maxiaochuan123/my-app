<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 11:48:12
 * @LastEditTime: 2019-09-05 11:02:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-bar">
    <mu-appbar z-depth="0">
      <mu-button icon slot="left" @click="leftClick()">
        <mu-icon :size="iconSize" :value="`:iconfont ${leftIcon}`"></mu-icon>
      </mu-button>
      {{pageTitle}}
      <mu-button icon v-if="isDrawer" @click="opeDrawer = true">
        <mu-icon :size="iconSize" :value="`:iconfont ${drawerIcon}`"></mu-icon>
      </mu-button>
      <!-- 右侧按钮 -->
      <mu-menu slot="right" cover placement="bottom-end" v-if="!custom" :open.sync="menuFlag">
        <mu-button icon @click="rightBtn()" :disabled="!isShowRightBtn">
          <mu-icon :size="iconSize" :value="`:iconfont ${rightIcon}`"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item
            button
            v-for="(item, index) in menuList"
            :key="index"
            @click="menuItem(item)"
          >
            <mu-list-item-content>
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>

      <!-- 自定义右侧按钮 -->
      <mu-button
        class="customBtn"
        flat
        slot="right"
        @click="customFnc"
        v-if="custom"
      >{{customTitle}}</mu-button>
    </mu-appbar>
    <mu-drawer :open.sync="opeDrawer" right :docked="false">
      <div class="drawerTitle">筛选</div>
      <slot name="drawerContent"></slot>
      <div class="operation">
        <mu-button class="reset" @click="resetDrawerList">重置</mu-button>
        <mu-button color="primary">确定(5)</mu-button>
      </div>
    </mu-drawer>
  </div>
</template>

<script>
export default {
  name: "app-bar",
  props: {
    leftLinkName: {
      type: String
    },
    leftIcon: {
      type: String,
      default: "icon-fanhui"
    },
    iconSize: {
      type: String,
      default: "24"
    },

    pageTitle: {
      type: String,
      default: "pageTitle"
    },
    isShowRightBtn: {
      // 是否禁用右边的按钮
      type: Boolean,
      default: true
    },
    rightIcon: {
      type: String
    },
    rightLinkName: {
      type: String
    },
    rightLinkParams:{
      type: Object,
      default:()=> {}
    },
    isDrawer: {
      type: Boolean,
      default: false
    },
    drawerIcon: {
      type: String
    },
    drawerList: {
      type: Object,
      default:()=> {}
    },

    //为 true 时 menuList 是必须的
    isMenu: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: () => []
    },
    //是否自定义 右侧按钮
    custom: {
      type: Boolean,
      default: false
    },
    customTitle: {
      type: String
    },
    customFnc: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      opeDrawer: false,
      menuFlag: false
    };
  },
  methods: {
    leftClick() {
      if (this.leftLinkName) {
        this.goPage(this.leftLinkName);
      } else {
        this.$router.go(-1);
      }
    },
    rightBtn() {
      if (!this.isMenu) {
        this.goPage(this.rightLinkName,this.rightLinkParams);
      }
    },
    menuItem(item) {
      const { isLink, title, linkName, linkParams = {} } = item;
      if (isLink) {
        this.goPage(linkName, linkParams);
      } else {
        this.$emit("menuChange", item);
        this.menuFlag = false;
      }
    },
    resetDrawerList(){
      for(let item in this.drawerList){
        this.drawerList[item] = ''
      }
    }
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
  .customBtn {
    color: @primary;
    font-size: @primary-size;
    // .mu-button-wrapper{
    //   padding-left: 0px;
    // }
  }
  .mu-drawer{
    padding: 46px 25px;
  }
  .drawerTitle{
    font-size: 20px;
    font-weight: @primary-weight;
    color: @primary-text;
  }
  .drawerContent{
    margin-top: 20px;
  }
  .operation{
    position: absolute;
    bottom: 46px;
    width: 84%;
    display: flex;
    justify-content: space-between;
    .reset{
      color: @primary-text;
      background-color: #EDEDED;
    }
  }
}
</style>
