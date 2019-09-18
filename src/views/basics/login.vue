<!--
 * @Description: 用户登录界面
 * @Author: shenah
 -->
<template>
  <div class="login">
    <div class="login-frame">
      <div class="login-frame-wrap">
        <div class="login-info">
          <mu-avatar size="100">
            <img src="/static/images/login-header.png" />
          </mu-avatar>
          <div class="text">欢迎回来!</div>
          <div class="user">
            <mu-form
              :model="form"
              class="mu-demo-form"
              label-position="left"
              ref="form"
            >
              <mu-paper
                :z-depth="0"
                class="block"
              >
                <mu-form-item
                  :rules="myRules.must('用户名')"
                  prop="username"
                >
                  <div class="login-input">
                    <img
                      class="input-img"
                      src="/static/images/login-user.png"
                    />
                    <mu-text-field
                      placeholder="请输入用户名"
                      prop="username"
                      v-model="form.username"
                    ></mu-text-field>
                  </div>
                </mu-form-item>
                <mu-divider></mu-divider>
                <mu-form-item
                  :rules="myRules.must('密码')"
                  class="password"
                  prop="password"
                >
                  <div class="login-input">
                    <img
                      class="input-img"
                      src="/static/images/login-password.png"
                    />
                    <mu-text-field
                      placeholder="请输入密码"
                      prop="password"
                      type="password"
                      v-model="form.password"
                    ></mu-text-field>
                  </div>
                </mu-form-item>
                <mu-divider></mu-divider>
              </mu-paper>
            </mu-form>
            <div class="operate">
              <div
                @click="handlePassword('remember')"
                class="left"
              >
                <img
                  class="select"
                  src="/static/images/selected.png"
                  v-show="flag"
                />
                <img
                  class="select"
                  src="/static/images/no-selected.png"
                  v-show="!flag"
                />
                <span>记住密码</span>
              </div>
              <div
                @click="handlePassword('forget')"
                class="right"
              >忘记密码?</div>
            </div>
            <div class="login-btn-wrap">
              <mu-button
                @click="login"
                class="login-btn"
                color="primary"
              >登录</mu-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tool from "../../../static/js/tool.js";
import Rules from "../../../static/js/rules";
import axios from "axios";
import qs from "querystring";
import Api from "@api";
export default {
  name: "login",
  components: {},
  data() {
    return {
      flag: false, // 是否记住密码
      form: {
        username: "admin", // 用户名
        password: "123456", // 密码
        source: tool.judgeModel() //  Web,Android,iOS
      }
    };
  },
  props: {},
  mounted() {},
  methods: {
    login() {
      // 这下面的真实的请求
      let self = this;
      this.$refs.form.validate().then(result => {
        if (result) {
          Api.userLoginIn(this.form).then(data => {
            this.$store.commit("setloginInfo", data);
            let unlockStr = tool.encAse192(JSON.stringify(data), "login");
            this.storage.localSet("login", unlockStr);
            this.goPage('home');
          });
        }
      });
    },
    handlePassword(type) {
      if (type === "forget") {
        console.log("忘记密码");
      } else {
        this.flag = !this.flag;
        console.log("记住密码");
      }
    }
  }
};
</script>
<style lang='less'>
.login .user .mu-demo-form .block {
  padding-left: 0 !important;
  .mu-form-item-label {
    padding-right: 0 !important;
  }
}
</style>
<style lang='less' scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @primary;
  .login-frame {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    padding-top: 120px;
    .login-frame-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding: 0 30px;
      border-radius: 40px 40px 0px 0px;
      .login-info {
        width: 100%;
        position: relative;
        top: -50px;
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        .text {
          margin-top: 20px;
          font-size: 20px;
          font-weight: @primary-weight;
          color: @primary-text;
        }
        .user {
          width: 100%;
          margin-top: 58px;
          .mu-demo-form {
            .login-input {
              width: 100%;
              display: flex;
              align-items: center;
              .input-img {
                margin-right: 10px;
                width: 20px;
                height: 20px;
              }
            }
            .password {
              margin-top: 30px;
            }
          }
          .operate {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .left {
              display: flex;
              align-items: center;
              color: @primary-text;
              .select {
                margin-right: 10px;
                width: 18px;
                height: 18px;
              }
            }
            .right {
              color: @primary;
            }
          }
          .login-btn-wrap {
            width: 100%;
            margin-top: 40px;
            display: flex;
            justify-content: center;
            .login-btn {
              width: 250px;
              height: 44px;
              border-radius: 6px;
            }
          }
        }
      }
    }
  }
}
</style>