/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 14:09:01
 * @LastEditTime: 2019-10-24 17:37:37
 * @LastEditors: shenah
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "", // token
    authorities: {
      crm: {
        customer: {}, // 客户
        pool: {}, // 公海
        contacts: {}, // 联系人
        leads: {} //线索
      },
      work: {
        task: {} // 任务
      }
    }, // 作者的权限
    loginUser: {}, // 登录者的信息
    bottomNav: "home" // 当前点击的底部页签
  },
  mutations: {
    // 基础方法
    setBottomNav: (state, data) => (state.bottomNav = data),
    // 登录的基本信息
    setloginInfo: (state, data) => {
      const { accessToken, authorities, user } = data;
      state.accessToken = accessToken;
      state.authorities = authorities;
      state.loginUser = user;
    }
  }
});
