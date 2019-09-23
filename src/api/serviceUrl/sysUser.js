/**
 * 请求地址的配置
 * 系统用户模块
 */
const getApi = url => `/sysUser${url}`;
// 查询系统所有用户
export const QUERY_SIMPLE_USER_BY_DEP_ID = getApi("/querySimpleUserByDeptId");
