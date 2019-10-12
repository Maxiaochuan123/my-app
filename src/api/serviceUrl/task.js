/**
 * 请求地址的配置
 * 任务模块
 */
const getApi = url => `/task${url}`;
// 查询系统所有用户
export const QUERY_TASK_LIST = getApi("/queryPageTask");
// 添加或者修改任务
export const ADD_OR_EDIT_TASK = getApi("/addOrUpdate");
// 根据id查询任务详情以及子任务
export const QUERY_TASK_DETAILS_BY_ID = getApi("/queryTaskById");
// 修改任务关联业务
export const UPDATE_TASK_BUSINESS = getApi("/updateTaskRelation");
// 删除任务
export const DELETE_TASK = getApi("/deleteTask");