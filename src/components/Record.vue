<!--
 * @Description: 跟进记录通用
 * @Author: shenah
 -->
<template>
  <div class="progress-column">
    <div v-if="list.length > 0">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="item-left">
          <div class="line"></div>
          <div class="circular"></div>
        </div>
        <div class="item-right">
          <div class="time">{{item.follow}}</div>
          <div class="node">
            <mu-avatar size="36" class="none-left">
              <img src="/static/images/header.jpg" />
            </mu-avatar>
            <div class="node-right">
              <div class="name">{{item.name}}</div>
              <div class="talk">{{item.remark}}</div>
              <!-- 图片等等再写公用组件 -->
              <div v-if="item.images.length>0">
                <div class="images"></div>
              </div>
              <div class="sub-info">
                <label>跟进类型:</label>
                <span>打电话</span>
              </div>
              <div class="sub-info">
                <label>下次跟进时间:</label>
                <span>2019/07/26 10:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="no-recode">暂无跟进记录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Record",
  components: {},
  data() {
    return {
      list: [
        {
          follow: "2019/07/25 10:30", // 跟进时间
          name: "白超超", //
          images: [], //
          followType: "打电话", // 跟进类型
          nextFollow: "2019/08/01 12:30",
          remark: "发放打三分大赛"
        },
        {
          follow: "2019/07/25 10:30", // 跟进时间
          name: "白超超", //
          images: [], //
          followType: "打电话", // 跟进类型
          nextFollow: "2019/08/01 12:30",
          remark: "发放打三分大赛"
        }
      ]
    };
  },
  props: {},
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
        left: 11px;
      }
      .circular {
        position: relative;
        width: 20px;
        height: 20px;
        background: url("/static/images/time-stamp.png") no-repeat;
        background-size: 100% 100%;
        z-index: 100;
      }
    }
    .item-right {
      padding: 0 10px 30px 10px;
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