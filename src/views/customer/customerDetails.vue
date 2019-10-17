<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 12:35:37
 * @LastEditTime: 2019-10-17 11:43:48
 * @LastEditors: shenah
 -->
<!--
 * @Description: 客户详情
 * @Author: shenah
 -->
<template>
  <div class="customerDetails">
    <AppBar
      :menuList="menuList"
      :rightIcon="rightIcon"
      :rightLinkName="rightLinkName"
      :rightLinkParams="{id}"
      @menuChange="menuChange"
      isMenu
      pageTitle="客户详情"
    ></AppBar>
    <div
      :class="{'common-waters-customer-content':type ==='commonWatersCustomer'}"
      class="content"
    >
      <div class="header">
        <div class="header-wrap">
          <mu-avatar
            class="header-left"
            size="60"
          >
            <img :src="loadingImg('default-header.png')" />
          </mu-avatar>
          <div class="header-right">
            <div class="title">{{details.customerName}}</div>
            <div class="sub-title">{{details.detailAddress}}</div>
          </div>
        </div>
        <div class="header-info">
          <div class="header-info-item">
            <div class="header-info-item-left">创建人</div>
            <div class="header-info-item-right">{{details.createUserName}}</div>
          </div>
          <div class="header-info-item">
            <div class="header-info-item-left">客户级别</div>
            <div class="header-info-item-right">{{details.customerLevel}}</div>
          </div>
          <div class="header-info-item">
            <div class="header-info-item-left">电话号码</div>
            <div class="header-info-item-right">{{details.mobile}}</div>
          </div>
        </div>
      </div>
      <mu-tabs
        :value="active"
        center
        class="tabs"
        color="primary"
        indicator-color="primary"
        inverse
      >
        <mu-tab
          replace
          to="customerRecord"
          value="record"
        >跟进记录</mu-tab>
        <mu-tab
          replace
          to="customerBasic"
          value="basic"
        >基本信息</mu-tab>
      </mu-tabs>
      <div class="user-info">
        <router-view></router-view>
      </div>
    </div>
    <FootNav
      :list="bottomList"
      @footNavChange="footNavChange"
      v-if="type !== 'commonWatersCustomer'"
    ></FootNav>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import FootNav from "@components/FootNav.vue";
import Api from "@api";
export default {
  name: "customerDetails",
  components: { AppBar, FootNav },
  computed: {
    // 当前客户的id
    id() {
      return this.$route.params.id;
    },
    // 从何处进来
    // commonWatersCustomer => 从公海客户中进来
    type() {
      return this.$route.params.type;
    }
  },
  data() {
    return {
      details: {}, // 详情
      active: "basic", // 当前激活的(record=> 跟进记录,basic=> 基本信息)
      rightIcon: "icon-gengduo1",
      rightLinkName: "addOrEditCustomer",
      menuList: [],
      contactsList: [], // 联系人列表
      bottomList: [] // 底部的按钮
    };
  },
  props: {},
  mounted() {
    this.judgeActiveTab();
    // 查询客户详情
    this.queryCustomerDetails();
    this.queryContacts();
  },
  methods: {
    judgeActiveTab() {
      if (this.$route.path.indexOf("customerRecord") > -1) {
        this.active = "record";
      } else {
        this.active = "basic";
      }
    },
    queryContacts() {
      // 查询联系人
      Api.queryContactsById({
        customerId: this.id,
        pageType: 0
      }).then(res => {
        this.contactsList = res.data || [];
      });
    },
    queryCustomerDetails() {
      // 查询客户的详情
      return Api.queryCustomerDetailsById({
        customerId: this.id
      }).then(res => {
        this.details = res.data || {};
        this.addBtnList();
      });
    },
    addBtnList() {
      this.bottomList = [
        {
          img: this.loadingImg("buttom-write-follow.png"),
          label: "写跟进",
          linkName: "writeFollowup",
          isLink: true,
          type: "writeFollow",
          linkParams: { id: this.id }
        },
        {
          img: this.loadingImg("buttom-call.png"),
          label: "打电话",
          linkName: "myInfoChild",
          isLink: false,
          type: "call",
          phone: this.details.mobile
        }
      ];
      if (this.type === "commonWatersCustomer") {
        this.menuList = [
          {
            title: "分配",
            linkName: "selectDistributeUsers",
            isLink: true,
            linkParams: {
              id: this.id,
              type: "commonWatersCustomer"
            }
          },
          {
            title: "领取",
            isLink: false,
            type: "receive"
          }
        ];
      } else {
        this.menuList = [
          {
            title: "分享",
            linkName: "selectShareUsers",
            isLink: false,
            type: "share"
          },
          {
            title: "放入公海",
            isLink: false,
            type: "putInWaters"
          },
          {
            title: "编辑",
            linkName: "addOrEditCustomer",
            isLink: true,
            type: "edit",
            linkParams: { id: this.id }
          },
          {
            title: "删除",
            isLink: false,
            type: "del"
          }
        ];
      }
    },
    menuChange(item) {
      let { type, linkName } = item;
      //todo
      if (type === "share") {
        this.$confirm("是否分享此客户?", "提示").then(({ result, value }) => {
          if (result) {
            this.goPage(linkName, {
              id: this.id,
              type: "customerDetailsShare"
            });
          }
        });
      } else if (type === "putInWaters") {
        this.$confirm("是否将此客户放入公海?", "提示").then(
          ({ result, value }) => {
            if (result) {
              Api.customerToPublicPool({
                ids: this.id
              }).then(res => {
                this.$toast.success("放入公海成功");
                this.goBack();
              });
            }
          }
        );
      } else if (type === "del") {
        this.$confirm("是否删除此客户?", "提示").then(({ result, value }) => {
          if (result) {
            Api.deleteCustomerById({
              customerIds: this.id
            }).then(res => {
              this.$toast.success({
                message: "删除成功"
              });
              this.goBack();
            });
          }
        });
      } else if (type === "receive") {
        this.$confirm("是否领取此客户?", "提示").then(({ result, value }) => {
          Api.queryReceivePublicPoolById({
            ids: this.id,
            labelType: "2"
          }).then(res => {
            this.$toast.success("领取成功");
            this.goBack();
          });
        });
      }
    },
    footNavChange(item) {
      let { type, phone } = item;
      if (type === "call") {
        this.dial(phone);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.customerDetails {
  width: 100%;
  height: 100%;
  .common-waters-customer-content {
    padding: 56px 0 12px 0 !important;
  }
  .content {
    height: 100%;
    padding: 56px 0 120px 0;
    border: 1px solid transparent;
    overflow-y: auto;
    .header {
      width: 100%;
      background-color: #fff;
      padding: 0 0 0 15px;
      .header-wrap {
        display: flex;
        width: 100%;
        align-items: center;
        padding: 20px 15px 20px 0;
        border-bottom: 1px solid @primary-border;
        .header-left {
        }
        .header-right {
          flex: 1;
          margin-left: 12px;
          .title {
            font-size: @primary-size;
            color: @primary-text;
            font-weight: @primary-weight;
          }
          .sub-title {
            margin-top: 4px;
            font-size: @regular-size;
            color: @regular-text;
            font-weight: @regular-weight;
          }
        }
      }
      .header-info {
        width: 100%;
        padding: 5px 15px 15px 0;
        .header-info-item {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          .header-info-item-left {
            font-size: @regular-size;
            color: @regular-text;
            font-weight: @regular-weight;
          }
          .header-info-item-right {
            font-size: @regular-size;
            color: @primary-text;
            font-weight: @primary-weight;
          }
        }
      }
    }
    .tabs {
      margin-top: 12px;
    }
    .user-info {
      margin-top: 12px;
    }
  }
}
</style>