<!--
 * @Description: 任务详情基本信息
 * @Author: shenah
 * @Date: 2019-10-12 15:40:23
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-15 15:37:12
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
      :relateData="relateData"
      :relateMenu="relateMenu"
      @relateBusinessChange="relateBusinessChange"
      ref="relateBusiness"
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
      <TaskItem
        :list="$parent.details.childTask"
        type="subTask"
      ></TaskItem>
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
import RelateBusiness from "@/components/RelateBusiness/RelateBusiness.vue";
import TaskItem from "./components/TaskItem.vue";
import { RELATION_BUSINESS } from "@constants/menuInfo.js";
import Api from "@api";
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
    return {
      relateMenu: {
        // 菜单的相应配置
        clues: { ...RELATION_BUSINESS.clues },
        customers: { ...RELATION_BUSINESS.customers },
        contacts: { ...RELATION_BUSINESS.contacts }
      },
      relateData: {} // 关联业务
    };
  },
  props: {},
  watch: {
    "$parent.details"(val) {
      this.relateData = {
        clues: val.clueList,
        customers: val.customerList,
        contacts: val.contactsList
      };
    }
  },
  mounted() {},
  methods: {
    handleSubTask() {
      this.goPage("addOrEditSubTask", { id: this.id });
    },
    getImgSuccessList(res) {
      // 处理上传
    },
    // 业务关联组件的处理
    relateBusinessChange({ nowConfig, commonParam, operate }) {
      const param = {
        taskId: this.id,
        ...commonParam
      };
      Api.updateTaskRelation(param).then(res => {
        this.$toast.success("成功");
        this.goReplacePage("taskBasic");
        if (this.operate === "updateRelate") {
          this.$refs.relateBusiness.$refs.selectInfo.openFullscreen = false;
        }
      });
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