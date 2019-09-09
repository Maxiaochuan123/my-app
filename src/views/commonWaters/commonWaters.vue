<!--
 * @Description: 公海
 * @Author: shenah
 -->
<template>
  <div class="common-waters">
    <AppBar pageTitle="公海" :isShowRightBtn="false"></AppBar>
    <SearchBar placeholderText="搜索客户"></SearchBar>
    <mu-tabs
      :value.sync="active"
      inverse
      color="primary"
      indicator-color="primary"
      center
      class="tabs"
    >
      <mu-tab replace value="clue" to="commonWatersClue">公海线索</mu-tab>
      <mu-tab replace value="customer" to="commonWatersPeople">公海客户</mu-tab>
    </mu-tabs>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import SearchBar from "@components/SearchBar.vue";

export default {
  name: "commonWaters",
  components: { AppBar, SearchBar },
  data() {
    return {
      active: "customer",
    };
  },
  props: {},
  methods: {}
};
</script>
<style lang='less' scoped>
.common-waters {
  width: 100%;
  height: 100%;
  .tabs {
    position: fixed;
    top: 104px;
  }
  .content {
    height: 100%;
    padding-top: 160px;
  }
}
</style>