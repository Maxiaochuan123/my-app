import post, { get } from "../api";
export default {
  // ************************* 联系人 *************************
  // 获取个人联系人列表
  getContacts: params => post({ params, url: '/crmContacts/queryContactsListHtml' }),
  // 获取团队联系人列表
  getTeamContacts: params => post({ params, url: '/crmContacts/getContactsMembers' }),
  // 获取部门列表
  getDeptTree: params => get({ params, url: '/sysDept/queryDeptTree' }),
  // 获取 - 公司 - 部门
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

  // ************************* 线索 *************************
  // 获取线索列表
  getClueList: params => post({ params, url: '/crmClew/querycrmThreadListPage' }),

  // 新增线索
  addClue: params => post({ params, url: '/crmClew/clewAddOrUpdate' ,headers: { "Content-Type": "application/json;charset=UTF-8" }}),

  // 线索 字段查询
  getClueField: params => post({ params, url: '/fields/selectCrmClewField' }),
}