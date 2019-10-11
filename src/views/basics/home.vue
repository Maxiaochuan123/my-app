<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:21:55
 * @LastEditTime: 2019-09-05 11:06:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="home">
    <AppBar
      :drawerIcon="drawerIcon"
      :iconSize="iconSize"
      :isDrawer="isDrawer"
      :isMenu="isMenu"
      :leftIcon="leftIcon"
      :leftLinkName="leftLinkName"
      :menuList="menuList"
      :pageTitle="pageTitle"
      :rightIcon="rightIcon"
      :rightLinkName="rightLinkName"
    >
      <!-- 抽屉 -->
      <div slot="drawerContent">
        <mu-button
          @click="changeTheme('theme_one')"
          color="primary"
        >theme_one</mu-button>
        <mu-button
          @click="changeTheme('theme_two')"
          color="orange"
        >theme_two</mu-button>
        <mu-button
          @click="changeTheme('theme_three')"
          color="red"
        >Btheme_three</mu-button>
      </div>
    </AppBar>

    <div class="content">
      <mu-paper
        :z-depth="1"
        class="blockNav"
      >
        <mu-carousel
          :cycle="false"
          :hide-controls="true"
        >
          <mu-carousel-item>
            <div class="gridNav">
              <div class="row">
                <div @click="goPage('clue')">
                  <img :src="loadingImg('clue.png')" />
                  <span>线索</span>
                </div>
                <div @click="goPage('customerManage')">
                  <img :src="loadingImg('customer.png')" />
                  <span>客户</span>
                </div>
                <div @click="goPage('commonWatersClue')">
                  <img :src="loadingImg('pubSea.png')" />
                  <span>公海</span>
                </div>
                <div>
                  <img :src="loadingImg('toduList.png')" />
                  <span>待办</span>
                </div>
              </div>
              <div class="row">
                <div>
                  <img :src="loadingImg('daily.png')" />
                  <span>日报</span>
                </div>
                <div>
                  <img :src="loadingImg('visit.png')" />
                  <span>拜访</span>
                </div>
                <div>
                  <img :src="loadingImg('task.png')" />
                  <span>任务</span>
                </div>
                <div>
                  <img :src="loadingImg('order.png')" />
                  <span>订单</span>
                </div>
              </div>
            </div>
          </mu-carousel-item>
          <mu-carousel-item>
            <div class="gridNav">
              <div class="row">
                <div>
                  <img :src="loadingImg('daily.png')" />
                  <span>考勤</span>
                </div>
                <div>
                  <img :src="loadingImg('daily.png')" />
                  <span>统计报表</span>
                </div>
                <div>
                  <img :src="loadingImg('daily.png')" />
                  <span>知识库</span>
                </div>
                <div>
                  <img :src="loadingImg('daily.png')" />
                  <span>查征信</span>
                </div>
              </div>
              <div class="row">
                <div>
                  <img :src="loadingImg('daily.png')" />
                  <span>产品</span>
                </div>
                <div>
                  <img :src="loadingImg('daily.png')" />
                  <span>回款</span>
                </div>
                <div>
                  <img :src="loadingImg('daily.png')" />
                  <span>合同</span>
                </div>
                <div>
                  <img :src="loadingImg('daily.png')" />
                  <span>商机</span>
                </div>
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
import AppBar from "../../components/AppBar";
import Theme from "muse-ui/lib/theme";
import myTheme from "../../../static/json/myTheme.json";
export default {
  components: {
    AppBar
  },
  data() {
    return {
      leftLinkName: "contacts",
      leftIcon: "icon-lianxiren",
      iconSize: "24",

      pageTitle: "众汇CRM",

      rightIcon: "icon-tianjia",
      rightLinkName: "homeChild",

      isDrawer: true,
      drawerIcon: "icon-shouye2",

      isMenu: true,
      menuList: [
        {
          title: "写日报",
          linkName: "homeChild"
        },
        {
          title: "写拜访",
          linkName: "myInfoChild"
        },
        {
          title: "新增客户",
          linkName: "addOrEditCustomer",
          isLink: true
        },
        {
          title: "新增任务",
          linkName: "link4"
        }
      ]
    };
  },
  created() {
    let activTheme = this.storage.localGet("theme");
    if (activTheme) {
      Theme.add("theme_one", activTheme, "light");
      Theme.use("theme_one");
    } else {
      this.storage.localSet("theme", myTheme[0]);
    }
  },
  methods: {
    changeTheme(themeName) {
      let theme = {};

      switch (themeName) {
        case "theme_one":
          theme = myTheme[0];
          break;
        case "theme_two":
          theme = myTheme[1];
          break;
        case "theme_three":
          theme = myTheme[2];
          break;
      }

      Theme.add(themeName, theme, "light");
      Theme.use(themeName);
      this.storage.localSet("theme", theme);
    }
  }
};
</script>
<style scope lang="less">
.home {
  .content {
    padding: 54px 15px;

    .blockNav {
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
          .mu-carousel-indicator-button {
            margin: 0 5px;
          }
          .mu-carousel-indicator-icon {
            width: 6px;
            height: 6px;
            background-color: #9f9f9f;
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

              img {
                width: 40px;
                height: 40px;
              }
              span {
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