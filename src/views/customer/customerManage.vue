<!--
 * @Description: 客户管理
 * @Author: shenah
 -->
<template>
  <div class="customer-manage">
    <AppBar pageTitle="客户管理" :rightIcon="rightIcon" :rightLink="rightLink"></AppBar>
    <div class="content">
      <SearchBar placeholderText="搜索客户"></SearchBar>
      <mu-tabs :value.sync="active" inverse color="primary" indicator-color="primary" center>
        <mu-tab value="my">我的客户</mu-tab>
        <mu-tab value="team">团队客户</mu-tab>
      </mu-tabs>
      <IndexsList :tagTop="242" :tagTopoffsetTop="250" :listSpacing="198"></IndexsList>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import SearchBar from "@components/SearchBar.vue";
import IndexsList from "@components/SearchBar.vue";

export default {
  name: "customerManage",
  components: { AppBar, SearchBar, IndexsList },
  data() {
    return {
      rightIcon: "icon-tianjia",
      rightLink: "/addOrEditCustomer",
      active: "my" // 当前激活(my=>我的,team=>团队)
    };
  },
  props: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.customer-manage {
  width: 100%;
  height: 100%;
  .content {
    padding-top: 104px;
  }
}
</style>