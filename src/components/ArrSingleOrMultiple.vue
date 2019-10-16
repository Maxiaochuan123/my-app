<!--
 * @Description: 排列式的单选或者多选
 * @Author: shenah
 * @Date: 2019-10-16 13:19:22
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-16 14:39:16
 -->

<template>
  <div class="arr-single-or-multiple">
    <div class="screen">
      <div class="title">任务状态</div>
      <div class="multipleSelection">
        <div
          :class="selectedClass(item)"
          :key="index"
          @click="select(item)"
          v-for="(item,index) in showList"
        >{{item[labelField]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArrSingleOrMultiple",
  components: {},
  data() {
    return {
      showList: [],
      active: [] // 当前激活的
    };
  },
  watch: {
    list(val) {
      this.handlerList(val);
    }
  },
  mounted() {
    this.handlerList(this.list);
  },
  props: {
    defaultValue: {
      // 默认选中的值
      type: Array,
      default: () => []
    },
    mode: {
      // 单选还是多选single多选multiple
      type: String,
      default: "single"
    },
    list: {
      // 传入的数组
      type: Array,
      default: () => []
    },
    type: {
      // 对应的请求参数
      type: String
    },
    labelField: {
      // 对应的显示的值
      type: String,
      default: "text"
    },
    valueField: {
      // 对应的id值
      type: String,
      default: "value"
    }
  },
  methods: {
    handlerList(oldList) {
      let list = JSON.parse(JSON.stringify(oldList));
      let arr = this.defaultValue;
      if (this.mode === "single") {
        if (arr.length > 0) {
          arr = [this.defaultValue[0]];
        }
      }
      list.forEach(item => {
        item.flag = false;
        arr.forEach(one => {
          if (one === item[this.valueField]) {
            item.flag = true;
          }
        });
      });
      this.showList = list;
      this.active = arr;
      this.$emit("ArrSingleOrMultipleChange", {
        type: this.type,
        value: arr.join(",")
      });
    },
    select(row) {
      row.flag = !row.flag;
      if (this.mode === "single") {
        // 单选
        if (row.flag) {
          // 全部为false
          this.showList.forEach(item => {
            if (row[this.valueField] !== item[this.valueField]) {
              item.flag = false;
            }
          });
          let arr = [];
          arr.push(row[this.valueField]);
          this.active = arr;
        } else {
          this.active = [];
        }
      } else {
        // 多选
        if (row.flag) {
          // 选中
          this.active.push(row[this.valueField]);
        } else {
          // 取消选中
          this.active = this.active.filter(
            item => item !== row[this.valueField]
          );
        }
      }
      this.$emit("ArrSingleOrMultipleChange", {
        type: this.type,
        value: this.active.join(",")
      });
    },
    selectedClass(row) {
      if (row.flag) {
        return "activeSelect";
      }
      return "";
    }
  }
};
</script>
<style lang='less' scoped>
.arr-single-or-multiple {
  margin-top: 20px;
}
</style>