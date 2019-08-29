<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:21:55
 * @LastEditTime: 2019-08-29 17:37:24
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="home">
    <AppBar
      :leftLink="leftLink"
      :leftIcon="leftIcon"
      :iconSize="iconSize"
      :pageTitle="pageTitle"
      :isDrawer="isDrawer"
      :drawerIcon="drawerIcon"
      :isMenu="isMenu"
      :menuList="menuList"
      :rightIcon="rightIcon"
      :rightLink="rightLink"
    >
      <!-- 抽屉 -->
      <div slot="drawerContent">
        <mu-button color="primary" @click="changeTheme('theme_one')">
          theme_one
        </mu-button>
        <mu-button color="orange" @click="changeTheme('theme_two')">
          theme_two
        </mu-button>
        <mu-button color="red" @click="changeTheme('theme_three')">
          Btheme_three
        </mu-button>
      </div>
    </AppBar>
    
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
      <p v-for="i in 100" :key="i">{{i}}</p>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Theme from 'muse-ui/lib/theme';
import myTheme from '../../../static/json/myTheme.json'

export default {
  components: {
    AppBar
  },
  data() {
    return {
      leftIcon: "icon-shouye",
      leftLink: "/contacts",
      iconSize: "30",

      pageTitle: "我是title",

      rightIcon: "icon-shouye",
      rightLink: "/homeChild",

      isDrawer: true,
      drawerIcon: "icon-shouye",

      isMenu: true,
      menuList: [
        {
          title: "写日报",
          link: "/homeChild"
        },
        {
          title: "写拜访",
          link: "/myInfoChild"
        },
        {
          title: "新增客户",
          link: "/link3"
        },
        {
          title: "新增任务",
          link: "/link4"
        }
      ]
    };
  },
  created(){
    let activTheme = this.storage.localGet('theme');
    if(activTheme){
      Theme.add('theme_one',activTheme,'light')
      Theme.use('theme_one')
    }else{
      this.storage.localSet('theme',myTheme[0])
    }
  },
  methods: {
    changeTheme(themeName){
      let theme = {}

      switch(themeName){
        case 'theme_one':
          theme = myTheme[0];
          break;
        case 'theme_two':
          theme = myTheme[1];
          break;
        case 'theme_three':
          theme = myTheme[2];
          break;
      }
      
      Theme.add(themeName,theme,'light')
      Theme.use(themeName)
      this.storage.localSet('theme',theme)

    },
    goPage() {
      this.$router.goPage();
    }
  }
};
</script>
<style scope lang="less">
.home {
  .content {
    padding: 54px 4px;
    .mu-carousel {
      height: 24vh;
      background-color: brown;
      .mu-carousel-indicators {
        height: 22px;
        .mu-icon-button {
          width: 40px;
          height: 40px;
        }
        .mu-carousel-indicator-icon {
          width: 8px;
          height: 8px;
        }
      }
      .gridNav {
        height: 21vh;
        background-color: blueviolet;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        
        .row{
          width: 100%;
          height: 10vh;
          background-color: cadetblue;
        }
        .row:last-child{
          background-color: #13C2C2;
        }
        .row {
        //   width: 100%;
          // background-color: aquamarine;
          
          display: flex;
          justify-content: space-around;
          
          div {
            width: 20%;
        //     height: 10vh;
        //     // margin: 1px;
            background-color: burlywood;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            i {
              font-size: 24px;
              height: 34px;
            }
          }
        }
      }
    }
  }
}
</style>