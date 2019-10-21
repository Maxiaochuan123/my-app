<template>
  <div class="comment">
    <div class="reply">
      <p class="title">批复</p>
      <div class="replyContent">

        <div class="msgContent" v-for="(item,index) in replyList" :key="index" @click="separateReply(item.typeId, '' ,item)">
          <div class="title">
            <span>{{item.user.realname}}</span>
            <span>{{item.createTime}}</span>
          </div>
          <div class="message">{{item.content}}</div>

          <!-- 子回复 -->
          <div class="childMsg" v-for="(item2,index2) in item.childCommentList" :key="index2" @click.stop="separateReply(item2.typeId, item2.replyUser.realname, item2)">
            <div class="title">
              <span>{{item2.user.realname}}</span>
            </div>
            <div class="message">回复
              <span class="answer">{{item2.replyUser ? item2.replyUser.realname : ''}}:</span> {{item2.content}}
            </div>
          </div>

          <mu-divider shallow-inset  v-show="index + 1 !== replyList.length"></mu-divider>
        </div>

      </div>
    </div>
    <div class="textareaBox">
      <div class="textarea">
        <mu-text-field v-model="textareaVal" multi-line :rows="0" full-width :placeholder="placeholder"></mu-text-field>
      </div>
      <div class="commentBtn" @click="closeSeparateReply" v-show="this.replyType">取消</div>
      <div class="commentBtn" @click="comment">{{btnText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    type:{ // 1.拜访 2.日报
      type: Number,
      default: 2
    },
    typeId:{
      type: String,
      default: null
    },
    realname:{ //回复对象的姓名
      type: String,
      default: ''
    },
    btnText:{
      type: String,
      default: '回复'
    }
  },
  data(){
    return{
      counter:0,
      placeholder:'请输入内容...',
      textareaVal:'',
      replyList:[],
      replyType:false,
      params:{}
    }
  },
  created(){
    this.getReplyList()
  },
  methods:{
    // 单独点击回复
    separateReply(id,name,item){
      this.replyType = true;
      this.textareaVal = '';
      this.getParams('separateReply',item);

      if(name){
        this.placeholder = `回复: ${name} `;
        this.replyList.forEach(listItem => {
          if(item.mainId === listItem.commentId){
            this.params.mainId = listItem.commentId;
          }
        })
      }else{
        this.placeholder = `回复: ${this.realname}`;
      }
    },

    // 主回复
    comment(){
      if(this.replyType){
        this.params.content = this.textareaVal;
        this.addReply(this.params);
      }else{
        this.getParams();
        this.addReply(this.params);
      }
    },

    // 获取参数
    getParams(type,item){
      let params = {
        typeId:this.typeId,
        type:this.type,
        content:this.textareaVal
      }
      if(type === 'separateReply'){
        params.pid = item.userId;
        params.mainId = item.commentId
      }
      this.params = params;
    },
    // 重置评论组件状态
    resetReply(){
      this.replyType = false;
      this.textareaVal = '';
      this.placeholder = '请输入内容...';
    },
    // 取消 子评论
    closeSeparateReply(){
      this.resetReply();
      this.getParams();
    },

    // 评论
    addReply(params){
      this.api.addReply(params).then(res=>{
        if(res.msg === 'success') {
          this.$toast.success('评论成功!');
          this.resetReply();
          this.getReplyList();
        }else{
          this.$toast.error('评论失败!');
        }
      })
    },

    // 获取 评论列表
    getReplyList(){
      this.api.getReplyList({type:parseInt(this.type),typeId:this.typeId}).then(res=>{
        this.replyList = res.data;
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .comment{
    .reply{
      padding: 20px 15px;
      margin-top: 12px;
      background-color: #fff;
      >.title{
        font-size: @regular-size;
        color: @primary-text;
        font-weight: @primary-weight;
      }
      .replyContent{
        .msgContent{
          margin-top: 12px;
          .title{
            display: flex;
            justify-content: space-between;
            color: @regular-text;
            font-size: @regular-size;
          }
          .message{
            font-size: @regular-size;
            color: @primary-text;
            margin: 4px 0 10px;
          }
        }
        .answer{
          color: #4799D5;
        }
      }
      .mu-divider.shallow-inset{
        margin-left: 0;
      }
    }
    .textareaBox{
      margin-top: 18px;
      padding: 12px 0 12px 15px;
      background-color: #fff;
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