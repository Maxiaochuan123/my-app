<template>
  <div class="addDaily">
    <AppBar
      :customFnc="customFnc"
      custom
      customTitle="保存"
      pageTitle="写日报"
    ></AppBar>
    <div class="content">
      <div
        :class="['baseContent',bootomPadingStatus_1 || bootomPadingStatus_2 ? 'bootomPading' : '']"
      >
        <div class="baseItem">
          <div class="title">今日重点工作及完成情况</div>
          <div class="textarea">
            <mu-text-field
              :rows="0"
              full-width
              multi-line
              placeholder="请输入内容"
              v-model="form.content"
            ></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <div class="baseItem">
          <div class="title">明日工作计划</div>
          <div class="textarea">
            <mu-text-field
              :rows="0"
              full-width
              multi-line
              placeholder="请输入内容"
              v-model="form.tomorrow"
            ></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <div class="baseItem">
          <div class="title">工作感悟</div>
          <div class="textarea">
            <mu-text-field
              :rows="0"
              full-width
              multi-line
              placeholder="请输入内容"
              v-model="form.sentiment"
            ></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <div class="baseItem">
          <div class="title">工作所需支持</div>
          <div class="textarea">
            <mu-text-field
              :rows="0"
              full-width
              multi-line
              placeholder="请输入内容"
              v-model="form.support"
            ></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <uploadList
          :batchId="form.batchId"
          :customEnclosureList="customEnclosureList"
          :customImgList="customImgList"
          :ishasAfferent="false"
          @changecustomEnclosureList="changecustomEnclosureList"
          @changecustomImgList="changecustomImgList"
          @getEnclosureSuccessList="getEnclosureSuccessList"
          @getImgSuccessList="getImgSuccessList"
        ></uploadList>
        <mu-divider shallow-inset></mu-divider>

        <!-- 关联业务 -->
        <RelateBusiness
          :defaultHide="true"
          :relateData="relateData"
          :relatedBusinessList="relatedBusinessList"
          :relateMenu="relateMenu"
          @relateBusinessChange="relateBusinessChange"
        ></RelateBusiness>
      </div>

      <!-- 接收人 -->
      <mu-form
        :model="form"
        class="mu-demo-form"
        label-position="left"
        label-width="100"
      >
        <mu-paper
          :z-depth="0"
          class="block"
        >
          <mu-form-item
            label="接收人"
            prop="contactName"
          >
            <PopSingleOrMultiple
              :defaultValue="form.contactName"
              :extraParams="{
              teamType:1
            }"
              :isShowText="false"
              :selected="form.sendUser"
              @PopSingleOrMultipleChange="PopSingleOrMultipleChange"
              apiName="getInsideCompanyContacts"
              fieldName="contactName"
              idField="id"
              mode="multiple"
              name="接收人"
              splitField="sendUser"
              textField="realname"
              vagueSearch="name"
            >
              <mu-icon
                color="#FF0000"
                size="24"
                slot="rightIcon"
                value=":iconfont icon-tianjia"
              ></mu-icon>
            </PopSingleOrMultiple>
          </mu-form-item>

          <MultipleShowList
            :list="multipleShowList"
            @multipleShowListChange="multipleShowListChange"
            type="sendUser"
          ></MultipleShowList>
        </mu-paper>
      </mu-form>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import uploadList from "../../components/upLoad/uploadList";
import RelateBusiness from "../../components/RelateBusiness/RelateBusiness";
import PopSingleOrMultiple from "../../components/PopSingleOrMultiple";
import MultipleShowList from "../../components/MultipleShowList";
import Api from "@api";
import { RELATION_BUSINESS } from "@constants/menuInfo.js";
export default {
  components: {
    AppBar,
    uploadList,
    RelateBusiness,
    PopSingleOrMultiple,
    MultipleShowList
  },
  data() {
    return {
      relateMenu: {
        // 菜单的相应配置
        clues: RELATION_BUSINESS.clues,
        customers: RELATION_BUSINESS.customers,
        contacts: RELATION_BUSINESS.contacts,
        tasks: RELATION_BUSINESS.tasks,
        visits: RELATION_BUSINESS.visits
      },
      form: {
        content: "", //今日完成情况
        tomorrow: "", //明日工作计划
        sentiment: "", //工作感悟
        support: "", //工作所需支持
        sendUser: [], // 接收人的拼接
        contactName: "", // 接收人的名字
        sendUserIds: "", //接收人id
        batchId: ""
      },
      customImgList: [], // 手动传入图片
      customEnclosureList: [], // 手动传入文件
      relatedBusinessList: {}, //关联业务
      relateData: {
        // 关联的相关数据
        clues: [],
        customers: [],
        contacts: [],
        tasks: [],
        visits: []
      },

      multipleShowList: []
    };
  },
  watch: {
    "$parent.details"(val) {
      this.relatedBusinessList = {
        clues: val.clueList,
        customers: val.customerList,
        contacts: val.contactsList,
        tasks: val.tasksList,
        visits: val.visitsList
      };
    },
    "form.sendUser"(val) {
      this.multipleShowList = val.map(item => ({
        text: item.realname,
        value: item.id,
        img: item.img
      }));
    }
  },
  created() {
    if (this.$route.params.state === "edit") {
      this.api.getDailyParams({ logId: this.$route.params.id }).then(res => {
        this.form = { ...this.form, ...this.handlerDetails(res.data) };
      });
    } else {
      this.querySuperList();
    }
  },
  methods: {
    querySuperList() {
      Api.querySuperUser().then(res => {
        let list = res.data;
        let form = {};
        form.sendUser = list;
        form.sendUserIds = list.map(item => item.id).join(",");
        this.form = { ...this.form, ...form };
      });
    },
    customFnc() {
      let params = {
        content: this.form.content,
        tomorrow: this.form.tomorrow,
        sentiment: this.form.sentiment,
        support: this.form.support,
        sendUserIds: this.form.sendUserIds,
        batchId: this.form.batchId
      };
      let tag = 0;
      for (let item in params) {
        if (!params[item]) {
          tag++;
        }
      }
      if (tag > 5) {
        this.$toast.warning("您并未填写内容");
        return false;
      }

      let id = this.$route.params.id;
      if (id) {
        params.logId = id;
      }

      this.api.addDaily({params, ...this.relatedBusinessList}).then(res => {
        if (res.msg === "success")
          this.$toast.success(`${id ? "编辑" : "新增"}成功!`);
        this.goBack();
      });
    },

    // 图片 / 附件
    getImgSuccessList(data) {
      this.form.batchId = data.guid;
    },
    getEnclosureSuccessList(data) {
      this.form.batchId = data.guid;
    },
    changecustomImgList(data) {
      this.customImgList = data;
    },
    changecustomEnclosureList(data) {
      this.customEnclosureList = data;
    },

    relateBusinessChange({ nowConfig, commonParam, operate }) {
      const param = {
        ...commonParam
      };
      this.relatedBusinessList = param;
    },
    PopSingleOrMultipleChange({ selectArr, texts, ids, idsField, textsField }) {
      // 多选框的回调
      this.form.contactName = texts;
      this.form.sendUser = selectArr;
      // 这个属性并没有双向绑定
      this.form.sendUserIds = ids;
    },
    multipleShowListChange({ row, type }) {
      this.form.sendUser = this.form.sendUser.filter(
        item => item.id * 1 !== row.value * 1
      );
      this.form.sendUserIds = this.form.sendUser.map(item => item.id).join(",");
    },
    handlerDetails(details) {
      let form = { ...details };

      // 拜访客户的处理
      form.visitCustomerName = details.customerName;
      form.visitCustomer = [
        {
          customerId: details.visitCustomerId,
          customerName: details.customerName
        }
      ];

      // 拜访联系人的处理
      form.visitContactName = details.contactsName;
      form.visitContact = [
        {
          contactsId: details.visitContactId,
          contactsName: details.contactsName
        }
      ];
      // 接收人的处理
      form.sendUser = details.sendUserList.map(item => ({
        id: item.userId,
        ...item
      }));
      form.sendUserId = details.sendUserIds;

      // 附件的处理
      this.customImgList = details.img.map(item => ({
        ...item,
        src: item.filePath,
        progress: { progressState: 1 }
      }));
      this.customEnclosureList = details.file.map(item => ({
        ...item,
        progress: { progressState: 1 }
      }));
      // 关联业务处理
      this.relateData = {
        clues: details.clueList,
        customers: details.customerList || [],
        contacts: details.contactsList || [],
        tasks: details.tasksList || [],
        visits: details.visitsList || []
      };
      return form;
    }
  },
  computed: {
    bootomPadingStatus_1() {
      if (
        this.relatedBusinessList.clueIds ||
        this.relatedBusinessList.contactsIds ||
        this.relatedBusinessList.customerIds ||
        this.relatedBusinessList.taskIds ||
        this.relatedBusinessList.visitIds
      ) {
        return true;
      } else {
        return false;
      }
    },
    bootomPadingStatus_2() {
      if (
        this.relateData.clues ||
        this.relateData.customers ||
        this.relateData.contacts ||
        this.relateData.tasks ||
        this.relateData.visits
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.addDaily {
  .content {
    padding-top: 56px;
    .baseContent {
      padding: 0 15px;
      background-color: #fff;
      .baseItem {
        padding: 12px 0;
        .title {
          color: @primary-text;
          font-size: @primary-size;
        }
        .textarea {
          margin-top: 4px;
          color: @regular-text;
          .mu-input {
            padding: 0;
            margin: 0;
            min-height: 0;
          }
          /deep/ .mu-text-field-textarea {
            color: @regular-text;
          }
          /deep/ .mu-input-line,
          /deep/ .mu-input-focus-line {
            display: none;
          }
        }
      }
      .upLoad {
        padding: 0;
      }
    }
    .bootomPading {
      padding-bottom: 10px !important;
    }
    .relationBusiness {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      .title {
        color: @primary-text;
        font-size: @primary-size;
      }
      img {
        width: 24px;
        height: 24px;
      }
    }
    .mu-divider.shallow-inset {
      margin-left: 0;
    }
  }
  .receivePeople {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background-color: #fff;
    .title {
      color: @primary-text;
      font-size: @primary-size;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
  .receivePeople {
    margin-top: 12px;
  }
  /deep/ .app-bar {
    box-shadow: 0px 2px 6px 0px #ededed;
  }
}
</style>