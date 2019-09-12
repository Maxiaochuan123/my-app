<!--
 * @Description: 新建或者编辑客户
 * @Author: shenah
 -->
<template>
  <div class="addOrEditCustomer">
    <AppBar
      :customFnc="openDialog"
      :pageTitle="id?'编辑客户':'新增客户'"
      custom
      customTitle="保存"
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
            :rules="myRules.userName"
            label="客户名称"
            prop="value1"
          >
            <mu-text-field
              placeholder="请输入客户名称(必填)"
              v-model="form.customerName"
            ></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            label="客户行业"
            prop="input"
          >
            <div
              @click="showPicker('客户行业')"
              class="surround"
            >
              <mu-text-field
                disabled
                placeholder="客户行业"
                v-model="form.customerName"
              ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            :rules="myRules.phone"
            label="客户类型"
            prop="value3"
          >
            <div
              @click="showPicker('客户类型')"
              class="surround"
            >
              <mu-text-field
                disabled
                placeholder="客户类型"
                v-model="form.customerName"
              ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            label="客户级别"
            prop="input"
          >
            <div
              @click="showPicker('客户级别')"
              class="surround"
            >
              <mu-text-field
                disabled
                placeholder="客户级别"
                v-model="form.customerName"
              ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            label="客户来源"
            prop="input"
          >
            <div
              @click="showPicker('客户来源')"
              class="surround"
            >
              <mu-text-field
                disabled
                placeholder="客户来源"
                v-model="form.customerName"
              ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            :rules="myRules.phone"
            label="手机号码"
            prop="value3"
          >
            <mu-text-field
              placeholder="请输入手机号码(必填)"
              v-model="form.value3"
            ></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            :rules="myRules.phone"
            label="座机号码"
            prop="value3"
          >
            <mu-text-field
              placeholder="请输入座机号码"
              v-model="form.value3"
            ></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            :rules="myRules.phone"
            label="地址"
            prop="address"
          >
            <SelectAddress
              :defaultValue="form.address"
              @addressChange="addressChange"
            ></SelectAddress>
          </mu-form-item>
        </mu-paper>

        <mu-paper
          :z-depth="0"
          class="block"
        >
          <mu-form-item
            label="备注"
            prop="value3"
          >
            <mu-text-field
              placeholder="请输入备注"
              v-model="form.value3"
            ></mu-text-field>
          </mu-form-item>
        </mu-paper>
      </mu-form>

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
        title="新增客户"
        width="600"
      >
        确认信息无误, 点击确定按钮新增客户
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
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import Picker from "dm-vue-picker-h5";
import Rules from "../../../static/js/rules";
import SelectAddress from "@components/SelectAddress.vue";
export default {
  components: {
    AppBar,
    Picker,
    SelectAddress
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
        customerName: "", // 客户名称
        mobile: "", // 手机号码
        telephone: "", // 座机号码
        value4: "", // 
        value5: "",
        value6: "",
        value7: "",
        value8: "",
        value9: "",
        address: ""
      }
    };
  },
  mounted() {},
  methods: {
    addressChange(val) {
      this.form.address = val;
    },
    submitDialog() {
      
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