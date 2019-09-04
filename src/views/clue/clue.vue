<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 10:13:29
 * @LastEditTime: 2019-09-04 14:38:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="clue">
    <AppBar leftLink="/home" isDrawer drawerIcon="icon-guolv" rightIcon="icon-tianjia" isMenu :menuList="menuList"></AppBar>
    <div class="content">
      <mu-tabs :value.sync="active1" inverse color="primary"  indicator-color="primary"  center>
        <mu-tab to="/myClue">TAB ITEM 1</mu-tab>
        <mu-tab to="/teamClue">TAB ITEM 2</mu-tab>
      </mu-tabs>
      <div class="demo-text">
        <router-view></router-view>
      </div>
      <!-- <div class="demo-text" v-if="active1 === 0">
        <p>“……是的 1，我承认从很早以前我都害怕死亡，在医院里被人研究的时候，以前做出布局的时候，其实我很怕死的，因为除了死以外，我没有值得珍惜的东西，很奇怪是吧？恰好是这样我真的很怕死，因为我想要有值得珍惜的东西之后，死亡之后才会不寂寞，我才能够安然的面对死亡……”</p>
      </div>
      <div class="demo-text" v-if="active1 === 1">
        <p>“……是的 2，我承认从很早以前我都害怕死亡，在医院里被人研究的时候，以前做出布局的时候，其实我很怕死的，因为除了死以外，我没有值得珍惜的东西，很奇怪是吧？恰好是这样我真的很怕死，因为我想要有值得珍惜的东西之后，死亡之后才会不寂寞，我才能够安然的面对死亡……”</p>
      </div> -->
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
      menuList:[{
        title: "新建买车线索",
        link: "",
        isLink: true
      },{
        title: "新建车贷线索",
        link: "",
        isLink: true
      },{
        title: "新建车险线索",
        link: "",
        isLink: true
      }],
      active1: 0
    }
  }
}
</script>

<style scoped lang="less">
  .clue{
    .content{
      padding-top: 44px;
    }
  }
</style>