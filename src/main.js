/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2019-09-05 11:57:23
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./vuex/store";
import fastclick from "fastclick";
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import Toast from "muse-ui-toast";
import options from "../static/js/options";
import Message from "muse-ui-message";
import "muse-ui-loading/dist/muse-ui-loading.css"; // load css
import Loading from "muse-ui-loading";

Vue.use(MuseUI);
Vue.use(Toast);
Toast.config(options.toast);
Vue.use(Message);
Message.config(options.message);
Vue.use(Loading);
fastclick.attach(document.body);

import mixins from "../static/js/mixins";
import storage from "../static/js/storage";
import apiMethod from "./api/apiMethod";
Vue.mixin(mixins);

import dayjs from "dayjs";
Vue.prototype.dayjs = dayjs;

Vue.config.productionTip = false;
Vue.prototype.storage = storage;
Vue.prototype.apiMethod = apiMethod;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
