<!--
 * @Description: 新增或者编辑拜访
 * @Author: shenah
 * @Date: 2019-10-17 16:54:08
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-21 13:31:47
 -->

<template>
  <div class="add-or-edit-visit">
    <AppBar
      :customFnc="save"
      :pageTitle="pageTitle"
      custom
      customTitle="保存"
    ></AppBar>
    <div class="content">
      
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
export default {
  name: "addOrEditVisit",
  components: { AppBar },
  data() {
    return {
      pageTitle: ""
    };
  },
  props: {},
  mounted() {
    this.judgeType();
  },
  methods: {
    judgeType() {
      if (this.id) {
        this.pageTitle = "编辑拜访";
      } else {
        this.pageTitle = "新增拜访";
      }
    },
    save() {}
  }
};
</script>
<style lang='less' scoped>
.add-or-edit-visit {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    padding-top: 40px;
    height: 100%;
    overflow: auto;
  }
}
</style>