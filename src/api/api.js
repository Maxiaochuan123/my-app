import Qs from "qs";
import tool from "../../static/js/tool";
import axios from "axios";
import Toast from "muse-ui-toast";
const CODE_SUCCESS = 0;
const CODE_FAIL_LOGIN = 302; // 登录失效或者token过期
const NO_VIEW_RECORD_PERMISSION = 403;
const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete"
};
const instance = axios.create({
  withCredentials: true,
  timeout:5000
}) 
/*----------------------请求拦截----------------------*/
instance.interceptors.request.use(
  config => {
    let loading = document.getElementById("ajaxLoading");
    loading.style.display = "block";
    // 参数序列化
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      const type = config.headers["Content-Type"];
      if (type && type.indexOf("json") > -1) {
        config.data = JSON.stringify(config.data);
      } else if(type && type.indexOf("form-data") > -1){

      }else {
        config.data = Qs.stringify(config.data);
      }
    }
    // 携带 token
    let loginObj = tool.decUserInfo("login");
    let accessToken = loginObj.accessToken;

    if (accessToken && config.url !== "/login") {
      config.headers.accessToken = accessToken;
    }
    return config;
  },
  error => {
    Toast.error({
      message: "加载超时"
    });
    let loading = document.getElementById("ajaxLoading");
    loading.style.display = "none";
    return Promise.reject(error);
  }
);
/*----------------------响应拦截----------------------*/
instance.interceptors.response.use(
  response => {
    let loading = document.getElementById("ajaxLoading");
    loading.style.display = "none";
    return response;
  },
  error => {
    let loading = document.getElementById("ajaxLoading");
    loading.style.display = "none";
    if (error && error.response) {
      switch (error.response.status) {
        case CODE_FAIL_LOGIN:
          localStorage.clear();
          window.location.href = `${window.location.protocol}//${window.location.host}/#/login`;
          break;
        case NO_VIEW_RECORD_PERMISSION:
          Toast.warning({
            message: "您无权访问该页面"
          });
          window.history.go(-1);
          break;
        default:
      }
    }
    return Promise.reject(error);
  }
);
const request = ({
  url,
  params,
  headers = {},
  method = METHODS.GET,
  server = "service",
  extraFileParams,
}) => {
  let httpUrl = window.config[server] + url;
  function checkCode(res) {
    return new Promise((resolve, reject) => {
      if (res.code === CODE_SUCCESS) {
        resolve(res);
      } else {
        if (res.code === CODE_FAIL_LOGIN) {
          Toast.error({
            message: "token过期,或者没有登录",
            position: "top"
          });
          tool.signOut();
        } else if (res.code === NO_VIEW_RECORD_PERMISSION) {
          Toast.error({
            message: "您没有权限访问",
            position: "top"
          });
          window.history.go(-1);
        } else if (res.msg) {
          Toast.error({
            message: res.msg,
            position: "top"
          });
        } else {
          Toast.error({
            message: `code:${res.code}`,
            position: "top"
          });
        }
        reject(res);
      }
    });
  }
  if (method === METHODS.GET) {
    return instance
      .get(httpUrl, { params: params })
      .then(res => checkCode(res.data));
  } else if (method === METHODS.POST) {
    return instance
      .post(httpUrl, params, { headers, onUploadProgress: progressEvent => {
        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
        extraFileParams.progress.progressNum = complete;
      }})
      .then(res => checkCode(res.data));
  }
};
const post = ({ url, params, headers, server,extraFileParams }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.POST,
    extraFileParams,
  });
export const get = ({ url, params, headers, server }) =>
  request({
    url,
    params,
    headers,
    server,
    method: METHODS.GET,
  });
export default post;
