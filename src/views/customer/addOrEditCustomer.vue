<!--
 * @Description: 新建或者编辑客户
 * @Author: your name
 -->
<template>
  <div class="addOrEditCustomer">
    <AppBar :pageTitle="id?'编辑客户':'新增客户'" custom :customFnc="openDialog" customTitle="保存"></AppBar>
    <div class="content">
      <mu-form
        ref="form"
        :model="form"
        class="mu-demo-form"
        label-position="left"
        label-width="118"
      >
        <mu-paper :z-depth="0" class="block">
          <mu-form-item prop="value1" label="客户名称" :rules="myRules.userName">
            <mu-text-field v-model="form.value1" placeholder="请输入客户名称(必填)"></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="input" label="客户行业">
            <div class="surround" @click="showPicker('客户行业')">
              <mu-text-field v-model="form.value2.text" placeholder="客户行业" disabled></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="value3" label="客户类型" :rules="myRules.phone">
            <div class="surround" @click="showPicker('客户类型')">
              <mu-text-field v-model="form.value3.text" placeholder="客户类型" disabled></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="input" label="客户级别">
            <div class="surround" @click="showPicker('客户级别')">
              <mu-text-field v-model="form.value3.text" placeholder="客户级别" disabled></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="input" label="客户来源">
            <div class="surround" @click="showPicker('客户来源')">
              <mu-text-field v-model="form.value3.text" placeholder="客户来源" disabled></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="value3" label="电话" :rules="myRules.phone">
            <mu-text-field v-model="form.value3" placeholder="请输入电话号码(必填)"></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="value3" label="地址" :rules="myRules.phone">
            <mu-text-field v-model="form.value3" placeholder="地址"></mu-text-field>
          </mu-form-item>
        </mu-paper>

        <mu-paper :z-depth="0" class="block">
          <mu-form-item prop="value3" label="备注">
            <mu-text-field v-model="form.value3" placeholder="请输入备注"></mu-text-field>
          </mu-form-item>
        </mu-paper>
      </mu-form>

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
        title="新增客户"
        width="600"
        max-width="80%"
        :esc-press-close="false"
        :overlay-close="false"
        :open.sync="dialogState"
      >
        确认信息无误, 点击确定按钮新增客户
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
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import Picker from "dm-vue-picker-h5";
import Rules from "../../../static/js/rules";
export default {
  components: {
    AppBar,
    Picker
  },
  computed: {
    // 当前客户的id
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      pickerList1: [
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
      pickerList2: [
        {
          text: "决策人张三",
          value: 1
        },
        {
          text: "决策人李四",
          value: 2
        },
        {
          text: "决策人王五",
          value: 3
        },
        {
          text: "决策人赵六",
          value: 4
        }
      ],
      form: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
        value8: "",
        value9: ""
      }
    };
  },
  mounted(){
  },
  methods: {
    submitDialog() {
      // this.$toast.success('Hello World')
      // setTimeout(()=>{
      //   this.dialogState = false;
      // },1000)
      this.apiMethod.getCreditReporting(this);
    },
    showPicker(pickerTitle) {
      this.pickerTitle = pickerTitle;
      switch (pickerTitle) {
        case "性别":
          this.pickerList = this.pickerList1;
          break;
        case "关键/决策人":
          this.pickerList = this.pickerList2;
          break;
      }
      this.$refs.picker.show();
    },
    handlePickerConfirm(value, column, text) {
      // console.log(value)//选中的条目的value
      // console.log(column)//选中的列的索引
      // console.log(text)//选中的条目的text
      switch (this.pickerTitle) {
        case "性别":
          this.form.value2 = this.pickerList[column];
          break;
        case "关键/决策人":
          this.form.value9 = this.pickerList[column];
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.content {
  padding-top: 44px;
}
</style>