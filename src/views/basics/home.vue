<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:21:55
 * @LastEditTime: 2019-09-04 10:19:30
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
      <mu-paper :z-depth="1" class="blockNav">
        <mu-carousel :cycle="false" :hide-controls="true">
          <mu-carousel-item>
            <div class="gridNav">
              <div class="row">
                <div @click="goPage('/clue')"><img src="../../../static/images/线索.png"><span>线索</span></div>
                <div><img src="../../../static/images/客户.png"><span>客户</span></div>
                <div><img src="../../../static/images/公海.png"><span>公海</span></div>
                <div><img src="../../../static/images/待办.png"><span>待办</span></div>
              </div>
              <div class="row">
                <div><img src="../../../static/images/日报.png"><span>日报</span></div>
                <div><img src="../../../static/images/拜访.png"><span>拜访</span></div>
                <div><img src="../../../static/images/任务.png"><span>任务</span></div>
                <div><img src="../../../static/images/订单.png"><span>订单</span></div>
              </div>
            </div>
          </mu-carousel-item>
          <mu-carousel-item>
            <div class="gridNav">
              <div class="row">
                <div><img src="../../../static/images/线索.png"><span>考勤</span></div>
                <div><img src="../../../static/images/线索.png"><span>统计报表</span></div>
                <div><img src="../../../static/images/线索.png"><span>知识库</span></div>
                <div><img src="../../../static/images/线索.png"><span>查征信</span></div>
              </div>
              <div class="row">
                <div><img src="../../../static/images/线索.png"><span>产品</span></div>
                <div><img src="../../../static/images/线索.png"><span>回款</span></div>
                <div><img src="../../../static/images/线索.png"><span>合同</span></div>
                <div><img src="../../../static/images/线索.png"><span>商机</span></div>
              </div>
            </div>
          </mu-carousel-item>
        </mu-carousel>
      </mu-paper>
      <!-- <p v-for="i in 100" :key="i">{{i}}</p> -->
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
      leftIcon: "icon-lianxiren",
      leftLink: "/contacts",
      iconSize: "24",

      pageTitle: "众汇CRM",

      rightIcon: "icon-tianjia",
      rightLink: "/homeChild",

      isDrawer: true,
      drawerIcon: "icon-shouye2",

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

    }
  }
};
</script>
<style scope lang="less">
.home {
  .content {
    padding: 54px 15px;

    .blockNav{
      border-radius: 10px;
      .mu-carousel {
        height: 210px;
        border-radius: 10px;
        .mu-carousel-indicators {
          height: 20px;
          .mu-icon-button {
            width: 10px;
            height: 10px;
          }
          .mu-carousel-indicator-button{
            margin: 0 5px;
          }
          .mu-carousel-indicator-icon {
            width: 6px;
            height: 6px;
            background-color: #9F9F9F;
          }
        }
        .gridNav {
          height: 190px;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          
          .row {
            width: 100%;
            height: 95px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            
            div {
              height: 66px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              img{
                width: 40px;
                height: 40px;
              }
              span{
                font-size: 14px;
                font-weight: 500;
                color: @primary-text;
                padding-top: 3px;
              }

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
}
</style>