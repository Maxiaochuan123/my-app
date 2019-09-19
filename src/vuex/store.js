/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 14:09:01
 * @LastEditTime: 2019-08-29 09:40:31
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "", // token
    authorities: {}, // 作者的权限
    loginUser: {}, // 登录者的信息
    userList: []
  },
  mutations: {
    // 基础方法
    setUserList: (state, data) => (state.userList = data),
    // 登录的基本信息
    setloginInfo: (state, data) => {
      const {accessToken,authorities,user} = data;
      state.accessToken = accessToken;
      state.authorities = authorities;
      state.loginUser = user;
    }
  }
});
