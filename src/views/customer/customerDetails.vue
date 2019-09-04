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
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
export default {
  name: "customerDetails",
  components: { AppBar },
  computed: {
    // 当前客户的id
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
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
    }
  }
};
</script>
<style lang='less' scoped>
.customerDetails {
  width: 100%;
  height: 100%;
  .content {
    padding-top: 56px;
    border: 1px solid transparent;
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
    }
  }
}
</style>