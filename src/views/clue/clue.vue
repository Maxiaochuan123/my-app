<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime: 2019-10-17 11:14:41
 * @LastEditors: shenah
 -->
<template>
  <div class="clue">
    <AppBar pageTitle="线索" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" isMenu :menuList="menuList">
      <!-- 抽屉 -->
      <Screen slot="drawerContent" :drawerList="drawerList" :screenApi="this.api.getClueList" @resetList="resetList"></Screen>
    </AppBar>
    <div class="content">
    <mu-tabs :value.sync="active" @change="changeTabs" inverse color="primary" indicator-color="primary" center>
      <mu-tab>我的线索</mu-tab>
      <mu-tab>团队线索</mu-tab>
    </mu-tabs>
    <div class="myClue" v-if="active === 0">
      <mu-list textline="two-line">
        <div v-for="(item,index) in clueUserList" :key="index">
          <mu-list-item v-waves>
            <mu-list-item-content @click="goPage('clueDetails',{id:item.leadsId,type:'线索'})">
              <mu-list-item-title>{{item.ownerUserName}}
                <span :class="item.followup === '未跟进' ? 'nofollowUp' : ''">{{item.followup}}</span>
              </mu-list-item-title>
              <mu-list-item-sub-title>创建人: {{item.createUserName}}</mu-list-item-sub-title>
              <mu-list-item-sub-title>{{item.createTime}}更新
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-menu placement="left-start" :open.sync="item.openMenu">
              <mu-button icon>
                <mu-icon value=":iconfont icon-gengduovertical"></mu-icon>
              </mu-button>
              <mu-list slot="content">
                <mu-list-item button v-for="(menuItem,index) in myClueMenuList" :key="index" @click="operation(item, menuItem)">
                  <mu-list-item-title>{{menuItem.title}}</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-menu>
          </mu-list-item>
          <mu-divider shallow-inset v-show="index + 1 !== clueUserList.length"></mu-divider>
        </div>
      </mu-list>
    </div>
    <div class="teamClue" v-if="active === 1">
      <mu-list textline="two-line">
        <div v-for="(item,index) in clueTeamList" :key="index">
          <mu-list-item v-waves>
            <mu-list-item-content @click="goPage('clueDetails',{id:item.leadsId,type:'线索'})">
              <mu-list-item-title>{{item.ownerUserName}}
                <span :class="item.followup === '未跟进' ? 'nofollowUp' : ''">{{item.followup}}</span>
              </mu-list-item-title>
              <mu-list-item-sub-title>创建人: {{item.createUserName}}</mu-list-item-sub-title>
              <mu-list-item-sub-title>{{item.createTime}}更新
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-menu placement="left-start" :open.sync="item.openMenu">
              <mu-button icon>
                <mu-icon value=":iconfont icon-gengduovertical"></mu-icon>
              </mu-button>
              <mu-list slot="content">
                <mu-list-item button v-for="(menuItem,index) in myClueMenuList" :key="index" @click="operation(item, menuItem)">
                  <mu-list-item-title>{{menuItem.title}}</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-menu>
          </mu-list-item>
          <mu-divider shallow-inset v-show="index + 1 !== clueTeamList.length"></mu-divider>
        </div>
      </mu-list>
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
      active:this.$store.state.activeTabs,
      clueUserList:[], //个人线索
      clueTeamList:[], //团队线索
      menuList:[{
        title: "新建买车线索",
        linkName: "editBasicsInfo",
        isLink: true,
        linkParams: {
          type: "6",
          state: "add"
        }
      },{
        title: "新建车贷线索",
        linkName: "editBasicsInfo",
        isLink: true,
        linkParams: {
          type: "7",
          state: "add"
        }
      },{
        title: "新建车险线索",
        linkName: "editBasicsInfo",
        isLink: true,
        linkParams: {
          type: "5",
          state: "add"
        }
      }],

      myClueMenuList:[{
        title:'分享',
      },{
        title:'转换为联系人',
      },{
        title:'转换为客户',
      },{
        title:'放入公海',
      },{
        title:'写跟进',
      },{
        title:'关闭',
      },{
        title:'编辑',
      },{
        title:'删除',
      }],

      drawerList:{
        value2:{
          fileTitle:'搜索',
          type:'searchInput',
          placeholder:'搜索线索',
          val:'',
          searchList:[{name:'张三',val:'zs'},{name:'李四',val:'ls'},{name:'王五',val:'ww'},{name:'牛牛',val:'nn'}]
        },
        value7:{
          fileTitle:'创建时间',
          type:'date',
          placeholder:'请选择创建时间',
          val:''
        },
        clueList:{
          defaultValue:['买车','车险'],
          fileTitle:'线索类型',
          mode:'single',
          valueField:'title',
          labelField:'title',
          list:[{
            title:'买车',
            state:false
          },{
            title:'车贷',
            state:false
          },{
            title:'车险',
            state:false
          }]
        },
        clueStateList:{
          defaultValue:['未跟进','已跟进'],
          fileTitle:'线索状态',
          mode:'multiple',
          valueField:'title',
          labelField:'title',
          list:[{
            title:'未跟进',
            state:false
          },{
            title:'已跟进',
            state:false
          },{
            title:'已关闭',
            state:false
          },{
            title:'已转换为联系人',
            state:false
          },{
            title:'已转换为客户',
            state:false
          },{
            title:'已放入公海',
            state:false
          }]
        }
      },
    }
  },
  created(){
    this.getClueList();
    this.getTeamClueList();
  },
  methods:{
    resetList(data){
      console.log(data)
    },
    changeTabs(item){
      this.$store.commit('setActiveTabs',item)
      this.active === 0 ? this.getClueList() : this.getTeamClueList()
    },
    // 获取个人线索
    getClueList(){
      this.api.getClueList({type:1,teamType:1}).then(res=>{
        if(res.msg !== 'success') this.$toast.warning('线索列表获取失败!');
        this.clueUserList = res.data.list
        this.clueUserList[0].openMenu = false
      })
    },
    // 获取团队线索
    getTeamClueList(){
      this.api.getClueList({type:1,teamType:0}).then(res=>{
        if(res.msg !== 'success') this.$toast.warning('线索列表获取失败!');
        this.clueTeamList = res.data.list
        this.clueTeamList[0].openMenu = false
      })
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
              this.goPage('selectUsers',{id:item.leadsId,type:'clue'})
            }
          })
          break;
        case '转换为联系人':
          this.$confirm('是否将此线索转换为联系人 ?', '提示').then(res=>{
            if(res.result){
              this.api.clueToContact({leadsIds:item.leadsId}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已转化为联系人!');
                  this.active === 0 ? this.getClueList() : this.getTeamClueList()
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
                  this.active === 0 ? this.getClueList() : this.getTeamClueList()
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
      padding-top: 98px;
      position: fixed;
      width: 100%;
      height: 100%;
      overflow-y: scroll;

      .myClue,.teamClue{
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