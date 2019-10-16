<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime: 2019-09-09 18:34:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="teamContacts">
    <AppBar pageTitle="联系人"></AppBar>
    
    <div class="content">
      <SearchBar :list="sheachList" placeholderText="搜索联系人"></SearchBar>
        <IndexsList :list="userList" v-if="Object.keys(userList).length > 0">
          <div slot="row" slot-scope="{row}" class="user-index" @click="goPage('contactsDetails',{id: row.contactsId,type:'联系人'})">
          <img :src="loadingImg('defaultImg.png')" />
          <div>
            <span>{{row.name}}</span>
            <span>{{row.remark}}</span>
            <i class="iconfont icon-dianhua"></i>
          </div>
        </div>
      </IndexsList>
      <Nothing words="暂无联系人" v-else></Nothing>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import IndexsList from "../../components/IndexsList";
import SearchBar from "../../components/SearchBar";
import Nothing from '../../components/Nothing'
export default {
  components: {
    AppBar,
    IndexsList,
    SearchBar,
    Nothing
  },
  data() {
    return {
      userList:{},
      sheachList:[],
    };
  },
  created(){
    this.api.getContacts({type:1,teamType:0}).then(res=>{
      if(res.msg !== 'success') this.$toast.warning('联系人列表获取失败!');
      this.userList = res.data
      this.sheachList.push(res.data)
    })
  }
  // computed:{
  //   ...mapState(['userList'])
  // }
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
      // display: flex;
      // justify-content: flex-start;
      // align-items: center;
      color: @regular-text;
      height: 66px;
      padding: 0 20px;
      padding-top: 12px;
      position: relative;
      // background-color: dodgerblue;
      
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      div {
        position: absolute;
        top: 0;
        left: 60px;
        width: 78%;
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
          top: 18px;
          right: 34px;
        }
        
      }
    }
  }
}
</style>