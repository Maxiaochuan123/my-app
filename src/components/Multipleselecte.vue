<!--
 * @Description: 多选框的组件(先写死把,到时候动态)
 * @Author: shenah
 * @Date: 2019-10-14 14:15:39
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-14 18:40:34
 -->
<template>
  <div class="multiple-selecte">
    <div
      @click="multipleSelect"
      class="surround"
    >
      <mu-text-field
        :placeholder="`请选择${name}`"
        :prop="fieldName"
        :rows-max="3"
        disabled
        multi-line
        v-model="showInputValue"
      ></mu-text-field>
      <i class="iconfont icon-rightArrow"></i>
    </div>
    <mu-dialog
      :append-body="false"
      :open.sync="openFullscreen"
      dialog-class="select-multiple-selecte-dialog"
      fullscreen
      transition="slide-bottom"
    >
      <div class="select-multiple-selecte-body">
        <div class="select-multiple-selecte-header">
          <div @click="closeFullscreenDialog">取消</div>
          <div class="primary-words">{{name}}选择</div>
          <div
            @click="submit"
            class="ok"
          >确定</div>
        </div>
        <div class="multiple-selecte-list">
          <SearchInputBar
            @searchInputBarChange="searchInputBarChange"
            placeholderText="搜索"
          ></SearchInputBar>
          <div class="content">
            <div class="content-users">
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
                  <mu-avatar
                    class="user-header"
                    size="40"
                  >
                    <img :src="item.img" />
                  </mu-avatar>
                  <div class="user-info">
                    <div class="name">{{item[textField]}}</div>
                    <div class="job">{{item.post}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import SearchInputBar from "@components/SearchInputBar.vue";
import Api from "@api";
export default {
  name: "Multipleselecte",
  components: { SearchInputBar },
  data() {
    return {
      requestParams: {
        deptId: "",
        search: "",
        needGroup: 0
      },
      openFullscreen: false,
      showInputValue: "",
      showList: [], // 显示的列表
      selectedList: [] // 已经选择
    };
  },
  props: {
    defaultValue: {
      type: String,
      default: ""
    },
    fieldName: {
      type: String,
      default: ""
    },
    multiple: {
      type: String,
      default: ""
    },
    idField: {
      type: String,
      default: ""
    },
    textField: {
      type: String,
      default: ""
    },
    selected: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  watch: {
    defaultValue(val) {
      this.inputValue = this.defaultValue;
      this.showInputValue = this.defaultValue;
    }
  },
  mounted() {
    this.inputValue = this.defaultValue;
    this.showInputValue = this.defaultValue;
  },
  methods: {
    // 处理已经选择的
    handleSelected() {
      if (this.selected.length > 0) {
        this.selectedList = this.selected.split(",").map(item => {
          const [id, label] = item.split("^_^");
          return {
            [this.idField]: id,
            [this.textField]: label
          };
        });
      }
    },
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.search = value;
      this.queryUser();
    },
    queryUser() {
      Api.querySimpleUserByDepId(this.requestParams).then(res => {
        const list = res.data.map(item => ({
          ...item,
          flag: false
        }));
        for (let i = 0; i < this.selectedList.length; i++) {
          const one = this.selectedList[i];
          for (let j = 0; j < list.length; j++) {
            const two = list[j];
            if (one[this.idField] * 1 === two[this.idField] * 1) {
              two.flag = true;
              break;
            }
          }
        }
        this.showList = list;
      });
    },
    select(row) {
      let one = row;
      one.flag = !one.flag;
      if (row.flag) {
        // 选择上了
        this.selectedList.push(row);
      } else {
        // 取消选择
        this.selectedList = this.selectedList.filter(
          item => item[this.idField] * 1 !== row[this.idField]
        );
      }
    },
    multipleSelect() {
      // 点击多选框
      this.openFullscreen = true;
      this.handleSelected();
      this.queryUser();
      this.inputValue = this.defaultValue;
      this.showInputValue = this.defaultValue;
    },
    submit() {
      let ids = this.selectedList.map(item => item[this.idField]).join(",");
      let textIds = this.selectedList
        .map(item => `${item[this.idField]}^_^${item[this.textField]}`)
        .join(",");
      let texts = this.selectedList.map(item => item[this.textField]).join(",");
      this.$emit("multipleselecteChange", {
        ids,
        textIds,
        texts,
        idsField: this.multiple,
        textsField: this.fieldName
      });
      this.openFullscreen = false;
    },
    closeFullscreenDialog() {
      // 取消
      this.clearAll();
      this.openFullscreen = false;
    },
    clearAll() {
      // 清空相应的东西
      this.inputValue = "";
    }
  }
};
</script>
<style lang='less'>
.select-multiple-selecte-dialog {
  .mu-dialog-body {
    height: 100%;
    .select-multiple-selecte-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      .select-multiple-selecte-header {
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
      .multiple-selecte-list {
        width: 100%;
        .content {
          height: 100%;
          padding-top: 40px;
          .content-users {
            width: 100%;
            height: 100%;
            background-color: #fff;
            margin-top: 20px;
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
      }
    }
  }
}
</style>
<style lang='less' scoped>
.multiple-selecte {
  width: 100%;
  height: 100%;
}
</style>