<!--
 * @Description: 关联业务组件
 * @Author: shenah
 * @Date: 2019-10-12 17:16:43
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-14 13:00:41
 -->

<template>
  <div class="relate-business">
    <div class="basic-details-item no-border-bottom">
      <div class="basic-details-item-left">
        <div class="sub-title">关联业务</div>
      </div>
      <div
        @click="relate"
        class="basic-details-item-right"
      >
        <mu-menu
          :open="open"
          cover
        >
          <mu-icon
            color="primary"
            size="24"
            value=":iconfont icon-guanlianbiaodanbiaogeguanxi"
          ></mu-icon>
          <mu-list slot="content">
            <mu-list-item
              :key="index"
              @click="menuClick(item)"
              button
              v-for="(item,index) in menuList"
            >
              <mu-list-item-title>{{item.name}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </div>
    </div>
    <div class="relate-list">
      <div
        :key="key"
        v-for="(item,key) in infoObj"
      >
        <div v-if="item.list.length>0">
          <div
            :key="index"
            class="relate-list-item"
            v-for="(one,index) in item.list"
          >
            <div>{{item.name}} - {{one[item.showField]}}</div>
            <img
              :src="loadingImg('delete.png')"
              @click.stop="deleteRelate(one,index,key)"
              class="close"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@api";
export default {
  name: "RelateBusiness",
  computed: {
    // 当前任务的详情
    id() {
      return this.$route.params.id;
    }
  },
  components: {},
  data() {
    return {
      open: false,
      clues: [], // 线索
      customers: [], // 客户
      contacts: [], // 联系人
      menuList: [
        {
          name: "线索",
          type: "clue"
        },
        {
          name: "客户",
          type: "customer"
        },
        {
          name: "联系人",
          type: "contacts"
        }
      ],
      infoObj: {
        // 关联的业务的配置项
        clue: {
          name: "线索",
          list: [],
          id: "leadsId",
          param: "clueIds",
          showField: "leadsName"
        },
        customers: {
          name: "客户",
          list: [],
          id: "customerId",
          param: "customerIds",
          showField: "customerName"
        },
        contacts: {
          name: "联系人",
          list: [],
          id: "contactsId",
          param: "contactsIds",
          showField: "name"
        }
      }
    };
  },
  props: {
    clueList: {
      type: Array,
      default: () => []
    },
    contactsList: {
      type: Array,
      default: () => []
    },
    customerList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    clueList(val) {
      this.infoObj.clue.list = val;
    },
    contactsList(val) {
      this.infoObj.contacts.list = val;
    },
    customerList(val) {
      this.infoObj.customers.list = val;
    }
  },
  mounted() {},
  methods: {
    relate() {
      this.open = true;
    },
    beforeSub(row, index, type) {
      const param = {
        taskId: this.id,
        clueIds: "",
        customerIds: "",
        contactsIds: ""
      };
      Object.keys(this.infoObj).forEach((key, objIndex) => {
        const { list, id, param: request } = this.infoObj[key];
        if (objIndex === 0) {
          this.infoObj[type].list.splice(index, 1);
        }
        param[request] = list.map(item => item[id]).join(",");
      });
      return param;
    },
    deleteRelate(row, index, type) {
      this.$confirm("是否删除此客户?", "提示").then(({ result, value }) => {
        const param = this.beforeSub(row, index, type);
        if (result) {
          Api.updateTaskRelation(param).then(res => {
            this.$toast.success("删除成功");
            this.goReplacePage("taskBasic", { id: this.id, type: this.type });
          });
        }
      });
    },
    menuClick(row) {
      const { type } = row;
      this.goPage("selectInfo", { type, id: this.id });
    }
  }
};
</script>
<style lang='less' scoped>
.relate-business {
  .relate-list {
    padding-right: 15px;
    .relate-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 6px;
      padding: 8px 10px;
      background-color: #ededed;
      border-radius: 6px;
      font-size: @regular-size;
      color: @primary-text;
      font-weight: @regular-weight;
    }
    .close {
      width: 20px;
      height: 20px;
    }
  }
}
</style>