<template>
  <div class="daily">
    <AppBar :topLevelPage="true" pageTitle="日报" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" rightLinkName="addDaily">
      <!-- 抽 屉 -->
      <Screen ref="screen" slot="drawerContent" :drawerList="drawerList" @getScreenParams="getScreenParams"></Screen>
    </AppBar>
    <div class="contentBox">
      <div class="content">
        <mu-tabs :value.sync="tabsActive" @change="changeTabs" inverse color="primary" indicator-color="primary" center>
          <mu-tab>全部</mu-tab>
          <mu-tab>我发出的</mu-tab>
          <mu-tab>我收到的</mu-tab>
        </mu-tabs>
        <div class="myDaily">
          <mu-load-more :refreshing="loadUpdate.refreshing" @refresh="refresh" :loading="loadUpdate.loading" @load="load" :loaded-all="loadUpdate.loadedAll" v-if="dailyList.length > 0">
            <mu-expansion-panel :zDepth="0" expand v-for="(item,index) in dailyList" :key="index">
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
                    <span>评论({{item.replyList ? item.replyList.length : 0}})</span>
                  </div>
                  <div class="dateTime">{{item.createTime}}</div>
                  <!-- <div class="dateTime">{{item.replyList[0] ? item.replyList[item.replyList.length - 1].createTime : ''}}</div> -->
                </div>
              </div>
            </mu-expansion-panel>
          </mu-load-more>
          <Nothing words="暂无日报" v-else></Nothing>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Screen from '../../components/Screen'
import Nothing from '../../components/Nothing'
export default {
  components:{
    AppBar,Screen,Nothing
  },
  data(){
    return{
      dailyList:[], //日报列表
      drawerList:{
        createUserName:{
          fileTitle:'搜索',
          type:'input',
          placeholder:'搜索内部联系人',
          valueField:'val',
          labelField:'name',
          val:'',
        },
        createTime:{
          fileTitle:'创建时间',
          type:'date',
          placeholder:'请选择创建时间',
          val:''
        }
      }
    }
  },
  created(){
    this.getDailyList(this.getParams());
  },
  methods:{
    // 获取日报列表
    getDailyList(params){
      this.api.getDailyList(params).then(res=>{
        if(res.msg !== 'success') this.$toast.warning('日报列表获取失败!');
        if(this.loadUpdate.loadingState === 'default' || this.loadUpdate.loadingState === 'refresh'){
          this.dailyList = res.data.list; this.loadUpdate.refreshing = false;
        }else{
          this.dailyList.push(...res.data.list); this.loadUpdate.loading = false;
        }
        this.loadUpdate.loadedAll = res.data.list.length === 0 ? true : false;
      })
    },
    getParams(){
      if(this.tabsActive === 0){
        return {type:0,...this.paging}
      }else if(this.tabsActive === 1){
        return {type:1,...this.paging}
      }else if(this.tabsActive === 2){
        return {type:2,...this.paging}
      }
    },
    // 下拉刷新
    refresh(){
      this.refreshHandle();
      this.getDailyList({...this.getParams(), ...this.screenData});
    },
    // 上拉加载
    load(){
      this.loadHandle();
      this.getDailyList({...this.getParams(), ...this.screenData});
    },
    getScreenParams(data){
      this.getApiParamsHandle();
      this.screenData = data;
      this.getDailyList({...this.getParams(),...data});
    },
    changeTabs(item){
      this.changeTabsHandle(item);
      this.getDailyList(this.getParams());
    }
  }
}
</script>

<style lang="less" scoped >
  .daily{
    .contentBox{
      height: 100vh;
      overflow: hidden;
    }
    .content{
      height: calc(100vh - 44px);
      overflow-y: scroll;
      margin-top: 94px;
      padding-bottom: 80px;
      
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

      .mu-tabs{
        position: fixed;
        top: 44px;
        z-index: 9;
        box-shadow: 0px 2px 6px 0px #ededed;
      }
    }
  }
</style>