<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 16:21:55
 * @LastEditTime: 2019-10-23 09:37:10
 * @LastEditors: shenah
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
      <div class="content-wrap">
        <mu-paper
          :z-depth="0"
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
                  <div @click="goPage('toDoList')">
                    <img :src="loadingImg('toduList.png')" />
                    <span>待办</span>
                  </div>
                </div>
                <div class="row">
                  <div @click="goPage('daily')">
                    <img :src="loadingImg('daily.png')" />
                    <span>日报</span>
                  </div>
                  <div @click="goPage('visitList')">
                    <img :src="loadingImg('visit.png')" />
                    <span>拜访</span>
                  </div>
                  <div @click="goPage('taskList')">
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

        <mu-paper
          :z-depth="0"
          class="businessSituation"
        >
          <div class="titleNav">
            <div class="baseInfo">
              <span class="title">业务概况</span>
              <span class="month">[9月]</span>
            </div>
            <div class="tabBar">
              <span class="team active">团队</span>
              <span>|</span>
              <span class="personal">个人</span>
            </div>
          </div>
          <div
            :key="index"
            class="sliderBox"
            v-for="(item,index) in sliderList"
          >
            <div class="indicator">
              <div :style="`margin-left: calc(${item.val}% - ${item.val > 94 ? '34' : '14'}px);`">
                <img
                  :style="`transform:rotateY(${item.val > 94 ? '180' : '0'}deg);`"
                  src="../../../static/images/indicator.png"
                />
                <span>{{item.val}}%</span>
              </div>
            </div>
            <div class="slider">
              <div class="bacSlider"></div>
              <div
                :style="`width: ${item.val}%;`"
                class="frontSlider"
              ></div>
            </div>
            <div class="describe">
              <div class="completed">
                已完成
                <span>{{item.val}}{{item.title}}</span>
              </div>
              <div class="target">
                目标
                <span>100{{item.title}}</span>
              </div>
            </div>
          </div>
          <div class="blockNumber">
            <div
              :key="index"
              class="block"
              v-for="(item,index) in blockNumberList"
            >
              <div>
                <img :src="item.src" />
                <div class="describe">
                  <span class="number">{{item.number}}</span>
                  <span class="title">{{item.title}}</span>
                </div>
              </div>
            </div>
          </div>
        </mu-paper>

        <mu-paper
          :z-depth="0"
          class="rankingList"
        >
          <div class="titleNav">
            <div class="baseInfo">
              <span class="title">排行榜</span>
              <span class="month">[9月]</span>
              <span class="money">[金额]</span>
            </div>
            <div class="tabBar">
              <span class="team active">团队</span>
              <span>|</span>
              <span class="personal">个人</span>
            </div>
          </div>
          <div class="companyRanking">
            <div
              :key="index"
              class="block"
              v-for="(item,index) in companyRankingLsit"
            >
              <div class="title">
                <img :src="item.src" />
                <span>{{item.name}}</span>
              </div>
              <div class="money">{{item.money}}万元</div>
            </div>
            <div class="completeList">
              <span class="btn">查看完整排行榜</span>
            </div>
          </div>
        </mu-paper>
      </div>
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
      menuList: [],
      sliderList: [
        {
          title: "万",
          val: 30
        },
        {
          title: "单",
          val: 60
        }
      ],

      blockNumberList: [
        {
          src: "../../../static/images/homeClue.png",
          number: "3",
          title: "新增线索"
        },
        {
          src: "../../../static/images/homeUser.png",
          number: "3",
          title: "新增客户"
        },
        {
          src: "../../../static/images/homeRecord.png",
          number: "3",
          title: "跟进记录"
        },
        {
          src: "../../../static/images/homeOrder.png",
          number: "3",
          title: "新增订单"
        }
      ],
      companyRankingLsit: [
        {
          src: "../../../static/images/first.png",
          name: "贵州分公司",
          money: "486.7"
        },
        {
          src: "../../../static/images/second.png",
          name: "海南分公司",
          money: "486.7"
        },
        {
          src: "../../../static/images/third.png",
          name: "四川分公司",
          money: "486.7"
        }
      ]
    };
  },
  created() {
    this.addMenuList();
    let activTheme = this.storage.localGet("theme");
    if (activTheme) {
      Theme.add("theme_one", activTheme, "light");
      Theme.use("theme_one");
    } else {
      this.storage.localSet("theme", myTheme[0]);
    }
  },
  methods: {
    addMenuList() {
      // 添加menu菜单
      this.menuList = [
        {
          title: "写线索",
          linkName: "homeChild",
          isLink: true
        },
        {
          title: "写日报",
          linkName: "addDaily",
          isLink: true
        },
        {
          title: "写拜访",
          linkName: "addOrEditVisit",
          isLink: true
        },
        {
          title: "新增客户",
          linkName: "addOrEditCustomer",
          isLink: true
        },
        {
          title: "新增任务",
          linkName: "addOrEditTask",
          isLink: true
        },
        {
          title: "新建联系人",
          linkName: "contactsDetails",
          linkParams: { type: "addPersonal" },
          isLink: true
        }
      ];
    },
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 54px 15px 70px;
    .content-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
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
      .titleNav {
        display: flex;
        justify-content: space-between;
        .baseInfo {
          .title {
            font-size: @primary-size;
            color: @primary-text;
            font-weight: 600;
          }
          .month,
          .money {
            font-size: @regular-size;
            color: @primary;
            margin-left: 6px;
          }
          .money {
            margin-left: 0px;
          }
        }
        .tabBar {
          font-size: @regular-size;
          color: @regular-text;
          .team {
            margin-right: 2px;
          }
          .personal {
            margin-left: 2px;
          }
          .active {
            color: @primary;
          }
        }
      }
      .businessSituation,
      .rankingList {
        width: 100%;
        margin-top: 12px;
        border-radius: 10px;
        padding: 17px 20px 3px;
      }
      .businessSituation {
        .sliderBox {
          margin-top: 10px;
          .indicator {
            width: 100%;
            height: 32px;

            div {
              width: 50px;
              height: 32px;
              position: relative;
              line-height: 30px;
              color: #fff;
              text-align: center;
              // margin-left: calc(50% - 14px);
              img,
              span {
                width: 50px;
                height: 32px;
                position: absolute;
                left: 0;
              }
            }
          }
          .slider {
            margin-top: 10px;
            height: 6px;
            position: relative;
            div {
              height: 6px;
              border-radius: 10px;
              position: absolute;
            }
            .bacSlider {
              width: 100%;
              background-color: #ededed;
            }
            .frontSlider {
              // width: 50%;
              background-color: @primary;
            }
          }
          .describe {
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
            font-size: @regular-size;
            color: @primary-text;
            .completed {
              span {
                color: @primary;
                font-weight: @regular-weight;
              }
            }
          }
        }

        .blockNumber {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: space-between;
          margin-top: 24px;
          .block {
            width: 148px;
            height: 66px;
            box-shadow: 0px 4px 12px 0px rgba(237, 237, 237, 1);
            border-radius: 6px;
            margin-bottom: 14px;
            padding: 10px 24px;
            > div {
              display: flex;
              align-items: flex-end;
              img {
                width: 30px;
                height: 30px;
              }
              .describe {
                display: flex;
                flex-direction: column;
                margin-left: 12px;
                .number {
                  height: 26px;
                  line-height: 26px;
                  font-size: 20px;
                  color: @primary-text;
                  text-align: center;
                  font-weight: 600;
                }
                .title {
                  height: 16px;
                  line-height: 16px;
                  font-size: @regular-size;
                  color: @primary-text;
                }
              }
            }
          }
        }
      }
      .rankingList {
        padding-bottom: 17px;
        .companyRanking {
          .block {
            padding: 12px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: @primary-text;
            font-size: @regular-size;
            font-weight: @primary-weight;
            border-bottom: 1px solid #f8f8f8;
            .title {
              display: flex;
              align-items: center;
              img {
                width: 30px;
                height: 32px;
              }
              span {
                margin-left: 10px;
              }
            }
          }
          .completeList {
            width: 100%;
            margin-top: 16px;
            display: flex;
            justify-content: center;
            .btn {
              display: inline-block;
              padding: 2px 10px;
              color: @primary;
              border: 1px solid @primary;
              border-radius: 6px;
            }
          }
        }
      }
    }
  }
  /deep/ .app-bar {
    box-shadow: 0px 2px 6px 0px #ededed;
  }
}
</style>