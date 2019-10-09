<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime: 2019-09-09 18:31:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="clue">
    <AppBar pageTitle="线索" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" isMenu :menuList="menuList"></AppBar>
    <div class="content">
    <mu-tabs :value.sync="active" inverse color="primary" indicator-color="primary" center>
      <mu-tab>我的线索</mu-tab>
      <mu-tab>团队线索</mu-tab>
    </mu-tabs>
    <div class="myClue" v-if="active === 0">
      <mu-list textline="two-line">
        <div v-for="(item,index) in clueUserList" :key="index">
          <mu-list-item v-waves>
            <mu-list-item-content @click="goPage('clueDetails',{id:item.leadsId})">
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
      <p>“……是的，我承认从很早以前我都害怕死亡，在医院里被人研究的时候，以前做出布局的时候，其实我很怕死的，因为除了死以外，我没有值得珍惜的东西，很奇怪是吧？恰好是这样我真的很怕死，因为我想要有值得珍惜的东西之后，死亡之后才会不寂寞，我才能够安然的面对死亡……”</p>
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
      clueUserList:[],
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
        isLink:false
      },{
        title:'转换为联系人',
        isLink:false
      },{
        title:'转换为客户',
        isLink:false
      },{
        title:'放入公海',
      },{
        title:'写跟进',
        linkName:'home'
      },{
        title:'关闭',
        isLink:false
      },{
        title:'编辑',
        isLink:true,
      },{
        title:'删除',
        isLink:false
      }]
    }
  },
  created(){
    this.api.getClueList({search:'',type:'1',pageIndex:1,pageSize:15}).then(res=>{
      if(res.msg !== 'success') this.$toast.warning('线索列表获取失败!');
      this.clueUserList = res.data.list
      this.clueUserList[0].openMenu = false
    })
  },
  methods:{
    operation(item,menuItem){
      if(menuItem.isLink && menuItem.title === '编辑'){
        let type = this.getType(item.leadsType)
        this.goPage('editBasicsInfo',{state:'edit',type:type,id:item.leadsId})
        // console.log({state:'edit',type:type,id:item.leadsId})
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

      .myClue{
        background-color: #fff;
        margin-top: 12px;
      }

      /deep/ .mu-tabs{
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