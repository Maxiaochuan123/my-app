<!--
 * @Description: 公海线索
 * @Author: shenah
 -->
<template>
  <div class="common-waters-clue">
    <div v-if="clueList.length>0">
      <div
        :key="index"
        class="clue-item"
        v-for="(item,index) in clueList"
      >
        <div class="clue-item-wrap">
          <div
            @click="toDetails(item)"
            class="clue-left"
          >
            <span class="primary-words">{{item.name}}</span>
            <div class="sub-title regular-words">{{item.createName}}</div>
          </div>
          <div class="clue-right">
            <mu-button
              @click="btnChange(item,'distribute')"
              class="btn"
              color="primary"
            >分配</mu-button>
            <mu-button
              @click="btnChange(item,'receive')"
              class="btn"
              color="info"
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
export default {
  name: "commonWatersClue",
  components: { Nothing },
  data() {
    return {
      clueList: []
    };
  },
  props: {},
  mounted() {
    setTimeout(() => {
      this.clueList = [
        {
          id: 15,
          name: "白超超(A)",
          createName: "张三"
        },
        {
          id: 16,
          name: "白超超(A)",
          createName: "张三"
        },
        {
          id: 17,
          name: "白超超(A)",
          createName: "张三"
        },
        {
          id: 18,
          name: "白超超(A)",
          createName: "张三"
        },
        {
          id: 19,
          name: "白超超(A)",
          createName: "张三"
        },
        {
          id: 20,
          name: "白超超(A)",
          createName: "张三"
        },
        {
          id: 21,
          name: "白超超(A)",
          createName: "张三"
        },
        {
          id: 22,
          name: "白超超(A)",
          createName: "张三"
        },
        {
          id: 23,
          name: "白超超(A)",
          createName: "张三"
        }
      ]; // 当前列表
    }, 500);
  },
  methods: {
    toDetails(row) {
      // 进入线索的详情
      this.goPage("clueDetails", { id: row.id, type: "commonWatersClue" });
    },
    btnChange(row, type) {
      if (type === "distribute") {
        // 分配
        this.goPage("selectUsers", { id: row.id, type: "commonWatersClue" });
      } else if (type === "receive") {
        // 领取
        this.$confirm("是否领取此线索?", "提示").then(({ result, value }) => {
          if (result) {
            console.log("领取");
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
  background-color: #fff;
  .clue-item {
    width: 100%;
    padding: 12px 15px;
    border-bottom: 1px solid @primary-border;
    .clue-item-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
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