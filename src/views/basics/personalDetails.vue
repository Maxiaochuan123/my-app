<!--
 * @Description: 主页个人资料详情
 * @Author: shenah
 -->
<template>
  <div class="personal-details">
    <AppBar
      :isShowRightBtn="false"
      pageTitle="个人资料"
    ></AppBar>
    <div class="content">
      <div class="headers">
        <div class="header regular-words">
          <div>头像</div>
          <mu-avatar size="48">
            <img src="/static/images/default-header.png" />
          </mu-avatar>
        </div>
        <div class="brief">
          <div class="regular-words">简介</div>
          <div>我是客户代表谢谢你的关注我!!!!</div>
        </div>
      </div>
      <div class="basic">
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">真实姓名</div>
            <div class="sub-title">败吵吵</div>
          </div>
        </div>
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">所在企业</div>
            <div class="sub-title">众汇车服</div>
          </div>
        </div>
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">职位</div>
            <div class="sub-title">架构师</div>
          </div>
        </div>
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">联系方式</div>
            <div class="sub-title">18980521111</div>
          </div>
        </div>
        <div class="basic-details-item">
          <div class="basic-details-item-left">
            <div class="title">企业所在地</div>
            <div class="sub-title">四川省成都市</div>
          </div>
        </div>
        <div class="basic-details-item no-border-bottom">
          <div class="basic-details-item-left">
            <div class="title">详细地址</div>
            <div class="sub-title">高新区航兴国际广场2号楼</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
export default {
  name: "personalDetails",
  components: { AppBar },
  data() {
    return {
      date: ""
    };
  },
  props: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.personal-details {
  width: 100%;
  height: 100%;
  .content {
    height: 100%;
    padding-top: 44px;
    .headers {
      padding: 12px 15px;
      margin-top: 12px;
      background-color: #fff;
      .header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0 12px 0;
        border-bottom: 1px solid @primary-border;
      }
      .brief {
        width: 100%;
        font-size: @primary-size;
        color: @regular-text;
        padding: 12px 0 0 0;
      }
    }
    .basic {
      padding: 0 15px;
      margin-top: 12px;
      background-color: #fff;
    }
  }
}
</style>