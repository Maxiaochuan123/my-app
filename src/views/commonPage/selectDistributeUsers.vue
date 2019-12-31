<!--
 * @Description: 公海分配页面
 * @Author: shenah
 * @Date: 2019-09-25 15:57:26
 * @LastEditors  : shenah
 * @LastEditTime : 2019-12-19 17:42:08
 -->
<template>
  <div class="select-distribute-users">
    <AppBar
      :customFnc="submit"
      :isShowRightBtn="false"
      custom
      customTitle="确定"
      pageTitle="选择用户"
    ></AppBar>
    <SearchInputBar
      @searchInputBarChange="searchInputBarChange"
      placeholderText="搜索用户"
    ></SearchInputBar>
    <div class="content">
      <div class="content-users">
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
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import SearchInputBar from "@components/SearchInputBar.vue";
import Api from "@api";
export default {
  name: "selectDistributeUsers",
  components: { AppBar, SearchInputBar },
  computed: {
    // 当前的id
    id() {
      return this.$route.params.id;
    },
    // commonWatersCustomer公海客户来的
    // commonWatersClue 公海线索来的
    type() {
      return this.$route.params.type;
    }
  },
  data() {
    return {
      loading: false,
      requestParams: {
        name: "",
        pageIndex: 1,
        pageSize: 15
      },
      userList: [],
      active: "" // 当前选择的人
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
      this.requestParams.name = value;
      this.queryUser();
    },
    initData(list) {
      list.forEach(item => {
        item.flag = false;
      });
    },
    queryUser(flag) {
      return Api.querySubUserByName(this.requestParams).then(res => {
        let list = res.data.list;
        this.initData(list);
        for (let i = 0; i < list.length; i += 1) {
          if (list[i].id === this.active * 1) {
            list[i].flag = true;
            break;
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
      this.initData(this.userList);
      row.flag = !row.flag;
      if (row.flag) {
        // 选择上了
        this.active = row.id;
      } else {
        // 取消选择
        this.active = "";
      }
    },
    submit() {
      if (this.active === "") {
        this.goBack();
        return;
      }
      Api.distributePublicPoolById({
        ids: this.id,
        userId: this.active,
        labelType: this.type === "commonWatersCustomer" ? "2" : "1"
      }).then(() => {
        this.$toast.success({
          message: "分配成功"
        });
        if (this.type === "commonWatersCustomer") {
          this.goReplacePage("commonWatersPeople");
        } else {
          this.goReplacePage("commonWatersClue");
        }
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
.select-distribute-users {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    height: 100%;
    overflow: hidden;
    padding-top: 100px;
    padding-bottom: 80px;
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
}
</style>