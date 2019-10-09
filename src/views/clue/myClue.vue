<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime: 2019-09-09 18:33:01
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="myClue">
    <div class="content">
      <mu-list textline="two-line">
        <div v-for="(listItem ,index) in userList" :key="index">
          <mu-list-item v-waves>
            <mu-list-item-content @click="goPage('clueDetails',listItem)">
              <mu-list-item-title>{{listItem.title}}
                <span :class="listItem.state === '0' ? 'nofollowUp' : ''">未跟进</span>
              </mu-list-item-title>
              <mu-list-item-sub-title>创建人: {{listItem.createPeople}}</mu-list-item-sub-title>
              <mu-list-item-sub-title>{{listItem.createDate | formatDate}}更新
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-menu placement="left-start" :open.sync="listItem.openMenu">
              <mu-button icon>
                <mu-icon value=":iconfont icon-gengduovertical"></mu-icon>
              </mu-button>
              <mu-list slot="content">
                <mu-list-item button v-for="(menuItem,index) in menuList" :key="index" @click="operation(listItem, menuItem,$event)">
                  <mu-list-item-title>{{menuItem.title}}</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-menu>
          </mu-list-item>
          <mu-divider shallow-inset v-show="index + 1 !== userList.length"></mu-divider>
        </div>
      </mu-list>
      
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      menuList:[{
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
        isLink:false
      },{
        title:'删除',
        isLink:false
      }],
      
      userList:[{
          title:'张三',
          createPeople: '张三',
          createDate:Date.now(),
          state:'0',
          openMenu: false
        },{
          title:'张三',
          createPeople: '张三',
          createDate:Date.now(),
          state:'1',
        },{
          title:'张三',
          createPeople: '张三',
          createDate:Date.now(),
          state:'1'
        },{
          title:'张三',
          createPeople: '张三',
          createDate:Date.now(),
          state:'1'
        },{
          title:'张三',
          createPeople: '张三',
          createDate:Date.now(),
          state:'1'
        },{
          title:'张三',
          createPeople: '张三',
          createDate:Date.now(),
          state:'1'
      }],
    }
  },
  methods:{
    operation(listItem, menuItem){
      if(menuItem.linkName){
        this.goPage(menuItem.linkName)
      }else{
        listItem.openMenu = false
      }
    }
  }
}
</script>

<style scoped lang="less">
  .myClue{
    .content{
      margin-top: 12px;
      background-color: #fff;
      position: fixed;
      width: 100%;
      height: calc(100% - 98px);
      overflow-y: scroll;
      
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