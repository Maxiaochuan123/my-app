<!--
 * @Description: 客户写跟进
 * @Author: shenah
 -->
<template>
  <div class="write-followup">
    <AppBar pageTitle="写跟进" custom :customFnc="openDialog" customTitle="保存"></AppBar>
    <div class="content">
      <mu-form
        ref="form"
        :model="form"
        class="mu-demo-form"
        label-position="left"
        label-width="118"
      >
        <mu-paper :z-depth="0" class="block">
          <mu-form-item prop="type" label="跟进类型" :rules="myRules.must('跟进类型','select')">
            <div class="surround" @click="showPicker('跟进类型')">
              <mu-text-field v-model="form.type" placeholder="请选择跟进类型" disabled prop="type"></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="time" label="下次跟进时间" :rules="myRules.must('下次跟进时间','select')">
            <div class="surround" @click="showPicker('下次跟进时间')">
              <mu-text-field v-model="form.time" placeholder="请选择" disabled prop="time"></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
        </mu-paper>
        <mu-paper :z-depth="0" class="block">
          <mu-form-item prop="remark" label="跟进内容" label-position="top" class="flex-top">
            <mu-text-field
              v-model="form.remark"
              placeholder="填写跟进记录"
              :rows="3"
              multi-line
              :rows-max="6"
            ></mu-text-field>
          </mu-form-item>
        </mu-paper>
        <!-- 差图片组件 -->
      </mu-form>
    </div>
    <!-- 弹出选择器 -->
    <Picker
      ref="picker"
      :textTitle="pickerTitle"
      :data="pickerList"
      name="name"
      picker-class="pickerClass"
      :anchor="[0]"
      @confirm="handlePickerConfirm"
    ></Picker>
    <!-- dialog对话框 -->
    <mu-dialog
      title="写跟进"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="dialogState"
    >
      确认信息无误, 点击确定按钮增加跟进
      <mu-button slot="actions" flat @click="closeDialog">取消</mu-button>
      <mu-button
        slot="actions"
        flat
        color="primary"
        v-loading="btnLoading"
        data-mu-loading-size="24"
        @click="submitDialog"
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
          this.
          break;
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