<!--
 * @Description: 任务详情记录
 * @Author: shenah
 * @Date: 2019-10-12 15:45:34
 * @LastEditors  : shenah
 * @LastEditTime : 2020-01-14 16:43:04
 -->
<template>
  <div class="task-record progress-column">
    <div v-if="records.length > 0">
      <div
        :key="index"
        class="item"
        v-for="(item,index) in records"
      >
        <div class="item-left">
          <div class="line"></div>
          <div class="circular"></div>
        </div>
        <div class="item-right">
          <div class="time">{{item.createTime}}</div>
          <div class="node">
            <mu-avatar
              class="node-left"
              size="36"
            >
              <img :src="item.img" />
            </mu-avatar>
            <div class="node-right">
              <div class="name">{{item.realname}}</div>
              <div class="talk">{{item.content}}</div>
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
import Api from "@api";
export default {
  name: "taskRecord",
  computed: {
    // 当前任务的详情
    id() {
      return this.$route.params.id;
    }
  },
  components: { Nothing },
  data() {
    return {
      records: []
    };
  },
  props: {},
  mounted() {
    this.queryRecord();
  },
  methods: {
    queryRecord() {
      // 查询相关记录
      Api.queryTaskRecordById({
        taskId: this.id
      }).then(res => {
        this.records = res.data;
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>