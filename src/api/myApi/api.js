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
  // 联系人 获取跟进记录
  getContactsFollowUp: params => post({ params, url: '/crmContacts/getFollowUpRecord' }),
  // 联系人 分享
  contactsShare: params => post({ params, url: '/crmContacts/addContactsToMembers' }),

  // ************************* 线索 *************************
  // 线索 字段查询
  getClueField: params => post({ params, url: '/fields/selectCrmClewField' }),
  // 新增线索
  addClue: params => post({ params, url: '/crmClew/clewAddOrUpdate' ,headers: { "Content-Type": "application/json;charset=UTF-8" }}),
  // 获取 线索列表
  getClueList: params => post({ params, url: '/crmClew/querycrmThreadListPage' }),
  //线索详情
  getClueDetails: params => get({ params, url: '/crmClew/clewQueryById' }),
  // 线索 写跟进
  addClueFollowUp: params => post({ params, url: '/crmClew/addFollowUpRecord' }),
  // 线索 获取跟进记录
  getClueFollowUp: params => post({ params, url: '/crmClew/getFollowUpRecord' }),
  // 线索 分享
  clueShare: params => post({ params, url: '/crmClew/addClewToMembers' }),
  // 线索 转为 联系人
  clueToContact: params => post({ params, url: '/crmClew/clewTransferContacts' }),
  // 线索 转为 客户
  clueToCustomer: params => post({ params, url: '/crmClew/clewTransferClient' }),
  // 线索 放入 公海
  cluePutWaters: params => post({ params, url: '/crmClew/updateClewToPublicPool' }),
  // 线索 关闭
  clueClose: params => post({ params, url: '/crmClew/closeClewFollowUpRecord' }),
  // 线索 删除
  clueDelete: params => post({ params, url: '/crmClew/clewDeleteByIds' }),


  // ************************* 日报 *************************
  //获取 评论列表
  getReplyList: params => get({ params, url: '/workComment/queryReplyList' }),
  // 新增 评论
  addReply: params => post({ params, url: '/workComment/addOrUpdate' }),
  //日报 列表
  getDailyList: params => get({ params, url: '/workReport/queryPageList' }),
  //日报 详情
  getDailyDetails: params => get({ params, url: '/workReport/queryReportById' }),

  // ************************* 待办 *************************
  // 待办 统计
  getToDuTotal: params => post({ params, url: '/crmAgenda/waitDoneNum' }),
  // 分配给我的 线索
  getAssignToMeClue: params => post({ params, url: '/crmAgenda/agendaHtmlLeads' }),
  // 分配给我的 客户
  getAssignToMeCustomer: params => post({ params, url: '/crmAgenda/agendaHtmlCustomer' }),
  // 待执行 任务
  getToBeExecutedTask: params => get({ params, url: '/crmAgenda/waitExecuteTask' }),
  // 待查看 日报
  getToBeSeenDaily: params => get({ params, url: '/crmAgenda/waitReadLog' }),
  // 待查看 拜访
  getToBeSeenVisit: params => get({ params, url: '/crmAgenda/waitReadVisit' }),
}