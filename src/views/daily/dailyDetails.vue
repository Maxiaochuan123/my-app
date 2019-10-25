<template>
  <div class="dailyDetails">
    <AppBar pageTitle="日报详情" rightIcon="icon-gengduo1" isMenu :menuList="menuList" @menuChange="menuChange"></AppBar>
    <div class="content">
      <div class="details">
        <div class="info">
          <img :src="info.userImg">
          <div>
            <span class="name">{{info.realname}}</span>
            <span class="level">{{info.post}}</span>
          </div>
        </div>
        <div class="completionStatus">
          <div class="describe">
            <div>
              <p class="title">今日重点工作及完成情况：</p>
              <div class="result">{{info.content}}</div>
            </div>
            <div>
              <p class="title">今日重点工作及完成情况：</p>
              <p class="result">{{info.tomorrow}}</p>
            </div>
            <div>
              <p class="title">明日工作计划：</p>
              <p class="result">{{info.sentiment}}</p>
            </div>
            <div>
              <p class="title">工作感悟：</p>
              <p class="result">{{info.sentiment}}</p>
            </div>
            <div>
              <p class="title">工作所需支持：</p>
              <p class="result">{{info.support}}</p>
            </div>
            <!-- 图片 / 附件 -->
            <UploadList
              :batchId="info.batchId"
              :customEnclosureList="customEnclosureList"
              :customImgList="customImgList"
              :isEdit="false"
              :ishasAfferent="false"
              :isUploadFile="false"
              :isUploadImg="false"
              class="upload-file">
            </UploadList>
            <div class="relationBox">
              <div class="relation">
                <p class="title">关联业务：</p>
                <div class="clue">
                  <div v-for="(contacts,index) in contactsList" :key="index + contacts.name">联系人 - {{contacts.name}}</div>
                  <div v-for="(customer,index) in customerList" :key="index + customer.customerName">客户 - {{customer.customerName}}</div>
                  <div v-for="(clue,index) in clueList" :key="index + clue.leadsName">线索 - {{clue.leadsName}}</div>
                  <div v-for="(task,index) in taskList" :key="index + task.name">任务 - {{task.name}}</div>
                  <div v-for="(visit,index) in visitList" :key="index + visit.customerName">拜访 - {{visit.customerName}}</div>
                </div>
              </div>
            </div>
            <div class="receiver">
              <p class="title">接收人：</p>
              <div class="imgListBox">
                <div class="imgItem" v-for="(item, index) in info.sendUserList" :key="index">
                  <img :src="item.img ? item.img : '../../../static/images/default-header.png'">
                  <span class="name">{{item.realname}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <Comment :realname="info.realname"></Comment>

    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import Comment from '../../components/Comment'
import UploadList from '../../components/upLoad/uploadList'

export default {
  components:{
    AppBar, Comment, UploadList
  },
  data(){
    return{
      info:{},
      menuList: [],
      customImgList:[],
      customEnclosureList:[]
    }
  },
  created(){
    this.api.getDailyDetails({logId:this.$route.params.id}).then(res=>{
      this.menuList = [{
        title: "编辑",
        flag: res.data.permission.update
      },{
        title: "删除",
        flag: res.data.permission.delete
      }]
      this.customImgList = res.data.img.map(item => ({
        ...item,
        src: item.filePath,
        progress: { progressState: 1 }
      }));
      this.customEnclosureList = res.data.file.map(item => ({
        ...item,
        progress: { progressState: 1 }
      }));
      this.info = res.data;
    })
  },
  methods:{
    menuChange(data){
      let {title} = {...data}
      switch (title) {
        case '编辑':
          this.goPage('addDaily',{state:'edit',id:this.$route.params.id})
          break;
        case '删除':
          this.$confirm('是否删除此日报 ?', '提示').then(res=>{
            if(res.result){
              this.api.deleteDaily({logIds:this.$route.params.id}).then(res=>{
                if(res.msg === 'success'){
                  this.$toast.success('已删除!')
                  this.$router.go(-1)
                }else{
                  this.$toast.error('删除失败!');
                }
              })
            }
          })
          break;
      }
    }
  },
  computed: {
    contactsList(){
      return this.info.hasOwnProperty('contactsList') ? this.info.contactsList : []
    },
    customerList(){
      return this.info.hasOwnProperty('customerList') ? this.info.customerList : []
    },
    clueList(){
      return this.info.hasOwnProperty('clueList') ? this.info.clueList : []
    },
    taskList(){
      return this.info.hasOwnProperty('taskList') ? this.info.taskList : []
    },
    visitList(){
      return this.info.hasOwnProperty('visitList') ? this.info.visitList : []
    },
  }
}
</script>

<style lang="less" scoped>
  .dailyDetails{
    .content{
      padding: 44px 0 70px;
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
              white-space: pre-wrap;
              word-wrap: break-word;
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
          .receiver{
            .imgListBox{
              display: flex;
              flex-wrap: wrap;
              .imgItem{
                width: 48px;
                margin: 16px 8px 0 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                  width: 48px;
                  height: 48px;
                }
                span{
                  margin-top: 4px;
                  color: @primary-text;
                  font-size: @regular-size;
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