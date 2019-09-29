<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 15:33:39
 * @LastEditTime: 2019-09-09 18:32:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="editBasicsInfo" >
    <AppBar :pageTitle="pageTitle" custom :customFnc="openDialog" customTitle="保存"></AppBar>
    <div class="content">
      <mu-form ref="form" :model="form" class="mu-demo-form" label-position="left" label-width="118">
        <mu-paper :z-depth="0" class="block">
          <mu-form-item prop="value1" label="线索名称" :rules="myRules.userName">
            <mu-text-field v-model="form.value1" placeholder="请输入线索名称(必填)"></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="value2" label="线索来源" :rules="myRules.sex">
            <div class="surround" @click="showPicker('线索来源')">
              <mu-text-field v-model="form.value2.text" placeholder="请选择线索来源(必填)" disabled ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="value2" label="线索级别" :rules="myRules.sex">
            <div class="surround" @click="showPicker('线索级别')">
              <mu-text-field v-model="form.value2.text" placeholder="请选择线索级别(必填)" disabled ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="value3" label="电话号码" :rules="myRules.phone">
            <mu-text-field v-model="form.value3" placeholder="请输入电话号码(必填)"></mu-text-field>
          </mu-form-item>
        </mu-paper>
        
        <mu-paper :z-depth="0" class="block">
          <mu-form-item prop="input" label="是否驾车">
            <div class="surround" @click="showPicker">
              <mu-text-field v-model="form.value6" placeholder="请选择是否驾车" disabled ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="input" label="所驾车型">
            <div class="surround" @click="showPicker">
              <mu-text-field v-model="form.value6" placeholder="请选择所驾车型" disabled ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="input" label="兴趣车型">
            <div class="surround" @click="showPicker">
              <mu-text-field v-model="form.value6" placeholder="请选择兴趣车型" disabled ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="input" label="车身颜色">
            <mu-text-field v-model="form.value7" placeholder="请输入车身颜色"></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="input" label="内饰颜色">
            <mu-text-field v-model="form.value8" placeholder="请输入内饰颜色"></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item prop="input" label="对比车型">
            <div class="surround" @click="showPicker('对比车型')">
              <mu-text-field v-model="form.value9.text" placeholder="请选择对比车型" disabled ></mu-text-field>
              <i class="iconfont icon-rightArrow"></i>
            </div>
          </mu-form-item>
        </mu-paper>
      </mu-form>

      <!-- 弹出选择器 取消事件 @cancel -->
      <Picker
        ref="picker"
        :textTitle="pickerTitle"
        :data="pickerList"
        name="name"
        picker-class="pickerClass"
        :anchor="[0]"
        @confirm="confirmPicker">
      </Picker>

      <!-- dialog对话框 -->
      <mu-dialog title="新增线索" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="dialogState">
        确认信息无误, 点击确定按钮新增线索
        <mu-button slot="actions" flat @click="closeDialog">取消</mu-button>
        <mu-button slot="actions" flat color="primary" v-loading="btnLoading" data-mu-loading-size="24" @click="submitDialog">确定</mu-button>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Picker from "dm-vue-picker-h5";
import Rules from '../../../static/js/rules'
export default {
  name:'editBasicsInfo',
  components:{ AppBar,Picker },
  data(){
    return{
      pageTitle: this.$route.params.title,
      // 线索来源
      pickerList1:[
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
      // 线索级别
      pickerList2:[
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
      // 是否驾车
      pickerList1:[
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
      // 所驾车型
      pickerList1:[
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
      // 兴趣车型
      pickerList1:[
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
      // 对比车型
      pickerList1:[
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
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
        value8: "",
        value9: "",
      },
    }
  },
  methods: {
    submitDialog(){
      this.apiMethod.getCreditReporting(this)
    },
    showPicker(pickerTitle) {
      this.pickerTitle = pickerTitle;
      switch (pickerTitle){
        case '性别':
          this.pickerList = this.pickerList1;
          break;
        case '关键/决策人':
          this.pickerList = this.pickerList2;
          break;
      }
      this.$refs.picker.show()
    },
    confirmPicker(value,column,text) {
      switch (this.pickerTitle){
        case '性别':
          this.form.value2 = this.pickerList[column];
          break;
        case '关键/决策人':
          this.form.value9 = this.pickerList[column];
          break;
      }
    }
  }
}
</script>

<style scoped lang="less">
  .editBasicsInfo{
    .content{
      padding-top: 44px;
    }
  }
</style>