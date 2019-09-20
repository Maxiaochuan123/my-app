import * as COMMON from "../serviceUrl/common";
import post, { get } from "../api";
/** 公共模块 */
export default {
  // 登入
  userLoginIn: params =>
    post({
      params,
      url: COMMON.USER_LOGIN_IN
    }),
  // 退出登录
  userLoginOut: params =>
    post({
      params,
      url: COMMON.USER_LOGIN_OUT
    }),
  // 查询客户的字段
  queryFieldList: params =>
    post({
      params,
      url: COMMON.QUERY_FIELD_LIST
    }),
  /**部门相关的 */
  queryDeptTree: params =>
    get({
      params,
      url: COMMON.QUERY_DEPT_TREE
    })
};
