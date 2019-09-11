<!--
 * @Description: 客户管理
 * @Author: shenah
 -->
<template>
  <div class="customer-manage">
    <AppBar
      :rightIcon="rightIcon"
      :rightLinkName="rightLinkName"
      pageTitle="客户管理"
    ></AppBar>
    <SearchBar
      :list="userList"
      placeholderText="搜索客户"
    ></SearchBar>
    <mu-tabs
      :value.sync="active"
      @change="tabChange"
      center
      class="tabs"
      color="primary"
      indicator-color="primary"
      inverse
    >
      <mu-tab value="my">我的客户</mu-tab>
      <mu-tab value="team">团队客户</mu-tab>
    </mu-tabs>
    <div class="content">
      <IndexsList
        :list="userList"
        :listSpacing="0"
        :tagTop="242"
        :tagTopoffsetTop="250"
        v-if="userList.length>0"
      >
        <div
          @click="toDetails(row)"
          class="index-customer"
          slot="row"
          slot-scope="{row,index,total}"
        >
          <div class="index-customer-wrap">
            <div class="title">
              <span>{{row.Fsinger_name}}</span>
              <span class="rank">H级</span>
            </div>
            <div class="sub-title">{{row.describe}}</div>
          </div>
          <mu-divider v-if="total-1 !== index"></mu-divider>
        </div>
      </IndexsList>
      <div v-else>
        <Nothing :words="words"></Nothing>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import SearchBar from "@components/SearchBar.vue";
import IndexsList from "@components/IndexsList.vue";
import userList from "../../../static/json/userList";
import Nothing from "@components/Nothing.vue";

export default {
  name: "customerManage",
  components: { AppBar, SearchBar, IndexsList, Nothing },
  data() {
    return {
      rightIcon: "icon-tianjia",
      rightLinkName: "addOrEditCustomer",
      active: "my", // 当前激活(my=>我的,team=>团队)
      userList: userList,
      words: "暂无我的客户"
    };
  },
  props: {},
  created() {
    this.$store.commit("setUserList", userList);
  },
  mounted() {},
  methods: {
    tabChange(val) {
      if (val === "my") {
        console.log("我的客户");
        this.words = "暂无我的客户";
      } else {
        console.log("团队客户");
        this.words = "暂无团队客户";
      }
    },
    toDetails(row) {
      this.goPage("customerBasic", { id: row.Fsinger_mid });
    }
  }
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
.index-customer {
  width: 100%;
  list-style-type: none;
  padding: 10px 0 0 20px;
  .index-customer-wrap {
    width: 100%;
    height: 100%;
    padding-right: 24px;
    .title {
      display: flex;
      font-size: @primary-size;
      font-weight: @primary-weight;
      color: @primary-text;
      justify-content: space-between;
      align-items: center;
      .rank {
        font-size: @regular-size;
        color: #ec191f;
      }
    }
    .sub-title {
      // margin-top: 4px;
      margin-bottom: 10px;
      font-size: @regular-size;
      color: @regular-text;
    }
  }
}
</style>