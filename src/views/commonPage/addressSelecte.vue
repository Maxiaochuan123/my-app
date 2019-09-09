<!--
 * @Description: 地址选择的共用页面
 * @Author: shenah
 -->
<template>
  <div class="address-selecte">
    <AppBar pageTitle="地址选择" custom :customFnc="customFnc" customTitle="确定"></AppBar>
    <div class="content">
      <div id="amap"></div>
      <div class="search-bar">
        <div class="serch-input">
          <mu-icon class="serch-icon" size="16" value=":iconfont icon-sousuo"></mu-icon>
          <input type="text" id="fieldInput" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar.vue";
import AMap from "AMap";
export default {
  name: "addressSelecte",
  components: { AppBar },
  data() {
    return {
      map: null,
      inputValue: ""
    };
  },
  props: {},
  mounted() {
    this.loadMap(); // 地图的加载
    this.tipInput(); // 地图的提示
  },
  methods: {
    loadMap() {
      this.map = new AMap.Map("amap", {
        zoom: 9
      });
    },
    tipInput() {
      // 地图输入关键字的提示
      let auto = new AMap.Autocomplete({
        input: "fieldInput"
      });
      //构造地点查询类
      let placeSearch = new AMap.PlaceSearch({
        map: this.map
      });
      function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name); //关键字查询查询
      }
      AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
    },
    customFnc() {},
    selectChange(row) {}
  }
};
</script>
<style lang='less' scoped>
.address-selecte {
  width: 100%;
  height: 100%;
  .content {
    position: relative;
    height: 100%;
    padding-top: 44px;
    #amap {
      width: 100%;
      height: 100%;
    }
    .search-bar {
      position: absolute;
      top: 44px;
      z-index: 99;
      width: 100%;
      padding: 12px 15px;
      .serch-input {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        padding: 7px 10px;
        display: flex;
        align-items: center;
        color: @regular-text;
        background-color: @primary-border;
        height: 40px;
        .serch-icon {
          height: 100% !important;
        }
        #fieldInput {
          height: 100%;
          flex: 1;
          margin-left: 12px;
          border: none;
          background-color: @primary-border;
          outline: none;
        }
      }
    }
  }
}
</style>