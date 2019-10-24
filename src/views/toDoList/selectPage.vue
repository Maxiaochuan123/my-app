<template>
  <div class="selectPage">
    <div class="app-bar">
      <mu-appbar z-depth="0">
        <mu-button icon slot="left" @click="goBack">
          <mu-icon size="24" :value="`:iconfont icon-fanhui`"></mu-icon>
        </mu-button>
        {{pageTitle}}
        <mu-button icon @click="drawerState = true" v-if="pageTitle === '分配给我的线索' || pageTitle === '分配给我的客户'">
          <mu-icon size="24" :value="`:iconfont icon-guolv`"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-drawer :open.sync="drawerState" right :docked="false">
        <Screen :drawerList="drawerList" @getScreenParams="getScreenParams"  v-if="pageTitle === '分配给我的线索' || pageTitle === '分配给我的客户'"></Screen>
      </mu-drawer>
    </div>

    <div class="content">
      <mu-load-more :refreshing="loadUpdate.refreshing" @refresh="refresh" :loading="loadUpdate.loading" @load="load" :loaded-all="loadUpdate.loadedAll">

        <div class="myClue" v-if="pageTitle === '待跟进线索' || pageTitle === '分配给我的线索'">
          <mu-list class="list" textline="two-line">
            <div v-for="(item,index) in list" :key="index">
              <mu-list-item v-waves>
                <mu-list-item-content @click="goPage('clueDetails',{id:item.leadsId,type:'线索'})">
                  <mu-list-item-title>{{item.ownerUserName}}
                    <span :class="item.followup === '未跟进' ? 'nofollowUp' : ''">{{item.followup}}</span>
                  </mu-list-item-title>
                  <mu-list-item-sub-title>级别: {{item.leadsLevel}}</mu-list-item-sub-title>
                  <mu-list-item-sub-title>创建人: {{item.createUserName}}</mu-list-item-sub-title>
                  <mu-list-item-sub-title>{{item.createTime}}更新
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
              <mu-divider shallow-inset v-show="index + 1 !== list.length"></mu-divider>
            </div>
          </mu-list>
        </div>

        <div class="customer" v-else-if="pageTitle === '分配给我的客户'">
          <div class="customerItem" v-for="(item,index) in list" :key="index" @click="toDetails(item)">
            <div class="title">
              <span class="name">{{item.customerName}}</span> <span class="level">{{item.customerLevel}}</span>
            </div>
            <div class="address">{{item.detailAddress ? item.detailAddress : '暂无详细地址'}}</div>
            <mu-divider shallow-inset v-show="index + 1 !== list.length"></mu-divider>
          </div>
        </div>
          

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

        <div class="toDoList" v-else-if="pageTitle === '待查看的日报'">
          <mu-expansion-panel :zDepth="0" expand v-for="(item,index) in list" :key="index">
            <div slot="header">
              <div class="info">
                <img :src="item.userImg">
                <div>
                  <span class="name">{{item.realname}}</span>
                  <span class="level">{{item.post}}</span>
                </div>
              </div>
            </div>
            <div class="completionstate" @click="goPage('dailyDetails', {id:item.logId})">
              <div class="describe">
                <div>
                  <p class="title">今日重点工作及完成情况：</p>
                  <div class="result">{{item.content}}</div>
                </div>
                <div>
                  <p class="title">明日工作计划：</p>
                  <p class="result">{{item.tomorrow}}</p>
                </div>
                <div>
                  <p class="title">工作感悟：</p>
                  <p class="result">{{item.sentiment}}</p>
                </div>
                <div>
                  <p class="title">工作所需支持：</p>
                  <p class="result">{{item.support}}</p>
                </div>
              </div>
              <mu-divider shallow-inset></mu-divider>
              <div class="commentBox">
                <div class="comment">
                  <img src="../../../static/images/comment.png">
                  <span>评论({{item.replyCount}})</span>
                </div>
                <div class="dateTime">{{item.updateTime}}</div>
              </div>
            </div>
          </mu-expansion-panel>
        </div>

        <div class="visitList" v-else-if="pageTitle === '待查看的拜访'">
          <mu-expansion-panel :zDepth="0" expand v-for="(item,index) in list" :key="index">
            <div slot="header">
              <div class="info">
                <img :src="item.userImg">
                <div>
                  <span class="name">{{item.realname}}</span>
                  <span class="level">{{item.post}}</span>
                </div>
              </div>
            </div>
            <div class="completionstate" @click="goPage('visitDetails', {id:item.visitId})">
              <div class="describe">
                <div>
                  <p class="title">拜访时间：</p>
                  <div class="result">{{item.visitTime}}</div>
                </div>
                <div>
                  <p class="title">拜访客户：</p>
                  <p class="result">{{item.customerName}}</p>
                </div>
                <div>
                  <p class="title">拜访内容：</p>
                  <p class="result">{{item.content}}</p>
                </div>
                <div class="address">
                  <i class="iconfont icon-dingwei"></i>
                  <span>{{item.address}}</span>
                </div>
              </div>
              <mu-divider shallow-inset></mu-divider>
              <div class="commentBox">
                <div class="comment">
                  <img src="../../../static/images/comment.png">
                  <span>评论({{item.replyCount}})</span>
                </div>
                <div class="dateTime">{{item.updateTime}}</div>
              </div>
            </div>
          </mu-expansion-panel>
        </div>
      </mu-load-more>

      <Nothing v-if="list.length <= 0"></Nothing>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Screen from '../../components/Screen'
import IndexsList from '../../components/IndexsList'
import Nothing from '../../components/Nothing'
import Api from "@api";
import { TASK_STATUS } from "@constants/dictionaries";

export default {
  components:{
    AppBar,Screen,IndexsList,Nothing
  },
  data(){
    return{
      list:{}, //列表
      getListApi:'',
      getListParams:{},
      drawerList:{
        isSub:{
          defaultValue:[1],
          fileTitle:'跟进人',
          mode:'single',
          valueField:'value',
          labelField:'title',
          list:[{
            title:'我的',
            value:1,
            state:false
          },{
            title:'下属',
            value:2,
            state:false
          }]
        },
        type:{
          defaultValue:[1],
          fileTitle:'线索状态',
          mode:'single',
          valueField:'value',
          labelField:'title',
          list:[{
            title:'未跟进',
            value:1,
            state:false
          },{
            title:'已跟进',
            value:2,
            state:false
          }]
        }
      },

      // 任务
      TASK_STATUS,
      type:'task',
      
    }
  },
  created(){
    this.getList();
  },
  methods:{
    // 获取列表
    getList(params){
      this.getApi();
      this.getListApi(params ? params : this.getListParams).then(res=>{
        if(res.msg !== 'success') this.$toast.warning('列表获取失败!');
        if(this.loadUpdate.loadingState === 'default' || this.loadUpdate.loadingState === 'refresh'){
          if(res.data.hasOwnProperty('list')){
            this.list = res.data.list;
          }else{
            this.list = res.data;
          }
          this.loadUpdate.refreshing = false;
        }else{
          if(res.data.hasOwnProperty('list')){
            this.list.push(...res.data.list);
          }else{
            this.list.push(...res.data);
          }
          this.loadUpdate.loadedAll = res.data.list.length === 0 ? true : false;
          this.loadUpdate.loading = false;
        }
      })
    },
    getApi(){
      switch (this.pageTitle) {
        case '分配给我的线索':
            this.getListApi = this.api.getAssignToMeClue;
            this.getListParams = {type:1,isSub:1,...this.paging};
          break;
        case '分配给我的客户':
            this.getListApi = this.api.getAssignToMeCustomer;
            this.getListParams = {type:1,isSub:1,...this.paging};
          break;
        case '待执行的任务':
            this.getListApi = this.api.getToBeExecutedTask;
            this.getListParams = {type:1,...this.paging};
          break;
        case '待查看的日报':
            this.getListApi = this.api.getToBeSeenDaily;
            this.getListParams = {type:0,...this.paging};
          break;
        case '待查看的拜访':
            this.getListApi = this.api.getToBeSeenVisit;
            this.getListParams = {type:0,...this.paging};
          break;
      }
    },
    // 下拉刷新
    refresh(){
      this.refreshHandle();
      this.getList();
    },
    // 上拉加载
    load(){
      this.loadHandle();
      this.getList();
    },
    getScreenParams(data){
      this.getApiParamsHandle();
      this.getList({...this.paging,...data})
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
    toDetails(item) {
      this.goPage("customerBasic", { id: item.customerId });
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
      width: 100%;
      height: 100%;

      // 线索
      .myClue{
        margin-top: 12px;
      }

      .mu-tabs{
        position: fixed;
        top: 44px;
        z-index: 9;
        box-shadow: 0px 2px 6px 0px #ededed;
      }

      .mu-list{
        background-color: #fff;
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
      .customer{
        margin-top: 12px;
        .customerItem{
          background-color: #fff;
          padding: 8px 15px;
          .title{
            display: flex;
            justify-content: space-between;
            .name{
              font-size: @primary-size;
              color: @primary-text;
            }
            .level{
              font-size: @regular-size;
              color: @primary;
            }
          }
          .address{
            font-size: @regular-size;
            color: @regular-text;
          }
          /deep/ .mu-divider.shallow-inset{
            margin: 10px 0 0;
          }
        }
      }

      // 任务
      .father-or-sub-list {
        background-color: #fff;
        margin-top: 12px;
        .list-item {
          padding: 10px 15px;
          .task-header {
            display: flex;
            align-items: center;
            .select {
              width: 18px;
              height: 18px;
            }
            .task-header-title {
              flex: 1;
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
          }
          .time {
            margin-top: 4px;
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

      // 日报 / 拜访
      .toDoList,.visitList{
        /deep/ .mu-expansion-panel{
          margin-top: 12px;
          .mu-expansion-panel-header{
            padding: 10px 15px;
          }
          .info{
            display: flex;
            align-items: center;
            img{
              width: 45px;
              height: 45px;
              background-color: #fff;
            }
            div{
              display: flex;
              flex-direction:column;
              margin-left: 12px;
              .name{
                color: @primary-text;
                font-size: @primary-size;
                font-weight: @primary-weight;
              }
              .level{
                color: @regular-text;
                font-size: @regular-size;
              }
            }
          }

          .mu-expansion-panel-content{
            padding: 0 15px;
            .completionstate{
              .describe>div{
                margin-top: 10px;
                .title{
                  font-size: @regular-size;
                  color: @regular-text;
                }
                .result{
                  font-size: @primary-size;
                  color: @primary-text;
                  padding-top: 4px;
                  white-space: pre-wrap;
                  word-wrap: break-word;
                }
                &:last-child{
                  .result{
                    margin-bottom: 10px;
                  }
                }
              }
              
              .commentBox{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                .comment{
                  display: flex;
                  align-items: center;
                  img{
                    width: 24px;
                    height: 24px;
                  }
                  span{
                    color: @primary;
                    font-size: @regular-size;
                  }
                }
                .dateTime{
                  font-size: @regular-size;
                  color: @regular-text;
                }
              }
            }
            .mu-divider.shallow-inset{
              margin-left: 0;
            }
          }
        }
      }
      .visitList{
        .address{
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          i{
            color: #5B98D0;
            font-size: 22px;
          }
          span{
            font-size: @regular-size;
            color: @regular-text;
            margin-left: 8px;
          }
        }
      }
    }
  }
</style>