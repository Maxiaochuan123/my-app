import * as CONTACTS from "../serviceUrl/contacts";
import post, { get } from "../api";
/** 联系人模块 */
export default {
  // 新增或者编辑联系人
  addOrEditContacts: params =>
    post({
      params,
      url: CONTACTS.ADD_OR_EDIT_CONTACTS,
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    })
};
