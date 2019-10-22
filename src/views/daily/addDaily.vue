<template>
  <div class="addDaily">
    <AppBar pageTitle="写日报" custom customTitle="保存" :customFnc="customFnc"></AppBar>
    <div class="content">
      <div :class="['baseContent',bootomPadingStatus ? 'bootomPading' : '']">

        <div class="baseItem">
          <div class="title">今日重点工作及完成情况</div>
          <div class="textarea">
            <mu-text-field v-model="content" multi-line :rows="0" full-width placeholder="请输入内容"></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <div class="baseItem">
          <div class="title">明日工作计划</div>
          <div class="textarea">
            <mu-text-field v-model="tomorrow" multi-line :rows="0" full-width placeholder="请输入内容"></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <div class="baseItem">
          <div class="title">工作感悟</div>
          <div class="textarea">
            <mu-text-field v-model="sentiment" multi-line :rows="0" full-width placeholder="请输入内容"></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <div class="baseItem">
          <div class="title">工作所需支持</div>
          <div class="textarea">
            <mu-text-field v-model="support" multi-line :rows="0" full-width placeholder="请输入内容"></mu-text-field>
          </div>
        </div>
        <mu-divider shallow-inset></mu-divider>

        <uploadList @getImgSuccessList="getImgSuccessList" @getEnclosureSuccessList="getEnclosureSuccessList"></uploadList>
        <mu-divider shallow-inset></mu-divider>

        <!-- <div class="relationBusiness">
          <span class="title">关联业务</span>
          <img src="../../../static/images/relation.png">
        </div> -->
        <RelateBusiness :relatedBusinessList="relatedBusinessList" :relateMenu="relateMenu" @relateBusinessChange="relateBusinessChange" :defaultHide="true"></RelateBusiness>
      </div>
      <!-- <div class="receivePeople">
        <span class="title">接收人</span>
        <img src="../../../static/images/receivePeople.png">
      </div> -->
      <mu-form
        :model="form"
        class="mu-demo-form"
        label-position="left"
        label-width="100"
      >
      <mu-paper :z-depth="0" class="block" >
        <mu-form-item label="接收人" prop="contactName" >
          <PopSingleOrMultiple
            :defaultValue="form.contactName"
            :isShowText="false"
            :selected="form.sendUser"
            @PopSingleOrMultipleChange="PopSingleOrMultipleChange"
            apiName="queryContactsPC"
            fieldName="contactName"
            idField="contactsId"
            mode="multiple"
            name="接收人"
            splitField="sendUser"
            textField="contactsName"
            :extraParams="{
              teamType:1
            }"
          >
            <mu-icon
              color="#FF0000"
              size="24"
              slot="rightIcon"
              value=":iconfont icon-tianjia"
            ></mu-icon>
          </PopSingleOrMultiple>
        </mu-form-item>
      
        <MultipleShowList
          :list="multipleShowList"
          @multipleShowListChange="multipleShowListChange"
          type="sendUser"
        ></MultipleShowList>
        </mu-paper>
        </mu-form>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
import uploadList from '../../components/upLoad/uploadList'
import RelateBusiness from "../../components/RelateBusiness/RelateBusiness";
import PopSingleOrMultiple from "../../components/PopSingleOrMultiple";
import MultipleShowList from "../../components/MultipleShowList";

import { RELATION_BUSINESS } from "@constants/menuInfo.js";
export default {
  components:{
    AppBar, uploadList, RelateBusiness, PopSingleOrMultiple, MultipleShowList
  },
  data(){
    return{
      content:'',
      tomorrow:'',
      sentiment:'',
      support:'',
      relateMenu: {
        // 菜单的相应配置
        clues: RELATION_BUSINESS.clues,
        customers: RELATION_BUSINESS.customers,
        contacts: RELATION_BUSINESS.contacts,
        tasks: RELATION_BUSINESS.tasks,
        visits: RELATION_BUSINESS.visits,
      },
      form:{
        sendUser: [], // 接收人的拼接
        contactName: "", // 接收人的名字
        sendUserIds: '', //接收人id
      },
      imgSuccessList:{}, //图片
      enclosureSuccessList:{}, //附件
      batchId:'',
      relatedBusinessList:{}, //关联业务
      

      multipleShowList: [],
    }
  },
  watch: {
    "$parent.details"(val) {
      this.relatedBusinessList = {
        clues: val.clueList,
        customers: val.customerList,
        contacts: val.contactsList,
        tasks: val.tasksList,
        visits: val.visitsList,
      };
    },
    "form.sendUser"(val) {
      this.multipleShowList = val.map(item => ({
        text: item.contactsName,
        value: item.contactsId,
        img: item.img
      }));
    }
  },
  methods: {
    customFnc(){
      let params = {
        content:this.content,
        tomorrow:this.tomorrow,
        sentiment:this.sentiment,
        support:this.support,
        sendUserIds:this.form.sendUserIds,
        batchId: this.batchId,
        ...this.relatedBusinessList
      }
      this.api.addDaily(params).then(res => {
        if(res.msg === 'success') this.$toast.success('新增成功!');
      })
    },
    getImgSuccessList(data){
      this.batchId = data.guid;
    },
    getEnclosureSuccessList(data){
      this.batchId = data.guid;
    },
    relateBusinessChange({ nowConfig, commonParam, operate }){
      const param = {
        ...commonParam
      };
      this.relatedBusinessList = param
    },
    PopSingleOrMultipleChange({ selectArr, texts, ids, idsField, textsField }) {
      // 多选框的回调
      this.form.contactName = texts;
      this.form.sendUser = selectArr;
      // 这个属性并没有双向绑定
      this.form.sendUserIds = ids;
    },
    multipleShowListChange({ row, type }) {
      this.form.sendUser = this.form.sendUser.filter(
        item => item.userId * 1 !== row.value * 1
      );
      this.form.sendUserIds = this.form.sendUser
        .map(item => item.userId)
        .join(",");
    },
  },
  computed:{
    bootomPadingStatus(){
      if(this.relatedBusinessList.clueIds || this.relatedBusinessList.contactsIds || this.relatedBusinessList.customerIds ||
         this.relatedBusinessList.taskId || this.relatedBusinessList.taskIds || this.relatedBusinessList.visitIds){
        return true
      }else{
        return false
      }
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
      .bootomPading{
        padding-bottom: 10px !important;
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