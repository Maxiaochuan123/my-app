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
      :list="[]"
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
        v-if="Object.keys(userList).length>0"
      >
        <div
          @click="toDetails(row)"
          class="index-customer"
          slot="row"
          slot-scope="{row,index,total}"
        >
          <div class="index-customer-wrap">
            <div class="title">
              <span>{{row.customerName}}</span>
              <span class="rank">{{row.customerLevel}}</span>
            </div>
            <div class="sub-title">{{row.detailAddress || '暂无详细地址'}}</div>
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
import Nothing from "@components/Nothing.vue";
import Api from "@api";

export default {
  name: "customerManage",
  components: { AppBar, SearchBar, IndexsList, Nothing },
  data() {
    return {
      rightIcon: "icon-tianjia",
      rightLinkName: "addOrEditCustomer",
      active: "my", // 当前激活(my=>我的,team=>团队)
      userList:[],
      words: "暂无我的客户",
      requestParams: {
        // 列表请求的参数
        search: "",
        type: 2 // 1代表团队客户,2代表我的客户
      }
    };
  },
  props: {},
  created() {

  },
  mounted() {
    this.queryList();
  },
  methods: {
    queryList() {
      Api.queryCustomerList(this.requestParams).then(res => {
        this.userList = res.data;
      });
    },
    tabChange(val) {
      if (val === "my") {
        this.requestParams.type = 2;
        this.words = "暂无我的客户";
        this.queryList();
      } else {
        this.requestParams.type = 1;
        this.words = "暂无我的客户";
        this.queryList();
      }
    },
    toDetails(row) {
      this.goPage("customerBasic", { id: row.customerId });
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