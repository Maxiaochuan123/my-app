/**
 * 请求地址的配置
 * 拜访模块
 */
const getApi = url => `/visit${url}`;
// 查询拜访记录
export const QUERY_VISIT_LIST = getApi("/queryPageList");
// 根据id查询拜访详情
export const QUERY_VISIT_DETAILS_BY_ID = getApi("/queryVisitById");
// 添加或者编辑拜访
export const ADD_OR_EDIT_VISIT = getApi("/addOrUpdate");
// 批量删除拜访
export const DELETE_VISITS = getApi("/deleteByIds");