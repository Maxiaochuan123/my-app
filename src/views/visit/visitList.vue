<!--
 * @Description: 拜访记录
 * @Author: shenah
 * @Date: 2019-10-17 16:47:08
 * @LastEditors  : shenah
 * @LastEditTime : 2020-01-10 10:25:59
 -->

<template>
  <div class="visit-list">
    <AppBar
      drawerIcon="icon-guolv"
      isDrawer
      pageTitle="拜访记录"
      rightIcon="icon-tianjia"
      rightLinkName="addOrEditVisit"
    >
      <!-- 抽屉 -->
      <Screen
        :drawerList="drawerList"
        @getScreenParams="getScreenParams"
        slot="drawerContent"
      ></Screen>
    </AppBar>
    <mu-tabs
      :value="active"
      @change="tabChange"
      center
      class="tabs"
      color="primary"
      indicator-color="primary"
      inverse
    >
      <mu-tab :value="0">全部</mu-tab>
      <mu-tab :value="1">我发出的</mu-tab>
      <mu-tab :value="2">我收到的</mu-tab>
    </mu-tabs>
    <div class="content">
      <div class="content-wrap">
        <mu-load-more
          :loading="loading"
          @load="load"
          class="list-wrap"
        >
          <div v-if="listObj.list.length > 0">
            <div
              :key="index"
              :zDepth="0"
              class="content-visit"
              v-for="(item,index) in listObj.list"
            >
              <div>
                <div class="info">
                  <img :src="item.userImg" />
                  <div>
                    <span class="name">{{item.realname}}</span>
                    <span class="level">{{item.post}}</span>
                  </div>
                </div>
              </div>
              <div
                @click="goPage('visitDetails', {id:item.visitId})"
                class="completionstate"
              >
                <div class="describe">
                  <div>
                    <p class="title">拜访时间：</p>
                    <p class="result">{{item.visitTime | emptyText('暂无拜访时间')}}</p>
                  </div>
                  <div>
                    <p class="title">拜访客户：</p>
                    <p class="result">{{item.customerName}}</p>
                  </div>
                  <div>
                    <p class="title">拜访内容：</p>
                    <p class="result">{{item.content}}</p>
                  </div>
                  <div>
                    <p class="result">
                      <mu-icon
                        color="#5B98D0"
                        size="24"
                        value=":iconfont icon-dingwei"
                      ></mu-icon>
                      <span class="address">{{item.address | emptyText('暂无地址')}}</span>
                    </p>
                  </div>
                </div>
                <mu-divider shallow-inset></mu-divider>
                <div class="commentBox">
                  <div class="comment">
                    <img :src="loadingImg('comment.png')" />
                    <span>评论({{item.replyList.length}})</span>
                  </div>
                  <div class="dateTime">{{item.createTime}}</div>
                </div>
              </div>
            </div>
          </div>
          <Nothing
            :words="words"
            type="no-visits"
            v-else
          ></Nothing>
        </mu-load-more>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar";
import Screen from "@components/Screen.vue";
import Api from "@api";
import Nothing from "@components/Nothing.vue";
export default {
  components: {
    AppBar,
    Screen,
    Nothing
  },
  data() {
    return {
      words: "暂无拜访",
      active: 0,
      loading: false,
      requestParams: {
        type: 0, // 拜访类型 0 全部 ,1 我发出的 ,2 我收到的 ,3 未读
        createUserName: "", // 发出人
        search: "", // 拜访客户/联系人
        createTime: "", // 创建时间
        visitTime: "", // 拜访时间
        pageIndex: 1, // 页码
        pageSize: 15 // 默认每页条数
      },
      drawerList: {}, // 筛选显示的列表
      listObj: {
        list: []
      } // 拜访记录列表
    };
  },
  mounted() {
    this.initScreenList();
    this.queryList();
  },
  methods: {
    initScreenList() {
      this.drawerList = {
        createUserName: {
          fileTitle: "搜索",
          type: "input",
          placeholder: "搜索发出人",
          val: ""
        },
        search: {
          fileTitle: "搜索",
          type: "input",
          placeholder: "搜索拜访客户/联系人",
          val: ""
        },
        createTime: {
          fileTitle: "创建时间",
          type: "date",
          placeholder: "请选择创建时间",
          val: ""
        },
        visitTime: {
          fileTitle: "拜访时间",
          type: "date",
          placeholder: "请选择拜访时间",
          val: ""
        }
      };
    },
    getScreenParams(requestParams) {
      this.requestParams = {
        ...this.requestParams,
        ...requestParams
      };
      this.queryList();
    },
    queryList(flag) {
      return Api.queryVisitList(this.requestParams).then(res => {
        let data = res.data;
        let list = data.list;
        if (list.length === 0 && flag) {
          this.requestParams.pageIndex -= 1;
        }
        if (flag) {
          this.listObj.list.push(...list);
        } else {
          this.listObj = data;
        }
      });
    },
    tabChange(val) {
      this.active = val;
      this.requestParams.type = val;
      this.queryList();
    },
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.queryList(true).then(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped >
.visit-list {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .tabs {
    position: fixed;
    top: 44px;
  }
  .content {
    padding-top: 104px;
    height: 100%;
    overflow: hidden;
    .content-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
      .content-visit {
        width: 100%;
        background-color: #fff;
        margin-bottom: 12px;
        padding: 10px 15px;
        .info {
          display: flex;
          align-items: center;
          img {
            width: 45px;
            height: 45px;
            background-color: #fff;
          }
          div {
            display: flex;
            flex-direction: column;
            margin-left: 12px;
            .name {
              color: @primary-text;
              font-size: @primary-size;
              font-weight: @primary-weight;
            }
            .level {
              color: @regular-text;
              font-size: @regular-size;
            }
          }
        }
        .completionstate {
          .describe > div {
            margin-top: 10px;
            .title {
              font-size: @regular-size;
              color: @regular-text;
            }
            .result {
              font-size: @primary-size;
              color: @primary-text;
              padding-top: 4px;
              .address {
                margin-left: 4px;
              }
            }
            &:last-child {
              .result {
                margin-bottom: 10px;
              }
            }
          }
          .commentBox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            .comment {
              display: flex;
              align-items: center;
              img {
                width: 24px;
                height: 24px;
              }
              span {
                color: @primary;
                font-size: @regular-size;
              }
            }
            .dateTime {
              font-size: @regular-size;
              color: @regular-text;
            }
          }
        }
        .mu-divider.shallow-inset {
          margin-left: 0;
        }
      }
    }
  }
}
</style>