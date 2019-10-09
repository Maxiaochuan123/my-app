import * as C from "../serviceUrl/contacts";
import post, { get } from "../api";
/** 联系人模块 */
export default {
  // 新增或者编辑联系人
  addOrEditContacts: params =>
    post({
      params,
      url: C.ADD_OR_EDIT_CONTACTS,
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    })
};
