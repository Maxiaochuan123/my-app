import * as C from "../serviceUrl/task";
import post, { get } from "../api";
/** 任务模块 */
export default {
  // 查询任务列表
  queryTaskList: params =>
    get({
      params,
      url: C.QUERY_TASK_LIST
    }),
  // 添加或者修改任务(包含子任务)
  addOrEditTaskChild: params =>
    post({
      params,
      url: C.ADD_OR_EDIT_TASK_CHILD,
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    }),
  // 添加或者修改任务
  addOrEditTask: params =>
    post({
      params,
      url: C.ADD_OR_EDIT_TASK
    }),
  // 根据id查询任务详情以及子任务
  queryTaskDetailsById: params =>
    get({
      params,
      url: C.QUERY_TASK_DETAILS_BY_ID
    }),
  // 根据id查询任务日志
  queryTaskRecordById: params =>
    get({
      params,
      url: C.QUERY_TASK_RECORD_BY_ID
    }),
  // 修改任务关联业务
  updateTaskRelation: params =>
    post({
      params,
      url: C.UPDATE_TASK_BUSINESS
    }),
  // 删除任务
  deleteTask: params =>
    post({
      params,
      url: C.DELETE_TASK
    })
};
