import * as C from "../serviceUrl/sysUser";
import post, { get } from "../api";
/** 系统用户模块 */
export default {
  // 通过部门ID查询简单用户名
  querySimpleUserByDepId: params =>
    get({
      params,
      url: C.QUERY_SIMPLE_USER_BY_DEP_ID
    }),
  // 通过用户名查询当前用户下属用户
  querySubUserByName: params =>
    get({
      params,
      url: C.QUERY_SUB_USER_BY_NAME
    })
};
