<!--
 * @Description: 新建或者编辑联系人包含个人联系人
 -->
<template>
  <div class="addOrEditCustomer">
    <AppBar
      :customFnc="customFnc"
      :pageTitle="typeObj.title"
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
import AppBar from "../../components/AppBar";
import GeneralForm from "@components/GeneralForm.vue";
import Api from "@api";
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
    // type判断是否哪里进来的
    // addCustomer表示从客户里面进来的新增
    // editCustomer表示从客户里面进来的编辑
    // addPersonal表示从个人联系人进来的新增
    // editPersonal表示从个人联系人进来的编辑
    type() {
      return this.$route.params.type;
    }
  },
  data() {
    return {
      typeObj: {
        title: "新增联系人"
      }, // 当前进入的相关信息
      fieldList: []
    };
  },
  mounted() {
    this.typeObj = this.judgePageTitle();
    this.queryField();
    // console.log(this.id)
  },
  methods: {
    handleCustomerData(arr) {
      // 处理数据
      let newArr = [];
      Object.keys(arr).forEach(item => {
        newArr.push(...arr[item]);
      });
      return newArr;
    },
    judgePageTitle() {
      let model =
        this.type.indexOf("addCustomer") > -1 ? "customer" : "personal";
      if (this.type === "addCustomer" || this.type === "addPersonal") {
        return {
          title: "新增联系人",
          type: "add",
          model
        };
      }else if(this.type === "editPersonal" || this.type === "editCustomer"){
        return {
          title: "编辑联系人",
          type: "edit",
          model
        };
      }
      return {
        title: "新增联系人",
        type: "edit",
        model
      };
    },
    queryField() {
      Api.queryFieldList({
        label: "3",
        id: this.typeObj.type === "add" ? undefined : this.id
      }).then(res => {
        if (this.typeObj.model === "personal") {
          // 查询我的客户
          Api.queryCustomerList({
            search: "",
            type: 2
          }).then(res2 => {
            let arr = [
              {
                fieldName: "enterprise",
                formType: "select",
                isNull: 0,
                name: "关联客户",
                options: this.handleCustomerData(res2.data)
                  .map(item => `${item.customerId}^_^${item.customerName}`)
                  .join(","),
                type: 3,
                value: '',
                relation: "customerId,customerName"
              }
            ];
            this.fieldList = [...arr, ...res.data];
          });
        } else {
          this.fieldList = res.data;
        }
      });
    },
    customFnc() {
      const generalFormVue = this.$refs.generalForm;
      generalFormVue.$refs.form.validate().then(result => {
        if (result) {
          let params = {
            entity: { ...generalFormVue.form, customerId: this.id }
          };
          if (this.typeObj.model === "personal") {
            params = {
              entity: { ...generalFormVue.form}
            };
          }
          Api.addOrEditContacts(params).then(res => {
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
    }
  }
};
</script>

<style scoped lang="less">
.content {
  padding-top: 44px;
}
</style>