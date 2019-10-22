<!--
 * @Description: 新增或者编辑任务
 * @Author: shenah
 * @Date: 2019-10-12 14:46:10
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-22 17:29:26
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
      <div class="content-wrap">
        <GeneralForm
          :fieldList="fieldList"
          ref="generalForm"
        ></GeneralForm>
        <!-- 子任务与关联 -->
        <div class="relate-subtask">
          <RelateBusiness
            :relateData="relateData"
            :relateMenu="relateMenu"
            @relateBusinessChange="relateBusinessChange"
            class="relate"
            ref="relateBusiness"
          ></RelateBusiness>
          <SubTaskForm
            :list="childTask"
            :updateDetails="queryDetails"
            ref="subTaskForm"
          ></SubTaskForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import { PRIORITY } from "@constants/dictionaries.js";
import { RELATION_BUSINESS } from "@constants/menuInfo.js";
import GeneralForm from "@components/GeneralForm.vue";
import RelateBusiness from "@/components/RelateBusiness/RelateBusiness.vue";
import SubTaskForm from "./components/SubTaskForm.vue";
import Api from "@api";
export default {
  name: "addOrEditTask",
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  components: { AppBar, GeneralForm, RelateBusiness, SubTaskForm },
  data() {
    return {
      childTask: [], // 子任务
      relateMenu: {
        // 菜单的相应配置
        clues: RELATION_BUSINESS.clues,
        customers: RELATION_BUSINESS.customers,
        contacts: RELATION_BUSINESS.contacts
      },
      relateData: {
        // 关联的相关数据
        clues: [],
        customers: [],
        contacts: []
      },
      details: {}, // 详情
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
          apiName: "querySimpleUserByDepId",
          splitField: "ownerUser",
          idField: "userId",
          mode: "multiple",
          textField: "realname"
        },
        {
          fieldName: "ownerUser",
          name: "执行人拼接",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: []
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
          fieldName: "priority",
          name: "优先级id",
          options: "",
          type: 1,
          htmlHidden: 1,
          value: ""
        },
        {
          fieldName: "priorityName",
          name: "优先级的名字",
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
      fieldList: [],
      relateParams: {} // 关联业务相关的参数
    };
  },
  props: {},
  mounted() {
    this.judgeType();
  },
  methods: {
    handleSubTask() {
      this.goPage("addOrEditSubTask", { id: this.id });
    },
    judgeType() {
      if (this.id) {
        this.pageTitle = "编辑任务";
        this.queryDetails();
      } else {
        this.fieldList = this.fields;
        this.pageTitle = "新增任务";
      }
    },
    handlerDetails(data) {
      // 处理详情
      // 基本信息的处理
      let priorityObj = PRIORITY.filter(
        ele => ele.value === data.priority * 1
      )[0];
      this.fields.forEach(item => {
        if (item.fieldName === "ownerUser") {
          item.value = data.ownerUserList;
        } else if (item.fieldName === "ownerUserName") {
          item.value = data.ownerUserList.map(one => one.realname).join(",");
        } else if (
          item.fieldName === "showPriority" ||
          item.fieldName === "priorityName"
        ) {
          item.value = priorityObj.text;
        } else {
          item.value = data[item.fieldName];
        }
      });
      // 关联业务处理
      this.relateData = {
        clues: data.clueList,
        customers: data.customerList,
        contacts: data.contactsList
      };
      // 子任务
      this.childTask = data.childTask;
      this.fieldList = this.fields;
    },
    queryDetails() {
      // 查询详情
      Api.queryTaskDetailsById({
        taskId: this.id
      }).then(res => {
        this.handlerDetails(res.data);
      });
    },
    // 业务关联组件的处理
    relateBusinessChange({ commonParam, operate }) {
      const param = {
        taskId: this.id,
        ...commonParam
      };
      if (this.id) {
        Api.updateTaskRelation(param).then(res => {
          this.$toast.success("成功");
          this.queryDetails();
          if (this.operate === "updateRelate") {
            this.$refs.relateBusiness.$refs.selectInfo.openFullscreen = false;
          }
        });
      } else {
        this.relateParams = commonParam;
      }
    },
    save() {
      const generalFormVue = this.$refs.generalForm;
      generalFormVue.$refs.form.validate().then(result => {
        if (result) {
          // 基本参数
          let base = generalFormVue.form;
          base[status] = new Date().getTime() > base.stopTime ? 2 : 1;
          // 关联业务的参数
          let relate = this.relateParams;
          // 子任务的参数
          let childTask = this.$refs.subTaskForm.childTask;
          const params = {
            ...base,
            ...relate,
            children: childTask
          };
          if (this.id) {
            Api.addOrEditTask({
              taskId: this.id,
              ...base
            }).then(res => {
              this.$toast.success({
                message: "保存成功"
              });
              this.goBack();
            });
          } else {
            Api.addOrEditTaskChild(params).then(res => {
              this.$toast.success({
                message: "保存成功"
              });
              this.goBack();
            });
          }
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.add-or-edit-task {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .content {
    width: 100%;
    height: 100%;
    padding-top: 44px;
    overflow: hidden;
    .content-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
      .relate-subtask {
        margin-top: 12px;
        padding: 0 0 15px 15px;
        background-color: #fff;
      }
    }
  }
}
</style>