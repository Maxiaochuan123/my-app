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
    name() {
      return this.$route.params.name;
    },
    // type判断是否哪里进来的
    // addCustomer 表示从客户里面进来的新增
    // editCustomer 表示从客户里面进来的编辑
    // addPersonal 表示从个人联系人进来的新增
    // editPersonal 表示从个人联系人进来的编辑
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
      } else if (this.type === "editPersonal" || this.type === "editCustomer") {
        return {
          title: "编辑联系人",
          type: "edit",
          model
        };
      }
      return {
        title: "新增联系人",
        type: "add",
        model
      };
    },
    queryField() {
      Api.queryFieldList({
        label: "3",
        id: this.typeObj.type === "add" ? undefined : this.id
      }).then(res => {
        if (this.typeObj.model === "personal") {
          let customerName = "";
          let customerId = "";
          let filterArr = res.data.filter(item => {
            if (item.fieldName === "customerName") {
              customerName = item.value;
            }
            if (item.fieldName === "customerId") {
              customerId = item.value;
            }
            return item.fieldName !== "customerName";
          });
          let arr = [
            {
              fieldName: "customerName",
              formType: "checkbox",
              isUnique: 0,
              isNull: 1,
              name: "客户姓名",
              options: "",
              type: 9,
              value: customerName,
              apiName: "queryCustomerListPC",
              splitField: "customer",
              idField: "customerId",
              mode: "single",
              textField: "customerName",
              htmlHidden: 0
            }
          ];
          let obj = {
            fieldName: "customer",
            name: "客户姓名拼接",
            options: "",
            type: 1,
            htmlHidden: 1,
            value: []
          };
          if (this.id) {
            // 证明是个人联系人编辑联系人
            // 处理客户姓名反显的问题
            obj.value = [
              {
                customerId,
                customerName
              }
            ];
          }
          arr.push(obj);
          filterArr.unshift(...arr);
          this.fieldList = filterArr;
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
            entity: {
              ...generalFormVue.form,
              customerId: this.id,
              customerName: this.name
            }
          };
          if (this.typeObj.model === "personal") {
            params = {
              entity: { ...generalFormVue.form }
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