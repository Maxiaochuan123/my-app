<template>
  <div class="dailyDetails">
    <AppBar pageTitle="日报详情" rightIcon="icon-gongduo1" isMenu :menuList="menuList" @menuChange="menuChange"></AppBar>
    <div class="content">
      <div class="details">
        <div class="info">
          <img src="../../../static/images/default-header.png">
          <div>
            <span class="name">白吵吵</span>
            <span class="level">销售二部/销售顾问</span>
          </div>
        </div>
        <div class="completionStatus">
          <div class="describe">
            <div>
              <p class="title">今日重点工作及完成情况：</p>
              <p class="result">众汇CRM原型设计</p>
            </div>
            <div>
              <p class="title">今日重点工作及完成情况：</p>
              <p class="result">众汇CRM原型设计</p>
            </div>
            <div>
              <p class="title">明日工作计划：</p>
              <p class="result">众汇CRM原型设计</p>
            </div>
            <div>
              <p class="title">工作感悟：</p>
              <p class="result">暂无</p>
            </div>
            <div>
              <p class="title">工作所需支持：</p>
              <p class="result">暂无</p>
            </div>
            <div>
              <p class="title">附件</p>
              <div class="imgList">
                <img src="./蓝猫.jpg">
                <img src="./蓝猫.jpg">
              </div>
              <mu-divider shallow-inset></mu-divider>
            </div>
            <div>
              <div class="enclosure">
                <img src="./蓝猫.jpg">
                <div>
                  <span class="title">IMG_231.JPG</span>
                  <span class="size">240KB</span>
                </div>
              </div>
              <mu-divider shallow-inset></mu-divider>
            </div>
            <div>
              <div class="relation">
                <p class="title">关联线索：</p>
                <div class="clue">
                  <div>线索-陈先生</div>
                  <div>线索-陈先生</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="reply">
            <p class="title">批复</p>
            <div class="replyContent">

            </div>
          </div> -->
        </div>
      </div>

      <Comment @comment="comment"></Comment>
      <!-- <div class="comment">
        <div class="textareaBox">
          <div class="textarea">
            <mu-text-field v-model="value10" multi-line :rows="textareaRows" full-width placeholder="请输入内容..."></mu-text-field><br/>
          </div>
          <div class="commentBtn">回复</div>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Comment from '../../components/Comment'
export default {
  components:{
    AppBar, Comment
  },
  data(){
    return{
      menuList: [
        {
          title: "编辑",
          linkName: "editBasicsInfo",
          isLink: false
        },
        {
          title: "删除",
          linkName: "",
          isLink: true
        }
      ],
    }
  },
  // created(){
  //   this.api.getComment({type:1,typeId:this.$route.params.typeId}).then(res=>{
  //     console.log(res)
  //   })
  // },
  methods:{
    menuChange(data){
      let {title} = {...data}
      switch (title) {
        case '编辑':
          // let type = this.getType(this.info.leadsType)
          // this.goPage('editBasicsInfo',{state:'edit',type:type,id:this.$route.params.id})
          break;
        case '删除':
          this.$confirm('是否删除此线索 ?', '提示').then(res=>{
            if(res.result){
              // this.api.clueDelete({leadsIds:this.$route.params.id}).then(res=>{
              //   if(res.msg === 'success'){
              //     this.$toast.success('已删除!')
              //     this.getClueList();
              //   }else{
              //     this.$toast.error('删除失败!');
              //   }
              // })
            }
          })
          break;
      }
    },
    comment(data){
      
    }
  }
}
</script>

<style lang="less" scoped>
  .dailyDetails{
    .content{
      padding-top: 44px;
      .details{
        background-color: #fff;
        margin-top: 12px;
        padding: 10px 15px;
        .info{
          display: flex;
          align-items: center;
          img{
            width: 45px;
            height: 45px;
            background-color: #fff;
          }
          div{
            display: flex;
            flex-direction:column;
            margin-left: 12px;
            .name{
              color: @primary-text;
              font-size: @primary-size;
              font-weight: @primary-weight;
            }
            .level{
              color: @regular-text;
              font-size: @regular-size;
            }
          }
        }
        .completionStatus{
          margin-top: 20px;
          .describe>div{
            margin-top: 10px;
            .title{
              font-size: @regular-size;
              color: @regular-text;
            }
            .result{
              font-size: @primary-size;
              color: @primary-text;
              padding-top: 4px;
            }
            .imgList{
              margin: 4px 0 8px;
              img{
                width: 48px;
                height: 48px;
                border-radius: 4px;
                
                &:not(:first-child){
                  margin-left: 6px;
                }
              }
            }
              
            .enclosure{
              display: flex;
              align-items: center;
              padding: 0 0 10px;
              &:not(:first-child){
                margin-top: 10px;
              }
              img{
                width: 40px;
                height: 40px;
                border-radius: 4px;
              }
              div{
                display: flex;
                flex-direction:column;
                margin-left: 10px;
                .title{
                  color: @primary-text;
                  font-size: @regular-size;
                  font-weight: @regular-weight;
                }
                .size{
                  color: @regular-text;
                  font-size: @regular-size;
                }
              }
            }

            .relation{
              .clue{
                margin-top: 10px;
                div{
                  margin-top: 6px;
                  padding: 8px 10px;
                  border-radius: 6px;
                  color: @primary-text;
                  font-size: @regular-size;
                  background-color: #EDEDED;
                }
              }
            }
          }
        }
        .mu-divider.shallow-inset{
          margin-left: 0;
        }
      }
    }
    /deep/ .app-bar{
      box-shadow: 0px 2px 6px 0px #ededed;
    }
  }
</style>