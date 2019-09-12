/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2019-09-05 11:57:23
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';

// import FastClick from 'fastclick' 
// FastClick.attach(document.body)

// import 'muse-ui/lib/styles/base.less';
// import 'muse-ui/lib/styles/theme.less';

// import { BottomNav, AppBar, Button, Menu, List, Icon, Drawer, Carousel, Paper, Select} from 'muse-ui';
// Vue.use(BottomNav);
// Vue.use(AppBar);
// Vue.use(Button);
// Vue.use(Menu);
// Vue.use(List);
// Vue.use(Icon);
// Vue.use(Drawer);
// Vue.use(Carousel);
// Vue.use(Paper);
// Vue.use(Select);
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Toast from 'muse-ui-toast';
import options from '../static/js/options'
import Message from 'muse-ui-message';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';

Vue.use(MuseUI);
Vue.use(Toast);
Toast.config(options.toast)
Vue.use(Message);
Message.config(options.message)
Vue.use(Loading);

import mixins from '../static/js/mixins'
import storage from '../static/js/storage'
import apiMethod from './api/apiMethod';
Vue.mixin(mixins)

import dayjs from 'dayjs';
Vue.prototype.dayjs = dayjs;

Vue.config.productionTip = false;
Vue.prototype.storage = storage;
Vue.prototype.apiMethod = apiMethod;


import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview);

import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger_vue'

Vue.use(AlloyFingerPlugin,{
  AlloyFinger
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
