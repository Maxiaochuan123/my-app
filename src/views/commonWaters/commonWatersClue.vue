<!--
 * @Description: 公海线索
 * @Author: shenah
 -->
<template>
  <div class="common-waters-clue">
    <div v-if="$parent.clueList.length>0">
      <div
        :key="index"
        class="clue-item"
        v-for="(item,index) in $parent.clueList"
      >
        <div class="clue-item-wrap">
          <div
            @click="toDetails(item)"
            class="clue-left"
          >
            <span class="primary-words">
              <img
                :src="changeCarType(item)"
                height="24"
                width="24"
              />
              {{item.leadsName}}
            </span>
            <div class="sub-title regular-words">级别: {{item.leadsLevel}}</div>
            <div class="sub-title regular-words">创建人: {{item.createUserName}}</div>
            <div class="sub-title regular-words">{{item.createTime}}更新</div>
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
      words="暂无公海线索"
    ></Nothing>
  </div>
</template>

<script>
import Nothing from "@components/Nothing.vue";
import Api from "@api";
export default {
  name: "commonWatersClue",
  components: { Nothing },
  data() {
    return {};
  },
  props: {},
  mounted() {},
  methods: {
    changeCarType(row) {
      const { leadsType } = row;
      if (leadsType.indexOf("买车") > -1) {
        return this.loadingImg("car-buy.png");
      } else if (leadsType.indexOf("车贷") > -1) {
        return this.loadingImg("car-loan.png");
      } else {
        return this.loadingImg("car-county.png");
      }
    },
    toDetails(row) {
      // 进入线索的详情
      this.goPage("clueDetails", { id: row.leadsId, type: "commonWatersClue" });
    },
    btnChange(row, type) {
      if (type === "distribute") {
        // 分配
        this.goReplacePage("selectDistributeUsers", {
          id: row.leadsId,
          type: "commonWatersClue"
        });
      } else if (type === "receive") {
        // 领取
        this.$confirm("是否领取此线索?", "提示").then(({ result, value }) => {
          if (result) {
            Api.queryReceivePublicPoolById({
              ids: row.leadsId,
              labelType: "1"
            }).then(res => {
              this.$toast.success("领取线索成功");
              this.$parent.queryPublicPoolClue();
            });
          }
        });
      }
    }
  }
};
</script>
<style let lang="less">
.common-waters-clue {
  .clue-right {
    text-align: center;
    .mu-raised-button .mu-button-wrapper {
      padding: 0px !important;
    }
  }
}
</style>
<style lang='less' scoped>
.common-waters-clue {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  .clue-item {
    width: 100%;
    padding: 0 0 0 15px;
    .clue-item-wrap {
      width: 100%;
      height: 100%;
      padding: 12px 15px 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
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