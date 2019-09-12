import * as CUSTOMER from './serviceUrl/customer.js';
import post, { get } from './api';
/** 客户模块的 */
export default {
  // 查询客户
  queryCustomerList: (params) => get(
    {
      params,
      url: CUSTOMER.QUERY_CUSTOMER_LIST
    },
  ),
};
