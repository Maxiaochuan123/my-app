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
          <div class="sub-title">汽车</div>
        </div>
      </div>
      <div class="basic-details-item">
        <div class="basic-details-item-left">
          <div class="title">客户类型</div>
          <div class="sub-title">经销商</div>
        </div>
      </div>
      <div class="basic-details-item">
        <div class="basic-details-item-left">
          <div class="title">客户级别</div>
          <div class="sub-title">H级(战略经销商)</div>
        </div>
      </div>
      <div class="basic-details-item">
        <div class="basic-details-item-left">
          <div class="title">客户来源</div>
          <div class="sub-title">到店</div>
        </div>
      </div>
      <div class="basic-details-item no-border-bottom">
        <div class="basic-details-item-left">
          <div class="title">地址</div>
          <div class="sub-title">四川省成都市高新区天府街道224号</div>
        </div>
      </div>
    </div>
    <div class="basic-two">
      <div class="basic-details-item" v-if="type !== 'commonWatersCustomer'">
        <div class="basic-details-item-left">
          <div class="title">新增联系人</div>
        </div>
        <div class="basic-details-item-right">
          <img src="/static/images/add.png" @click="goPage('addContacts',{id:$parent.id})" />
        </div>
      </div>
      <div v-for="(item,index) in contacts" :key="index">
        <div class="basic-details-item" :class="{'no-border-bottom':index===contacts.length-1}">
          <div class="basic-details-item-left">
            <div class="title">{{item.name}}</div>
            <div class="sub-title">{{item.phone}}</div>
          </div>
          <div class="basic-details-item-right">
            <img src="/static/images/call.png" @click="dial(item.phone)" />
          </div>
        </div>
      </div>
    </div>
    <div class="basic-two">
      <div class="basic-details-item no-border-bottom">
        <div class="basic-details-item-left">
          <div class="title">备注</div>
          <div class="sub-title">发达凡达四方达大师法打放大萨芬达到撒范德萨</div>
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
    return {
      contacts: [
        {
          name: "白超超",
          phone: "18980521111"
        },
        {
          name: "法德萨法",
          phone: "18980522111"
        }
      ] // 联系人列表
    };
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