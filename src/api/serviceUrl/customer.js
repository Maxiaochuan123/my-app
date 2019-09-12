/**
 * 请求地址的配置
 *
 */
const getApi = url => `/crmClient${url}`;

// 移动端客户查询
export const QUERY_CUSTOMER_LIST = getApi("/queryClientListHtml");

// 客户新增或者编辑
export const ADD_OR_EDIT_CUSTOMER = getApi("/ClientAddOrUpdate");
