/**
 * 请求地址的配置
 * 系统用户模块
 */
const getApi = url => `/sysUser${url}`;
// 获取当前登录用户信息
export const GET_CURRENT_USER = getApi("/getCurrentUser");
// 查询系统所有用户
export const QUERY_SIMPLE_USER_BY_DEP_ID = getApi("/querySimpleUserByDeptId");
// 通过用户名查询当前用户下属用户
export const QUERY_SUB_USER_BY_NAME = getApi("/querySubordinateUser");
// 查询 公司内部个人联系人
export const GET_InsideCompany_Contacts = getApi("/queryUserNameByDeptId");
