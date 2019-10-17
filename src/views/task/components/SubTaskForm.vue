<!--
 * @Description: 子任务相关的组件
 * @Author: shenah
 * @Date: 2019-10-15 16:09:08
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-17 15:16:40
 -->

<template>
  <div class="subtask-form">
    <div
      :class="{'no-border-bottom':childTask.length > 0}"
      class="basic-details-item"
    >
      <div class="basic-details-item-left">
        <div class="sub-title">子任务</div>
      </div>
      <div class="basic-details-item-right">
        <mu-icon
          @click="handleSubTask"
          color="primary"
          size="24"
          value=":iconfont icon-zirenwu"
        ></mu-icon>
      </div>
    </div>
    <!-- 子任务列表 -->
    <div class="sub-task-list">
      <TaskItem
        :list="childTask"
        @taskItemChange="taskItemChange"
        type="subTask"
      ></TaskItem>
    </div>
    <AddOrEditSubTaskPop
      :row="row"
      @addOrEditSubTaskPopChange="addOrEditSubTaskPopChange"
      ref="addOrEditSubTaskPop"
      v-bind="$attrs"
    ></AddOrEditSubTaskPop>
  </div>
</template>

<script>
import AddOrEditSubTaskPop from "./AddOrEditSubTaskPop.vue";
import TaskItem from "./TaskItem.vue";
import Api from "@api";
export default {
  name: "SubTaskForm",
  components: { TaskItem, AddOrEditSubTaskPop },
  data() {
    return {
      childTask: [], // 子任务列表
      row: {}, // 当前点击的子任务
      index: 0 // 当前点击的子任务的数组
    };
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    list(val) {
      this.childTask = val;
    }
  },
  mounted() {},
  methods: {
    addOrEditSubTaskPopChange({ operate, row }) {
      if (operate === "close") {
        // 关闭窗口
        this.row = {};
      } else if (operate === "taskAddSub") {
        // 当在新建或者编辑任务里面的新建或者编辑子任务
        this.childTask.push(row);
      } else if (operate === "taskEditSub") {
        let list = [...this.childTask];
        list[this.index] = row;
        this.childTask = list;
      }
    },
    handleSubTask() {
      this.row = {};
      this.$refs.addOrEditSubTaskPop.openFullscreen = true;
    },
    taskItemChange({ operate, row, index }) {
      if (operate === "del") {
        this.$confirm("是否删除当前任务?", "提示").then(({ result, value }) => {
          if (result) {
            if (row.taskId) {
              Api.deleteTask({
                taskIds: row.taskId
              }).then(res => {
                this.$toast.success("删除当前子任务成功");
                this.$attrs.updateDetails();
              });
            } else {
              this.childTask.splice(index, 1);
            }
          }
        });
      } else {
        this.row = row;
        this.index = index;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.subtask-form {
  width: 100%;
}
</style>