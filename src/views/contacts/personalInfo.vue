<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 11:20:09
 * @LastEditTime: 2019-08-30 15:11:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="personalInfo">
    <AppBar leftLink="/organizationDrawer" pageTitle="个人信息" />

    <div class="content">
      <mu-paper :z-depth="1">
        <mu-list>
          <mu-list-item>
            <mu-list-item-action>
              <mu-icon size="24" value=":iconfont icon-touxiang"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>张三</mu-list-item-title>
              <mu-list-item-sub-title>Jan 9, 2014</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-paper>

      <mu-paper class="info" :z-depth="1">
        <mu-list textline="two-line">
          <mu-list-item v-waves>
            <mu-list-item-action>
              <span>手机号码:</span>
            </mu-list-item-action>
            <mu-list-item-content>
              <span class="phone" @click="dial(13111866951)">13111866951</span>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item>
            <mu-list-item-action>
              <span>部门:</span>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>总经办</mu-list-item-title>
              <mu-list-item-sub-title>成都众汇车服集团有限公司/四川公司/总经办</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
export default {
  name: "personalInfo",
  components: { AppBar },
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>

<style scoped lang="less">
.personalInfo {
  .content{
    padding: 60px 4px;

    .mu-icon{
      height: 40px !important;
    }
    .mu-divider{
      margin-left: 4%;
      width: 92%;
    }

    .info{
      margin-top: 10px;
      .phone{
        color: #2196f3;
      }
      // .mu-list-two-line /deep/ .mu-item{
      //   height: 60px;
      // }
      .mu-item-action{
        min-width: 72px;
      }
    }
  }
}
</style>