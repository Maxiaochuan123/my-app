<!--
 * @Description: 任务详情
 * @Author: shenah
 * @Date: 2019-10-12 14:29:46
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-17 11:28:21
 -->
<template>
  <div class="task-details">
    <AppBar
      :menuList="menuList"
      :rightIcon="rightIcon"
      :rightLinkName="rightLinkName"
      :rightLinkParams="{id}"
      @menuChange="menuChange"
      isMenu
      pageTitle="任务详情"
    ></AppBar>
    <div class="content">
      <div class="header">
        <div class="header-wrap">
          <mu-avatar
            class="header-left"
            size="60"
          >
            <img :src="details.createUser && details.createUser.img" />
          </mu-avatar>
          <div class="header-right">
            <div class="title">
              <div>{{details.name}}</div>
              <div
                :class="changeClass(details.status,'status')"
              >{{details.status | codeInToName(TASK_STATUS)}}</div>
            </div>
            <div class="sub-title">
              <span>开始时间:</span>
              <span>{{details.startTime}}</span>
            </div>
            <div class="sub-title">
              <span>结束时间:</span>
              <span>{{details.stopTime}}</span>
            </div>
          </div>
        </div>
        <div class="header-info">
          <div class="header-info-item">
            <div class="header-info-item-left">创建人</div>
            <div
              class="header-info-item-right"
            >{{details.createUser && details.createUser.realname}}</div>
          </div>
          <div class="header-info-item">
            <div class="header-info-item-left">执行人</div>
            <div
              class="header-info-item-right"
            >{{details.ownerUserList && details.ownerUserList.map(item => item.realname).join(',')}}</div>
          </div>
          <div class="header-info-item">
            <div class="header-info-item-left">优先级</div>
            <div class="header-info-item-right">{{details.priority | codeInToName(PRIORITY)}}</div>
          </div>
        </div>
      </div>
      <mu-tabs
        :value="active"
        @change="tabChange"
        center
        class="tabs"
        color="primary"
        indicator-color="primary"
        inverse
      >
        <mu-tab
          replace
          to="taskRecord"
          value="record"
        >相关记录</mu-tab>
        <mu-tab
          replace
          to="taskBasic"
          value="basic"
        >基本信息</mu-tab>
      </mu-tabs>
      <div class="user-info">
        <router-view></router-view>
      </div>
    </div>
    <FootNav
      :list="bottomList"
      @footNavChange="footNavChange"
    ></FootNav>
  </div>
</template>

<script>
import { TASK_STATUS, PRIORITY } from "@constants/dictionaries";
import AppBar from "@components/AppBar.vue";
import FootNav from "@components/FootNav.vue";
import Api from "@api";
export default {
  name: "taskDetails",
  components: { AppBar, FootNav },
  computed: {
    // 当前任务的详情
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      TASK_STATUS,
      PRIORITY,
      details: {}, // 详情
      records: [], // 记录
      active: "basic", // 当前激活的(record=> 跟进记录,basic=> 基本信息)
      rightIcon: "icon-gengduo1",
      rightLinkName: "addOrEditCustomer",
      menuList: [],
      contactsList: [], // 联系人列表
      bottomList: [] // 底部的按钮
    };
  },
  props: {},
  mounted() {
    this.addBtnList();
    this.judgeActiveTab();
  },
  methods: {
    judgeActiveTab() {
      this.queryDetails();
      if (this.$route.path.indexOf("taskRecord") > -1) {
        this.active = "record";
      } else {
        this.active = "basic";
      }
    },
    tabChange(val) {
      this.active = val;
      this.queryDetails();
    },
    changeClass(row, type) {
      if (type === "status") {
        let status = row;
        // 判断状态
        if (status === 1) {
          return "task-status";
        } else if (status === 2) {
          return "task-status";
        } else {
          return "";
        }
      }
    },
    queryDetails() {
      // 查询详情
      Api.queryTaskDetailsById({
        taskId: this.id
      }).then(res => {
        this.details = res.data || {};
      });
    },
    addBtnList() {
      this.bottomList = [
        {
          img: this.loadingImg("selected.png"),
          label: "完成任务",
          linkName: "",
          isLink: false,
          type: "finish"
        }
      ];
      this.menuList = [
        {
          title: "关闭",
          isLink: false,
          type: "close"
        },
        {
          title: "编辑",
          linkName: "addOrEditTask",
          isLink: true,
          type: "edit",
          linkParams: { id: this.id }
        },
        {
          title: "删除",
          isLink: false,
          type: "del"
        }
      ];
    },
    menuChange(item) {
      let { type, linkName } = item;
      if (type === "close") {
        this.$confirm("是否关闭此任务?", "提示").then(({ result, value }) => {
          if (result) {
          }
        });
      } else if (type === "del") {
        this.$confirm("是否删除此任务?", "提示").then(({ result, value }) => {
          if (result) {
            Api.deleteTask({
              taskIds: this.id
            }).then(res => {
              this.$toast.success({
                message: "删除成功"
              });
              this.goBack();
            });
          }
        });
      }
    },
    footNavChange(item) {
      // todo
    }
  }
};
</script>
<style lang='less' scoped>
.task-details {
  width: 100%;
  height: 100%;
  .content {
    height: 100%;
    padding: 56px 0 120px 0;
    border: 1px solid transparent;
    overflow-y: auto;
    .header {
      width: 100%;
      background-color: #fff;
      padding: 0 0 0 15px;
      .header-wrap {
        display: flex;
        width: 100%;
        align-items: center;
        padding: 20px 15px 20px 0;
        border-bottom: 1px solid @primary-border;
        .header-left {
        }
        .header-right {
          flex: 1;
          margin-left: 12px;
          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: @primary-size;
            color: @primary-text;
            font-weight: @primary-weight;
            .task-status {
              color: @primary !important;
            }
          }
          .sub-title {
            margin-top: 4px;
            font-size: @regular-size;
            color: @regular-text;
            font-weight: @regular-weight;
          }
        }
      }
      .header-info {
        width: 100%;
        padding: 5px 15px 15px 0;
        .header-info-item {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          .header-info-item-left {
            font-size: @regular-size;
            color: @regular-text;
            font-weight: @regular-weight;
          }
          .header-info-item-right {
            font-size: @regular-size;
            color: @primary-text;
            font-weight: @primary-weight;
          }
        }
      }
    }
    .tabs {
      margin-top: 12px;
    }
    .user-info {
      margin-top: 12px;
    }
  }
}
</style>