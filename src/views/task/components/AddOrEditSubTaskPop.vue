<!--
 * @Description: 新增或者编辑子任务的弹窗
 * @Author: shenah
 * @Date: 2019-10-15 16:25:05
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-16 11:32:01
 -->
<template>
  <div class>
    <mu-dialog
      :append-body="false"
      :open.sync="openFullscreen"
      dialog-class="select-sub-task-dialog"
      fullscreen
      transition="slide-bottom"
    >
      <div class="select-sub-task-body">
        <div class="select-sub-task-header">
          <div @click="closeFullscreenDialog">取消</div>
          <div class="primary-words">{{pageTitle}}</div>
          <div
            @click="save"
            class="ok"
          >确定</div>
        </div>
        <GeneralForm
          :fieldList="fieldList"
          class="sub-task-form"
          ref="generalForm"
        ></GeneralForm>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import { PRIORITY } from "@constants/dictionaries.js";
import GeneralForm from "@components/GeneralForm.vue";
import Api from "@api";
export default {
  name: "AddOrEditSubTaskPop",
  components: { GeneralForm },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      uid: 1, // '随机数的生成'
      openFullscreen: false, // 弹出框的显示
      pageTitle: "",
      subId: "",
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
          formType: "date",
          isNull: 1,
          name: "截止时间",
          options: null,
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
          fieldName: "priority",
          name: "优先级id",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "priorityName",
          name: "优先级名字",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
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
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {},
  watch: {
    openFullscreen(val) {
      if (val) {
        this.judgeType();
      } else {
        this.$emit("addOrEditSubTaskPopChange", {
          operate: "close"
        });
      }
    },
    row(val) {
      if (!this.isEmptyObj(val)) {
        this.subId = val.taskId;
        this.handleDetails(val);
        this.openFullscreen = true;
      } else {
        this.subId = "";
        this.handleDetails(val);
      }
    }
  },
  methods: {
    judgeType() {
      if (this.subId || !this.isEmptyObj(this.row)) {
        this.pageTitle = "编辑子任务";
      } else {
        this.fieldList = this.fields;
        this.pageTitle = "新增子任务";
      }
    },
    handleDetails(subTask) {
      if (!this.isEmptyObj(subTask)) {
        // 处理详情
        this.fields.forEach(item => {
          if (item.fieldName === "ownerUser") {
            item.value = subTask.ownerUserList
              .map(one => `${one.userId}^_^${one.realname}`)
              .join(",");
          } else if (item.fieldName === "ownerUserName") {
            item.value = subTask.ownerUserList
              .map(one => one.realname)
              .join(",");
          } else if (
            item.fieldName === "showPriority" ||
            item.fieldName === "priorityName"
          ) {
            let objArray = PRIORITY.filter(
              ele => ele.value === subTask.priority * 1
            )[0];
            item.value = objArray.text;
          } else {
            item.value = subTask[item.fieldName];
          }
        });
      } else {
        this.fields.forEach(item => {
          item.value = "";
        });
      }
      this.fieldList = this.fields;
    },
    handleForm(form) {
      // 新增或者编辑任务的时候处理子任务的form数据
      let newForm = { ...form };
      newForm["ownerUserList"] = newForm.ownerUser.split(",").map(item => {
        const [userId, realname] = item.split("^_^");
        return {
          userId,
          realname
        };
      });
      return newForm;
    },
    save() {
      const generalFormVue = this.$refs.generalForm;
      generalFormVue.$refs.form.validate().then(result => {
        if (result) {
          if (!this.subId && !this.id) {
            this.$emit("addOrEditSubTaskPopChange", {
              operate:
                JSON.stringify(this.row) === "{}"
                  ? "taskAddSub"
                  : "taskEditSub",
              row: this.handleForm(this.$refs.generalForm.form)
            });
            this.openFullscreen = false;
          } else {
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
              this.$attrs.updateDetails();
              this.openFullscreen = false;
            });
          }
        }
      });
    },
    closeFullscreenDialog() {
      this.openFullscreen = false;
    }
  }
};
</script>
<style lang='less'>
.select-sub-task-dialog {
  .mu-dialog-body {
    height: 100%;
    .select-sub-task-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      .select-sub-task-header {
        padding: 16px 0px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .ok {
          font-size: 16px;
          color: #ff0000;
        }
      }
      .sub-task-form {
      }
    }
  }
}
</style>
<style lang='less' scoped>
</style>