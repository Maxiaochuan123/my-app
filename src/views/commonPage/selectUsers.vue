
<!--
 * @Description: 选择用户共用页面
 * @Author: shenah
 -->
<template>
  <div class="select-users">
    <AppBar pageTitle="选择用户" custom :customFnc="customFnc" customTitle="确定"></AppBar>
    <SearchBar placeholderText="搜索客户" :list="userList"></SearchBar>
    <div class="content">
      <IndexsList :tagTop="242" :tagTopoffsetTop="250" :listSpacing="0" :list="userList">
        <div slot="row" slot-scope="{row}" class="index-users" @click="select(row)">
          <img src="/static/images/selected.png" v-show="row.flag" class="select" />
          <img src="/static/images/no-selected.png" v-show="!row.flag" class="select" />
          <mu-avatar size="40" class="user-header">
            <img src="/static/images/default-header.png" />
          </mu-avatar>
          <div class="user-info">
            <div class="name">{{row.Fsinger_name}}</div>
            <div class="job">总经理</div>
          </div>
        </div>
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
  name: "selectUser",
  components: { AppBar, SearchBar, IndexsList },
  computed: {
    // 当前客户的id
    id() {
      return this.$route.params.id;
    },
    // 从那个入口进来的
    // customerDetailsShare => 从客户详情的分享
    // commonWatersClueFp => 从公海线索里面的分配进来的
    // commonWatersCustomer => 从公海客户里面的分配进来的
    type() {
      return this.$route.params.type;
    }
  },
  data() {
    return {
      userList: userList
    };
  },
  methods: {
    select(row) {
      let one = row;
      one.flag = !one.flag;
    },
    customFnc() {
      this.$confirm("当前客户是否分享给您选择的人?", "提示").then(
        ({ result, value }) => {
          if (result) {
            console.log("分享");
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.select-users {
  width: 100%;
  .content {
    height: 100%;
    padding-top: 100px;
    .index-users {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .select {
        width: 18px;
        height: 18px;
      }
      .user-header {
        margin-left: 15px;
      }
      .user-info {
        margin-left: 12px;
        .name {
          font-size: @primary-size;
          color: @primary-text;
          font-weight: @primary-weight;
        }
        .job {
          font-size: @regular-size;
          color: @regular-text;
          font-weight: @regular-weight;
        }
      }
    }
  }
}
</style>