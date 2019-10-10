import * as C from "../serviceUrl/clue";
import post, { get } from "../api";
/** 线索模块 */
export default {
  // 线索公海查询
  queryCommonWaterClueList: params =>
    get({
      params,
      url: C.QUERY_COMMON_WATER_CLUE_LIST
    })
};
