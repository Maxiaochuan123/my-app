import post, { get } from "../api";
export default {
  // 查询联系人列表
  getContacts: params => get({ params, url: '/crmContacts/queryContactsListHtml' }),
  // 查询部门列表
  getDeptTree: params => get({ params, url: '/sysDept/queryDeptTree' }),
  // 联系人 - 公司 - 部门
  getDeptContacts: params => get({ params, url: '/sysUser/querySimpleUserByDeptId' }),
  // id 查询联系人详情
  getContactsDetails: params => get({ params, url: '/crmContacts/queryContactsById' }),
  // id 删除联系人
  contactsDelete: params => post({ params, url: '/crmContacts/deleteContactsByIds' }),
  // 联系人 写跟进
  addContactsFollowUp: params => post({ params, url: '/crmContacts/addFollowUpRecord' }),
  // 联系人 获取跟进
  getContactsFollowUp: params => post({ params, url: '/crmContacts/getFollowUpRecord' }),
  // 联系人 分享
  contactsShare: params => post({ params, url: '/crmContacts/addContactsToMembers' }),
}