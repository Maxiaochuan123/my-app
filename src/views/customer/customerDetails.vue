<!--
 * @Description: 修改成组件类型不用路由,因为在安卓或者ios上有bug
 * @Author: shenah
 * @Date: 2019-09-04 12:35:37
 * @LastEditTime : 2020-01-09 10:44:20
 * @LastEditors  : shenah
 -->
<template>
  <div class="customerDetails">
    <AppBar
      :menuList="menuList"
      :rightIcon="rightIcon"
      :rightIconFlag="rightIconFlag"
      @menuChange="menuChange"
      isMenu
      pageTitle="客户详情"
    ></AppBar>
    <div
      :class="{'common-waters-customer-content':type === 'commonWatersCustomer'?true:isAble? false : true}"
      class="content"
    >
      <div class="content-wrap">
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
          @change="tabsChange"
          center
          class="tabs"
          color="primary"
          indicator-color="primary"
          inverse
        >
          <mu-tab value="record">跟进记录</mu-tab>
          <mu-tab value="basic">基本信息</mu-tab>
        </mu-tabs>
        <div class="user-info">
          <CustomerBasic v-if="active === 'basic'"></CustomerBasic>
          <CustomerRecord v-else></CustomerRecord>
          <!-- <router-view></router-view> -->
        </div>
      </div>
    </div>
    <FootNav
      :list="bottomList"
      @footNavChange="footNavChange"
      v-if="judgeBtn()"
    ></FootNav>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ENORDISABLE } from "@constants/dictionaries.js";
import CustomerBasic from "./customerBasic";
import CustomerRecord from "./customerRecord";
import AppBar from "@components/AppBar.vue";
import FootNav from "@components/FootNav.vue";
import Api from "@api";
export default {
  name: "customerDetails",
  components: { AppBar, FootNav, CustomerBasic, CustomerRecord },
  computed: {
    ...mapState({
      customerRights: state => state.authorities.crm.customer,
      poolRights: state => state.authorities.crm.pool
    }),
    // 当前客户的id
    id() {
      return this.$route.params.id;
    },
    // 从何处进来
    // commonWatersCustomer => 从公海客户中进来
    type() {
      return this.$route.params.type;
    },
    isAble() {
      // 当前状态是启用还是禁用 0是启用 1是禁用
      return this.details.isLock === 0;
    }
  },
  data() {
    return {
      details: {}, // 详情
      active: "basic", // 当前激活的(record=> 跟进记录,basic=> 基本信息)
      rightIcon: "icon-gengduo1",
      rightIconFlag: true,
      menuList: [],
      contactsList: [], // 联系人列表
      bottomList: [] // 底部的按钮
    };
  },
  props: {},
  mounted() {
    // 查询客户详情
    this.queryCustomerDetails();
    this.queryContacts();
  },
  methods: {
    tabsChange(val) {
      this.active = val;
    },
    judgeBtn() {
      // 根据启用与禁用的状态判断哪些该隐藏
      if (this.type === "commonWatersCustomer") {
        return false;
      } else {
        return this.isAble;
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
      const {
        distribute,
        putinpool,
        update,
        addrecord,
        isStartUsing
      } = this.customerRights;
      const {
        receive: poolReceive,
        distribute: poolDistribute
      } = this.poolRights;
      this.bottomList = [
        {
          img: this.loadingImg("buttom-write-follow.png"),
          label: "写跟进",
          linkName: "writeFollowup",
          isLink: true,
          type: "writeFollow",
          linkParams: { id: this.id },
          flag: addrecord
        },
        {
          img: this.loadingImg("buttom-call.png"),
          label: "打电话",
          linkName: "myInfoChild",
          isLink: false,
          type: "call",
          phone: this.details.mobile,
          flag: true
        }
      ];
      if (this.type === "commonWatersCustomer") {
        this.rightIconFlag = [poolDistribute, poolReceive].some(item => item);
        this.menuList = [
          {
            title: "分配",
            linkName: "selectDistributeUsers",
            isLink: true,
            linkParams: {
              id: this.id,
              type: "commonWatersCustomer"
            },
            flag: poolDistribute
          },
          {
            title: "领取",
            isLink: false,
            type: "receive",
            flag: poolReceive
          }
        ];
      } else {
        this.rightIconFlag = [distribute, putinpool, update, isStartUsing].some(
          item => item
        );
        let able = ENORDISABLE.filter(
          item => item.value !== this.details.isLock
        )[0];
        let isAble = able.value === 1;
        this.menuList = [
          {
            title: "分享",
            linkName: "selectShareUsers",
            isLink: false,
            type: "share",
            flag: distribute && isAble
          },
          {
            title: "放入公海",
            isLink: false,
            type: "putInWaters",
            flag: putinpool && isAble
          },
          {
            title: "编辑",
            linkName: "addOrEditCustomer",
            isLink: true,
            type: "edit",
            linkParams: { id: this.id },
            flag: update && isAble
          },
          {
            title: able.text,
            isLink: false,
            type: "able",
            flag: isStartUsing
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
          if (result) {
            Api.queryReceivePublicPoolById({
              ids: this.id,
              labelType: "2"
            }).then(res => {
              this.$toast.success("领取成功");
              this.goBack();
            });
          }
        });
      } else if (type === "able") {
        let able = ENORDISABLE.filter(
          item => item.value !== this.details.isLock
        )[0];
        let tip = able && able.text;
        this.$confirm(`是否${tip}此客户?`, "提示").then(({ result, value }) => {
          if (result) {
            Api.updateCustomerEnableOrDisable({
              customerIds: this.id,
              isLock: able.value
            }).then(res => {
              this.$toast.success(`${tip}成功`);
              this.goBack();
            });
          }
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
  overflow: hidden;
  .common-waters-customer-content {
    padding: 56px 0 12px 0 !important;
  }
  .content {
    height: 100%;
    padding: 56px 0 106px 0;
    border: 1px solid transparent;
    overflow: hidden;
    .content-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
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
}
</style>