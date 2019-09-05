<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime: 2019-09-05 18:41:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="clueDetails">
    <AppBar
      pageTitle="线索详情"
      isDrawer
      drawerIcon="icon-guolv"
      rightIcon="icon-tianjia"
      isMenu
      :menuList="menuList"
    ></AppBar>
    <div class="content">
      <mu-paper :z-depth="0">
        <div class="topInfo">
          <div class="headImg">
            <img src="../../../static/images/默认头像.png" />
          </div>
          <div class="info">
            <div class="name">
              <span>张三</span>
              <img src="../../../static/images/女.png" />
            </div>
            <div class="level">总经理</div>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>
        <mu-list>
          <mu-list-item>
            <mu-list-item-title>创建人</mu-list-item-title>
            <mu-list-item-action>张三</mu-list-item-action>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-title>线索来源</mu-list-item-title>
            <mu-list-item-action>到店</mu-list-item-action>
          </mu-list-item>
          <mu-list-item>
            <mu-list-item-title>电话号码</mu-list-item-title>
            <mu-list-item-action>13111866951</mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-paper>
      <!-- <Tabs :tabsList="tabsList"></Tabs> -->
      <mu-tabs :value.sync="active" inverse color="primary" text-color="rgba(0, 0, 0, .54)"  center>
        <mu-tab>跟进记录</mu-tab>
        <mu-tab>基本信息</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active === 0">
        <p>“是的 1，我承认从很早以前我都害怕死亡，在医院里被人研究的时候，以前做出布局的时候，其实我很怕死的，因为除了死以外，我没有值得珍惜的东西，很奇怪是吧？恰好是这样我真的很怕死，因为我想要有值得珍惜的东西之后，死亡之后才会不寂寞，我才能够安然的面对死亡……”</p>
      </div>
      <div class="demo-text" v-if="active === 1">
        <p>“……是的，我承认从很早以前我都害怕死亡，在医院里被人研究的时候，以前做出布局的时候，其实我很怕死的，因为除了死以外，我没有值得珍惜的东西，很奇怪是吧？恰好是这样我真的很怕死，因为我想要有值得珍惜的东西之后，死亡之后才会不寂寞，我才能够安然的面对死亡……”</p>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import Tabs from "../../components/Tabs";
export default {
  components: {
    AppBar,
    Tabs
  },
  data() {
    return {
      active:0,
      menuList: [{
        title: "分享",
        linkName: "",
        isLink: true
      },{
        title: "转为联系人",
        linkName: "",
        isLink: true
      },{
        title: "转为客户",
        linkName: "",
        isLink: true
      },{
        title: "放入公海",
        linkName: "",
        isLink: true
      },{
        title: "关闭",
        linkName: "",
        isLink: true
      },{
        title: "编辑",
        linkName: "",
        isLink: true
      },{
        title: "删除",
        linkName: "",
        isLink: true
      }],

      tabsList:[{
        title:'跟进记录',
        linkName:'trackingRecords'
      },{
        title:'基本信息',
        linkName:'essentialInfo'
      }]
    };
  },
  mounted() {
    console.log(this.$route);
  }
};
</script>

<style scoped lang="less">
.clueDetails {
  .content {
    padding-top: 44px;
    .mu-divider{
      width: calc(100% - 17px);
    }
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
        .level {
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
    
    .mu-list{
      /deep/ .mu-item{
        height: 33px;
        font-weight:500;
      }
      .mu-item-title{
        color: @regular-text;
      }
      .mu-item-action{
        color: @primary-text;
      }
    }

    .mu-tabs-center{
      justify-content: space-around;
      padding-top: 5px;
      /deep/ .mu-tab-wrapper{
        padding: 15px 0 9px;
      }
    }
    /deep/ .mu-tabs{
      margin: 12px 0;
      padding-top: 0;
      .mu-tab-wrapper{
        padding: 0;
        min-height: 40px;
      }
    }
  }
}
</style>