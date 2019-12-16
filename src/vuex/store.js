/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 14:09:01
 * @LastEditTime: 2019-12-16 10:23:45
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
    // 登录的token
    setToken: (state, data) => {
      const { accessToken } = data;
      state.accessToken = accessToken;
    },
    // 根据token获取当前的登录信息
    setUser: (state, data) => {
      state.loginUser = data;
    },
    // 根据token获取当前用户的权限
    setAuthor: (state, data) => {
      state.authorities = data;
    }
  }
});
