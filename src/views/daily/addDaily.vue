<template>
  <div class="addDaily">
    <AppBar pageTitle="写日报"></AppBar>
    <div class="content">
      <div class="baseContent">

        <div class="baseItem">
          <div class="title">今日重点工作及完成情况</div>
          <div class="textarea">
            <mu-text-field v-model="textareaVal" multi-line :rows="0" full-width placeholder="请输入内容"></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <div class="baseItem">
          <div class="title">明日工作计划</div>
          <div class="textarea">
            <mu-text-field v-model="textareaVal2" multi-line :rows="0" full-width placeholder="请输入内容"></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <div class="baseItem">
          <div class="title">工作感悟</div>
          <div class="textarea">
            <mu-text-field v-model="textareaVal3" multi-line :rows="0" full-width placeholder="请输入内容"></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <div class="baseItem">
          <div class="title">工作所需支持</div>
          <div class="textarea">
            <mu-text-field v-model="textareaVal4" multi-line :rows="0" full-width placeholder="请输入内容"></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <uploadList @getImgSuccessList="getImgSuccessList" @getEnclosureSuccessList="getEnclosureSuccessList"></uploadList>
        <mu-divider shallow-inset></mu-divider>

        <!-- <div class="relationBusiness">
          <span class="title">关联业务</span>
          <img src="../../../static/images/relation.png">
        </div> -->
        <RelateBusiness :relateData="relateData" :relateMenu="relateMenu" @relateBusinessChange="relateBusinessChange" :isHideLine="true"></RelateBusiness>
      </div>
      <div class="receivePeople">
        <span class="title">接收人</span>
        <img src="../../../static/images/receivePeople.png">
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import uploadList from '../../components/upLoad/uploadList'
import RelateBusiness from "../../components/RelateBusiness/RelateBusiness";
import { RELATION_BUSINESS } from "@constants/menuInfo.js";
export default {
  components:{
    AppBar, uploadList, RelateBusiness
  },
  data(){
    return{
      textareaVal:'',
      textareaVal2:'',
      textareaVal3:'',
      textareaVal4:'',
      relateMenu: {
        // 菜单的相应配置
        clues: { ...RELATION_BUSINESS.clues },
        customers: { ...RELATION_BUSINESS.customers },
        contacts: { ...RELATION_BUSINESS.contacts },
        tasks: { ...RELATION_BUSINESS.tasks },
        visits: { ...RELATION_BUSINESS.visits },
      },
      relateData: {} // 关联业务
    }
  },
  watch: {
    "$parent.details"(val) {
      this.relateData = {
        clues: val.clueList,
        customers: val.customerList,
        contacts: val.contactsList,
        tasks: val.tasksList,
        visits: val.visitsList,
      };
    }
  },
  methods: {
    getImgSuccessList(data){
      console.log(data)
    },
    getEnclosureSuccessList(data){
      console.log(data)
    },
    relateBusinessChange({ nowConfig, commonParam, operate }){
      const param = {
        taskId: this.id,
        ...commonParam
      };
      console.log(param)
    }
  }
}
</script>

<style lang="less" scoped>
  .addDaily{
    .content{
      padding-top: 56px;
      .baseContent{
        padding: 0 15px;
        background-color: #fff;
        .baseItem{
          padding: 12px 0;
          .title{
            color: @primary-text;
            font-size: @primary-size;
          }
          .textarea{
            margin-top: 4px;
            color: @regular-text;
            .mu-input{
              padding: 0;
              margin: 0;
              min-height: 0;
            }
            /deep/ .mu-text-field-textarea{
              color: @regular-text;
            }
            /deep/ .mu-input-line, /deep/ .mu-input-focus-line{
              display: none;
            }
          }
        }
        .upLoad{
          padding: 0;
        }
      }
      .relationBusiness{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        .title{
          color: @primary-text;
          font-size: @primary-size;
        } 
        img{
          width: 24px;
          height: 24px;
        }
      }
      .mu-divider.shallow-inset{
        margin-left: 0;
      }
    }
    .receivePeople{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background-color: #fff;
      .title{
        color: @primary-text;
        font-size: @primary-size;
      } 
      img{
        width: 24px;
        height: 24px;
      }
    }
    .receivePeople{
      margin-top: 12px;
    }
    /deep/ .app-bar{
      box-shadow: 0px 2px 6px 0px #ededed;
    }
  }
</style>