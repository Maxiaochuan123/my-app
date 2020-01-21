<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:13:47
 * @LastEditTime : 2020-01-21 10:37:07
 * @LastEditors  : shenah
 -->
<template>
  <div class="teamContacts">
    <AppBar pageTitle="联系人"></AppBar>
    <SearchInputBar
      @searchInputBarChange="searchInputBarChange"
      placeholderText="团队联系人"
    ></SearchInputBar>
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
              <div class="flex-right">
                <div class="right-text">
                  <span>{{row.name}}</span>
                  <span>{{row.remark}}</span>
                </div>
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
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
import SearchInputBar from "@components/SearchInputBar.vue";
import Nothing from "../../components/Nothing";
export default {
  components: {
    AppBar,
    SearchInputBar,
    Nothing
  },
  data() {
    return {
      loading: false,
      listObj: { list: [] },
      requestParams: { type: 1, teamType: 0, pageIndex: 1, pageSize: 15 }
    };
  },
  created() {
    this.queryList();
  },
  methods: {
    load() {
      // 滚动加载
      this.loading = true;
      this.requestParams.pageIndex += 1;
      this.queryList(true).then(() => {
        this.loading = false;
      });
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
    searchInputBarChange(obj) {
      const { type, value } = obj;
      this.requestParams.search = value;
      this.requestParams.pageIndex = 1;
      this.queryList();
    }
  }
};
</script>

<style scoped lang="less">
.teamContacts {
  .content {
    width: 100vw;
    height: 100vh;
    padding-top: 120px;
    position: fixed;
    bottom: 0;
    .content-wrap {
      width: 100%;
      height: 100%;
      overflow: auto;
      .list-wrap {
        width: 100%;
      }
      .bg-class {
        background-color: #fff;
      }
    }
    .user-index {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: @regular-text;
      height: 66px;
      padding: 0 20px;
      padding-top: 12px;
      position: relative;
      // background-color: dodgerblue;
      width: 100%;
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      .flex-right {
        flex: 1;
        width: 100%;
        margin-left: 20px;
        padding: 12px 0;
        display: flex;
        border-bottom: 1px solid @primary-border;
        justify-content: space-between;
        overflow: hidden;
        .right-text {
          display: flex;
          flex: 1;
          width: 100%;
          flex-direction: column;
          justify-content: center;
          margin-right: 10px;
          overflow: hidden;
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
        }

        i {
          font-size: 22px;
          color: @primary;
        }
      }
    }
  }
}
</style>