<!--
 * @Description: 拜访详情
 * @Author: shenah
 * @Date: 2019-10-21 10:26:08
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-21 12:16:27
 -->

<template>
  <div class="visit-details">
    <AppBar
      :menuList="menuList"
      @menuChange="menuChange"
      isMenu
      pageTitle="日报详情"
      rightIcon="icon-gongduo1"
    ></AppBar>
    <div class="content">
      <div class="details">
        <div class="info">
          <img :src="details.userImg" />
          <div>
            <span class="name">{{details.realname}}</span>
            <span class="level">{{details.post}}</span>
          </div>
        </div>
        <div class="completionStatus">
          <div class="describe">
            <div>
              <p class="title">拜访时间：</p>
              <p class="result">{{details.visitTime}}</p>
            </div>
            <div>
              <p class="title">拜访客户：</p>
              <p class="result">{{details.customerName}}</p>
            </div>
            <div>
              <p class="title">拜访内容：</p>
              <p class="result">{{details.content}}</p>
            </div>
            <div>
              <p class="result">
                <mu-icon
                  color="#5B98D0"
                  size="24"
                  value=":iconfont icon-dingwei"
                ></mu-icon>
                <span class="address">{{details.address}}</span>
              </p>
            </div>
            <div>
              <UploadList
                :batchId="details.batchId"
                :customEnclosureList="customEnclosureList"
                :customImgList="customImgList"
                :isEdit="false"
                :ishasAfferent="false"
                :isUploadFile="false"
                :isUploadImg="false"
                class="upload-file"
              ></UploadList>
              <mu-divider shallow-inset></mu-divider>
            </div>
          </div>
          <!-- <div class="reply">
            <p class="title">批复</p>
            <div class="replyContent">

            </div>
          </div>-->
        </div>
      </div>

      <Comment @comment="comment"></Comment>
    </div>
  </div>
</template>

<script>
import AppBar from "@components/AppBar";
import Comment from "@components/Comment";
import UploadList from "@components/upLoad/uploadList.vue";
import Api from "@api";
export default {
  name: "visitDetails",
  components: {
    AppBar,
    Comment,
    UploadList
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      customImgList: [], // 图片列表,
      customEnclosureList: [], // 文件列表
      details: {}, // 详情
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
      ]
    };
  },
  mounted() {
    this.queryDetails();
  },
  methods: {
    queryDetails() {
      Api.queryDetailsById({
        visitId: this.id
      }).then(res => {
        this.details = res.data;
        this.customImgList = this.details.img.map(item => ({
          ...item,
          src: item.filePath,
          progress: { progressState: 1 }
        }));
        this.customEnclosureList = this.details.file.map(item => ({
          ...item,
          progress: { progressState: 1 }
        }));
      });
    },
    menuChange(data) {
      let { title } = { ...data };
      switch (title) {
        case "编辑":
          // let type = this.getType(this.info.leadsType)
          // this.goPage('editBasicsInfo',{state:'edit',type:type,id:this.$route.params.id})
          break;
        case "删除":
          this.$confirm("是否删除此线索 ?", "提示").then(res => {
            if (res.result) {
              // this.api.clueDelete({leadsIds:this.$route.params.id}).then(res=>{
              //   if(res.msg === 'success'){
              //     this.$toast.success('已删除!')
              //     this.getClueList();
              //   }else{
              //     this.$toast.error('删除失败!');
              //   }
              // })
            }
          });
          break;
      }
    },
    comment(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="less" scoped>
.visit-details {
  .upload-file {
    padding: 0 !important;
    /deep/ .title {
      font-size: @regular-size !important;
      color: @regular-text !important;
    }
  }
  .content {
    padding-top: 44px;
    .details {
      background-color: #fff;
      margin-top: 12px;
      padding: 10px 15px;
      .info {
        display: flex;
        align-items: center;
        img {
          width: 45px;
          height: 45px;
          background-color: #fff;
        }
        div {
          display: flex;
          flex-direction: column;
          margin-left: 12px;
          .name {
            color: @primary-text;
            font-size: @primary-size;
            font-weight: @primary-weight;
          }
          .level {
            color: @regular-text;
            font-size: @regular-size;
          }
        }
      }
      .completionStatus {
        margin-top: 20px;
        .describe > div {
          margin-top: 10px;
          .title {
            font-size: @regular-size;
            color: @regular-text;
          }
          .result {
            font-size: @primary-size;
            color: @primary-text;
            padding-top: 4px;
          }
          .imgList {
            margin: 4px 0 8px;
            img {
              width: 48px;
              height: 48px;
              border-radius: 4px;

              &:not(:first-child) {
                margin-left: 6px;
              }
            }
          }

          .enclosure {
            display: flex;
            align-items: center;
            padding: 0 0 10px;
            &:not(:first-child) {
              margin-top: 10px;
            }
            img {
              width: 40px;
              height: 40px;
              border-radius: 4px;
            }
            div {
              display: flex;
              flex-direction: column;
              margin-left: 10px;
              .title {
                color: @primary-text;
                font-size: @regular-size;
                font-weight: @regular-weight;
              }
              .size {
                color: @regular-text;
                font-size: @regular-size;
              }
            }
          }

          .relation {
            .clue {
              margin-top: 10px;
              div {
                margin-top: 6px;
                padding: 8px 10px;
                border-radius: 6px;
                color: @primary-text;
                font-size: @regular-size;
                background-color: #ededed;
              }
            }
          }
        }
      }
      .mu-divider.shallow-inset {
        margin-left: 0;
      }
    }
  }
  /deep/ .app-bar {
    box-shadow: 0px 2px 6px 0px #ededed;
  }
}
</style>