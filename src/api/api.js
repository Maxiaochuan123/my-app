/**
 * 封装axios请求
 */

import axios from "axios";
import Toast from "muse-ui-toast";
import utils from "./../../static/js/tool";
import Loading from "muse-ui-loading";
const CODE_SUCCESS = 0;
const CODE_FAIL_LOGIN = 302; // 登录失效或者token过期
const NO_VIEW_RECORD_PERMISSION = 403;
const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete"
};
const request = ({
  url,
  params,
  headers = {},
  method = METHODS.GET,
  jsonType = true,
  server = "service"
}) => {
  let httpUrl = window.config[server] + url;
  const userObj = utils.decUserInfo();
  let header = {
    "Content-Type": jsonType
      ? "application/json;charset=UTF-8"
      : "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    token: userObj.token,
    responseType: "json"
  };
  if (headers === "file") {
    delete header["Content-Type"];
    header["Content-Type"] = "multipart/form-data";
  } else {
    header = Object.assign(header, headers);
  }
  const loading = Loading({
    text: "正在加载中"
  });
  return axios({
    params: method === METHODS.GET ? params : null,
    data: method === METHODS.POST ? params : null,
    method,
    url: httpUrl,
    headers: header
  })
    .then(resp => {
      loading && loading.close();
      if (resp.status !== 200) {
        console.log("Server error occurred");
        return window.Promise.reject("Server error occurred");
      }
      const data = resp.data;
      return new Promise((resolve, reject) => {
        if (resp && data.code + "" === CODE_SUCCESS + "") {
          resolve(data);
        } else {
          if (data.code === CODE_FAIL_LOGIN) {
            Toast.error({
              message: "token过期,或者没有登录",
              position: "top"
            });
            utils.signOut();
          } else if (data.code === NO_VIEW_RECORD_PERMISSION) {
            Toast.error({
              message: "您没有权限访问",
              position: "top"
            });
            window.history.go(-1);
          } else if (data.msg) {
            Toast.error({
              message: data.msg,
              position: "top"
            });
          } else {
            Toast.error({
              message: `code:${data.code}`,
              position: "top"
            });
          }
          reject(data);
        }
      });
    })
    .catch(error => {
      loading && loading.close();
      if (!error.code && !navigator.onLine) {
        Toast.error({
          message: "网络出错，请重试",
          position: "top"
        });
      }
      if (error.message && error.message.indexOf("timeout") > -1) {
        Toast.error({
          message: "请求超时，请重试",
          position: "top"
        });
      }
      if (error.response && error.response.status === CODE_FAIL_LOGIN) {
        Toast.error({
          message: "token过期或者登录失败跳转到登录页面",
          position: "top"
        });
        utils.signOut();
      }
      if (
        error.response &&
        error.response.status === NO_VIEW_RECORD_PERMISSION
      ) {
        // 没有权限
        window.history.go(-1);
        Toast.error({
          message: "您没有权限访问",
          position: "top"
        });
      }
      return new Promise((resolve, reject) => {
        // 返回错误回调
        reject(error);
      });
    });
};
const post = ({ url, params, headers, server }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.POST,
    jsonType: true
  });
export const get = ({ url, params, headers, server }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.GET,
    jsonType: true
  });
export default post;
