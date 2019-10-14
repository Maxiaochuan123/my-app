<!--
 * @Description: 跟进记录通用
 * @Author: shenah
 -->
<template>
  <div class="progress-column">
    <div v-if="record.length > 0">
      <div
        :key="index"
        class="item"
        v-for="(item,index) in record"
      >
        <div class="item-left">
          <div class="line"></div>
          <div class="circular"></div>
        </div>
        <div class="item-right">
          <div class="time">{{item.createTime}}</div>
          <div class="node">
            <mu-avatar
              class="none-left"
              size="36"
            >
              <img :src="item.userImg" />
            </mu-avatar>
            <div class="node-right">
              <div class="name">{{item.realname}}</div>
              <div class="talk">{{item.content}}</div>
              <div
                class="show-imgs"
                v-if="item.img.length > 0"
              >
                <PreviewImageBase :imagesList="item.img.map(one => one.filePath)"></PreviewImageBase>
              </div>
              <div class="sub-info">
                <label>跟进类型:</label>
                <span>{{item.category}}</span>
              </div>
              <div class="sub-info">
                <label>下次跟进时间:</label>
                <span>{{item.nextTime || '暂无跟进时间'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Nothing words="暂无跟进记录"></Nothing>
    </div>
  </div>
</template>

<script>
import Nothing from "@components/Nothing.vue";
import PreviewImageBase from "@components/upLoad/components/PreviewImageBase.vue";
export default {
  name: "Record",
  components: { Nothing, PreviewImageBase },
  data() {
    return {};
  },
  props: {
    record: {
      type: Array,
      default: () => []
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
</style>