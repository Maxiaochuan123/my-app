<template>
  <div class="selectPage">
    <div class="app-bar">
      <mu-appbar z-depth="0">
        <mu-button icon slot="left" @click="goBack">
          <mu-icon size="24" :value="`:iconfont icon-fanhui`"></mu-icon>
        </mu-button>
        {{pageTitle}}
        <mu-button icon @click="drawerState = true" v-if="pageTitle === '待跟进线索' || pageTitle === '分配给我的线索'">
          <mu-icon size="24" :value="`:iconfont icon-guolv`"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-drawer :open.sync="drawerState" right :docked="false">
          <Screen :drawerList="drawerList" @getApiParams="getApiParams"  v-if="pageTitle === '待跟进线索' || pageTitle === '分配给我的线索'"></Screen>
      </mu-drawer>
    </div>

    <div class="content">

      <div class="myClue" v-if="pageTitle === '待跟进线索' || pageTitle === '分配给我的线索'">
        <mu-list textline="two-line">
          <div v-for="(item,index) in list" :key="index">
            <mu-list-item v-waves>
              <mu-list-item-content @click="goPage('clueDetails',{id:item.leadsId,type:'线索'})">
                <mu-list-item-title>{{item.ownerUserName}}
                  <span :class="item.followup === '未跟进' ? 'nofollowUp' : ''">{{item.followup}}</span>
                </mu-list-item-title>
                <mu-list-item-sub-title>创建人: {{item.createUserName}}</mu-list-item-sub-title>
                <mu-list-item-sub-title>{{item.createTime}}更新
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider shallow-inset v-show="index + 1 !== list.length"></mu-divider>
          </div>
        </mu-list>
      </div>

      <IndexsList :list="list" :listSpacing="0" :tagTopoffsetTop="45" v-else-if="pageTitle === '分配给我的客户' && Object.keys(list).length > 0" >
        <div @click="toDetails(row)" class="index-customer" slot="row" slot-scope="{row}" >
          <div class="index-customer-wrap">
            <div class="title">
              <span>{{row.customerName}}</span>
              <span class="rank">{{row.customerLevel}}</span>
            </div>
            <div class="sub-title">{{row.detailAddress || '暂无详细地址'}}</div>
          </div>
          <mu-divider v-show="index + 1 !== list.length"></mu-divider>
        </div>
      </IndexsList>

      <div class="father-or-sub-list" v-else-if="pageTitle === '待执行的任务'">
        <div :key="index" @click="taskItemClick(item,index,type)" class="list-item" v-for="(item,index) in list">
          <div class="task-header">
            <span class="task-header-title primary-words">{{item.name}}</span>
            <div :class="{'task-warn':item.status === 2}" class="task-status" >{{item.status | codeInToName(TASK_STATUS)}}</div>
          </div>
          <div class="creat-name regular-words" v-if="type !=='subTask'" >
            <span>创建人:</span>
            <span>{{item.createUser && item.createUser.realname}}</span>
          </div>
          <div class="time regular-words">{{item.stopTime | formatDate('date')}}截止</div>
          <mu-divider class="xian" shallow-inset v-show="index + 1 !== list.length" ></mu-divider>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Screen from '../../components/Screen'
import IndexsList from '../../components/IndexsList'
import Api from "@api";
import { TASK_STATUS } from "@constants/dictionaries";

export default {
  components:{
    AppBar,Screen,IndexsList
  },
  data(){
    return{
      list:{}, //列表
      getListApi:'',
      getListParams:{},
      drawerList:{
        followUp:{
          defaultValue:['我的'],
          fileTitle:'跟进人',
          mode:'single',
          valueField:'title',
          labelField:'title',
          list:[{
            title:'我的',
            state:false
          },{
            title:'下属',
            state:false
          }]
        },
        clue:{
          defaultValue:['今日需跟进'],
          fileTitle:'线索状态',
          mode:'single',
          valueField:'title',
          labelField:'title',
          list:[{
            title:'今日需跟进',
            state:false
          },{
            title:'已逾期',
            state:false
          },{
            title:'已跟进',
            state:false
          }]
        }
      },

      // 任务
      TASK_STATUS,
      type:'task'
    }
  },
  created(){
    this.getList();
    this.getDrawerList();
  },
  methods:{
    // 获取列表
    getList(){
      this.getApi();
      this.getListApi(this.getListParams).then(res=>{
        if(res.msg !== 'success') this.$toast.warning('列表获取失败!');
        if(res.data.hasOwnProperty('list')){
          this.list = res.data.list;
        }else{
          this.list = res.data;
        }
      })
    },
    getApi(){
      switch (this.pageTitle) {
        case '待跟进线索':
            this.getListApi = this.api.getClueList;
            this.getListParams = {type:1,teamType:1};
          break;
        case '分配给我的线索':
            this.getListApi = this.api.getClueList;
            this.getListParams = {type:1,teamType:1};
          break;
        case '分配给我的客户':
            this.getListApi = Api.queryCustomerList;
            this.getListParams = {type:2};
          break;
        case '待执行的任务':
            this.getListApi = Api.queryTaskList;
            this.getListParams = {type:0};
          break;
      }
    },
    getDrawerList(){
      if(this.pageTitle === '分配给我的线索'){
        this.drawerList.clue = {
          defaultValue:['未跟进'],
          fileTitle:'线索状态',
          type:'single',
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
    },
    getApiParams(data){
      this.getApi();
      this.getListApi({...this.getListParams,...data}).then(res=>{
        if(res.msg !== 'success') this.$toast.warning('列表获取失败!');
        if(res.data.hasOwnProperty('list')){
          this.list = res.data.list;
        }else{
          this.list = res.data;
        }
      })
    },
    taskItemClick(row, index, type) {
      if (type === "subTask") {
        // 当前是子任务
        this.$emit("taskItemChange", {
          row,
          index
        });
      } else {
        // 进入详情
        this.goPage("taskBasic", { id: row.taskId });
      }
    },
    toDetails(row) {
      this.goPage("customerBasic", { id: row.customerId });
    },
    goBack(){
      this.$router.go(-1);
    }
  },
  computed:{
    pageTitle(){
      return this.$route.params.pageTitle;
    }
  }
}
</script>

<style lang='less' scoped>
  .selectPage{
    .app-bar {
      .mu-drawer{
        padding: 46px 25px;
      }
      .drawerTitle{
        font-size: 20px;
        font-weight: @primary-weight;
        color: @primary-text;
      }
      .drawerContent{
        margin-top: 20px;
      }
      /deep/ .mu-appbar-left{
        padding-right: 0;
      }
      /deep/ .mu-appbar-title{
        padding-left: 0;
        padding-right: 30px;
      }
      
    }
    /deep/ .app-bar{
      box-shadow: 0px 2px 6px 0px #ededed;
    }

    .content{
      padding: 44px 0 20px;
      position: fixed;
      width: 100%;
      height: 100%;
      overflow-y: scroll;

      // 线索
      .myClue{
        background-color: #fff;
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
        height: 106px;
        .mu-item-title{
          span{
            float: right;
            font-size: 14px;
            color: @regular-text;
          }
          .nofollowUp{
            color: @primary;
          }
        }
      }
      

      // 客户
      .index-customer {
        width: 100%;
        list-style-type: none;
        padding: 10px 0 0 20px;
        .index-customer-wrap {
          width: 100%;
          height: 100%;
          padding-right: 24px;
          .title {
            display: flex;
            font-size: @primary-size;
            font-weight: @primary-weight;
            color: @primary-text;
            justify-content: space-between;
            align-items: center;
            .rank {
              font-size: @regular-size;
              color: #ec191f;
            }
          }
          .sub-title {
            // margin-top: 4px;
            margin-bottom: 10px;
            font-size: @regular-size;
            color: @regular-text;
          }
        }
      }

      // 任务
      .father-or-sub-list {
        background-color: #fff;
        margin-top: 12px;
        .list-item {
          padding-top: 10px;
          padding-right: 15px;
          .task-header {
            display: flex;
            align-items: center;
            .select {
              width: 18px;
              height: 18px;
            }
            .task-header-title {
              flex: 1;
              padding: 0 0 0 24px;
            }
            .task-status {
              text-align: right;
              font-size: @primary-size;
              font-weight: @primary-weight;
              color: @regular-text;
            }
            .task-warn {
              color: @primary;
            }
          }
          .creat-name {
            margin-top: 4px;
            padding-left: 24px;
          }
          .time {
            margin-top: 4px;
            padding-left: 24px;
          }
        }
        /deep/ .mu-drawer{
          width: 99%;
        }
        /deep/ .mu-divider.shallow-inset{
          margin-left: 12px;
        }
        .xian {
          margin-top: 12px;
        }
      }
    }
  }
</style>