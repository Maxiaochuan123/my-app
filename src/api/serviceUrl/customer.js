/**
 * 请求地址的配置
 * 客户相关
 */
const getApi = url => `/crmClient${url}`;

// 移动端客户查询
export const QUERY_CUSTOMER_LIST = getApi("/queryClientListHtml");
// 客户新增或者编辑
export const ADD_OR_EDIT_CUSTOMER = getApi("/ClientAddOrUpdate");
// 根据客户id查询详情
export const QUERY_CUSTOMER_DETAILS_BY_ID = getApi("/queryById");
