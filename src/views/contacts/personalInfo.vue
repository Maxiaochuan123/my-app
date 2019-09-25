<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 11:20:09
 * @LastEditTime: 2019-09-05 10:59:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="personalInfo">
    <AppBar pageTitle="个人信息" />

    <div class="content">
      <mu-paper
        :z-depth="0"
        class="topInfo"
      >
        <div class="headImg">
          <img :src="loadingImg('默认头像.png')" />
        </div>
        <div class="info">
          <div class="name">
            <span>{{info.realname}}</span>
            <!-- <img :src="loadingImg('女.png')" /> -->
          </div>
          <div class="level">{{info.post}}</div>
        </div>
      </mu-paper>

      <mu-paper
        :z-depth="0"
        class="describeInfo"
      >
        <mu-list>
          <mu-list-item v-waves>
            <mu-list-item-content>
              <mu-list-item-title>手机号码</mu-list-item-title>
              <mu-list-item-sub-title>{{info.mobile}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-icon
                @click="dial(info.mobile)"
                value=":iconfont icon-dianhua"
              ></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item>
            <mu-list-item-content>
              <mu-list-item-title>部门</mu-list-item-title>
              <mu-list-item-sub-title>{{info.deptName}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </div>
  </div>
</template>

<script>
import AppBar from "../../components/AppBar";
export default {
  name: "personalInfo",
  components: { AppBar },
  data() {
    return {
      info:this.$route.params
    };
  },
  methods: {},
  mounted(){
    console.log(this.info)
  }
};
</script>

<style scoped lang="less">
.personalInfo {
  .content {
    padding: 44px 4px;
    .topInfo {
      display: flex;
      padding: 20px @primary-size;
      margin: 12px 0;
      .headImg {
        width: 60px;
        height: 60px;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .info {
        flex-grow: 1;
        padding-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          color: @primary-text;
          font-size: @primary-size;
          font-weight: 600;
          display: flex;
          align-items: center;
          padding-bottom: 2px;
          img {
            width: 20px;
            height: 20px;
            margin-left: 6px;
          }
        }
        .level {
          font-size: 14px;
          color: @regular-text;
        }
      }

      .mu-item-content {
        padding-left: 12px;
        .mu-avatar {
          width: 60px;
          height: 60px;
        }
        .mu-item-title {
          position: relative;
          font-weight: 600;
        }
      }

      .sex {
        position: absolute;
        top: 12px;
        left: 30px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }

    .mu-icon {
      width: 40px;
      height: 40px;
      text-align: right;
    }
    .mu-divider {
      margin-left: 4%;
      width: 92%;
    }

    .describeInfo {
      .mu-item-content {
        .mu-item-title {
          font-size: 14px;
          color: @regular-text;
        }
        .mu-item-sub-title {
          color: @primary-text;
          font-size: @primary-size;
        }
      }
      .mu-list /deep/ .mu-item {
        height: 72px;
      }
      i {
        font-size: 22px;
        color: @primary;
        position: absolute;
        top: 24px;
        right: 18px;
      }
    }
  }
}
</style>