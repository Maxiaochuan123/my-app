<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime : 2020-01-19 17:12:28
 * @LastEditors  : shenah
 -->

<template>
  <div class="contacts">
    <AppBar
      :rightIconFlag="save"
      :rightLinkParams="{type:'addPersonal'}"
      pageTitle="个人联系人"
      rightIcon="icon-tianjia"
      rightLinkName="addContacts"
    ></AppBar>
    <SearchInputBar
      @searchInputBarChange="searchInputBarChange"
      placeholderText="搜索联系人"
    ></SearchInputBar>
    <div class="organization">
      <mu-list>
        <mu-list-item
          @click="goPage('organization')"
          button
          v-waves
        >
          <mu-list-item-action>
            <mu-avatar>
              <img :src="loadingImg('department.png')" />
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>公司部门</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider shallow-inset></mu-divider>
        <mu-list-item
          @click="goPage('teamContacts')"
          button
          v-waves
        >
          <mu-list-item-action>
            <mu-avatar>
              <img :src="loadingImg('teamContacts.png')" />
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>团队联系人</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value=":iconfont icon-rightArrow"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </div>
    <div class="content">
      <div class="content-wrap">
        <mu-load-more
          :class="{'bg-class':listObj.list.length > 0}"
          :loading="loading"
          @load="load"
          class="list-wrap"
        >
          <div v-if="listObj.list.length">
            <div
              :key="index"
              @click="goPage('contactsDetails',{id: row.contactsId,type:'联系人'})"
              class="user-index"
              v-for="(row,index) in listObj.list"
            >
              <img :src="loadingImg('defaultImg.png')" />
              <div>
                <span>{{row.name}}</span>
                <span>{{row.customerName}} {{row.post}}</span>
                <i class="iconfont icon-dianhua"></i>
              </div>
            </div>
          </div>

          <Nothing
            v-else
            words="暂无联系人"
          ></Nothing>
        </mu-load-more>
      </div>
      <!-- <IndexsList :tagTop="242" :tagTopoffsetTop="250" :listSpacing="198" :list="userList" v-if="Object.keys(userList).length > 0">
        <div slot="row" slot-scope="{row}" class="user-index" @click="goPage('contactsDetails',{id: row.contactsId,type:'联系人'})">
          <img :src="loadingImg('defaultImg.png')" />
          <div>
            <span>{{row.name}}</span>
            <span>{{row.customerName}}  {{row.post}}</span>
            <i class="iconfont icon-dianhua"></i>
          </div>
        </div>
      </IndexsList>-->
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import IndexsList from "../../components/IndexsList";
import SearchInputBar from "@components/SearchInputBar.vue";
import Nothing from "../../components/Nothing";
import { mapState } from "vuex";

export default {
  components: {
    AppBar,
    IndexsList,
    SearchInputBar,
    Nothing
  },
  data() {
    return {
      listObj: {
        list: []
      },
      sheachList: [],
      loading: false,
      requestParams: { type: 1, teamType: 1, pageIndex: 1, pageSize: 15 }
    };
  },
  computed: {
    ...mapState({
      save: state => state.authorities.crm.contacts.save
    })
  },
  created() {
    this.queryList();
  },
  methods: {
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.search = value;
      this.requestParams.pageIndex = 1;
      this.queryList();
    },
    queryList(flag) {
      return this.api.getContacts(this.requestParams).then(res => {
        let data = res.data;
        let list = data.list;
        if (list.length === 0 && flag) {
          this.requestParams.pageIndex -= 1;
        }
        if (flag) {
          this.listObj.list.push(...list);
        } else {
          this.listObj = res.data;
        }
      });
    },
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.queryList(true).then(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="less">
.organization {
  position: fixed;
  top: 104px;
  width: 100vw;
  height: 120px;
  background-color: #fff;
  z-index: 1;
  .shallow-inset {
    margin-left: 72px;
  }
  // .mu-divider {
  //   width: 75%;
  // }
}
.contacts {
  .content {
    width: 100vw;
    height: 100vh;
    padding-top: 244px;
    position: fixed;
    bottom: 0;
    overflow: hidden;
    .content-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
      .list-wrap {
        width: 100%;
      }
      // .mu-divider{
        // width: 75%;
      // }
    }
    .user-index {
      // display: flex;
      // justify-content: flex-start;
      // align-items: center;
      color: @regular-text;
      height: 66px;
      padding: 0 20px;
      padding-top: 12px;
      position: relative;
      background-color: #fff;

      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      div {
        position: absolute;
        top: 0;
        left: 60px;
        width: 70%;
        margin-left: 20px;
        padding: 12px 0;

        display: flex;
        flex-direction: column;
        // border-bottom: 1px solid @primary-border;

        span:nth-child(1) {
          font-size: @primary-size;
          font-weight: 400;
          color: @primary-text;
        }
        span:nth-child(2) {
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        i {
          font-size: 22px;
          color: @primary;
          position: absolute;
          top: 18px;
          right: 0;
        }
      }
    }
  }
}
</style>