<!--
 * @Description: 客户详情
 * @Author: shenah
 -->
<template>
  <div class="customerDetails">
    <AppBar
      pageTitle="客户详情"
      :rightIcon="rightIcon"
      :rightLink="rightLink"
      isMenu
      :menuList="menuList"
      @menuChange="menuChange"
    ></AppBar>
    <div class="content">
      <div class="header">
        <div class="header-wrap">
          <mu-avatar size="60" class="header-left">
            <img src="/static/images/header.jpg" />
          </mu-avatar>
          <div class="header-right">
            <div class="title">四川好易车汽车贸易有限公司</div>
            <div class="sub-title">四川省成都市高新区天府街道224号</div>
          </div>
        </div>
        <div class="header-info">
          <div class="header-info-item">
            <div class="header-info-item-left">创建人</div>
            <div class="header-info-item-right">张三</div>
          </div>
          <div class="header-info-item">
            <div class="header-info-item-left">客户级别</div>
            <div class="header-info-item-right">H级(战略合作商)</div>
          </div>
          <div class="header-info-item">
            <div class="header-info-item-left">电话号码</div>
            <div class="header-info-item-right">18980521111</div>
          </div>
        </div>
      </div>
      <mu-tabs
        :value.sync="active"
        inverse
        color="primary"
        indicator-color="primary"
        center
        class="tabs"
      >
        <mu-tab value="record" to="/customerDetails/customerRecord/1">跟进记录</mu-tab>
        <mu-tab value="basic" to="/customerDetails/customerBasic/1">基本信息</mu-tab>
      </mu-tabs>
      <div class="user-info">
        <router-view></router-view>
      </div>
    </div>
    <FootNav :list="bottomList" @footNavChange="footNavChange" class="foot"></FootNav>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import FootNav from "@components/FootNav.vue";
export default {
  name: "customerDetails",
  components: { AppBar, FootNav },
  computed: {
    // 当前客户的id
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      active: "basic", // 当前激活的(record=> 跟进记录,basic=> 基本信息)
      rightIcon: "icon-gengduo1",
      rightLink: "/addOrEditCustomer",
      menuList: [
        {
          title: "分享",
          link: "/homeChild",
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
          link: "/addOrEditCustomer",
          isLink: true,
          type: "edit"
        },
        {
          title: "删除",
          isLink: false,
          type: "del"
        }
      ],
      bottomList: [
        {
          img: "/static/images/buttom-write-follow.png",
          label: "写跟进",
          link: "/addOrEditCustomer",
          isLink: true,
          type: "writeFollow"
        },
        {
          img: "/static/images/buttom-call.png",
          label: "打电话",
          link: "/myInfoChild",
          isLink: false,
          type: "call"
        }
      ]
    };
  },
  props: {},
  mounted() {},
  methods: {
    menuChange(item) {
      let { type, link } = item;
      //todo
      if (type === "share") {
        this.$confirm("是否分享此客户?", "提示").then(({ result, value }) => {
          if (result) {
            console.log("分享");
          }
        });
      } else if (type === "putInWaters") {
        this.$confirm("是否将此客户放入公海?", "提示").then(
          ({ result, value }) => {
            if (result) {
              console.log("放入公海");
            }
          }
        );
      } else if (type === "edit") {
        this.$router.push(`${link}/${this.id}`);
      } else if (type === "del") {
        this.$confirm("是否删除此客户?", "提示").then(({ result, value }) => {
          if (result) {
            console.log("删除");
          }
        });
      }
    },
    footNavChange(item) {
      console.log(item);
    }
  }
};
</script>
<style lang='less' scoped>
.customerDetails {
  width: 100%;
  height: 100%;
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
  .foot {
    margin-top:20px;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
  }
}
</style>