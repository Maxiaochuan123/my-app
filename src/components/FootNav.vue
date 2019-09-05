<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 18:57:37
 * @LastEditTime: 2019-09-05 15:15:14
 * @LastEditors: Please set LastEditors
 -->
<!--
 * @Description: 底部导航,不同于主页的底部
 * @Author:shenah
 -->
<template>
  <div class="foot-nav">
    <div class="nav-item" v-for="(item,index) in list" :key="index" @click="navItem(item)">
      <img :src="item.img" />
      <div class="text">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FootNav",
  components: {},
  data() {
    return {};
  },
  props: {
    list: {
      // 数组对象
      // img => 图片的地址
      // label => 显示的名字
      // linkName=> 跳转的链接
      // isLink => 是否跳转链接
      // type => 代表的是点击的哪个
      type: Array,
      default: () => []
    }
  },
  mounted() {},
  methods: {
    navItem(item) {
      let { linkName, isLink } = item;
      if (isLink) {
        this.goPage(linkName);
      } else {
        this.$emit("footNavChange", item);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.foot-nav {
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top:20px;
  position: fixed;
  bottom: 0;
  height: 87px;
  box-shadow:0px 16px 23px 0px rgba(159,159,159,1);
  .nav-item {
    display: flex;
    margin: 6px 10px 6px 0;
    flex-direction: column;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
    }
    .text {
      padding-top: 4px;
      font-size: 14px;
      color: @primary-text;
    }
  }
}
</style>