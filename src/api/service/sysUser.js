import * as SYS_USER from "../serviceUrl/sysUser";
import post, { get } from "../api";
/** 系统用户模块 */
export default {
  // 查询系统所有用户
  querySysUserList: params =>
    post({
      params,
      url: SYS_USER.QUERY_ALL_SYS_USERS,
    })
};
