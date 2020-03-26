<!--
 * @Description: 客户管理
 * @Author: shenah
 -->
<template>
  <div class="customer-manage">
    <AppBar
      :topLevelPage="true"
      :rightIcon="rightIcon"
      :rightIconFlag="customerRights.save"
      :rightLinkName="rightLinkName"
      pageTitle="客户管理"
    ></AppBar>
    <SearchInputBar
      @searchInputBarChange="searchInputBarChange"
      placeholderText="搜索客户"
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
      <mu-tab value="my">我的客户</mu-tab>
      <mu-tab value="team">团队客户</mu-tab>
    </mu-tabs>
    <div class="content">
      <div class="content-wrap">
        <mu-load-more
          :class="{'bg-class':listObj.list.length > 0}"
          :loading="loading"
          @load="load"
          class="list-wrap"
        >
          <div v-if="listObj.list.length">
            <div
              :key="index"
              @click="toDetails(row)"
              class="index-customer"
              v-for="(row,index) in listObj.list"
            >
              <div class="index-customer-wrap">
                <div class="title">
                  <span :class="{'is-able':row.isLock === 1}">{{row.customerName}}</span>
                  <span class="rank">{{row.customerLevel}}</span>
                </div>
                <div class="sub-title">{{row.detailAddress || '暂无详细地址'}}</div>
              </div>
              <mu-divider></mu-divider>
            </div>
          </div>
          <Nothing
            :words="words"
            v-else
          ></Nothing>
        </mu-load-more>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@components/AppBar.vue";
import SearchInputBar from "@components/SearchInputBar.vue";
import IndexsList from "@components/IndexsList.vue";
import Nothing from "@components/Nothing.vue";
import Api from "@api";

export default {
  name: "customerManage",
  components: { AppBar, SearchInputBar, IndexsList, Nothing },
  computed: {
    ...mapState({
      customerRights: state => state.authorities.crm.customer
    })
  },
  data() {
    return {
      loading: false,
      rightIcon: "icon-tianjia",
      rightLinkName: "addOrEditCustomer",
      active: "my", // 当前激活(my=>我的,team=>团队)
      listObj: {
        list: []
      }, // 客户列表
      searchList: [], // 搜索客户
      words: "暂无我的客户",
      requestParams: {
        // 列表请求的参数
        search: "",
        type: 2, // 1代表团队客户,2代表我的客户
        teamType: 1, // 0代表团队,1代表个人
        pageIndex: 1, // 页码数量
        pageSize: 15 // 1页显示的个数
      }
    };
  },
  props: {},
  created() {},
  mounted() {
    this.queryList();
  },
  methods: {
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.search = value;
      this.requestParams.pageIndex = 1;
      this.queryList();
    },
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.queryList(true).then(() => {
        this.loading = false;
      });
    },
    queryList(flag) {
      return Api.queryCustomerListPC(this.requestParams).then(res => {
        let data = res.data;
        let list = data.list;
        if (list.length === 0 && flag) {
          this.requestParams.pageIndex -= 1;
        }
        if (flag) {
          this.listObj.list.push(...list);
        } else {
          this.listObj = res.data;
        }
      });
    },
    tabChange(val) {
      this.requestParams.pageIndex = 1;
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
  overflow: hidden;
  .tabs {
    position: fixed;
    top: 104px;
  }
  .content {
    width: 100%;
    padding-top: 160px;
    height: 100%;
    overflow: hidden;
    .content-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
      .list-wrap {
        width: 100%;
        padding: 0 15px;
      }
      .bg-class {
        background-color: #fff;
      }
    }
  }
}
.index-customer {
  width: 100%;
  list-style-type: none;
  padding: 10px 0 0 0;
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