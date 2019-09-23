import post, { get } from "../api";
export default {
  // 查询联系人列表
  getContacts: params => get({ params, url: '/crmContacts/queryContactsListHtml' }),
  // 查询部门列表
  getDeptTree: params => get({ params, url: '/sysDept/queryDeptTree' }),
  // 部门ID查询联系人
  getDeptContacts: params => get({ params, url: '/sysUser/querySimpleUserByGroupId' }),
}