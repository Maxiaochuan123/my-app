<!--
 * @Description: 新增或者编辑子任务
 * @Author: shenah
 * @Date: 2019-10-14 13:48:22
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-14 18:51:44
 -->
<template>
  <div class="add-or-edit-subtask">
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
  name: "addOrEditSubTask",
  components: { AppBar, GeneralForm },
  computed: {
    id() {
      return this.$route.params.id;
    },
    subId() {
      return this.$route.params.subId;
    }
  },
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
          fieldName: "stopTime",
          formType: "datetime",
          isNull: 1,
          name: "截止时间",
          options: null,
          type: 13,
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
        this.pageTitle = "编辑子任务";
        this.queryDetails();
      } else {
        this.fieldList = this.fields;
        this.pageTitle = "新增子任务";
      }
    },
    queryDetails() {
      // 查询详情
      Api.queryTaskDetailsById({
        taskId: this.id
      }).then(res => {
        let data = res.data;
        let subTask = data.childTask.filter(
          item => item.taskId == this.subId
        )[0];
        this.fields.forEach(item => {
          if (item.fieldName === "ownerUser") {
            item.value = subTask.ownerUserList
              .map(one => `${one.userId}^_^${one.realname}`)
              .join(",");
          } else if (item.fieldName === "ownerUserName") {
            item.value = subTask.ownerUserList
              .map(one => one.realname)
              .join(",");
          } else if (item.fieldName === "showPriority") {
            let objArray = PRIORITY.filter(
              ele => ele.value === subTask.priority
            )[0];
            item.value = objArray.text;
          } else {
            item.value = subTask[item.fieldName];
          }
        });
        this.fieldList = this.fields;
      });
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
.add-or-edit-subtask {
  height: 100%;
  overflow-x: hidden;
  .content {
    padding-top: 44px;
  }
}
</style>