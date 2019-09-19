<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime: 2019-09-09 18:34:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="teamContacts">
    <AppBar  :pageTitle="title"></AppBar>
    
    <div class="content">
      <SearchBar :list="userList" placeholderText="搜索联系人"></SearchBar>
        <IndexsList :list="userList">
          <div slot="row" slot-scope="{row}" class="user-index">
            <img :src="loadingImg('默认头像.png')" />
            <div>
              <span>{{row.Fsinger_name}}</span>
              <span>{{row.describe}}</span>
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
import { mapState } from 'vuex'
export default {
  components: {
    AppBar,
    IndexsList,
    SearchBar
  },
  data() {
    return {
      title: "联系人"
    };
  },
  computed:{
    ...mapState(['userList'])
  }
};
</script>

<style scoped lang="less">
.teamContacts {
  .content {
    width: 100vw;
    height: 100vh;
    padding-top: 44px;
    position: fixed;
    bottom: 0;
    
    .user-index{
      list-style-type: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: @regular-text;
      height: 66px;
      padding: 0 20px;
      
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      div {
        width: 86%;
        margin-left: 20px;
        padding: 12px 0;
        position: relative;
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
          right: 20px;
        }
        
      }
    }
  }
}
</style>