<!--
 * @Description: 客户写跟进
 * @Author: shenah
 -->
<template>
  <div class="write-followup">
    <AppBar
      :customFnc="openDialog"
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
            prop="type"
          >
            <div
              @click="showPicker('跟进类型')"
              class="surround"
            >
              <mu-text-field
                disabled
                placeholder="请选择跟进类型"
                prop="type"
                v-model="form.type"
              ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            label="下次跟进时间"
            prop="date"
          >
            <mu-date-input
              placeholder="请选择下次跟进时间"
              type="dateTime"
              v-model="form.time"
            ></mu-date-input>
          </mu-form-item>
        </mu-paper>
        <mu-paper
          :z-depth="0"
          class="block"
        >
          <mu-form-item
            class="flex-top"
            label="跟进内容"
            label-position="top"
            prop="remark"
          >
            <mu-text-field
              :rows="3"
              :rows-max="6"
              multi-line
              placeholder="填写跟进记录"
              v-model="form.remark"
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
    <!-- dialog对话框 -->
    <mu-dialog
      :esc-press-close="false"
      :open.sync="dialogState"
      :overlay-close="false"
      max-width="80%"
      title="写跟进"
      width="600"
    >
      确认信息无误, 点击确定按钮增加跟进
      <mu-button
        @click="closeDialog"
        flat
        slot="actions"
      >取消</mu-button>
      <mu-button
        @click="submitDialog"
        color="primary"
        data-mu-loading-size="24"
        flat
        slot="actions"
        v-loading="btnLoading"
      >确定</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import Picker from "dm-vue-picker-h5";
export default {
  name: "writeFollowup",
  components: { AppBar, Picker },
  data() {
    return {
      form: {
        type: "",
        time: "",
        remark: ""
      },
      pickerList: [
        {
          text: "张三",
          value: 1
        },
        {
          text: "李四",
          value: 2
        },
        {
          text: "王五",
          value: 3
        },
        {
          text: "赵六",
          value: 4
        }
      ],
      pickerTitle: ""
    };
  },
  props: {},
  mounted() {},
  methods: {
    submitDialog() {
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
      });
      // this.apiMethod.getCreditReporting(this);
    },
    showPicker(pickerTitle) {
      this.pickerTitle = pickerTitle;
      switch (pickerTitle) {
        case "跟进类型":
          this.pickerList = this.pickerList;
          this.break;
      }
      this.$refs.picker.show();
    },
    handlePickerConfirm(value, column, text) {
      // console.log(value)//选中的条目的value
      // console.log(column)//选中的列的索引
      // console.log(text)//选中的条目的text
      switch (this.pickerTitle) {
        case "跟进类型":
          this.form.type = this.pickerList[column].text;
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