<!--
 * @Description: 公海
 * @Author: shenah
 -->
<template>
  <div class="common-waters">
    <AppBar
      :topLevelPage="true"
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
      @change="tabsChange"
      center
      class="tabs"
      color="primary"
      indicator-color="primary"
      inverse
    >
      <mu-tab value="clue">公海线索</mu-tab>
      <mu-tab value="customer">公海客户</mu-tab>
    </mu-tabs>
    <div class="content">
      <CommonWatersClue
        @commonWatersClueChange="commonWatersClueChange"
        ref="commonWatersClue"
        v-if="active === 'clue'"
      ></CommonWatersClue>
      <CommonWatersPeople
        @commonWatersPeopleChange="commonWatersPeopleChange"
        ref="commonWatersPeople"
        v-else
      ></CommonWatersPeople>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@components/AppBar.vue";
import SearchInputBar from "@components/SearchInputBar.vue";
import CommonWatersClue from "./commonWatersClue";
import CommonWatersPeople from "./commonWatersPeople";
import Api from "@api";
export default {
  name: "commonWaters",
  components: { AppBar, SearchInputBar, CommonWatersClue, CommonWatersPeople },
  data() {
    return {
      requestParams: {
        search: "",
        type: "8",
        pageIndex: 1, // 页码数量
        pageSize: 15 // 1页显示的个数
      },
      active: "clue", // 当前激活
      customerList: {
        list: []
      }, // 客户列表
      clueList: {
        list: []
      } // 线索列表
    };
  },
  computed: {
    ...mapState({
      poolRights: state => state.authorities.crm.pool
    })
  },
  props: {},
  created() {},
  mounted() {
    this.judgeActiveTab();
  },
  methods: {
    commonWatersClueChange({ type }) {
      if (type === "load") {
        // 滚动加载
        this.$refs.commonWatersClue.loading = true;
        this.requestParams.pageIndex += 1;
        this.queryPublicPoolClue(true).then(() => {
          this.$refs.commonWatersClue.loading = false;
        });
      }
    },
    commonWatersPeopleChange({ type }) {
      if (type === "load") {
        // 滚动加载
        this.$refs.commonWatersPeople.loading = true;
        this.requestParams.pageIndex += 1;
        this.queryPublicPoolCustomer(true).then(() => {
          this.$refs.commonWatersPeople.loading = false;
        });
      }
    },
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.pageIndex = 1;
      this.requestParams.search = value;
      if (type === "clue") {
        this.queryPublicPoolClue();
      } else {
        this.queryPublicPoolCustomer();
      }
    },
    queryPublicPoolClue(flag) {
      // 查询公海线索
      return Api.queryCommonWaterClueList(this.requestParams).then(res => {
        let data = res.data;
        let list = data.list;
        if (list.length === 0 && flag) {
          this.requestParams.pageIndex -= 1;
        }
        if (flag) {
          this.clueList.list.push(...list);
        } else {
          this.clueList = res.data;
        }
      });
    },
    queryPublicPoolCustomer(flag) {
      // 查询公海客户
      return Api.queryPublicPoolCustomer(this.requestParams).then(res => {
        let data = res.data;
        let list = data.list;
        if (list.length === 0 && flag) {
          this.requestParams.pageIndex -= 1;
        }
        if (flag) {
          this.customerList.list.push(...list);
        } else {
          this.customerList = res.data;
        }
      });
    },
    judgeActiveTab() {
      this.requestParams.search = "";
      this.active = "clue";
      this.queryPublicPoolClue();
    },
    tabsChange(val) {
      this.active = val;
      this.requestParams.search = "";
      this.requestParams.pageIndex = 1;
      this.$refs.searchInputBar.inputValue = "";
      if (val === "clue") {
        // 线索
        this.queryPublicPoolClue();
      } else {
        this.requestParams.type = "8";
        // 公海客户
        this.queryPublicPoolCustomer();
      }
    }
  }
};
</script>
<style lang='less' scoped>
.common-waters {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .tabs {
    position: fixed;
    top: 104px;
  }
  .content {
    height: 100%;
    padding-top: 164px;
    overflow: hidden;
  }
}
</style>