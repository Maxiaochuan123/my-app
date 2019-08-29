<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 11:20:09
 * @LastEditTime: 2019-08-29 15:41:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="organization">
    <!-- 导航 -->
    <mu-list>
      <mu-list-item v-waves button @click="goPage('/organizationDrawer')">
        <mu-list-item-action>
          <mu-icon value=":iconfont icon-gongsi"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>公司部门</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value=":iconfont icon-rightArrow1"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<style scoped lang="less">
  .organization{
    .mu-list{
      padding: 0;
      height: 50px;

      .mu-item{
        .mu-item-action:first-child{
          min-width: 44px;
          i{
            font-size: 24px;
          }
        }
      }
    }
  }
</style>