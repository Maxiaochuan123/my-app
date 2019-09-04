<!--  -->
<template>
  <div class="customer-manage">
    <AppBar pageTitle="客户管理" :rightIcon="rightIcon" :rightLink="rightLink"></AppBar>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
export default {
  name: "customerManage",
  components: { AppBar },
  data() {
    return {
      rightIcon: "icon-tianjia",
      rightLink: "/homeChild"
    };
  },
  props: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.customer-manage {
}
</style>