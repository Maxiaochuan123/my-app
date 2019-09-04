/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditTime: 2019-09-04 12:48:24
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
          meta: { zIndex: 0 },
          component: () => import("../views/basics/home.vue")
        },
        {
          path: "/myInfo",
          meta: { zIndex: 0 },
          component: () => import("../views/basics/myInfo.vue")
        },
        {
          path: "/myInfoChild",
          meta: { zIndex: 1 },
          component: () => import("../views/basics/myInfoChild.vue")
        },
        // 联系人
        {
          path: "/contacts",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/contacts.vue")
        },
        {
          path: "/addContacts",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/addContacts.vue")
        },
        {
          path: "/teamContacts",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/teamContacts.vue")
        },
        {
          path: "/organization",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/organization.vue")
        },
        {
          path: "/personalInfo",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/personalInfo.vue")
        },
        // 线索
        {
          path: "/clue",
          meta: { zIndex: 1 },
          component: () => import("../views/clue/clue.vue"),
          children: [
            {
              path: "/myClue",
              meta: { zIndex: 1 },
              component: () => import("../views/clue/myClue.vue")
            },
            {
              path: "/teamClue",
              meta: { zIndex: 1 },
              component: () => import("../views/clue/teamClue.vue")
            }
          ]
        },
        // 客户
        // 添加客户
        {
          path: "/addOrEditCustomer",
          meta: { zIndex: 1 },
          component: () => import("../views/customer/addOrEditCustomer.vue")
        },
        // 客户管理
        {
          path: "/customerManage",
          meta: { zIndex: 1 },
          component: () => import("../views/customer/customerManage.vue")
        },
        // 客户详情
        {
          path: "/customerDetails",
          meta: { zIndex: 1 },
          component: () => import("../views/customer/customerDetails.vue"),
          children: [
            // 客户详情记录
            {
              path: "customerRecord/:id",
              meta: { zIndex: 1 },
              component: () => import("../views/customer/customerRecord.vue")
            },
            // 客户详情基本信息
            {
              path: "customerBasic/:id",
              meta: { zIndex: 1 },
              component: () => import("../views/customer/customerBasic.vue")
            }
          ]
        }
      ]
    }
  ]
});
