<!--
 * @Description: 公海
 * @Author: shenah
 -->
<template>
  <div class="common-waters">
    <AppBar
      :isShowRightBtn="false"
      pageTitle="公海"
    ></AppBar>
    <SearchInputBar
      :type="active"
      @searchInputBarChange="searchInputBarChange"
      placeholderText="搜索"
      ref="searchInputBar"
    ></SearchInputBar>
    <mu-tabs
      :value.sync="active"
      @change="tabChange"
      center
      class="tabs"
      color="primary"
      indicator-color="primary"
      inverse
    >
      <mu-tab
        replace
        to="commonWatersClue"
        value="clue"
      >公海线索</mu-tab>
      <mu-tab
        replace
        to="commonWatersPeople"
        value="customer"
      >公海客户</mu-tab>
    </mu-tabs>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import SearchInputBar from "@components/SearchInputBar.vue";
import Api from "@api";
export default {
  name: "commonWaters",
  components: { AppBar, SearchInputBar },
  data() {
    return {
      requestParams: {
        search: "",
        type: "8"
      },
      active: "clue", // 当前激活
      customerList: [] // 客户列表
    };
  },
  props: {},
  created() {},
  mounted() {
    this.judgeActiveTab();
  },
  methods: {
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.search = value;
      if (type === "clue") {
      } else {
        this.queryPublicPool();
      }
    },
    queryPublicPool() {
      Api.queryPublicPoolCustomer(this.requestParams).then(res => {
        let list = [];
        Object.keys(res.data).forEach(item => {
          list.push(...res.data[item]);
        });
        this.customerList = list;
      });
    },
    judgeActiveTab() {
      this.requestParams.search = "";
      if (this.$route.path.indexOf("commonWatersPeople") > -1) {
        this.active = "customer";
        this.requestParams.type = "8";
        this.queryPublicPool();
      } else {
        this.active = "clue";
      }
    },
    tabChange(val) {
      this.requestParams.search = "";
      this.$refs.searchInputBar.inputValue = "";
      if (val === "clue") {
        // 线索
      } else {
        this.requestParams.type = "8";
        // 公海客户
        this.queryPublicPool();
      }
    }
  }
};
</script>
<style lang='less' scoped>
.common-waters {
  width: 100%;
  height: 100%;
  .tabs {
    position: fixed;
    top: 104px;
  }
  .content {
    height: 100%;
    padding-top: 172px;
  }
}
</style>