import * as COMMON from "../serviceUrl/common";
import post, { get } from "../api";
/** 公共模块 */
export default {
  // 登入
  userLoginIn: params =>
    post({
      params,
      url: COMMON.USER_LOGIN_IN
    }),
  // 退出登录
  userLoginOut: params =>
    post({
      params,
      url: COMMON.USER_LOGIN_OUT
    }),
  // 查询客户的字段
  queryFieldList: params =>
    post({
      params,
      url: COMMON.QUERY_FIELD_LIST
    }),
  // 上传文件
  uploadFilesOrImgs: (params, extraFileParams) =>
    post({
      params,
      extraFileParams,
      url: COMMON.UPLOAD_FILES,
      headers: { "Content-Type": "multipart/form-data" }
    }),
  // 删除文件
  deleteFilesOrImgs: params =>
    post({
      params,
      url: COMMON.DELETE_FILES
    })
};
