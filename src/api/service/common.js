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
  // 新增或者编辑联系人
  addOrEditContacts: params =>
    post({
      params,
      url: COMMON.ADD_OR_EDIT_CONTACTS,
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    }),
  /**部门相关的 */
  queryDeptTree: params =>
    get({
      params,
      url: COMMON.QUERY_DEPT_TREE
    })
};
