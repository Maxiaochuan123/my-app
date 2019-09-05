/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2019-09-05 11:17:56
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("../views/basics/pageTransition.vue"),
      children: [
        // basics 基础页面
        {
          path: "/home",
          name: 'home',
          meta: { zIndex: 0 },
          component: () => import("../views/basics/home.vue")
        },
        {
          path: "/myInfo",
          name: 'myInfo',
          meta: { zIndex: 0 },
          component: () => import("../views/basics/myInfo.vue")
        },
        {
          path: "/myInfoChild",
          name: 'myInfoChild',
          meta: { zIndex: 1 },
          component: () => import("../views/basics/myInfoChild.vue")
        },
        // 联系人
        {
          path: "/contacts",
          name: 'contacts',
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/contacts.vue")
        },
        {
          path: "/addContacts",
          name: 'addContacts',
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/addContacts.vue")
        },
        {
          path: "/teamContacts",
          name: 'teamContacts',
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/teamContacts.vue")
        },
        {
          path: "/organization",
          name: 'organization',
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/organization.vue")
        },
        {
          path: "/personalInfo",
          name: 'personalInfo',
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/personalInfo.vue")
        },
        // 线索
        {
          path: "/clue",
          name: 'clue',
          meta: { zIndex: 1 },
          component: () => import("../views/clue/clue.vue"),
          children: [
            {
              path: "/myClue",
              name: 'myClue',
              meta: { zIndex: 1 },
              component: () => import("../views/clue/myClue.vue")
            },
            {
              path: "/teamClue",
              name: 'teamClue',
              meta: { zIndex: 1 },
              component: () => import("../views/clue/teamClue.vue")
            }
          ]
        },
        {
          path: "/clueDetails",
          name: 'clueDetails',
          meta: { zIndex: 1 },
          component: () => import("../views/clue/clueDetails.vue")
        },
        // 客户
        // 添加客户
        {
          path: "/addOrEditCustomer",
          name: 'addOrEditCustomer',
          meta: { zIndex: 1 },
          component: () => import("../views/customer/addOrEditCustomer.vue")
        },
        // 写跟进
        // 添加客户
        {
          path: "/writeFollowup",
          meta: { zIndex: 1 },
          component: () => import("../views/customer/writeFollowup.vue")
        },
        // 客户管理
        {
          path: "/customerManage",
          name: 'customerManage',
          meta: { zIndex: 1 },
          component: () => import("../views/customer/customerManage.vue")
        },
        // 客户详情
        {
          path: "/customerDetails",
          name: 'customerDetails',
          meta: { zIndex: 1 },
          component: () => import("../views/customer/customerDetails.vue"),
          children: [
            // 客户详情记录
            {
              path: "customerRecord/:id",
              name: 'customerRecord',
              meta: { zIndex: 1 },
              component: () => import("../views/customer/customerRecord.vue")
            },
            // 客户详情基本信息
            {
              path: "customerBasic/:id",
              name: 'customerBasic',
              meta: { zIndex: 1 },
              component: () => import("../views/customer/customerBasic.vue")
            }
          ]
        }
      ]
    }
  ]
});
