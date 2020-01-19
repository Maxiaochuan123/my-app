<!--
 * @Description: 公海客户
 * @Author: shenah
 -->
<template>
  <div class="commonWatersPeople">
    <mu-load-more
      :class="{'bg-class':$parent.customerList.list.length > 0}"
      :loading="loading"
      @load="load"
      class="list-wrap"
    >
      <div v-if="$parent.customerList.list.length > 0">
        <div
          :key="index"
          class="clue-item"
          v-for="(item,index) in $parent.customerList.list"
        >
          <div class="clue-item-wrap">
            <div
              @click="toDetails(item)"
              class="clue-left"
            >
              <span class="primary-words">{{item.customerName}}</span>
              <div class="sub-title regular-words">{{item.detailAddress}}</div>
            </div>
            <div class="clue-right">
              <mu-button
                @click="btnChange(item,'distribute')"
                class="btn"
                color="primary"
                v-if="$parent.poolRights.distribute"
              >分配</mu-button>
              <mu-button
                @click="btnChange(item,'receive')"
                class="btn"
                color="info"
                v-if="$parent.poolRights.receive"
              >领取</mu-button>
            </div>
          </div>
        </div>
      </div>
      <Nothing
        v-else
        words="暂无公海客户"
      ></Nothing>
    </mu-load-more>
  </div>
</template>

<script>
import Nothing from "@components/Nothing.vue";
import Api from "@api";
export default {
  name: "commonWatersPeople",
  components: { Nothing },
  data() {
    return {
      loading: false
    };
  },
  props: {},
  mounted() {},
  methods: {
    load() {
      this.$emit("commonWatersPeopleChange", {
        type: "load"
      });
    },
    toDetails(row) {
      // 去客户公海详情
      this.goPage("customerDetails", {
        id: row.customerId,
        type: "commonWatersCustomer"
      });
    },
    btnChange(row, type) {
      if (type === "distribute") {
        // 分配
        this.goReplacePage("selectDistributeUsers", {
          id: row.customerId,
          type: "commonWatersCustomer"
        });
      } else if (type === "receive") {
        // 领取
        this.$confirm("是否领取此客户?", "提示").then(({ result, value }) => {
          if (result) {
            Api.queryReceivePublicPoolById({
              ids: row.customerId,
              labelType: "2"
            }).then(res => {
              this.$parent.queryPublicPoolCustomer();
              this.$toast.success("成功领取客户");
            });
          }
        });
      }
    }
  }
};
</script>
<style let lang="less">
.commonWatersPeople {
  .clue-right {
    text-align: center;
    .mu-raised-button .mu-button-wrapper {
      padding: 0px !important;
    }
  }
}
</style>
<style lang='less' scoped>
.commonWatersPeople {
  width: 100%;
  height: 100%;
  overflow: auto;
  .list-wrap {
    width: 100%;
    background-color: #fff;
  }
  .clue-item {
    width: 100%;
    padding: 0 0 0 15px;
    .clue-item-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px 12px 0;
      border-bottom: 1px solid @primary-border;
      .clue-left {
        width: auto;
        flex: 1;
        .sub-title {
        }
      }
      .clue-right {
        width: 148px;
        .btn {
          margin-left: 10px;
          min-width: 0;
          background-color: #fff;
          border: 1px solid @primary;
          border-radius: 6px;
          padding: 4px 15px;
          color: @primary;
        }
      }
    }
  }
}
</style>