/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 15:40:36
 * @LastEditors  : shenah
 */
import Vue from "vue";
import Router from "vue-router";
import store from '../vuex/store'
import storage from '../../static/js/storage'
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
        // 选择分享用户
        {
          path: "/selectShareUsers/:id/:type",
          name: "selectShareUsers",
          meta: { zIndex: 1 },
          component: () => import("../views/commonPage/selectShareUsers.vue")
        },
        // 选择分配用户
        {
          path: "/selectDistributeUsers/:id/:type",
          name: "selectDistributeUsers",
          meta: { zIndex: 1 },
          component: () =>
            import("../views/commonPage/selectDistributeUsers.vue")
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
          path: "/addContacts/:type/:id?/:name?",
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
          path: "/addDaily/:id?/:state?",
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
          component: () => import("../views/customer/customerDetails.vue")
        },
        // 公海模块
        // 公海
        {
          path: "/commonWaters",
          name: "commonWaters",
          meta: { zIndex: 1 },
          component: () => import("../views/commonWaters/commonWaters.vue")
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
          component: () => import("../views/task/taskDetails.vue")
        },
        // 拜访模块
        // 拜访列表
        {
          path: "/visitList",
          name: "visitList",
          meta: { zIndex: 1 },
          component: () => import("../views/visit/visitList.vue")
        },
        // 新增或者编辑拜访
        {
          path: "/addOrEditVisit/:id?",
          name: "addOrEditVisit",
          meta: { zIndex: 1 },
          component: () => import("../views/visit/addOrEditVisit.vue")
        },
        // 拜访详情页
        {
          path: "/visitDetails/:id",
          name: "visitDetails",
          meta: { zIndex: 1 },
          component: () => import("../views/visit/visitDetails.vue")
        }
      ]
    }
  ]
});
const crmToGroup = store.state.crmToGroup;
if(!crmToGroup){
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
}
export default router;
