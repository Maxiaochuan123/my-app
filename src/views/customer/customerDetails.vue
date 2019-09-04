<!--
 * @Description: 客户详情
 * @Author: shenah
 -->
<template>
  <div class="customerDetails">
    <AppBar
      pageTitle="客户详情"
      :rightIcon="rightIcon"
      :rightLink="rightLink"
      isMenu
      :menuList="menuList"
      @menuChange="menuChange"
    ></AppBar>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
export default {
  name: "customerDetails",
  components: { AppBar },
  data() {
    return {
      rightIcon: "icon-gengduo1",
      rightLink: "/addOrEditCustomer",
      menuList: [
        {
          title: "分享",
          link: "/homeChild",
          isLink: false,
        },
        {
          title: "放入公海",
          link: "/myInfoChild",
          isLink: false
        },
        {
          title: "编辑",
          link: "/link3",
          isLink: true
        },
        {
          title: "删除",
          link: "/link4",
          isLink: false
        }
      ]
    };
  },
  props: {},
  mounted() {},
  methods: {
    menuChange(item) {
      console.log(1111, item);
    }
  }
};
</script>
<style lang='less' scoped>
.customerDetails {
  width: 100%;
  height: 100%;
}
</style>