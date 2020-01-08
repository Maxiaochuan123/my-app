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
// 验证客户名称,联系人名称,线索名称的重复
export const VERIFYING_FIELDS = getApi("/fields/verifying");
// 上传文件
export const UPLOAD_FILES = getApi("/allFile/upload");
// 删除文件
export const DELETE_FILES = getApi("/allFile/deleteById");

// 角色API

const roleApi = url => `/sysRole${url}`;
// 根据登录的token获取当前的权限
export const GET_AUTHOR_BY_TOKEN = roleApi("/queryAuth");
