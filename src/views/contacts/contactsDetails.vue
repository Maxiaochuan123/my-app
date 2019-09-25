<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime: 2019-09-09 18:31:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="clueDetails">
    <AppBar
      pageTitle="个人信息"
      isDrawer
      drawerIcon="icon-guolv"
      rightIcon="icon-tianjia"
      isMenu
      :menuList="menuList"
    ></AppBar>
    <div class="content">
      <mu-paper :z-depth="0" class="infoCard">
        <div class="topInfo">
          <div class="headImg">
            <img :src="loadingImg('默认头像.png')" />
          </div>
          <div class="info">
            <div class="name">
              <span>{{info.name}}</span>
              <img :src="loadingImg(info.sex === '男' ? '男.png' : '女.png')" />
            </div>
            <div class="clueDate">{{info.createTime}}</div>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>
        <mu-list>
          <mu-list-item>
            <mu-list-item-title>创建人</mu-list-item-title>
            <mu-list-item-action>{{info.name}}</mu-list-item-action>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-title>客户级别</mu-list-item-title>
            <mu-list-item-action>{{info.customer_level}}</mu-list-item-action>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-title>电话号码</mu-list-item-title>
            <mu-list-item-action>{{info.mobile}}</mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
      <mu-tabs :value.sync="active" inverse color="primary" indicator-color="primary" center>
        <mu-tab>跟进记录</mu-tab>
        <mu-tab>基本信息</mu-tab>
      </mu-tabs>
      <div class="followUprecord" v-if="active === 0">
        <Record :record="[]"></Record>
      </div>
      <div class="basicsInfo" v-if="active === 1">
        <mu-list>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>手机号码</mu-list-item-title>
              <mu-list-item-sub-title>{{info.mobile}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>微信/QQ</mu-list-item-title>
              <mu-list-item-sub-title>{{info.wechatOrQq}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>电子邮箱</mu-list-item-title>
              <mu-list-item-sub-title>{{info.email}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>关联客户</mu-list-item-title>
              <mu-list-item-sub-title>众汇</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>客户级别</mu-list-item-title>
              <mu-list-item-sub-title>{{info.customer_level}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>职务</mu-list-item-title>
              <mu-list-item-sub-title>{{info.post}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>地址</mu-list-item-title>
              <mu-list-item-sub-title>{{info.address}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>备注</mu-list-item-title>
              <mu-list-item-sub-title>{{info.remark}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </div>
      <FootNav :list="bottomList" @footNavChange="dial(info.mobile)"></FootNav>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import Record from "../../components/Record";
import FootNav from "../../components/FootNav";
export default {
  components: {
    AppBar,
    Record,
    FootNav
  },
  data() {
    return {
      active: 1,
      infoType: '车贷',
      info: this.$store.state.info,
      clueDate: Date.now(),
      menuList: [
        {
          title: "分享",
          linkName: "",
          isLink: true
        },
        {
          title: "编辑",
          linkName: "editBasicsInfo",
          isLink: true,
          linkParams:{
            title:`编辑个人信息`
          }
        },
        {
          title: "删除",
          linkName: "",
          isLink: true
        }
      ],

      bottomList: [
        {
          img: '../../../static/images/buttom-write-follow.png',
          label: "写跟进",
          linkName: "writeFollowup",
          isLink: true,
          type: "writeFollow"
        },
        {
          img: '../../../static/images/buttom-call.png',
          label: "打电话",
          linkName: "myInfoChild",
          isLink: false,
          type: "call"
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
.clueDetails {
  .content {
    padding: 44px 0 96px;
    
    // 跟进记录
    .infoCard{
      .topInfo {
        display: flex;
        padding: 20px @primary-size 0;
        margin: 12px 0;

        .headImg {
          width: 60px;
          height: 60px;
          img {
            width: 60px;
            height: 60px;
          }
        }
        .info {
          flex-grow: 1;
          padding-left: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            color: @primary-text;
            font-size: @primary-size;
            font-weight: 600;
            display: flex;
            align-items: center;
            padding-bottom: 2px;
            img {
              width: 20px;
              height: 20px;
              margin-left: 6px;
            }
          }
          .clueDate {
            font-size: 14px;
            color: @regular-text;
          }
        }

        .mu-item-content {
          padding-left: 12px;
          .mu-avatar {
            width: 60px;
            height: 60px;
          }
          .mu-item-title {
            position: relative;
            font-weight: 600;
          }
        }

        .sex {
          position: absolute;
          top: 12px;
          left: 30px;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
      .mu-list {
        /deep/ .mu-item {
          height: 33px;
          font-weight: 500;
          .mu-item-title{
            font-size: @regular-size;
          }
        }
      }
      
    }
    .mu-list {
      .mu-item-title {
        color: @regular-text;
      }
      .mu-item-action {
        color: @primary-text;
      }
    }


    // 基本信息
    .basicsInfo{
      margin-top: 12px;
      background-color: #fff;
      .mu-list {
        /deep/ .mu-item {
          height: 70px;
        }
        .mu-item-title{
          font-size: @regular-size;
        }
        .mu-item-sub-title, .textWaper{
          padding-top: 2px;
          font-size: @primary-size;
          color: @primary-text;
          font-weight: @regular-weight;
        }
        .textWaperItem{
          height: 90px;
          /deep/ .mu-item{
            height: 90px;
          }
        }
      }
    }
    

    // 公共样式
    .mu-divider {
      width: calc(100% - 17px);
    }
    .mu-item-content{
      /deep/ .mu-item-sub-title{
          white-space: wrap;
        }
    }
    /deep/ .mu-tabs {
      margin: 12px 0;
      padding-top: 0;
      .mu-tab-wrapper {
        padding: 0;
        min-height: 40px;
      }
    }
  }
  /deep/ .app-bar{
    box-shadow: 0px 2px 6px 0px #ededed;
  }
}
</style>