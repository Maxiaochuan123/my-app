<!--
 * @Description:多选(配合关联业务使用)
 * @Author: shenah
 * @Date: 2019-10-14 09:14:34
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-15 15:40:41
 -->

<template>
  <div class="select-info">
    <mu-dialog
      :append-body="false"
      :open.sync="openFullscreen"
      dialog-class="select-relate-business-dialog"
      fullscreen
      transition="slide-bottom"
    >
      <div class="select-relate-business-body">
        <div class="select-relate-business-header">
          <div @click="closeFullscreenDialog">取消</div>
          <div class="primary-words">选择{{nowConfig.name}}</div>
          <div
            @click="submit"
            class="ok"
          >确定</div>
        </div>
        <SearchInputBar
          :placeholderText="`搜索${nowConfig.name}`"
          @searchInputBarChange="searchInputBarChange"
        ></SearchInputBar>
        <div class="relate-business-list">
          <div class="content-users">
            <mu-load-more
              :loading="loading"
              @load="load"
              class="list-wrap"
            >
              <div
                :key="index"
                @click="select(item)"
                class="index-users"
                v-for="(item,index) in showList"
              >
                <div class="index-users-left">
                  <img
                    :src="loadingImg('selected.png')"
                    class="select"
                    v-show="item.flag"
                  />
                  <img
                    :src="loadingImg('no-selected.png')"
                    class="select"
                    v-show="!item.flag"
                  />
                </div>
                <div class="index-users-right">
                  <div class="user-info">
                    <div class="name">{{item[nowConfig.showField]}}</div>
                    <div class="job">{{item[nowConfig.showSubField]}}</div>
                  </div>
                </div>
              </div>
            </mu-load-more>
          </div>
        </div>
        <!-- 已经选择 -->
        <div class="relate-business-now-select">
          <div class="selected">
            <img
              :src="loadingImg('selected.png')"
              height="18"
              width="18"
            />
            <div class="selected-text">
              <span class="one">已经选择:</span>
              <span>{{selectedList.length}}</span>
            </div>
          </div>
        </div>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import SearchInputBar from "@components/SearchInputBar.vue";
import Api from "@api";
export default {
  name: "selectInfo",
  components: { AppBar, SearchInputBar },
  computed: {
    // 当前客户的id
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      openFullscreen: false, // 弹出框的显示
      nowConfig: {}, // 当前的配置项
      requestParams: {
        // 查询可以选择的列表的参数
        search: "",
        type: 1,
        pageIndex: 1,
        pageSize: 15
      },
      noChangeList: [], // 没有改变的时候点击取消还原原来的数组
      showList: [], // 显示的内容
      selectedList: [], // 已经选择
      loading: false
    };
  },
  watch: {
    openFullscreen(val) {
      if (val) {
        // 打开弹窗
        this.selectedList = this.nowConfig.list;
        this.noChangeList = [...this.nowConfig.list];
        this.query();
      }
    }
  },
  methods: {
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.query(true).then(() => {
        this.loading = false;
      });
    },
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.pageIndex = 1;
      this.requestParams.search = value;
      this.query();
    },
    judgeIsSelect(list) {
      const { idField } = this.nowConfig;
      // 判断是否选择上
      for (let i = 0; i < this.selectedList.length; i++) {
        const one = this.selectedList[i];
        for (let j = 0; j < list.length; j++) {
          const two = list[j];
          if (one[idField] === two[idField]) {
            two.flag = true;
            break;
          }
        }
      }
    },
    // 查询
    query(flag) {
      return Api[this.nowConfig.api.query](this.requestParams).then(res => {
        let list = [];
        list = res.data.list.map(item => ({
          ...item,
          flag: false
        }));
        if (list.length === 0) {
          this.requestParams.pageIndex -= 1;
          this.showList = [];
        } else {
          this.judgeIsSelect(list);
          if (flag) {
            this.showList.push(...list);
          } else {
            this.showList = list;
          }
        }
      });
    },
    select(row) {
      const { idField } = this.nowConfig;
      let one = row;
      one.flag = !one.flag;
      if (row.flag) {
        // 选择上了
        this.selectedList.push(row);
      } else {
        // 取消选择
        this.selectedList = this.selectedList.filter(
          item => item[idField] * 1 !== row[idField] * 1
        );
      }
    },
    submit() {
      this.$emit("selectInfoChange", {
        selectedList: this.selectedList,
        operate: "updateRelate",
        menuType: this.nowConfig.type
      });
    },
    closeFullscreenDialog() {
      this.$emit("selectInfoChange", {
        selectedList: this.noChangeList,
        operate: "closeUpdate",
        menuType: this.nowConfig.type
      });
      // 取消
      this.openFullscreen = false;
    }
  }
};
</script>
<style lang='less'>
.select-relate-business-dialog {
  .mu-dialog-body {
    height: 100%;
    .select-relate-business-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      .select-relate-business-header {
        padding: 16px 0px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .ok {
          font-size: 16px;
          color: #ff0000;
        }
      }
      .relate-business-list {
        height: 100%;
        padding-top: 60px;
        padding-bottom: 80px;
        .content-users {
          width: 100%;
          height: 100%;
          background-color: #fff;
          .index-users {
            display: flex;
            padding: 0 0 0 15px;
            align-items: center;
            .index-users-left {
              .select {
                width: 18px;
                height: 18px;
              }
            }
            .index-users-right {
              flex: 1;
              margin-left: 15px;
              display: flex;
              align-items: center;
              padding: 8px 0;
              border-bottom: 1px solid @primary-border;
              .user-info {
                margin-left: 12px;
                .name {
                  font-size: @primary-size;
                  color: @primary-text;
                  font-weight: @primary-weight;
                }
                .job {
                  font-size: @regular-size;
                  color: @regular-text;
                  font-weight: @regular-weight;
                }
              }
            }
          }
        }
      }
      .relate-business-now-select {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 60px;
        padding: 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        .selected {
          display: flex;
          align-items: center;
          .selected-text {
            font-size: @primary-size;
            color: @primary-text;
            margin-left: 10px;
            .one {
              margin-right: 4px;
            }
          }
        }
        .now-select-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .read-write {
          margin-right: 16px;
        }
        .sure {
          font-size: 14px;
          width: 58px;
          height: 28px;
          border-radius: 6px;
          min-width: 0;
        }
      }
      .map-relate-business {
        flex: 1;
        position: relative;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.img-wh {
  width: 18px;
  height: 18px;
}
.select-info {
  width: 100%;
}
</style>