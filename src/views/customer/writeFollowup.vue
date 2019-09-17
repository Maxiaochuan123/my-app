<!--
 * @Description: 客户写跟进
 * @Author: shenah
 -->
<template>
  <div class="write-followup">
    <AppBar
      :customFnc="customFnc"
      custom
      customTitle="保存"
      pageTitle="写跟进"
    ></AppBar>
    <div class="content">
      <mu-form
        :model="form"
        class="mu-demo-form"
        label-position="left"
        label-width="118"
        ref="form"
      >
        <mu-paper
          :z-depth="0"
          class="block"
        >
          <mu-form-item
            :rules="myRules.must('跟进类型','select')"
            label="跟进类型"
            prop="category"
          >
            <div
              @click="showPicker('跟进类型')"
              class="surround"
            >
              <mu-text-field
                disabled
                placeholder="请选择跟进类型"
                v-model="form.category"
              ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            :rules="myRules.must('下次跟进时间','select')"
            label="下次跟进时间"
            prop="nextTime"
          >
            <mu-date-input
              placeholder="请选择下次跟进时间"
              type="dateTime"
              v-model="form.nextTime"
            ></mu-date-input>
          </mu-form-item>
        </mu-paper>
        <mu-paper
          :z-depth="0"
          class="block"
        >
          <mu-form-item
            :rules="myRules.must('填写跟进记录')"
            class="flex-top"
            label="跟进内容"
            label-position="top"
            prop="content"
          >
            <mu-text-field
              :rows="3"
              :rows-max="6"
              multi-line
              placeholder="填写跟进记录"
              v-model="form.content"
            ></mu-text-field>
          </mu-form-item>
        </mu-paper>
        <!-- 差图片组件 -->
      </mu-form>
    </div>
    <!-- 弹出选择器 -->
    <Picker
      :anchor="[0]"
      :data="pickerList"
      :textTitle="pickerTitle"
      @confirm="handlePickerConfirm"
      name="name"
      picker-class="pickerClass"
      ref="picker"
    ></Picker>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import Picker from "dm-vue-picker-h5";
import { FOLLOW_UP_TYPE } from "@constants/dictionaries.js";
import Api from "@api";
export default {
  name: "writeFollowup",
  components: { AppBar, Picker },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      form: {
        content: "", // 跟进内容
        category: "", // 跟进类型
        nextTime: "", // 下次联系时间
        batchId: "" // 附件id
      },
      pickerList: [],
      pickerTitle: ""
    };
  },
  props: {},
  mounted() {},
  methods: {
    customFnc() {
      // 保存
      this.$refs.form.validate().then(result => {
        if (result) {
          Api.addCustomerFollowUpRecord({
            ...this.form,
            typesId: this.id
          }).then(res => {
            this.$toast.success({
              message: "新增成功",
              position: "top"
            });
            this.goBack();
          });
        }
      });
    },
    showPicker(pickerTitle) {
      this.pickerTitle = pickerTitle;
      switch (pickerTitle) {
        case "跟进类型":
          this.pickerList = FOLLOW_UP_TYPE;
          break;
      }
      this.$refs.picker.show();
    },
    handlePickerConfirm(value, column, text) {
      switch (this.pickerTitle) {
        case "跟进类型":
          this.form.category = this.pickerList[column].value;
          break;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.write-followup {
  .content {
    padding-top: 44px;
  }
}
</style>