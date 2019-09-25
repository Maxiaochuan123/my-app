import post, { get } from "../api";
import axios from 'axios';
export default {
  // 查询联系人列表
  getContacts: params => get({ params, url: '/crmContacts/queryContactsListHtml' }),
  // 查询部门列表
  getDeptTree: params => get({ params, url: '/sysDept/queryDeptTree' }),
  // 联系人 - 公司 - 部门
  getDeptContacts: params => get({ params, url: '/sysUser/querySimpleUserByDeptId' }),
  // 联系人 - 公司所有
  // getDeptContactsAll: params => get({ params, url: '/sysUser/querySimpleUserGroupByDept' }),
}