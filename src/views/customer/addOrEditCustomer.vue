<!--
 * @Description: 新建或者编辑客户
 * @Author: shenah
 -->
<template>
  <div class="add-or-edit-customer">
    <AppBar
      :customFnc="customFnc"
      :pageTitle="id?'编辑客户':'新增客户'"
      custom
      customTitle="保存"
    ></AppBar>
    <div class="content">
      <GeneralForm
        :fieldList="fieldList"
        class="form"
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
      fieldList: []
    };
  },
  mounted() {
    this.queryField();
  },
  methods: {
    queryField() {
      Api.queryFieldList({
        label: "2",
        id: this.id
      }).then(res => {
        this.fieldList = res.data;
      });
    },
    customFnc() {
      const generalFormVue = this.$refs.generalForm;
      generalFormVue.$refs.form.validate().then(result => {
        if (result) {
          Api.addOrEditCustomer({
            entity: { ...generalFormVue.form, id: this.id }
          }).then(res => {
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
.add-or-edit-customer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    padding-top: 44px;
    overflow: hidden;
    .form {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
}
</style>