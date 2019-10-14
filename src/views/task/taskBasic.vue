<!--
 * @Description: 任务详情基本信息
 * @Author: shenah
 * @Date: 2019-10-12 15:40:23
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-14 19:33:16
 -->
<template>
  <div class="task-basic">
    <div class="basic-details-item">
      <div class="basic-details-item-left">
        <div class="title">任务详情</div>
        <div class="sub-title">{{$parent.details.description}}</div>
      </div>
    </div>
    <RelateBusiness
      :clueList="$parent.details.clueList"
      :contactsList="$parent.details.contactsList"
      :customerList="$parent.details.customerList"
    ></RelateBusiness>
    <div
      :class="{'no-border-bottom':$parent.details.childTask && $parent.details.childTask.length > 0}"
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
      <TaskItem :list="$parent.details.childTask" type="subTask"></TaskItem>
    </div>
    <div class="upload-wrap no-border-bottom">
      <UploadList
        @getImgSuccessList="getImgSuccessList"
        class="upload-file"
      ></UploadList>
    </div>
  </div>
</template>

<script>
import UploadList from "@components/upLoad/uploadList.vue";
import RelateBusiness from "./components/RelateBusiness.vue";
import TaskItem from "./components/TaskItem.vue";
export default {
  name: "customerBasic",
  computed: {
    // 当前任务的id
    id() {
      return this.$route.params.id;
    }
  },
  components: { UploadList, RelateBusiness, TaskItem },
  data() {
    return {};
  },
  props: {},
  mounted() {},

  methods: {
    handleSubTask() {
      this.goPage("addOrEditSubTask", { id: this.id });
    },
    getImgSuccessList(res) {
      // 处理上传
    }
  }
};
</script>
<style lang='less' scoped>
.task-basic {
  width: 100%;
  margin-top: 12px;
  background-color: #fff;
  padding: 0 0 0 15px;
  .upload-wrap {
    padding: 12px 0 12px 0;
  }
  .sub-task-list {
  }
}
</style>