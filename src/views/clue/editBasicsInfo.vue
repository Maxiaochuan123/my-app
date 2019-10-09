<!--
 * @Description: 新建或者编辑线索
 -->
<template>
  <div class="addOrEditCustomer">
    <AppBar
      :customFnc="customFnc"
      :pageTitle="state === 'add' ? `新增${pageTitle}` :  `编辑${pageTitle}` "
      custom
      customTitle="保存"
    ></AppBar>
    <div class="content">
      <GeneralForm
        :fieldList="fieldList"
        ref="generalForm"
      ></GeneralForm>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import AppBar from "../../components/AppBar";
import GeneralForm from "@components/GeneralForm.vue";
import Qs from 'qs'
=======
import AppBar from '../../components/AppBar'
import Picker from "dm-vue-picker-h5";
import Rules from '@static/js/rules'
>>>>>>> master
export default {
  components: {
    AppBar,
    GeneralForm
  },
  computed: {
    // 当前传入的id
    id() {
      return this.$route.params.id;
    },
    // 状态 新增 还是 编辑 add or edit
    state() {
      return this.$route.params.state;
    },
    // 5：车险线索, 6：买车线索, 7:车贷线索
    type() {
      return this.$route.params.type;
    },
<<<<<<< HEAD
    pageTitle(){
      switch (this.type) {
        case '5':
          return '车险线索'
=======
    confirmPicker(value,column,text) {
      switch (this.pickerTitle){
        case '性别':
          this.form.value2 = this.pickerList[column];
>>>>>>> master
          break;
        case '6':
          return '买车线索'
          break;
        case '7':
          return '车贷线索'
          break;
      }
    }
  },
  data() {
    return {
      fieldList: []
    };
  },
  mounted() {
    this.queryField();
  },
  methods: {
    queryField() {
      this.api.getClueField({
        leadsType: this.type,
        id: this.state === "add" ? undefined : this.id
      }).then(res => {
        this.fieldList = res.data;
      });
    },
    customFnc() {
      const generalFormVue = this.$refs.generalForm;
      generalFormVue.$refs.form.validate().then(result => {
        if (result) {
          let reqData = this.dataHandle({...generalFormVue.form});
          console.log(reqData)
          // 010-87655210 reqData
          this.api.addClue(reqData).then(res => {
            this.$toast.success({
              message: res.msg
            });
            this.goBack();
          });
          return true;
        }
        this.$toast.info({
          message: "必填的字段请填写完整"
        });
        return false;
      });
    },
    // 数据处理
    dataHandle(formVue){
      let entityTemp = []; let entity = []; let leadsType = [];
      
      for(let item of this.fieldList){
        if(item.fieldType === 1){
          entityTemp.push({[item.fieldName]:item.value})
        }else{
          leadsType.push({
            fieldId:item.fieldId,
            name:item.fieldName,
            activityValue:item.value
          })
        }
      }

      // entity
      entityTemp.forEach(item=>{
        Object.keys(item).forEach(key=>{
          if(formVue[key]){
            item[key]=formVue[key]
          }
        })
      })
      for(let item of entityTemp){
        for(let key in item){
          entity[Object.keys(item)[0]] = item[key]
        }
      }

      // leadsType
      leadsType.forEach((item,index)=>{
        if(formVue[item.name]){
          item.activityValue = formVue[item.name]
        }
      })
      entity.leadsId = this.state === 'add' ? '' : this.id

      return {
        entity: {...entity},
        leadsType: [...leadsType],
      };
    },
    handleCustomerData(arr) {
      // 处理数据
      let newArr = [];
      Object.keys(arr).forEach(item => {
        newArr.push(...arr[item]);
      });
      return newArr;
    },
  }
};
</script>

<style scoped lang="less">
.content {
  padding-top: 44px;
}
</style>