<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime : 2019-12-26 10:04:07
 * @LastEditors  : shenah
 -->
<template>
  <div class="clueDetails">
    <AppBar
      pageTitle="线索详情"
      rightIcon="icon-gengduo1"
      isMenu
      :menuList="menuList"
      @menuChange="menuChange"
    ></AppBar>
    <div class="contentBox">
      <div class="content">
        <mu-paper :z-depth="0" class="infoCard">
          <div class="topInfo">
            <div class="headImg">
                <img :src="changeCarType(info)"/> 
            </div>
            <div class="info">
              <div class="clue-title"> 
                <!-- <img :src="changeCarType(info)"/>  -->
                <span> {{info.leadsName}}</span>
              </div>
              <div class="clueDate">{{info.createTime}}</div>
            </div>
          </div>
          <mu-divider shallow-inset></mu-divider>
          <mu-list>
            <mu-list-item>
              <mu-list-item-title>创建人</mu-list-item-title>
              <mu-list-item-action>{{info.createUserName}}</mu-list-item-action>
            </mu-list-item>
            <mu-list-item>
              <mu-list-item-title>线索来源</mu-list-item-title>
              <mu-list-item-action>{{info.leadsSource}}</mu-list-item-action>
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
          <Record :record="record"></Record>
        </div>
        <div class="basicsInfo" v-if="active === 1">
          <mu-list v-if="info.leadsType === '买车线索'">
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>是否驾车</mu-list-item-title>
                <mu-list-item-sub-title>{{info.isDriving}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>所驾车型</mu-list-item-title>
                <mu-list-item-sub-title>{{info.drivingModel}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>兴趣车型</mu-list-item-title>
                <mu-list-item-sub-title>{{info.interestedModel}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>车身颜色</mu-list-item-title>
                <mu-list-item-sub-title>{{info.carColor}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>内饰颜色</mu-list-item-title>
                <mu-list-item-sub-title>{{info.InteriorColor}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>对比车型</mu-list-item-title>
                <mu-list-item-sub-title>{{info.contrastModel}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>下次联系时间</mu-list-item-title>
                <mu-list-item-sub-title>{{info.nextTime}}</mu-list-item-sub-title>
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

          <mu-list v-if="info.leadsType === '车险线索'">
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>产品名称</mu-list-item-title>
                <mu-list-item-sub-title>{{info.productName}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item class="textWaperItem">
              <mu-list-item-content>
                <mu-list-item-title>套餐内容</mu-list-item-title>
                <div class="textWaper">{{info.packageContent}}</div>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>单价</mu-list-item-title>
                <mu-list-item-sub-title>{{info.unitPrice | formatCurrency('元')}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>数量</mu-list-item-title>
                <mu-list-item-sub-title>{{info.amount}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>总金额</mu-list-item-title>
                <mu-list-item-sub-title>{{info.totalaMount | formatCurrency('元')}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>质保期</mu-list-item-title>
                <mu-list-item-sub-title>{{info.warranty}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>下次联系时间</mu-list-item-title>
                <mu-list-item-sub-title>{{info.nextTime}}</mu-list-item-sub-title>
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

          <mu-list v-if="info.leadsType === '车贷线索'">
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>兴趣车型</mu-list-item-title>
                <mu-list-item-sub-title>{{info.interestedModel}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>车身颜色</mu-list-item-title>
                <mu-list-item-sub-title>{{info.carColor}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>内饰颜色</mu-list-item-title>
                <mu-list-item-sub-title>{{info.InteriorColor}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>对比车型</mu-list-item-title>
                <mu-list-item-sub-title>{{info.contrastModel}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>贷款金额</mu-list-item-title>
                <mu-list-item-sub-title>{{info.loansAmount | formatCurrency_wan}}</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>贷款期限</mu-list-item-title>
                <mu-list-item-sub-title>{{info.loanPeriod}} 个月</mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset></mu-divider>
            <mu-list-item>
              <mu-list-item-content>
                <mu-list-item-title>下次联系时间</mu-list-item-title>
                <mu-list-item-sub-title>{{info.nextTime}}</mu-list-item-sub-title>
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
        <FootNav :list="bottomList" @footNavChange="dial(info.mobile)" v-if="footNavState"></FootNav>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import Record from "../../components/Record";
import FootNav from "../../components/FootNav";
import { mapState } from 'vuex'
import Api from "@api";
export default {
  components: {
    AppBar,
    Record,
    FootNav
  },
  data() {
    return {
      active: 0,
      infoType: '买车',
      clueDate: Date.now(),
      info:{},
      record:[],
      menuList: [],

      bottomList: [],
      footNavState:true
    };
  },
  created() {
    this.setMenuList();
    this.api.getClueDetails({leadsId:this.$route.params.id}).then(res=>{
      if(res.msg !== 'success') this.$toast.warning('线索详情获取失败!');
      this.info = res.data;
      // if(this.info.followup === '未跟进' || this.info.followup === '已跟进'){
        this.bottomList.push({
          img: '../../../static/images/buttom-write-follow.png',
          label: "写跟进",
          linkName: "writeFollowup",
          isLink: true,
          type: "writeFollow",
          linkParams: { id: this.$route.params.id },
          flag: true
        },{
          img: '../../../static/images/buttom-call.png',
          label: "打电话",
          linkName: "myInfoChild",
          isLink: false,
          type: "call",
          flag: true
        })
      // }else{
      //   this.bottomList = [{
      //     img: '../../../static/images/buttom-call.png',
      //     label: "打电话",
      //     linkName: "myInfoChild",
      //     isLink: false,
      //     type: "call",
      //     flag: true
      //   }]
      // }
    })
    this.api.getClueFollowUp({leadsId:this.$route.params.id}).then(res=>{
      if(res.msg !== 'success') this.$toast.warning('跟进记录获取失败!');
      this.record = res.data;
    })
  },
  computed: {
    ...mapState({
      leads: state => state.authorities.crm.leads
    })
  },
  methods: {
     changeCarType(row) {
      const {leadsType} = row;
      if(!leadsType) {
        return '';
      }
      if(leadsType.indexOf('买车') > -1) {
        return this.loadingImg('car-buy.png');
      }else if(leadsType.indexOf('车贷') > -1) {
        return this.loadingImg('car-loan.png');
      }else{
        return this.loadingImg('car-county.png');
      }
    },
    setMenuList(){
       // 公海跳转
      if(this.$route.params.type === 'commonWatersClue'){
        this.footNavState = false;
        this.menuList = [
          {title:'分配',flag:true},
          {title:'领取',flag:true}
        ];
      }else{
          this.menuList = [{
            title:'分享',
            flag: this.leads.distribute
          },{
            title:'转换为联系人',
            flag: this.leads.clewtransfercontacts
          },{
            title:'转换为客户',
            flag: this.leads.clewtransferclient
          },{
            title:'放入公海',
            flag: this.leads.topublicpool
          },{
            title:'关闭',
            flag: true
          },{
            title:'编辑',
            flag: this.leads.update
          },{
            title:'删除',
            flag: this.leads.delete
          }]
      }
    },
    menuChange(data){
      let {title} = {...data}
      switch (title) {
        case '编辑':
          let type = this.getType(this.info.leadsType)
          this.goPage('editBasicsInfo',{state:'edit',type:type,id:this.$route.params.id})
          break;
        case '分享':
          this.$confirm('是否分享此线索 ?', '提示').then(res=>{
            if(res.result){
              this.goPage('selectShareUsers',{id:this.$route.params.id,type:'clue'})
            }
          })
          break;
        case '转换为联系人':
          this.$confirm('是否将此线索转换为联系人 ?', '提示').then(res=>{
            if(res.result){
              this.api.clueToContact({leadsIds:this.$route.params.id}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已转化为联系人!');
                  this.$router.go(-1);
                }else{
                  this.$toast.error('转化为联系人失败!');
                }
              })
            }
          })
          break;
        case '转换为客户':
          this.$confirm(`转换完成后请修改为完整客户名`,`是否将此线索转换为客户 ?`, '提示').then(res=>{
            if(res.result){
              this.api.clueToCustomer({leadsIds:this.$route.params.id}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已转化为客户!')
                  this.$router.go(-1);
                }else{
                  this.$toast.error('转化为客户失败!');
                }
              })
            }
          })
          break;
        case '放入公海':
          this.$confirm('是否将此线索放入公海 ?', '提示').then(res=>{
            if(res.result){
              this.api.cluePutWaters({ids:this.$route.params.id}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已放入公海!')
                  this.$router.go(-1);
                }else{
                  this.$toast.error('放入公海失败!');
                }
              })
            }
          })
          break;
        case '关闭':
          this.$confirm('是否关闭此线索 ?', '提示').then(res=>{
            if(res.result){
              this.api.clueClose({leadsId:this.$route.params.id}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已关闭!')
                  this.$router.go(-1);
                }else{
                  this.$toast.error('关闭失败!');
                }
              })
            }
          })
          break;
        case '删除':
          this.$confirm('是否删除此线索 ?', '提示').then(res=>{
            if(res.result){
              this.api.clueDelete({leadsIds:this.$route.params.id}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已删除!')
                  this.$router.go(-1)
                }else{
                  this.$toast.error('删除失败!');
                }
              })
            }
          })
          break;
        case '分配':
          this.goPage('selectDistributeUsers',{type:'commonWatersCustomer',id:this.$route.params.id})
          break;
        case '领取':
          this.$confirm('是否领取此线索 ?', '提示').then(res=>{
            if(res.result){
              Api.queryReceivePublicPoolById({ids:this.$route.params.id, labelType:'1'}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('领取成功!')
                  this.$router.go(-1)
                }else{
                  this.$toast.error('领取失败!');
                }
              })
            }
          })
          break;
      }
    },
    getType(leadsType){
      switch (leadsType) {
        case '车险线索':
          return '5'
          break;
        case '买车线索':
          return '6'
          break;
        case '车贷线索':
          return '7'
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.clueDetails {
  .contentBox{
    height: 100vh;
    overflow: hidden;
  }
  .content {
    height: calc(100vh - 44px);
    overflow-y: scroll;
    margin-top: 44px;
    padding-bottom: 96px;
    
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
          }
          .clue-title{
            color: @primary-text;
            font-size: @primary-size;
            font-weight: 600;
            display:flex;
            padding-bottom: 2px;
            align-items: center;
            img{
              width: 24px;
              height: 24px;
              margin-right:6px;
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