import * as C from "../serviceUrl/contacts";
import post, { get } from "../api";
/** 联系人模块 */
export default {
  // 查询联系人分页
  queryContactsPC: params =>
    get({
      params,
      url: C.QUERY_CONTACTS_LIST_PC
    }),
  // 新增或者编辑联系人
  addOrEditContacts: params =>
    post({
      params,
      url: C.ADD_OR_EDIT_CONTACTS,
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    })
};
