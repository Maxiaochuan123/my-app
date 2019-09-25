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
      pageTitle="线索详情"
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
              <span>张三</span>
              <img :src="loadingImg('女.png')" />
            </div>
            <div class="clueDate">{{ clueDate | formatDate}}</div>
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
      <mu-tabs :value.sync="active" inverse color="primary" indicator-color="primary" center>
        <mu-tab>跟进记录</mu-tab>
        <mu-tab>基本信息</mu-tab>
      </mu-tabs>
      <div class="followUprecord" v-if="active === 0">
        <Record :record="[]"></Record>
      </div>
      <div class="basicsInfo" v-if="active === 1">
        <mu-list v-if="infoType === '买车'">
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>是否驾车</mu-list-item-title>
              <mu-list-item-sub-title>是</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>所驾车型</mu-list-item-title>
              <mu-list-item-sub-title>福特翼虎</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>兴趣车型</mu-list-item-title>
              <mu-list-item-sub-title>福特野马</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>车身颜色</mu-list-item-title>
              <mu-list-item-sub-title>白</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>内饰颜色</mu-list-item-title>
              <mu-list-item-sub-title>棕/白</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>对比车型</mu-list-item-title>
              <mu-list-item-sub-title>马自达</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>下次联系时间</mu-list-item-title>
              <mu-list-item-sub-title>{{ Date.now() | formatDate}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>备注</mu-list-item-title>
              <mu-list-item-sub-title>有购买意向</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>

        <mu-list v-if="infoType === '车险'">
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>产品名称</mu-list-item-title>
              <mu-list-item-sub-title>万网销售产品</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item class="textWaperItem">
            <mu-list-item-content>
              <mu-list-item-title>套餐内容</mu-list-item-title>
              <div class="textWaper">有线WA(GH)20台+中国人寿三年盗抢险+软件套餐九</div>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>单价</mu-list-item-title>
              <mu-list-item-sub-title>{{1000 | formatCurrency}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>数量</mu-list-item-title>
              <mu-list-item-sub-title>2套</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>总金额</mu-list-item-title>
              <mu-list-item-sub-title>{{2000 | formatCurrency}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>质保期</mu-list-item-title>
              <mu-list-item-sub-title>三年</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>下次联系时间</mu-list-item-title>
              <mu-list-item-sub-title>{{ Date.now() | formatDate}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>备注</mu-list-item-title>
              <mu-list-item-sub-title>有购买意向</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>

        <mu-list v-if="infoType === '车贷'">
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>兴趣车型</mu-list-item-title>
              <mu-list-item-sub-title>福特野马</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>车身颜色</mu-list-item-title>
              <mu-list-item-sub-title>白</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>内饰颜色</mu-list-item-title>
              <mu-list-item-sub-title>棕/白</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>对比车型</mu-list-item-title>
              <mu-list-item-sub-title>马自达</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>贷款金额</mu-list-item-title>
              <mu-list-item-sub-title>{{80000 | formatCurrency}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>贷款期限</mu-list-item-title>
              <mu-list-item-sub-title>24个月</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>下次联系时间</mu-list-item-title>
              <mu-list-item-sub-title>{{ Date.now() | formatDate}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>备注</mu-list-item-title>
              <mu-list-item-sub-title>有购买意向</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </div>
      <FootNav :list="bottomList" @footNavChange="dial(13111866951)"></FootNav>
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
      clueDate: Date.now(),
      menuList: [
        {
          title: "分享",
          linkName: "",
          isLink: true
        },
        {
          title: "转为联系人",
          linkName: "",
          isLink: true
        },
        {
          title: "转为客户",
          linkName: "",
          isLink: true
        },
        {
          title: "放入公海",
          linkName: "",
          isLink: true
        },
        {
          title: "关闭",
          linkName: "",
          isLink: true
        },
        {
          title: "编辑",
          linkName: "editBasicsInfo",
          isLink: true,
          linkParams:{
            title:`编辑买车线索`
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