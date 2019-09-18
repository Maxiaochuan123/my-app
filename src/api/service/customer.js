import * as CUSTOMER from "../serviceUrl/customer";
import post, { get } from "../api";
/** 客户模块的 */
export default {
  // 查询客户
  queryCustomerList: params =>
    get({
      params,
      url: CUSTOMER.QUERY_CUSTOMER_LIST
    }),
  // 添加或者编辑客户
  addOrEditCustomer: params =>
    get({
      params,
      url: CUSTOMER.ADD_OR_EDIT_CUSTOMER
    }),
  // 根据客户id查询详情
  queryCustomerDetailsById: params =>
    get({
      params,
      url: CUSTOMER.QUERY_CUSTOMER_DETAILS_BY_ID
    }),
  // 根据id删除客户
  deleteCustomerById: params =>
    post({
      params,
      url: CUSTOMER.DELETE_CUSTOMER_BY_ID
    }),
  // 客户新增跟进记录
  addCustomerFollowUpRecord: params =>
    post({
      params,
      url: CUSTOMER.ADD_CUSTOMER_FOLLOW_RECORD
    }),
  // 查询客户跟进记录
  queryCustomerFollowUpRecord: params =>
    post({
      params,
      url: CUSTOMER.QUERY_CUSTOMER_FOLLOW_RECORD
    })
};
