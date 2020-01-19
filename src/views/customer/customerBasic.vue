<!--
 * @Description: 客户的基本信息
 * @Author: shenah
 -->
<template>
  <div class="customer-basic">
    <!-- 客户的基本信息 -->
    <div class="basic-one">
      <div class="basic-details-item">
        <div class="basic-details-item-left">
          <div class="title">客户行业</div>
          <div class="sub-title">{{$parent.details.customerTrade}}</div>
        </div>
      </div>
      <div class="basic-details-item">
        <div class="basic-details-item-left">
          <div class="title">客户类型</div>
          <div class="sub-title">{{$parent.details.customerType}}</div>
        </div>
      </div>
      <div class="basic-details-item">
        <div class="basic-details-item-left">
          <div class="title">客户来源</div>
          <div class="sub-title">{{$parent.details.customerSource}}</div>
        </div>
      </div>
      <div class="basic-details-item">
        <div class="basic-details-item-left">
          <div class="title">地址</div>
          <div class="sub-title">{{$parent.details.address}}</div>
        </div>
      </div>
      <div class="basic-details-item no-border-bottom">
        <div class="basic-details-item-left">
          <div class="title">详细地址</div>
          <div class="sub-title">{{$parent.details.detailAddress}}</div>
        </div>
      </div>
    </div>
    <div class="basic-two">
      <div
        class="basic-details-item"
        v-if="$parent.judgeBtn()"
      >
        <div class="basic-details-item-left">
          <div class="title">新增联系人</div>
        </div>
        <div class="basic-details-item-right">
          <img
            :src="loadingImg('add.png')"
            @click="goPage('addContacts',{id:$parent.id,type:'addCustomer',name:$parent.details.customerName})"
          />
        </div>
      </div>
      <div
        :key="index"
        v-for="(item,index) in $parent.contactsList"
      >
        <div
          :class="{'no-border-bottom':index===$parent.contactsList.length-1}"
          class="basic-details-item"
        >
          <div class="basic-details-item-left">
            <div class="title">{{item.name}}</div>
            <div class="sub-title">{{item.mobile}}</div>
          </div>
          <div class="basic-details-item-right">
            <img
              :src="loadingImg('call.png')"
              @click="dial(item.mobile)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="basic-two">
      <div class="basic-details-item no-border-bottom">
        <div class="basic-details-item-left">
          <div class="title">备注</div>
          <div class="sub-title">{{$parent.details.remark}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customerBasic",
  computed: {
    // 当前客户的id
    id() {
      return this.$route.params.id;
    },
    // 从何处进来
    // commonWatersCustomer => 从公海客户中进来
    type() {
      return this.$route.params.type;
    }
  },
  components: {},
  data() {
    return {};
  },
  props: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.customer-basic {
  width: 100%;
  .basic-one {
    background-color: #fff;
    padding: 0 0 0 15px;
  }
  .basic-two {
    margin-top: 12px;
    background-color: #fff;
    padding: 0 0 0 15px;
  }
}
</style>