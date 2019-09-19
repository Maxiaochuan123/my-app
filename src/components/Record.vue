<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 11:25:33
 * @LastEditTime: 2019-09-05 15:10:42
 * @LastEditors: Please set LastEditors
 -->
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
              <!-- 图片等等再写公用组件 -->
              <div v-if="item.img.length>0">
                <div class="images"></div>
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
export default {
  name: "Record",
  components: { Nothing },
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
/* 竖着进度条 */
.progress-column {
  padding: 30px 15px;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-flow: column;
  .item {
    position: relative;
    display: flex;
    flex-basis: 50%;
    flex-shrink: 1;
    .item-left {
      flex-grow: 0;
      .line {
        position: absolute;
        border-color: inherit;
        background-color: @primary-border;
        width: 1px;
        top: 0;
        bottom: 0;
        left: 10px;
      }
      .circular {
        position: relative;
        width: 20px;
        height: 20px;
        background: url("../../static/images/time-stamp.png") no-repeat;
        background-size: 100% 100%;
        z-index: 100;
      }
    }
    .item-right {
      padding: 0 10px 30px;
      .time {
        font-size: @regular-size;
        color: @regular-text;
      }
      .node {
        margin-top: 24px;
        display: flex;
        .node-left {
          width: auto;
        }
        .node-right {
          flex: 1;
          width: auto;
          margin-left: 10px;
          .name {
            font-size: @primary-size;
            color: @primary-text;
            font-weight: @primary-weight;
          }
          .talk {
            margin-top: 4px;
            font-size: @regular-size;
            color: @primary-text;
          }
          .images {
            margin: 20px 0 8px 0;
          }
          .sub-info {
            margin-top: 4px;
            font-size: @regular-size;
            color: @regular-text;
          }
        }
      }
    }
  }
}
</style>