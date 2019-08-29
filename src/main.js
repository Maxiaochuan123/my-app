/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2019-08-29 16:57:42
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';

import FastClick from 'fastclick' 
FastClick.attach(document.body)

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

Vue.use(MuseUI);


import mixins from '../static/js/mixins'
import storage from '../static/js/storage'
Vue.mixin(mixins)

Vue.config.productionTip = false;
Vue.prototype.storage = storage;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
