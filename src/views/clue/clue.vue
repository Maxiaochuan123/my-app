<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime : 2019-12-26 11:34:19
 * @LastEditors  : shenah
 -->
<template>
  <div class="clue">
    <AppBar pageTitle="线索" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" :rightIconFlag="leads.save" isMenu :menuList="menuList">
      <!-- 抽屉 -->
      <Screen ref="screen" slot="drawerContent" :drawerList="drawerList" @getScreenParams="getScreenParams"></Screen>
    </AppBar>
    <div class="content">
      <mu-tabs :value.sync="tabsActive" @change="changeTabs" inverse color="primary" indicator-color="primary" center>
        <mu-tab>我的线索</mu-tab>
        <mu-tab>团队线索</mu-tab>
      </mu-tabs>
      <div class="clueList">
        <mu-load-more :refreshing="loadUpdate.refreshing" @refresh="refresh" :loading="loadUpdate.loading" @load="load" :loaded-all="loadUpdate.loadedAll">

          <mu-list textline="two-line">
            <div v-for="(item,index) in list" :key="index">
              <mu-list-item v-waves>
                <mu-list-item-content @click="goPage('clueDetails',{id:item.leadsId,type:'线索'})">
                  <mu-list-item-title>
                    <div class="clue-title">
                      <div class="clue-image">
                        <img :src="changeCarType(item)" width="24" height="24" />
                      </div>
                      <span class="clue-title-image"> {{item.leadsName}}</span>
                    </div>
                    <span :class="item.followup === '未跟进' ? 'nofollowUp' : ''"  class="clue-status">{{item.followup}}</span>
                  </mu-list-item-title>
                  <mu-list-item-sub-title>级别: {{item.leadsLevel}}</mu-list-item-sub-title>
                  <mu-list-item-sub-title>创建人: {{item.createUserName}}</mu-list-item-sub-title>
                  <mu-list-item-sub-title>{{item.createTime}}更新
                  </mu-list-item-sub-title>
                </mu-list-item-content>
                <mu-menu placement="left-start" :open.sync="item.openMenu">
                  <mu-button icon>
                    <mu-icon value=":iconfont icon-gengduovertical"></mu-icon>
                  </mu-button>
                  <mu-list slot="content">
                    <span v-for="(menuItem,index) in myClueMenuList" :key="index" >
                      <mu-list-item button @click="operation(item, menuItem)" v-show="menuItem.flag">
                        <mu-list-item-title>{{menuItem.title}}</mu-list-item-title>
                      </mu-list-item>
                    </span>
                  </mu-list>
                </mu-menu>
              </mu-list-item>
              <mu-divider shallow-inset v-show="index + 1 !== list.length"></mu-divider>
            </div>
          </mu-list>
        </mu-load-more>

      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Screen from '../../components/Screen'
import { mapState } from 'vuex'
export default {
  components:{
    AppBar,Screen
  },
  data(){
    return{
      list:[], //线索列表
      menuList:[],

      myClueMenuList:[],

      drawerList:{
        search:{
          fileTitle:'搜索',
          type:'input',
          placeholder:'线索名称,手机号,电话',
          valueField:'val',
          labelField:'name',
          val:''
        },
        leadsSource:{
          defaultValue:['到店'],
          fileTitle:'线索来源',
          mode:'single',
          valueField:'title',
          labelField:'title',
          list:[{
            title:'到店',
            state:false
          },{
            title:'陌拜',
            state:false
          },{
            title:'转介绍',
            state:false
          },{
            title:'线上询价',
            state:false
          },{
            title:'公司资源',
            state:false
          },{
            title:'个人资源',
            state:false
          }]
        },
        followup:{
          defaultValue:['未跟进'],
          fileTitle:'线索状态',
          mode:'single',
          valueField:'title',
          labelField:'title',
          list:[{
            title:'未跟进',
            state:false
          },{
            title:'已跟进',
            state:false
          }]
        }
      }
    }
  },
  created(){
    this.setMenuList();
    this.getClueList(this.getParams());
  },
  computed: {
    ...mapState({
      leads: state => state.authorities.crm.leads
    })
  },
  methods:{
    changeCarType(row) {
      const {leadsType} = row;
      if(leadsType.indexOf('买车') > -1) {
        return this.loadingImg('car-buy.png');
      }else if(leadsType.indexOf('车贷') > -1) {
        return this.loadingImg('car-loan.png');
      }else{
        return this.loadingImg('car-county.png');
      }
    },
    setMenuList(){
      this.menuList = [{
        title: "新建买车线索",
        linkName: "editBasicsInfo",
        isLink: true,
        linkParams: {
          type: "6",
          state: "add"
        },
        flag: this.leads.save
      },{
        title: "新建车贷线索",
        linkName: "editBasicsInfo",
        isLink: true,
        linkParams: {
          type: "7",
          state: "add"
        },
        flag: this.leads.save
      },{
        title: "新建车险线索",
        linkName: "editBasicsInfo",
        isLink: true,
        linkParams: {
          type: "5",
          state: "add"
        },
        flag: this.leads.save
      }],

      this.myClueMenuList = [{
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
        title:'写跟进',
        flag: true
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
    },
    // 获取线索列表
    getClueList(params){
      console.log(params)
      this.api.getClueList(params).then(res=>{
        if(res.msg !== 'success') this.$toast.warning('线索列表获取失败!');
        if(this.loadUpdate.loadingState === 'default' || this.loadUpdate.loadingState === 'refresh'){
          this.list = res.data.list; this.loadUpdate.refreshing = false;
        }else{
          this.list.push(...res.data.list); this.loadUpdate.loading = false;
        }
        // this.list[0].openMenu = false
        this.loadUpdate.loadedAll = res.data.list.length === 0 ? true : false;
      })
    },
    getParams(){
      let params = {type:1,teamType:0,leadsSource:'到店',followup:'未跟进',...this.paging}
      if(this.tabsActive === 0){
        params.teamType = 1;
      }
      return params
    },
    // 下拉刷新
    refresh(){
      this.refreshHandle();
      this.getClueList(this.getParams());
    },
    // 上拉加载
    load(){
      this.loadHandle();
      this.getClueList(this.getParams());
    },
    getScreenParams(data){
      this.getApiParamsHandle();
      this.getClueList({...this.getParams(),...data});
    },
    changeTabs(item){
      this.changeTabsHandle(item);
      this.getClueList(this.getParams());
    },
    operation(item,menuItem){
      switch (menuItem.title) {
        case '编辑':
          let type = this.getType(item.leadsType)
          this.goPage('editBasicsInfo',{state:'edit',type:type,id:item.leadsId})
          break;
        case '写跟进':
          if(item.followup === '未跟进' || item.followup === '已跟进'){
            this.goPage('writeFollowup',{type:'线索',id:item.leadsId})
          }else{
            this.$toast.warning({time:2000,message:'"未跟进" 或 "已跟进" 才可填写跟进记录 !'});
          }
          break;
        case '分享':
          this.$confirm('是否分享此线索 ?', '提示').then(res=>{
            if(res.result){
              this.goPage('selectShareUsers',{id:item.leadsId,type:'clue'})
            }
          })
          break;
        case '转换为联系人':
          this.$confirm('是否将此线索转换为联系人 ?', '提示').then(res=>{
            if(res.result){
              this.api.clueToContact({leadsIds:item.leadsId}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已转化为联系人!');
                  this.getClueList(this.getParams());
                }else{
                  this.$toast.error('转化为联系人失败!');
                }
              })
            }
          })
          break;
        case '转换为客户':
          this.$confirm('是否将此线索转换为客户 ?', '提示').then(res=>{
            if(res.result){
              this.api.clueToCustomer({leadsIds:item.leadsId}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已转化为客户!')
                  this.getClueList(this.getParams());
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
              this.api.cluePutWaters({ids:item.leadsId}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已放入公海!')
                  this.getClueList();
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
              this.api.clueClose({leadsId:item.leadsId}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已关闭!')
                  this.getClueList();
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
              this.api.clueDelete({leadsIds:item.leadsId}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已删除!')
                  this.getClueList();
                }else{
                  this.$toast.error('删除失败!');
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
}
</script>

<style scoped lang="less">
  .clue{
    .content{
      padding: 94px 0 20px;

      .clueList{
        margin-top: 12px;
      }
      .mu-tabs{
        position: fixed;
        top: 44px;
        z-index: 9;
        box-shadow: 0px 2px 6px 0px #ededed;
      }
      
      .mu-list /deep/ .mu-item{
        position: relative;
        height: auto;
        background-color: #fff;
        padding: 10px 16px;
        .mu-item-title{
          display: flex;
          justify-content: space-between;
          height: auto;
          overflow: visible;
          white-space:normal;
          .clue-title{
            display:flex;
            width: 100%;
            flex: 1;
            align-items: center;
            .clue-title-image{
              width: 100%;
              flex: 1;
            }
            .clue-image{
              margin-right:6px;
              width: 24px;
              height: 24px;        
              display: inline-block;
              img{
                width: 100%;
                height: 100%;
              }
            }
           
          }
          .clue-status{
            width: 120px;
            font-size: 14px;
            color: @regular-text;
            text-align: right;
            margin-left:10px;
          }
          .nofollowUp{
            color: @primary;
          }
        }
          .mu-menu{
            position: absolute;
            right: 14px;
            bottom: 2px;
            width: 20px;
            height: 50%;
            .mu-button{
              position: absolute;
              bottom: 3px;
              right: -18px;
              padding: 0;
              i{
                font-size: 20px;
                color: @primary-text;
              }
            }
        }
      }
    }
  }
</style>