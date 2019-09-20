/**
 * 请求地址的配置
 * 公用接口
 */
const getApi = url => url;
// 登入
export const USER_LOGIN_IN = getApi("/login");
// 登出
export const USER_LOGIN_OUT = getApi("/logout");
// 查询配置字段
export const QUERY_FIELD_LIST = getApi("/fields/selectField");

/**部门相关的接口*/
const departPrefix = "/sysDept";

// 查询部门列表
export const QUERY_DEPT_TREE = getApi(`${departPrefix}/queryDeptTree`);
