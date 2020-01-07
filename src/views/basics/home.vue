<template>
  <div class="home">
    <AppBar
      :iconSize="iconSize"
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
                <div class="order">
                  <img :src="loadingImg('order.png')" />
                  <span>订单</span>
                </div>
              </div>
            </div>
          </mu-carousel-item>
          <!-- <mu-carousel-item>
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
          </mu-carousel-item> -->
        </mu-carousel>
      </mu-paper>

      <mu-paper
        :z-depth="0"
        class="businessSituation"
      >
        <div class="titleNav">
          <div class="baseInfo">
            <span class="title">业务概况</span>
            <span
              @click="showPicker(0,0)"
              class="month"
            >
              [{{businessOverview.select_1.text}}]
              <i class="iconfont icon-xiajiantou1"></i>
            </span>
          </div>
          <div class="tabBar">
            <span
              :class="['team', businessOverview.teamType === '0' ? 'active' : '']"
              @click="getTeamType('0',0)"
            >团队</span>
            <span>|</span>
            <span
              :class="['personal', businessOverview.teamType === '1' ? 'active' : '']"
              @click="getTeamType('1',0)"
            >个人</span>
          </div>
        </div>
        <!-- <div
          :key="index"
          class="sliderBox"
          v-for="(item,index) in businessOverview.sliderList"
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
        </div> -->
        <div class="blockNumber">
          <div
            :key="index"
            class="block"
            v-for="(item,index) in businessOverview.blockNumberList"
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

      <!-- <mu-paper
        :z-depth="0"
        class="rankingList"
      >
        <div class="titleNav">
          <div class="baseInfo">
            <span class="title">排行榜</span>
            <span
              @click="showPicker(0,1)"
              class="month"
            >
              [{{rankingList.select_1.text}}]
              <i class="iconfont icon-xiajiantou1"></i>
            </span>
            <span
              @click="showPicker(1,1)"
              class="money"
            >
              [{{rankingList.select_2.text}}]
              <i class="iconfont icon-xiajiantou1"></i>
            </span>
          </div>
          <div class="tabBar">
            <span
              :class="['team', rankingList.teamType === '0' ? 'active' : '']"
              @click="getTeamType('0',1)"
            >团队</span>
            <span>|</span>
            <span
              :class="['personal', rankingList.teamType === '1' ? 'active' : '']"
              @click="getTeamType('1',1)"
            >个人</span>
          </div>
        </div>
        <div class="companyRanking">
          <div
            :key="index"
            class="block"
            v-for="(item,index) in rankingList.companyRankingLsit"
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
      </mu-paper> -->
      <!-- 弹出选择器 -->
      <Picker
        :anchor="pickerAnchor"
        :data="pickerList"
        :textTitle="pickerTitle"
        @confirm="pickerConfirm"
        name="name"
        picker-class="pickerClass"
        ref="picker"
      ></Picker>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import Picker from "dm-vue-picker-h5";
import Theme from "muse-ui/lib/theme";
import myTheme from "../../../static/json/myTheme.json";
import Api from "@api";
import tool from "@static/js/tool.js";
export default {
  components: {
    AppBar,
    Picker
  },
  data() {
    return {
      leftLinkName: "contacts",
      leftIcon: "icon-lianxiren",
      iconSize: "24",
      pageTitle: "众汇CRM",
      rightIcon: "icon-tianjia",
      rightLinkName: "homeChild",
      isDrawer: false,
      isMenu: true,

      menuList: [
        {
          title: "写日报",
          linkName: "addDaily",
          isLink: true,
          flag: true
        },
        {
          title: "写拜访",
          linkName: "addOrEditVisit",
          isLink: true,
          flag: true
        },
        {
          title: "新增客户",
          linkName: "addOrEditCustomer",
          isLink: true,
          flag: true
        },
        {
          title: "新增任务",
          linkName: "addOrEditTask",
          isLink: true,
          flag: true
        }
      ],
      businessOverview: {
        teamType: "1", // 0:团队 1:个人
        select_1: {
          text: "今天",
          value: "today",
          pickerAnchor: [0] // 下拉选默认值
        },
        blockNumberList: [
          {
            src: "../../../static/images/homeClue.png",
            number: "0",
            title: "新增线索"
          },
          {
            src: "../../../static/images/homeUser.png",
            number: "0",
            title: "新增客户"
          },
          {
            src: "../../../static/images/homeRecord.png",
            number: "0",
            title: "跟进记录"
          },
          {
            src: "../../../static/images/homeContacts.png",
            number: "0",
            title: "新增联系人"
          }
        ],
        sliderList: [
          {
            title: "万",
            val: 30
          },
          {
            title: "单",
            val: 60
          }
        ]
      },
      rankingList: {
        teamType: "1", // 0:团队 1:个人
        select_1: {
          text: "本月",
          value: "month",
          pickerAnchor: [4] // 下拉选默认值
        },
        select_2: {
          text: "金额",
          value: "",
          pickerAnchor: [2] // 下拉选默认值
        },
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
      },
      dataAnalysis: {},
      screenType: 0, // 0:业务概况 1:排行榜
      selectType: 0, // 0:时间 1:其他

      pickerTitle: "", // 下拉选的title
      pickerList: [], // 下拉选列表
      pickerAnchor: [0] // 下拉选默认值
    };
  },
  created() {
    // 阻止浏览器返回
    if (window.history && window.history.pushState) {
      // 往历史记录里面添加一条新的当前页面的url
      history.pushState(null, null, document.URL);
      // 给 popstate 绑定一个方法 监听页面刷新
      window.addEventListener('popstate', this.goBack, false);//false阻止默认事件
    }

    // 判断是否有token来进行操作
    this.judgeUrlToken();
    this.getDataAnalysis(this.getParams());
    let activTheme = this.storage.localGet("theme");
    if (activTheme) {
      Theme.add("theme_one", activTheme, "light");
      Theme.use("theme_one");
    } else {
      this.storage.localSet("theme", myTheme[0]);
    }
  },
  destroyed() {
    window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
  },
  methods: {
    goBack() {
      history.pushState(null, null, document.URL);
    },
    judgeUrlToken() {
      let { token } = this.$route.query;
      if (token) {
        // 证明是从原生进入的
        this.$store.commit("setToken", token);
        this.storage.localSet("login", { accessToken: token });
        this.queryLoginRight();
        this.queryUser();
      }
    },
    queryLoginRight() {
      return Api.getAuthorByToken().then(res => {
        this.$store.commit("setAuthor", res.data);
      });
    },
    queryUser() {
      return Api.getCurrentUserByToken().then(res => {
        this.$store.commit("setUser", res.data);
      });
    },
    // 获取首页数据
    getDataAnalysis() {
      this.api.getDataAnalysis(this.getParams()).then(res => {
        this.dataAnalysis = res.data;
        this.businessOverview.blockNumberList[0].number =
          res.data.leadsCount || 0;
        this.businessOverview.blockNumberList[1].number =
          res.data.customerCount || 0;
        this.businessOverview.blockNumberList[2].number =
          res.data.recordCount || 0;
        this.businessOverview.blockNumberList[3].number =
          res.data.contactsCount || 0;
      });
    },
    // 获取 API 参数
    getParams() {
      let params = { teamType: "", type: "" };
      if (this.screenType === 0) {
        params.teamType = this.businessOverview.teamType;
        params.type = this.businessOverview.select_1.value || "month";
      } else if (this.screenType === 1) {
        params.teamType = this.rankingList.teamType;
        params.type = this.rankingList.select_1.value || "month";
      }
      return params;
    },
    // show picker
    showPicker(selectType, screenType) {
      this.getPickerList(selectType);
      this.$refs.picker.show();

      if (screenType === 0) {
        this.pickerAnchor = this.businessOverview.select_1.pickerAnchor;
      } else if (screenType === 1) {
        if (selectType === 0) {
          this.pickerAnchor = this.rankingList.select_1.pickerAnchor;
        } else if (selectType === 1) {
          this.pickerAnchor = this.rankingList.select_2.pickerAnchor;
        }
      }

      this.selectType = selectType;
      this.screenType = screenType;
    },
    // confirm picker
    pickerConfirm(value, column, text) {
      if (this.screenType === 0) {
        this.businessOverview.select_1.value = value[0];
        this.businessOverview.select_1.text = text[0];
        this.businessOverview.select_1.pickerAnchor = column;
      } else if (this.screenType === 1) {
        if (this.selectType === 0) {
          this.rankingList.select_1.value = value[0];
          this.rankingList.select_1.text = text[0];
          this.rankingList.select_1.pickerAnchor = column;
        } else if (this.selectType === 1) {
          this.rankingList.select_2.value = value[0];
          this.rankingList.select_2.text = text[0];
          this.rankingList.select_2.pickerAnchor = column;
        }
      }
      this.pickerAnchor = column;
      this.getDataAnalysis();
    },
    // 获取 pickerList
    getPickerList(selectType) {
      if (selectType === 0) {
        this.pickerList = [
          {
            text: "今天",
            value: "today"
          },
          {
            text: "昨天",
            value: "yesterday"
          },
          {
            text: "本周",
            value: "week"
          },
          {
            text: "上周",
            value: "lastWeek"
          },
          {
            text: "本月",
            value: "month"
          },
          {
            text: "上月",
            value: "lastMonth"
          },
          {
            text: "本季度",
            value: "quarter"
          },
          {
            text: "上季度",
            value: "lastQuarter"
          },
          {
            text: "本年",
            value: "year"
          },
          {
            text: "上年",
            value: "lastYear"
          }
        ];
      } else if (selectType === 1) {
        this.pickerList = [
          {
            text: "订单",
            value: "订单"
          },
          {
            text: "完成",
            value: "完成"
          },
          {
            text: "金额",
            value: "金额"
          }
        ];
      }
    },
    // 个人 / 团队 切换
    getTeamType(teamType, screenType) {
      this.screenType = screenType;
      if (this.screenType === 0) {
        this.businessOverview.teamType = teamType;
      } else if (this.screenType === 1) {
        this.rankingList.teamType = teamType;
      }
      this.getDataAnalysis();
    },

    // 换肤
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
    overflow: auto;
    padding: 54px 15px 70px;
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
          width: 48%;
          height: 66px;
          box-shadow: 0px 4px 12px 0px rgba(237, 237, 237, 1);
          border-radius: 6px;
          margin-bottom: 14px;
          padding: 10px 0 10px 7%;
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
              margin-left: 9%;
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
  /deep/ .app-bar {
    box-shadow: 0px 2px 6px 0px #ededed;
  }
  .order{
    img{
      filter: grayscale(1);
    }
  }
}
</style>