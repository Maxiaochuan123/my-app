/**
 * 请求地址的配置
 * 线索模块
 */
const getApi = url => `/crmClew${url}`;
// 线索分页查询
export const QUERY_CLUE_LIST = getApi("/querycrmThreadListPage");
// 线索公海查询
export const QUERY_COMMON_WATER_CLUE_LIST = getApi("/queryHtmlPublicClewPoolList");
