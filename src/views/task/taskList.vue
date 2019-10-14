<!--
 * @Description: 任务列表
 * @Author: shenah
 * @Date: 2019-10-12 09:30:38
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-12 17:39:26
 -->

<template>
  <div class="task-list">
    <AppBar
      drawerIcon="icon-guolv"
      isDrawer
      pageTitle="任务"
      rightIcon="icon-tianjia"
    >
      <!-- 抽屉 -->
      <div slot="drawerContent">
        <mu-button color="primary">theme_one</mu-button>
      </div>
    </AppBar>
    <mu-tabs
      :value="active"
      @change="tabChange"
      center
      class="tabs"
      color="primary"
      indicator-color="primary"
      inverse
    >
      <mu-tab :value="0">全部任务</mu-tab>
      <mu-tab :value="2">我收到的</mu-tab>
      <mu-tab :value="1">我发出的</mu-tab>
    </mu-tabs>
    <div class="content">
      <mu-load-more
        :loading="loading"
        :refreshing="refreshing"
        @load="load"
        @refresh="refresh"
        class="list-wrap"
      >
        <div
          :key="index"
          @click="toDetails(item)"
          class="list-item"
          v-for="(item,index) in listObj.list"
        >
          <div class="task-header">
            <img
              :src="loadingImg('selected.png')"
              @click.stop="select(item)"
              class="select"
              v-if="item.status === 5"
            />
            <img
              :src="loadingImg('no-selected-color.png')"
              @click.stop="select(item)"
              class="select"
              v-else
            />
            <span class="task-header-title primary-words">{{item.name}}</span>
            <div
              :class="{'task-warn':item.status === 2}"
              class="task-status"
            >{{item.status | codeInToName(TASK_STATUS)}}</div>
          </div>
          <div class="creat-name regular-words">
            <span>创建人:</span>
            <span>{{item.createUser && item.createUser.realname}}</span>
          </div>
          <div class="time regular-words">{{item.stopTime | formatDate('date')}}截止</div>
        </div>
      </mu-load-more>
    </div>
  </div>
</template>

<script>
import { TASK_STATUS } from "@constants/dictionaries";
import AppBar from "@components/AppBar.vue";
import Api from "@api";
import dayjs from "dayjs";
export default {
  name: "taskList",
  components: { AppBar },
  data() {
    return {
      TASK_STATUS,
      active: 0,
      listObj: {}, // 列表对象
      requestParams: {
        type: 0, // 任务类型 0 全部 ,1 我发出的 ,2 我收到的 ,3 下属的任务
        search: "", // 任务名称
        status: "", // 任务状态
        date: "", // 截止日期
        pageIndex: 1, // 页码数量
        pageSize: 15 // 1页显示的个数
      },
      refreshing: false,
      loading: false
    };
  },
  props: {},
  mounted() {
    this.queryTasks();
  },
  methods: {
    queryTasks() {
      // 查询任务
      Api.queryTaskList(this.requestParams).then(res => {
        this.listObj = res.data;
      });
    },
    tabChange(val) {
      this.active = val;
      this.requestParams.type = val;
      this.queryTasks();
    },
    select(row) {
      let { status: code, taskId, stopTime } = row;
      let status = 5;
      let isFinished = true;
      if (code === 5) {
        let stop = dayjs(stopTime).valueOf();
        let now = new Date().getTime();
        isFinished = false;
        if (now < stop) {
          status = 1;
        } else {
          status = 2;
        }
      }
      let title = status === 5 ? "是否已完成此任务" : "是否取消此任务的完成";
      this.$confirm(title, "提示").then(res => {
        if (res.result) {
          Api.addOrEditTask({
            taskId,
            status
          }).then(res => {
            row.status = status;
          });
        }
      });
    },
    toDetails(row) {
      // 进入详情
      this.goPage("taskBasic", { id: row.taskId });
    },
    refresh() {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.num = 10;
      }, 2000);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
      }, 2000);
    }
  }
};
</script>
<style lang='less' scoped>
.task-list {
  width: 100%;
  height: 100%;
  .tabs {
    position: fixed;
    top: 44px;
  }
  .content {
    height: 100%;
    padding-top: 104px;
    .list-wrap {
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding: 0 15px;
      overflow: visible;
      .list-item {
        padding: 18px 0;
        border-bottom: 1px solid @primary-border;
        .task-header {
          display: flex;
          align-items: center;
          .select {
            width: 18px;
            height: 18px;
          }
          .task-header-title {
            flex: 1;
            margin: 0 10px 0 6px;
          }
          .task-status {
            text-align: right;
            font-size: @primary-size;
            font-weight: @primary-weight;
            color: @regular-text;
          }
          .task-warn {
            color: @primary;
          }
        }
        .creat-name {
          margin-top: 4px;
          padding-left: 24px;
        }
        .time {
          margin-top: 4px;
          padding-left: 24px;
        }
      }
    }
  }
}
</style>