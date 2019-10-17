import * as C from "../serviceUrl/visit";
import post, { get } from "../api";
/** 拜访模块 */
export default {
  // 查询拜访记录
  queryVisitList: params =>
    get({
      params,
      url: C.QUERY_VISIT_LIST
    })
};
