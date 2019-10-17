<!--
 * @Description: 任务详情基本信息
 * @Author: shenah
 * @Date: 2019-10-12 15:40:23
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-16 15:19:44
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
    <SubTaskForm
      :list="childTask"
      :updateDetails="$parent.queryDetails"
    ></SubTaskForm>
    <div class="upload-wrap no-border-bottom">
      <UploadList
        :batchId="$parent.details.batchId"
        :isEdit="false"
        :customImgList="customImgList"
        :customEnclosureList="customEnclosureList"
        @changecustomImgList="changecustomImgList"
        @changecustomEnclosureList="changecustomEnclosureList"
        @getEnclosureSuccessList="getEnclosureSuccessList"
        @getImgSuccessList="getImgSuccessList"
        class="upload-file"
      ></UploadList>
    </div>
  </div>
</template>

<script>
import UploadList from "@components/upLoad/uploadList.vue";
import RelateBusiness from "@/components/RelateBusiness/RelateBusiness.vue";
import SubTaskForm from "./components/SubTaskForm.vue";
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
  components: { UploadList, RelateBusiness, SubTaskForm },
  data() {
    return {
      relateMenu: {
        // 菜单的相应配置
        clues: RELATION_BUSINESS.clues,
        customers: RELATION_BUSINESS.customers,
        contacts: RELATION_BUSINESS.contacts
      },
      relateData: {}, // 关联业务
      childTask: [], // 子任务列表

      customImgList:[{src: "http://192.168.0.92:6080/20191016/11113.jpg",fileId: 528, progress:{progressState:1}}],
      customEnclosureList:[{src: "http://192.168.0.92:6080/20191017/11111.jpg", name:'CRM系统接口_1015.pdf', fileId: 580, progress:{progressState:1}}]
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
      this.childTask = val.childTask;
    }
  },
  mounted() {},
  methods: {
    handleSubTask() {
      this.goPage("addOrEditSubTask", { id: this.id });
    },
    getImgSuccessList(res) {
      // 图片上传的处理
      console.log("img", res);
    },
    getEnclosureSuccessList(res) {
      // 处理文件
      console.log("file", res);
    },
    changecustomImgList(data){
      this.customImgList = data;
    },
    changecustomEnclosureList(data){
      console.log(data)
      this.customEnclosureList = data;
    },
    // 业务关联组件的处理
    relateBusinessChange({ nowConfig, commonParam, operate }) {
      const param = {
        taskId: this.id,
        ...commonParam
      };
      Api.updateTaskRelation(param).then(res => {
        this.$toast.success("成功");
        this.$parent.queryDetails();
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