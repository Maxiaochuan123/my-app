
<!--
 * @Description: 选择用户共用页面
 * @Author: shenah
 -->
<template>
  <div class="select-users">
    <AppBar
      :isShowRightBtn="false"
      pageTitle="选择用户"
    ></AppBar>
    <SearchBar
      :list="[]"
      placeholderText="搜索客户"
    ></SearchBar>
    <div class="content">
      <div class="content-users">
        <div
          :key="index"
          @click="select(item)"
          class="index-users"
          v-for="(item,index) in userList"
        >
          <div class="index-users-left">
            <img
              :src="loadingImg('selected.png')"
              class="select"
              v-show="item.flag"
            />
            <img
              :src="loadingImg('no-selected.png')"
              class="select"
              v-show="!item.flag"
            />
          </div>
          <div class="index-users-right">
            <mu-avatar
              class="user-header"
              size="40"
            >
              <img :src="item.img" />
            </mu-avatar>
            <div class="user-info">
              <div class="name">{{item.realname}}</div>
              <div class="job">{{item.post}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 已经选择 -->
    <div class="now-select">
      <div class="selected">
        <img
          :src="loadingImg('selected.png')"
          height="18"
          width="18"
        />
        <div class="selected-text">
          <span class="one">已经选择:</span>
          <span>{{selectedList.length}}</span>
        </div>
      </div>
      <mu-button
        @click="submit"
        class="sure"
        small
      >确认</mu-button>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import SearchBar from "@components/SearchBar.vue";
import IndexsList from "@components/IndexsList.vue";
import Api from "@api";
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
      userList: [],
      selectedList: [] // 已经选择的人数
    };
  },
  mounted() {
    this.queryUser();
  },
  methods: {
    queryUser() {
      Api.querySysUserList().then(res => {
        this.userList = res.data.list.map(item => ({
          ...item,
          flag: false
        }));
      });
    },
    select(row) {
      let one = row;
      one.flag = !one.flag;
    },
    submit() {
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
    padding-bottom: 80px;
    .content-users {
      width: 100%;
      height: 100%;
      background-color: #fff;
      margin-top: 20px;
      .index-users {
        display: flex;
        padding: 0 0 0 15px;
        align-items: center;
        .index-users-left {
          .select {
            width: 18px;
            height: 18px;
          }
        }
        .index-users-right {
          flex: 1;
          margin-left: 15px;
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid @primary-border;
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
  .now-select {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .selected {
      display: flex;
      align-items: center;
      .selected-text {
        font-size: @primary-size;
        color: @primary-text;
        margin-left: 10px;
        .one {
          margin-right: 4px;
        }
      }
    }
    .sure {
      font-size: 14px;
      width: 58px;
      height: 28px;
      color: #fff;
      background-color: @primary;
      border-radius: 6px;
      min-width: 0;
    }
  }
}
</style>