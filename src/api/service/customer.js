import * as C from "../serviceUrl/customer";
import post, { get } from "../api";
/** 客户模块的 */
export default {
  // 查询移动端客户
  queryCustomerList: params =>
    get({
      params,
      url: C.QUERY_CUSTOMER_LIST
    }),
  // 查询电脑端客户
  queryCustomerListPC: params =>
    get({
      params,
      url: C.QUERY_CUSTOMER_LIST_PC
    }),
  // 添加或者编辑客户
  addOrEditCustomer: params =>
    post({
      params,
      url: C.ADD_OR_EDIT_CUSTOMER,
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    }),
  // 根据客户id查询详情
  queryCustomerDetailsById: params =>
    get({
      params,
      url: C.QUERY_CUSTOMER_DETAILS_BY_ID
    }),
  // 根据id删除客户
  deleteCustomerById: params =>
    post({
      params,
      url: C.DELETE_CUSTOMER_BY_ID
    }),
  // 客户新增跟进记录
  addCustomerFollowUpRecord: params =>
    post({
      params,
      url: C.ADD_CUSTOMER_FOLLOW_RECORD
    }),
  // 查询客户跟进记录
  queryCustomerFollowUpRecord: params =>
    post({
      params,
      url: C.QUERY_CUSTOMER_FOLLOW_RECORD
    }),
  // 根据客户id查询联系人
  queryContactsById: params =>
    post({
      params,
      url: C.QUERY_CONTACTS_BY_ID
    }),
  // 把客户分享给用户
  customerShareToUsers: params =>
    post({
      params,
      url: C.CUSTOMER_SHARE_TO_USERS
    }),
  // 把客户放入公海
  customerToPublicPool: params =>
    post({
      params,
      url: C.CUSTOMER_TO_PUBLIC_POOL
    }),
  // 查询公海客户
  queryPublicPoolCustomer: params =>
    post({
      params,
      url: C.QUERY_CUSTOMER_PUBLIC_POOL
    }),
  // 线索公海或者客户公海领取
  queryReceivePublicPoolById: params =>
    post({
      params,
      url: C.QUERY_RECEIVE_PUBLIC_POOL_BY_IDS
    }),
  // 线索公海或客户公海分配
  distributePublicPoolById: params =>
    post({
      params,
      url: C.DISTRBUTE_PUBLIC_POOL_BY_IDS
    })
};
