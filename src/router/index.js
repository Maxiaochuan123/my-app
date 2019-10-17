/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditors: shenah
 */
import Vue from "vue";
import Router from "vue-router";
import storage from "../../static/js/storage";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: () => import("../views/basics/pageTransition.vue"),
      children: [
        {
          path: "/",
          redirect: "/home"
        },
        // basics 基础页面
        {
          path: "/login",
          name: "login",
          meta: { zIndex: 0 },
          component: () => import("../views/basics/login.vue")
        },
        {
          path: "/home",
          name: "home",
          meta: { zIndex: 0 },
          component: () => import("../views/basics/home.vue")
        },
        // 我的
        {
          path: "/myInfo",
          name: "myInfo",
          meta: { zIndex: 0 },
          component: () => import("../views/basics/myInfo.vue")
        },
        // 个人资料详情
        {
          path: "/personalDetails",
          name: "personalDetails",
          meta: { zIndex: 1 },
          component: () => import("../views/basics/personalDetails.vue")
        },
        // 共用页面
        // 选择用户
        {
          path: "/selectShareUsers/:id/:type",
          name: "selectShareUsers",
          meta: { zIndex: 1 },
          component: () => import("../views/commonPage/selectShareUsers.vue")
        },
        // 联系人
        {
          path: "/contacts",
          name: "contacts",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/contacts.vue")
        },
        {
          path: "/contactsDetails/:id/:type?",
          name: "contactsDetails",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/contactsDetails.vue")
        },
        {
          path: "/addContacts/:type/:id?",
          name: "addContacts",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/addContacts.vue")
        },
        {
          path: "/teamContacts",
          name: "teamContacts",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/teamContacts.vue")
        },
        {
          path: "/organization",
          name: "organization",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/organization.vue")
        },
        {
          path: "/personalInfo",
          name: "personalInfo",
          meta: { zIndex: 1 },
          component: () => import("../views/contacts/personalInfo.vue")
        },
        // 线索
        {
          path: "/clue",
          name: "clue",
          meta: { zIndex: 1 },
          component: () => import("../views/clue/clue.vue")
        },
        {
          path: "/clueDetails/:id/:type?",
          name: "clueDetails",
          meta: { zIndex: 1 },
          component: () => import("../views/clue/clueDetails.vue")
        },
        {
          path: "/editBasicsInfo/:id?/:type/:state",
          name: "editBasicsInfo",
          meta: { zIndex: 1 },
          component: () => import("../views/clue/editBasicsInfo.vue")
        },
        // 待办列表
        {
          path: "/toDoList",
          name: "toDoList",
          meta: { zIndex: 1 },
          component: () => import("../views/toDoList/toDoList.vue")
        },
        {
          path: "/selectPage/:pageTitle",
          name: "selectPage",
          meta: { zIndex: 1 },
          component: () => import("../views/toDoList/selectPage.vue")
        },
        
        // 日报
        {
          path: "/daily",
          name: "daily",
          meta: { zIndex: 1 },
          component: () => import("../views/daily/daily.vue")
        },
        {
          path: "/addDaily/:id?",
          name: "addDaily",
          meta: { zIndex: 1 },
          component: () => import("../views/daily/addDaily.vue")
        },
        {
          path: "/dailyDetails/:id/:type?",
          name: "dailyDetails",
          meta: { zIndex: 1 },
          component: () => import("../views/daily/dailyDetails.vue")
        },

        // 客户
        {
          path: "/addOrEditCustomer/:id?",
          name: "addOrEditCustomer",
          meta: { zIndex: 1 },
          component: () => import("../views/customer/addOrEditCustomer.vue")
        },
        // 写跟进
        {
          path: "/writeFollowup/:id/:type",
          name: "writeFollowup",
          meta: { zIndex: 1 },
          component: () => import("../views/customer/writeFollowup.vue")
        },
        // 客户管理
        {
          path: "/customerManage",
          name: "customerManage",
          meta: { zIndex: 1 },
          component: () => import("../views/customer/customerManage.vue")
        },
        // 客户详情
        {
          path: "/customerDetails/:id/:type?",
          name: "customerDetails",
          meta: { zIndex: 1 },
          component: () => import("../views/customer/customerDetails.vue"),
          children: [
            // 客户详情记录
            {
              path: "customerRecord",
              name: "customerRecord",
              meta: { zIndex: 1 },
              component: () => import("../views/customer/customerRecord.vue")
            },
            // 客户详情基本信息
            {
              path: "customerBasic",
              name: "customerBasic",
              meta: { zIndex: 1 },
              component: () => import("../views/customer/customerBasic.vue")
            }
          ]
        },
        // 公海模块
        // 公海
        {
          path: "/commonWaters",
          name: "commonWaters",
          meta: { zIndex: 1 },
          component: () => import("../views/commonWaters/commonWaters.vue"),
          children: [
            // 公海线索
            {
              path: "commonWatersClue",
              name: "commonWatersClue",
              meta: { zIndex: 1 },
              component: () =>
                import("../views/commonWaters/commonWatersClue.vue")
            },
            // 公海客户
            {
              path: "commonWatersPeople",
              name: "commonWatersPeople",
              meta: { zIndex: 1 },
              component: () =>
                import("../views/commonWaters/commonWatersPeople.vue")
            }
          ]
        },
        // 任务模块
        // 新增或者编辑任务
        {
          path: "/addOrEditTask/:id?",
          name: "addOrEditTask",
          meta: { zIndex: 1 },
          component: () => import("../views/task/addOrEditTask.vue")
        },
        // 任务列表
        {
          path: "/taskList",
          name: "taskList",
          meta: { zIndex: 1 },
          component: () => import("../views/task/taskList.vue")
        },
        // 任务详情
        {
          path: "/taskDetails/:id",
          name: "taskDetails",
          meta: { zIndex: 1 },
          component: () => import("../views/task/taskDetails.vue"),
          children: [
            // 客户详情记录
            {
              path: "taskRecord",
              name: "taskRecord",
              meta: { zIndex: 1 },
              component: () => import("../views/task/taskRecord.vue")
            },
            // 客户详情基本信息
            {
              path: "taskBasic",
              name: "taskBasic",
              meta: { zIndex: 1 },
              component: () => import("../views/task/taskBasic.vue")
            }
          ]
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("login")) {
    next();
  } else {
    if (to.path == "/login") {
      next();
    } else {
      storage.localRemove("login");
      next("/login");
    }
  }
});
export default router;
