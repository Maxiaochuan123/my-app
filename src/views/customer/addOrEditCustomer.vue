<!--
 * @Description: 新建或者编辑客户
 * @Author: shenah
 -->
<template>
  <div class="addOrEditCustomer">
    <AppBar
      :customFnc="customFnc"
      :pageTitle="id?'编辑客户':'新增客户'"
      custom
      customTitle="保存"
    ></AppBar>
    <div class="content">
      <GeneralForm
        :defaultForm="details"
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
    // 当前客户的id
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      details: {},
      fieldList: []
    };
  },
  mounted() {
    this.queryField().then(() => {
      this.queryCustomerDetails();
    });
  },
  methods: {
    queryField() {
      return Api.queryFieldList({
        label: "2"
      }).then(res => {
        this.fieldList = res.data;
      });
    },
    queryCustomerDetails() {
      if (this.id) {
        // 查询客户的详情
        Api.queryCustomerDetailsById({
          customerId: this.id
        }).then(res => {
          this.details = res.data;
        });
      }
    },
    customFnc() {
      const generalFormVue = this.$refs.generalForm;
      generalFormVue.$refs.form.validate().then(result => {
        if (result) {
          Api.addOrEditCustomer({
            entity: { ...generalFormVue.form, id: this.id }
          }).then(res => {
            this.$toast.success({
              message: res.msg,
              position: "top"
            });
            this.goBack();
          });
          return true;
        }
        this.$toast.info({
          message: "必填的字段请填写完整",
          position: "top"
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