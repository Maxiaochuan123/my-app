/**
 * 请求地址的配置
 * 拜访模块
 */
const getApi = url => `/visit${url}`;
// 查询拜访记录
export const QUERY_VISIT_LIST = getApi("/queryPageList");
// 根据id查询拜访详情
export const QUERY_VISIT_DETAILS_BY_ID = getApi("/queryVisitById");