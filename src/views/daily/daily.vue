<template>
  <div class="daily">
    <AppBar pageTitle="日报" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" rightLinkName="addDaily" :drawerList="drawerList">
      <!-- 抽屉 -->
      <div slot="drawerContent" class="drawerContent">
        <div class="screen">
          <div class="title">搜索</div>
          <div class="screenInput">
            <!-- <span v-show="!drawerList.value2">搜索内部联系人</span> -->
            <i class="iconfont icon-sousuo1"></i>
            <mu-text-field class="searchInput" v-model="drawerList.value2" placeholder="Please input......"></mu-text-field>
          </div>
        </div>
        <div class="screen">
          <div class="title">创建时间</div>
          <div class="screenInput">
            <span v-show="!drawerList.value7">请选择创建时间</span>
            <i class="iconfont icon-rili"></i>
            <mu-date-input ref="createTime" icon="today" v-model="drawerList.value7" type="date" label-float full-width container="bottomSheet"></mu-date-input>
          </div>
        </div>
        <div class="screen">
          <div class="title">截止时间</div>
          <div class="screenInput">
            <span v-show="!drawerList.value8">请选择截止时间</span>
            <i class="iconfont icon-rili"></i>
            <mu-date-input ref="createTime" icon="today" v-model="drawerList.value8" type="date" label-float full-width container="bottomSheet"></mu-date-input>
          </div>
        </div>

      </div>
    </AppBar>
    <div class="content">
      <mu-tabs :value.sync="active" @change="changeTabs" inverse color="primary" indicator-color="primary" center>
        <mu-tab>全部</mu-tab>
        <mu-tab>我发出的</mu-tab>
        <mu-tab>我收到的</mu-tab>
      </mu-tabs>
      <div class="myClue" v-if="active === 0">
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
          <div class="completionStatus" @click="goPage('dailyDetails', {id:1})">
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
export default {
  components:{
    AppBar
  },
  data(){
    return{
      active:0,
      drawerList:{
        value2:'',
        value7:'',
        value8:'',
      }
    }
  },
  methods:{
    changeTabs(item){
      this.$store.commit('setActiveTabs',item)
    }
  }
}
</script>

<style lang="less" scoped >
  .daily{
    .drawerContent{
      .screen{
        &:not(:first-child){
          margin-top: 20px;
        }
        .title{
          font-size: @primary-size;
          color: @primary-text;
          margin-bottom: 10px;
        }
        .screenInput{
          height: 36px;
          border-radius:6px;
          border:1px solid #9f9f9f;
          position: relative;
          >span{
            position: absolute;
            left: 10px;
            height: 36px;
            line-height: 36px;
            font-size: @regular-size;
            color: @regular-text;
          }
          >i{
            position: absolute;
            right: 10px;
            font-size: 24px;
            color: @regular-text;
          }
          .icon-sousuo1{
            font-size: 18px;
            top: 2px;
          }
          .mu-input{
            margin: 0;
            padding: 0;
            min-height: 0;
            /deep/ .mu-input-icon{
              display: none;
            }
            /deep/ .mu-text-field-input{
              padding-left: 10px;
            }
            /deep/ .mu-text-field{
              width: 96%;
              margin: 2px 0 0 4px;
            }
            // /deep/ .mu-input-label{
            //   top: -20px;
            //   left: 10px;
            // }
          }
        }
      }
    }

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
          .completionStatus{
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