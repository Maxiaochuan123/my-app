/**
 * 请求地址的配置
 * 拜访模块
 */
const getApi = url => `/visit${url}`;
// 查询拜访记录
export const QUERY_VISIT_LIST = getApi("/queryPageList");
