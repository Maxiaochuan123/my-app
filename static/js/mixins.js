// 点击波纹组件
import waves from "../waves";
// 验证
import Rules from "./rules";
// 日期处理
import dayjs from "dayjs";
// 工具函数
import tool from "./tool";

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
      pickerTitle: "",
      pickerList: [],

      // 验证
      myRules: {
        must: (mes, type) => this.must(mes, type),
        userName: [
          { validate: val => !!val, message: "必须填写用户名" },
          {
            validate: val => Rules.name.test(val),
            message: "必须是 2 ~ 10 位汉字姓名"
          }
        ],
        phone: [
          { validate: val => !!val, message: "必须填写手机号" },
          {
            validate: val => Rules.phone.test(val),
            message: "手机号格式不正确"
          }
        ],
        email: [
          {
            validate: val =>
              this.noRequired(val, this.myRules.email[0], "邮箱格式不正确")
          }
        ]
      }
    };
  },
  methods: {
    // 返回第几页
    goBack(index = -1) {
      this.$router.go(index);
    },
    // 跳转页面
    goPage(linkName, params = {}, query = {}) {
      this.$router.push({
        name: linkName,
        params,
        query
      });
    },
    // 覆盖前面的跳转
    goReplacePage(linkName, params = {}, query = {}) {
      this.$router.replace({
        name: linkName,
        params,
        query
      });
    },
    // 打电话
    dial(phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    },

    // 非必填 验证函数
    noRequired(val, item, errorMessage) {
      if (val.length > 0) {
        if (!Rules.email.test(val)) {
          item.message = errorMessage;
          return false;
        } else {
          item.message = "";
          return true;
        }
      } else {
        item.message = "";
        return true;
      }
    },
    // 只有一个必填
    must(mes, type) {
      let error = `必须填写${mes}`;
      if (type === "select") {
        error = `必须选择${mes}`;
      } else if (type === "image") {
        error = `必须上传${mes}`;
      }
      return [
        {
          validate: val => !!val,
          message: error
        }
      ];
    },

    // Dialog
    openDialog() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.dialogState = true;
        } else {
          this.$toast.warning("请将 必填 信息补充完整");
        }
      });
    },
    isEmptyObj(obj) {
      // 是否是空对象
      return JSON.stringify(obj) === "{}";
    },
    closeDialog() {
      this.$refs.form.clear();
      for (let item in this.form) {
        if (this.form[item]) {
          this.form[item] = "";
        }
      }
      this.dialogState = false;
    },
    toFormData(form = {}) {
      // 变成formdata的形式
      let formdata = new FormData();
      Object.keys(form).forEach(item => {
        formdata.append(item, form[item]);
      });
      return formdata;
    },
    // 加载加载图片防止打包后图片的路径不对
    loadingImg(imgName) {
      return require(`../images/${imgName}`);
    },

    // // 筛选 - 多选状态
    // changeSelect(task){
    //   task.state = !task.state;
    // },
    // // 筛选 - 重置
    // resetDrawerList(){
    //   for(let item in this.drawerList){
    //     if(Array.isArray(this.drawerList[item])){
    //       for(let item2 of this.drawerList[item]){
    //         item2.state = false
    //       }
    //     }else{
    //       this.drawerList[item] = ''
    //     }
    //   }
    // },
    //筛选 - 确认
    // drawerSubmit(){
    //   let  tempList = {...this.drawerList}
    //   for(let item in tempList){
    //     if(Array.isArray(tempList[item])){
    //       // console.log(tempList[item])
    //       for(let item2 of tempList[item]){
    //         // console.log(item2.title)
    //         // tempList[item].values.push(item2.title)
    //         // tempList[item].push({values:item2.title})
    //       }
    //     }
    //   }
    //   // console.log( this.drawerList)
    // }
  },
  filters: {
    formatDate(timeStamp, type) {
      if (type === "date") {
        return dayjs(timeStamp).format("YYYY-MM-DD");
      }
      return dayjs(timeStamp).format("YYYY/MM/DD HH:mm:ss");
    },
    formatCurrency_wan(money) {
      return tool.formatCurrency_wan(money);
    },
    codeInToName(value, list) {
      // 对应的编码转化成name
      if (!Array.isArray(list)) {
        return "";
      }
      if (value !== null) {
        const array = list.filter(item => item.value === value)[0];
        if (array) {
          return array.text;
        }
        return "";
      }
      return "";
    }
  }
};
