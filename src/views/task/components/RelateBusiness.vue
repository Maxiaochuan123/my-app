<!--
 * @Description: 关联业务组件
 * @Author: shenah
 * @Date: 2019-10-12 17:16:43
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-12 17:35:16
 -->

<template>
  <div class="relate-business">
    <div class="basic-details-item">
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
              v-for="(item,index) in menuList"
            >
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </div>
    </div>
    <!-- 线索 -->
    <div v-if="clues.length>0"></div>
    <!-- 客户 -->
    <div v-if="customers.length>0"></div>
    <!-- 联系人 -->
    <div v-if="contacts.length>0"></div>
  </div>
</template>

<script>
export default {
  name: "RelateBusiness",
  components: {},
  data() {
    return {
      open: false,
      clues: [], // 线索
      customers: [], // 客户
      contacts: [], // 联系人
      menuList: [
        {
          name: "线索"
        },
        {
          name: "客户"
        },
        {
          name: "联系人"
        }
      ]
    };
  },
  props: {},
  mounted() {},
  methods: {
    relate() {
      this.open = true;
    },
    menuClick(row) {
      this.open = false;
    }
  }
};
</script>
<style lang='less' scoped>
.relate-business {
}
</style>