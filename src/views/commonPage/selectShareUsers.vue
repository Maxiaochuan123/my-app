<!--
 * @Description: 分享的公用页面
 * @Author: shenah
 * @Date: 2019-09-25 15:57:26
 * @LastEditors  : shenah
 * @LastEditTime : 2020-01-09 10:53:51
 -->
<template>
  <div class="select-share-users">
    <AppBar
      :isShowRightBtn="false"
      pageTitle="选择用户"
    ></AppBar>
    <SearchInputBar
      @searchInputBarChange="searchInputBarChange"
      placeholderText="搜索用户"
    ></SearchInputBar>
    <div class="content">
      <div
        class="content-users"
        v-if="userList.length"
      >
        <mu-load-more
          :loading="loading"
          @load="load"
          class="relate-business-list-wrap"
        >
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
              <!-- <mu-avatar
              class="user-header"
              size="40"
            >
              <img :src="item.img" />
              </mu-avatar>-->
              <div class="user-info">
                <div class="name">{{item.realname}}</div>
                <div class="job">{{item.post}}</div>
              </div>
            </div>
          </div>
        </mu-load-more>
      </div>
      <Nothing v-else></Nothing>
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
      <div class="now-select-item">
        <mu-radio
          class="read-write"
          label="只读"
          v-model="permission"
          value="0"
        ></mu-radio>
        <mu-radio
          class="read-write"
          label="读写"
          v-model="permission"
          value="1"
        ></mu-radio>
        <mu-button
          :disabled="selectedList.length === 0"
          @click="submit"
          class="sure"
          color="primary"
          small
        >确认</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import SearchInputBar from "@components/SearchInputBar.vue";
import Nothing from "@/components/Nothing";
import Api from "@api";
export default {
  name: "selectShareUsers",
  components: { AppBar, SearchInputBar, Nothing },
  computed: {
    // 当前客户的id
    id() {
      return this.$route.params.id;
    },
    // 从那个入口进来的
    // contactsDetailsShare => 从联系人详情的分享
    // customerDetailsShare => 从客户详情的分享
    // clue => 线索分享
    type() {
      return this.$route.params.type;
    }
  },
  data() {
    return {
      loading: false,
      requestParams: {
        deptId: "",
        search: "",
        needGroup: 0,
        pageIndex: 1,
        pageSize: 15
      },
      permission: "0", // 读写权限
      userList: [],
      selectedList: [] // 已经选择的人数
    };
  },
  mounted() {
    this.queryUser();
  },
  methods: {
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.queryUser(true).then(() => {
        this.loading = false;
      });
    },
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.pageIndex = 1;
      this.requestParams.search = value;
      this.queryUser();
    },
    queryUser(flag) {
      return Api.querySimpleUserByDepId(this.requestParams).then(res => {
        const list = res.data.list.map(item => ({
          ...item,
          flag: false
        }));
        for (let i = 0; i < this.selectedList.length; i++) {
          const one = this.selectedList[i];
          for (let j = 0; j < list.length; j++) {
            const two = list[j];
            if (one.userId === two.userId) {
              two.flag = true;
              break;
            }
          }
        }
        if (flag) {
          if (list.length === 0) {
            this.requestParams.pageIndex -= 1;
          } else {
            this.userList.push(...list);
          }
        } else {
          this.userList = list;
        }
      });
    },
    select(row) {
      let one = row;
      one.flag = !one.flag;
      if (row.flag) {
        // 选择上了
        this.selectedList.push(row);
      } else {
        // 取消选择
        this.selectedList = this.selectedList.filter(
          item => item.userId !== row.userId
        );
      }
    },
    beforeSubmit() {
      return {
        memberIds: this.selectedList.map(item => item.userId).join(","),
        ids: this.id,
        permission: this.permission
      };
    },
    submit() {
      let params = this.beforeSubmit();
      let shareApi;
      switch (this.type) {
        case "contactsDetailsShare":
          shareApi = this.api.contactsShare;
          break;
        case "customerDetailsShare":
          shareApi = Api.customerShareToUsers;
          break;
        case "clue":
          shareApi = this.api.clueShare;
          break;
      }
      shareApi(params).then(() => {
        this.$toast.success({
          message: "分享成功"
        });
        this.goBack();
      });
    }
  }
};
</script>
<style lang="less">
.read-write {
  .mu-radio-label {
    font-size: @primary-size;
    color: @primary-text;
  }
  .mu-radio-icon {
    width: 18px !important;
    height: 18px !important;
  }
  .mu-radio-svg-icon {
    width: 18px !important;
    height: 18px !important;
  }
}
</style>
<style lang="less" scoped>
.img-wh {
  width: 18px;
  height: 18px;
}
.select-share-users {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    height: 100%;
    padding-top: 100px;
    padding-bottom: 80px;
    overflow: hidden;
    .content-users {
      width: 100%;
      height: 100%;
      overflow: auto;
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
    .now-select-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .read-write {
      margin-right: 16px;
    }
    .sure {
      font-size: 14px;
      width: 58px;
      height: 28px;
      border-radius: 6px;
      min-width: 0;
    }
  }
}
</style>