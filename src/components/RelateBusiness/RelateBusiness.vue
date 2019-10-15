<!--
 * @Description: 关联业务组件
 * @Author: shenah
 * @Date: 2019-10-12 17:16:43
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-15 15:44:45
 -->

<template>
  <div class="relate-business">
    <div
      :class="{'no-border-bottom':isHideLine}"
      class="basic-details-item"
    >
      <div class="basic-details-item-left">
        <div class="sub-title">关联业务</div>
      </div>
      <div
        @click="relate"
        class="basic-details-item-right"
      >
        <mu-menu
          :open="open"
          cover
        >
          <mu-icon
            color="primary"
            size="24"
            value=":iconfont icon-guanlianbiaodanbiaogeguanxi"
          ></mu-icon>
          <mu-list slot="content">
            <mu-list-item
              :key="index"
              @click="menuClick(item)"
              button
              v-for="(item,index) in relateMenu"
            >
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </div>
    </div>
    <div class="relate-list">
      <div
        :key="key"
        v-for="(item,key) in infoObj"
      >
        <div v-if="item.list.length>0">
          <div
            :key="index"
            class="relate-list-item"
            v-for="(one,index) in item.list"
          >
            <div>{{item.name}} - {{one[item.showField]}}</div>
            <img
              :src="loadingImg('delete.png')"
              @click.stop="deleteRelate(item,one,index)"
              class="close"
            />
          </div>
        </div>
      </div>
    </div>
    <mu-divider
      style="margin-top:12px;"
      v-if="isHideLine"
    ></mu-divider>
    <SelectInfo
      @selectInfoChange="selectInfoChange"
      ref="selectInfo"
    ></SelectInfo>
  </div>
</template>

<script>
import SelectInfo from "./SelectInfo";
export default {
  name: "RelateBusiness",
  computed: {
    // 新增或者编辑时的模块id(如task的id)
    id() {
      return this.$route.params.id;
    }
  },
  components: { SelectInfo },
  data() {
    return {
      isHideLine: false, // 是否显示与隐藏线
      open: false, // 是否弹出菜单选项
      infoObj: {} // 关联业务的相关配置深拷贝传入的菜单配置
    };
  },
  props: {
    // 关联业务菜单的配置
    relateMenu: {
      type: Object,
      default: () => {}
    },
    // 关联业务的数据里面代表每个菜单类型的数组
    relateData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    relateData(val) {
      Object.keys(val).forEach(item => {
        this.infoObj[item].list = val[item];
      });
      this.judgeShowLine(val);
    }
  },
  mounted() {
    this.infoObj = { ...this.relateMenu };
  },
  methods: {
    judgeShowLine(val) {
      let flag = false;
      Object.keys(val).forEach(item => {
        if (val[item].length > 0) {
          flag = true;
        }
      });
      this.isHideLine = flag;
    },
    relate() {
      this.open = true;
    },
    beforeSub(nowConfig, row, index) {
      const param = {};
      Object.keys(this.infoObj).forEach((key, objIndex) => {
        const { list, idField, subField } = this.infoObj[key];
        if (objIndex === 0) {
          this.infoObj[nowConfig.type].list.splice(index, 1);
        }
        param[subField] = list.map(item => item[idField]).join(",");
      });
      return param;
    },
    /**
     * @description: 删除关联项目
     * @param {Object} nowConfig 当前选项的配置项
     * @param {Object} row 当前删除的这个列表
     * @param {Number} index 那一行被删除
     * @return:
     */
    deleteRelate(nowConfig, row, index) {
      this.$confirm(`是否删除此${nowConfig.name}?`, "提示").then(
        ({ result, value }) => {
          const commonParam = this.beforeSub(nowConfig, row, index);
          if (result) {
            if (this.id) {
              this.$emit("relateBusinessChange", {
                commonParam,
                operate: "del"
              });
            }
          }
        }
      );
    },
    menuClick(row) {
      this.open = false;
      this.$refs.selectInfo.nowConfig = row;
      this.$refs.selectInfo.openFullscreen = true;
    },
    /**
     * @description: 选择
     * @param {Array} selectedList 已经选择的
     * @param {String} operate 当前操作的类型
     * @param {String} menuType 当前菜单的类型
     * @return:
     */
    selectInfoChange({ selectedList, operate, menuType }) {
      if (operate === "closeUpdate") {
        this.infoObj[menuType].list = selectedList;
      } else {
        const commonParam = {};
        Object.keys(this.infoObj).forEach(item => {
          const { type, idField, submitField, list } = this.infoObj[item];
          if (type === menuType) {
            commonParam[submitField] = selectedList
              .map(item => item[idField])
              .join(",");
            this.infoObj[item].list = selectedList;
          } else {
            commonParam[submitField] = list
              .map(item => item[idField])
              .join(",");
          }
        });
        this.$emit("relateBusinessChange", {
          commonParam,
          operate
        });
        this.$refs.selectInfo.openFullscreen = false;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.relate-business {
  .relate-list {
    padding-right: 15px;
    .relate-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 6px;
      padding: 8px 10px;
      background-color: #ededed;
      border-radius: 6px;
      font-size: @regular-size;
      color: @primary-text;
      font-weight: @regular-weight;
    }
    .close {
      width: 20px;
      height: 20px;
    }
  }
}
</style>