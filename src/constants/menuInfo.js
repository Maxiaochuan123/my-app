/*
 * @Description: 相关的菜单的配置项
 * @Author: shenah
 * @Date: 2019-10-15 11:41:45
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-15 14:10:55
 */

/**
 * @description: 业务关联项目的配置
 * 对象参数名的解释
 * @param {String} name 名称
 * @param {String} type 类型
 * @param {String} idField 当前模块后台所对应的字段
 * @param {String} submitField 提交时所用的字段
 * @param {String} showField 用于列表筛选的时候显示的字段
 * @param {String} showSubField 用于第二字段的显示
 * @param {obj} api 相关的api query 代表的是查询当前可以选择的列表
 * @param {Array} list 用于存储当前的数组
 */
export const RELATION_BUSINESS = {
  clues: {
    name: "线索",
    type: "clues",
    idField: "leadsId",
    submitField: "clueIds",
    showField: "leadsName",
    showSubField: "createUserName",
    api: {
      query: "queryClueList"
    },
    list: []
  },
  customers: {
    name: "客户",
    type: "customers",
    idField: "customerId",
    submitField: "customerIds",
    showField: "customerName",
    showSubField: "createUserName",
    api: {
      query: "queryCustomerListPC"
    },
    list: []
  },
  contacts: {
    name: "联系人",
    type: "contacts",
    idField: "contactsId",
    submitField: "contactsIds",
    showField: "name",
    showSubField: "post",
    api: {
      query: "queryContactsPC"
    },
    list: []
  },
  tasks: {
    name: "任务",
    type: "tasks",
    idField: "taskId",
    submitField: "taskIds",
    showField: "name",
    showSubField: "post",
    api: {
      query: "queryTaskList"
    },
    list: []
  },
  visits: {
    name: "拜访",
    type: "visits",
    idField: "visitId",
    submitField: "visitIds",
    showField: "customerName",
    showSubField: "post",
    api: {
      query: "queryVisitList"
    },
    list: []
  },
};
