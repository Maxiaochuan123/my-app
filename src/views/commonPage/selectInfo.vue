<!--
 * @Description: 选择公用信息(配合关联业务使用)
 * @Author: shenah
 * @Date: 2019-10-14 09:14:34
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-15 10:05:20
 -->

<template>
  <div class="select-info">
    <AppBar
      :isShowRightBtn="false"
      :pageTitle="`选择${info.name}`"
    ></AppBar>
    <SearchInputBar
      :placeholderText="`搜索${info.name}`"
      @searchInputBarChange="searchInputBarChange"
    ></SearchInputBar>
    <div class="content">
      <div class="content-users">
        <mu-load-more
          :loading="loading"
          @load="load"
          class="list-wrap"
        >
          <div
            :key="index"
            @click="select(item)"
            class="index-users"
            v-for="(item,index) in showList"
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
                <div class="name">{{item[info.showField]}}</div>
                <div class="job">{{item[info.showSubField]}}</div>
              </div>
            </div>
          </div>
        </mu-load-more>
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
      <div class="now-select-item">
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
import Api from "@api";
export default {
  name: "selectInfo",
  components: { AppBar, SearchInputBar },
  computed: {
    // 当前客户的id
    id() {
      return this.$route.params.id;
    },
    // 什么类型的选择
    // 线索clue,客户customer,联系人contacts
    type() {
      return this.$route.params.type;
    },
    // 哪个模块
    kind() {
      return this.$route.params.kind;
    }
  },
  data() {
    return {
      apiKind: {},
      details: {}, // 详情
      info: {
        name: "",
        idField: ""
      },
      requestParams: {}, // 请求参数
      submitDiffParams: {}, // 不同参数
      ApiMethod: "", // 查询的名字
      showList: [], // 显示的内容
      selectedList: [], // 已经选择
      loading: false
    };
  },
  mounted() {
    this.judge();
    this.judgeKindApi();
    this.queryDetails().then(() => {
      this.query();
    });
  },
  methods: {
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.query(true).then(() => {
        this.loading = false;
      });
    },
    // 判断模块的api
    judgeKindApi() {
      if (this.kind === "task") {
        this.apiKind = {
          details: "queryTaskDetailsById",
          sub: "updateTaskRelation"
        };
        this.submitDiffParams = {
          taskId: this.id
        };
      }
    },
    queryDetails() {
      // 查询详情
      return Api[this.apiKind.details]({
        taskId: this.id
      }).then(res => {
        const { listField } = this.info;
        this.details = res.data;
        this.selectedList = res.data[listField];
      });
    },
    judge() {
      if (this.type === "clue") {
        this.info = {
          name: "线索",
          idField: "leadsId",
          showField: "leadsName",
          showSubField: "createUserName",
          submitField: "clueIds",
          listField: "clueList"
        };
        this.ApiMethod = "queryClueList";
        this.requestParams = {
          search: "",
          type: 1,
          pageIndex: 1,
          pageSize: 15
        };
      } else if (this.type === "customer") {
        this.info = {
          name: "客户",
          idField: "customerId",
          showField: "customerName",
          showSubField: "createUserName",
          submitField: "customerIds",
          listField: "customerList"
        };
        this.ApiMethod = "queryCustomerListPC";
        this.requestParams = {
          search: "",
          type: 1,
          pageIndex: 1,
          pageSize: 15
        };
      } else if (this.type === "contacts") {
        this.name = "联系人";
        this.info = {
          name: "联系人",
          idField: "contactsId",
          showField: "name",
          showSubField: "post",
          submitField: "contactsIds",
          listField: "contactsList"
        };
        this.ApiMethod = "queryContactsPC";
        this.requestParams = {
          search: "",
          type: 1,
          pageIndex: 1,
          pageSize: 15
        };
      }
    },
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.pageIndex = 1;
      this.requestParams.search = value;
      this.query();
    },
    judgeIsSelect(list) {
      const { idField } = this.info;
      // 判断是否选择上
      for (let i = 0; i < this.selectedList.length; i++) {
        const one = this.selectedList[i];
        for (let j = 0; j < list.length; j++) {
          const two = list[j];
          if (one[idField] === two[idField]) {
            two.flag = true;
            break;
          }
        }
      }
    },
    // 查询
    query(flag) {
      return Api[this.ApiMethod](this.requestParams).then(res => {
        let list = [];
        list = res.data.list.map(item => ({
          ...item,
          flag: false
        }));
        if (list.length === 0) {
          this.requestParams.pageIndex -= 1;
        } else {
          this.judgeIsSelect(list);
          if (true) {
            this.showList.push(...list);
          } else {
            this.showList = list;
          }
        }
      });
    },
    select(row) {
      const { idField } = this.info;
      let one = row;
      one.flag = !one.flag;
      if (row.flag) {
        // 选择上了
        this.selectedList.push(row);
      } else {
        // 取消选择
        this.selectedList = this.selectedList.filter(
          item => item[idField] !== row[idField]
        );
      }
    },
    beforeSub() {
      const { idField, submitField } = this.info;
      let clueIds = this.details.clueList.map(item => item.leadsId).join(",");
      let customerIds = this.details.customerList
        .map(item => item.customerId)
        .join(",");
      let contactsIds = this.details.contactsList
        .map(item => item.contactsId)
        .join(",");
      const params = {
        ...this.submitDiffParams,
        clueIds,
        customerIds,
        contactsIds,
        [submitField]: this.selectedList.map(item => item[idField]).join(",")
      };
      return params;
    },
    submit() {
      const params = this.beforeSub();
      Api[this.apiKind.sub](params).then(res => {
        this.$toast.success("关联成功");
        this.goBack();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.img-wh {
  width: 18px;
  height: 18px;
}
.select-info {
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