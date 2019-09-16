import * as COMMON from "../serviceUrl/common";
import post, { get } from "../api";
/** 客户模块的 */
export default {
  // 查询客户的字段  
  queryFieldList: params =>
    post({
      params,
      url: COMMON.QUERY_FIELD_LIST
    })
};
