import * as SYS_USER from "../serviceUrl/sysUser";
import post, { get } from "../api";
/** 系统用户模块 */
export default {
  // 通过部门ID查询简单用户名
  querySimpleUserByDepId: params =>
    get({
      params,
      url: SYS_USER.QUERY_SIMPLE_USER_BY_DEP_ID
    })
};
