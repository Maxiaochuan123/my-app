<!--
 * @Description: 地址选择的组件
 * @Author: shenah
 -->
<template>
  <div class="select-address">
    <div
      @click="selectAddress"
      class="surround"
    >
      <mu-text-field
        :prop="fieldName"
        :rows-max="3"
        disabled
        multi-line
        placeholder="请选择地址"
        v-model="showInputValue"
      ></mu-text-field>
      <i class="iconfont icon-rightArrow"></i>
    </div>
    <mu-dialog
      :append-body="false"
      :open.sync="openFullscreen"
      dialog-class="select-address-dialog"
      fullscreen
      transition="slide-bottom"
    >
      <div class="select-address-body">
        <div class="select-address-header">
          <div @click="closeFullscreenDialog">取消</div>
          <div class="primary-words">地址选择</div>
          <div
            @click="submit"
            class="ok"
          >确定</div>
        </div>
        <div class="map-address">
          <div id="amap"></div>
          <div class="search-bar">
            <div class="serch-input">
              <mu-icon
                class="serch-icon"
                size="16"
                value=":iconfont icon-sousuo"
              ></mu-icon>
              <input
                id="fieldInput"
                type="text"
                v-model="inputValue"
              />
              <img
                :src="loadingImg('delete.png')"
                @click.stop="clearAll()"
                class="close"
              />
            </div>
          </div>
        </div>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import { amapPullIn } from "@static/js/dynamicLib";
import tools from "@static/js/tool";
export default {
  name: "SelectAddress",
  components: {},
  data() {
    return {
      map: null,
      nowMarker: null, // 当前点位
      region: "", // 区域(省市区)
      inputValue: "", // 输入的值
      showInputValue: "", // 地址显示的值
      openFullscreen: false
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
    selectAddress() {
      // 点击地址选择
      this.openFullscreen = true;
      this.inputValue = this.defaultValue;
      this.showInputValue = this.defaultValue;
      this.$nextTick(() => {
        tools.openLoading("加载地图.....");
        amapPullIn().then(AMap => {
          this.loadMap(); // 地图的加载
        });
      });
    },
    submit() {
      // 点击确定
      let lng = "";
      let lat = "";
      if (this.nowMarker) {
        lng = this.nowMarker.getPosition().lng;
        lat = this.nowMarker.getPosition().lat;
      }
      this.$emit("addressChange", {
        lng,
        lat,
        region: this.region,
        value: this.inputValue,
        fieldName: this.fieldName
      });
      this.showInputValue = this.inputValue;
      this.clearAll();
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
      if (this.nowMarker) {
        this.map.remove(this.nowMarker);
        this.nowMarker = null;
      }
    },
    loadMap() {
      // 加载地图
      this.map = new AMap.Map("amap", {
        city: "",
        zoom: 18
      });
      this.map.on("complete", () => {
        tools.closeLoading();
        this.addPlugin(); // 向地图增加插件
      });
    },
    addPlugin() {
      // 加载插件
      this.map.plugin(
        [
          "AMap.Autocomplete",
          "AMap.Geocoder",
          "AMap.PlaceSearch",
          "AMap.Geolocation"
        ],
        () => {
          if (this.inputValue) {
            this.geocoderAdverseAnalysis(this.inputValue);
          } else {
            this.locatePosition();
          }
          this.tipInput();
        }
      );
    },
    locatePosition() {
      // 定位
      const loading = this.$loading({
        text: "正在定位中"
      });
      // 定位当前位置
      const geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB",
        showMarker: false,
        showCircle: false,
        showButton: false,
        showButton: false
      });
      this.map.addControl(geolocation);
      AMap.event.addListener(geolocation, "complete", data => {
        loading.close();
        let { formattedAddress, info, position } = data;
        let { lng, lat } = position;
        if (info === "SUCCESS") {
          this.addMarker(position); // 添加点位
          this.inputValue = formattedAddress;
        }
      });
      AMap.event.addListener(geolocation, "error", error => {
        loading.close();
        console.log("定位失败", error);
        // 否则定位失败
        this.$toast.info({
          message: "定位失败,请手动输入"
        });
      });
      geolocation.getCurrentPosition();
    },
    tipInput() {
      // 地图输入关键字的提示
      const auto = new AMap.Autocomplete({
        city: "",
        input: "fieldInput"
      });
      //注册监听，当选中某条记录时会触发
      AMap.event.addListener(auto, "select", e => {
        //构造地点查询类
        const { district, location: selectLocation, name } = e.poi;
        const placeSearch = new AMap.PlaceSearch();
        placeSearch.search(name, (status, result) => {
          let list = result.poiList.pois;
          // 第一步通过关键字获取到的信息点位
          // 第二步,如果第一步没有获取到点位再以PlaceSearch来获取到定位,只要第一个
          if (selectLocation) {
            this.region = district; // 记住省市区
            this.addMarker(selectLocation); // 添加点位
            this.geocoderAnalysis(selectLocation);
          } else if (status === "complete" && list.length > 0) {
            // 只取第一个
            const [first] = list;
            const { location } = first;
            const { lng, lat } = location;
            this.region = district; // 记住省市区
            this.addMarker(location); // 添加点位
            this.setMapCenter(location); // 设置中心点的坐标
            this.geocoderAnalysis(location);
          } else {
            this.$toast.info({
              message: "当前地址无法获取到点位"
            });
          }
        });
      });
    },
    setMapCenter(location) {
      // 设置中心点的坐标
      this.map.setCenter(location);
    },
    addMarker({ lng, lat }) {
      // 向地图上增加点位
      const lnglatObj = new AMap.LngLat(lng, lat);
      if (this.nowMarker) {
        this.nowMarker.setPosition(lnglatObj);
        this.setMapCenter(lnglatObj);
        return;
      }
      let icon = new AMap.Icon({
        size: new AMap.Size(40, 62),
        image: this.loadingImg("location-marker.png"),
        imageSize: new AMap.Size(24, 46)
      });
      // 添加点位
      this.nowMarker = new AMap.Marker({
        icon,
        position: [lng, lat],
        draggable: true
      });
      this.nowMarker.setMap(this.map);
      // 点位拖动时的监听事件
      AMap.event.addListener(this.nowMarker, "dragend", e => {
        let { lnglat } = e;
        this.geocoderAnalysis(lnglat);
      });
      this.setMapCenter(lnglatObj); // 设置中心点的坐标
    },
    geocoderAdverseAnalysis(address) {
      // 根据地址解析成坐标
      const geocoder = new AMap.Geocoder();
      geocoder.getLocation(address, (status, result) => {
        if (status === "complete" && result.geocodes.length) {
          const {
            province,
            city,
            district
          } = result.geocodes[0].addressComponent;
          const lnglat = result.geocodes[0].location;
          this.region = `${province}${city}${district}`;
          this.addMarker(lnglat);
        } else {
          this.$toast.info({
            message: "根据地址查询位置失败"
          });
        }
      });
    },
    geocoderAnalysis(lnglat) {
      // 根据lnglat解析成地址
      const geocoder = new AMap.Geocoder();
      geocoder.getAddress(lnglat, (status, result) => {
        if (status === "complete" && result.regeocode) {
          let address = result.regeocode.formattedAddress;
          this.inputValue = address;
          this.setMapCenter(lnglat);
        } else {
          this.$toast.info({
            message: "根据经纬度查询地址失败"
          });
        }
      });
    }
  }
};
</script>
<style lang='less'>
.select-address-dialog {
  .mu-dialog-body {
    height: 100%;
    .select-address-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      .select-address-header {
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
      .map-address {
        flex: 1;
        position: relative;
        #amap {
          width: 100%;
          height: 100%;
        }
        .search-bar {
          position: absolute;
          top: 0;
          z-index: 99;
          width: 100%;
          padding: 12px 15px;
          .serch-input {
            position: relative;
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
              // &:focus + .close{
              //   visibility: visible;
              //  }
            }
            .close {
              width: 20px;
              height: 20px;
              visibility: visible;
              margin-left: 10px;
              // visibility: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang='less' scoped>
.select-address {
  width: 100%;
  height: 100%;
}
</style>