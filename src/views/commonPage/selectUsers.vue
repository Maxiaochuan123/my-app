
<!--
 * @Description: 选择用户共用页面
 * @Author: shenah
 -->
<template>
  <div class="select-users">
    <AppBar
      :customFnc="customFnc"
      custom
      customTitle="确定"
      pageTitle="选择用户"
    ></AppBar>
    <SearchBar
      :list="userList"
      placeholderText="搜索客户"
    ></SearchBar>
    <div class="content">
      <IndexsList
        :list="userList"
        :listSpacing="0"
        :tagTop="242"
        :tagTopoffsetTop="250"
      >
        <div
          @click="select(row)"
          class="index-users"
          slot="row"
          slot-scope="{row}"
        >
          <div class="index-users-wrap">
            <img
              class="select"
              src="/static/images/selected.png"
              v-show="row.flag"
            />
            <img
              class="select"
              src="/static/images/no-selected.png"
              v-show="!row.flag"
            />
            <mu-avatar
              class="user-header"
              size="40"
            >
              <img src="/static/images/default-header.png" />
            </mu-avatar>
            <div class="user-info">
              <div class="name">{{row.Fsinger_name}}</div>
              <div class="job">总经理</div>
            </div>
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
    // commonWatersClue => 从公海线索里面点进来
    // commonWatersCustomer => 从公海客户里面点进来
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
      padding: 0 20px;
      .index-users-wrap {
        list-style-type: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: @regular-text;
        height: 66px;
        border-bottom: 1px solid @primary-border; 
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
}
</style>