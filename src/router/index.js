/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2019-08-29 17:29:57
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: () => import('../views/basics/pageTransition.vue'),
    children: [
      // basics 基础页面
      {
        path: '/home',
        meta:{zIndex:0},
        component: () => import('../views/basics/home.vue')
      },{
        path: '/myInfo',
        meta:{zIndex:0},
        component: () => import('../views/basics/myInfo.vue')
      },{
        path: '/myInfoChild',
        meta:{zIndex:1},
        component: () => import('../views/basics/myInfoChild.vue')
      },

      // 联系人
      {
        path: '/contacts',
        meta:{zIndex:1},
        component: () => import('../views/contacts/contacts.vue')
      },{
        path: '/organizationDrawer',
        meta:{zIndex:1},
        component: () => import('../views/contacts/organizationDrawer.vue')
      }
    ]
  }]
})