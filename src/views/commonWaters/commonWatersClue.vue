<!--
 * @Description: 公海线索
 * @Author: shenah
 -->
<template>
  <div class="common-waters-clue">
    <div class="clue-item" v-for="(item,index) in clueList" :key="index">
      <div class="clue-item-wrap">
        <div class="clue-left" @click="toDetails(item)">
          <span class="primary-words">{{item.name}}</span>
          <div class="sub-title regular-words">{{item.createName}}</div>
        </div>
        <div class="clue-right">
          <mu-button color="primary" class="btn" @click="btnChange(item,'distribute')">分配</mu-button>
          <mu-button color="info" class="btn" @click="btnChange(item,'receive')">领取</mu-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commonWatersClue",
  components: {},
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
      this.goPage('clueDetails',{id:row.id,type:'commonWatersClue'})
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
  margin-top: 12px;
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