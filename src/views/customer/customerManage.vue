<!--
 * @Description: 客户管理
 * @Author: shenah
 -->
<template>
  <div class="customer-manage">
    <AppBar pageTitle="客户管理" :rightIcon="rightIcon" :rightLinkName="rightLinkName"></AppBar>
    <SearchBar placeholderText="搜索客户" :list="userList"></SearchBar>
    <mu-tabs
      :value.sync="active"
      inverse
      color="primary"
      indicator-color="primary"
      center
      class="tabs"
    >
      <mu-tab value="my">我的客户</mu-tab>
      <mu-tab value="team">团队客户</mu-tab>
    </mu-tabs>
    <div class="content">
      <IndexsList :tagTop="242" :tagTopoffsetTop="250" :listSpacing="0" :list="userList">
        <div slot="row" slot-scope="parentName">{{parentName}}</div>
      </IndexsList>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import SearchBar from "@components/SearchBar.vue";
import IndexsList from "@components/IndexsList.vue";
import userList from "../../../static/json/userList";

export default {
  name: "customerManage",
  components: { AppBar, SearchBar, IndexsList },
  data() {
    return {
      rightIcon: "icon-tianjia",
      rightLinkName: "addOrEditCustomer",
      active: "my", // 当前激活(my=>我的,team=>团队)
      userList: userList
    };
  },
  props: {},
  created() {
    this.$store.commit("setUserList", userList);
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.customer-manage {
  width: 100%;
  height: 100%;
  .tabs {
    position: fixed;
    top: 104px;
  }
  .content {
    height: 100%;
    padding-top: 184px;
  }
}
</style>