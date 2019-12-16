import * as C from "../serviceUrl/common";
import post, { get } from "../api";
/** 公共模块 */
export default {
  // 登入
  userLoginIn: params =>
    post({
      params,
      url: C.USER_LOGIN_IN
    }),
  // 退出登录
  userLoginOut: params =>
    post({
      params,
      url: C.USER_LOGIN_OUT
    }),
  // 根据当前的token获取当前的权限
  getAuthorByToken: params =>
    get({
      params,
      url: C.GET_AUTHOR_BY_TOKEN
    }),
  // 查询客户的字段
  queryFieldList: params =>
    post({
      params,
      url: C.QUERY_FIELD_LIST
    }),
  // 上传文件
  uploadFilesOrImgs: (params, extraFileParams) =>
    post({
      params,
      extraFileParams,
      url: C.UPLOAD_FILES,
      headers: { "Content-Type": "multipart/form-data" }
    }),
  // 删除文件
  deleteFilesOrImgs: params =>
    post({
      params,
      url: C.DELETE_FILES
    })
};
