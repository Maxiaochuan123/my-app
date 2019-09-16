/**
 * 请求地址的配置
 * 公用接口
 */
const getApi = url => url;

// 查询配置字段
export const QUERY_FIELD_LIST = getApi("/fields/selectField");