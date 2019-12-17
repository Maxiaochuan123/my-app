/**
 * 请求地址的配置
 * 客户相关
 */
const getApi = url => `/crmClient${url}`;

// 移动端客户查询
export const QUERY_CUSTOMER_LIST = getApi("/queryClientListHtml");
// 客户查询PC
export const QUERY_CUSTOMER_LIST_PC = getApi("/queryClientListPage");
// 客户新增或者编辑
export const ADD_OR_EDIT_CUSTOMER = getApi("/clientAddOrUpdate");
// 根据客户id查询详情
export const QUERY_CUSTOMER_DETAILS_BY_ID = getApi("/queryById");
// 客户启用与停用
export const UPDATE_CUSTOMER_ENABLE_OR_DISABLE = getApi("/isStartUsing");
// 根据id删除客户
export const DELETE_CUSTOMER_BY_ID = getApi("/deleteByIds");
// 客户新增跟进记录
export const ADD_CUSTOMER_FOLLOW_RECORD = getApi("/addFollowUpRecord");
// 客户查询跟进记录
export const QUERY_CUSTOMER_FOLLOW_RECORD = getApi("/getFollowUpRecord");
// 根据客户id查询联系人
export const QUERY_CONTACTS_BY_ID = getApi("/queryClientToContacts");
// 把客户分享给用户
export const CUSTOMER_SHARE_TO_USERS = getApi("/addClientToMembers");
// 把客户放入公海
export const CUSTOMER_TO_PUBLIC_POOL = getApi("/updateClientToPublicPool");
// 公海客户查询
export const QUERY_CUSTOMER_PUBLIC_POOL = getApi("/queryHtmlPublicPoolList");
// 线索公海或者客户公海领取
export const QUERY_RECEIVE_PUBLIC_POOL_BY_IDS = getApi("/receiveClewAndClientByIds");
// 线索公海或客户公海分配
export const DISTRBUTE_PUBLIC_POOL_BY_IDS = getApi("/distributeClewAndClientByIds");
