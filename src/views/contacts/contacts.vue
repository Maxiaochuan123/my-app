<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime: 2019-09-09 18:33:37
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="contacts">
    <AppBar pageTitle="个人联系人" rightIcon="icon-tianjia" rightLinkName="addContacts" :rightLinkParams="{type:'addPersonal'}"></AppBar>
    
    <div class="content">
      <SearchBar :list="sheachList" placeholderText="搜索联系人" pageLinkName="contactsDetails" setStoreMethodName="setInfo"></SearchBar>
      <div class="organization">
        <mu-list>
          <mu-list-item v-waves button @click="goPage('organization')">
            <mu-list-item-action>
              <mu-avatar>
                <img :src="loadingImg('公司部门.png')">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>公司部门</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider shallow-inset></mu-divider>
          <mu-list-item v-waves button @click="goPage('teamContacts')">
            <mu-list-item-action>
              <mu-avatar>
                <img :src="loadingImg('团队联系人.png')" >
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>团队联系人</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
      <IndexsList :tagTop="242" :tagTopoffsetTop="250" :listSpacing="198" :list="userList">
        <div slot="row" slot-scope="{row}" class="user-index" @click="goPage('contactsDetails',row,{},'setInfo')">
          <img :src="loadingImg('默认头像.png')" />
          <div>
            <span>{{row.name}}</span>
            <span>{{row.remark}}</span>
            <i class="iconfont icon-dianhua"></i>
          </div>
        </div>
      </IndexsList>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import IndexsList from "../../components/IndexsList";
import SearchBar from "../../components/SearchBar";

// import userList from '../../../static/json/userList'
export default {
  components: {
    AppBar,
    IndexsList,
    SearchBar
  },
  data() {
    return {
      userList:{},
      sheachList:[]
    };
  },
  created(){
    this.api.getContacts({search:'',type:3}).then(res=>{
      this.userList = res.data
      this.sheachList.push(res.data)
    })
  }
};
</script>

<style scoped lang="less">
.contacts {
  .content {
    width: 100vw;
    height: 100vh;
    padding-top: 44px;
    position: fixed;
    bottom: 0;

    .organization{
      position: fixed;
      top: 104px;
      width: 100vw;
      height: 120px;
      background-color: #FFF;
      .shallow-inset{
        margin-left: 72px;
      }
    }

    .user-index{
      list-style-type: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: @regular-text;
      height: 66px;
      padding: 0 20px;
      position: relative;
      
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      div {
        width: 86%;
        margin-left: 20px;
        padding: 12px 0;
        
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid @primary-border;
        
        span:nth-child(1){
          font-size: @primary-size;
          font-weight: 400;
          color: @primary-text;
        }
        span:nth-child(2){
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        i{
          font-size: 22px;
          color: @primary;
          position: absolute;
          top: 24px;
          right: 36px;
        }
        
      }
    }
  }
}
</style>