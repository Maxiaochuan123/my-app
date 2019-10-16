import * as C from "../serviceUrl/task";
import post, { get } from "../api";
/** 拜访模块 */
export default {
  // 查询任务列表
  queryVisitList: params =>
    get({
      params,
      url: C.QUERY_VISIT_LIST
    })
};
