/**
 * 请求地址的配置
 * 系统用户模块
 */
const getApi = url => `/sysUser${url}`;
// 查询系统所有用户
export const QUERY_SIMPLE_USER_BY_DEP_ID = getApi("/querySimpleUserByDeptId");
// 通过用户名查询当前用户下属用户
export const QUERY_SUB_USER_BY_NAME = getApi("/querySubordinateUser");
