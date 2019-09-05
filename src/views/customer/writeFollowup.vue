<!--
 * @Description: 客户写跟进
 * @Author: shenah
 -->
<template>
  <div class="write-followup">
    <AppBar leftLinkName pageTitle="写跟进" custom :customFnc="openDialog" customTitle="保存"></AppBar>
    <div class="content">
      <mu-form
        ref="form"
        :model="form"
        class="mu-demo-form"
        label-position="left"
        label-width="118"
      >
        <mu-paper :z-depth="0" class="block">
          <mu-form-item prop="input" label="跟进类型">
            <div class="surround" @click="showPicker('性别')">
              <mu-text-field v-model="form.type" placeholder="请选择跟进类型" disabled></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
        </mu-paper>
      </mu-form>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
export default {
  name: "writeFollowup",
  components: { AppBar },
  data() {
    return {
      form: {
        type: ""
      }
    };
  },
  props: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.write-followup {
  .content {
    padding-top: 44px;
  }
}
</style>