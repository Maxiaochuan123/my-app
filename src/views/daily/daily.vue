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
      <div class="myClue">
        <mu-expansion-panel :zDepth="0">
          <div slot="header">
            <div class="info">
              <img src="../../../static/images/default-header.png">
              <div>
                <span class="name">白吵吵</span>
                <span class="level">销售二部/销售顾问</span>
              </div>
            </div>
          </div>
          <div class="completionstate" @click="goPage('dailyDetails', {id:1})">
            <div class="describe">
              <div>
                <p class="title">今日重点工作及完成情况：</p>
                <p class="result">众汇CRM原型设计</p>
              </div>
              <div>
                <p class="title">今日重点工作及完成情况：</p>
                <p class="result">众汇CRM原型设计</p>
              </div>
              <div>
                <p class="title">明日工作计划：</p>
                <p class="result">众汇CRM原型设计</p>
              </div>
              <div>
                <p class="title">工作感悟：</p>
                <p class="result">暂无</p>
              </div>
              <div>
                <p class="title">工作所需支持：</p>
                <p class="result">暂无</p>
              </div>
            </div>
            <mu-divider shallow-inset></mu-divider>
            <div class="commentBox">
              <div class="comment">
                <img src="../../../static/images/comment.png">
                <span>评论(2)</span>
              </div>
              <div class="dateTime">2019/7/22 17:33</div>
            </div>
          </div>
        </mu-expansion-panel>
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
        value2:{
          fileTitle:'搜索',
          type:'searchInput',
          placeholder:'搜索内部联系人',
          valueField:'val',
          labelField:'name',
          val:'',
          searchList:[{name:'张三',val:'zs'},{name:'李四',val:'ls'},{name:'王五',val:'ww'},{name:'牛牛',val:'nn'}]
        },
        value7:{
          fileTitle:'创建时间',
          type:'date',
          placeholder:'请选择创建时间',
          val:''
        }
      },
    }
  },
  created(){
    this.getDailyList(this.getParams());
  },
  methods:{
    changeTabs(item){
      this.storage.sessionSet('tabsActive',item);
      this.getDailyList(this.getParams());
    },
    getApiParams(data){
      let params = this.getParams();
      this.getDailyList({...params,...data});
    },

    // 获取日报列表
    getDailyList(params){
      // this.api.getDailyList(params).then(res=>{
      //   if(res.msg !== 'success') this.$toast.warning('日报列表获取失败!');
      //   this.clueList = res.data.list;
      // })
    },
    getParams(){
      if(this.tabsActive === 0){
        // return {type:1,teamType:1}
      }else{
        // return {type:1,teamType:0}
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