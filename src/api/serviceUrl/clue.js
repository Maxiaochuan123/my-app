/**
 * 请求地址的配置
 * 线索模块
 */
const getApi = url => `/crmClew${url}`;
// 线索公海查询
export const QUERY_COMMON_WATER_CLUE_LIST = getApi("/queryPublicClewPoolListPage");
