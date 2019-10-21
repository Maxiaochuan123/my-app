<!--
 * @Description: 多选展示列表
 * @Author: shenah
 * @Date: 2019-10-21 17:18:33
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-21 17:39:41
 -->

<template>
  <div class="multiple-show-list">
    <div
      :key="index"
      class="show-select-list-item"
      v-for="(item,index) in list"
    >
      <mu-avatar
        class="item-header"
        size="48"
      >
        <img :src="item.img" />
      </mu-avatar>
      <div>{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleShowList",
  components: {},
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.multiple-show-list {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .show-select-list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 10px 10px 0;
    font-size: @regular-size;
    color: @primary-text;
    .item-header {
      margin-bottom: 4px;
    }
  }
}
</style>