<template>
  <div class="selectPage">
    <div class="app-bar">
      <mu-appbar z-depth="0">
        <mu-button icon slot="left" @click="goBack">
          <mu-icon size="24" :value="`:iconfont icon-fanhui`"></mu-icon>
        </mu-button>
        {{pageTitle}}
        <mu-button icon @click="opeDrawer = true">
          <mu-icon size="24" :value="`:iconfont icon-guolv`"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-drawer :open.sync="opeDrawer" right :docked="false">
        <!-- <div class="drawerContent"> -->
          <!-- <div class="drawerTitle">筛选</div>
          <div class="screen">
            <div class="title">跟进人</div>
            <div class="multipleSelection">
              <div :class="[cule.state ? 'activeSelect' : '']" @click="changeSelect(cule)" v-for="(cule,index) in drawerList.followPersonList" :key="index">{{cule.title}}</div>
            </div>
          </div>
          <div class="screen">
            <div class="title">线索状态</div>
            <div class="multipleSelection">
              <div :class="[cule.state ? 'activeSelect' : '']" @click="changeSelect(cule)" v-for="(cule,index) in drawerList.clueStateList" :key="index">{{cule.title}}</div>
            </div>
          </div> -->
          <Screen :drawerList="drawerList" :screenApi="this.api.getClueList" @resetList="resetList"></Screen>
        <!-- </div> -->
      </mu-drawer>
    </div>

    <div class="content">
      <div class="myClue">
        <mu-list textline="two-line" v-if="pageTitle === '待跟进线索' || pageTitle === '分配给我的线索'">
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

        <IndexsList
          :list="list"
          :listSpacing="0"
          :tagTop="242"
          :tagTopoffsetTop="250"
          v-else-if="pageTitle === '分配给我的线索' && Object.keys(list).length>0"
        >
          <div
            @click="toDetails(row)"
            class="index-customer"
            slot="row"
            slot-scope="{row,index,total}"
          >
            <div class="index-customer-wrap">
              <div class="title">
                <span>{{row.customerName}}</span>
                <span class="rank">{{row.customerLevel}}</span>
              </div>
              <div class="sub-title">{{row.detailAddress || '暂无详细地址'}}</div>
            </div>
            <mu-divider v-if="total-1 !== index"></mu-divider>
          </div>
        </IndexsList>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Screen from '../../components/Screen'
import IndexsList from '../../components/IndexsList'
import Api from "@api";

export default {
  components:{
    AppBar,Screen,IndexsList
  },
  data(){
    return{
      opeDrawer:false,
      list:[], //列表
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
      }
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
      console.log(this.getListApi)
      this.getListApi(this.getListParams).then(res=>{
        if(res.msg !== 'success') this.$toast.warning('列表获取失败!');
        this.list = res.data.list;
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
      }
    },
    getDrawerList(){
      switch (this.pageTitle) {
        case '分配给我的线索':
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
          break;
      }
    },
    resetList(data){

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
    }
  }
</style>