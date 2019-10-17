<!--
 * @Description: 父任务与子任务公用模块
 * @Author: shenah
 * @Date: 2019-10-14 16:59:53
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-17 15:12:43
 -->

<template>
  <div class="father-or-sub-list">
    <div
      :key="index"
      @click="taskItemClick(item,index,type)"
      class="list-item"
      v-for="(item,index) in list"
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
        <div class="task-header-right">
          <div
            :class="{'task-warn':item.status === 2}"
            class="task-status"
          >{{item.status | codeInToName(TASK_STATUS)}}</div>
          <img
            :src="loadingImg('delete.png')"
            @click.stop="deleteTask(item,index)"
            class="close"
            v-if="type ==='subTask'"
          />
        </div>
      </div>
      <div
        class="creat-name regular-words"
        v-if="type !=='subTask'"
      >
        <span>创建人:</span>
        <span>{{item.createUser && item.createUser.realname}}</span>
      </div>
      <div class="time regular-words">{{item.stopTime | formatDate('date')}}截止</div>
    </div>
    <mu-divider
      class="xian"
      v-if="list.length>0"
    ></mu-divider>
  </div>
</template>

<script>
import { TASK_STATUS } from "@constants/dictionaries";
import dayjs from "dayjs";
import Api from "@api";
export default {
  name: "TaskItem",
  computed: {
    // 当前任务的id
    id() {
      return this.$route.params.id;
    }
  },
  components: {},
  data() {
    return { TASK_STATUS };
  },
  props: {
    type: {
      type: String,
      default: "task"
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  mounted() {},
  methods: {
    deleteTask(row, index) {
      // 删除任务
      this.$emit("taskItemChange", {
        operate: "del",
        row,
        index
      });
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
    taskItemClick(row, index, type) {
      if (type === "subTask") {
        // 当前是子任务
        this.$emit("taskItemChange", {
          row,
          index
        });
      } else {
        // 进入详情
        this.goPage("taskBasic", { id: row.taskId });
      }
    }
  }
};
</script>
<style lang='less' scoped>
.father-or-sub-list {
  .list-item {
    padding-top: 10px;
    padding-right: 15px;
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
      .task-header-right {
        display: flex;
        align-items: center;
        justify-content: center;
        .task-warn {
          color: @primary !important;
        }
        .task-status {
          text-align: right;
          font-size: @primary-size;
          font-weight: @primary-weight;
          color: @regular-text;
        }
        .close {
          width: 20px;
          height: 20px;
          margin-left: 6px;
        }
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
  .xian {
    margin-top: 12px;
  }
}
</style>