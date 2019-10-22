import * as C from "../serviceUrl/visit";
import post, { get } from "../api";
/** 拜访模块 */
export default {
  // 查询拜访记录
  queryVisitList: params =>
    get({
      params,
      url: C.QUERY_VISIT_LIST
    }),
  // 查询拜访记录
  queryDetailsById: params =>
    get({
      params,
      url: C.QUERY_VISIT_DETAILS_BY_ID
    }),
  // 新增或者修改拜访
  addOrEditVisit: params =>
    post({
      params,
      url: C.ADD_OR_EDIT_VISIT,
    }),
  // 批量删除拜访
  deleteVisits: params =>
    post({
      params,
      url: C.DELETE_VISITS
    })
};
