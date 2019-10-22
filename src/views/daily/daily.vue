<template>
  <div class="daily">
    <AppBar pageTitle="日报" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" rightLinkName="addDaily">
      <!-- 抽屉 -->
      <Screen slot="drawerContent" :drawerList="drawerList" @getApiParams="getApiParams"></Screen>
    </AppBar>
    <div class="content">
      <mu-tabs :value.sync="tabsActive" @change="changeTabs" inverse color="primary" indicator-color="primary" center>
        <mu-tab>全部</mu-tab>
        <mu-tab>我发出的</mu-tab>
        <mu-tab>我收到的</mu-tab>
      </mu-tabs>
      <div class="myDaily">
        <mu-load-more :refreshing="refreshing" @refresh="refresh" :loading="loading" @load="load">
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
                  <span>评论({{item.replyList[0] ? item.replyList[0].childCommentList.length : 0}})</span>
                </div>
                <div class="dateTime">{{item.replyList[0] ? item.replyList[0].createTime : ''}}</div>
              </div>
            </div>
          </mu-expansion-panel>
        </mu-load-more>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Screen from '../../components/Screen'
export default {
  components:{
    AppBar,Screen
  },
  data(){
    return{
      dailyList:[], //日报列表
      drawerList:{
        createUserId:{
          fileTitle:'搜索',
          type:'searchInput',
          placeholder:'搜索内部联系人',
          valueField:'val',
          labelField:'name',
          val:'',
          searchList:[]
        },
        createTime:{
          fileTitle:'创建时间',
          type:'date',
          placeholder:'请选择创建时间',
          val:''
        }
      },
      refreshing:false,
      loading:false,
      loadingState: 'default'
    }
  },
  created(){
    this.getDailyList(this.getParams());
    this.api.getContacts({type:1,teamType:1}).then(res=>{
      if(res.msg !== 'success') this.$toast.warning('联系人列表获取失败!');
      for(let item in res.data){
        for(let item2 of res.data[item]){
          this.drawerList.createUserId.searchList.push({name:item2.contactsName,val:item2.contactsId})
        }
      }
    })
  },
  methods:{
    // 下拉刷新
    refresh(){
      this.paging.pageIndex = 1;
      this.refreshing = true;
      this.loadingState = 'refresh';
      this.getDailyList(this.getParams());
    },
    // 上拉加载
    load(){
      this.paging.pageIndex = ++this.paging.pageIndex;
      this.loading = true;
      this.loadingState = 'load';
      this.getDailyList(this.getParams());
    },
    changeTabs(item){
      window.scrollTo(0,0);
      this.paging.pageIndex = 1;
      this.dailyList = [];

      this.storage.sessionSet('tabsActive',item);
      this.getDailyList(this.getParams());
    },
    getApiParams(data){
      let params = this.getParams();
      this.getDailyList({...params,...data});
    },

    // 获取日报列表
    getDailyList(params){
      this.api.getDailyList(params).then(res=>{
        if(res.msg !== 'success') this.$toast.warning('日报列表获取失败!');
        if(this.loadingState === 'default' || this.loadingState === 'refresh'){
          this.dailyList = res.data.list; this.refreshing = false;
        }else{
          this.dailyList.push(...res.data.list); this.loading = false;
        }
      })
    },
    getParams(){
      let paging = this.paging;
      if(this.tabsActive === 0){
        return {type:0,...paging}
      }else if(this.tabsActive === 1){
        return {type:1,...paging}
      }else if(this.tabsActive === 2){
        return {type:2,...paging}
      }
    },
  }
}
</script>

<style lang="less" scoped >
  .daily{
    .content{
      padding-top: 94px;
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