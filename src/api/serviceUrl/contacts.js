/**
 * 请求地址的配置
 * 联系人公用接口
 */
const getApi = url => `/crmContacts${url}`;
// 查询联系人分页
export const QUERY_CONTACTS_LIST_PC = getApi("/queryContactsListPage");
// 新增或者编辑联系人
export const ADD_OR_EDIT_CONTACTS = getApi("/contactsAddOrUpdate");
