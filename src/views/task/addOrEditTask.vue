<!--
 * @Description: 新增或者编辑任务
 * @Author: shenah
 * @Date: 2019-10-12 14:46:10
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-15 09:29:49
 -->

<template>
  <div class="add-or-edit-task">
    <AppBar
      :customFnc="save"
      :pageTitle="pageTitle"
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
import AppBar from "@components/AppBar.vue";
import { PRIORITY } from "@constants/dictionaries.js";
import GeneralForm from "@components/GeneralForm.vue";
import Api from "@api";
export default {
  name: "addOrEditTask",
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  components: { AppBar, GeneralForm },
  data() {
    return {
      pageTitle: "",
      fields: [
        {
          fieldName: "name",
          formType: "text",
          isNull: 1,
          name: "任务名称",
          options: "",
          type: 1,
          value: ""
        },
        {
          fieldName: "ownerUserName",
          formType: "checkbox",
          isNull: 1,
          name: "执行人",
          options: "",
          type: 9,
          value: "",
          multiple: "ownerUser",
          idField: "userId",
          textField: "realname"
        },
        {
          fieldName: "ownerUser",
          name: "执行人拼接",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "ownerUserId",
          name: "执行人id",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "startTime",
          formType: "date",
          isNull: 1,
          name: "开始时间",
          options: "",
          type: 4,
          value: ""
        },
        {
          fieldName: "stopTime",
          formType: "date",
          isNull: 1,
          name: "结束时间",
          options: "",
          type: 4,
          value: ""
        },
        {
          fieldName: "showPriority",
          formType: "select",
          isNull: 1,
          name: "优先级",
          options: PRIORITY.map(item => `${item.value}^_^${item.text}`).join(
            ","
          ),
          type: 3,
          value: "",
          relation: "priority,priorityName"
        },
        {
          fieldName: "description",
          formType: "textarea",
          isNull: 1,
          name: "任务描诉",
          options: null,
          type: 2,
          value: ""
        }
      ],
      fieldList: []
    };
  },
  props: {},
  mounted() {
    this.judgeType();
  },
  methods: {
    judgeType() {
      if (this.subId) {
        this.pageTitle = "编辑任务";
        this.queryDetails();
      } else {
        this.fieldList = this.fields;
        this.pageTitle = "新增任务";
      }
    },
    save() {
      const generalFormVue = this.$refs.generalForm;
      generalFormVue.$refs.form.validate().then(result => {
        if (result) {
          let params = {
            ...generalFormVue.form,
            pid: this.id
          };
          if (this.subId) {
            params = {
              ...generalFormVue.form,
              taskId: this.subId
            };
          }
          Api.addOrEditTask(params).then(res => {
            this.$toast.success({
              message: "保存成功"
            });
            this.goBack();
          });
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.add-or-edit-task {
  height: 100%;
  overflow-x: hidden;
  .content {
    padding-top: 44px;
  }
}
</style>