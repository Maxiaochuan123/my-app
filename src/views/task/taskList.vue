<!--
 * @Description: 任务列表
 * @Author: shenah
 * @Date: 2019-10-12 09:30:38
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-17 15:31:02
 -->

<template>
  <div class="task-list">
    <AppBar
      drawerIcon="icon-guolv"
      isDrawer
      pageTitle="任务"
      rightIcon="icon-tianjia"
      rightLinkName="addOrEditTask"
    >
      <!-- 抽屉 -->
      <Screen
        :drawerList="drawerList"
        @getApiParams="getApiParams"
        slot="drawerContent"
      ></Screen>
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
        @load="load"
        class="list-wrap"
      >
        <TaskItem
          :list="listObj.list"
          type="task"
        ></TaskItem>
      </mu-load-more>
    </div>
  </div>
</template>

<script>
import ArrSingleOrMultiple from "@components/ArrSingleOrMultiple.vue";
import { TASK_STATUS } from "@constants/dictionaries";
import AppBar from "@components/AppBar.vue";
import TaskItem from "./components/TaskItem.vue";
import Screen from "@components/Screen.vue";
import Api from "@api";
import dayjs from "dayjs";
export default {
  name: "taskList",
  components: { AppBar, TaskItem, ArrSingleOrMultiple, Screen },
  data() {
    return {
      Api,
      TASK_STATUS,
      active: 0,
      listObj: {}, // 列表对象
      requestParams: {
        type: 0, // 任务类型 0 全部 ,1 我发出的 ,2 我收到的 ,3 下属的任务
        search: "", // 任务名称
        status: "", // 任务状态
        createTime: "", // 开始时间
        stopTime: "", // 结束时间
        date: "", // 截止日期
        pageIndex: 1, // 页码数量
        pageSize: 15 // 1页显示的个数
      },
      drawerList: {},
      loading: false
    };
  },
  props: {},
  mounted() {
    this.initScreenList();
    this.queryTasks();
  },
  methods: {
    initScreenList() {
      this.drawerList = {
        search: {
          fileTitle: "搜索",
          type: "input",
          placeholder: "搜索任务名称",
          val: ""
        },
        createTime: {
          fileTitle: "创建时间",
          type: "date",
          placeholder: "请选择创建时间",
          val: ""
        },
        stopTime: {
          fileTitle: "结束时间",
          type: "date",
          placeholder: "结束时间",
          val: ""
        },
        status: {
          defaultValue: [],
          fileTitle: "任务状态",
          mode: "single",
          valueField: "value",
          labelField: "text",
          list: this.TASK_STATUS
        }
      };
      // Api.querySimpleUserByDepId({
      //   needGroup: 0
      // }).then(res => {

      // });
    },
    getApiParams(requestParams) {
      this.requestParams = {
        ...this.requestParams,
        ...requestParams
      };
      this.queryTasks();
    },
    queryTasks(flag) {
      // 查询任务
      return Api.queryTaskList(this.requestParams).then(res => {
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
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.queryTasks(true).then(() => {
        this.loading = false;
      });
    }
  }
};
</script>
<style lang='less' scoped>
.task-list {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .tabs {
    position: fixed;
    top: 44px;
  }
  .content {
    padding-top: 104px;
    height: 100%;
    overflow: auto;
    .list-wrap {
      width: 100%;
      background-color: #fff;
      padding: 0 15px;
    }
  }
}
</style>