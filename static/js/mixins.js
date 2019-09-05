/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 20:38:24
 * @LastEditTime: 2019-09-05 15:49:14
 * @LastEditors: Please set LastEditors
 */
// 点击波纹组件
import waves from '../waves'
// 验证
import Rules from './rules'
// 日期处理
import dayjs from 'dayjs';

export default {
  directives: {
    waves
  },
  data() {
    return {
      // dialog
      dialogState: false,

      // btnLoading
      btnLoading: false,
      
      // picker 底部选择器
      pickerTitle:'',
      pickerList:[],

      // 验证
      myRules:{
        userName:[{ validate: (val) => !!val, message: '必须填写用户名'},{ validate: (val) => Rules.name.test(val), message: '必须是 2 ~ 10 位汉字姓名'}],
        phone:[{ validate: (val) => !!val, message: '必须填写手机号'},{ validate: (val) => Rules.phone.test(val), message: '手机号格式不正确'}],
        email:[{ validate: (val) => this.noRequired(val,this.myRules.email[0],'邮箱格式不正确')}],
        sex:[{ validate: (val) => !!val, message: '必须填写性别'}],
      }
    };
  },
  methods: {
    // 跳转页面
    goPage(linkName,params={},query={}){
      this.$router.push({
        name:linkName,
        params,
        query,
      })
    },

    // 打电话
    dial(phoneNumber){
      window.location.href = `tel:${phoneNumber}`;
    },

    // 非必填 验证函数
    noRequired(val, item, errorMessage){
      if(val.length > 0){
        if(!Rules.email.test(val)){
          item.message = errorMessage;
          return false
        }else{
          item.message = '';
          return true
        }
      }else{
        item.message = '';
        return true
      }
    },

    // Dialog
    openDialog() {
      this.$refs.form.validate().then((result) => {
        this.dialogState = true
      });
    },
    
    closeDialog(){
      this.$refs.form.clear();
      for(let item in this.form){
        if(this.form[item]){
          this.form[item] = ''
        }
      }
      this.dialogState = false;
    },
  },
  filters: {
    formatDate(timeStamp){
      return dayjs(timeStamp).format('YYYY/MM/DD HH:mm:ss');
    }
  }
}
