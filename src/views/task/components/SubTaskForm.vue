<!--
 * @Description: 子任务相关的组件
 * @Author: shenah
 * @Date: 2019-10-15 16:09:08
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-15 17:18:40
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
      ref="addOrEditSubTaskPop"
    ></AddOrEditSubTaskPop>
  </div>
</template>

<script>
import AddOrEditSubTaskPop from "./AddOrEditSubTaskPop.vue";
import TaskItem from "./TaskItem.vue";
export default {
  name: "SubTaskForm",
  components: { TaskItem, AddOrEditSubTaskPop },
  data() {
    return {
      childTask: [], // 子任务列表
      row: {} // 当前点击的子任务
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
    handleSubTask() {
      this.$refs.addOrEditSubTaskPop.openFullscreen = true;
    },
    taskItemChange({ row }) {
      this.row = row;
    }
  }
};
</script>
<style lang='less' scoped>
.subtask-form {
  width: 100%;
}
</style>