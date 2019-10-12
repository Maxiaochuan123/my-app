<!--
 * @Description: 任务详情基本信息
 * @Author: shenah
 * @Date: 2019-10-12 15:40:23
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-12 17:19:39
 -->
<template>
  <div class="task-basic">
    <div class="basic-details-item">
      <div class="basic-details-item-left">
        <div class="title">任务详情</div>
        <div class="sub-title">{{$parent.details.description}}</div>
      </div>
    </div>
    <RelateBusiness></RelateBusiness>
    <div class="basic-details-item">
      <div class="basic-details-item-left">
        <div class="sub-title">子任务</div>
      </div>
      <div class="basic-details-item-right">
        <mu-icon
          color="primary"
          size="24"
          value=":iconfont icon-zirenwu"
        ></mu-icon>
      </div>
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
export default {
  name: "customerBasic",
  computed: {
    // 当前任务的id
    id() {
      return this.$route.params.id;
    }
  },
  components: { UploadList, RelateBusiness },
  data() {
    return {};
  },
  props: {},
  mounted() {},
  methods: {
    relate() {
      // 关联任务
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
}
.task-relate-business {
  .header {
    display: flex;
    align-items: center;
    padding: 15px;
    .business-title {
      display: flex;
      justify-content: center;
      flex: 1;
    }
    .close {
      font-size: @primary-size;
      color: @regular-text;
      font-weight: @primary-weight;
      text-align: right;
    }
  }
}
</style>