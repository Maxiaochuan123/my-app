<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:21:55
 * @LastEditTime: 2019-08-28 10:14:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="home">
    <div class="hader">
      <AppBar :leftLink="leftLink" :leftIcon="leftIcon" :iconSize="iconSize" :pageTitle="pageTitle" :isDrawer="isDrawer" :drawerIcon="drawerIcon" :isMenu="isMenu" :menuList="menuList" :rightIcon="rightIcon" :rightLink="rightLink">
        <!-- 抽屉 -->
        <div slot="drawerContent">
          
        </div>
      </AppBar>
    </div>
    <div class="content">
      <mu-paper :z-depth="3" class="paper">
        <mu-carousel :cycle="false" :hide-controls="true">
          <mu-carousel-item>
            <div class="gridNav">
              <div class="row">
                <div><i class="iconfont icon-shouye"></i><span>线索</span></div>
                <div><i class="iconfont icon-shouye"></i><span>客户</span></div>
                <div><i class="iconfont icon-shouye"></i><span>公海</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>待办</span></div>
              </div>
              <div class="row">
                <div><i class="iconfont icon-dengdai"></i><span>日报</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>拜访</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>任务</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>订单</span></div>
              </div>
            </div>
          </mu-carousel-item>
          <mu-carousel-item>
            <div class="gridNav">
              <div class="row">
                <div><i class="iconfont icon-dengdai"></i><span>考勤</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>统计报表</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>知识库</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>查征信</span></div>
              </div>
              <div class="row">
                <div><i class="iconfont icon-dengdai"></i><span>产品</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>回款</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>合同</span></div>
                <div><i class="iconfont icon-dengdai"></i><span>商机</span></div>
              </div>
            </div>
          </mu-carousel-item>
        </mu-carousel>
      </mu-paper>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
export default {
  components:{
    AppBar
  },
  data() {
    return {
      leftIcon:'icon-shouye',
      leftLink:'/contacts',
      iconSize: '30',

      pageTitle:'我是title',

      rightIcon:'icon-shouye',
      rightLink:'/homeChild',

      isDrawer:true,
      drawerIcon:'icon-shouye',
      
      isMenu:false,
      menuList:[{
        title:'写日报',
        link:'/homeChild'
      },{
        title:'写拜访',
        link:'/myInfoChild'
      },{
        title:'新增客户',
        link:'/link3'
      },{
        title:'新增任务',
        link:'/link4'
      }]
    };
  },
  methods: {
    goPage() {
      this.$router.goPage();
    }
  }
};
</script>
<style scope lang="less">
.home {
  position: fixed;
  overflow-y: scroll;
  height: calc(100vh - 50px);

  .heder{
    width: 100vw;
    background-color: cornflowerblue;
    position: fixed;

    h2{
      color: aliceblue;
      margin: 0;
    }
  }

  .content {
    padding: 54px 4px 4px;

    .paper{
      // width: 100vw;
      height: 24vh;
    }
    
    .mu-carousel{
      height: 24vh;
      background-color: brown;
      .mu-carousel-indicators{
        height: 22px;
        .mu-icon-button{
          width: 40px;
          height: 40px;
        }
        .mu-carousel-indicator-icon{
          width: 8px;
          height: 8px;
        }
      }
      .gridNav{
        padding: 1px;
        .row{
          display: flex;
          div{
            width: 25%;
            height: 10vh;
            margin: 1px;
            background-color: burlywood;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            i{
              font-size: 28px;
              height: 36px;
            }
          }
        }
      }
    }
  }
}
</style>