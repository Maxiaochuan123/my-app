<template>
  <div class="comment">
    <div class="textareaBox">
      <div class="textarea">
        <mu-text-field v-model="textareaVal" multi-line :rows="0" full-width placeholder="请输入内容..."></mu-text-field>
      </div>
      <div class="commentBtn" @click="comment">{{btnText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    btnText:{
      type: String,
      default: '回复'
    }
  },
  data(){
    return{
      textareaVal:'',
    }
  },
  methods:{
    comment(){
      this.$emit('comment',this.textareaVal)
    }
  }
}
</script>

<style lang="less" scoped>
  .comment{
    margin-top: 18px;
    padding: 12px 0 12px 15px;
    background-color: #fff;
    .textareaBox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .textarea{
        padding: 7px 10px;
        border-radius:6px;
        width: calc(100% - 50px);
        background-color: #EDEDED;
        .mu-input{
          padding: 0;
          margin: 0;
          min-height: 0;
        }
        /deep/ .mu-input-line, /deep/ .mu-input-focus-line{
          display: none;
        }
      }
      .commentBtn{
        width: 50px;
        font-size: @primary-size;
        color: @primary;
        text-align: center;
      }
    }
  }
</style>