<!--
 * @Description: 新增或者编辑拜访
 * @Author: shenah
 * @Date: 2019-10-17 16:54:08
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-22 10:01:55
 -->

<template>
  <div class="add-or-edit-visit">
    <AppBar
      :customFnc="save"
      :pageTitle="pageTitle"
      custom
      customTitle="保存"
    ></AppBar>
    <div class="content">
      <mu-form
        :model="form"
        class="mu-demo-form"
        label-position="left"
        label-width="100"
      >
        <mu-paper
          :z-depth="0"
          class="block"
        >
          <mu-form-item
            label="拜访客户"
            prop="visitCustomerName"
          >
            <PopSingleOrMultiple
              :defaultValue="form.visitCustomerName"
              :selected="form.visitCustomer"
              @PopSingleOrMultipleChange="PopSingleOrMultipleChange"
              apiName="queryCustomerListPC"
              fieldName="visitCustomerName"
              idField="customerId"
              mode="single"
              name="拜访客户"
              splitField="visitCustomer"
              textField="customerName"
            >
              <mu-icon
                color="#FF0000"
                size="24"
                slot="rightIcon"
                value=":iconfont icon-kehufenxi"
              ></mu-icon>
            </PopSingleOrMultiple>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            label="拜访联系人"
            prop="visitContactName"
          >
            <PopSingleOrMultiple
              :defaultValue="form.visitContactName"
              :selected="form.visitContact"
              @PopSingleOrMultipleChange="PopSingleOrMultipleChange"
              apiName="queryContactsPC"
              fieldName="visitContactName"
              idField="contactsId"
              mode="single"
              name="拜访联系人"
              splitField="visitContact"
              textField="name"
            >
              <mu-icon
                color="#FF0000"
                size="24"
                slot="rightIcon"
                value=":iconfont icon-lianxiren"
              ></mu-icon>
            </PopSingleOrMultiple>
          </mu-form-item>
          <mu-divider></mu-divider>
          <mu-form-item
            class="line-feed"
            label="拜访内容"
            label-position="top"
            prop="content"
          >
            <mu-text-field
              :rows="3"
              :rows-max="5"
              multi-line
              placeholder="请输入拜访内容"
              v-model="form.content"
            ></mu-text-field>
          </mu-form-item>
          <mu-divider></mu-divider>
          <UploadList
            :customEnclosureList="customEnclosureList"
            :customImgList="customImgList"
            :ishasAfferent="false"
            @changecustomEnclosureList="changecustomEnclosureList"
            @changecustomImgList="changecustomImgList"
            @getImgSuccessList="getImgSuccessList(...arguments,{fieldName:'batchId'})"
            class="upload-file"
          ></UploadList>
          <mu-divider></mu-divider>
          <!-- 地图类型 -->
          <mu-form-item
            label="地址"
            prop="address"
          >
            <SelectAddress
              :defaultValue="form.address"
              @addressChange="addressChange"
              fieldName="address"
            ></SelectAddress>
          </mu-form-item>
        </mu-paper>
        <mu-paper
          :z-depth="0"
          class="block"
        >
          <mu-form-item
            label="接收人"
            prop="sendUserName"
          >
            <PopSingleOrMultiple
              :defaultValue="form.sendUserName"
              :selected="form.sendUser"
              @PopSingleOrMultipleChange="PopSingleOrMultipleChange"
              apiName="querySimpleUserByDepId"
              fieldName="sendUserName"
              idField="userId"
              mode="multiple"
              name="接收人"
              splitField="sendUser"
              textField="realname"
              :isShowText="false"
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
import PopSingleOrMultiple from "@components/PopSingleOrMultiple.vue";
import SelectAddress from "@components/SelectAddress.vue";
import MultipleShowList from "@components/MultipleShowList.vue";
import UploadList from "@components/upLoad/uploadList.vue";
import AppBar from "@components/AppBar.vue";
export default {
  name: "addOrEditVisit",
  components: {
    AppBar,
    PopSingleOrMultiple,
    UploadList,
    SelectAddress,
    MultipleShowList
  },
  data() {
    return {
      customEnclosureList: [], // 文件
      customImgList: [], // 图片
      pageTitle: "",
      multipleShowList: [],
      form: {
        visitCustomer: [], // 拜访客户的拼接
        visitCustomerName: "", // 拜访的名字
        visitCustomerId: "", // 拜访的id
        visitContact: [], // 拜访联系人的拼接
        visitContactName: "", // 拜访联系人的名字
        visitContactId: "", // 拜访联系人的id
        sendUser: [], // 接收人的拼接
        sendUserName: "", // 接收人的名字
        sendUserId: "", // 接收人的id
        content: "", // 拜访内容
        batchId: "" // 文件
      }
    };
  },
  props: {},
  watch: {
    "form.sendUser"(val) {
      this.multipleShowList = val.map(item => ({
        text: item.realname,
        value: item.userId,
        img: item.img
      }));
    }
  },
  mounted() {
    this.judgeType();
  },
  methods: {
    judgeType() {
      if (this.id) {
        this.pageTitle = "编辑拜访";
      } else {
        this.pageTitle = "新增拜访";
      }
    },
    PopSingleOrMultipleChange({ selectArr, texts, ids, idsField, textsField }) {
      // 多选框的回调
      this.form[textsField] = texts;
      this.form[idsField] = selectArr;
      // 这个属性并没有双向绑定
      this.form[`${idsField}Id`] = ids;
    },
    changecustomImgList(data) {
      this.customImgList = data;
    },
    changecustomEnclosureList(data) {
      this.customEnclosureList = data;
    },
    getImgSuccessList(res, row) {
      const { fieldName } = row;
      const { list, guid } = res;
      this.form[fieldName] = guid;
      console.log(1111, guid);
    },
    addressChange({ value, fieldName, lng, lat, region }) {
      this.form[fieldName] = value;
      this.form.longitude = lng;
      this.form.latitude = lat;
    },
    multipleShowListChange({ row, type }) {
      this.form[type] = this.form[type].filter(
        item => item.userId !== row.value
      );
      this.form[`${typeId}`] = '';
    },
    save() {}
  }
};
</script>
<style lang='less' scoped>
.add-or-edit-visit {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    padding-top: 40px;
    height: 100%;
    overflow: auto;
    .line-feed {
      align-items: flex-start !important;
      .mu-form-item-content {
        width: 100% !important;
      }
    }
  }
}
</style>