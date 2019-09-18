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
              label-width="70"
              ref="form"
            >
              <mu-paper
                :z-depth="0"
                class="block"
              >
                <mu-form-item
                  :rules="myRules.must('用户名')"
                  icon="icon-shouji"
                  label="用户名"
                  prop="username"
                >
                  <mu-text-field
                    placeholder="请输入用户名"
                    prop="username"
                    v-model="form.username"
                  ></mu-text-field>
                </mu-form-item>
                <mu-divider></mu-divider>
                <mu-form-item
                  :rules="myRules.must('密码')"
                  class="password"
                  icon="icon-mima"
                  label="密码"
                  prop="password"
                >
                  <mu-text-field
                    placeholder="请输入密码"
                    prop="password"
                    type="password"
                    v-model="form.password"
                  ></mu-text-field>
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
      const unlockPwdStr =
        "219c769ac982c95d831ceb2a9c1eda4dd8df381912ad6e0e43217bdf43360d25811cfb8a8f530414c5fe2743d4313fc64fa79b91b1ef89e2bfc0d0796851690b8629462fc4881928189813c0118d052e4af6030c0e54d823a970683a8228ec8332cb9842a26f1d59c1cc3672697633753fd6122fb11587355e754d36ed119733f92386421b67f9e0de00a581fea8cf72ce326cc8960b5633898b669dbc8a24b266425b4e43683ea3034dd53276759c8bbbbb185f23078166050546a6d8210468c2abd009554cd63e320ae37a58b9851d292299f36eef8af1ba80deaca9fce82c9b545c47b84f48ede447409aff2f468f5514f74c9f3f6f36ba6d75b8af9c9773516c5df740ab20b6f9bf85563772b465202c6883e58a355f12dabca6637540fdab264665d12134648757e99306155f3e8f7cfdc86adc23ffc58be76b1863b4c52b7ccc354437abbda3a12caef8fe1781bc905242c3223109847d594b0ba7a3b49f1e136b869304bc682ae89ed1f534c571f775a5f9865e97342d7b9d2ec865f29b3fe58a3ad440ae388d7876837cd822a902e67aa77c338b68675f8a344d1d1ed190cd8764ef2ad60c5f69c971824fc8600cfd41ecbca7d22654876fc9a5ffbe4d3b0ae55de6a6579680eaaf78d20669e4ddccd9f4991b127cbf668aa311867ee210db6529a1c30539e93978edf548af41d88920c3b24ecba32c5bc08f4e1e3a56fe8ef4c79f3fde22b06911fddfa389c4795146ef87d47abbaeae03681da8cd47f030294f6e35fe0ea1fbc9636ce97d3a91c2ea47dcf000e0a7eea705de6b43378043621ce9b71dbe025cc4d11f807a95c426156e9fe02c4624f5b85839772441736b1c23cef3f477fc5835a03d0bd700e96f461b4ae699f2cb472a6ff7fa833aceb0f4d1b019a0a1ae5115e0ad1b4b8de105c5dfe2623682d14addb445189f94d8784a7e577e89e423d19306066e77c9c7a1e0a18569b8be628b467fad34f66008819ac60da3097371716db0d3b2b220fb939c180d495cd2123a06700499c60d94d19ef28e435fe0479a3c3e9b58ad3721985e0693a829883c16c306ed4e1ad1d0b1e82689b6160c561e5003f64601c01205d309a02615f5969a02b1902fce8cd03f5f1f6eda402b3895e4e33a784ca792bee58c1487fe2cb934ed19b60a8cad6e57ca20d04d146e5959815e59f86292bba4397418e0dcbb8ef6f0875af178e4cde7f19997790eeef42330ea4b1f111d73e265c787c27447fd8277283ca8d10bcdaf9837e4688f9c81734b6d764114224a99de5e476e0900564101c6b5e62c311be0fb432aaf554477224f6585ec87b7d476bdce556ea14912d39d832fea25f676389aaf29c12bc288d2afc863387183660579d577c378cb13c89a346f9ab758de96a09eff2396aeec8a1846207fff32b3ab8573a48f1b6a267bf26622ecaa44d1c7be3748a44c2b73d1edea762bd909e321d766b89a3724851b854cad0f2c96d1adaeab2aa7ffde587e9867fd9fc036d9b718e14d5e06f6511a0490e386400aa2e85ec19752361557ea4effcdce9c787d9ee03b37b6eb3dc7701e13caae84cbd46d7104552c50bd26b287303dbba9144553f149a0397c0fd1b285d543cd0124f7d3015b8220bde378d09cca24a9e9f83cea0697495da55e9fed9b07576a9058d37ffb96d18e5749da97a184bc57a0a3614516a854237105a63108de0c89383061e1f8b6b08fae5be2c4ae6a527ff0c1dd943b507ad3879c139e613833d5c57deba9f344c689d92df0f7660c34874ac8c5495f641e6aaa163543d3ef38b78bdaf1f72b2e86440d11cec78ab21dcc3a5d2b60046c7d22073ee206040a8a65ae84ff45379615982391312dd55a36dca255e08de7a824699a4603a26d44ef49f24dc3da7ec3843152110328568b488b6de66861008b0b517876bfed314064273bb03cc4783afb90e7e3dbcd57b35331040eedf354bd48a6bfe3b710d85a46f05cae73d50dafdbd7711c93cf9c6787c528845dfbf4bebf0db43a8614adbaf728073c946ceb73b0bb7fec7a3344bdebecfcaceb6ebc1257a39acd0fde36289a6ca318b744c58d670f2167b08a94ab94c5018a1986197a0231cfc3d598f146762609adc74b471ecb989e0fa272895145d1ddad0bc6bc978e7d9a0dd20f2bf995be95bc137129915e0f6c290885fee62615346b03c575502dae60d6fe3bf567c49dde8f782d8a9d33ceca92bd2c07182dcea29dadf7e101fcace4b978bd2504fcc37642a5d6543b2ab5c4c8671fea2a8c66f3e8765997f30edca9d46db9e104bdc0a4978cf798ace522192cc4b226e555b614a2994a5f04e0fa873fd9bf8bfcf10661d82e282da565f9f77a966f70f05ab5ed8f78546915834deabab2ce8a79f679b48ed802b62a0dbbd16814ac7e55caaee1872b58c0c2ca89d6809b14615d449e1b6d6a0f5d1847ebe86076267dfadd75a43174f68050646f5cf174445854d556932bb82ad84530efd98fa0bb77639982ca64d5e5ea718d40571448e5c6bb670ba78c775a37e6647b9feaf30385adec9e77ef8ee93b25dba7c2b08944e803940513cecf0123218c7adf61dc522d9406b071bbb8296916516ef5f8674934fff827bde51c99a0b62f582432c9ee9be5a7af82a5e742e3759ad2c946d261617be6dfc96cec73ec994251b2e3fff210357dfca039731a552d495322177eaba899d8f226";
      this.storage.localSet("login", unlockPwdStr);
      this.goPage('home');
      return;
      // 这下面的真实的请求
      let self = this;
      this.$refs.form.validate().then(result => {
        if (result) {
          axios({
            method: "post",
            url: `${window.config.service}/login`,
            data: qs.stringify(this.form),
            headers: {
              "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          })
            .then(res => {
              let data = res.data;
              this.$store.commit("loginInfo", data);
              let unlockStr = tool.encAse192(JSON.stringify(data), "login");
              this.storage.localSet("login", unlockStr);
            })
            .catch(error => {});
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
<style>
.login .user .mu-demo-form .block {
  padding-left: 0 !important;
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