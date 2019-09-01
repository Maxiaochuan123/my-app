<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-01 13:52:04
 * @LastEditTime: 2019-09-01 22:38:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="addContacts">
    <AppBar leftLink="/contacts" pageTitle="新增联系人" custom :customFnc="xixi" customTitle="保存"></AppBar>

    <div class="content">
      <mu-paper :z-depth="0" class="block">
        <mu-form :model="form" class="mu-demo-form" label-position="left" label-width="118">
          <mu-form-item prop="input" label="姓名">
            <mu-text-field v-model="form.value1" placeholder="请输入姓名(必填)"></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="input" label="关键/角色人">
            <mu-text-field v-model="form.value2" placeholder="请选择关键决策人"></mu-text-field>
            <i class="iconfont icon-rightArrow"></i>
          </mu-form-item>
        </mu-form>
      </mu-paper>
      <mu-button @click="showPicker">show Picker</mu-button>
      <Picker
        ref="picker"
        textTitle="picker"
        :data="pickerList"
        name="name"
        picker-class="pickerClass"
        :anchor="[0]"
        @change="handlePickerChange"
        @confirm="handlePickerConfirm">
      </Picker>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import Picker from "dm-vue-picker-h5";
export default {
  components: {
    AppBar,Picker
  },
  data() {
    return {
      pickerList:[
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
      form: {
        value1: "",
        value2: ""
      }
    };
  },
  mounted() {
    
  },
  methods: {
    xixi() {
      console.log("xixi");
    },
    showPicker() {
      this.$refs.picker.show()
    },
    handlePickerChange(column, line, name) {
      // console.log(name)//name
      // console.log(column)//选中的列的索引
      // console.log(line)//选中的行的索引
    },
    handlePickerConfirm(value,column,text) {
      console.log(value)//选中的条目的value
      console.log(column)//选中的列的索引
      console.log(text)//选中的条目的text
    }
  }
};
</script>

<style scoped lang="less">
.content {
  padding-top: 44px;
  .block {
    margin-top: 12px;
    padding-left: 12px;
    .mu-form-item {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;

      /deep/.mu-input {
        width: 90%;
        font-weight: 400;

        // ::placeholder{
        //     color: #D2D6E4;
        // }
      }

      /deep/.mu-form-item-label {
        // min-width: 118px;
        font-size: 16px;
        color: #272727;
        font-weight: 400;
      }

      /deep/.mu-input-line {
        display: none;
      }
    }
    // .mu-item-action {
    //   font-size: 16px;
    //   color: #272727;
    //   font-weight: 400;
    //   min-width: 110px;
    // }
  }
}
</style>