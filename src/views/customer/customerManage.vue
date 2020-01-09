<!--
 * @Description: 客户管理
 * @Author: shenah
 -->
<template>
  <div class="customer-manage">
    <AppBar
      :rightIcon="rightIcon"
      :rightIconFlag="customerRights.save"
      :rightLinkName="rightLinkName"
      pageTitle="客户管理"
    ></AppBar>
    <SearchBar
      :list="searchList"
      placeholderText="搜索客户"
      showLabel="customerName"
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
        :list="userObj"
        :listSpacing="0"
        :tagTop="242"
        :tagTopoffsetTop="250"
        v-if="Object.keys(userObj).length>0"
      >
        <div
          @click="toDetails(row)"
          class="index-customer"
          slot="row"
          slot-scope="{row,index,total}"
        >
          <div class="index-customer-wrap">
            <div class="title">
              <span :class="{'is-able':row.isLock === 1}">{{row.customerName}}</span>
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
import { mapState } from "vuex";
import AppBar from "@components/AppBar.vue";
import SearchBar from "@components/SearchBar.vue";
import IndexsList from "@components/IndexsList.vue";
import Nothing from "@components/Nothing.vue";
import Api from "@api";

export default {
  name: "customerManage",
  components: { AppBar, SearchBar, IndexsList, Nothing },
  computed: {
    ...mapState({
      customerRights: state => state.authorities.crm.customer
    })
  },
  data() {
    return {
      rightIcon: "icon-tianjia",
      rightLinkName: "addOrEditCustomer",
      active: "my", // 当前激活(my=>我的,team=>团队)
      userObj: {}, // 客户列表
      searchList: [], // 搜索客户
      words: "暂无我的客户",
      requestParams: {
        // 列表请求的参数
        search: "",
        type: 2, // 1代表团队客户,2代表我的客户
        teamType: 1 // 0代表团队,1代表个人
      }
    };
  },
  props: {},
  created() {},
  mounted() {
    this.queryList();
  },
  methods: {
    queryList() {
      Api.queryCustomerList(this.requestParams).then(res => {
        let list = res.data || [];
        this.userObj = list;
        this.searchList = Object.keys(list).length > 0 ? [list] : [{}];
      });
    },
    tabChange(val) {
      if (val === "my") {
        this.requestParams.teamType = 1;
        this.words = "暂无我的客户";
        this.queryList();
      } else {
        this.requestParams.teamType = 0;
        this.words = "暂无团队客户";
        this.queryList();
      }
    },
    toDetails(row) {
      this.goPage("customerDetails", { id: row.customerId });
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
    padding-top: 168px;
  }
}
.index-customer {
  width: 100%;
  list-style-type: none;
  padding: 10px 0 0 20px;
  .index-customer-wrap {
    width: 100%;
    height: 100%;
    padding: 0 24px 6px 0;
    .title {
      display: flex;
      font-size: @primary-size;
      font-weight: @primary-weight;
      color: @primary-text;
      justify-content: space-between;
      align-items: center;
      .is-able {
        color: #ccc;
      }
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